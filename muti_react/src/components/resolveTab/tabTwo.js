import React, { Component } from "react";
import ApplyEdit from "../applyEdit";
import { withRouter } from "react-router-dom";
import {Icon,Table , Pagination , Popover , Modal ,Button ,Input ,Spin,message} from 'antd';
import {
    getResumeList,
    editApplyLetter,
    positionDetail,
    delivery
} from "../../fetch/home/resolve";
import {hex2Rgba,confirmBox} from '../../utils/common';

import "./styles";

class TabTwo extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	resumeTitle: [{
			  title: '姓名',
			  dataIndex: 'userName',
			  render: (text, record, index) => {
			  	let str = record.canApply?"该简历已经完整适合投递！":"该简历不完整无法投递！";
			  	let hasApply = record.hasApply?"已推荐":"未推荐";
			  	let hasApplyClass = record.hasApply?"has":"hasnot";
			  	return (
			  		<div>
			  			<span style={{verticalAlign: "middle"}}>{text}</span>
			  			<div className={`block_hasApply ${hasApplyClass}`}
			  				style={{color: localStorage.themeColor}}>{hasApply}</div>
			  			<div className="block_canApply">{str}</div>
			  		</div>
			  	)		
			  },
			}, {
			  title: '上传时间',
			  dataIndex: 'addDate',
			}, {
			  title: '性别',
			  dataIndex: 'gender',
			},{
			  title: '年龄',
			  dataIndex: 'age',
			  render: (text, record, index) => {
			  	return text+"岁";
			  },
			}, {
			  title: '简历完整度',
			  dataIndex: 'finish',
			  render: (text, record, index) => {
			  	let cnStr = "",enStr = "" ,cnStrClass="",enStrClass="";
	        	cnStr = text.split("-")[0]==="true"?"完整":"未完整";
	        	enStr = text.split("-")[1]==="true"?"完整":"未完整";
	        	cnStrClass = text.split("-")[0]==="true"?"":"not-finish";
	        	enStrClass = text.split("-")[1]==="true"?"":"not-finish";
			  	return  <span>
			  				<span style={{display:record.needCnResumeFinish?"inline":"none"}}>中文简历：</span>
			  				<span style={{display:record.needCnResumeFinish?"inline":"none"}} className={cnStrClass}>{cnStr}</span>
			  				<span style={{display:record.needEnResumeFinish?"inline":"none"}} className="en-resume">英文简历：</span>
			  				<span style={{display:record.needEnResumeFinish?"inline":"none"}} className={enStrClass}>{enStr}</span>
		  				</span>;
			  },
			}, {
			  title: '推荐理由',
			  dataIndex: 'applyLetter',
			  render: (text, record, index) => {
			  	let show = "inline" , showText = "none"
			  	let chargeFinish = record.finish.split("-");
				let data = JSON.stringify(record);
			  	if(!record.canApply){
			  		if(chargeFinish[0]==="false" || chargeFinish[1]==="false"){
				  		return  <span>
				  					<span className="grey_font">简历不完整,无法编辑</span>									
									{record.canUpdate && (<span className="grey_font">|</span>)}
									{record.canUpdate && (<a className="finish_btn" style={{color: localStorage.themeColor}}><Icon type="file-text" /><span className={index} onClick={this.openLink}>立即完善</span></a>)}
				  				</span>
				  	}
			  	}
			  	return 	<span>
			  				<ApplyEdit text={text} record={record} 
			  					resumeId={record.resumeId} 
			  					className={index} 
			  					openLink={this.openLink}
			  					subApply={(resumeId,text) => this.subApply(resumeId,text)}></ApplyEdit>
		  				</span>
			  },
			}],
			resumeList:[],
			rowCount:0,
            rowSize:10,
			pageCount:0,
			currentPage:1,
			confirmVisible:false,
			confirmVisibleEn:false,
			confirmText:"",
			cnUnfinish:[],
			enUnfinish:[],
			selectedRows:[],
        	keyWord:"",
        	loading:false,
        	selectedRowKeys:[]
        }
        
        this.openLink = this.openLink.bind(this);
    }
	//页面跳转-跳至完善简历页面
	openLink(e){
		const _this = this;
		e.stopPropagation();
		let resumeId = this.state.resumeList[e.target.className].resumeId;
//		const path = {
//          pathname: "/completeresume?resumeId="+resumeId
//      }
		localStorage.setItem("activeKey","1");
		window.location.href="./home.html#/completeresume?resumeId="+resumeId;
		let list = this.state.resumeList[e.target.className];
		let param = JSON.stringify(list)
		localStorage.setItem('record', param);
		localStorage.setItem('resumeId', resumeId);
		localStorage.setItem('postId', _this.props.postId);
//      this.props.history.push(path);
	}
	//分页-配置项
	paginationOpt = {
		showQuickJumper:true,
		defaultCurrent:1,
		total:0,
		itemRender: (current, type, originalElement) => {
			if (type === 'page' && current === this.state.currentPage) {
	            return (
	                <span style={{
	                    backgroundColor: localStorage.themeColor,
	                }}>{current}</span>
	            )
	        }else if(type === 'page'){
	            return <a style={{color: "rgba(0, 0, 0, 0.65)"}}>{current}</a>
	        }
	        return originalElement;
		},
		onChange:(pageNumber)=>{
			this.setState({
				currentPage:pageNumber
			});
			this.resumeList(pageNumber,this.state.keyWord);
		}
	}
	onSelectChange = (selectedRowKeys, selectedRows) => {
	    this.setState(prevState =>({
	    	selectedRows:selectedRows,
	    	selectedRowKeys:selectedRowKeys
	    }));
	}
	changeJumperPage = () => {
		let index = document.getElementsByClassName("ant-pagination-options-quick-jumper").length - 1;
        document.getElementsByClassName("ant-pagination-options-quick-jumper")[index].firstChild.data = "跳至";
        document.getElementsByClassName("ant-pagination-options-quick-jumper")[index].lastChild.data = "页";
    }
	
	changeInput = (value)=>{
		this.setState({
			keyWord:value
		});
	}
	//立即推荐按钮
	submitResume = ()=>{
		const _this = this;
		let data = [];
		data = this.state.selectedRows;
		let cnArr = [] , enArr = [] , chooseList = [];
		for(let i = 0;i<data.length;i++ ){
			if(data[i].finish.split("-")[0] === "false" && !data[i].canApply){
				cnArr.push(data[i]);
			}else if(data[i].finish.split("-")[1] === "false" && !data[i].canApply){
				enArr.push(data[i]);
			}else{
				chooseList.push(data[i].resumeId);
			}
		}
		if(cnArr.length > 0){
			this.setState({
		      confirmVisible: true
		    });
		}else if(enArr.length > 0){
			this.setState({
		      confirmVisibleEn: true
		    });
		}else{
			this.doDelivery(_this.props.postId,chooseList);
		}
		this.setState({
	      cnUnfinish:cnArr,
	      enUnfinish:enArr
	    });
	}
	//中文简历未完整-确认框-确认按钮
	confirmHandleOk = ()=>{
		let arr = [] , brr = [];
		arr = this.state.selectedRows;
		brr = this.state.selectedRowKeys;
		for(let j = 0;j<this.state.cnUnfinish.length;j++){
			arr.splice(arr.indexOf(this.state.cnUnfinish[j]),1);
			brr.splice(brr.indexOf(this.state.cnUnfinish[j]),1);
		}
	    if(this.state.enUnfinish.length > 0){
			this.setState({
			  confirmVisible: false,
			  selectedRows:arr,
			  selectedRowKeys:brr,
		      confirmVisibleEn: true
		    });
		}else{
			this.setState({
		      confirmVisible: false,
		      selectedRowKeys:brr,
		      selectedRows:arr
		    },()=>{
		    	this.props.openDialog();
		    });
		}
	}
	//英文简历未完整-确认框-确认按钮
	confirmHandleOkEn = ()=>{
		let arr = [], brr = [];
		arr = this.state.selectedRows;
		brr = this.state.selectedRowKeys;
		for(let j = 0;j<this.state.enUnfinish.length;j++){
			arr.splice(arr.indexOf(this.state.enUnfinish[j]),1);
			brr.splice(brr.indexOf(this.state.enUnfinish[j]),1);
		}
		this.setState({
	      confirmVisibleEn: false,
	      selectedRowKeys:brr,
	      selectedRows:arr
	    },()=>{
	    	this.props.openDialog();
	    });
	}
	//中文简历未完整-确认框-取消按钮
	confirmHandleCancel = (e)=>{
		this.setState({
	      confirmVisible: false
	    });
	    if(e.target.className !== "ant-modal-close-x"){
	    	const _this = this;
		    localStorage.setItem('postId', _this.props.postId);
		    for(let i = 0;i<_this.state.cnUnfinish.length;i++){
		    	localStorage.setItem("activeKey","1");
		    	window.open(`./home.html#/completeresume?resumeId=${_this.state.cnUnfinish[i].resumeId}`);
		    }
	    }
	}
	//英文简历未完整-确认框-取消按钮
	confirmHandleCancelEn = (e)=>{
		this.setState({
	      confirmVisibleEn: false
	    });
	    if(e.target.className !== "ant-modal-close-x"){
		    const _this = this;
		    localStorage.setItem('postId', _this.props.postId);
		    for(let i = 0;i<_this.state.enUnfinish.length;i++){
		    	localStorage.setItem("activeKey","1");
		    	window.open(`./home.html#/completeresume?resumeId=${_this.state.enUnfinish[i].resumeId}`);
		    }
	    }
	}
	
	//简历推荐
	doDelivery = (postId,chooseList)=>{
		const _this = this;
		const result = delivery({
			"applyCondition.postId":postId,
			"applyCondition.resumeIdList":chooseList
		});
		result.then(response => response.json())
	    .then(data => {
    		 if(data.state === 200){
			    confirmBox({content:data.data,onOk:function(){
									_this.resumeList(_this.state.currentPage,"");
							    	_this.setState({
							    		selectedRows:[],
							    		selectedRowKeys:[]
							    	})
								}
							});
    		 }else{
			    confirmBox({content:data.data});
    		 }
	    });
	}
	
	//简历列表
	resumeList = (currentPage, keyWord, postId)=>{
		const _this = this;
		this.setState({
			loading:true
		});
		// let pi = postId || this.props.postId;//localStorage.getItem("postId");
		const u = window.location.href;
		const len = u.split("/").length;
		const pi = u.split("/")[len-1];
		let reg = /^[0-9]+.?[0-9]*$/;
		if (!reg.test(pi)) return;
		const result = getResumeList({
			"resumeCondition.postId":pi,
			"resumeCondition.showType":0,
			"resumeCondition.keyWord":keyWord,
			"pageCondition.rowSize":this.state.rowSize,
			"pageCondition.currentPage":currentPage
		});
		result
        .then(response => response.json())
        .then(data => {
            let resumeArr = [] , rowData = data.data.rowList;
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
            this.paginationOpt.total = data.data.rowCount;
            this.setState({
                resumeList:resumeArr,
                pageCount:data.data.pageCount,
                rowCount:data.data.rowCount,
                loading:false
            },()=>{
            	if(resumeArr.length==0){
            		_this.tableEmpty();
            	}
            });
            // this.changeJumperPage();
        });
	}
	//表格无数据时显示内容
	tableEmpty=()=>{
		let emptyHtml = `<div class="logo-empty"></div><br/>
						 <p class="empty_text"><span>暂无简历,
						 去“<a class="font_link" style="color: ${localStorage.themeColor}">推荐新简历</a>”开始推荐吧!</span></p>
						`
		document.getElementsByClassName("ant-table-placeholder")[1].innerHTML = emptyHtml;
	}
	//编辑推荐理由-提交
	subApply(resumeId,text){
		const _this = this;
		const result = editApplyLetter({
			"letterCondition.postId":this.props.postId,
			"letterCondition.resumeId":resumeId,
			"letterCondition.applyLetter":text
		});
		result
        .then(response => response.json())
        .then(data => {
        	if(data.state === 200){
			    confirmBox({content:data.data});
        		_this.resumeList(this.state.currentPage,this.state.keyWord);
        	}else{
			    confirmBox({content:'编辑失败'});
        	}
        });
	}

	// componentWillReceiveProps(nextProps){
	// 	console.log("componentWillReceiveProps: ", nextProps, this.props)
	// 	if(nextProps.postId){
 //        	this.resumeList(1,"",nextProps.postId);
	// 	}
	// }
	componentDidMount() {
		this.resumeList(1,"");
	}
	
	render() {
		const { selectedRowKeys} = this.state;
		let rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange
		}
		return (
			<div className="tab_inner">
	    		<div className="block_search">
	    			<a className="recommend_btn" style={{backgroundColor: localStorage.themeColor,
                        boxShadow: "1px 1px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")}}
	    				onClick={this.submitResume}>立刻推荐</a>
		    		<Input.Search
				      placeholder="输入姓名"
				      onChange={this.changeInput}
				      onSearch={(value) =>{this.resumeList(1,value);}}
				      style={{ width: 275 }}
				    />
	    		</div>
	    		<Table loading={this.state.loading} rowKey="resumeId" pagination={this.paginationOpt} rowSelection={rowSelection} columns={this.state.resumeTitle} dataSource={this.state.resumeList} />
	    		<Modal title="提醒" wrapClassName="tab_dialog" visible={this.state.confirmVisible} onOk={this.confirmHandleOk} onCancel={this.confirmHandleCancel} okText="是,跳过" cancelText="否,去完善" >
		          <p>如下候选人中文简历未完整不能投递,是否确认直接跳过!</p>
		          <ul className="unfinish_name">
		          {
		          	this.state.cnUnfinish.map(function(item){
		          		return <li>{item.userName}</li>
		          	})
		          }
		          </ul>
		        </Modal>
				<Modal title="提醒" wrapClassName="tab_dialog" visible={this.state.confirmVisibleEn} onOk={this.confirmHandleOkEn} onCancel={this.confirmHandleCancelEn} okText="是,跳过" cancelText="否,去完善" >
		          <p>如下候选人英文简历未完整不能投递,是否确认直接跳过!</p>
		          <ul className="unfinish_name">
		          {
		          	this.state.enUnfinish.map(function(item){
		          		return <li key={item.resumeId}>{item.userName}</li>
		          	})
		          }
		          </ul>
		        </Modal>
	    	</div>
		);
	}
}

export default withRouter(TabTwo);