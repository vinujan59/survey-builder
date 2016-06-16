import React, {Component,PropTypes} from 'react'
import {Pie} from 'react-chartjs'
import {Paper} from 'material-ui';

export default class AnalyseDropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        var data = [
            {
                color: this.getRandomColor(),
                highlight: this.getRandomColor(),
                label: 'yes',
                value: 50
            },
            {
                color: this.getRandomColor(),
                highlight: this.getRandomColor(),
                label: 'no',
                value: 50
            },
        ];
        var options = {};
        return (
            <Paper className="col-xs-12 text-center">
                <h4 className="text-left">{this.props.question}</h4>
                <Pie data={data} options={options} redraw />
            </Paper>
        );
    }

}