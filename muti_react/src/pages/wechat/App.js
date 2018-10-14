import React, { Component } from "react";
import { pageSet } from "../../fetch/common/index";

import "../../styles/wechat";

class App extends Component {
	state = {
		pageImgType: 1
	}

	componentDidMount() {
    	pageSet().then(response => response.json())
		.then(data => {
			let pageImgType;
			if(data.data.themeColor === "#ea0909"||data.data.themeColor === "#f97b00"||data.data.themeColor === "#e9c500"){
			 	pageImgType = 3;
			}else if(data.data.themeColor === "#00b85b"){
				pageImgType = 2;
			}else if(data.data.themeColor === "#7c00b0"||data.data.themeColor === "#f41e97"){
				pageImgType = 4;
			}else{
				pageImgType = 1;
			}
			this.setState({
				pageImgType: pageImgType
			})
		});
    }

    render() {
        return (
            <div className="App-wrap">
            	<div className={"App-main wechat-"+ this.state.pageImgType +"-bg"}>
                	{ this.props.children }
                </div>
            </div>
        )
    }
}

export default App;
