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
        new_order:any = [],
        ret_object_pos:any = [],
        ret_other_object_positions:any = [],
        ret_other_objects:any = []

    // define number of blocks and trials
    var n_blocks = exp_info.n_finger_check_blocks;
    var n_trials = exp_info.n_finger_check_trials;
    
    // define the conditions
    finger_check_pos.push(Array(exp_info.objects.length).fill(exp_info.pos).flat());
    
    // loop through blocks
    for(let block = 0; block < n_blocks; block ++) {

      // randomize order of conditions
      var order_shuffle = Array.from(Array(exp_info.pos.length).keys()); //creates an array of indexes corresponding to the length of exp_info.pos [0, 1, 2, 3, 4, 5, 6, 7]
      random.shuffle(order_shuffle); // to randomize the order of the indexes
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
        proc_speed_object:any = [],
        proc_speed_pos:any = [],
        new_order:any = [],
        ret_object_pos:any = [],
        ret_other_object_positions:any = [],
        ret_other_objects:any = []

    // define number of blocks and trials
    var n_blocks = exp_info.n_proc_speed_blocks;
    var n_trials = exp_info.n_proc_speed_trials;
    
    // define the conditions: cross non-objects and key positions
    proc_speed_object.push(Array(exp_info.pos.length).fill(exp_info.objects_name).flat().sort());
    proc_speed_pos.push(Array(exp_info.objects.length).fill(exp_info.pos).flat());
    
    // loop through blocks
    for(let block = 0; block < n_blocks; block ++) {

      // randomize order of conditions
      var order_shuffle = Array.from(Array(exp_info.objects.length * exp_info.pos.length).keys());
      random.shuffle(order_shuffle);
      new_order.push(order_shuffle);
      var proc_speed_object_block = new_order[0].map(i => proc_speed_object[0][i])
      var proc_speed_pos_block = new_order[0].map(i => proc_speed_pos[0][i])

      // loop through trials
      for (let trial = 0; trial < n_trials; trial ++) {
        
        // define block, trial and phase
        mini_block.push(block);
        trial2block.push(trial);
        phase.push('processing_speed');

        // shuffle the order of key assignment for non-target non-objects
        ret_object_pos.push(exp_info.pos.map((x) => x));
        random.shuffle(ret_object_pos[trial]);
        
        // array with 8 shuffled non-objects and positions for the remaining non-target non-objects
        var ret_other_object = exp_info.objects_name.map(x => x);
        var ret_other_object_pos = ret_object_pos[trial].map(x => x);
        
        // remove the target non-objects and position from the array for the remaining non-target non-objects
        ret_other_object_pos.splice(ret_other_object_pos.indexOf(proc_speed_pos_block[trial]), 1);
        ret_other_object.splice(ret_other_object.indexOf(proc_speed_object_block[trial]), 1);

        // add to array for all trials
        ret_other_object_positions.push(ret_other_object_pos)
        ret_other_objects.push(ret_other_object)
        
      };
    };

    // create trial object with all variables
    var Trial = trial2block.map((trial2block, index) => {

      return Object.assign({}, {
      block: mini_block[index],
      trial: trial2block,
      phase: phase[index],
      
      retrieval_order: new_order[0],
      proc_speed_object: proc_speed_object_block[index],
      proc_speed_pos: proc_speed_pos_block[index],
      
      ret_other_object_pos: ret_other_object_positions[index],
      ret_other_object: ret_other_objects[index],
      
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
        binding_objects_name:any = [],
        binding_objects_pos:any = [],
        position:any = [],
        new_order:any = [],
        ret_object_pos:any = [],
        ret_object:any = [],
        ret_other_object_positions:any = [],
        ret_other_objects:any = [],
        ret_stim:any = [],
        ret_binding_objects_name:any = [],
        ret_binding_objects_pos:any = [],
        ret_stims:any = [],
        ret_binding_object_name:any = [],
        ret_binding_objects_positions:any = [];
    
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

      var number_idx = exp_info.stim_index_dec;


    } else { // experimental trials
    
      var number_idx = exp_info.stim_index_dec;
    }


    // sample Hebb stimuli
    var hebb_stims = random.sample(number_idx, exp_info.setsize);
    var hebb_bindings = random.sample(exp_info.objects_name, exp_info.setsize);

    // remove Hebb stimuli from stimulus index
    if (is_practice == 0) { // experimental trials
      number_idx = removeItems(number_idx, hebb_stims);
    };


    // sample Control stimuli
    let controlPool = number_idx.slice(); // to get random elements


    // loop through blocks
    for(let block = 0; block < n_blocks; block ++) {

      if (is_practice == 0) { // experimental trials

        var list_order:any = random.shuffle_new(exp_info.list_condition);

      } else { 

        var list_order:any = undefined;

      };

      if (block >= exp_info.repeat_controls_stims_after) {
        let block_idx = Array(4).fill(undefined).map((element, index) => (block-exp_info.repeat_controls_stims_after)*4 + index);
        let old_block_stims = block_idx.map(x => rand_stims[x]);
        let old_conditions = block_idx.map(x => list_conditions[x]);
        
        let stims2reuse = [];
        for (let i = 0; i < old_block_stims.length; i++) {
          if (old_conditions[i] == "Control") {
            stims2reuse = stims2reuse.concat(old_block_stims[i]);
          }
        }

        controlPool = controlPool.concat(stims2reuse);
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
          binding_objects_name.push(rand_hebb_bindings);
          
        } else if (list_cond == "Control"){ // Control condition

          if (is_practice == 1) { // practice trials

            // randomly select Control stimuli from stimulus index
            rand_stims.push(random.sample(number_idx, setsize[trial]));

          } else { // experimental trials
            
            let controlStimuli = random.sample(controlPool, exp_info.setsize);
            controlPool = removeItems(controlPool, controlStimuli);

            rand_stims.push(controlStimuli);
            
          };

          // randomly sample Control bindings
          binding_objects_name.push(random.sample(exp_info.objects_name, setsize[trial]));

        };
        // create empty arrays for retrieval variables
        ret_stim = Array(setsize[trial]).fill(0);
        ret_binding_object_name = Array(setsize[trial]).fill('');
        ret_binding_objects_pos = Array(setsize[trial]).fill(0);
        ret_object_pos = Array(setsize[trial]).fill(0);
        ret_object = Array(setsize[trial]).fill(0);
        
        // define binding postions
        binding_objects_pos.push(random.sample(exp_info.pos, setsize[trial]));
        
        // define retrieval order
        position.push(Array.from(Array(setsize[trial]).keys()));
        new_order.push(random.sample(position[trial], setsize[trial]));

        // order variables according to retrieval order
        ret_stim = new_order[trial].map(i => rand_stims[trial][i]);
        ret_binding_object_name = new_order[trial].map(i => binding_objects_name[trial][i]);
        ret_binding_objects_pos = new_order[trial].map(i => binding_objects_pos[trial][i]);
        
        // loop through stimuli
        // create array of 8 objects and positions for the remaining non-target objects
        for (let round = 0; round < setsize[trial]; round ++) {
          ret_object_pos[round] = random.sample(exp_info.pos, exp_info.pos.length);
          ret_object[round] = exp_info.objects_name.map(x => x);
          
        };

        var ret_other_object_pos = ret_object_pos.map(x => x);
        var ret_other_object = ret_object.map(x => x);
        

        for (let stim = 0; stim < setsize[trial]; stim ++) {
          
          ret_other_object_pos[stim].splice(ret_other_object_pos[stim].indexOf(ret_binding_objects_pos[stim]), 1);
          ret_other_object[stim].splice(ret_other_object[stim].indexOf(ret_binding_object_name[stim]), 1);
          
        }

        // add to arrays for all trials
        ret_stims.push(ret_stim);
        ret_binding_objects_name.push(ret_binding_object_name);
        ret_binding_objects_positions.push(ret_binding_objects_pos);
        ret_other_object_positions.push(ret_other_object_pos);
        ret_other_objects.push(ret_other_object);

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

      number_index: rand_stims[index],
      binding_objects: binding_objects_name[index],
      binding_objects_pos: binding_objects_pos[index],
      
      retrieval_order: new_order[index],
      ret_stim: ret_stims[index],
      ret_binding_objects: ret_binding_objects_name[index],
      ret_binding_objects_pos: ret_binding_objects_positions[index],

      ret_other_object_pos: ret_other_object_positions[index],
      ret_other_object: ret_other_objects[index],
      
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
    
    // define the conditions: cross non-objects and key positions
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

        // shuffle the order of key assignment for non-target non-objects
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
        binding_pos:any = [],
        position:any = [],
        new_order:any = [],
        ret_stim:any = [],
        ret_binding_pos:any = [],
        ret_stims:any = [],
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
      
      var number_idx = exp_info.stim_index_proc;

    } else { // experimental trials
    
      var number_idx = exp_info.stim_index_proc;
      
    }

     // sample Hebb stimuli
     var hebb_stims = random.sample(number_idx, exp_info.setsize);
     var hebb_bindings = random.sample(exp_info.pos, exp_info.setsize);

     // remove Hebb stimuli from stimulus index
     if (is_practice == 0) { // experimental trials
      number_idx = removeItems(number_idx, hebb_stims);      
    };
     

    // sample Control stimuli
    let controlPool = number_idx.slice(); // to get random elements

    // loop through blocks
    for(let block = 0; block < n_blocks; block ++) {

      if (is_practice == 0) { // experimental trials
        var list_order:any = random.shuffle_new(exp_info.list_condition);
      } else {
        var list_order:any = undefined;
      }

      if (block >= exp_info.repeat_controls_stims_after) {
        let block_idx = Array(4).fill(undefined).map((element, index) => (block-exp_info.repeat_controls_stims_after)*4 + index);
        let old_block_stims = block_idx.map(x => rand_stims[x]);
        let old_conditions = block_idx.map(x => list_conditions[x]);
        
        let stims2reuse = [];
        for (let i = 0; i < old_block_stims.length; i++) {
          if (old_conditions[i] == "Control") {
            stims2reuse = stims2reuse.concat(old_block_stims[i]);
          }
        }
      
        controlPool = controlPool.concat(stims2reuse);
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
            rand_stims.push(random.sample(number_idx, setsize[trial]));

          } else { // experimental trials
            
            let controlStimuli = random.sample(controlPool, exp_info.setsize);
            controlPool = removeItems(controlPool, controlStimuli);

            rand_stims.push(controlStimuli);
            
          };

          // randomly sample Control bindings
          binding_pos.push(random.sample(exp_info.pos, setsize[trial]));

        };
        
        // create empty arrays for retrieval variables
        ret_stim = Array(setsize[trial]).fill(0);
        ret_binding_pos = Array(setsize[trial]).fill(0);
        
        // define retrieval order
        position.push(Array.from(Array(setsize[trial]).keys()));
        new_order.push(random.sample(position[trial], setsize[trial]));

        // order variables according to retrieval order
        ret_stim = new_order[trial].map(i => rand_stims[trial][i]);
        ret_binding_pos = new_order[trial].map(i => binding_pos[trial][i]);

        // add to arrays for all trials
        ret_stims.push(ret_stim);
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

      number_index: rand_stims[index],
      binding_pos: binding_pos[index],
      
      retrieval_order: new_order[index],
      ret_stim: ret_stims[index],
      ret_binding_pos: ret_binding_positions[index]
      
      });
    });

  };

  // return trial object and stimulus index
  return {Trial, number_idx};
};

