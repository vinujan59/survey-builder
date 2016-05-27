import React, {PropTypes,Component} from 'react'
import { MenuItem,FontIcon} from 'material-ui';

require('font-awesome/scss/font-awesome.scss');

const style = {
    cursor : 'move',
    width:'100%'
};
export default class DragItem extends Component{
    constructor(props){
        super(props)
    }

    render(){
        var class_name = 'fa fa-question';
        return (
            <MenuItem primaryText={this.props.text} draggable="true"  onDragStart={this.handleDragStart.bind(this)} onclick={this.props.onClick}
                      style={style} leftIcon={<FontIcon className={class_name}/>} />
        );
    }

    handleDragStart (ev) {
        ev.dataTransfer.setData('questionType', this.props.questionType);
    }
}

DragItem.propTypes = {
    text: React.PropTypes.string.isRequired,
    questionType: React.PropTypes.string.isRequired
};