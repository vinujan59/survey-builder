import alt from './../../alt'

import SettingsActions from './../actions/SettingsActions'
import NetworkState from './../../NetworkState.js'

class SettingsStore {

    constructor() {
        console.log('Initializing SettingsStore');


        this.basicState = NetworkState.init();
        this.passwordState = NetworkState.init();

        this.bindListeners({
            resetSettings:SettingsActions.RESET_SETTINGS,
            updateBasic: SettingsActions.UPDATE_BASIC,
            updateBasicSuccess: SettingsActions.UPDATE_BASIC_SUCCESS,
            updateBasicFailed: SettingsActions.UPDATE_BASIC_FAILED,
            changePassword: SettingsActions.CHANGE_PASSWORD,
            changePasswordSuccess: SettingsActions.CHANGE_PASSWORD_SUCCESS,
            changePasswordFailed: SettingsActions.CHANGE_PASSWORD_FAILED,
        });

    }

    resetSettings(){
        this.basicState.reset();
        this.passwordState.reset();
    }

    updateBasic(){
        this.basicState.load('Updating basic details');
    }

    updateBasicSuccess(){
        this.basicState.succeed('Basic details updated');
        setTimeout(SettingsActions.resetSettings, 3000);
    }

    updateBasicFailed(err){
        this.basicState.fail(err);
    }

    changePassword(){
        this.passwordState.load('Updating password');
    }

    changePasswordSuccess(){
        this.passwordState.succeed('Password updated');
        setTimeout(SettingsActions.resetSettings, 3000);
    }

    changePasswordFailed(err){
        this.passwordState.fail(err)
    }

}

export default alt.createStore(SettingsStore, 'SettingsStore');