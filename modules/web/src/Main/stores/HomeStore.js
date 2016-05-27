import alt from './../../alt'

import HomeActions from './../actions/HomeActions'
import NetworkState from './../../NetworkState.js'

class HomeStore {

    constructor() {
        console.log('Initializing HomeStore');

        this.newses = [];
        this.medias = [];

        this.newsState = NetworkState.init();
        this.newsUpdateState = NetworkState.init();
        this.mediaState = NetworkState.init();

        this.seen = [];
        if (localStorage.getItem('seen')) {
            this.seen = JSON.parse(localStorage.getItem("seen"));
        }

        this.bindListeners({
            resetHome: HomeActions.RESET_HOME,
            getAllNewses: HomeActions.GET_ALL_NEWSES,
            getAllNewsesSuccess: HomeActions.GET_ALL_NEWSES_SUCCESS,
            getAllNewsesFailed: HomeActions.GET_ALL_NEWSES_FAILED,
            updateAllNewses: HomeActions.UPDATE_ALL_NEWSES,
            updateAllNewsesSuccess: HomeActions.UPDATE_ALL_NEWSES_SUCCESS,
            updateAllNewsesFailed: HomeActions.UPDATE_ALL_NEWSES_FAILED,
            getAllMedia: HomeActions.GET_ALL_MEDIA,
            getAllMediaSuccess: HomeActions.GET_ALL_MEDIA_SUCCESS,
            clickMe: HomeActions.CLICK_ME
        });
    }

    resetHome() {
        this.newsState.reset();
    }

    getAllNewses() {
        this.newsState.load('Loading newses ...');
    }

    getAllNewsesSuccess(newses) {
        this.newsState.succeed();
        this.newses = newses;
        setTimeout(HomeActions.resetHome, 3000);
    }

    getAllNewsesFailed(errorMessage) {
        this.newsState.fail(errorMessage);
    }

    updateAllNewses() {
        this.newsUpdateState.load('Updating newses ...');
    }

    updateAllNewsesSuccess(newses) {
        this.newsUpdateState.succeed();
        //TODO: Checks scroll position??
        this.newses = newses;
        setTimeout(HomeActions.resetHome, 3000);
    }

    updateAllNewsesFailed(errorMessage) {
        this.newsUpdateState.fail(errorMessage);
    }

    getAllMedia() {
        this.mediaState.load('Loading newses ...');
    }

    getAllMediaSuccess(medias) {
        this.mediaState.succeed();
        this.medias = medias;
    }

    clickMe(newsId) {
        if (this.seen.length >= 100) {
              this.seen = this.seen.splice(0, 98);
        }
        this.seen.push(newsId);
        localStorage.setItem("seen", JSON.stringify(this.seen));
    }
}

export default alt.createStore(HomeStore, 'HomeStore');