import React, { Component } from "react";
import { Pagination } from 'antd';
import {copyRight , privacy} from "../../fetch/common/index";

import "./styles";

class IndexFooter extends Component {
	
	state={
		privacy:"",
		copyRight:""
	}
	
	getCopyRight=()=>{
		const _this = this;
		const result = copyRight();
		result.then(res => res.json())
        .then(data => {
        	_this.setState({
        		copyRight:data.data
        	})
        });
	}
	getPrivacy=()=>{
		const _this = this;
		const result = privacy();
		result.then(res => res.json())
        .then(data => {
        	_this.setState({
        		privacy:data.data
        	})
        });
	}
	
	componentDidMount() {
		this.getCopyRight();
		// this.getPrivacy();
	}
	
	render(){
		const _this = this;
		return (
			<div className="index-footer-box">
				{/*<p>{this.state.privacy}</p>*/}
				<p dangerouslySetInnerHTML={{__html:_this.state.copyRight}}></p>
			</div>
		)
	}
}

export default IndexFooter;
