############## Analysis Word Processing Task ##############

#install packages 
library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

# Convert the json file to a data frame and filter for behavioral data, correct responses and only experimental trials 
words_result <- read_json_data(".json") %>% 
  filter(response %in% c("d", "j"), procedure == "experiment"
         #, correct == TRUE
         ) 

# Exclude columns we don't need 
words_result <- words_result %>% 
  select(-c(1:9, 11, 12, 16:29))

# Convert rt to seconds and create a new column for the converted RTs
words_result <- words_result %>%
  mutate(rt_seconds = rt/ 1000)

# Calculate the mean and standard deviation of the RTs
mean_rt <- mean(words_result$rt_seconds)
sd_rt <- sd(words_result$rt_seconds)

# Create a plot of the RTs
plot_Table <- words_result[, c("trial_number", "rt_seconds")]

ggplot(plot_Table, aes(x = trial_number, y = rt_seconds)) +
  geom_point() + 
  geom_line() +  
  labs(title = "Reaction Time Over Trials",
       x = "Trial Number", 
       y = "Reaction Time (seconds)") +
  ylim(0, 1) +  
  theme_minimal() 
