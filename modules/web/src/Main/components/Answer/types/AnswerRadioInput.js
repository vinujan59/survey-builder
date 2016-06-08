import React, {Component,PropTypes} from 'react'
import PropsMethodMixin from './../mixins/PropsMethodMixin'
var uniqueId = require('lodash-node/modern/utility/uniqueId');
import {RadioButton} from 'material-ui';

var mixins = [PropsMethodMixin];

export default class AnswerRadioInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uniqueId('radio-'),
            //checked: false
        }
    }

    //componentWillReceiveProps(nextProps) {
    //    if (nextProps.checked !== undefined) {
    //        this.setState({
    //            checked: nextProps.checked
    //        });
    //    }
    //}
    //
    //handleChanged(e) {
    //    var checked = e.target.checked;
    //    this.setState({checked: checked});
    //    if (checked) {
    //        //this.callMethodOnProps('onChanged', this.props.value);
    //        this.props.onCompleted(this.props.value);
    //    }
    //}

    render() {
        return (
            <div className="radio">
                <RadioButton
                    value={this.props.value}
                    label={this.props.label}
                />
                <br/>
            </div>
        );
    }
}

AnswerRadioInput.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool,
    onCompleted: React.PropTypes.func.isRequired
};