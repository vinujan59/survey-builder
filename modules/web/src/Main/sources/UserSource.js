import surveyBuilderRequest from './../../surveyBuilderRequest'

var UserSource = {
    login: function (user) {
        return surveyBuilderRequest.post('/user/authenticate', user);
    },
    refresh: function (req) {
        return surveyBuilderRequest.post('/user/refresh', req);
    }

};

export default UserSource;