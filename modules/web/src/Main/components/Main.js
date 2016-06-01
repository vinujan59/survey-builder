import React, {Component} from 'react'
import AltContainer from 'alt-container';
import { browserHistory } from 'react-router';

import {Tabs, Tab, FontIcon,FloatingActionButton} from 'material-ui';

require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/scss/font-awesome.scss');
require('./../Main.scss');
import ListSurveyContainer from './../containers/ListSurveyContainer'
import EditSurvey from './Create/EditSurvey'
import Login from './Login'
import UserStore from './../stores/UserStore';
import AccountSettingContainer from './../containers/AccountSettingContainer';

{/*import SettingsContainer from './containers/SettingsContainer'*/}

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = UserStore.getState();
    }

    componentDidMount() {
        UserStore.listen((state) => this.onChange(state));
    }

    componentWillUnmount() {
        UserStore.unlisten((state) => this.onChange(state));
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn ?
                    (
                        <div>
                            <AccountSettingContainer />
                            {(this.state.user.role === 'admin') ?
                                (<Tabs
                                    initialSelectedIndex={1}>
                                    <Tab
                                        icon={<FontIcon className="fa fa-list fa-2x"></FontIcon>}
                                        label="COLLECTION"
                                        selected={true}>
                                        <ListSurveyContainer />
                                    </Tab>
                                    <Tab
                                        icon={<FontIcon className="fa fa-pencil fa-2x"></FontIcon>}
                                        label="CREATE">
                                        <EditSurvey />
                                    </Tab>
                                </Tabs>) : (
                                <div>On progress</div>
                            )}
                        </div>
                    ) :
                    (
                        <Login
                            loginState={this.state.loginState}
                        />
                    )
                }
            </div>
        )
    }
}
