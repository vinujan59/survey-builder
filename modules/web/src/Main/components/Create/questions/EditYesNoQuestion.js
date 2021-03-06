import React, {Component,PropTypes} from 'react'
var merge = require('lodash-node/modern/object/merge');
import EditQuestion from './EditQuestion'
import { TextField} from 'material-ui';

export default class  EditYesNoQuestion extends Component {
    constructor(props){
        super(props);
        this.state={
            control:{
                isSub:this.props.question.isSub || false,
                isComment:this.props.question.isComment || false,
            }
        }
    }

  render() {
    var description = this.props.question.description || "";

    return (
      <EditQuestion type='yes_no' onRemove={this.handleRemove.bind(this)}
                    handleSubQuestion={this.props.handleSubQuestion} handleComment={this.props.handleComment}
                    control={this.state.control} >
        <label>Description</label>
          <TextField
              floatingLabelText="Question"
              fullWidth={true}
              type='text' className='description' value={description} onChange={this.handleChange.bind(this)}
          />
      </EditQuestion>
    );
  }

  handleChange(ev) {
    var question = merge(this.props.question, { description: ev.target.value });
    this.props.onChange(this.props.key, question);
  }

  handleRemove() {
    this.props.onRemove(this.props.key);
  }
}

EditYesNoQuestion.propTypes =  {
    key: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    question: React.PropTypes.object.isRequired
};
