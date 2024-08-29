############## Analysis Color Perception Task ##############

#install packages 
library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

# Convert the json file to a data frame and filter for behavioral data, correct responses and only experimental trials 
color_result <- read_json_data(".json") %>% 
  filter(response %in% c("d", "k"), practice == "experiment", correct == "TRUE") 

# Exclude columns we don't need 
color_result <- color_result %>% 
  select(-c(1:7, 8, 9, 11, 12, 14, 16:30, 31:34))

# Convert rt to seconds and create a new column for the converted RTs
color_result <- color_result %>%
  mutate(rt_seconds = rt/ 1000)

# Calculate the mean and standard deviation of the RTs
mean_rt <- mean(color_result$rt_seconds)
sd_rt <- sd(color_result$rt_seconds)

# Create a plot of the RTs
plot_Table <- color_result[, c("trial_number", "rt_seconds")]

ggplot(plot_Table, aes(x = trial_number, y = rt_seconds)) +
  geom_point() + 
  geom_line() +  
  labs(title = "Color Perception Task - Reaction Time Over Trials",
       x = "Trial Number", 
       y = "Reaction Time (seconds)") +
  ylim(0, 1) +  
  theme_minimal() 
