/**
 * Return the letters back to the pool after several trials.
 *
 * @param pool [string[]] the pool of letters
 * @param memory [object] the memory of letters that have been used over previous trials
 * @param afterTrials [number] the number of trials after which the letters are returned back to the pool
 *
 * @returns void
 */
export function returnLetters(
  pool: string[],
  memory: { [key: number]: string[] },
  afterTrials: number = 4,
) {
  // Check the length of the memory
  let memoryLength = Object.keys(memory).length;

  // If the length of the memory is more than the threshold, return additional letters to the pool
  if (memoryLength > afterTrials) {

    // Return the earliest letters back to the pool
    let letterList = Object.keys(memory)
      .map((x) => parseInt(x))
      .sort((a, b) => a - b);

    // Iterate through the memory
    for (let key of letterList) {
      // Get the letters from memory for this trial
      let letters = memory[key];

      // Return the letters back to the pool
      pool = pool.concat(letters);

      // Remove the letters from memory
      delete memory[key];

      // Stop if memory length is within the threshold
      if (Object.keys(memory).length <= afterTrials) break;
    }
  }
}
