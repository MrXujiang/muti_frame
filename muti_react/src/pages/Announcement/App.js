import React, { Component } from "react";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import IndexHeader from "../../components/indexHeader";
import IndexFooter from "../../components/indexFooter";

import "../../styles/reset";
import "../../styles/home";
import "../../styles/colorStyle";

class App extends Component {

    /* 打开外链 */
    openOuterLink = url => {
        window.location.href = url;
    }
    
    getRootFun = () => {
		let path = window.location.pathname;
		let p = path.split("hunter");
		return (p.length==1?"/wt/runner/":p[0])+"hunter/bg";
	}

    render() {
        return (
        	<LocaleProvider locale={zh_CN}>
                <div className="wrap">
                    <IndexHeader titleIndex={ "1" } />
                    { this.props.children }
                    <IndexFooter />
                </div>
            </LocaleProvider>
        )
    }
}

export default App;
