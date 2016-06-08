import YesNoQuestion from './AnswerYesNoQuestion'
import MultipleQuestion from './AnswerMultipleChoiceQuestion'
import EssayQuestion from './AnswerEssayQuestion'

var answerTypeMap = {
  yes_no: YesNoQuestion,
  multiple_choice: MultipleQuestion,
  essay: EssayQuestion
};

var getAnswerClass = function (type) {
  if(answerTypeMap[type] !== undefined) {
    return answerTypeMap[type];
  }
};

module.exports = {
  getAnswerClass: getAnswerClass
};
