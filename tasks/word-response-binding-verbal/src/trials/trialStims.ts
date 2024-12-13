// import
import { random } from "@coglabuzh/webpsy.js";
import { removeItems } from "../task-fun/removeItems";

// define variables for trials
export function MakeTrial(exp_info, is_practice: number = 0, task) {
  
  // processing speed trials
  if (task == "finger_check") {

    // define arrays for variables
    var mini_block:any = [],
        trial2block:any = [],
        phase:any = [],
        finger_check_pos:any = [],
        new_order:any = []

    // define number of blocks and trials
    var n_blocks = exp_info.n_finger_check_blocks;
    var n_trials = exp_info.n_finger_check_trials;
    
    // define the conditions: key positions
    finger_check_pos.push(Array(exp_info.pos.length).fill(exp_info.pos).flat());
    
    // loop through blocks
    for(let block = 0; block < n_blocks; block ++) {

      // randomize order of conditions
      var order_shuffle = Array.from(Array(exp_info.pos.length).keys());
      random.shuffle(order_shuffle);
      new_order.push(order_shuffle);
      var finger_check_pos_block = new_order[0].map(i => finger_check_pos[0][i]);

      // loop through trials
      for (let trial = 0; trial < n_trials; trial ++) {
        
        // define block, trial and phase
        mini_block.push(block);
        trial2block.push(trial);
        phase.push('finger_check');
        
      };
    };

    // create trial object with all variables
    var Trial = trial2block.map((trial2block, index) => {

      return Object.assign({}, {
      block: mini_block[index],
      trial: trial2block,
      phase: phase[index],
      retrieval_order: new_order[0],
      finger_check_pos: finger_check_pos_block[index]
      
      });
    })

  } else if (task == "proc_speed_declarative") { // processing speed trials

    // define arrays for variables
    var mini_block:any = [],
        trial2block:any = [],
        phase:any = [],
        proc_speed_firsts:any = [],
        proc_speed_pos:any = [],
        new_order:any = [],
        ret_first_pos:any = [],
        ret_other_first_positions:any = [],
        ret_other_firsts:any = [];
        
    // define number of blocks and trials
    var n_blocks = exp_info.n_proc_speed_blocks;
    var n_trials = exp_info.n_proc_speed_trials;
    
    // define the conditions: cross names and key positions
    proc_speed_firsts.push(Array(exp_info.pos.length).fill(exp_info.firsts_name).flat().sort());
    proc_speed_pos.push(Array(exp_info.firsts_name.length).fill(exp_info.pos).flat());
    
    // loop through blocks
    for(let block = 0; block < n_blocks; block ++) {

      // randomize order of conditions
      var order_shuffle = Array.from(Array(exp_info.firsts_name.length * exp_info.pos.length).keys());
      random.shuffle(order_shuffle);
      new_order.push(order_shuffle);
      var proc_speed_first_block = new_order[0].map(i => proc_speed_firsts[0][i])
      var proc_speed_pos_block = new_order[0].map(i => proc_speed_pos[0][i])

      // loop through trials
      for (let trial = 0; trial < n_trials; trial ++) {
        
        // define block, trial and phase
        mini_block.push(block);
        trial2block.push(trial);
        phase.push('processing_speed');

        // shuffle the order of key assignment for non-target names
        ret_first_pos.push(exp_info.pos.map((x) => x));
        random.shuffle(ret_first_pos[trial]);
        
        // array with 8 shuffled names and positions for the remaining non-target names
        var ret_other_first = exp_info.firsts_name.map(x => x);
        var ret_other_first_pos = ret_first_pos[trial].map(x => x);
        
        // remove the target name and position from the array for the remaining non-target names
        ret_other_first_pos.splice(ret_other_first_pos.indexOf(proc_speed_pos_block[trial]), 1);
        ret_other_firsts.splice(ret_other_firsts.indexOf(proc_speed_first_block[trial]), 1);
        
        // add to array for all trials
        ret_other_first_positions.push(ret_other_first_pos)
        ret_other_firsts.push(ret_other_first)
        
      };
    };

    // create trial object with all variables
    var Trial = trial2block.map((trial2block, index) => {

      return Object.assign({}, {
      block: mini_block[index],
      trial: trial2block,
      phase: phase[index],
      
      retrieval_order: new_order[0],
      proc_speed_firsts: proc_speed_first_block[index],
      proc_speed_pos: proc_speed_pos_block[index],
      
      ret_other_first_pos: ret_other_first_positions[index],
      ret_other_firsts: ret_other_firsts[index],
      
      });
    })        
  } else if (task == "declarative") { // declarative task 

    // define arrays for variables
    var mini_block:any = [],
        trial2block:any = [],
        trial_num:any = [],
        phase:any = [],
        list_conditions:any = [],
        setsize:any = [],
        rand_stims:any = [],
        rand_stims_word:any = [],
        binding_first_names:any = [],
        binding_first_pos:any = [],
        position:any = [],
        new_order:any = [],
        ret_first_pos:any = [],
        ret_firsts:any = [],
        ret_other_first_positions:any = [],
        ret_other_firsts:any = [],
        ret_stim:any = [],
        ret_stim_word:any = [],
        ret_binding_first_name:any = [],
        ret_binding_first_pos:any = [],
        ret_stims:any = [],
        ret_stims_word:any = [],
        ret_binding_first_names:any = [],
        ret_binding_first_positions:any = [];
    
    // define number of blocks  and trials
    var trial = 0;

    if (is_practice == 1) { // practice trials
      var n_blocks = exp_info.n_prac_blocks;
      var n_trials = exp_info.n_prac_trials;
    } else { // experimental trials
      var n_blocks = exp_info.n_exp_blocks;
      var n_trials = exp_info.n_exp_trials;
    }
    
    // define stimlus arrays
    if (is_practice == 1) { // practice trials

      var stim_idx = removeItems(Array.from(Array(exp_info.stim_count).keys()).map(i => i), exp_info.stim_index_dec);

    } else { // experimental trials
    
      var stim_idx = exp_info.stim_index_dec;
    }

    // sample Hebb stimuli
    var hebb_stims = random.sample(stim_idx, exp_info.setsize);
    var hebb_bindings = random.sample(exp_info.firsts_name, exp_info.setsize);

    // remove Hebb stimuli from stimulus index
    if (is_practice == 0) { // experimental trials
      stim_idx = removeItems(stim_idx, hebb_stims);
    };
    
    // loop through blocks
    for(let block = 0; block < n_blocks; block ++) {

      if (is_practice == 0) { // experimental trials

        var list_order:any = random.shuffle_new(exp_info.list_condition);

      } else { 

        var list_order:any = undefined;

      };

      // loop through trials
      for (let trial_block = 0; trial_block < n_trials; trial_block ++) {

        // define block and trial 
        mini_block.push(block);
        trial2block.push(trial_block);
        
        // define variables for practice
        if (is_practice == 1){

          phase.push('prac');
          setsize.push(exp_info.prac_setsize[trial]);
          var list_cond = 'Control';
          
        } else { // define variables for experimental trials

          phase.push('exp');
          setsize.push(exp_info.setsize);
          var list_cond = String(list_order[trial_block]);
          
        };

        list_conditions.push(list_cond);

        if (list_cond == "Hebb"){ // Hebb condition

          // randomly order Hebb stimuli and bindings
          var rand_order = random.shuffle_new(Array.from(Array(setsize[trial]).keys()));
          var rand_hebb_stims = rand_order.map(i => hebb_stims[i]);
          var rand_hebb_bindings = rand_order.map(i => hebb_bindings[i]);

          // Hebb stimuli
          rand_stims.push(rand_hebb_stims);
          // Hebb bindings
          binding_first_names.push(rand_hebb_bindings);
          
        } else if (list_cond == "Control"){ // Control condition

          if (is_practice == 1) { // practice trials

            // randomly select Control stimuli from stimulus index
            rand_stims.push(random.sample(stim_idx, setsize[trial]));

          } else { // experimental trials

            // check to make sure that Hebb stimuli are not used for Control
            let overlap = 1;

            while (overlap == 1) {

              // randomly select Control stimuli from stimulus index
              var sample_stims:any = random.sample(stim_idx, setsize[trial]);

              if (sample_stims.some((val) => hebb_stims.includes(val))) {
                overlap = 1;
              } else {
                overlap = 0;
              }
            };

            // add stimuli to array
            rand_stims.push(sample_stims);
            stim_idx = removeItems(stim_idx, rand_stims[trial]);
            
          };

          // randomly sample Control bindings
          binding_first_names.push(random.sample(exp_info.firsts_name, setsize[trial]));

        };
        
        // define stimuli words for encoding
        rand_stims_word.push(rand_stims[trial].map(i => exp_info.stim_words[i]));
        
        // create empty arrays for retrieval variables
        ret_stim = Array(setsize[trial]).fill(0);
        ret_stim_word = Array(setsize[trial]).fill('');
        ret_binding_first_names = Array(setsize[trial]).fill('');
        ret_binding_first_pos = Array(setsize[trial]).fill(0);
        ret_first_pos = Array(setsize[trial]).fill(0);
        ret_firsts = Array(setsize[trial]).fill(0);
        
        // define binding postions
        binding_first_pos.push(random.sample(exp_info.pos, setsize[trial]));
        
        // define retrieval order
        position.push(Array.from(Array(setsize[trial]).keys()));
        new_order.push(random.sample(position[trial], setsize[trial]));

        // order variables according to retrieval order
        ret_stim = new_order[trial].map(i => rand_stims[trial][i]);
        ret_stim_word = new_order[trial].map(i => exp_info.stim_words[rand_stims[trial][i]]);
        ret_binding_first_names = new_order[trial].map(i => binding_first_names[trial][i]);
        ret_binding_first_pos = new_order[trial].map(i => binding_first_pos[trial][i]);
        
        // loop through stimuli
        // create array of 8 names and positions for the remaining non-target names
        for (let round = 0; round < setsize[trial]; round ++) {
          ret_first_pos[round] = random.sample(exp_info.pos, exp_info.pos.length);
          ret_firsts[round] = exp_info.firsts_name.map(x => x);
          
        };

        var ret_other_first_pos = ret_first_pos.map(x => x);
        var ret_other_first = ret_firsts.map(x => x);
        
        // remove target first name and position from array and define names 
        // for the remaining non-target names
        for (let stim = 0; stim < setsize[trial]; stim ++) {
          
          ret_other_first_pos[stim].splice(ret_other_first_pos[stim].indexOf(ret_binding_first_pos[stim]), 1);
          ret_other_first[stim].splice(ret_other_first[stim].indexOf(ret_binding_first_names[stim]), 1);
          
        }

        // add to arrays for all trials
        ret_stims.push(ret_stim);
        ret_stims_word.push(ret_stim_word);
        ret_binding_first_names.push(ret_binding_first_name);
        ret_binding_first_positions.push(ret_binding_first_pos);
        ret_other_first_positions.push(ret_other_first_pos);
        ret_other_firsts.push(ret_other_first);
        
        //update trial counter across blocks
        trial_num.push(trial);
        trial++

      };
        
    };
    
    // create trial object with all variables
    var Trial = trial_num.map((trial_num, index) => {

      return Object.assign({}, {
      block: mini_block[index],
      trial: trial_num,
      trial2block: trial2block[index],
      phase: phase[index],
      list_condition: list_conditions[index],
      setsize: setsize[index], 

      stim_index: rand_stims[index],
      stim_index_word: rand_stims_word[index],
      binding_firsts: binding_first_names[index],
      binding_first_pos: binding_first_pos[index],
      
      retrieval_order: new_order[index],
      ret_stim: ret_stims[index],
      ret_stim_word: ret_stims_word[index],
      ret_binding_firsts: ret_binding_first_names[index],
      ret_binding_first_pos: ret_binding_first_positions[index],

      ret_other_first_pos: ret_other_first_positions[index],
      ret_other_firsts: ret_other_firsts[index],
      
      });
    });
  } else if (task == "proc_speed_procedural") {

    // define arrays for variables
    var mini_block:any = [],
        trial2block:any = [],
        phase:any = [],
        proc_speed_pos:any = [],
        new_order:any = [],
        ret_pos:any = []

    // define number of blocks and trials
    var n_blocks = exp_info.n_proc_speed_blocks;
    var n_trials = exp_info.n_proc_speed_trials;
    
    // define the conditions: key positions
    proc_speed_pos.push(Array(exp_info.pos.length).fill(exp_info.pos).flat());
    
    // loop through blocks
    for(let block = 0; block < n_blocks; block ++) {

      // randomize order of conditions
      var order_shuffle = Array.from(Array(exp_info.pos.length * exp_info.pos.length).keys());
      random.shuffle(order_shuffle);
      new_order.push(order_shuffle);
      var proc_speed_pos_block = new_order[0].map(i => proc_speed_pos[0][i])

      // loop through trials
      for (let trial = 0; trial < n_trials; trial ++) {
        
        // define block, trial and phase
        mini_block.push(block);
        trial2block.push(trial);
        phase.push('processing_speed');

        // shuffle the order of key assignment for non-target names
        ret_pos.push(exp_info.pos.map((x) => x));
        random.shuffle(ret_pos[trial]);
        
      };
    };

    // create trial object with all variables
    var Trial = trial2block.map((trial2block, index) => {

      return Object.assign({}, {
      block: mini_block[index],
      trial: trial2block,
      phase: phase[index],
      
      retrieval_order: new_order[0],
      proc_speed_pos: proc_speed_pos_block[index]
      
      });
    })
    
  } else if (task == "procedural") { // practice and experimental trials

    // define arrays for variables
    var mini_block:any = [],
        trial2block:any = [],
        trial_num:any = [],
        phase:any = [],
        list_conditions:any = [],
        setsize:any = [],
        rand_stims:any = [],
        rand_stims_word:any = [],
        binding_pos:any = [],
        position:any = [],
        new_order:any = [],
        ret_stim:any = [],
        ret_stim_word:any = [],
        ret_binding_pos:any = [],
        ret_stims:any = [],
        ret_stims_word:any = [],
        ret_binding_positions:any = [];
    
    // define number of blocks  and trials
    var trial = 0;

    if (is_practice == 1) { // practice trials
      var n_blocks = exp_info.n_prac_blocks;
      var n_trials = exp_info.n_prac_trials;
    } else { // experimental trials
      var n_blocks = exp_info.n_exp_blocks;
      var n_trials = exp_info.n_exp_trials;
    }
    
    // define stimlus arrays
    if (is_practice == 1) { // practice trials

      var stim_idx = removeItems(Array.from(Array(exp_info.stim_count).keys()).map(i => i), exp_info.stim_index_proc);

    } else { // experimental trials
    
      var stim_idx = exp_info.stim_index_proc;
    }

     // sample Hebb stimuli
     var hebb_stims = random.sample(stim_idx, exp_info.setsize);
     var hebb_bindings = random.sample(exp_info.pos, exp_info.setsize);

     // remove Hebb stimuli from stimulus index
     if (is_practice == 0) { // experimental trials
      stim_idx = removeItems(stim_idx, hebb_stims);      
    };
     
    // loop through blocks
    for(let block = 0; block < n_blocks; block ++) {

      if (is_practice == 0) { // experimental trials
        var list_order:any = random.shuffle_new(exp_info.list_condition);
      } else {
        var list_order:any = undefined;
      }
      
      // loop through trials
      for (let trial_block = 0; trial_block < n_trials; trial_block ++) {

        // define block and trial
        mini_block.push(block);
        trial2block.push(trial_block);
        
        // define variables for practice
        if (is_practice == 1){

          phase.push('prac');
          setsize.push(exp_info.prac_setsize[trial]);
          var list_cond = 'Control';
          
        } else { // define variables for experimental trials

          phase.push('exp');
          setsize.push(exp_info.setsize);
          var list_cond = String(list_order[trial_block]);
          
        }

        list_conditions.push(list_cond);

        if (list_cond == "Hebb"){ // Hebb condition

          // randomly order Hebb stimuli and bindings
          var rand_order = random.shuffle_new(Array.from(Array(setsize[trial]).keys()));
          var rand_hebb_stims = rand_order.map(i => hebb_stims[i]);
          var rand_hebb_bindings = rand_order.map(i => hebb_bindings[i]);

          // Hebb stimuli
          rand_stims.push(rand_hebb_stims);
          // Hebb bindings
          binding_pos.push(rand_hebb_bindings);
          
        } else if (list_cond == "Control"){ // Control condition

          if (is_practice == 1) { // practice trials

            // randomly select Control stimuli from stimulus index
            rand_stims.push(random.sample(stim_idx, setsize[trial]));

          } else { // experimental trials

            // check to make sure that Hebb stimuli are not used for Control
            let overlap = 1;

            while (overlap == 1) {

              // randomly select Control stimuli from stimulus index
              var sample_stims:any = random.sample(stim_idx, setsize[trial]);

              if (sample_stims.some((val) => hebb_stims.includes(val))) {
                overlap = 1;
              } else {
                overlap = 0;
              }
            };

            // add stimuli to array
            rand_stims.push(sample_stims);
            stim_idx = removeItems(stim_idx, rand_stims[trial]);
            
          };

          // randomly sample Control bindings
          binding_pos.push(random.sample(exp_info.pos, setsize[trial]));

        };

        // define stimuli words for encoding
        rand_stims_word.push(rand_stims[trial].map(i => exp_info.stim_words[i]));
                
        // create empty arrays for retrieval variables
        ret_stim = Array(setsize[trial]).fill(0);
        ret_stim_word = Array(setsize[trial]).fill('');
        ret_binding_pos = Array(setsize[trial]).fill(0);
        
        // define retrieval order
        position.push(Array.from(Array(setsize[trial]).keys()));
        new_order.push(random.sample(position[trial], setsize[trial]));

        // order variables according to retrieval order
        ret_stim = new_order[trial].map(i => rand_stims[trial][i]);
        ret_stim_word = new_order[trial].map(i => exp_info.stim_words[rand_stims[trial][i]]);
        ret_binding_pos = new_order[trial].map(i => binding_pos[trial][i]);

        // add to arrays for all trials
        ret_stims.push(ret_stim);
        ret_stims_word.push(ret_stim_word);
        ret_binding_positions.push(ret_binding_pos);
      
        //update trial counter across blocks
        trial_num.push(trial);
        trial++

      };
        
    };
    
    // create trial object with all variables
    var Trial = trial_num.map((trial_num, index) => {

      return Object.assign({}, {
      block: mini_block[index],
      trial: trial_num,
      trial2block: trial2block[index],
      phase: phase[index],
      list_condition: list_conditions[index],
      setsize: setsize[index], 

      stim_index: rand_stims[index],
      stim_index_word: rand_stims_word[index],
      binding_pos: binding_pos[index],
      
      retrieval_order: new_order[index],
      ret_stim: ret_stims[index],
      ret_stim_word: ret_stims_word[index],
      ret_binding_pos: ret_binding_positions[index]
      
      });
    });
  };

  // return trial object and stimulus index
  return {Trial, stim_idx};

};
