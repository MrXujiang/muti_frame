import React, { Component } from "react";
import ReplyRemark from "../../candidateCp/replyRemark";
import { getRemark } from "../../../fetch/candidate/index"

class DetailFailItem extends Component{
	state = {
        remarkText: []
    }

    getRemarkFun = (event)=>{
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        this.props.closeAll();
        this.replyBox.style.display = "block";
        const result = getRemark({applyId: this.props.item.applyId});
        result.then(response => response.json())
        .then(data => {
            if(data.state === 200) {
                this.setState({
                    remarkText: data.data
                })
            }
        });
    }
	
	render(){
		const item = this.props.item;
		return (
			<div className="fail-li clearfix">
                <div className="leftfail-box">
                    <div className="fail-name">{item.userName}</div>
                    <div className="portrait-detail">
                        {item.lastEmployerBeginDate||"暂无"}--{item.lastEmployerEndDate||"暂无"}
                    </div>
                    <div className="portrait-detail">
                        <span title={item.lastEmployerName||"暂无"}>{item.lastEmployerName||"暂无"}
                        </span><em>|</em><span title={item.lastPostName||"暂无"}>{item.lastPostName||"暂无"}</span>
                    </div>
                </div>
                <div className="rightfail-box">
                    <div className="big-title clearfix">
                        {item.applyPostName||"暂无"}
                        <p style={{color: localStorage.themeColor}}>
                            <span>{item.failReason||"暂无"}</span>
                            {item.showRemark?<span className="showRemark" onClick={this.getRemarkFun}><em>|</em>历史纪录</span>:null}
                        </p>
                    </div>
                    <div className="big-detail">
                        <div className="evaluate"
                            style={{color: localStorage.themeColor, borderColor: localStorage.themeColor}}>评</div>
                        <div className="mes">
                        	{item.applyLetter||"暂无"}
                        </div>
                    </div>
                </div>
                <div style={{
                    display: "none",
                    borderColor: localStorage.themeColor,
                    overflow: "auto",
                    right: "25px",
                    zIndex:"10"}} 
                    ref={replyBox => this.replyBox = replyBox}
                    className="reply-box"
                >
                    <ReplyRemark remarkText={this.state.remarkText}/>
                </div>
            </div>
		)
	}
}

export default DetailFailItem;