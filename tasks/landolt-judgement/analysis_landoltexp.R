############## Analysis Ladolt Gap Processing Task ##############

#install packages 
library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

# Convert the json file to a data frame and filter for behavioral data, correct responses and only experimental trials 
landolt_result <- read_json_data(".json") %>% 
  filter(response %in% c("d", "k"), practice == "experiment", correct == "true") 

# Exclude columns we don't need 
landolt_result <- landolt_result %>% 
  select(-c(1:5, 16:29))

# Convert rt to seconds and create a new column for the converted RTs
landolt_result <- landolt_result %>%
  mutate(rt_seconds = rt/ 1000)

# Calculate the mean and standard deviation of the RTs
mean_rt <- mean(landolt_result$rt_seconds)
sd_rt <- sd(landolt_result$rt_seconds)

# Create a plot of the RTs
plot_Table <- landolt_result[, c("trial_number", "rt_seconds")]

ggplot(plot_Table, aes(x = trial_number, y = rt_seconds)) +
  geom_point() + 
  geom_line() +  
  labs(title = "Landolt Gap Processing Task - Reaction Time Over Trials",
       x = "Trial Number", 
       y = "Reaction Time (seconds)") +
  ylim(0, 1) +  
  theme_minimal() 
