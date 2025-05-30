export function coerceComponentHeight(value: string | number | undefined): string {
  if (value === undefined) {
    return 'auto';
  }
  value = Number(value);
  if (value) {
    return value + 'px';
  }
  return 'auto';
}
