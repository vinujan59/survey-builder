import React, {Component,PropTypes} from 'react'
import {max} from 'lodash-node/modern/collection'

export default class Sparkline extends Component {
    constructor(props) {
        super(props);
    }
    generatePath(width, height, points) {
        var maxHeight = max(points);
        var maxWidth = points.length;

        return points.map(function (p, i) {
            var xPct = i / maxWidth * 100;
            var x = (width / 100) * xPct;

            var yPct = 100 - (p / maxHeight * 100);
            var y = (height / 100) * yPct;

            if (i === 0) {
                return 'M0,' + y;
            }
            else {
                return 'L' + x + ',' + y;
            }
        }).join(' ');
    }
    render() {
        var width = 200;
        var height = 20;

        var path = this.generatePath(width, height, this.props.points);

        return (
            <svg width={width} height={height}>
                <path d={path} stroke='#7ED321' strokeWidth='2' fill='none'/>
            </svg>
        );
    }
}

Sparkline.PropTypes = {
    points: React.PropTypes.array.isRequired
};
