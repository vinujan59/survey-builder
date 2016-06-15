import React, {Component,PropTypes} from 'react'
import PropsMethodMixin from './../mixins/PropsMethodMixin'
import AnswerRadioInput from './AnswerRadioInput';
import _ from 'lodash-node'
var uniqueId = require('lodash-node/modern/utility/uniqueId');
import {RadioButtonGroup, Divider,Tab,Checkbox, TextField,FontIcon,FloatingActionButton,FlatButton,Paper} from 'material-ui';

var mixins = [PropsMethodMixin];
export default class AnswerMultipleChoiceQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uniqueId('multiple-choice-'),
            value: "",
            answer: {}
        }
    }

    handleChanged(e,value) {
        this.setState({value: value});
        var answer = this.state.answer;
        answer.option = value;
        this.props.onCompleted(this.props.id,answer);
    }

    handleComment(e){
        var answer = this.state.answer;
        answer.comment = e.target.value;
        this.props.onCompleted(this.props.id,answer);
    }

    handleCheckBox(key,e,isChecked){
        var answer = this.state.answer;

        if(!isChecked){
            answer.options.pop(this.props.options[key]);
        }else {
            if (answer.options == null) {
                answer.options = [];
            }
            answer.options.push(this.props.options[key]);
            this.props.onCompleted(this.props.id, answer);
        }
        this.forceUpdate();//this is for update checkboxes
    }

    renderChoices() {
        if(this.props.multi == true){
            return this.props.options.map(function (option, i) {
                return <Checkbox
                    onCheck={this.handleCheckBox.bind(this,i)}
                    checked={_.includes(this.state.answer.options,option)}
                    label={option}
                />;
            }.bind(this));
        }
        else {
            return this.props.options.map(function (option, i) {
                return <AnswerRadioInput
                    label={option}
                    value={option}
                />;
            }.bind(this));
        }
    }

    render() {
        var offset = (this.props.isSub == true) ? 'col-xs-offset-3':'';
        return (
            <Paper zDepth={5} className={"form-group "+offset}>
                <label className="survey-item-label" htmlFor={this.state.id}>{this.props.description}</label>
                {(this.props.multi == true) ?
                    (<div>{this.renderChoices()}</div>):
                    (<div className="survey-item-content">
                    <RadioButtonGroup name={this.state.id} onChange={this.handleChanged.bind(this)}>
                        {this.renderChoices()}
                    </RadioButtonGroup>
                </div>)}
                <Divider />
                {this.props.isComment &&
                <div className="survey-item-content">
                    <TextField
                        multiLine={true}
                        ref="comment"
                        rows={4}
                        onChange={this.handleComment.bind(this)}
                        hintText="Type your comemnts here!"
                        fullWidth={true}
                    /><br/>
                </div>}
            </Paper>
        );
    }
}

AnswerMultipleChoiceQuestion.propTypes = {
    onCompleted: React.PropTypes.func.isRequired
};