import React, { Component } from "react";
import CandidateResDelCp from "../../../components/candidateResDelCp";
import CandidateContent from "../../../components/candidateContent";
import { getDetail } from "../../../fetch/candidate/index";

import "../../../styles/candidateresdel";

class CandidateResDel extends Component {
    state = {
        messageNum: 1,
        process: {
            currentProcess: 4,
            steps: [
                {
                    title: ''
                },
                {
                    title: ''
                },
                {
                    title: '面试',
                    description: '02-01'
                },
                {
                    title: '测评',
                    description: '02-02'
                },
                {
                    title: '笔试',
                    description: '02-21'
                },
                {
                    title: 'offer'
                },
                {
                    title: '待入职'
                },
                {
                    title: ''
                }
            ]
        },
        showReplyBox: false,
        showCon: false,
        resume:{
        	"resumeInfo": [],
			"applyLetter": "",
			"personInfo": {}
        }
    }

    //显示/隐藏内容和回复
    handleCon = (e, booleans) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        
        if(booleans) {
            this.setState(prevState => ({
                showCon: !booleans
            }));

            return;
        }
        this.setState(prevState => ({
            showCon: !prevState.showCon
        }));
    }

    //显示/隐藏回复页面
    handleReplyBox = (e, booleans) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();

        this.setState(prevState => ({
            showReplyBox: !prevState.showReplyBox
        }));

        this.handleCon(e, booleans);
    }
    showBlock=()=>{
    	const _this = this;
    	setTimeout(function(){
    		_this.setState({
	            showCon: true,
	        	showReplyBox: true
	        });
    	},10)
    }

    handleHideAll = e => {
        this.setState({
            showCon: false,
            showReplyBox: false
        });
    }

    getResumeData = () => {
        const id = window.location.href.split("/")[1];
        let applyId = localStorage.getItem('applyId');
        const postId = localStorage.getItem('postId');
        const webResumeId = localStorage.getItem('webResumeId');
//      const result = getDetail({applyId:applyId,userResumeId:id});
        const result = getDetail({applyId:applyId,postId:postId,userResumeId:webResumeId});
        result.then(response => response.json()).then(data => {
            if(data.state === 200 && Object.keys(data.data).length !== 0){
                this.setState({
                    resume: data.data
                })
            }
        });
    }

    componentDidMount() {
        document.addEventListener("click", this.handleHideAll, false);
        
        const show = localStorage.getItem('show');
        if(show==="open"){
        	this.setState({
				showCon: true,
            	showReplyBox: true
			})
        }

        // 获取简历数据
        this.getResumeData();
    }

    render() {
        return (
            <div className="candidate-res-del-wrap">
                <CandidateResDelCp 
                    stepsArr={ this.state.process.steps }
                    process={ this.state.process.currentProcess }
                    data={this.state.resume}
                />
                <CandidateContent 
                    messageNum={ this.state.messageNum }
                    showReplyBox={ this.state.showReplyBox }
                    handleReplyBox={ this.handleReplyBox }
                    showCon={ this.state.showCon }
                    handleCon={ this.handleCon }
                    data={this.state.resume}
                    showBlock={this.showBlock}
                />
            </div>
        )
    }
}

export default CandidateResDel;