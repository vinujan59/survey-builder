import React, {Component,PropsTypes} from 'react'
import AltContainer from 'alt-container';

import { browserHistory } from 'react-router';
import {Tabs, Tab, FontIcon,FloatingActionButton} from 'material-ui';
import PropsMethodMixin from './mixins/PropsMethodMixin';
import AnswerFactory from './types/AnswerFactory'

var mixins = [PropsMethodMixin];
var merge = require('lodash-node/modern/object/merge');
export default class SelectQuestion extends Component {
    constructor(props){
        super(props);
        this.state = {
            onCompleted: function() {},
            item: {}
        }
    }

    //handleItemCompleted(value) {
    //    this.callMethodOnProps('onCompleted', {
    //        id: this.props.item.id,
    //        value: value
    //    });
    //}

    getSurveyItemClass() {
        return AnswerFactory.getAnswerClass(this.props.item.type);
    }

    renderSurveyItem() {
        var ItemComponentClass = this.getSurveyItemClass();
        var props = merge({}, this.props.item, {
            onCompleted: this.props.onCompleted.bind(this)
        });
        //console.log(props);
        return <ItemComponentClass {...props} />;
    }

    render() {
        return <div className="survey-item">
            {this.renderSurveyItem()}
        </div>
    }
}