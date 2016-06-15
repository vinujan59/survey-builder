import React, {Component,PropTypes} from 'react'
import PropsMethodMixin from './../mixins/PropsMethodMixin'
import AnswerRadioInput from './AnswerRadioInput';
import _ from 'lodash-node'
var uniqueId = require('lodash-node/modern/utility/uniqueId');
import {MenuItem ,DropDownMenu,Checkbox,Divider,RadioButtonGroup,RadioButton, TextField,Paper,Table,TableHeader,TableBody,TableRow,TableHeaderColumn,TableRowColumn} from 'material-ui';
require('./../../../RadioButton.css');

export default class AnswerRatingScaleQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uniqueId('multiple-choice-'),
            value: 1,
            answer: {}
        }
    }

    handleChange(e, index, value) {
        this.setState({value: value});
        var answer = this.state.answer;
        answer.option = value;
        this.props.onCompleted(this.props.id, answer);
    }

    handleRadioButton(row,column){
        var answer = this.state.answer;
        if (answer.options == null) {
            answer.options = {};
        }
        answer.options[row] = column;
        this.props.onCompleted(this.props.id, answer);
    }

    handleCheckBox(row,column,e,isChecked){
        var answer = this.state.answer;
        if(!isChecked){
            answer.options[row].pop(column);
        }else {
            if (answer.options == null) {
                answer.options = {};
            }
            if(answer.options[row] == null){
                answer.options[row] = []
            }
            answer.options[row].push(column);
            this.props.onCompleted(this.props.id, answer);
        }
    }

    handleComment(e) {
        var answer = this.state.answer;
        answer.comment = e.target.value;
        this.props.onCompleted(this.props.id, answer);
    }

    renderOptions(key) {
        if (this.props.multi) {
            return this.props.columnOptions.map(function (option, i) {
                return (
                    <TableRowColumn>
                        <Checkbox
                            label=""
                            onCheck={this.handleCheckBox.bind(this,key,option)}
                            checked={_.has(this.state.answer.options,key) && _.includes(this.state.answer.options[key],option)}
                        />
                    </TableRowColumn>
                );
            }.bind(this));
        } else {
            return this.props.columnOptions.map(function (option, i) {
                return (
                    <TableRowColumn>
                        <input
                            type="radio"
                            value={option}
                            name={key}
                            onClick={this.handleRadioButton.bind(this,key,option)}
                        />
                    </TableRowColumn>
                );
            }.bind(this));
        }
    }

    renderRows() {
        return this.props.rowOptions.map(function (option, i) {
            return (
                <TableRow>
                    <TableRowColumn>{option}</TableRowColumn>
                    {this.renderOptions(option)}
                </TableRow>
            );
        }.bind(this));
    }

    renderHeaders() {
        return this.props.columnOptions.map(function (option, i) {
            return <TableHeaderColumn key={i}>{option}</TableHeaderColumn>;
        }.bind(this));
    }

    render() {
        var offset = (this.props.isSub == true) ? 'col-xs-offset-3' : '';
        return (
            <Paper zDepth={5} className={"form-group "+offset}>
                <label className="survey-item-label" htmlFor={this.state.id}>{this.props.description}</label>
                <div className="survey-item-content">
                    <Table>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn></TableHeaderColumn>
                                {this.renderHeaders()}
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false} stripedRows={true} showRowHover={true}>
                            {this.renderRows()}
                        </TableBody>
                    </Table>
                </div>
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

AnswerRatingScaleQuestion.propTypes = {
    onCompleted: React.PropTypes.func.isRequired
};