import alt from './../../alt'
import SettingsSource from './../sources/SettingsSource.js'

class SettingsActions {


    constructor(){
        this.generateActions('resetSettings');
    }

    updateBasic(media) {
        SettingsSource.updateBasic(media)
            .then(this.updateBasicSuccess)
            .catch(this.updateBasicFailed);
        return 1;
    }

    updateBasicSuccess(resp) {
        return resp;
    }

    updateBasicFailed(errormessage) {
        return errormessage;
    }

    changePassword(req) {
        SettingsSource.changePassword(req)
            .then(this.changePasswordSuccess)
            .catch(this.changePasswordFailed);
        return 1;
    }

    changePasswordSuccess(resp) {
        return resp;
    }

    changePasswordFailed(errorMessage) {
        return errorMessage;
    }


}

export  default alt.createActions(SettingsActions);