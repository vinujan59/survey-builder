import surveyBuilderRequest from './../../surveyBuilderRequest'

var SettingsSource = {
    updateBasic: function (user) {
        return surveyBuilderRequest.put('/user/basicConfig', user);
    },
    changePassword: function (req) {
        return surveyBuilderRequest.put('/user/password', req);
    }
};

export default SettingsSource;