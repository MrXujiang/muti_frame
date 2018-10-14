import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Index from "./subPages/index";

const Routes = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={ Index } />
            </Switch>
        </App>
    </Router>
);

export default Routes;
