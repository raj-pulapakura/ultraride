export function randomChoice<T>(array: T[]): T | null {
  return array[Math.floor(Math.random() * array.length)];
}
