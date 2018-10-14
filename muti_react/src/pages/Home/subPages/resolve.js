import React, { Component } from "react";
import ApplyEdit from "../../../components/applyEdit";
import PostDetail from "../../../components/postDetail";
import TabOne from "../../../components/resolveTab/tabOne";
import TabTwo from "../../../components/resolveTab/tabTwo";
import {Icon , Tabs , Modal ,Input } from 'antd';
import { positionDetail } from "../../../fetch/home/resolve";
import { applyType } from "../../../fetch/common/index";
const { TabPane } = Tabs;
import '../../../styles/resolve';

class Resolve extends Component {
	state = {
		positionDetail : {
			postId: "",//职位ID
			postName:"职位名称",//职位名称
			workingTreatment:"薪资情况",//薪资情况
			education:"学历",//学历
			recruitNum:6,//招聘人数
			workPlace:"工作地点",//工作地点
			orgName:"职位机构名称",//职位机构名称
			recruiterName:"招聘负责人姓名",//招聘负责人姓名
			recruiterPhone:"招聘负责人手机号",//招聘负责人手机号
			recruiterEmail:"招聘负责人邮箱",//招聘负责人邮箱
			publishDate:"发布时间",//发布时间
			expectEntryDate:"期望到岗时间",//期望到岗时间
			workContent:"工作职责",//工作职责
			serviceCondition:"任职资格",//任职资格
			workYears:"职位需要的工作经验"//职位需要的工作经验
		},
		dialogVisible:false,
		defaultApplyType:"1",
		quickMustUpload:false,
		canApplyType:[],
		activeKey:"1"
	}
	
	getPositionDetail = (postId)=>{
		const result = positionDetail({"positionCondition.postId":postId});
		result.then(response => response.json()).then(data => {
			let pd = data.data;
			if(pd.workingTreatment == null){
				pd.workingTreatment = ""
			}
            this.setState({
            	positionDetail:pd
            });
        });
	}
	openDialog(){
		this.setState({
        	dialogVisible:true
        });
	}
	dialogCancel = ()=>{
		this.setState({
        	dialogVisible:false
        });
	}
	goTo=()=>{
		localStorage.setItem("activeKey","3");
		window.location.href = "./recrecord.html#/";
	}
	changeTab=(activeKey)=>{
		this.setState({
			activeKey:activeKey
		})
	}
	componentWillMount(){
		const _this = this;
		const tab = localStorage.getItem('tab')?localStorage.getItem('tab'):"1";
		const u = window.location.href;
		const len = u.split("/").length;
		const id = u.split("/")[len-1];
		let reg = /^[0-9]+.?[0-9]*$/;
		if (reg.test(id)) {
		   this.getPositionDetail(id);
		}
		const result = applyType();
		result.then(response => response.json()).then(data => {
            _this.setState({
            	defaultApplyType:data.data.defaultApplyType,
            	quickMustUpload:data.data.quickMustUpload,
            	canApplyType:data.data.canApplyType==null?[]:data.data.canApplyType
            }, ()=>{
            	if(tab === "1"){
            		if(this.state.canApplyType.indexOf(2)!=-1||this.state.canApplyType.indexOf(3)!=-1){
						_this.setState({
							activeKey:tab
						})
					}else{
						_this.setState({
							activeKey:"2"
						})
					}
            	}else{
            		if(this.state.canApplyType.indexOf(1)!=-1){
						_this.setState({
							activeKey:tab
						})
					}else{
						_this.setState({
							activeKey:"1"
						})
					}
            	}
	        });
        });
	}
	
	render(){
		return (
			<div>
				<PostDetail positionDetail={this.state.positionDetail}></PostDetail>
				<div className="block_frame-position">
					{/*<Tabs defaultActiveKey={(this.state.canApplyType.indexOf(2)!=-1||this.state.canApplyType.indexOf(3)!=-1)?"1":"2"}>*/}
					<Tabs activeKey={this.state.activeKey} onChange={this.changeTab}>
						{
							(this.state.canApplyType.indexOf(2)!=-1||this.state.canApplyType.indexOf(3)!=-1)&&
							<TabPane 
                                tab={
                                    <React.Fragment>
                                        推荐新简历
                                        <p className="tab-bar-line-fixed" style={{backgroundColor: localStorage.themeColor}}></p>
                                    </React.Fragment>
                                }
								key="1">
						    	<TabOne openDialog={()=>{this.openDialog}} canApplyType={this.state.canApplyType} defaultApplyType={this.state.defaultApplyType} quickMustUpload={this.state.quickMustUpload} postId={this.state.positionDetail.postId} postType={this.state.positionDetail.postType}></TabOne>
						    </TabPane>
						}
					    {
					    	this.state.canApplyType.indexOf(1)!=-1&&
					    	<TabPane
					    		tab={
                                    <React.Fragment>
                                        已有简历
                                        <p className="tab-bar-line-fixed" style={{backgroundColor: localStorage.themeColor}}></p>
                                    </React.Fragment>
                                }
					    		key="2">
						    	<TabTwo postId={this.state.positionDetail.postId} openDialog={()=>{this.openDialog}}></TabTwo>
						    </TabPane>
					    }
					</Tabs>
				</div>
				<Modal title="推荐完成" wrapClassName="tab_dialog" width={500} visible={this.state.dialogVisible} onCancel={this.dialogCancel} footer={null} >
		          <div className="logo-success"></div>
		          <p style={{fontSize:"16px",textAlign:"center",marginBottom:"15px"}}>推荐完成 , 您可以后续在系统<a onClick={this.goTo} className="font_link">推荐记录</a>中查看结果</p>
		          <p style={{fontSize:"13px",textAlign:"center"}}>系统也会推送结果消息给到您~~</p>
		        </Modal>
			</div>
		)
	}
}

export default Resolve;