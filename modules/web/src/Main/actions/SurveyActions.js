import alt from './../../alt'
import SurveySource from './../sources/SurveySource'

class SurveyActions {


    constructor(){
        this.generateActions('resetSurvey');
    }

    //save(survey) {
    //    SurveySource.saveSurvey(survey)
    //        .then(this.updateBasicSuccess)
    //        .catch(this.updateBasicFailed);
    //    return 1;
    //}
    //
    //saveSuccess(resp) {
    //    return resp;
    //}
    //
    //saveFailed(errormessage) {
    //    return errormessage;
    //}
    getAllSurveys(){
        SurveySource.getAllSurveys()
            .then(this.updateAllSurveys)
            .catch(this.getAllSurveysFailed);
        return 1
    }

    updateAllSurveys(surveys){
        return surveys;
    }
    getAllSurveysFailed(errorMessage){
        return errorMessage;
    }
    //changePassword(req) {
    //    SettingsSource.changePassword(req)
    //        .then(this.changePasswordSuccess)
    //        .catch(this.changePasswordFailed);
    //    return 1;
    //}
    //
    //changePasswordSuccess(resp) {
    //    return resp;
    //}
    //
    //changePasswordFailed(errorMessage) {
    //    return errorMessage;
    //}


}

export  default alt.createActions(SurveyActions);