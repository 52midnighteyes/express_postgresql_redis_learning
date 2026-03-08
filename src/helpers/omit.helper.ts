export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]) {
  const result = { ...obj };
  for (const k of keys) {
    delete result[k];
  }

  return result;
}
