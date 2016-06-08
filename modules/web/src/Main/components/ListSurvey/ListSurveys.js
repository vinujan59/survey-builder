import React, {Component} from 'react'
import {Card} from 'material-ui';
require('bootstrap/dist/css/bootstrap.min.css');

import SurveyTable from './SurveyTable'
import SurveyActions from './../../actions/SurveyActions'

export default class ListSurveys extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        SurveyActions.getAllSurveys.defer();
    }


    render() {
        return (
            <Card>
                <SurveyTable tabToggle={this.props.tabToggle.bind(this)} surveys={this.props.surveys} {...this.props} />
            </Card>
        );
    }
}