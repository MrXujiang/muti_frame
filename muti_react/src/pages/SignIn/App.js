import React, { Component } from "react";

import "../../styles/reset";
import "../../styles/signin";
import "../../styles/colorStyle";

class App extends Component {
	
	getRootFun = () => {
		let path = window.location.pathname;
		let p = path.split("hunter");
		return (p.length==1?"/wt/runner/":p[0])+"hunter/bg";
	}

    render() {
        return (
            <div className="wrap">
                { this.props.children }
            </div>
        )
    }
}

export default App;
