import React, {Component} from 'react'

import {TextField,RaisedButton,Card} from 'material-ui';
require('bootstrap/dist/css/bootstrap.min.css');
require('./../login.css');

const buttonStyle = {
    margin: 12
};

export default class Login extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="col-xs-6 col-xs-offset-3 ">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Card >
                    <div className="col-xs-8 col-xs-offset-2">
                        <TextField
                            hintText="Email"
                            floatingLabelText="Email"
                            fullWidth={true}
                        />
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            fullWidth={true}
                        />
                        <div className="col-xs-offset-4">
                            <RaisedButton label="Login" style={buttonStyle}/>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}