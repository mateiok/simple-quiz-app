declare var ace: any;

import {
  externalImport,
  levelSelector,
  getRandomQuestions,
  applyCustomTheme
} from "../utilities";

let options: any = [];

export const initOptions = () => {
  return Object.keys(
    window.ALL_QUESTIONS.reduce((prev, question) => {
      prev[question.level] = question.level;
      if (!question.level) {
        console.warn("no level", question);
      }
      return prev;
    }, {})
  ).map(level => ({
    value: parseInt(level),
    text: level
  }));
};

export const JsQuiz: QuizGenerator = (function () {
  return {
    init: async () => {
      const requires = [
        "js/questions/js.js",
        "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ace.js",
        "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/ext-beautify.js",
        "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3/mode-javascript.js"
      ];
      if (!String.prototype.padStart) {
        requires.push("https://cdn.jsdelivr.net/npm/string-polyfills");
      }

      await externalImport(requires);
      options = initOptions();
    },
    getLevelSelector: (level: number, onChange?: (e: any) => void) =>
      levelSelector(options, level, onChange),

    afterRender: () => {
      applyCustomTheme();
    },

    generateQuestions: (level: number) => {
      const questions = getRandomQuestions(window.ALL_QUESTIONS, level);
      //questions = getExamQuestionsByIdx(indexes);

      // TODO add all answers (print all without answers)
      //questions = ALL_QUESTIONS.filter(q => !q.answers || !q.answers.length);
      return questions;
    },
    reset: () => {}
  };
})();
