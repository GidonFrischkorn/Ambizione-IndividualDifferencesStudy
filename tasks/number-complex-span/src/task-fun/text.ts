import { fail } from "assert";
import { expInfo } from "../settings";

// Text on the screens
export const SCREEN_INFO = {
  question: {
    de: "Welche Zahl ist grösser?"
  },

  startPractice: {
    en: `<div class='main'>
        <h1 class='title'>Practice</h1>
        <p class='fb-text'>We will do some practice to get familiar with the experiment.</p>
      </div>`,
    de: `<div class='main'>
        <h1 class='title'>Übung</h1>
        <p class='fb-text'>Wir werden nun einige Übungen machen, damit Sie mit dem Experiment vertraut werden.</p>
      </div>`,
    cn: `<div class='main'>
        <h1 class='title'>练习环节</h1>
        <p class='fb-text'>接下来我们将进行一些练习以熟悉实验流程。</p>
      </div>`,
  },

  startExperiment: {
    en: `<div class='main'>
        <h1 class='title'>Experiment</h1>
        <p class='fb-text'>Good job! Now we will start running the experiment.</p>
      </div>`,
    de: `<div class='main'>
        <h1 class='title'>Experiment</h1>
        <p class='fb-text'>Gut gemacht! Jetzt beginnen wir mit dem Experiment.</p>
      </div>`,
    cn: `<div class='main'>
        <h1 class='title'>实验环节</h1>
        <p class='fb-text'>
        现在我们将开始进行正式测试。
        测试共有40道题，当你输入答案后，下一道题会自动呈现。
        你无法修改之前的答案或返回上一题。请在8分钟内完成所有题目。
        时间到后，系统会自动提交你的答案。你可以通过屏幕上方的进度条查看剩余题量。
        </p>
      </div>`,
  },

  startTrial: {
    en: ` <p>The next trial will start in <span id="clock" style="color:red">10</span> seconds.</p>
    <p>Press the space bar to start directly.</p>`,
    de: ` <p>Der nächste Durchgang beginnt in <span id="clock" style="color:red">10</span> Sekunden.</p>
    <p>Drücken Sie die Leertaste, um direkt zu beginnen.</p>`,
    cn: ` <p>下一个试次将在 <span id="clock" style="color:red">10</span> 秒后开始。</p>
    <p>按下空格键后将直接开始</p>`,
  },

  blockBreak: function (blockID: number, nBlock: number, lang: string) {
    switch (lang) {
      case "cn":
        return `<div class='main'>
          <h1 class='title'>休息一下吧</h1>
          <p class='fb-text'>
            你已经完成了 ${blockID}/${nBlock} 的实验,
            实验将在 <span id='break' style='color:red'>${expInfo.TIMING.BREAK}</span> 秒后继续。
          </p>
          <p class="fb-text">你可以按下空格键直接开始</p>
          <br>
          <br>
          <p class="body-center" style="color:red">正确率低为正常现象，请不要为此沮丧，坚持完成实验！</p>
          <br>
        </div>`;
      case "en":
        return `<div class='main'>
          <h1 class='title'>Take a break</h1>
          <p class='fb-text'>
            You have completed ${blockID}/${nBlock} blocks. 
            The next block will start in <span id='break' style='color:red'>${expInfo.TIMING.BREAK}</span> seconds.
          </p>
          <p class="fb-text">Press the space bar to skip the break</p>
          <br>
          <br>
          <p class="body-center" style="color:red">A low accuracy has been expected, please don't feel bad if you just have low accuracy!</p>
          <br>
        </div>`;
    }
  },

  fullScreen: {
    en: "The experiment will switch to full screen",
    de: "Das Experiment wechselt in den Vollbildmodus",
    cn: "即将进入全屏模式",
  },

  loginWarning: {
    en: "Please enter your student ID",
    de: "Bitte geben Sie Ihre Matrikelnummer ein",
    cn: "请输入您的学号",
  },

  smaller: {
    en: "Which object is smaller?",
    cn: "哪个物体更小？",
    de: "Welches Objekt ist kleiner?",
  },

  larger: {
    en: "Which object is larger?",
    cn: "哪个物体更大？",
    de: "Welches Objekt ist größer?",
  },

  feedbackMemory: function (accuracy: number, nTest: number, lang: string) {
    switch (lang) {
      case "en":
        return `<div class='fb-text'>You correctly recalled ${accuracy} out of ${nTest} objects.</div>`;
      case "de":
        return `<div class='fb-text'>Sie haben ${accuracy}/${nTest} Zahlen korrekt erinnert.</div>`;
      case "cn":
        return `<div class='fb-text'>您正确回忆了${accuracy}/${nTest}个物体。</div>`;
    }
  },

  feedbackJudgement: function (accuracy: number, nTest: number, lang: string) {
    switch (lang) {
      case "en":
        return `<div class='fb-text'>You correctly judged ${accuracy} out of ${nTest} pairs of objects.</div>`;
      case "de":
        return `<div class='fb-text'>Sie haben ${accuracy}/${nTest} Zahlenpaare korrekt beurteilt.</div>`;
      case "cn":
        return `<div class='fb-text'>您正确判断了${accuracy}/${nTest}对物体。</div>`;
    }
  },

  failed_memory: {
    en: `<div class="main">
      <p class="fb-text">Sorry, your accuracy is lower than 50%. Please try again.</p>
      </div>`,
    de: `<div class="main">
      <p class="fb-text">Entschuldigung, Ihre Genauigkeit ist niedriger als 50%. Bitte versuchen Sie es erneut.</p>
      </div>`,
    cn: `<div class="main">
      <p class="fb-text">抱歉，您的准确率低于50%。请再试一次。</p>
      </div>`,
  },

  failed_judgement: {
    en: `<div class="main">
      <p class="fb-text">Sorry, your accuracy is lower than 60%. Please try again.</p>
      </div>`,
    de: `<div class="main">
      <p class="fb-text">Entschuldigung, Ihre Genauigkeit ist niedriger als 60%. Bitte versuchen Sie es erneut.</p>
      </div>`,
    cn: `<div class="main">
      <p class="fb-text">抱歉，您的准确率低于60%。请再试一次。</p>
      </div>`,
  },

  failed_dual_tasks: {
    en: `<div class="main">
      <p class="fb-text">
      Sorry, either your <span style="color:red">size judgment task</span> 
      or your <span style="color:red">memory task</span> has an accuracy lower than 33%. 
      Please try again.</p>
      </div>`,
    cn: `<div class="main">
      <p class="fb-text">
      抱歉，您的<span style="color:red">大小判断任务</span>或<span style="color:red">记忆任务</span>准确率低于33%。
      请再试一次。</p>
      </div>`,
  },
};

// Button information
export const BUTTON_INFO = {
  continueButton: {
    en: ["Continue"],
    de: ["Weiter"],
    cn: ["继续"],
  },

  prevButton: {
    en: ["Previous"],
    de: ["Zurück"],
    cn: ["上一页"],
  },

  nextButton: {
    en: ["Next"],
    de: ["Weiter"],
    cn: ["下一页"],
  },

  submitButton: {
    en: "Submit",
    de: "Bestätigen",
    cn: "提交",
  },
};

// The information for different situations at the end of the experiment
export const END_INFO = {
  failedResize: {
    en: `<div class="main">
    <h1 class="title">Experiment discontinued</h1>
    <p>
        Unfortunately, your window size is too small to continue the experiment.
        we therefore have to end this experiment and we cannot grant you any course credit.
        If you have any questions, please contact the researcher.
    </p>
    </div>`,
    cn: `<div class="main">
    <h1 class="title">实验中止</h1>
    <p>
        很抱歉，您的窗口尺寸过小，无法继续实验。
        我们不得不结束此实验，无法为您提供任何课程学分。
        如果您有任何问题，请联系研究人员。
    </p>
    </div>`,
  },

  failed: {
    en: `<div class="main">
    <h1 class="title">Failed Attention Check </h1>
    <p>
        Unfortunately, you have left the tab or browser window more often than allowed.
        As we told you at the beginning of the experiment,
        we therefore have to end this experiment prematurely and we cannot grant you any course credit.
        If you have any questions, please contact the researcher.
    </p>
    </div>`,
    de: `<div class="main">
    <h1 class="title">Fehlgeschlagener Aufmerksamkeitstest</h1>
    <p>
        Leider haben Sie das Browser-Tab oder das Browserfenster öfter verlassen als erlaubt.
        Wie wir Ihnen zu Beginn des Experiments mitgeteilt haben,
        müssen wir das Experiment daher vorzeitig beenden und können Ihnen keine Versuchspersonenstunden gutschreiben.
        Wenn Sie Fragen haben, wenden Sie sich bitte an die Studienleitung.
    </p>
    </div>`,
    cn: `<div class="main">
    <h1 class="title">实验中止</h1>
    <p>
        很抱歉，由于您离开标签或浏览器窗口的次数超过了最大值，实验被迫中止。
        您将无法获得实验时长或被试费。如果您有任何问题，请联系主试。
    </p>
    </div>`,
  },

  completed: {
    cn: `<div class="main">
    <h1 class="title">即将开始下一个任务 ... </h1>
    </div>`,
    en: `<div class="main">
    <h1 class="title">We are switching to the next task ... </h1>
    </div>`,
  },
};

export const SURVEY_INFO = {
  TITLE_INFO: {
    cn: `<h1 class="title">事后问卷</h1>`,
    en: `<h1 class="title">Post-Experiment Questionnaire</h1>`,
  },
  DESCRIPTION: {
    cn: `<div class="main">本问卷的内容仅用于实验数据的处理，对您是否能够获取实验报酬没有影响。请您如实填写。</div>`,
    en: `<div class="main">
    This questionnaire is only used for the processing of experimental data 
    and has no effect on whether you can receive the credit. 
    Please fill in truthfully.</div>`,
  },

  AGE_QUES: {
    en: "How old are you?",
    de: "Wie alt sind Sie",
    cn: "您的年龄是？",
  },

  SEX_QUES: {
    en: "What is your sex?",
    de: "Was ist Ihr Geschlecht?",
    cn: "您的性别是？",
  },

  SEX_OPT: {
    en: ["Male", "Female", "Other"],
    de: ["Männlich", "Weiblich", "Andere"],
    cn: ["男", "女", "其他"],
  },

  KOREAN_QUES: {
    cn: "您是否学习过韩文？",
    en: "Have you ever learned Korean?",
  },
  KOREAN_OPT: {
    cn: [
      "从未学习过",
      "接触过个别词语",
      "了解一定的语法和词汇",
      "系统学习过",
      "能够流利地阅读和交流",
    ],
    en: [
      "Never learned",
      "Know a few words",
      "Know some grammar and vocabulary",
      "Learned systematically",
      "Fluent in reading and communication",
    ],
  },
  STRATEGY_QUES: {
    cn: "您在实验中是否采用了某些策略来帮助记忆？",
    en: "Did you use any strategies to help you remember the characters?",
  },

  ATTENTION_QUES: {
    cn: "在实验过程中，您是否受到了外界环境的干扰？",
    en: "Were you distracted during the experiment?",
  },
  ATTENTION_OPT: {
    cn: ["是", "否"],
    en: ["Yes", "No"],
  },
  COMMENT_QUES: {
    cn: "您对本次实验是否有任何建议或意见？",
    en: "Do you have any suggestions or comments on this experiment?",
  },
};
