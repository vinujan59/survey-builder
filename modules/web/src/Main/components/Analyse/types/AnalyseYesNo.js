import React, {Component,PropTypes} from 'react'
import {Pie} from 'react-chartjs'
import {Paper} from 'material-ui';

export default class AnalyseYesNo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        var data = [
            {
                color: '#FF6384',
                highlight: '#FF6384',
                label: 'yes',
                value: 50
            },
            {
                color: '#36A2EB',
                highlight: '#36A2EB',
                label: 'no',
                value: 50
            },
        ];
        var options = {};
        return (
            <Paper className="col-xs-12 text-center">
                <h4 className="text-left">{this.props.question}</h4>
                <Pie data={data} options={options}  redraw />
            </Paper>
        );
    }

}