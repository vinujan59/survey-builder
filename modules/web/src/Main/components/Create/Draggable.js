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
            </Menu>
        );
    }
    shouldComponentUpdate() {
        return false;
    }
}