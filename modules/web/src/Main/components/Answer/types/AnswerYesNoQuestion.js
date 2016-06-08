import React, {Component,PropTypes} from 'react'
import PropsMethodMixin from './../mixins/PropsMethodMixin'
import AnswerMultipleChoiceQuestion from './AnswerMultipleChoiceQuestion';
var merge = require('lodash-node/modern/object/merge');
var uniqueId = require('lodash-node/modern/utility/uniqueId');

export default class AnswerYesNoQuestion extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var options = ["Yes", "No"];
        var props = merge({}, this.props, {
            options : options
        });
        return <AnswerMultipleChoiceQuestion {...props} />;
    }
}
AnswerYesNoQuestion.propTypes = {
    onCompleted: React.PropTypes.func.isRequired
};

