import React, {Component} from 'react'
import { Menu,Paper,Divider,RaisedButton,FontIcon} from 'material-ui';
import Draggable from './Draggable'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
require('./../../app.css');
import EditYesNoQuestion from './questions/EditYesNoQuestion'
import EditMultipleChoiceQuestion from './questions/EditMultipleChoiceQuestion'
import EditEssayQuestion from './questions/EditEssayQuestion'


var update = require('react-addons-update');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var mixin = [PureRenderMixin];

const dividerStyle={
    color:"black"
};

var SUPPORTED_QUESTIONS = {
    yes_no: EditYesNoQuestion,
    multiple_choice: EditMultipleChoiceQuestion,
    essay: EditEssayQuestion
};

export default class SurveyEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropZoneEntered: false,
            title: '',
            introduction: '',
            questions: []
        }
    }

    render() {
        var questions = this.state.questions.map(function (q, i) {
            var Question = SUPPORTED_QUESTIONS[q.type];
            return (<Question
                    onChange =  {this.handleQuestionChange.bind(this,i,q)}
                    onRemove =  {this.handleQuestionRemove.bind(this,i)}
                    question =  {q}
                    key={i} />
            );
        }.bind(this));
        console.log('--------------------');
        questions.map(function(q){
            console.log(q.props.question);
        });
        var dropZoneEntered = '';
        if (this.state.dropZoneEntered) {
            dropZoneEntered = 'drag-enter';
        }

        return (
            <div className="container-fluid survey-editor">
                <div className="row">
                    <div className="col-xs-3">
                        <br/>
                        <Paper zDepth={5}>
                            <Draggable/>
                        </Paper>
                    </div>
                    <div className="col-xs-9 ">
                        <br/>
                        <Paper className={'drop-zone well well-drop-zone ' + dropZoneEntered}
                               onDragOver={this.handleDragOver.bind(this)}
                               onDragEnter={this.handleDragEnter.bind(this)}
                               onDragLeave={this.handleDragLeave.bind(this)}
                               onDrop={this.handleDrop.bind(this)}>
                            Drag and drop a module from the left
                        </Paper>
                        <Divider style={dividerStyle}/>
                        <ReactCSSTransitionGroup transitionName='question' transitionAppear={true}
                                                 transitionAppearTimeout={500} transitionEnterTimeout={500}
                                                 transitionLeaveTimeout={500}>
                            <br/>
                            {questions}
                        </ReactCSSTransitionGroup>
                        <div className='actions'>
                            <RaisedButton
                                label="Save"
                                secondary={true}
                                icon={<FontIcon className="fa fa-save" onClick={this.handleSaveClicked.bind(this)}/>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleDragOver(ev) {
        // This allows handleDropZoneDrop to be called
        // https://code.google.com/p/chromium/issues/detail?id=168387
        ev.preventDefault();
    }

    handleDragEnter() {
        this.setState({dropZoneEntered: true});
    }

    handleDragLeave() {
        this.setState({dropZoneEntered: false});
    }

    handleDrop(ev) {
        var questionType = ev.dataTransfer.getData('questionType');
        var questions = update(this.state.questions, {
            $push: [{type: questionType}]
        });

        this.setState({
            questions: questions,
            dropZoneEntered: false
        });
    }

    handleQuestionChange(key, newQuestion) {
        var questions = update(this.state.questions, {
            $splice: [[key, 1, newQuestion]]
        });

        this.setState({questions: questions});
    }

    handleQuestionRemove(key) {
        var questions = update(this.state.questions, {
            $splice: [[key, 1]]
        });

        this.setState({questions: questions});
    }

    handleSaveClicked(ev) {
        SurveyActions.save({
            title: this.state.title,
            introduction: this.state.introduction,
            questions: this.state.questions
        });
    }
}