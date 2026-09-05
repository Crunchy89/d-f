export function guestNameFromQuery(
  value: string | string[] | undefined,
): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.trim() ?? "";
}
