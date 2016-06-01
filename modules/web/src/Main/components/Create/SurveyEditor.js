import React, {Component} from 'react'
import { Menu,Paper,Divider,RaisedButton,FontIcon,Dialog,TextField,FlatButton} from 'material-ui';
import Draggable from './Draggable'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
require('./../../app.css');
import EditYesNoQuestion from './questions/EditYesNoQuestion'
import EditMultipleChoiceQuestion from './questions/EditMultipleChoiceQuestion'
import EditEssayQuestion from './questions/EditEssayQuestion'
import SurveyActions from './../../actions/SurveyActions'

var update = require('react-addons-update');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var mixin = [PureRenderMixin];

const dividerStyle = {
    color: "black"
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
            titleDilaogOpen: false,
            dropZoneEntered: false,
            questions: []
        }
    }

    detailClose() {
        SurveyActions.save({
            title: this.refs.title.getValue(),
            introduction: this.refs.introduction.getValue(),
            questions: this.state.questions
        });
        this.setState({titleDilaogOpen: false});
    }

    render() {
        var questions = this.state.questions.map(function (q, i) {
            var Question = SUPPORTED_QUESTIONS[q.type];
            return (<Question
                    onChange={this.handleQuestionChange.bind(this,i,q)}
                    onRemove={this.handleQuestionRemove.bind(this,i)}
                    question={q}
                    key={i}/>
            );
        }.bind(this));
        questions.reverse();
        //questions.map(function(q){
        //    console.log(q.props.question);
        //});
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
                        <div className='actions'>
                            <RaisedButton
                                label="Save"
                                secondary={true}
                                onClick={this.handleSaveClicked.bind(this)}
                                icon={<FontIcon className="fa fa-save" />}
                            />
                        </div>
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
                    </div>
                </div>
                <Dialog
                    title="Please Enter Details."
                    actions={[
                              <FlatButton
                                label="Later"
                                secondary={true}
                                onTouchTap={()=>{this.setState({titleDilaogOpen:false})}}
                              />,
                              <FlatButton
                                label="Submit"
                                primary={true}
                                keyboardFocused={true}
                                onTouchTap={this.detailClose.bind(this)}
                              />
                            ]}
                    modal={true}
                    open={this.state.titleDilaogOpen}
                >
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <TextField
                                type="text"
                                hintText="Please enter title of survey"
                                ref='title'
                                fullWidth={true}
                            /><br/>
                            <TextField
                                multiLine={true}
                                fullWidth={true}
                                type="text"
                                row={3}
                                hintText="Please enter introduction for survey"
                                ref='introduction'
                            /><br/>
                        </div>
                    </div>
                </Dialog>
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
        this.setState({titleDilaogOpen: true});
    }
}