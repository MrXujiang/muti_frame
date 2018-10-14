import React, { Component } from "react";
import ApplyEdit from "../../applyEdit";
import { Icon, Table, Pagination, Popover, Modal, Button, Input, Spin, message } from 'antd';
import {
	getResumeList,
	editApplyLetter,
	positionDetail,
	analyze,
	delivery
} from "../../../fetch/home/resolve";
import { confirmBox } from "../../../utils/common";

import "../styles";

class AfterResolved extends Component {
	constructor(props) {
		super(props);

		// 设置 initial state
		this.state = {
			resumeTitle: [{
				title: '姓名',
				dataIndex: 'userName',
				render: (text, record, index) => {
					let str = record.canApply ? "该简历已经完整适合投递！" : "该简历不完整无法投递！";
					let hasApply = record.hasApply?"已推荐":"未推荐";
			  		let hasApplyClass = record.hasApply?"has":"hasnot";
					return <div>
				  			<span style={{verticalAlign: "middle"}}>{text}</span>
				  			<div className={`block_hasApply ${hasApplyClass}`}>{hasApply}</div>
				  			<div className="block_canApply">{str}</div>
				  		</div>
				},
			}, {
				title: '性别',
				dataIndex: 'gender',
			}, {
				title: '年龄',
				dataIndex: 'age',
				render: (text, record, index) => {
					return text + "岁";
				},
			}, {
				title: '简历完整度',
				dataIndex: 'finish',
				render: (text, record, index) => {
					let cnStr = "",
						enStr = "",
						cnStrClass = "",
						enStrClass = "";
					cnStr = text.split("-")[0] === "true" ? "完整" : "未完整";
					enStr = text.split("-")[1] === "true" ? "完整" : "未完整";
					cnStrClass = text.split("-")[0] === "true" ? "" : "not-finish";
					enStrClass = text.split("-")[1] === "true" ? "" : "not-finish";
					return <span>
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
					let show = "inline",
						showText = "none"
					let chargeFinish = record.finish.split("-");
					if(!record.canApply){
				  		if(chargeFinish[0]==="false" || chargeFinish[1]==="false"){
					  		return  <span>
					  					<span className="grey_font">简历不完整,无法编辑</span>									
										{record.canUpdate && (<span className="grey_font">|</span>)}
										{record.canUpdate && (<a className="finish_btn"><Icon type="file-text" /><span className={index} onClick={this.openLink}>立即完善</span></a>)}
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
			resumeList: [],
			rowCount: 0,
			rowSize: 10,
			pageCount: 0,
			currentPage: 1,
			confirmVisible: false,
			confirmVisibleEn: false,
			confirmText: "",
			cnUnfinish: [],
			enUnfinish: [],
			selectedRows: [],
			keyWord: "",
			loading: false,
			selectedRowKeys:[]
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.subApply = this.subApply.bind(this);
		this.openLink = this.openLink.bind(this);
	}
	
	//页面跳转-跳至完善简历页面
	openLink=(e)=>{
		const _this = this;
		e.stopPropagation();
		let list = this.props.resumeList[e.target.className];
		let resumeId = this.props.resumeList[e.target.className].resumeId;
		let param = JSON.stringify(list)
		localStorage.setItem('record', param);
		localStorage.setItem('resumeId', resumeId);
		localStorage.setItem('postId', _this.props.postId);
		localStorage.setItem("activeKey","1");
        window.location.href = "./home.html#/completeresume?resumeId="+resumeId;
	}
	paginationOpt = {
		showQuickJumper: true,
		defaultCurrent: 1,
		total: 100,
		onChange: (pageNumber) => {
			this.setState({
				currentPage: pageNumber
			});
			
		}
	}
	onSelectChange = (selectedRowKeys, selectedRows) => {
	    this.setState(prevState =>({
	    	selectedRows:selectedRows,
	    	selectedRowKeys:selectedRowKeys
	    }));
	}
	changeJumperPage = () => {
		const jumperDOM = document.querySelector(".ant-pagination-options-quick-jumper");

		//使用正则进行匹配
		jumperDOM && (jumperDOM.firstChild.data = "跳至");
		jumperDOM && (jumperDOM.lastChild.data = "页");
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
				_this.props.openDialog();
    		 }else{
			    confirmBox({content:data.data});
    		 }
	    });
	}

	//立即推荐按钮
	submitResume = () => {
		let data = [];
		data = this.state.selectedRows
		let cnArr = [],
			enArr = [],
			chooseList = [];
		for(let i = 0; i < data.length; i++) {
			if(data[i].finish.split("-")[0] === "false" && !data[i].canApply) {
				cnArr.push(data[i]);
			}
			if(data[i].finish.split("-")[1] === "false" && !data[i].canApply) {
				enArr.push(data[i]);
			}else{
				chooseList.push(data[i].resumeId);
			}
		}
		if(cnArr.length > 0) {
			this.setState({
				confirmVisible: true
			});
		} else if(enArr.length > 0) {
			this.setState({
				confirmVisibleEn: true
			});
		} else {
			this.doDelivery(this.props.postId,chooseList);
		}
		this.setState({
			cnUnfinish: cnArr,
			enUnfinish: enArr
		});
	}
	//中文简历未完整-确认框-确认按钮
	confirmHandleOk = () => {
		let arr = [] ,brr=[];
		arr = this.state.selectedRows;
		brr = this.state.selectedRowKeys;
		for(let j = 0; j < this.state.cnUnfinish.length; j++) {
			arr.splice(arr.indexOf(this.state.cnUnfinish[j]), 1);
			brr.splice(brr.indexOf(this.state.cnUnfinish[j]), 1);
		}
		if(this.state.enUnfinish.length > 0) {
			this.setState({
				confirmVisible: false,
				selectedRows: arr,
				selectedRowKeys:brr,
				confirmVisibleEn: true
			});
		} else {
			this.setState({
				confirmVisible: false,
				selectedRowKeys:brr,
				selectedRows: arr
			}, () => {
//				this.props.openDialog();
			});
		}
	}
	//英文简历未完整-确认框-确认按钮
	confirmHandleOkEn = () => {
		let arr = [],brr=[];
		arr = this.state.selectedRows;
		brr = this.state.selectedRowKeys;
		for(let j = 0; j < this.state.enUnfinish.length; j++) {
			arr.splice(arr.indexOf(this.state.enUnfinish[j]), 1);
			brr.splice(brr.indexOf(this.state.enUnfinish[j]), 1);
		}
		this.setState({
			confirmVisibleEn: false,
			selectedRowKeys:brr,
			selectedRows: arr
		}, () => {
//			this.props.openDialog();
		});
	}
	//中文简历未完整-确认框-取消按钮
	confirmHandleCancel = (e) => {
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
	confirmHandleCancelEn = (e) => {
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

	tableEmpty = () => {
		let emptyHtml = `<img src=""/><br/>
						 <p class="empty_text"><span>暂无简历,去“<a class="font_link">推荐新简历</a>”开始推荐吧!</span></p>
						`
		document.getElementsByClassName("ant-table-placeholder")[0].innerHTML = emptyHtml;
	}

	subApply(resumeId, text) {
		const result = editApplyLetter({
			"letterCondition.postId": this.props.postId,
			"letterCondition.resumeId": resumeId,
			"letterCondition.applyLetter": text
		});
		result
			.then(response => response.json())
			.then(data => {
				if(data.state === 200) {
					confirmBox({content:data.data});
				} else {
					confirmBox({content:data.data});
				}
			});

	}
	componentWillReceiveProps(nextProps) {
		this.paginationOpt.total = nextProps.total;
	}

	componentDidMount() {
		let h = document.documentElement.clientHeight;
		document.getElementsByClassName("afterTable")[0].style.minHeight = h-171-69+"px";
	}

	render() {
		const { selectedRowKeys} = this.state;
		let rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange
		}
		return(
			<div className="tab_inner afterTable">
	    		<div className="title_tip">
	    			<Icon type="exclamation-circle-o" style={{fontSize: 25, color: '#EC2222' }} />
	    			<span> 请先【完善好简历】【填写完评语】之后进行推荐哦~~</span>
	    		</div>
	    		<a className="recommend_btn" onClick={this.submitResume}>立刻推荐</a><br/>
	    		<Table loading={this.props.loading} rowKey="resumeId" pagination={this.paginationOpt} rowSelection={rowSelection} columns={this.state.resumeTitle} dataSource={this.props.resumeList} />
	    		<Modal title="提醒" wrapClassName="tab_dialog" width={500} visible={this.state.confirmVisible} onOk={this.confirmHandleOk} onCancel={this.confirmHandleCancel} okText="是,跳过" cancelText="否,去完善" >
		          <p>如下候选人中文简历未完整不能投递,是否确认直接跳过!</p>
		          <ul className="unfinish_name">
		          {
		          	this.state.cnUnfinish.map(function(item){
		          		return <li key={item.resumeId}>{item.userName}</li>
		          	})
		          }
		          </ul>
		        </Modal>
				<Modal title="提醒" wrapClassName="tab_dialog" visible={this.state.confirmVisibleEn} width={500} onOk={this.confirmHandleOkEn} onCancel={this.confirmHandleCancelEn} okText="是,跳过" cancelText="否,去完善" >
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

export default AfterResolved;