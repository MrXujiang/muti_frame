import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Index from "./subPages/index";
import NotFound from "../NotFound";
import ModifyPwd from "./subPages/modifypwd";
import NewModifyPwd from "./subPages/newmodifypwd";

const Routes = () => (
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={ ModifyPwd } />
                <Route path="/modifypwd" component={ ModifyPwd } />
                <Route path="/newmodifypwd" component={ NewModifyPwd } />
                <Route path="*" component={ NotFound } />
            </Switch>
        </App>
    </Router>
);

export default Routes;