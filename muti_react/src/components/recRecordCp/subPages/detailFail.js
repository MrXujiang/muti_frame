import React, { Component } from "react";
import { Input, Timeline } from "antd";
import DetailFailItem from "./detailFailItem";

class DetailFail extends Component{
	
	render(){
		return (
			<Timeline.Item color={localStorage.themeColor}>
				<span className="nowtime">{this.props.time}</span>
				{
					this.props.data.map((item,index) => {
						return <DetailFailItem closeAll={this.props.closeAll} key={index} item={item} />
					})
				}
			</Timeline.Item>
		)
	}
	
}

export default DetailFail;