/*
    Created By SlimHong at 2018/5/3
*/
import React, { Component } from "react";
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import IndexHeader from "../../components/indexHeader";
import IndexFooter from "../../components/indexFooter";

import "../../styles/content";
import "../../styles/colorStyle";

class App extends Component {

    render() {
        return (
        	<LocaleProvider locale={zh_CN}>
	            <div className="wrap">
	                <IndexHeader />
	                { this.props.children }
	                <IndexFooter />
	            </div>
            </LocaleProvider>
        )
    }
    
}


export default App;
