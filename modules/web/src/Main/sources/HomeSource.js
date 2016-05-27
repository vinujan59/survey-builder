import mynewsRequest from './../../surveyBuilderRequest'

var HomeSource = {
    getAllNewses: function (req) {
        return mynewsRequest.post('/news/search', req);
    },
    getAllMedia: function () {
        return mynewsRequest.get('/media');
    },
    clickMe: function(newsId){
        return mynewsRequest.put('/news/click/newsId/' + newsId)
    }

};

export default HomeSource;