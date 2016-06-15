import React, {Component,PropTypes} from 'react'
import EditQuestion from './EditQuestion'
import { TextField,Toggle} from 'material-ui';

var merge = require('lodash-node/modern/object/merge');

export default class  EditMultipleChoiceQuestion extends Component {
  constructor(props){
    super(props);
    this.state={
      control:{
        isSub:this.props.question.isSub || false,
        isComment:this.props.question.isComment || false,
      }
    };
  }

  render () {
    var question = this.props.question;

    var description = question.description || "";
    var options = question.options || [];

    options = options.map(function (option, i) {
      return (
        <li key={i} className='option'>
          <TextField
              className="small"
              value={option}
              onChange={this.handleOptionChange.bind(this,i)}
              multiLine={false}
              rows={2}
              type='text'
          />
          <a className='remove-option' onClick={this.handleOptionRemove.bind(this,i)}>
            <span className='glyphicon glyphicon-remove'/>
          </a>
        </li>
      );
    }.bind(this));

    return (
      <EditQuestion type='multiple_choice' className='edit-multiple-choice' onRemove={this.handleRemove.bind(this)}
                    handleSubQuestion={this.props.handleSubQuestion} handleComment={this.props.handleComment}
                    control={this.state.control} >
        <label>Description</label>
        <TextField
            floatingLabelText="Question"
            fullWidth={true}
            multiLine={true}
            rows={3}
            type='text' className='description' value={description} onChange={this.handleDescriptionChange.bind(this)}
        />
        <Toggle
            onToggle={this.handleOnToggle.bind(this)}
            label="Enable Multiple Choice"
            toggled={this.props.question.multi}
        />
        <label>Options</label>
        <ul className='options list-unstyled'>
          {options}
          <li className='add-option'>
            <a onClick={this.handleOptionAdd.bind(this)}>
              <span className='glyphicon glyphicon-plus'/>
              Add option
            </a>
          </li>
        </ul>
      </EditQuestion>
    );
  }

  handleDescriptionChange (ev) {
    var question = merge(this.props.question, { description: ev.target.value });
    this.props.onChange(this.props.key, question);
  }

  handleOptionAdd () {
    var question = this.props.question;
    var options = question.options || [];
    question.options = options.concat('');
    this.props.onChange(this.props.key, question);
  }

  handleOptionChange (key, ev) {
    var question = this.props.question;
    question.options[key] = ev.target.value;
    this.props.onChange(this.props.key, question);
  }

  handleOptionRemove (key) {
    var question = this.props.question;
    question.options.splice(key, 1);
    this.props.onChange(this.props.key, question);
  }

  handleRemove () {
    this.props.onRemove(this.props.key);
  }

  handleOnToggle(e, isInputChecked) {
    var question = this.props.question;
    question.multi = isInputChecked;
    this.props.onChange(this.props.key,question);
  }
}

EditMultipleChoiceQuestion.propTypes =  {
  key: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  question: React.PropTypes.object.isRequired
};
