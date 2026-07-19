export function getEmbeddedSrc(path: string, reloadToken: number, qaCapture = false) {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const searchParams = new URLSearchParams();
  if (reloadToken > 0) searchParams.set('reload', String(reloadToken));
  if (qaCapture) searchParams.set('qa', '1');
  const query = searchParams.size > 0 ? `?${searchParams.toString()}` : '';

  return `${base}${path}${query}`;
}

export function getStandaloneExhibitUrl(path: string) {
  return getEmbeddedSrc(path, 0);
}
