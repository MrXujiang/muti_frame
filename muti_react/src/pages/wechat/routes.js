import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Index from "./subPages/index";
import Bind from "./subPages/bind";
import Forget from "./subPages/forget";
import Success from "./subPages/success";
import Bound from "./subPages/bound";
import NotFound from "../NotFound";

const Routes = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={ Index } />
                <Route exact path="/bind" component={ Bind } />
                <Route exact path="/forget" component={ Forget } />
                <Route exact path="/success" component={ Success } />
                <Route exact path="/bound" component={ Bound } />
                <Route path="*" component={ NotFound } />
            </Switch>
        </App>
    </Router>
);

export default Routes;
