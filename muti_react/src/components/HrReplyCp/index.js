import React, { Component } from "react";
import { Badge, Icon,message,notification,Modal } from "antd";
import { getRemark,addRemark } from "../../fetch/candidate/index"
import {hex2Rgba,confirmBox} from '../../utils/common';

import "./styles";

class HrReplyCp extends Component {
	
	state = {
		remark:[],
		messageNum:0,
		replyText:""
	}
	
	getRemarkFun = (id)=>{
		const _this = this;
		const result = getRemark({applyId:id});
		result.then(response => response.json())
		.then(data => {
			if(data.state === 200) {
				let count = 0;
				for(let i = 0;i<data.data.length;i++){
					if(data.data[i].userType == 0){
						count++;
					}
				}
				_this.setState({
					remark:data.data,
					messageNum:count
				})
			}
		});
	}
	
	//点击发送功能
	changeSend = e => {
		e.nativeEvent.stopImmediatePropagation();
		const _this = this;
		let id = localStorage.getItem('applyId');
		let v = this.Trim(_this.state.replyText);
		if(v!=""){
			const result = addRemark({
				applyId:id,
				remark:_this.state.replyText
			});
			result.then(response => response.json())
			.then(data => {
				if(data.state === 200) {
				    confirmBox({content:data.data,onOk:function(){_this.props.showBlock();}});
					_this.getRemarkFun(id);
					_this.setState({
						replyText:""
					})
				}
			});
		}
	}
	handleReply = e => {
		this.setState({
			replyText:e.target.value
		})
	}
	Trim=(str)=>{ 
        return str.replace(/(^\s*)|(\s*$)/g, ""); 
    }
	componentDidMount() {
		let id = localStorage.getItem('applyId');
		this.getRemarkFun(id);
	}

	render() {
		const {
			showReplyBox,
			handleReplyBox,
			showCon,
			handleCon
		} = this.props;

		return(
			<div 
                className="hr-replay-big-wrap"
                onClick={e => {
                    e.nativeEvent.stopImmediatePropagation();
                }}
            >
                <div 
                    className="reply-receive-box"
                    style={{
                        display: showReplyBox ? "block" : "none",
                        borderColor: localStorage.themeColor
                    }}
                >
                    <p>
                        <span className="replay-con">
                            {this.state.remark.length>0?this.state.remark[0].remark:""}
                        </span>
                        <span 
                            className="reply-btn"
                            onClick={ e => handleCon(e, showCon) }
                            style={{
		                        color: localStorage.themeColor
		                    }}
                        >
                            回复 <Icon type="double-left" style={{color: localStorage.themeColor}} />
                        </span>
                    </p>
                    <div 
                        className="reply-input-box"
                        style={{
                            display: showCon ? "block" : "none"
                        }}
                    >
                        <input 
                            ref="sendVal"
                            className="reply-input"
                            placeholder="请输入回复消息"
                            value={this.state.replyText}
                            onChange={(e)=>{this.handleReply(e)}}
                        />
                        <span 
                            className="send"
                            onClick={ this.changeSend }
                            style={{color: localStorage.themeColor}}
                        >
                            发送
                        </span>
                    </div>
                </div>
                <ul 
                    className="reply-content"
                    style={{
                        display : showCon ? "block" : "none"
                    }}
                >
                	{
                		this.state.remark.map(function(item,index){
                			return (
                				<li key={`${item.userId}-${index}`} className={`${item.userType===0?"":"me_block"} con-li clearfix`}>
			                        <div className={item.userType===0?"person-hr":"person-me"}>{item.userType===0?"HR":"我"}</div>
			                        <span className="hour">
			                            {item.addDate}
			                        </span>
			                        <span className="texts">
			                            {item.remark}
			                        </span>
			                    </li>
                			)
                		})
                	}
                </ul>
                <div 
                    className="hr-reply-box"
                    style={{
                        backgroundColor: localStorage.themeColor,
                        boxShadow: "1px 1px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")
                    }}
                    onClick={ e => handleReplyBox(e, true) }
                >
                    HR
                    <Badge 
                        count={ this.state.messageNum }
                    ></Badge>
                </div>
            </div>
		)
	}
}

export default HrReplyCp;