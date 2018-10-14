import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Recommenndrecord from "./subPages/recommenndrecord";
import Afterrec from "./subPages/afterrec";
import NotFound from "../NotFound";

const Routes = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={ Recommenndrecord } />
                <Route path="/recommenndrecord" component={Recommenndrecord} />
                <Route path="/afterrec" component={Afterrec} />
                <Route path="*" component={NotFound} />
            </Switch>
        </App>
    </Router>
);

export default Routes;
