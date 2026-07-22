function elapsedMilliseconds(startedAt, finishedAt) {
  return Math.max(0, Math.round(finishedAt - startedAt));
}

export function formatStageEvent(event, name, elapsedMs = null) {
  const elapsed = elapsedMs === null ? '' : ` (${elapsedMs} ms)`;
  return `[exhibit-smoke] ${event} ${name}${elapsed}`;
}

export function formatStageFailure({
  name,
  elapsedMs,
  cause,
  diagnostic,
  cleanupErrors = [],
}) {
  const lines = [
    formatStageEvent('FAIL', name, elapsedMs),
    `stage=${JSON.stringify(name)}`,
    `cause=${cause instanceof Error ? cause.message : String(cause)}`,
    `page=${JSON.stringify(diagnostic)}`,
  ];
  if (cleanupErrors.length > 0) {
    lines.push(`cleanup=${JSON.stringify(cleanupErrors.map((error) => (
      error instanceof Error ? error.message : String(error)
    )))}`);
  }
  return lines.join('\n');
}

export function createStageRunner({ write, now, diagnose }) {
  return async function runStage(name, action) {
    const startedAt = now();
    const cleanup = [];
    let diagnosticTarget = null;
    write(formatStageEvent('START', name));

    const stage = {
      deferCleanup(cleanupAction) {
        cleanup.push(cleanupAction);
      },
      setDiagnosticTarget(target) {
        diagnosticTarget = target;
      },
    };

    let result;
    let failure = null;
    let diagnostic = null;
    const cleanupErrors = [];
    try {
      result = await action(stage);
    } catch (error) {
      failure = error;
      try {
        diagnostic = await diagnose(diagnosticTarget);
      } catch (diagnosticError) {
        diagnostic = {
          diagnosticError: diagnosticError instanceof Error
            ? diagnosticError.message
            : String(diagnosticError),
        };
      }
    }

    for (const cleanupAction of cleanup.reverse()) {
      try {
        await cleanupAction();
      } catch (error) {
        cleanupErrors.push(error);
        failure ??= error;
      }
    }

    if (failure !== null && diagnostic === null) {
      try {
        diagnostic = await diagnose(diagnosticTarget);
      } catch (diagnosticError) {
        diagnostic = {
          diagnosticError: diagnosticError instanceof Error
            ? diagnosticError.message
            : String(diagnosticError),
        };
      }
    }

    const elapsedMs = elapsedMilliseconds(startedAt, now());
    if (failure !== null) {
      const message = formatStageFailure({
        name,
        elapsedMs,
        cause: failure,
        diagnostic,
        cleanupErrors,
      });
      write(message);
      throw new Error(message, { cause: failure });
    }

    write(formatStageEvent('PASS', name, elapsedMs));
    return result;
  };
}
