export function getRandomNumber() {
  const maxNumber = 100;
  return Math.floor(Math.random() * maxNumber + 1);
}
export const fixBrokenJSON = string => JSON.parse(string + '}');
