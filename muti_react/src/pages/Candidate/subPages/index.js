import React, { Component } from "react";
import CandidateCp from "../../../components/candidateCp";


class Candidate extends Component {
    state = {
        showReply: false,
        showbtnbox: false,
        handleTimeStatus: 0,
        handleUpdateTimeStatus: 0
    }

    handleShowReply = (e, showReply) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        this.setState(prevState => ({
            showReply: !prevState.showReply
        }));
    }

    handleShowbtnbox = (e, showbtnbox) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
//      this.setState(prevState => ({
//          showbtnbox: !prevState.showbtnbox
//      }));
		let flag = event.target.nextSibling.style.visibility;
        if(flag==="hidden"){
        	event.target.nextSibling.style.display = "visible";
        }else{
        	event.target.nextSibling.style.display = "hidden";
        }
    }

    //点击跳转到候选人详情页
    handleCandidate = (e,webResumeId,applyId,postId) => {
    	const _this = this;
    	let ai = applyId==null?"":applyId;
    	let pi = postId==null?"":postId;
    	let wi = webResumeId==null?"":webResumeId;
    	localStorage.setItem('applyId', ai+"");
    	localStorage.removeItem('postId');
    	localStorage.setItem('postId', pi+"");
    	localStorage.setItem('webResumeId', wi+"");
    	localStorage.setItem('show', "close");
        e.nativeEvent.stopImmediatePropagation();
        localStorage.setItem("activeKey","2");
        window.open("./candidate.html#/candidateresdel/"+wi)
    }
    
    render() {
        return(
    		<div className="candidate-wrap">
                <CandidateCp 
                    states={ this.state }
                    handleShowReply={ this.handleShowReply }
                    handleShowbtnbox={ this.handleShowbtnbox }
                    handleCandidate={this.handleCandidate}
                />
            </div>
        )
    }
}

export default Candidate;