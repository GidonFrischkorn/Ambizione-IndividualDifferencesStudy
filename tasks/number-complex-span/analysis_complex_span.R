#### Analysis Complex Span Task ####

library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

# Convert the json file to a data frame and filter for behavioral data, correct responses and only experimental trials 
span_results <- read_json_data("complex_span_d.json") %>% 
  select(participant, procedure, screenID, trialID, pair, question, button_pressed, cue, leftNumber, rightNumber, response, congruency, correctJudge, correctNumber, acc, rt)
