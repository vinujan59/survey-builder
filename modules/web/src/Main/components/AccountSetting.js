import React, {Component} from 'react'
import AltContainer from 'alt-container';
import { browserHistory } from 'react-router';

import {MenuItem,FloatingActionButton,DropDownMenu,Dialog,FlatButton,TextField} from 'material-ui';
require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/scss/font-awesome.scss');
require('./../Main.scss');
import UserActions from './../actions/UserActions'
import SettingsActions from './../actions/SettingsActions'

export default class AccountSetting extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 1,
            logoutOpen:false,
            changePasswordOpen:false,
            error: {
                oldPass: '',
                newPass: ''
            }
        };
    }

    handleChange (event, index, value) {
        this.setState({value:1})
    }

    updateAccount(){

    }
    ///for password change///
    changePassword(){
        this.setState({changePasswordOpen:true});
        this.forceUpdate();
    }
    passwordClose(){
        this.setState({changePasswordOpen:false});
        this.forceUpdate();
    }

    updatePassword() {
        var passWordUpdateReq = {
            userId: this.props.user.id,
            oldPassword: this.refs.oldPass.getValue(),
            newPassword: this.refs.newPass.getValue(),
            newPasswordConfirm: this.refs.newPassConfirm.getValue()
        };
        if (!passWordUpdateReq.oldPassword) {
            this.state.error.oldPass = 'Old password is required'
        } else {
            this.state.error.oldPass = ''
        }
        if (!passWordUpdateReq.newPassword) {
            this.state.error.newPass = 'New password is required'
        } else {
            this.state.error.newPass = ''
        }
        if (!passWordUpdateReq.newPasswordConfirm) {
            this.state.error.newPass = 'Type your new password again'
        } else if (passWordUpdateReq.newPasswordConfirm != passWordUpdateReq.newPassword) {
            this.state.error.newPassConfirm = 'New password and confirm are not matching!'
        } else {
            this.state.error.newPassConfirm = ''
        }
        if (passWordUpdateReq.oldPassword &&
            passWordUpdateReq.newPassword &&
            passWordUpdateReq.newPasswordConfirm == passWordUpdateReq.newPassword) {
            passWordUpdateReq = {
                userId: this.props.user.id,
                oldPassword: this.refs.oldPass.getValue(),
                newPassword: this.refs.newPass.getValue()
            };
            SettingsActions.changePassword(passWordUpdateReq);
        }
        this.forceUpdate();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.passwordState.isSuccess()) {
            this.passwordClose();
        }
    }
    ////end password change///
    logout(){
        this.setState({logoutOpen: true});
    }

    logoutClose(){
        this.setState({logoutOpen: false});
    }

    render(){
        return(
            <div className="account_setting">
                <DropDownMenu
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    secondary={false} >
                    <MenuItem value={1} primaryText={this.props.user.email} disabled={true}/>
                    <MenuItem value={2} primaryText="Update Account" onClick={this.updateAccount.bind(this)}/>
                    <MenuItem value={3} primaryText="Change Password" onClick={this.changePassword.bind(this)} />
                    <MenuItem value={4} primaryText="Logout" onClick={this.logout.bind(this)}/>
                </DropDownMenu>
                <Dialog
                    title="Confirm Logout"
                    actions={[
                              <FlatButton
                                label="Later"
                                secondary={true}
                                onTouchTap={this.logoutClose.bind(this)}
                              />,
                              <FlatButton
                                label="Logout"
                                primary={true}
                                keyboardFocused={true}
                                onTouchTap={UserActions.logout}
                              />
                            ]}
                    modal={false}
                    open={this.state.logoutOpen}
                    onRequestClose={this.logoutClose.bind(this)}
                >
                    Are you sure want to logout from SurveyBuilder?
                </Dialog>
                <Dialog
                    title="Change password"
                    modal={false}
                    open={this.state.changePasswordOpen}
                    onRequestClose={this.passwordClose.bind(this)}
                >
                    <div className="row">
                        <div className="col-md-12 text-center">

                            <TextField
                                type="password"
                                hintText="Please type your old password"
                                ref='oldPass'
                                errorText={this.state.error.oldPass}
                            /><br/>
                            <TextField
                                type="password"
                                hintText="New password"
                                ref='newPass'
                                errorText={this.state.error.newPass}
                            /><br/>
                            <TextField
                                type="password"
                                hintText="Confirm New password"
                                ref='newPassConfirm'
                                errorText={this.state.error.newPassConfirm}
                            />
                        </div>

                        <div className="col-md-12 text-center">
                            {this.props.passwordState.isFailed() &&
                            (
                                <div className="alert alert-danger">
                                    {this.props.passwordState.message}
                                </div>
                            )
                            }
                            {this.props.passwordState.isLoading() &&
                            (
                                <span>
                                    <div className="la-ball-scale-multiple la-3x la-top-40">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    {this.props.passwordState.message}
                                </span>
                            )
                            }
                            {!this.props.passwordState.isLoading() &&
                            (
                                <div>
                                    <FlatButton
                                        label="Later"
                                        secondary={true}
                                        onTouchTap={this.passwordClose.bind(this)}
                                    />
                                    <FlatButton
                                        label="Update"
                                        primary={true}
                                        keyboardFocused={true}
                                        onTouchTap={this.updatePassword.bind(this)}
                                    />
                                </div>
                            )
                            }
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }

}