import surveyBuilderRequest from './../../surveyBuilderRequest'

var SurveySource = {
    saveSurvey: function (survey) {
        return surveyBuilderRequest.post('/survey', survey);
    },
    getAllSurveys:function(){
        return surveyBuilderRequest.get('/survey')
    },
    deleteSurvey:function(id){
        return surveyBuilderRequest.post('/survey/delete',id)
    },
    answersSave:function(answers){
        return surveyBuilderRequest.post('/survey/answer',answers)
    }
    //refresh: function (req) {
    //    return surveyBuilderRequest.post('/user/refresh', req);
    //}

};

export default SurveySource;