#### Analysis Complex Span Task ####

library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

json_files <- list.files(pattern = "*.json")

# Convert the json file to a data frame and filter for behavioral data, correct responses and only experimental trials 
span_results <- read_json_data(json_files[1]) %>% 
  filter(screenID %in% c("memory","retroStim","retrieval")) %>% 
  select(participant_id, procedure, screenID, blockID, trialID, stimulus, response_type,
         pair, leftNumber, rightNumber, button_pressed, correctNumber, correctJudge, response, rt, acc)
