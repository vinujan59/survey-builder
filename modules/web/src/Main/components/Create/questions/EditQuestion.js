import React, {Component,PropTypes} from 'react'
import { Paper,Checkbox,FontIcon } from 'material-ui';
require('font-awesome/scss/font-awesome.scss');
var typeLabels = {
    yes_no: 'Yes / No',
    multiple_choice: 'Multiple Choice',
    essay: 'Essay'
};

export default class EditQuestion extends Component {

    getTypeLabel() {
        return typeLabels[this.props.type];
    }

    handleOnCheck() {

    }

    render() {
        var className = 'edit-question well well-active ' + (this.props.className || "");

        return (
            <Paper zDepth={3} className={className}>
                <div className='type'>
                    <FontIcon className="fa fa-chevron-circle-left icon" />
                    <FontIcon className="fa fa-chevron-circle-right icon" />
                    {this.getTypeLabel()}
                    <a className='pull-right' onClick={this.handleRemove.bind(this)}>
                        <span className='glyphicon glyphicon-remove'/>
                    </a>
                </div>
                <div>{this.props.children}</div>
                <div>
                    <Checkbox
                        onCheck={this.handleOnCheck.bind(this)}
                        label="Add Comment"
                    />
                </div>
            </Paper>
        );
    }

    handleRemove() {
        if (confirm('Are you sure you want to delete this ' + this.getTypeLabel())) {
            this.props.onRemove(this.props.key);
        }
    }
}

EditQuestion.propTypes = {
    type: React.PropTypes.string.isRequired,
    onRemove: React.PropTypes.func.isRequired
};

