import React, {Component,PropsTypes} from 'react'
import AltContainer from 'alt-container';
import { browserHistory } from 'react-router';
import {Tabs, Tab, FontIcon,FloatingActionButton,FlatButton,Paper} from 'material-ui';
import SelectQuestion from './SelectQuestion';
import SurveyActions from './../../actions/SurveyActions'
import SurveyStore from './../../stores/SurveyStore'
var merge = require('lodash-node/modern/object/merge');
var _ = require('lodash-node');

const introStyle = {
    textAlign: "center"
};
export default class AnswerSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            survey: SurveyStore.getState().survey,
            results: {}
        }
    }

    componentDidMount() {
        SurveyStore.listen((state) => {
            this.setState({survey: state.survey})
        });
    }

    componentWillUnmount() {
        SurveyStore.unlisten((state) => {
            this.setState({survey: state.survey})
        });
    }


    handleItemCompleted(id, value) {
        var results = this.state.results;
        results[id] = value;
        this.setState({
            results: results
        });
        console.log(JSON.stringify(this.state.results));
    }

    handleClick() {
        console.log(JSON.stringify(this.state.results));
        SurveyActions.answersSave(this.state.results);
    }

    renderItems() {
        return this.state.survey.questions.map(function (item, i) {
            item.id = i;//put a id for every questions
            var props = merge({}, {
                key: item.id,
                id: item.id,
                item: item,
                onCompleted: this.handleItemCompleted.bind(this)
            });
            var itemView = <SelectQuestion {...props} />;
            return itemView;
        }.bind(this));
    }

    render() {
        console.log(JSON.stringify(this.state.survey));
        return (
            <Paper zDepth={3} className="survey container">
                {!_.isEmpty(this.state.survey) &&
                (<Paper zDepth={5} style={introStyle}>
                    <h1>{this.state.survey.title}</h1>
                    <p>{this.state.survey.introduction}</p>
                </Paper>)}
                {!_.isEmpty(this.state.survey) && this.renderItems()}
                {!_.isEmpty(this.state.survey) &&
                    (<FlatButton
                        className="pull-right"
                        label="Submit"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={this.handleClick.bind(this)} />
                    )}
            </Paper>
        );
    }
}
