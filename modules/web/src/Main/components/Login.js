import React, {Component} from 'react'
import AltContainer from 'alt-container';

import UserStore from './../stores/UserStore'
import UserActions from './../actions/UserActions'
import { browserHistory } from 'react-router';

import { FloatingActionButton, Avatar, FontIcon,
    TextField, Checkbox, RaisedButton, IconButton} from 'material-ui'

class Login extends Component {

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

            </div>
        )
    }
}

export default Login;