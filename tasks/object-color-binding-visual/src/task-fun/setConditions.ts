// import 
import { jsPsych } from "../jsp";

// function to retrieve condition from jatos batch session and move it from "pending" to "started"
export const setConditions = function (conditions) {
    
    const condition_pool = conditions;
    console.log('getting pending conditions');
    
    // retrieve condtiion from "pending"
    //@ts-ignore
    var condition = jatos.batchSession.find('/pending/0')

    if (!condition_pool.includes(condition)) { // if no condition is pending, end experiment
        
        jsPsych.endExperiment("No conditions available. Please contact the experimenter.");

    } else { // define condition
        //@ts-ignore
        jatos.batchSession.move('/pending/0', '/started/0')
            .then(() => {
                console.log('starting with condition ' + condition);
                
            })
            .catch(() => {
                console.log('failed to start condition');
                setTimeout(() => setConditions(conditions), 1);
                setConditions(conditions);
            })
    }

    // return condition
    return condition;
   }

// function to move condition from "started" to "finished" at the end of the experiment
export const finishCondition = function(condition) {

    console.log('adding finished conditions')

    // add condition to "finished"
    //@ts-ignore
    jatos.batchSession.add('/finished/-', condition)
        .then(() => {
            console.log('done')
        })
        .catch(() => {
            console.log('failed to finish condition')
            setTimeout(() => finishCondition(condition), 1)
        })
}
