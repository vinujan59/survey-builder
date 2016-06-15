import React, {Component,PropTypes} from 'react'
import { Paper,Checkbox,FontIcon } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
require('font-awesome/scss/font-awesome.scss');
var typeLabels = {
    yes_no: 'Yes / No',
    multiple_choice: 'Multiple Choice',
    essay: 'Essay',
    drop_down:'DropDown',
    multiple_text_box:'Multiple Text Box',
    rating_scale:'Rating Scale'
};

export default class EditQuestion extends Component {
    constructor(props){
        super(props);
        this.state = {
            offset:((this.props.control.isSub == true)? "col-xs-offset-3":""),
            left:((this.props.control.isSub == true)),
            right:((this.props.control.isSub == false)),
            isCommentChecked:this.props.control.isComment,

        };
    }

    getTypeLabel() {
        return typeLabels[this.props.type];
    }

    handleOnCheck(e,isChecked) {
        this.setState({isCommentChecked:isChecked});
        this.props.handleComment(isChecked);
    }

    render() {
        var className = 'edit-question well well-active ' + (this.props.className || "") +" "+this.state.offset;

        return (
            <Paper zDepth={3} className={className}>
                <div className='type'>
                    <FontIcon className="fa fa-chevron-circle-left icon" color={this.state.left == true ? Colors.pink600 : Colors.grey50 }
                              hoverColor={this.state.left == false ? Colors.grey50 : Colors.deepPurple600} onClick={this.handleSubQuestion.bind(this,'left')} />
                    <FontIcon className="fa fa-chevron-circle-right icon" color={this.state.right == true ? Colors.pink600 : Colors.grey50}
                              hoverColor={this.state.right == false ? Colors.grey50 : Colors.deepPurple600} onClick={this.handleSubQuestion.bind(this,'right')} />
                    {this.getTypeLabel()}
                    <a className='pull-right' onClick={this.handleRemove.bind(this)}>
                        <span className='glyphicon glyphicon-remove'/>
                    </a>
                </div>
                <div>{this.props.children}</div>
                <div>
                    <Checkbox
                        onCheck={this.handleOnCheck.bind(this)}
                        checked={this.state.isCommentChecked}
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

    handleSubQuestion(name){
        if(name == 'left'){
            if(this.state.left== true){
                this.setState({offset:"",right:true,left:false});
                this.props.handleSubQuestion(false);
            }
        }else{
            if(this.state.right== true){
                this.setState({offset:"col-xs-offset-3",left:true,right:false});
                this.props.handleSubQuestion(true);
            }
        }
    }
}

EditQuestion.propTypes = {
    type: React.PropTypes.string.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    handleSubQuestion: React.PropTypes.func.isRequired,
    handleComment: React.PropTypes.func.isRequired,
};

