import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Index from "./subPages/index";
import PositionDetail from "./subPages/positiondetail";
import Recresume from "./subPages/recresume";
import Resolve from "./subPages/resolve";
import CompleteResume from "./subPages/completeresume";
import NotFound from "../NotFound";

const Routes = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={ Index } />
                <Route exact path="/home" component={ Index } />
                <Route path="/positiondetail/:id" component={ PositionDetail } />
                <Route path="/resolve" component={ Resolve } />
                <Route path="/recresume/:id" component={ Recresume } />
                <Route path="/completeresume" component={CompleteResume} />
                <Route path="*" component={ NotFound } />
            </Switch>
        </App>
    </Router>
);

export default Routes;
