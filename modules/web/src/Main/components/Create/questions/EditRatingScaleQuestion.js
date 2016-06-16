import React, {Component,PropTypes} from 'react'
import EditQuestion from './EditQuestion'
import { TextField,Toggle,Paper} from 'material-ui';

var merge = require('lodash-node/modern/object/merge');

export default class EditRatingScaleQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: (this.props.question.multi == true ? ({
                row: 'check-row',
                column: 'check-column'
            }):({
                row: 'radio-row',
                column: 'radio-column'
            })),
            control: {
                isSub: this.props.question.isSub || false,
                isComment: this.props.question.isComment || false,
            }
        }

    }

    render() {
        //console.log(JSON.stringify(this.props.question));
        var question = this.props.question;

        var description = question.description || "";
        var rowOptions = question.rowOptions || [];
        var columnOptions = question.columnOptions || [];

        rowOptions = rowOptions.map(function (option, i) {
            return (
                <li key={i} className='option'>
                    <TextField
                        className="small"
                        value={option}
                        onChange={this.handleRowOptionChange.bind(this,i)}
                        multiLine={false}
                        type='text'
                    />
                    <a className='remove-option' onClick={this.handleRowOptionRemove.bind(this,i)}>
                        <span className='glyphicon glyphicon-remove'/>
                    </a>
                </li>
            );
        }.bind(this));

        columnOptions = columnOptions.map(function (option, i) {
            return (
                <li key={i} className='option'>
                    <TextField
                        className="small"
                        value={option}
                        onChange={this.handleColumnOptionChange.bind(this,i)}
                        multiLine={false}
                        type='text'
                    />
                    <a className='remove-option' onClick={this.handleColumnOptionRemove.bind(this,i)}>
                        <span className='glyphicon glyphicon-remove'/>
                    </a>
                </li>
            );
        }.bind(this));

        var qKey = this.props.key;

        return (
            <EditQuestion type='rating_scale' className='edit-multiple-choice' onRemove={this.handleRemove.bind(this)}
                          handleSubQuestion={this.props.handleSubQuestion} handleComment={this.props.handleComment}
                          control={this.state.control}>
                <label>Description</label>
                <TextField
                    floatingLabelText="Question"
                    fullWidth={true}
                    multiLine={true}
                    rows={3}
                    type='text' className='description' value={description}
                    onChange={this.handleDescriptionChange.bind(this)}
                />
                <div className="small">
                    <Toggle
                        label="Enable Multiple Option"
                        className="small"
                        toggled={this.props.question.multi}
                        onToggle={this.handleOnToggle.bind(this)}
                    />
                </div>
                <Paper style={{border:'1px solid black'}}>
                    <div className="row">
                        <div className="col-xs-8">
                            <label>Rows</label>
                            <ul className='options list-unstyled'>
                                {rowOptions}
                                <li className='add-option'>
                                    <a onClick={this.handleRowOptionAdd.bind(this)}>
                                        <span className='glyphicon glyphicon-plus'/>
                                        Add option
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xs-4">
                            <img className={this.state.img.row}/>
                        </div>
                    </div>
                </Paper>
                <br/>
                <br/>
                <Paper style={{border:'1px solid black'}}>
                    <div className="row">
                        <div className="col-xs-8">
                            <label>Columns</label>
                            <ul className='options list-unstyled'>
                                {columnOptions}
                                <li className='add-option'>
                                    <a onClick={this.handleColumnOptionAdd.bind(this)}>
                                        <span className='glyphicon glyphicon-plus'/>
                                        Add option
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xs-4">
                            <img className={this.state.img.column}/>
                        </div>
                    </div>
                </Paper>
            </EditQuestion>
        );
    }

    handleDescriptionChange(ev) {
        var question = merge(this.props.question, {description: ev.target.value});
        this.props.onChange(this.props.key, question);
    }


    //handleOptionAdd() {
    //    var question = this.props.question;
    //    var options = question.options || [];
    //    question.options = options.concat('');
    //    this.props.onChange(this.props.key, question);
    //}

    //handleOptionChange(key, ev) {
    //    var question = this.props.question;
    //    question.options[key] = ev.target.value;
    //    this.props.onChange(this.props.key, question);
    //}
    //handleOptionRemove(key) {
    //    var question = this.props.question;
    //    question.options.splice(key, 1);
    //    this.props.onChange(this.props.key, question);
    //}

    handleRowOptionAdd() {
        var question = this.props.question;
        var rowOptions = question.rowOptions || [];
        question.rowOptions = rowOptions.concat('');
        this.props.onChange(this.props.key, question)
    }

    handleRowOptionChange(key, ev) {
        var question = this.props.question;
        question.rowOptions[key] = ev.target.value;
        this.props.onChange(this.props.key, question)
    }

    handleRowOptionRemove(key) {
        var question = this.props.question;
        question.rowOptions.splice(key, 1);
        this.props.onChange(this.props.key, question);
    }

    handleColumnOptionAdd() {
        var question = this.props.question;
        var columnOptions = question.columnOptions || [];
        question.columnOptions = columnOptions.concat('');
        this.props.onChange(this.props.key, question)
    }

    handleColumnOptionChange(key, ev) {
        var question = this.props.question;
        question.columnOptions[key] = ev.target.value;
        this.props.onChange(this.props.key, question)
    }

    handleColumnOptionRemove(key) {
        var question = this.props.question;
        question.columnOptions.splice(key, 1);
        this.props.onChange(this.props.key, question);
    }

    handleRemove() {
        this.props.onRemove(this.props.key);
    }

    handleOnToggle(e, isInputChecked) {
        var question = this.props.question;
        question.multi = isInputChecked;
        this.props.onChange(this.props.key, question);
        if (isInputChecked) {
            this.setState({
                img: {
                    row: 'check-row',
                    column: 'check-column'
                }
            });
        } else {
            this.setState({
                img: {
                    row: 'radio-row',
                    column: 'radio-column'
                }
            });
        }
    }
}

EditRatingScaleQuestion.propTypes = {
    key: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    question: React.PropTypes.object.isRequired
};