import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApplyEdit from "../applyEdit";
import AfterResolved from "./subpages/afterResolved";
import QuicklyRecommend from "./subpages/quicklyRecommend";
import {Icon,Table , Pagination , Popover , Modal ,Button ,Input ,Spin ,message} from 'antd';
import {
    getResumeList,
    editApplyLetter,
    positionDetail,
    analyze
} from "../../fetch/home/resolve";
import { confirmBox } from "../../utils/common";

import "./styles";

class TabOne extends Component {
	constructor(props) {
        super(props);
		
		this.state = {
			showResolveList:false,
			resolveIds:[],
			start:false,
			resumeList:[],
			total:0,
			loading:false,
			showFail:false,
			cleanList:false,
			modalLock:false
		}
    }
	
	getResolved = (id, type,func) => {
		const _this = this;
		this.setState({
			loading:true
		});
		const result = analyze({
			resumeTempIds: id,
			postId: type
		});
		result.then(response => response.json())
			.then(data => {
				_this.setState({
					loading:false
				});
				if(data.state === 200) {
					let resumeArr = [] , rowData = data.data.resumeList;
					if(rowData.length==0){
					    confirmBox({content:data.data.message,onOk:function(){
					    	_this.setState({
						    		showFail:true
						    	})
					    	}
					    });
					}else{
						for(let i = 0;i<rowData.length;i++){
			            	let dom = {
			            		userName:rowData[i].userName,
			            		resumeId:rowData[i].resumeId,
			            		gender:rowData[i].gender,
			            		age:rowData[i].age,
			            		email:rowData[i].email,
			            		mobilePhone:rowData[i].mobilePhone,
			            		addDate:rowData[i].addDate,
			            		lanType:rowData[i].lanType,
			            		finish:rowData[i].cnResumeFinish+"-"+rowData[i].enResumeFinish,
			            		applyLetter:rowData[i].applyLetter == null?"":rowData[i].applyLetter,
			            		isQuickResume:rowData[i].isQuickResume,
			            		finishPercentCh:rowData[i].finishPercentCh,
			            		finishPercentEn:rowData[i].finishPercentEn,
			            		canApply:rowData[i].canApply,
			            		canUpdate:rowData[i].canUpdate,
			            		hasApply:rowData[i].hasApply,
			            		needCnResumeFinish:rowData[i].needCnResumeFinish,
	            				needEnResumeFinish:rowData[i].needEnResumeFinish
			            	}
			            	resumeArr.push(dom);
			            }
					    confirmBox({content:data.data.message});
						_this.setState({
							resumeList: resumeArr,
							total:data.data.resumeList.length
						},()=>{
							func();
						});
					}
				}
			});
	}
	
	resolve(ids,arr){
		const _this = this;
		let arry = ids.join(",");
		const u = window.location.href;
		const len = u.split("/").length;
		const id = u.split("/")[len-1];
		let reg = /^[0-9]+.?[0-9]*$/;
		let postid;
		if (reg.test(id)) {
			postid = id;
		}else{
			postid = ""
		}
		if(ids.length>1){
			this.getResolved(arry,postid,function(){
				_this.setState({
					showResolveList:true,
					resolveIds:ids,
					start:true
				});
			});
		}else if(ids.length==1){
			const result = analyze({
				resumeTempIds: arry,
				postId: postid
			});
			result.then(response => response.json())
			.then(data => {
				if(data.data.resumeList){
					if(data.data.resumeList.length>0){
						localStorage.setItem('resumeId', data.data.resumeList[0].resumeId);
						localStorage.setItem("postId",_this.props.postId);
						localStorage.setItem('record', "{}");
						localStorage.setItem('tab',"1");
						localStorage.setItem("activeKey","1");
						window.location.href="./home.html#/completeresume?resumeId="+data.data.resumeList[0].resumeId;
					}else{
						if(!this.state.modalLock){
							_this.setState({
								modalLock:true
							});
							confirmBox({content:data.data.message,onOk:function(){
									_this.setState({
										showFail:true,
										modalLock:false
									})
								}
							});
						}
						
					}
				}
			});
//			this.setState({
//				showResolveList:true,
//				resolveIds:ids
//			});
		}else{
			
		}
	}
	
	continueFun=()=>{
		this.setState({
    		showFail:false,
    		cleanList:true
    	})
	}
	
	render() {
		return (
			<div>
			<div style={{display:this.state.showFail?"none":"block"}}>
				<div style={{display:this.state.showResolveList?"block":"none"}}>
					<AfterResolved  openDialog={()=>{this.props.openDialog}} loading={this.state.loading} total={this.state.total} resumeList={this.state.resumeList} postId={this.props.postId} dataArr={this.state.resolveIds} postType={this.props.postType} start={this.state.start}></AfterResolved>
				</div>
				<div style={{display:this.state.showResolveList?"none":"block"}}>
					<QuicklyRecommend cleanList={this.state.cleanList} canApplyType={this.props.canApplyType} defaultApplyType={this.props.defaultApplyType} quickMustUpload={this.props.quickMustUpload} postId={this.props.postId} postType={this.props.postType} resolveResume={(ids,arr)=>{this.resolve(ids,arr)}}></QuicklyRecommend>
				</div>
	    	</div>
	    	<div className="finish_block" style={{display:this.state.showFail?"block":"none",minHeight:"800px",paddingTop:"50px"}}>
				<div className="logo-fail"></div>
	          	<p style={{fontSize:"16px",textAlign:"center",marginBottom:"15px"}}>抱歉您上传的文件解析失败请重新上传</p>
	          	<div className="block_btn-footer">
		          	<Button className="form_button-cancel" onClick={this.continueFun}>取消</Button>
		          	<Button className="form_button-submit" onClick={this.continueFun}>继续上传</Button>
	          	</div>
			</div>
			</div>
		);
	}
}

export default withRouter(TabOne);