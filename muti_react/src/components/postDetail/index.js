import React, { Component } from "react";
import PositionDetail from "../positionDetail";
import {Icon, Popover} from 'antd';

class PostDetail extends Component {
	constructor(props) {
        super(props);
		
		this.state = {
            detailsStyle:{display:"none"},
            iconName:"展开",
            iconType: "down"
        };
		
		this.detailsToggle = this.detailsToggle.bind(this);
    }
	
	detailsToggle = ()=>{
		if(this.state.iconType === "down"){
			this.setState(prevState => ({
		      iconType: "up",
		      iconName:"收起",
		      detailsStyle:{display:"block"}
		    }));
		}else{
			this.setState(prevState => ({
		      iconType: "down",
		      iconName:"展开",
		      detailsStyle:{display:"none"}
		    }));
		}
	}
	
	render(){
		function chargeShow(param){
			if(param==""||param==null||param){
				return "none";
			}else{
				return "inline";
			}
		}
		return (
			<div>
				<div className="block_frame-position position_detail">
					<h1>{this.props.positionDetail.postName}</h1>
					<span className="font_middle high_light"
						style={{display:this.props.positionDetail.workingTreatment.split("-").length>1?"inline":"none",
							color: localStorage.themeColor}}>
						{this.props.positionDetail.workingTreatment.split("-")[0]} ~ {this.props.positionDetail.workingTreatment.split("-")[1]}
					</span>
					<span className="font_middle high_light"
						style={{display:this.props.positionDetail.workingTreatment.split("-").length>1?"none":"inline",
						 	color: localStorage.themeColor}}>
						薪资暂无数据
					</span>
					<span title={this.props.positionDetail.workPlace} style={{display:this.props.positionDetail.workPlace?"inline-block":"none"}} className="font_small">{this.props.positionDetail.workPlace} &nbsp;|</span>  
					<span title={this.props.positionDetail.orgName} style={{display:this.props.positionDetail.orgName?"inline-block":"none"}} className="font_small">{this.props.positionDetail.orgName} &nbsp;|</span>  
					<span title={this.props.positionDetail.education} style={{display:this.props.positionDetail.education?"inline-block":"none"}} className="font_small">{this.props.positionDetail.education} &nbsp;|</span>  
					<span title={this.props.positionDetail.recruitNum} style={{display:this.props.positionDetail.recruitNum?"inline-block":"none"}} className="font_small">招聘{this.props.positionDetail.recruitNum}人 &nbsp;|</span>  
					<span title={this.props.positionDetail.recruiterName} style={{display:this.props.positionDetail.recruiterName?"inline-block":"none"}} className="font_small">招聘负责人: {this.props.positionDetail.recruiterName} &nbsp;|</span>  
					<span title={this.props.positionDetail.publishDate} className="font_small">发布时间: {this.props.positionDetail.publishDate}</span>
					<a onClick={this.detailsToggle} style={{color: localStorage.themeColor}}>{this.state.iconName} <Icon type={this.state.iconType} style={{color: localStorage.themeColor}} /></a>
				</div>
				<div className="position-detail-outer" style={this.state.detailsStyle}>
					<PositionDetail positionListArr={this.props.positionDetail} showBtn="none"></PositionDetail>
				</div>
			</div>
		);
	}
}
export default PostDetail;