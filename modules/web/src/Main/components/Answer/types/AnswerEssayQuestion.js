import React, {Component,PropTypes} from 'react'
import PropsMethodMixin from './../mixins/PropsMethodMixin'
var uniqueId = require('lodash-node/modern/utility/uniqueId');
import {Tabs, Tab, TextField,FontIcon,FloatingActionButton,FlatButton,Paper} from 'material-ui';

var mixins = [PropsMethodMixin];
export default class AnswerEssayQuestion extends Component {
    constructor(props) {
        super(props)
    }

    handleComplete(event) {
        //console.log(this.props.item);
        this.props.onCompleted(this.props.id,event.target.value)
    }

    render() {
        //console.log(this.props.id);
        return (
            <Paper zDepth={5} className="form-group">
                <label className="survey-item-label">{this.props.description}</label>
                <div className="survey-item-content">
                    <TextField
                        multiLine={true}
                        onChange={this.handleComplete.bind(this)}
                        rows={3}
                        fullWidth={true}
                    /><br/>
                </div>
            </Paper>
        );
    }
}

AnswerEssayQuestion.propTypes = {
    onCompleted: React.PropTypes.func.isRequired
};
