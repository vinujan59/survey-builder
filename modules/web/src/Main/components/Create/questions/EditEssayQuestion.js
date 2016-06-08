import React, {Component,PropTypes} from 'react'
var merge = require('lodash-node/modern/object/merge');
import EditQuestion from './EditQuestion'
import { TextField} from 'material-ui';

export default class EditEssayQuestion extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    var description = this.props.question.description || "";

    return (
      <EditQuestion type='essay' className="" onRemove={this.handleRemove.bind(this)}>
        <label>Description</label>
        <TextField
            floatingLabelText="Question"
            fullWidth={true}
            multiLine={true}
            rows={3}
            type='text' className='description' value={description} onChange={this.handleChange.bind(this)}
        />
      </EditQuestion>
    );
  }

  handleChange (ev) {
    var question = merge(this.props.question, { description: ev.target.value });
    this.props.onChange(this.props.key, question);
  }

  handleRemove () {
    this.props.onRemove(this.props.key);
  }
}
EditEssayQuestion.propTypes =  {
  key: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  question: React.PropTypes.object.isRequired
};
