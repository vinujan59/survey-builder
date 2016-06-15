import React, {Component} from 'react'
import { Divider,Menu} from 'material-ui';
import DragItem from './Draggable/DragItem'

const style = {
    width:'100%'
};
export default class Draggable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu desktop={true} style={style}>
                <DragItem text="Essay" questionType="essay"/>
                <DragItem text="Yes / No" questionType="yes_no" />
                <DragItem text="Multiple Choice" questionType="multiple_choice" />
                <DragItem text="Drop Down" questionType="drop_down" />
                <DragItem text="Multiple TextBox" questionType="multiple_text_box" />
                <DragItem text="Rating Scale" questionType="rating_scale" />
            </Menu>
        );
    }
    shouldComponentUpdate() {
        return false;
    }
}