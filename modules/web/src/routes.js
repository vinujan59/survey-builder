import React, { PropTypes, Component } from 'react';
import { Route, Redirect } from 'react-router';

import Login from "./Main/components/Login"
import Main from "./Main/components/Main"

export default (

    <Route>
        <Route name="adminMain" path="/" component={Main}/>
    </Route>
);