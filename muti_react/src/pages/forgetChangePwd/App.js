import React, { Component } from "react";
import {getLogo} from '../../utils/common';

import "../../components/NewModifyPwdCp/styles";
import "../../components/ModifyPwdCp/styles";

class App extends Component {
	
	state={
		headerLogo:""
	}
	
	componentDidMount(){
		this.setState({
			headerLogo: getLogo
		})
	}
	
    render() {
        return (
            <div className="wrap">
            	<div className="img-box-other">
		            <img className="headImg" style={{marginTop:"0"}} src={this.state.headerLogo} alt="暂无图片" />
			    </div>
                { this.props.children }
            </div>
        )
    }
}

export default App;
