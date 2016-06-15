import React, {Component,PropTypes} from 'react'
import PropsMethodMixin from './../mixins/PropsMethodMixin'
import AnswerRadioInput from './AnswerRadioInput';
import _ from 'lodash-node'
var uniqueId = require('lodash-node/modern/utility/uniqueId');
import {MenuItem ,DropDownMenu,Divider, TextField,Paper} from 'material-ui';

export default class AnswerDropDownQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uniqueId('multiple-choice-'),
            value: 1,
            answer: {}
        }
    }

    handleChange(e, index, value) {
        this.setState({value:value});
        var answer = this.state.answer;
        answer.option = value;
        this.props.onCompleted(this.props.id, answer);
    }

    handleComment(e) {
        var answer = this.state.answer;
        answer.comment = e.target.value;
        this.props.onCompleted(this.props.id, answer);
    }

    renderMenus() {
        return this.props.options.map(function (option, i) {
            return <MenuItem value={option} primaryText={option} />;
        }.bind(this));
    }

    render() {
        var offset = (this.props.isSub == true) ? 'col-xs-offset-3' : '';
        return (
            <Paper zDepth={5} className={"form-group "+offset}>
                <label className="survey-item-label" htmlFor={this.state.id}>{this.props.description}</label>
                <div className="survey-item-content">
                    <DropDownMenu
                        onChange={this.handleChange.bind(this)}
                        secondary={false}
                        value={this.state.value}
                    >
                        <MenuItem value={1} primaryText="Select an answer" disabled={true} />
                        {this.renderMenus()}
                    </DropDownMenu>
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

AnswerDropDownQuestion.propTypes = {
    onCompleted: React.PropTypes.func.isRequired
};