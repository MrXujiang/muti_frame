import React, { Component } from "react";
import { Icon } from 'antd';

class ShowMoreBtn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			iconType:"up-circle-o"
		}
	}
	
	iconClick = ()=>{
		if(this.state.iconType === "up-circle-o"){
			this.setState({
				iconType:"down-circle-o"
			});
			this.props.showMore(this.props.name,"none");
		}else{
			this.setState({
				iconType:"up-circle-o"
			});
			this.props.showMore(this.props.name,"block");
		}
	}
	
	render() {
		return (
			<Icon type={this.state.iconType} onClick={this.iconClick} />
		)
	}
}

export default ShowMoreBtn;