import React, {Component} from 'react'
import { browserHistory } from 'react-router';

import {Tabs, Tab, FontIcon} from 'material-ui';

require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/scss/font-awesome.scss');
import ListSurveys from './ListSurvey/ListSurveys'
import EditSurvey from './Create/EditSurvey'

export default class AdminMain extends Component {

    render() {
        return (
            <Tabs
                initialSelectedIndex={0}>
                <Tab
                    icon={<FontIcon className="fa fa-list fa-2x"></FontIcon>}
                    label="COLLECTION"
                    selected={true}>
                    <ListSurveys/>
                </Tab>
                <Tab
                    icon={<FontIcon className="fa fa-pencil fa-2x"></FontIcon>}
                    label="CREATE">
                    <EditSurvey/>
                </Tab>
            </Tabs>
        )
    }
}
