export function parseComponentTag(html: string): string | null {
  const regex = /^<([a-zA-Z0-9-]+)(\s+[^>]+)?><\/\1>$/;
  const match = regex.exec(html);
  return match ? match[1] : null;
}
