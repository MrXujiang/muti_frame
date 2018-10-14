/*
    Created By SlimHong at 2018/5/3
*/
import React, { Component } from "react";
import IndexHeader from "../../components/indexHeader";
import IndexFooter from "../../components/indexFooter";

import "../../styles/reset";
import "../../styles/pwdmanage";
import "../../styles/colorStyle";

class App extends Component {

    render() {
        return (
            <div className="wrap">
            	<IndexHeader titleIndex={ "1" } />
                { this.props.children }
                <IndexFooter />
            </div>
        )
    }
}

export default App;
