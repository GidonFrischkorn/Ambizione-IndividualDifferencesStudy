############## Analysis Digit Processing Task ##############

#install packages 
library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

# Convert the json file to a data frame and filter for behavioral data, correct responses and only experimental trials 
digit_result <- read_json_data(".json") %>% 
  filter(procedure == "experiment"
         #, correct == "TRUE"
         ) 

# Exclude columns we don't need 
digit_result <- digit_result %>% 
  select(-c(1:9, 11, 12, 16:29))

# Convert rt to seconds and create a new column for the converted RTs
digit_result <- digit_result %>%
  mutate(rt_seconds = rt/ 1000,
         mapping_switch = ifelse(mapping == lag(mapping), "repeat", "switch"),
         response_repeat = ifelse(response == lag(response), "repeat", "switch"))

# Calculate the mean and standard deviation of the RTs
mean_rt <- mean(digit_result$rt_seconds)
sd_rt <- sd(digit_result$rt_seconds)

# Create a plot of the RTs
plot_Table <- digit_result[, c("trial_number", "rt_seconds")]

ggplot(digit_result, aes(y = rt_seconds, fill = correct)) +
  facet_grid(response_repeat ~ mapping_switch) +
  geom_boxplot() +
  labs(title = "Reaction Time Over Trials",
       y = "Reaction Time (seconds)") +
  theme_minimal() 
