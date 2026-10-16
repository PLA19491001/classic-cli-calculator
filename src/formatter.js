/** Remove insignificant floating-point noise for display. */
export function formatResult(value) {
  if (!Number.isFinite(value)) return String(value);
  if (Object.is(value, -0)) return '0';

  const rounded = Number(value.toPrecision(12));
  return String(rounded);
}
