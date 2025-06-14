############## Analysis Color Perception Task ##############

#install packages
library(rjson)
library(dplyr)
library(smartr)
library(ggplot2)

# Convert the json file to a data frame and filter for behavioral data, correct responses and only experimental trials
perceptualmatching_result <- read_json_data("perceptual_matching.json") #%>%
  #filter(response %in% c("d", "k"), practice == "experiment")

matching_data <- perceptualmatching_result %>%
  filter(trial_type %in% c("color_matching","confidence"),
         procedure == "experiment") %>%
  mutate(selected_angle = case_when(trial_type == "confidence" ~ lag(selected_angle),
                                    TRUE ~ selected_angle),
         selected_angle_offset = case_when(trial_type == "confidence" ~ lag(selected_angle_offset),
                                    TRUE ~ selected_angle_offset)) %>%
  filter(trial_type == "confidence")

mean_RE <- mean(bmm::wrap(matching_data$correct_angle - matching_data$selected_angle_offset))
sd_RE <- circular::sd.circular(bmm::wrap(matching_data$correct_angle - matching_data$selected_angle_offset))

ggplot(data = matching_data %>% filter(trial_type == "confidence"),
       aes(x = bmm::wrap(correct_angle - selected_angle_offset, radians = F))) +
  geom_histogram(aes(y = ..density..)) +
  geom_function(fun= dnorm, args = list(mean = mean_RE, sd = 2*sd_RE), color = "blue") +
  geom_vline(aes(xintercept = mean_RE, color = "red")) +
  coord_cartesian(xlim = c(-60, 60))



# average proportion correct
color_result %>% group_by(condition) %>% summarise(pCorr = mean(correct), n = n())

# mean & sd of correct response times
color_result %>% group_by(condition) %>%  filter(correct == T) %>%  summarise(meanRT = mean(rt), sdRT = sd(rt))

ggplot(data = color_result,
       aes(x = rt, y = fix_duration)) +
  facet_grid(correct ~ condition) +
  geom_point()

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
