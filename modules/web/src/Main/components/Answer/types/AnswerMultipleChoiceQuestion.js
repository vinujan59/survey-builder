import React, {Component,PropTypes} from 'react'
import PropsMethodMixin from './../mixins/PropsMethodMixin'
import AnswerRadioInput from './AnswerRadioInput';
var uniqueId = require('lodash-node/modern/utility/uniqueId');
import {RadioButtonGroup, Tab, TextField,FontIcon,FloatingActionButton,FlatButton,Paper} from 'material-ui';

var mixins = [PropsMethodMixin];
export default class AnswerMultipleChoiceQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uniqueId('multiple-choice-'),
            value: ""
        }
    }

    handleChanged(e,value) {
        this.setState({value: value});
        this.props.onCompleted(this.props.id,value);
    }

    renderChoices() {
        return this.props.options.map(function (option, i) {
            return <AnswerRadioInput
                label = {option}
                value = {option}
            />;
        }.bind(this));
    }

    render() {
        return (
            <Paper zDepth={5} className="form-group">
                <label className="survey-item-label" htmlFor={this.state.id}>{this.props.description}</label>
                <div className="survey-item-content">
                    <RadioButtonGroup name={this.state.id} onChange={this.handleChanged.bind(this)}>
                        {this.renderChoices()}
                    </RadioButtonGroup>
                </div>
            </Paper>
        );
    }
}

AnswerMultipleChoiceQuestion.propTypes = {
    onCompleted: React.PropTypes.func.isRequired
};