##### Analysis Color Updating Task ##### 

library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

json_files <- list.files(pattern = "*.json")

updating_results <- read_json_data(json_files[3]) %>% 
  filter(screenID %in% c("encoding","updating","retrieval")) %>% 
  select(participant_id, blockID, trialID, stepID, procedure ,trial_type, setsize, color, initial_item, final_item, button_pressed, response, acc) %>% 
  mutate(
    pos_updates = ifelse(initial_item == final_item, "no","yes")
  )
