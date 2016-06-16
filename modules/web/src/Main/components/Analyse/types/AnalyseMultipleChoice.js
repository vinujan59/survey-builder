import React, {Component,PropTypes} from 'react'
import {Doughnut} from 'react-chartjs'
import {Paper} from 'material-ui';

export default class AnalyseMultipleChoice extends Component {
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
                value: 25
            },
            {
                color: this.getRandomColor(),
                highlight: this.getRandomColor(),
                label: 'no',
                value: 25
            },
            {
                color: this.getRandomColor(),
                highlight: this.getRandomColor(),
                label: 'no',
                value: 25
            },
            {
                color: this.getRandomColor(),
                highlight: this.getRandomColor(),
                label: 'no',
                value: 25
            },
        ];
        var options = {};
        return (
            <Paper className="col-xs-12 text-center">
                <h4 className="text-left">{this.props.question}</h4>
                <Doughnut data={data} options={options} redraw />
            </Paper>
        );
    }

}