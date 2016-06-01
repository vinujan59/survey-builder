import alt from './../../alt'

import UserActions from './../actions/UserActions'
import SettingsActions from './../actions/SettingsActions.js'
import NetworkState from './../../NetworkState.js'

class UserStore {

    constructor() {
        this.user = {};
        this.isLoggedIn = false;
        this.loginState = NetworkState.init();

        if(localStorage.getItem("Authorization")){
            var user = JSON.parse(localStorage.getItem('user'));
            UserActions.refresh(user);
        }

        this.bindListeners({
            resetUser: UserActions.RESET_USER,
            login: UserActions.LOGIN,
            loginSuccess: UserActions.LOGIN_SUCCESS,
            loginFailed: UserActions.LOGIN_FAILED,
            logout: UserActions.LOGOUT,
            updateBasic: SettingsActions.UPDATE_BASIC_SUCCESS,
            refresh:UserActions.REFRESH,
            refreshSuccess:UserActions.REFRESH_SUCCESS,
            refreshFailed:UserActions.REFRESH_FAILED,
        });
    }

    login(user) {
        this.user = {};
        this.isLoggedIn = false;
        this.loginState.load('Signing in ...');
    }

    loginSuccess(signinResp) {
        this.user = { email : signinResp.email,
                        role:signinResp.role};
        localStorage.setItem("Authorization", signinResp.accessToken);
        localStorage.setItem("user", JSON.stringify({email:this.user.email}));
        this.isLoggedIn = true;
        this.loginState.succeed('Welcome ' + this.user.email);
        setTimeout(UserActions.resetUser, 3000)
    }

    loginFailed(errorMessage) {
        this.user = {};
        this.isLoggedIn = false;
        this.loginState.fail(errorMessage);
    }

    refresh(user) {
        this.isLoggedIn = false;
        this.loginState.load('Signing in ...');
    }

    refreshSuccess(signinResp) {
        this.user = { email : signinResp.email,
            role:signinResp.role};
        localStorage.setItem("Authorization", signinResp.accessToken);
        localStorage.setItem("user", JSON.stringify({email:this.user.email}));
        this.isLoggedIn = true;
        this.loginState.succeed('Welcome ' + this.user.email);
        setTimeout(UserActions.resetUser, 3000)
    }

    refreshFailed(errorMessage) {
        this.user = {};
        this.isLoggedIn = false;
        this.loginState.fail(errorMessage);
    }

    logout(){
        localStorage.removeItem("Authorization");
        localStorage.removeItem("user");
        this.user = {};
        this.isLoggedIn = false;
    }

    updateBasic(user){
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
    }

    resetUser() {
        this.loginState.reset();
    }

}

export default alt.createStore(UserStore, 'UserStore');