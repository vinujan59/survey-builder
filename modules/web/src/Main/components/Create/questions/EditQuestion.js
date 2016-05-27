import React, {Component,PropTypes} from 'react'

var typeLabels = {
  yes_no: 'Yes / No',
  multiple_choice: 'Multiple Choice',
  essay: 'Essay'
};

export default class EditQuestion extends Component {

  getTypeLabel() {
    return typeLabels[this.props.type];
  }

  render() {
    var className = 'edit-question well well-active ' + (this.props.className || "");

    return (
      <div className={className}>
        <div className='type'>
          {this.getTypeLabel()}
          <a className='remove' onClick={this.handleRemove.bind(this)}>
            <span className='glyphicon glyphicon-remove'/>
          </a>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }

  handleRemove() {
    if (confirm('Are you sure you want to delete this ' + this.getTypeLabel())) {
      this.props.onRemove(this.props.key);
    }
  }
}

EditQuestion.propTypes =  {
  type: React.PropTypes.string.isRequired,
  onRemove: React.PropTypes.func.isRequired
};

