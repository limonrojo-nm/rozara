function randomIntInclusive(min: number, max: number) {
  // Ensure min and max are treated as integers for calculation
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  // The formula ensures all numbers in the range have an equal probability
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
export {
  randomIntInclusive
}