import React, {Component} from 'react'
import AltContainer from 'alt-container';
import { browserHistory } from 'react-router';
import {Tabs, Tab, FontIcon,FloatingActionButton} from 'material-ui';

require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/scss/font-awesome.scss');
require('./../Main.scss');
import ListSurveyContainer from './../containers/ListSurveyContainer'
import EditSurveyContainer from './../containers/EditSurveyContainer'
import EditSurvey from './Create/EditSurvey'
import Login from './Login'
import UserStore from './../stores/UserStore';
import SurveyStore from './../stores/SurveyStore';
import AccountSettingContainer from './../containers/AccountSettingContainer';
import ListSurveys from './ListSurvey/ListSurveys'
import SurveyActions from './../actions/SurveyActions'
import AnswerSurvey from './Answer/AnswerSurvey'
{/*import SettingsContainer from './containers/SettingsContainer'*/
}

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = UserStore.getState();
        this.state.surveys = SurveyStore.getState().surveys;
        this.state.tabIndex = 0;
        setTimeout(SurveyActions.getAllSurveys(),0);
    }

    componentDidMount() {
        UserStore.listen((state) => this.onChange(state));
        SurveyStore.listen((state) => {
            this.setState({surveys: state.surveys})
        });
    }

    componentWillUnmount() {
        UserStore.unlisten((state) => this.onChange(state));
        SurveyStore.unlisten((state) => {
            this.setState({surveys: state.surveys})
        });
    }

    onChange(state) {
        this.setState(state);
    }

    handleChangeTab(value) {
        //fix for when typing in tab
        if (typeof value !== "number"){
            return;
        }
        this.setState({tabIndex: value});
    }

    handleList() {
        SurveyActions.getAllSurveys();
    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn ?
                    (<div>
                            <AccountSettingContainer />
                            <Tabs
                                value={this.state.tabIndex}
                                onChange={this.handleChangeTab.bind(this)}>
                                <Tab
                                    icon={<FontIcon className="fa fa-list fa-2x"></FontIcon>}
                                    label="COLLECTION"
                                    onActive={this.handleList.bind(this)}
                                    value={0}>
                                    <ListSurveyContainer tabToggle={this.handleChangeTab.bind(this)}/>
                                </Tab>
                                {(this.state.user.role === 'admin' ) ? (
                                    <Tab
                                        icon={<FontIcon className="fa fa-pencil fa-2x"></FontIcon>}
                                        label="CREATE"
                                        value={1}>
                                        <EditSurvey tabToggle={this.handleChangeTab.bind(this)}/>
                                    </Tab>
                                ) : (
                                    <Tab
                                        icon={<FontIcon className="fa fa-edit fa-2x"></FontIcon>}
                                        label="Answer"
                                        value={1}>
                                        <AnswerSurvey tabToggle={this.handleChangeTab.bind(this)}/>
                                    </Tab>
                                )}
                            </Tabs>
                        </div>
                    ) : (<Login loginState={this.state.loginState}/>)}
            </div>
        );
    }
}
