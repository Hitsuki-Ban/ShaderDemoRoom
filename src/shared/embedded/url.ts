export function getEmbeddedSrc(path: string, reloadToken: number) {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const query = reloadToken > 0 ? `?reload=${reloadToken}` : '';

  return `${base}${path}${query}`;
}

export function getStandaloneExhibitUrl(path: string) {
  return getEmbeddedSrc(path, 0);
}
