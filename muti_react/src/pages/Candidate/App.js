/*
    Created By SlimHong at 2018/5/3
*/
import React, { Component } from "react";
import IndexHeader from "../../components/indexHeader";
import IndexFooter from "../../components/indexFooter";

import "../../styles/reset";
import "../../styles/candidate";
import "../../styles/colorStyle";

class App extends Component {

    changeJumperPage = () => {
        const jumperDOM = document.querySelector(".ant-pagination-options-quick-jumper");

        //使用正则进行匹配
        jumperDOM && (jumperDOM.firstChild.data = "跳至");
        jumperDOM && (jumperDOM.lastChild.data = "页");
    }

    /* 打开外链 */
    openOuterLink = url => {
        window.location.href = url;
    }
    
    getRootFun = () => {
		let path = window.location.pathname;
		let p = path.split("hunter");
		return (p.length==1?"/wt/runner/":p[0])+"hunter/bg";
	}

    componentDidMount() {
        this.changeJumperPage();
    }

    render() {
        return (
            <div className="wrap">
                <IndexHeader titleIndex={ "2" } />
                { this.props.children }
                <IndexFooter />
            </div>
        )
    }
}

export default App;
