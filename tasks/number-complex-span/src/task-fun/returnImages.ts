
/**
 * return the images back to the pool after several trials
 * 
 * @param pool {number[]} Il pool di numeri disponibili.
 * @param memory { { [key: number]: number[] } } La memoria dei numeri utilizzati nei trial precedenti.
 * @param afterTrials {number} Il numero di trial dopo il quale i numeri vengono restituiti al pool.*
 * 
 * @returns void
 */
export function returnNumbers(
    pool: number[],
    memory: { [key: number]: number[] },
    afterTrials: number = 10
  ){

  const trialKeys = Object.keys(memory)
  .map((key) => parseInt(key))
  .sort((a, b) => a - b);


while (trialKeys.length > afterTrials) {
  const oldestTrialKey: any = trialKeys.shift(); 
  const numbersToReturn = memory[oldestTrialKey];

  // Restituisci i numeri al pool
  pool.push(...numbersToReturn);

  // Rimuovi il trial dalla memoria
  delete memory[oldestTrialKey];
}

}