import React, {Component} from 'react'
import AltContainer from 'alt-container';
import { browserHistory } from 'react-router';

import {Tabs, Tab, FontIcon} from 'material-ui';

require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/scss/font-awesome.scss');
require('./Main.scss');

import HomeContainer from './containers/HomeContainer'


class Main extends Component {

    render() {
        return (
                    <Tabs
                        initialSelectedIndex={1}>
                        <Tab
                            icon={<FontIcon className="fa fa-cogs fa-2x"></FontIcon>}
                            label="MEDIA">
                        </Tab>
                        <Tab
                            icon={<FontIcon className="fa fa-home fa-2x"></FontIcon>}
                            label="MYNEWS"
                            selected={true}>
                            <HomeContainer/>
                        </Tab>
                        <Tab
                            icon={<FontIcon className="fa fa-area-chart fa-2x"></FontIcon>}
                            label="PROFILE">

                        </Tab>
                    </Tabs>
        )
    }
}

export default Main;