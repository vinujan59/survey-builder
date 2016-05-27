import React, {Component} from 'react'
import {Card} from 'material-ui';
require('bootstrap/dist/css/bootstrap.min.css');

import SurveyTable from './SurveyTable'

export default class ListSurveys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: [
                {
                    id: 'asd123',
                    uri: 'asd123',
                    editUri: 'ad123',
                    title: 'Superhero mashup',
                    publishedDate: new Date(),
                    modifiedDate: new Date(),
                    activity: [121, 32, 54, 12, 546]
                }
            ]


        };
    }


    render() {
        if (!this.state.surveys) {
            return <div>Loading ... </div>
        }

        return (
            <Card>
                <SurveyTable surveys={this.state.surveys}/>
            </Card>
        );
    }
}