##### Analysis Color Updating Task ##### 

library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

updating_results <- read_json_data("complex_span_prova.json") %>% 
  select(participant, trialID, screenID, color, initial_item, final_item, response, acc, rt) %>% 
  filter(screenID == "retrieval") 
