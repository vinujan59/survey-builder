import React, {Component} from 'react'
import render from 'react-dom'
import AltContainer from 'alt-container';

import AccountSetting from './../components/AccountSetting'
import SettingsStore from './../stores/SettingsStore'
import UserStore from './../stores/UserStore'

class SettingsContainer extends Component {

    render() {
        return (
            <AltContainer
                stores={[UserStore, SettingsStore]}
                inject={{
                        user: function(props){
                            return UserStore.getState().user;
                        },
                        basicState: function(props){
                            return SettingsStore.getState().basicState;
                        },
                        passwordState: function(props){
                            return SettingsStore.getState().passwordState;
                        }
                }}>
                <AccountSetting></AccountSetting>
            </AltContainer>
        )
    }
}

export default SettingsContainer;