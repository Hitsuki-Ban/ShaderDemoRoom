import { useMemo, type ReactNode } from 'react';
import type { Locale } from '../i18n';

interface ControlGroupProps {
  title: string;
  children: ReactNode;
}

export function ControlGroup({ title, children }: ControlGroupProps) {
  return (
    <section className="control-group">
      <h2>{title}</h2>
      <div className="control-stack">{children}</div>
    </section>
  );
}

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  locale: Locale;
  unit?: string;
  onChange: (value: number) => void;
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step,
  locale,
  unit = '',
  onChange,
}: SliderControlProps) {
  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale, {
      minimumFractionDigits: Number.isInteger(step) ? 0 : 2,
      maximumFractionDigits: Number.isInteger(step) ? 0 : 2,
    }),
    [locale, step],
  );

  return (
    <label className="slider-control">
      <span className="control-label">
        <span>{label}</span>
        <output>
          {numberFormatter.format(value)}
          {unit}
        </output>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

interface ToggleControlProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function ToggleControl({ label, value, onChange }: ToggleControlProps) {
  return (
    <label className="toggle-control">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="toggle-track" aria-hidden="true" />
    </label>
  );
}

interface SegmentedControlProps<TValue extends string> {
  label: string;
  value: TValue;
  options: { label: string; value: TValue; testId?: string }[];
  onChange: (value: TValue) => void;
}

export function SegmentedControl<TValue extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<TValue>) {
  return (
    <fieldset className="segmented-control">
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            data-testid={option.testId}
            className={option.value === value ? 'active' : ''}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
