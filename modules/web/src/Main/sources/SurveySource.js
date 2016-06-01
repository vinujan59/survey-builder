import surveyBuilderRequest from './../../surveyBuilderRequest'

var SurveySource = {
    saveSurvey: function (survey) {
        return surveyBuilderRequest.post('/survey', survey);
    },
    getAllSurveys:function(){
        return surveyBuilderRequest.get('/survey')
    }
    //refresh: function (req) {
    //    return surveyBuilderRequest.post('/user/refresh', req);
    //}

};

export default SurveySource;