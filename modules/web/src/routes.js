import React, { PropTypes, Component } from 'react';
import { Route, Redirect } from 'react-router';

import Login from "./Main/components/Login"
import AdminMain from "./Main/components/AdminMain"

export default (

    <Route>
        <Route name="login" path="/login" component={Login}/>
        <Route name="adminMain" path="/" component={AdminMain}/>
    </Route>
);