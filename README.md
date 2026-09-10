# Ambizione: Individual Differences study

This repository collects all experimental programs of the tasks run in the individual differences study of the Ambizione project "The binding hypothesis: A unified account of cognitive individual differences?"

The tasks are implemented in jsPsych and exported to run on a JATOS server. The JavaScript/TypeScript code for each experiment is saved in the "tasks" folder and saved in separate folders for each tasks. The exported code to be uploaded to JATOS are saved in the "jatos" folder.

The tasks run in this study are:

- Binding tasks
- Traditional Working Memory tasks
- Perceptual and Semantic processing speed tasks
- Perceptual Acuity tasks

## Questionnaires

The BFI-2 (`src/survey/big5.ts` in each of `tasks/registration`, `tasks/end-mzp1-3`,
`tasks/followup-mzp1-3`) is built from a positional `items` array zipped with an
`item_labels` array. Until the commit that added this note, the German `items`
array had item 21 (Assertiveness, "Ich neige dazu, die Führung zu übernehmen.")
and item 23 (Productiveness, reverse-keyed, "Ich neige dazu, Aufgaben vor mir
herzuschieben.") transposed. **Every session ran in German**, so all BFI-2 data
collected before the fix has the responses to these two items swapped under
each other's `item_labels` (`BFI-E-21` / `BFI-G-23R`), in both the short and
extra-short item sets as well as the full form. The deployed JATOS bundles
under `tasks/*/packaged/` were left untouched — they are the record of what
participants actually saw and must not be reconciled with the corrected
source. The correction is applied on the analysis side, not here: see
`bfi2_apply_key()` in `R/bfi2_key.R` of the `Ambizione_DataPreparation` repo,
which exchanges the two columns and applies the published scoring key (Soto &
John, 2017, *Journal of Personality and Social Psychology*, *113*(1), 117-143,
doi 10.1037/pspp0000096).
