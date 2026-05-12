let idCounter = 0;

export function useId(prefix = "archora"): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}
