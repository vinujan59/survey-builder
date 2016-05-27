import alt from './../../alt'
import HomeSource from './../sources/HomeSource'

class HomeActions {

    constructor(){
        this.generateActions('resetHome');
    }

    getAllNewses(req) {
        HomeSource.getAllNewses(req)
            .then(this.getAllNewsesSuccess)
            .catch(this.getAllNewsesFailed);
        return 1;
    }

    getAllNewsesSuccess(newses) {
        return newses;
    }

    getAllNewsesFailed(errorMessage) {
       return errorMessage;
    }


    updateAllNewses(req) {
        HomeSource.getAllNewses(req)
            .then(this.updateAllNewsesSuccess)
            .catch(this.updateAllNewsesFailed);
        return 1;
    }

    updateAllNewsesSuccess(newses) {
        return newses;
    }

    updateAllNewsesFailed(errorMessage) {
        return errorMessage;
    }


    getAllMedia() {
        HomeSource.getAllMedia()
            .then(this.getAllMediaSuccess);
        return 1;
    }

    getAllMediaSuccess(medias){
        return medias
    }

    clickMe(newsId){
        HomeSource.clickMe(newsId);
        return newsId;
    }

}

export  default alt.createActions(HomeActions);