import YesNoQuestion from './AnswerYesNoQuestion'
import MultipleQuestion from './AnswerMultipleChoiceQuestion'
import EssayQuestion from './AnswerEssayQuestion'
import DropDownQuestion from './AnswerDropDownQuestion'
import MultipleTextBoxQuestion from './AnswerMultipleTextBoxQuestion'
import RatingScaleQuestion from './AnswerRatingScaleQuestion'


var answerTypeMap = {
  yes_no: YesNoQuestion,
  multiple_choice: MultipleQuestion,
  essay: EssayQuestion,
    drop_down:DropDownQuestion,
    multiple_text_box:MultipleTextBoxQuestion,
    rating_scale:RatingScaleQuestion
};

var getAnswerClass = function (type) {
  if(answerTypeMap[type] !== undefined) {
    return answerTypeMap[type];
  }
};

module.exports = {
  getAnswerClass: getAnswerClass
};
