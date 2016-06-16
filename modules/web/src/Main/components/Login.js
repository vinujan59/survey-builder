import React, {Component} from 'react'
import AltContainer from 'alt-container';

import UserStore from './../stores/UserStore'
import UserActions from './../actions/UserActions'
import { browserHistory } from 'react-router';

import { FloatingActionButton, Avatar, FontIcon,
    TextField, Checkbox, RaisedButton, IconButton,FlatButton,Dialog} from 'material-ui'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegister: false,
            passWordError: ""
        };
    }

    login() {
        var user = {
            email: this.refs.userName.getValue(),
            password: this.refs.password.getValue()
        };
        UserActions.login(user);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 margin-top-80 text-center">
                        <h2>Survey Builder Login</h2>
                        {this.props.loginState.isFailed() &&
                        (
                            <div className="alert alert-danger">
                                {this.props.loginState.message}
                            </div>
                        )
                        }

                        {this.props.loginState.isLoading() &&
                        (
                            <span>
                                <div className="la-ball-scale-multiple la-3x la-top-40">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                {this.props.loginState.message}
                            </span>
                        )
                        }
                        {!this.props.loginState.isLoading() &&
                        (
                            <div>
                                <TextField
                                    ref="userName"
                                    floatingLabelText="User name"/>
                                <br/>

                                <TextField
                                    ref="password"
                                    floatingLabelText="Password" type="password"/>
                                <br/>
                                <div className="margin-top-40">
                                    <RaisedButton label="Login"
                                                  primary={true}
                                                  onClick={this.login.bind(this)}/>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>
                <div className="margin-top-40 text-center">
                    <RaisedButton label="Register"
                                  secondary={true}
                                  onClick={()=>{this.setState({isRegister:true})}}/>
                </div>
                <Dialog
                    title="Register"
                    modal={false}
                    open={this.state.isRegister}
                    onRequestClose={()=>{this.setState({isRegister:false})}}
                >
                    <div className="row">
                        <div className="col-md-12 text-center">

                            <TextField
                                type="UserName"
                                hintText="Please type user name"
                                ref='username'
                            /><br/>
                            <TextField
                                type="password"
                                hintText="Password"
                                ref='regpassword'
                            /><br/>
                            <TextField
                                type="password"
                                hintText="Confirm password"
                                onChange={()=>{if(this.refs.PassConfirm.getValue() != this.refs.regpassword.getValue()){this.setState({passWordError:"Password not matching!"})}else{this.setState({passWordError:""})}}}
                                ref='PassConfirm'
                                errorText={this.state.passWordError}
                            /><br/>
                        </div>

                        <div className="col-md-12 text-center">
                            <div>
                                <FlatButton
                                    label="Later"
                                    secondary={true}
                                    onTouchTap={()=>{this.setState({isRegister:false})}}
                                />
                                <FlatButton
                                    label="Register"
                                    primary={true}
                                    keyboardFocused={true}
                                    onTouchTap={()=>{

                                            }
                                        }
                                />
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default Login;