############## Analysis Digit Processing Task ##############

#install packages 
install.packages("rjson")
library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

# Convert the json file to a data frame and filter for behavioral data, correct responses and only experimental trials 
digit_result <- read_json_data("Number Judgement Task_undefined-2.json") %>% 
  filter(response %in% c("e", "o"), practice == "experiment") 

ggplot(data = digit_result,
       aes(y = rt, x = as.factor(condition), fill = correct)) +
  geom_boxplot()

# average proportion correct
digit_result %>% group_by(condition) %>% summarise(pCorr = mean(correct), n = n())

# mean & sd of correct response times
digit_result %>% group_by(condition) %>%  filter(correct == T) %>%  summarise(meanRT = mean(rt), sdRT = sd(rt))


# Exclude columns we don't need 
digit_result <- digit_result %>% 
  select(-c(1:5, 16:29))

# Convert rt to seconds and create a new column for the converted RTs
digit_result <- digit_result %>%
  mutate(rt_seconds = rt/ 1000)

# Calculate the mean and standard deviation of the RTs
mean_rt <- mean(digit_result$rt_seconds)
sd_rt <- sd(digit_result$rt_seconds)

# Create a plot of the RTs
plot_Table <- digit_result[, c("trial_number", "rt_seconds")]

ggplot(plot_Table, aes(x = trial_number, y = rt_seconds)) +
  geom_point() + 
  geom_line() +  
  labs(title = "Reaction Time Over Trials",
       x = "Trial Number", 
       y = "Reaction Time (seconds)") +
  ylim(0, 1) +  
  theme_minimal() 
