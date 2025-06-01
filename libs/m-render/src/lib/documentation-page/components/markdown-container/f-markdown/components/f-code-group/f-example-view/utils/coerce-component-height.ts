export function coerceComponentHeight(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  value = Number(value);
  if (value) {
    return value + 'px';
  }
  return undefined;
}
