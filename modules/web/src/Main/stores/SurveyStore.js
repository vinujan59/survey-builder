import alt from './../../alt'

import SurveyActions from './../actions/SurveyActions'
import NetworkState from './../../NetworkState.js'

class SurveyStore {

    constructor() {
        console.log('Initializing SurveyStore');

        this.surveys = [];
        this.survey = {};
        this.surveysState = NetworkState.init();

        this.bindListeners({
            resetSurvey:SurveyActions.RESET_SURVEY,
            getAllSurveys:SurveyActions.GET_ALL_SURVEYS,
            updateAllSurveys:SurveyActions.UPDATE_ALL_SURVEYS,
            getAllSurveysFailed:SurveyActions.GET_ALL_SURVEYS_FAILED,
            updateSurvey:SurveyActions.UPDATE_SURVEY
            //save: SettingsActions.SAVE_BASIC,
            //saveSuccess: SettingsActions.SAVE_SUCCESS,
            //saveFailed: SettingsActions.SAVE_FAILED,
            //changePassword: SettingsActions.CHANGE_PASSWORD,
            //changePasswordSuccess: SettingsActions.CHANGE_PASSWORD_SUCCESS,
            //changePasswordFailed: SettingsActions.CHANGE_PASSWORD_FAILED,
        });

    }

    resetSurvey(){
        this.surveysState.reset();
        //this.passwordState.reset();
    }

    getAllSurveys(){
        this.surveysState.load('Loading Surveys ...');
    }

    updateAllSurveys(surveys){
        this.surveysState.succeed();
        this.surveys = surveys;
        setTimeout(SurveyActions.resetSurvey, 3000);
    }
    getAllSurveysFailed(errorMessage){
        this.surveysState.fail(errorMessage);
    }
    updateSurvey(survey){
        this.survey = survey;
    }
    //save(){
    //    this.basicState.load('Saving Survey!');
    //}
    //
    //saveSuccess(){
    //    this.basicState.succeed('Basic details updated');
    //    setTimeout(SettingsActions.resetSettings, 3000);
    //}
    //

}

export default alt.createStore(SurveyStore, 'SurveyStore');