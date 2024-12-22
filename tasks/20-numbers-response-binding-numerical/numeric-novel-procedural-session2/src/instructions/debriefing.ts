
// Import plugins to this file
import htmlButtonResponse from '@jspsych/plugin-html-button-response';

export const debriefing_screen = {
    type: htmlButtonResponse,
    stimulus: `<p class="title">Debriefing</p>
      <div class="main">
        <p class="fb-text">
          Thank you very much for participating in both session of the study <br>
          <strong>"Comparing declarative and procedural bindings: Memorizing objects and responses"</strong>. <br><br> 
          As mentioned before, we investigate in this study how declarative bindings, number-objects associations,  
          and procedural bindings, object-response associations, are represented in working memory. 
          Specifically, how these associations affect memory performance and how this compares among the two binding types.  
          For declarative bindings it has been investigated how the repetition or change of the bindings affects memory performance. 
          In this study, we investigate as well how the repetition and change of procedural bindings across trials affects memory performance and how this compares to declarative bindings. 
          You might have noticed that some of the object-color and object-response associations were repeated multiple times throughout the task. <br><br>
          The task was designed to test your maximal performance, so it is very likely that you found the task challenging.
          We thank you for your participation and hope you enjoyed the study. <br><br>
          In case you have any questions, please contact: <br>
          Elena Venturi, elena.venturi@uzh.ch, Department of Psychology, University of Zurich, Switzerland
        <br> <br>
        </p>
      </div>`,
    choices: ["&nbsp;Continue&nbsp;"],
    data: { screenID: "debriefing" },
  };