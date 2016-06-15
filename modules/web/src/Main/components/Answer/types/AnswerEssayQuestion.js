import React, {Component,PropTypes} from 'react'
import PropsMethodMixin from './../mixins/PropsMethodMixin'
var uniqueId = require('lodash-node/modern/utility/uniqueId');
import {Tabs, Tab, TextField,FontIcon,FloatingActionButton,FlatButton,Paper,Divider} from 'material-ui';

var mixins = [PropsMethodMixin];
export default class AnswerEssayQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer:{}
        }
    }

    handleComplete(event) {
        var answer = this.state.answer;
        answer.value = event.target.value;
        this.props.onCompleted(this.props.id,answer);
    }

    handleComment(e){
        var answer = this.state.answer;
        answer.comment = e.target.value;
        this.props.onCompleted(this.props.id,answer);
    }

    render() {
        var offset = (this.props.isSub == true) ? 'col-xs-offset-3':'';
        return (
            <Paper zDepth={5} className={"form-group "+offset}>
                <label className="survey-item-label">{this.props.description}</label>
                <div className="survey-item-content">
                    <TextField
                        multiLine={true}
                        onChange={this.handleComplete.bind(this)}
                        rows={3}
                        hintText="Answer Here!"
                        fullWidth={true}
                    /><br/>
                </div>
                <Divider />
                {this.props.isComment &&
                <div className="survey-item-content">
                    <TextField
                        multiLine={true}
                        ref="comment"
                        onChange={this.handleComment.bind(this)}
                        rows={4}
                        hintText="Type your comemnts here!"
                        fullWidth={true}
                    /><br/>
                </div>}
            </Paper>
        );
    }
}

AnswerEssayQuestion.propTypes = {
    onCompleted: React.PropTypes.func.isRequired
};
