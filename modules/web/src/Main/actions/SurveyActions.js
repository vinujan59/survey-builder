import alt from './../../alt'
import SurveySource from './../sources/SurveySource'

class SurveyActions {


    constructor() {
        this.generateActions('resetSurvey');
    }

    save(survey) {
        console.log(JSON.stringify(survey));
        SurveySource.saveSurvey(survey)
            .then(this.saveSuccess)
            .catch(this.saveFailed);
        return 1;
    }

    saveSuccess(resp) {
        return resp;
    }

    saveFailed(errormessage) {
        return errormessage;
    }

    getAllSurveys() {
        SurveySource.getAllSurveys()
            .then(this.updateAllSurveys)
            .catch(this.getAllSurveysFailed);
        return 1;
    }

    updateAllSurveys(surveys) {
        return surveys;
    }

    getAllSurveysFailed(errorMessage) {
        return errorMessage;
    }

    updateSurvey(survey) {
        return survey;
    }

    deleteSurvey(id) {
        SurveySource.deleteSurvey(id)
            .then(this.deleteSucces)
            .catch(this.deleteFailed);
        return "success";
    }

    deleteSucces() {
        this.getAllSurveys();
        return "Success";
    }

    deleteFailed(errorMessage) {
        return errorMessage;
    }

    //***for answering part***//

    answersSave(answers) {
        SurveySource.answersSave(answers)
            .then(this.answersSaveSuccess)
            .catch(this.answersSaveFailed);
        return "success";
    }

    answersSaveSuccess(){
        return "Success";
    }

    answersSaveFailed(errorMessage){
        return errorMessage;
    }

    //******//
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