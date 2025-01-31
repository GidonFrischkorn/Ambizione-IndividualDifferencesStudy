############## Analysis Letter Processing Task ##############

#install packages 
install.packages("rjson")
library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

json_files <- list.files(path = "/Users/gidonfrischkorn/Downloads",pattern = ".json", full.names = TRUE)
filename <- json_files[grepl("Letter", json_files)] 

# Convert the json file to a data frame and filter for behavioral data, correct responses and only experimental trials 
letter_result <- read_json_data(filename) %>% 
  filter(procedure == "experiment"
         #, correct == "TRUE"
         ) 

# Convert rt to seconds and create a new column for the converted RTs
letter_result <- letter_result %>%
  mutate(rt_seconds = rt/ 1000)

# Calculate the mean and standard deviation of the RTs
mean_rt <- mean(letter_result$rt_seconds)
sd_rt <- sd(letter_result$rt_seconds)

# Create a plot of the RTs
plot_Table <- letter_result[, c("trial_number", "rt_seconds")]

ggplot(letter_result, aes(x = trial_number, y = rt_seconds, color = correct)) +
  geom_point() + 
  geom_line() +  
  labs(title = "Reaction Time Over Trials",
       x = "Trial Number", 
       y = "Reaction Time (seconds)") +
  theme_minimal() 
