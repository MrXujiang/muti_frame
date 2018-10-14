import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Index from "./subPages/index";
import NewModifyPwd from "./subPages/newmodifypwd";

const Routes = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={ Index } />
                <Route path="/newmodifypwd" component={ NewModifyPwd } />
            </Switch>
        </App>
    </Router>
);

export default Routes;
