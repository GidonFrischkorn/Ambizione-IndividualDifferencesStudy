############## Analysis Word Processing Task ##############

#install packages 
library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

json_files <- list.files(path = "~/Downloads", pattern = ".json", full.names = TRUE)
registration_files <- json_files[grep("Registration", json_files)]

# Convert the json file to a data frame and filter for behavioral data, correct responses and only experimental trials 
registration_result <- read_json_data(registration_files[6])

responses <- registration_result$response
