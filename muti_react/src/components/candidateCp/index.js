import React, { Component } from "react";
import { Select, Input, Tag, Popover, Pagination, Icon, Spin } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import ReplyRemark from "./replyRemark";
import CandidateItem from "./candidateItem";
import { getRecord, getPosList,recordNum,getRemark,addRemark } from "../../fetch/candidate/index"
import { hex2Rgba } from '../../utils/common';

import "./styles";
import moreIcon from "../../images/icons/moremes-icon.png";
import replayIcon from "../../images/icons/reply_icon.png";

class CandidateCp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recordList: [{
				"age": 15,
				"applyDate": "",
				"applyDetailStatus": "",
				"applyId": 0,
				"applyResumeId": 122504,
				"annulusName":"",
				"applyStatus": "",
				"assessStatus": 0,
				"assessment": false,
				"changeApplyStatusDate": "",
				"doubtAgentRepeatFlg": true,
				"doubtAgentRepeatType": -1,
				"doubtAgentRepeatYesFlg": false,
				"education": "",
				"gender": "",
				"headRemarkSize": "",
				"hrRemarkNum": 0,
				"intApplyStatus": "",
				"isReceptByHeadHunter": "",
				"isShowApplyStatus": true,
				"livingPlace": "",
				"name": "",
				"postId": 116902,
				"postName": "",
				"recruitType": 4,
				"recruitTypeName": "",
				"recruitTypeNameEn": "",
				"remarkInfos": {},
				"remarkType": "",
				"repeatApplyMessage": "",
				"resumeName": "",
				"showApplyStatus": true,
				"status": 0,
				"userName": "",
				"webApplyId": 0,
				"webResumeId": 0,
				"wishNum": "",
				"workPlace": "",
				"workPlaceCode": "0\/4\/10\/11",
				"workYears": ""
			}],
			classList:[],
			inputValue: "",
			handleTimeStatus: 0,
			handleUpdateTimeStatus: 0,
			postList: [],
			postValue: 0,
			postName: "",
			defaultPost: "",
			currentPage: 1,
			classNow: 0,
			postIdNow:0,
			postNameNow:0,
			annulusIdNow:0,
			postId:0,
			loading:false,
			chooseTimeNow:"handleTimeStatus",
			rowCount:0,
			chooseNow:"handleTimeStatus",
		}
	}
	//查询输入框更新
	searchChange = (event) => {
		this.setState({
			inputValue: event.target.value
		})
	}
	//查询
	searchResume = (value) => {
		const _this = this;
		this.getRecordList(_this.state.postValue, value, _this.state.classNow, _this.props.states.handleTimeStatus, _this.props.states.handleUpdateTimeStatus, 15, 1,_this.state.chooseNow);
	}
	//下拉选项
	handleChange = (value, option) => {
		const _this = this;
		console.log(value);
		this.setState({
			postValue: value,
			postName: option.props.children,
			inputValue:""
		}, () => {
			_this.getRecordNum(value,"");
//			this.getRecordList(value, _this.state.inputValue, _this.state.classNow, _this.state.handleTimeStatus, _this.state.handleUpdateTimeStatus, 15, _this.state.currentPage);
		})
	}
	//排序方式
	handleTime = (name, handleTimeStatus) => {
		handleTimeStatus++;
		const _this = this;
		if(handleTimeStatus > 1) {
			handleTimeStatus = 0;
		}
		this.setState({
			[name]: handleTimeStatus,
			chooseTimeNow:name,
			inputValue:"",
			chooseNow:name
		}, () => {
			_this.getRecordList(_this.state.postValue, _this.state.inputValue, _this.state.classNow, _this.state.handleTimeStatus, _this.state.handleUpdateTimeStatus, 15, 1,_this.state.chooseNow);
		});
	}
	//获取候选人列表
	getRecordList = (postId, candName, annulusId, applyDateOrder, changeStatusOrder, rowSize, currentPage,chooseNow) => {
		const _this = this;
		let param = {};
		if(chooseNow==="handleTimeStatus"){
			param = {
				"candCondition.postId": postId,
				"candCondition.candName": candName,
				"candCondition.annulusId": annulusId,
				"candCondition.applyDateOrder": applyDateOrder,
				"pageCondition.rowSize": rowSize,
				"pageCondition.currentPage": currentPage
			};
		}else{
			param = {
				"candCondition.postId": postId,
				"candCondition.candName": candName,
				"candCondition.annulusId": annulusId,
				"candCondition.changeStatusOrder": changeStatusOrder,
				"pageCondition.rowSize": rowSize,
				"pageCondition.currentPage": currentPage
			};
		}
		this.setState({
			loading:true
		},()=>{
			const result = getRecord(param);
			result.then(response => response.json())
			.then(data => {
				_this.setState({
					loading:false
				});
				if(data.state === 200) {
					if(data.data.rowList != null) {
						_this.setState({
							recordList: data.data.rowList,
							rowCount:data.data.rowCount
						})
					}
				}
			});
		})
	}
	//获取职位列表
	getPost = (id,name,annulusId) => {
		const _this = this;
		const result = getPosList({
			"positionCondition.openStatus": 0,
			"positionCondition.keyWord": "",
			"positionCondition.positionName": "",
			"positionCondition.workPlace": "",
			"positionCondition.positionType": "",
			"positionCondition.workType": "",
			"positionCondition.releaseTimeCode": "",
			"positionCondition.salaryType": "",
			"positionCondition.orgCode": "",
			"pageCondition.rowSize": 1000,
			"pageCondition.currentPage": 1
		});
		result.then(response => response.json())
		.then(data => {
			if(data.state === 200) {
				if(data.data.length > 0) {
					_this.setState({
						postList: data.data,
						postValue: id==""?0:id,
						defaultPost: name==""?"全部职位":name
					})
				}
			}
		});
		let pv = id || this.state.postValue;
		this.getRecordNum(pv, annulusId);
	}
	//应聘纪录大环节数据
	getRecordNum = (id,annulusId) => {
		const _this = this;
		const result = recordNum({postId:id});
		let iid = id==0?"":id;
		result.then(response => response.json())
			.then(data => {
				if(data.state === 200) {
					_this.setState({
						classList:data.data,
						classNow:annulusId==""?data.data[0].annulusId:annulusId
					},()=>{
						_this.getRecordList(iid,"", _this.state.classNow,_this.state.handleTimeStatus,_this.state.handleUpdateTimeStatus, 15, 1,_this.state.chooseNow);
					});
				}
			});
	}
	//分页
	onPageChange = (pageNumber) => {
		const _this = this;
        // 切换页码页面回到顶端
        window.scrollTo(0,0);
		this.setState({
			currentPage: pageNumber
		})
		this.getRecordList(_this.state.postValue, _this.state.inputValue, _this.state.classNow, _this.state.handleTimeStatus, _this.state.handleUpdateTimeStatus, 15, pageNumber,_this.state.chooseNow);
	}
	//大环节点击更改
	handleClass = (value) => {
		const _this = this;
		this.setState({
			classNow: value,
			inputValue:"",
			currentPage: 1
		},()=>{
			_this.getRecordList(_this.state.postValue, _this.state.inputValue, value, _this.state.handleTimeStatus,_this.state.handleUpdateTimeStatus, 15, 1,_this.state.chooseNow);
		});
	}
	gotoCandidate = (event,applyResumeId,applyId,postId)=>{
		this.props.handleCandidate(event,applyResumeId,applyId,postId);
	}
	changeJumperPage = () => {
        const jumperDOM = document.querySelector(".ant-pagination-options-quick-jumper");

        //使用正则进行匹配
        jumperDOM && (jumperDOM.firstChild.data = "跳至");
        jumperDOM && (jumperDOM.lastChild.data = "页");
    }
	componentDidUpdate() {
		this.changeJumperPage();
	}
	componentDidMount() {
		const _this = this;
		this.changeJumperPage();
		let urlPath,postId,postName,annulusId;
		if(window.location.href.split("?").length>1){
			urlPath = window.location.href.split("?")[1].split("&");
			postId = parseInt(urlPath[0].split("=")[1]);
			postName = urlPath[1].split("=")[1];
			annulusId = parseInt(urlPath[2].split("=")[1]);
		}else{
			postId = "";
			postName = "";
			annulusId = "";
		}
		this.setState({
			postId:postId,
			classNow:annulusId=="00"?"":annulusId
		})
		this.getPost(postId,postName,annulusId);
		document.addEventListener("click", this.closeAll, false);
	}
	
	itemRender = (current, type, originalElement) => {
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
    }

	closeAll=(e)=>{
		const replyBoxs = document.querySelectorAll(".reply-box");
		for(let i=0;i<replyBoxs.length;i++){
			replyBoxs[i].style.display = "none";
		}
	}

	render() {
		const Option = Select.Option;
		const _this = this;

		return(
			<div className="candidate-box clearfix">
	            <div className="candidate-left-box"> 
	                <Select 
	                    value={this.state.postValue} 
	                    title={this.state.postName} 
	                    style={{ 
	                        width: 172,
	                        height: 36,
	                        borderRadius: 0
	                    }} 
	                    onChange={ this.handleChange }
	                >
	                	<Option value={0} title="全部职位">全部职位</Option>
		                {
		                	this.state.postList.map(function(item){
		                		return <Option key={item.postId} value={item.postId} title={item.postName}>{item.postName}</Option>
		                	})
		                }
	                </Select>
	                <ul className="classify">
	                {
	                	this.state.classList.map(function(item){
	                		return (
	                			<li key={item.annulusId} className={_this.state.classNow===item.annulusId?"li-sel":""}
	                				style={{
	                					borderLeftColor:_this.state.classNow===item.annulusId?localStorage.themeColor:"#18BAE2",
	                					backgroundColor: _this.state.classNow===item.annulusId?hex2Rgba(localStorage.themeColor, 0.05):""
	                				}}
	                				onClick={()=>_this.handleClass(item.annulusId)}>
	                        		<span style={{color:_this.state.classNow===item.annulusId?localStorage.themeColor:"#666666"}} title={item.name} className="annulus_name">{item.name}</span>
	                        		<span style={{backgroundColor: _this.state.classNow===item.annulusId?localStorage.themeColor:""}} 
	                        			className={`num ${_this.state.classNow===item.annulusId?"num-sel":""}`}>{item.annulusNum}</span>
	                    		</li>
	                		)
	                	})	
	                }
	                </ul>
	            </div>
	            <div className="candidate-right-box">
	                <div className="candidate-title clearfix">
	                    <Input.Search
	                        placeholder="输入姓名"
	                        onSearch={this.searchResume}
	                        value={this.state.inputValue}
	                        onChange={this.searchChange}
	                        style={{
	                            float: "left",
	                            width: 275,
	                            height: 36,
	                            border: "1px solid #d9d9d9"
	                        }}
	                    />
	                    <ul className="select-time-box">
	                        <li 
	                            className={`${this.state.chooseTimeNow == "handleTimeStatus" ?"choose_li-time":""} 
	                            	${this.state.handleTimeStatus == 0 ? "bottom-li":"top-li"}
	                            `
	                            }
	                            onClick={ () => this.handleTime("handleTimeStatus", this.state.handleTimeStatus) }
	                        >
	                            发布时间
	                        </li>
	                        <li 
	                            className={`${this.state.chooseTimeNow == "handleUpdateTimeStatus" ?"choose_li-time":""} 
	                            	${this.state.handleUpdateTimeStatus == 0 ? "time-li bottom-li":"time-li top-li"}`
	                            }
	                            onClick={() => this.handleTime("handleUpdateTimeStatus", this.state.handleUpdateTimeStatus)}
	                        >
	                            状态更新时间
	                        </li>    
	                    </ul>
	                </div>
	                {
	                	this.state.loading?
	                	<Spin 
	                        tip="Loading..."
	                        size="large"
                        	indicator={<Icon type="loading" style={{color: localStorage.themeColor}} />}
                			style={{color: localStorage.themeColor}}
	                    />:
	                	<div className="candidate-content">
		                	{
		                		this.state.recordList.length>0?
		                		<React.Fragment>
		                			{	
				                		this.state.recordList.map((item,index) => {
					                		return (
					                			<CandidateItem closeAll={this.closeAll}
					                				key={item.webApplyId} data={item}
					                				handleCandidate={this.gotoCandidate}></CandidateItem>
					                		)
					                	})
				                	}
		                			<div style={{textAlign:"center"}}>
				                		{this.state.rowCount>15?<Pagination pageSize={15} showQuickJumper
				                			current={this.state.currentPage} itemRender={this.itemRender}
				                			total={this.state.rowCount} onChange={this.onPageChange} />:null}
				                	</div>
		                		</React.Fragment>:
		                		<div className="finish_block">
		                        	<div className="logo-empty"></div><br/>
							 		<p className="empty_text">抱歉!没有搜索到相关数据!</p>
		                        </div>
		                	}
		                </div>
	                }
	            </div>
	        </div>
		)
	}
}

export default CandidateCp;