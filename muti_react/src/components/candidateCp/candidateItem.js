import React, { Component } from "react";
import { Select, Input, Tag, Popover, Pagination,Icon,Modal } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import ReplyRemark from "./replyRemark";
import { getRemark,addRemark,canRemark } from "../../fetch/candidate/index";
import { confirmBox } from "../../utils/common";

import "./styles";
import moreIcon from "../../images/icons/moremes-icon.png";
import replayIcon from "../../images/icons/reply_icon.png";

class CandidateItem extends Component {
	
	state = {
		showReply:false,
		showReplyList:false,
		showbtnbox:false,
		replyText: "",
		firstGet:true,
		remarkText:[],
	}
	
	handleShowReply = (event,flag)=>{
		this.setState({
			showReply:!flag,
			showbtnbox:false
		})
	}
	handleShowbtnbox = (event)=>{
		event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if(this.replyBox1.style.display == "block"){
			this.replyBox1.style.display = "none";
        }else{
        	this.props.closeAll();
			this.replyBox1.style.display = "block";
        }
		// this.setState({
		// 	showbtnbox:!this.state.showbtnbox
		// })
	}
	//回复内容输入框更新
	handleReply = (event) => {
		this.setState({
			replyText: event.target.value
		});
	}
	getRemarkFun = (id)=>{
		const result = getRemark({applyId:id});
		result.then(response => response.json())
		.then(data => {
			if(data.state === 200) {
				this.setState({
					remarkText:data.data
				})
			}
		});
	}
	
	
	//展示回复信息
	showReplyRemark = (event) =>{
		const _this = this;
		event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        if(this.replyBox2.style.display == "block"){
			this.replyBox2.style.display = "none";
        }else{
        	this.props.closeAll();
			this.replyBox2.style.display = "block";
        }
        if(this.state.firstGet){
			this.getRemarkFun(_this.props.data.applyId);
		}
        this.setState({
			// showReplyList: !this.state.showReplyList,
			firstGet:false
		});
	}
	//发送回复
	sendReply = (id) => {
		const _this = this;
		const result = addRemark({
			applyId:id,
			remark:_this.state.replyText
		});
		result.then(response => response.json())
		.then(data => {
			if(data.state === 200) {
			    confirmBox({content:data.data});
				_this.setState({
					replyText: ""
				});
			}
		});
	}

	//阻止冒泡
	stopPropagation = (event) => {
		event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
	}


	render() {
		const _this = this;
		function formateDate(param) {
			let str = "";
			if(param != null) {
				let p = new Date(param);
				//	    		let year = p.getFullYear();
				//	    		let month = p.getMonth();
				//	    		let d = p.getDate();
				//	    		str = `${year}-${month}-${d}`;
				str = param.split("T")[0];
			}
			return str;
		}
		let annulus = "";
		if(this.props.data.annulusName!=null){
			annulus = this.props.data.annulusName+"-";
		}
		return (
			<div 
                className="candidate-li"
                onClick={(event) => {
                    _this.props.handleCandidate(event,_this.props.data.webResumeId,_this.props.data.applyId,_this.props.data.postId)
                }}
            >
                <div className="can-title">
                    <span className="name">{this.props.data.userName}</span>
                    <span className="pendings" style={{color:localStorage.themeColor}}>
                    	{annulus}{this.props.data.applyStatus}
                    </span>
                    <span className="position">
                    	{this.props.data.postName}
                    	{
                    		this.props.data.changPost==0&&
                    		<span><i className="icon_rightpoint"></i>{this.props.data.changToPostName}</span>
                    	}
                	</span>
                    <span 
                        className="reply-btn"
                    >
                    	<span className="reply" style={{display:this.props.data.changPost==0||!this.props.data.lastRemark?"none":"inline-block"}}>
	                        <span className="substance">
	                            HR：{this.props.data.lastRemark||"暂无"}
	                        </span>
	                        <span className="moreIcon"
	                        	style={{borderColor: localStorage.themeColor,marginRight:'38px'}}
	                            onClick={this.stopPropagation}
	                            onMouseEnter={ e => this.handleShowReply(e, _this.state.showReply) }
	                            onMouseLeave={ e => this.handleShowReply(e, _this.state.showReply) }
	                        ><Icon type="ellipsis" style={{color: localStorage.themeColor}} /></span>
	                        <div 
	                            className="show-box"
	                            style={{
	                                visibility: _this.state.showReply ? "visible" : "hidden",
	                                opacity: _this.state.showReply ? "1" : "0",
                        			borderColor: localStorage.themeColor
	                            }}
	                            onClick={this.stopPropagation}
	                        >
	                            <Scrollbars
	                                style={{
	                                    width: "100%",
	                                    height: "100%",
	                                    zIndex: "2",
										backgroundColor: "#fff"
	                                }}
	                            >
	                                {this.props.data.lastRemark||"暂无"}
	                            </Scrollbars>
	                        </div>
	                    </span>
	                    <span>
                        {this.props.data.isOpenHunterRemark?<Icon type="message"
                        	onClick={_this.handleShowbtnbox}
                        	style={{color: localStorage.themeColor, marginRight: "5px"}} />:null}
                        {this.props.data.isOpenHunterRemark?<span onClick={_this.handleShowbtnbox}
                        	style={{color:localStorage.themeColor}}>回复</span>:null}
                        <Icon type="down" onClick={_this.showReplyRemark}
                        	style={{color: localStorage.themeColor, marginLeft: "5px"}} />
                        </span>
                        <div style={{
                    		// display:_this.state.showReplyList?"block":"none",
                    		display: "none",
                        	overflow:"auto",
                        	background:"#fff",
                        	borderColor: localStorage.themeColor,
                        	zIndex:"10"}}
                        	ref={replyBox => this.replyBox2 = replyBox}
                        	className="reply-box">
                        	<ReplyRemark applyId={this.props.data.applyId} remarkText={_this.state.remarkText} />
                        </div>
                    </span>
                    <div 
                        className="reply-box"
                        style={{
                    		// display:_this.state.showbtnbox?"block":"none",
                    		display: "none",
                        	borderColor: localStorage.themeColor,
                            zIndex:"10"
                        }}
                        ref={replyBox => this.replyBox1 = replyBox}
                        onClick={this.stopPropagation}
                    >
                        <textarea id="replytext" value={this.state.replyText} placeholder="请输入回复信息" onChange={_this.handleReply} ></textarea>
                        <div className="btnbox">
                            <span className="send" onClick={()=>{_this.sendReply(_this.props.data.applyId)}}
                            	style={{display:this.props.data.changPost==0?"none":"inline-block", color: localStorage.themeColor}} >
                                发送
                            </span>
                            |
                            <span 
                                className="close"
                                onClick={ e => _this.handleShowbtnbox(e, _this.state.showbtnbox) }
                            >
                                关闭
                            </span>
                        </div>
                    </div>
                </div>
                <div className="can-detail">
                    <span className="grey-mal" style={{display:this.props.data.livingPlace?"inline":"none"}}>{this.props.data.livingPlace}</span>
                    <span className="grey-mal" style={{display:this.props.data.age?"inline":"none"}}>{this.props.data.age}岁</span>
                    <span className="grey-mal" style={{display:this.props.data.workYears?"inline":"none"}}>{this.props.data.workYears}年工作经验</span>
                    <span className="grey-mal">推荐时间：{formateDate(this.props.data.applyDate)}</span>
                    <span className="grey-mal" style={{visibility:this.props.data.changeApplyStatusDate?"visible":"hidden"}}>环节变更时间：{formateDate(this.props.data.changeApplyStatusDate)}</span>
                </div>
            </div>
		)
	}
}

export default CandidateItem;