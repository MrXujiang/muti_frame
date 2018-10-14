import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Index from "./subPages/index";
import CandidateResDel from "./subPages/candidateresdel";
import NotFound from "../NotFound";

const Routes = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={ Index } />
                <Route path="/candidate" component={ Index } />
                <Route path="/candidateresdel" component={ CandidateResDel } />
                <Route path="*" component={ NotFound } />
            </Switch>
        </App>
    </Router>
);

export default Routes;