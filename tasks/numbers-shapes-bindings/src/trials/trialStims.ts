// import
import { random } from "@coglabuzh/webpsy.js";
import { removeItems } from "../task-fun/removeItems";

// define variables for trials
export function MakeTrial(exp_info, is_practice: number = 0, task) {
  
  // processing speed trials
  if (task == "color_check") { // processing speed trials

    // define arrays for variables
    var mini_block:any = [],
        trial2block:any = [],
        phase:any = [],
        color_check_col:any = [],
        color_check_pos:any = [],
        new_order:any = [],
        ret_col_pos:any = [],
        ret_other_col_positions:any = [],
        ret_other_cols:any = []
        //ret_other_cols_angs:any = [];

    // define number of blocks and trials
    var n_blocks = exp_info.n_color_check_blocks;
    var n_trials = exp_info.n_color_check_trials;
    
    // define the conditions: cross colors and key positions
    color_check_col.push(Array(exp_info.cols_name).flat());
    color_check_pos.push(Array(exp_info.pos).flat());
    
    // loop through blocks
    for(let block = 0; block < n_blocks; block ++) {

      // randomize order of conditions
      var order_shuffle = Array.from(Array(exp_info.cols.length).keys());
      random.shuffle(order_shuffle);
      new_order.push(order_shuffle);
      var color_check_col_block = new_order[0].map(i => color_check_col[0][i])
      //var color_check_col_block_angs = new_order[0].map(i => exp_info.cols_angles[Number(color_check_col[0][i].split('col')[1])]);
      var color_check_pos_block = new_order[0].map(i => color_check_pos[0][i])

      // loop through trials
      for (let trial = 0; trial < n_trials; trial ++) {
        
        // define block, trial and phase
        mini_block.push(block);
        trial2block.push(trial);
        phase.push('color_check');

        // shuffle the order of key assignment for non-target color dots
        ret_col_pos.push(exp_info.pos.map((x) => x));
        random.shuffle(ret_col_pos[trial]);
        
        // array with 8 shuffled colors and positions for the remaining non-target color dots
        var ret_other_col = exp_info.cols_name.map(x => x);
        //var ret_other_col_angs = Array.from(Array(exp_info.cols_angles.length - 1).keys());
        var ret_other_col_pos = ret_col_pos[trial].map(x => x);
        
        // remove the target color and position from the array for the remaining non-target color dots
        ret_other_col_pos.splice(ret_other_col_pos.indexOf(color_check_pos_block[trial]), 1);
        ret_other_col.splice(ret_other_col.indexOf(color_check_col_block[trial]), 1);
        //ret_other_col_angs = ret_other_col_angs.map(i => exp_info.cols_angles[Number(ret_other_col[i].split('col')[1])]);

        // add to array for all trials
        ret_other_col_positions.push(ret_other_col_pos)
        ret_other_cols.push(ret_other_col)
        //ret_other_cols_angs.push(ret_other_col_angs)
        
      };
    };

    // create trial object with all variables
    var Trial = trial2block.map((trial2block, index) => {

      return Object.assign({}, {
      block: mini_block[index],
      trial: trial2block,
      phase: phase[index],
      
      retrieval_order: new_order[0],
      color_check_col: color_check_col_block[index],
      //color_check_col_angle: color_check_col_block_angs[index],
      color_check_pos: color_check_pos_block[index],
      
      ret_other_col_pos: ret_other_col_positions[index],
      ret_other_col: ret_other_cols[index],
      //ret_other_cols_angles: ret_other_cols_angs[index]
      
      });
    })      
  } else if (task == "finger_check") {

    // define arrays for variables
    var mini_block:any = [],
        trial2block:any = [],
        phase:any = [],
        finger_check_pos:any = [],
        new_order:any = [],
        ret_col_pos:any = [],
        ret_other_col_positions:any = [],
        ret_other_cols:any = []
        //ret_other_cols_angs:any = [];

    // define number of blocks and trials
    var n_blocks = exp_info.n_finger_check_blocks;
    var n_trials = exp_info.n_finger_check_trials;
    
    // define the conditions: cross colors and key positions -> matrix with all the possible combinations of colors and positions (?)
    finger_check_pos.push(Array(exp_info.shapes.length).fill(exp_info.pos).flat());
    
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
        proc_speed_shape:any = [],
        proc_speed_pos:any = [],
        new_order:any = [],
        ret_shape_pos:any = [],
        ret_other_shape_positions:any = [],
        ret_other_shapes:any = []
        //ret_other_cols_angs:any = [];

    // define number of blocks and trials
    var n_blocks = exp_info.n_proc_speed_blocks;
    var n_trials = exp_info.n_proc_speed_trials;
    
    // define the conditions: cross colors and key positions
    proc_speed_shape.push(Array(exp_info.pos.length).fill(exp_info.shapes_name).flat().sort());
    proc_speed_pos.push(Array(exp_info.shapes.length).fill(exp_info.pos).flat());
    
    // loop through blocks
    for(let block = 0; block < n_blocks; block ++) {

      // randomize order of conditions
      var order_shuffle = Array.from(Array(exp_info.shapes.length * exp_info.pos.length).keys());
      random.shuffle(order_shuffle);
      new_order.push(order_shuffle);
      var proc_speed_shape_block = new_order[0].map(i => proc_speed_shape[0][i])
      //var proc_speed_shape_block_angs = new_order[0].map(i => exp_info.shapes_angles[Number(proc_speed_shape[0][i].split('shape')[1])]);
      var proc_speed_pos_block = new_order[0].map(i => proc_speed_pos[0][i])

      // loop through trials
      for (let trial = 0; trial < n_trials; trial ++) {
        
        // define block, trial and phase
        mini_block.push(block);
        trial2block.push(trial);
        phase.push('processing_speed');

        // shuffle the order of key assignment for non-target color dots
        ret_shape_pos.push(exp_info.pos.map((x) => x));
        random.shuffle(ret_shape_pos[trial]);
        
        // array with 8 shuffled colors and positions for the remaining non-target color dots
        var ret_other_shape = exp_info.shapes_name.map(x => x);
        //var ret_other_shape_angs = Array.from(Array(exp_info.shapes_angles.length - 1).keys());
        var ret_other_shape_pos = ret_shape_pos[trial].map(x => x);
        
        // remove the target color and position from the array for the remaining non-target color dots
        ret_other_shape_pos.splice(ret_other_shape_pos.indexOf(proc_speed_pos_block[trial]), 1);
        ret_other_shape.splice(ret_other_shape.indexOf(proc_speed_shape_block[trial]), 1);
        //ret_other_col_angs = ret_other_shape_angs.map(i => exp_info.cols_angles[Number(ret_other_col[i].split('col')[1])]);

        // add to array for all trials
        ret_other_shape_positions.push(ret_other_shape_pos)
        ret_other_shapes.push(ret_other_shape)
        //ret_other_shapes_angs.push(ret_other_shape_angs)
        
      };
    };

    // create trial object with all variables
    var Trial = trial2block.map((trial2block, index) => {

      return Object.assign({}, {
      block: mini_block[index],
      trial: trial2block,
      phase: phase[index],
      
      retrieval_order: new_order[0],
      proc_speed_shape: proc_speed_shape_block[index],
      //proc_speed_shape_angle: proc_speed_shape_block_angs[index],
      proc_speed_pos: proc_speed_pos_block[index],
      
      ret_other_shape_pos: ret_other_shape_positions[index],
      ret_other_shape: ret_other_shapes[index],
      //ret_other_shapes_angles: ret_other_shapes_angs[index]
      
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
        rand_orders_int:any = [],
        binding_shapes_name:any = [],
        binding_shapes_pos:any = [],
        position:any = [],
        new_order:any = [],
        ret_shape_pos:any = [],
        ret_shape:any = [],
        //ret_shape_angs:any = [],
        ret_other_shape_positions:any = [],
        ret_other_shapes:any = [],
        ret_other_shapes_angles:any = [],
        ret_stim:any = [],
        ret_binding_shapes_name:any = [],
        //ret_binding_shapes_angs:any = [],
        ret_binding_shapes_pos:any = [],
        ret_stims:any = [],
        ret_binding_shape_name:any = [],
        //ret_binding_shapes_angs:any = [],
        ret_binding_shapes_positions:any = [];
    
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

      var number_idx = removeItems(Array.from(Array(exp_info.stim_count).keys()).map(i => i + 1), exp_info.stim_index_dec);


    } else { // experimental trials
    
      var number_idx = exp_info.stim_index_dec;
    }

    // sample Hebb stimuli
    var hebb_stims = random.sample(number_idx, exp_info.setsize);
    var hebb_bindings = random.sample(exp_info.shapes_name, exp_info.setsize);

    // remove Hebb stimuli from stimulus index
    if (is_practice == 0) { // experimental trials
      number_idx = removeItems(number_idx, hebb_stims);
    };
    
    // sample Interference stimuli
    var int_stims = random.sample(number_idx, exp_info.setsize);
    var int_bindings = random.sample(exp_info.shapes_name, exp_info.setsize);

    // remove Interference stimuli from stimulus index
    if (is_practice == 0) { // experimental trials
      number_idx = removeItems(number_idx, int_stims);
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
          binding_shapes_name.push(rand_hebb_bindings);
          
        } else if (list_cond == "Interference"){ // Interference conditio

          // randomly order Interfernce stims and  bindings
          var rand_order = random.shuffle_new(Array.from(Array(setsize[trial]).keys()));

          // check if any bindings are the same in the last Interference trial
          // if yes, shuffle again
          if (block != 0) { // for every mini-block except block 0
    
            // while loop: shuffle until all binding elements from current and previous interfernce trial are unequal
            while ( ! rand_order.every((val, index) => val != rand_orders_int[block-1][index]) ) { 
              
              rand_order = random.shuffle_new(Array.from(Array(setsize[trial]).keys()));
            
            };  
          };

          // update orders for Interference bindings after while loop
          rand_orders_int.push(rand_order);
          var rand_orders_int_bindings = rand_order.map(i => int_bindings[i]);

          // randomly order Interference bindings at encoding
          var rand_order2 = random.shuffle_new(Array.from(Array(setsize[trial]).keys()));
         
          // reorder and add stims and bindings to array
          var rand_int_stims = rand_order2.map(i => int_stims[i]);
          var rand_int_bindings = rand_order2.map(i => rand_orders_int_bindings[i]);

          rand_stims.push(rand_int_stims);
          binding_shapes_name.push(rand_int_bindings);          

        } else if (list_cond == "Control"){ // Control condition

          if (is_practice == 1) { // practice trials

            // randomly select Control stimuli from stimulus index
            rand_stims.push(random.sample(number_idx, setsize[trial]));

          } else { // experimental trials

            // check to make sure that Hebb and Interference stimuli are not used for Control
            let overlap = 1;

            while (overlap == 1) {

              // randomly select Control stimuli from stimulus index
              var sample_stims:any = random.sample(number_idx, setsize[trial]);

              if (sample_stims.some((val) => hebb_stims.includes(val)) || sample_stims.some((val) => int_stims.includes(val))) {
                overlap = 1;
              } else {
                overlap = 0;
              }
            };

            // add stimuli to array
            rand_stims.push(sample_stims);
            number_idx = removeItems(number_idx, rand_stims[trial]);
            
          };

          // randomly sample Control bindings
          binding_shapes_name.push(random.sample(exp_info.shapes_name, setsize[trial]));

        };
        
        // create empty arrays for retrieval variables
        ret_stim = Array(setsize[trial]).fill(0);
        ret_binding_shape_name = Array(setsize[trial]).fill('');
        //ret_binding_shapes_angs = Array(setsize[trial]).fill(0);
        ret_binding_shapes_pos = Array(setsize[trial]).fill(0);
        ret_shape_pos = Array(setsize[trial]).fill(0);
        ret_shape = Array(setsize[trial]).fill(0);
        //ret_shape_angs = Array(setsize[trial]).fill(0);
        
        // define binding postions
        binding_shapes_pos.push(random.sample(exp_info.pos, setsize[trial]));
        
        // define retrieval order
        position.push(Array.from(Array(setsize[trial]).keys()));
        new_order.push(random.sample(position[trial], setsize[trial]));

        // order variables according to retrieval order
        ret_stim = new_order[trial].map(i => rand_stims[trial][i]);
        ret_binding_shape_name = new_order[trial].map(i => binding_shapes_name[trial][i]);
        //ret_binding_shapes_angs = new_order[trial].map(i => exp_info.cols_angles[Number(binding_shapes_name[trial][i].split('shape')[1])]);
        ret_binding_shapes_pos = new_order[trial].map(i => binding_shapes_pos[trial][i]);
        
        // loop through stimuli
        // create array of 8 shapes and positions for the remaining non-target shapes
        for (let round = 0; round < setsize[trial]; round ++) {
          ret_shape_pos[round] = random.sample(exp_info.pos, exp_info.pos.length);
          ret_shape[round] = exp_info.shapes_name.map(x => x);
          //ret_shape_angs[round] = Array.from(Array(exp_info.cols_angles.length - 1).keys());
          
        };

        var ret_other_shape_pos = ret_shape_pos.map(x => x);
        var ret_other_shape = ret_shape.map(x => x);
        //var ret_other_shapes_angs = ret_shape_angs.map(x => x);
        
        // remove target shape and position from array and define shapes in degrees of color wheel 
        // for the remaining non-target color dots
        for (let stim = 0; stim < setsize[trial]; stim ++) {
          
          ret_other_shape_pos[stim].splice(ret_other_shape_pos[stim].indexOf(ret_binding_shapes_pos[stim]), 1);
          ret_other_shape[stim].splice(ret_other_shape[stim].indexOf(ret_binding_shape_name[stim]), 1);
          //ret_other_shapes_angs[stim] = ret_other_shapes_angs[stim].map(i => exp_info.shapes_angles[Number(ret_other_shape[stim][i].split('shape')[1])]);
          
        }

        // add to arrays for all trials
        ret_stims.push(ret_stim);
        ret_binding_shapes_name.push(ret_binding_shape_name);
        //ret_binding_shapes_angs.push(ret_binding_shapes_angs);
        ret_binding_shapes_positions.push(ret_binding_shapes_pos);
        ret_other_shape_positions.push(ret_other_shape_pos);
        ret_other_shapes.push(ret_other_shape);
        //ret_other_shapes_angles.push(ret_other_shapes_angs);

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
      binding_shapes: binding_shapes_name[index],
      binding_shapes_pos: binding_shapes_pos[index],
      
      retrieval_order: new_order[index],
      ret_stim: ret_stims[index],
      ret_binding_shapes: ret_binding_shapes_name[index],
      //ret_binding_shapes_angles: ret_binding_shapes_angs[index],
      ret_binding_shapes_pos: ret_binding_shapes_positions[index],

      ret_other_shape_pos: ret_other_shape_positions[index],
      ret_other_shape: ret_other_shapes[index],
      ret_other_shape_angles: ret_other_shapes_angles[index]
      
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
    
    // define the conditions: cross colors and key positions
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

        // shuffle the order of key assignment for non-target color dots
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
        rand_orders_int:any = [],
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
      
      var number_idx = removeItems(Array.from(Array(exp_info.stim_count).keys()).map(i => i + 1), exp_info.stim_index_proc);

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
     
     // sample Interference stimuli
     var int_stims = random.sample(number_idx, exp_info.setsize);
     var int_bindings = random.sample(exp_info.pos, exp_info.setsize);

     // remove Interference stimuli from stimulus index
     if (is_practice == 0) { // experimental trials
      number_idx = removeItems(number_idx, int_stims);
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
          
        } else if (list_cond == "Interference"){ // Interference condition

          // randomly order Interference bindings
          var rand_order = random.shuffle_new(Array.from(Array(setsize[trial]).keys()));

          // check if any bindings are the same in the last Interference trial
          // if yes, shuffle again
          if (block != 0) { // for every mini-block except block 0
    
            // while loop: shuffle until all binding elements from current and previous interfernce trial are unequal
            while ( ! rand_order.every((val, index) => val != rand_orders_int[block-1][index]) ) { 
              
              rand_order = random.shuffle_new(Array.from(Array(setsize[trial]).keys()));
            
            };  
          };

          // update orders for Interference bindings after while loop
          rand_orders_int.push(rand_order);
          var rand_orders_int_bindings = rand_order.map(i => int_bindings[i]);

          // randomly order Interference bindings at encoding
          var rand_order2 = random.shuffle_new(Array.from(Array(setsize[trial]).keys()));
         
          // reorder and add stims and bindings to array
          var rand_int_stims = rand_order2.map(i => int_stims[i]);
          var rand_int_bindings = rand_order2.map(i => rand_orders_int_bindings[i]);

          rand_stims.push(rand_int_stims);
          binding_pos.push(rand_int_bindings);          

        } else if (list_cond == "Control"){ // Control condition

          if (is_practice == 1) { // practice trials

            // randomly select Control stimuli from stimulus index
            rand_stims.push(random.sample(number_idx, setsize[trial]));

          } else { // experimental trials

            // check to make sure that Hebb and Interference stimuli are not used for Control
            let overlap = 1;

            while (overlap == 1) {

              // randomly select Control stimuli from stimulus index
              var sample_stims:any = random.sample(number_idx, setsize[trial]);

              if (sample_stims.some((val) => hebb_stims.includes(val)) || sample_stims.some((val) => int_stims.includes(val))) {
                overlap = 1;
              } else {
                overlap = 0;
              }
            };

            // add stimuli to array
            rand_stims.push(sample_stims);
            number_idx = removeItems(number_idx, rand_stims[trial]);
            
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

    console.log(number_idx)
  };

  // return trial object and stimulus index
  return {Trial, number_idx};
};

