// import
import preload from '@jspsych/plugin-preload'; // plugins from jspsych

// screen to display setsize for practice trials
export const screen_preload = function(exp_info, exp_trial, task) {
  // create images array
  var images_trial:any = [];

  // images to preload for procedural task
  if (task == 'procedural') {

    // add response image
    images_trial.push(exp_info.image_path + exp_info.response_image);

  // images to preload for declarative task
  } else if (task == "declarative") { // declarative task

    // add images for stimuli
    for (let stim = 0; stim < exp_trial.setsize; stim++) {
      images_trial.push(exp_info.image_path + `stim_ (${exp_trial.ret_stim[stim]}).jpg`);
    }

    // add response image
    images_trial.push(exp_info.image_path + exp_info.response_image);
  }

  // screen to preload images
  const screen = {
    type: preload,
    images: images_trial,
    show_progress_bar: false,
    data: {
      screenID: 'preload_trial'  
    }
  };

  // return screen 
  return screen;
};