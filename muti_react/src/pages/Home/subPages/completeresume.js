import React, { Component } from "react";
import AnchorWrap from "../../../components/completeresume/anchor";
import ResumeItem from "../../../components/completeresume/resumeItem";
import { Row, Col, Select, Icon, Input, Radio, Affix, Modal, Spin, Button } from 'antd';
import {
    getResumeTemplate,
    getResume,
    editResume,
    exitStep,
    editAndRecommand,
    editEnglish,
    editCond,
    getCustomDataSource
} from "../../../fetch/home/complete";
import {check, hex2Rgba, confirmBox} from '../../../utils/common';
import { get } from "../../../fetch/get";

import '../../../styles/completeresume';

let timer = null;

class Completeresume extends Component {
	state = {
		defaultResume:"1",
		showapplyLetter:"block",
		showbasicInfo:"block",
		showselfEvaluation:"block",
		showintention:"block",
		showwork:"block",
		showedu:"block",
		showlanguage:"block",
		tooltipShow:true,
		showBlock:{},
		resumeId:0,
		resumeTemplate:[],
		dataSourceValue:[],
		resumeData:[],
		fullTemplate:[],
		formData:{},
		lanType:"1",
		finish:false,
		checkFail:[],
		showBtn:true,
		finishFlag:false,
		isLoading:false,
		editEnglish:false,
		applyMust:false,
		applyLetter:"",
		isExistNextStep:false,
		schoolVisible:false,
		schoolArea:[],
		schoolList:[],
		schoolDataDom:{},
		schoolSourceId:"",
		areaNow:"",
		schoolId:"",
		schoolValue:"",
		schoolName:"",
		canAddSchool: "",
		isNeedRequired:true,
		schoolData:{},
		modalLoading:false,
        blockAnchorHeight: window.innerHeight - (69 + 60 + 32 ),
        footerBtnRight: (window.innerWidth - 1200)/2 + 30,
        buttonArray:[],
        subjectArea: [],
        subjectList: [],
        subjectVisible: false,
        subjectDataDom: {},
		subjectAreaNow:"",
		subjectData: [],
		showCustomAddSchool: false,
		filterCustomData: []
	}
	//学校自定义添加
	showCustomAddSchool = () => {
		this.setState({
			schoolId:"",
			schoolValue:"",
			schoolName:"",
			showCustomAddSchool: true
		})
	}
	handleCustomAddSchoolChange = (id, e) => {
		const customSchoolName = e.target.value;
		this.setState({
			schoolId: id,
			schoolValue: customSchoolName,
			schoolName: customSchoolName,
		})
	}
	//简历语言select切换
	handleChangeLan = (value,option)=>{
		this.setState({
			lanType:value,
			finish: false
		},()=>{
			this.getResumeTemp(parseInt(value));
		})
	}
	
	//下拉展开收缩
	showMore = (name, type) => {
		let flag = type||"block";
		let data = this.state.showBlock;
		data[name] = (flag=="block"?"none":"block");
		this.setState({
			showBlock:data
		});
	}
	
	//更改交互数据
	handleChangeParam=(id,value,type,domId, option)=>{
		let flag = check(type,value);
		let dom = this.state.formData;
		if(Array.isArray(value)){
			dom[id] = value.join(";");
		}else if(typeof value === "string" && value.indexOf("+")>=0){
			value = value.split("+");
			dom[id] = value[0];
			dom[id +"_text"] = value[1] || undefined;
		}else if(option){
			dom[id] = value;
			dom[id +"_text"] = option.props.children || undefined;
		}else{
			dom[id] = value;
		}
		if(flag){
			document.getElementById(domId).style.display = "none";
			this.setState({
				formData:dom,
				filterCustomData: []
			},()=>{
				let arr = this.state.checkFail;//校验失败
				if(this.state.checkFail.indexOf(domId)>-1){
					arr.splice(this.state.checkFail.indexOf(domId), 1);
					this.setState({
						checkFail:arr
					});
				}
			});
		}else{
			this.setState({
				formData:dom,
				filterCustomData: []
			});
			let arr = this.state.checkFail;
			if(this.state.checkFail.indexOf(domId)===-1){
				arr.push(domId);
				this.setState({
					checkFail:arr
				});
			}
			document.getElementById(domId).style.display = "inline";
		}
	}
	handleChangeApply=(value)=>{
		let dom = this.state.formData;
		dom.applyLetter = value;
		this.setState({
			formData:dom,
			applyLetter:value
		});
	}

	//获取模板
	getResumeTemp=(lanType, rId)=>{
		this.setState({
			isLoading:true
		});
		let resumeId = rId || this.state.resumeId;
		const result = getResumeTemplate({
			lanType:lanType,
			resumeId:resumeId
		});
		result.then(response => response.json())
		.then(data => {
			this.setState({
				resumeTemplate:data.data.resumeTemplate,//模板数据
				dataSourceValue:data.data.dataSourceValue,//简历数据
				applyMust:data.data.mustHasApplyLetter,//推荐记录是否必填
				isExistNextStep:data.data.isExistNextStep,
				isNeedRequired:data.data.isNeedRequired,
				buttonArray:data.data.buttonArray?data.data.buttonArray:[1,2,3,4]
			})
			//获取简历数据
			this.getResumeData(resumeId, data.data.resumeTemplate, parseInt(lanType));
		});
	}

	//获取简历数据
	getResumeData=(resumeId, temp, lanType)=>{
		let pi = localStorage.getItem("postId");
		const result = getResume({
			lanType:lanType,
			resumeId:resumeId,
			postId:pi
		});
		result.then(response => response.json())
		.then(data => {
			this.setState({
				isLoading:false,
				resumeData:data.data.infoSetList,
				applyLetter:data.data.applyLetter
			})
			this.changeResumeData(data.data.infoSetList);//简历数据转换为map
			this.transTemplate(data.data.infoSetList,temp);//模板包装
		});
	}
	//将简历数据转换为map形式
	changeResumeData=(param)=>{
		let dom = this.state.formData;
		for(let i = 0;i<param.length;i++){
			for(let t = 0;t<param[i].recordList.length;t++){
				for(let j = 0;j<param[i].recordList[t].infoItemList.length;j++){
					//将id分层级组合 作为key
					var columnItem = param[i].recordList[t].infoItemList[j];
					var columnIndex = `${param[i].id}_${param[i].recordList[t].infoItemList[j].id}_${t+1}`;
					if(typeof(columnItem.value)!="undefined"){
						dom[columnIndex] = columnItem.value;
						if(columnItem.value != columnItem.valueText){
							dom[columnIndex + "_text"] = columnItem.valueText;
						}
					}
				}
			}
		}
		this.setState({
			formData:dom,
			finish:true
		},()=>{
		 	console.log("formData: ", this.state.lanType, dom);
		})
	}
	//包装模板数据格式
	transTemplate=(infoList, template)=>{
		let arr = [] , temp = template;
		const tt = template;
		for(let m = 0;m<template.length;m++){
			let arry = [];
			//将模板中各模块的infoItemList包装成二维数组（便于分层级组合各输入内容的id值）
			if(!(temp[m].infoItemList[0] instanceof Array)){
				let a = temp[m].infoItemList;
				arry[0]=new Array();
				arry[0] = [];
				arry[1] = a;
				temp[m].infoItemList = arry;
			}
		}
		// for(let i = 0;i<infoList.length;i++){
		// 	for(let j = 0;j<template.length;j++){
		// 		if(infoList[i].id === template[j].id){//简历数据与模板id一致
		// 			arr = [];
		// 			if(infoList[i].recordList.length>1){
		// 				arr[0]=new Array();
		// 				arr[0] = [];
		// 				//将简历数据组合到模板中用于渲染
		// 				for(let t = 0;t<infoList[i].recordList.length;t++){
		// 					arr.push(tt[j].infoItemList[1]);
		// 				}
		// 				temp[j].infoItemList = arr;
		// 			}
		// 		}
		// 	}
		// }
		this.setState({
			resumeTemplate:temp
		},()=>{
			window.scrollTo(0,0);
		})
	}
	//新增记录
	addItem=(id)=>{
		let template = this.state.resumeTemplate;
		for(let m = 0;m<template.length;m++){
			let arry = [];
			if(id === template[m].id){
				let a = template[m].infoItemList[1];//复制infoItemList中的一份模块添加到infoItemList中
				template[m].infoItemList.push(a);
			}
		}
		this.setState({
			resumeTemplate:template
		});
	}
	//删除记录
    removeItem=(id,index)=>{
		var removeId = '';
        let formData = JSON.parse(JSON.stringify(this.state.formData));
        let template = JSON.parse(JSON.stringify(this.state.resumeTemplate));
		for(let m = 0;m < template.length;m++){
    		if(id === template[m].id){
                removeId = m;
                for(let n = 0;n < template[m].infoItemList.length;n++) {
                    if(n >= index) {
                    	for(let o = 0; o < template[m].infoItemList[n].length;o++) {
                    		if(template[m].infoItemList[n][o].customDataSource === "school" || template[m].infoItemList[n][o].customDataSource === "subject") {
                                formData[`${id}_${template[m].infoItemList[n][o].id}_${n}_text`] = formData[`${id}_${template[m].infoItemList[n][o].id}_${n+1}_text`];
							} else {
                                formData[`${id}_${template[m].infoItemList[n][o].id}_${n}`] = formData[`${id}_${template[m].infoItemList[n][o].id}_${n+1}`];
                            }

                            if(n == template[m].infoItemList.length - 1) {
                                if(template[m].infoItemList[n][o].customDataSource === "school" || template[m].infoItemList[n][o].customDataSource === "subject") {
                                    delete formData[`${id}_${template[m].infoItemList[n][o].id}_${n}_text`];
                                } else {
                                    delete formData[`${id}_${template[m].infoItemList[n][o].id}_${n}`];
                                }
							}
						}
                    }
				}
			}
		}
		template[removeId].infoItemList.splice(index,1);
        this.setState({
            formData: formData,
            resumeTemplate: template
        });
	}
	packageData=()=>{
		let temp = this.state.resumeTemplate;
		let dataAll = this.state.formData;
		for(let n = 0;n<this.state.checkFail.length;n++){
			delete(dataAll[n]);
		}
		for(let i = 0;i<temp.length;i++){
			for(let t = 1;t<temp[i].infoItemList.length;t++){
				dataAll[`${temp[i].id}_${t}_status`] = "0";
				dataAll[`${temp[i].id}_${t}_valid_status`] = "0";
			}
		}
		for(let j = 0;j<this.state.resumeData.length;j++){
			for(let m = 0;m<this.state.resumeData[j].recordList.length;m++){
				dataAll[`${this.state.resumeData[j].id}_${m+1}_f_id`] = this.state.resumeData[j].recordList[m].recordId;
			}
		}
		dataAll["resumeId"] = this.state.resumeId;
		dataAll["lanType"] = parseInt(this.state.lanType);
		return dataAll;
	}

	createFormData = (data) => {
		// 处理文件
		const formAllData = new FormData();
		for(let k in data){
			formAllData.append(k, data[k]);
		}
		return formAllData;
	}
	
	//暂存
	saveEdit=()=>{
		const _this = this;
		let dataAll = this.packageData();
		let flag = this.checkEmpty(dataAll, true);
		let pi = localStorage.getItem("postId");
		dataAll["postId"] = pi;
		dataAll["applyLetter"] = this.state.applyLetter;
		const formData = this.createFormData(dataAll);

		if(flag) {
			const result = editResume(formData);
			result.then(response => response.json())
			.then(data => {
				if(data.status === 403){
					localStorage.setItem("activeKey","1");
					window.location.href = "./home.html#/";
				}else{
					confirmBox({title:data.msg,content:data.content,onOk(){
						localStorage.setItem('tab',"2");
				    	_this.props.history.push("resolve/"+ pi);
					},onCancel(){
				    	localStorage.setItem('tab',"2");
				    	_this.props.history.push("resolve/"+ pi);
				    }});
				}
			});
		}else{
			confirmBox({content:"您有必填项未填", okText:'继续填写', cancelText:'暂存并退出',
				onOk(){},
				onCancel(){
					const result = editResume(formData);
					result.then(response => response.json())
					.then(data => {
						if(data.status === 403){
							localStorage.setItem("activeKey","1");
							window.location.href = "./home.html#/";
						}else{
							confirmBox({title:data.msg,content:data.content,onOk(){
								localStorage.setItem('tab',"2");
						    	_this.props.history.push("resolve/"+ pi);
							},onCancel(){
						    	localStorage.setItem('tab',"2");
						    	_this.props.history.push("resolve/"+ pi);
						    }});
						}
					});
				}
			});
		}
	}
	nextStep=()=>{
		let dataAll = this.packageData();
		let flag = this.checkEmpty(dataAll);
		let pi = localStorage.getItem("postId");
		dataAll["postId"] = pi;
		dataAll["applyLetter"] = this.state.applyLetter;
		const formData = this.createFormData(dataAll);

		if(flag) {
			const result = exitStep(formData);
			result.then(response => response.json())
			.then(data => {
				if(data.data === 0){
				    confirmBox({content:data.content});
				}else if(data.data === 1){
					this.setState({
						lanType:"2",
						showBtn:false,
						formData:{}
					},()=>{
						this.getResumeTemp(2);
					})
				}else{
					this.setState({
						lanType:"1",
						showBtn:false,
						formData:{}
					},()=>{
						this.getResumeTemp(1);
					})
				}
			});
		}
	}
	
	//立即推荐
	editAndSend=()=>{
		const _this = this;
		let dataAll = this.packageData();
		let flag = this.checkEmpty(dataAll);
		let pi = localStorage.getItem("postId");
		dataAll["postId"] = pi;
		dataAll["applyLetter"] = this.state.applyLetter;
		const formData = this.createFormData(dataAll);

		if(flag){
			const result = editAndRecommand(formData);
			result.then(response => response.json())
			.then(data => {
				if(data.status === 403){
					localStorage.setItem("activeKey","1");
					window.location.href = "./home.html#/";
				}else{
				    confirmBox({content:data.content,onOk(){
						if(data.code=="00"){
				    		// window.history.go(-1); 
			    			_this.props.history.push("resolve/"+ localStorage.getItem("postId"));
				    	}
					}});
				}
			});
		}
	}
	
	checkEmpty=(data, hideErr)=>{
		const requiredList = document.querySelectorAll("[formitemrequired]");
		for(let i = 0;i<requiredList.length;i++){
			const requiredItem = requiredList[i],
			requiredItemId = requiredItem.getAttribute("formitemrequired");
			if(data[requiredItemId] == undefined || data[requiredItemId] == "" || data[requiredItemId] == "undefined"){
				requiredItem.querySelector(".empty_error").style.border = "1px solid #ff0000";
				let h = requiredItem.offsetTop;
				if(hideErr){
					window.scrollTo(0, h);
				}else{
					confirmBox({content:"您有必填项未填",onOk(){
						window.scrollTo(0, h);
					}});
				}
				return false;
			}else{
				requiredItem.querySelector(".empty_error").style.border = "";
			}
		}
		return true;
	}
	
	goTo=()=>{
		localStorage.setItem("activeKey","3");
		window.location.href = "./recrecord.html#/";
	}
	getSchool=(itemid,sid,stp)=>{
		if(stp === "school"){
			this.setState({
				schoolVisible:true,
				schoolSourceId:sid
			});
			if(this.state.schoolArea.length===0){
				this.setState({
					modalLoading:true
				});
				get("/auth/resume/getDataSource?dataSource=school&itemId="+ itemid).then(response => response.json()).then(res => {
					let list = res.data.array;
					let areaList = [];
					let dom = {};
					for(let i = 0;i<list.length;i++){
						for(let j = 0;j<list[i].area.length;j++){
							areaList.push(list[i].area[j].name);
							dom[list[i].area[j].name] = {};
							dom[list[i].area[j].name]["school"] = list[i].area[j].school;
							dom[list[i].area[j].name]["id"] = list[i].area[j].id;
						}
					}
					this.setState({
						schoolArea:areaList,
						canAddSchool: res.data.canAddSchool,
						schoolList:dom[areaList[0]].school,
						schoolDataDom:dom,
						areaNow:areaList[0],
						schoolData: res.data.array,
						modalLoading:false
					});
				})
			}
		}else{
			this.setState({
				subjectVisible:true,
				schoolSourceId:sid
			});
			if(this.state.subjectArea.length===0){
				this.setState({
					modalLoading:true
				});
				get("/auth/resume/getDataSource?dataSource=subject&itemId="+ itemid).then(response => response.json()).then(res => {
					let list = res.data;
					let areaList = [];
					let dom = {};
					for(let i = 0;i<list.length;i++){
						for(let j = 0;j<list[i].subject.length;j++){
							var subjectData = list[i].subject[j];
							areaList.push(subjectData.name);
							dom[subjectData.name] = {};
							dom[subjectData.name]["child"] = subjectData.child;
							dom[subjectData.name]["id"] = subjectData.id;
						}
					}
					this.setState({
						subjectArea:areaList,
						subjectList:dom[areaList[0]].child,
						subjectDataDom:dom,
						subjectAreaNow:areaList[0],
						subjectData: res.data,
						modalLoading:false
					});
				})
			}
		}
	}
	schoolOk=()=>{
		this.handleChangeParam(this.state.schoolId,this.state.schoolValue+"+"+this.state.schoolName,this.state.schoolName,this.state.schoolId)
		this.schoolCancel();
	} 
	subjectOk=()=>{
		this.handleChangeParam(this.state.schoolId,this.state.schoolValue+"+"+this.state.schoolName,this.state.schoolName,this.state.schoolId)
		this.subjectCancel();
	} 
	schoolCancel=()=>{
		this.setState({
			schoolVisible:false
		});
	}
	subjectCancel=()=>{
		this.setState({
			subjectVisible:false
		});
	}
	chooseArea=(name)=>{
		let dom = this.state.schoolDataDom;
		this.setState({
			schoolList:dom[name].school,
			areaNow:name
		});
	}
	chooseSubject=(name)=>{
		let dom = this.state.subjectDataDom;
		this.setState({
			subjectList:dom[name].child,
			subjectAreaNow:name
		});
	}
	
	handleChangeSchool=(id, e)=>{
		const target = e.target;
		this.setState({
			schoolId:id,
			schoolValue:target.value,
			schoolName:target.sname,
			showCustomAddSchool: false
		});
	}
	handleChangeSubject=(id, e)=>{
		const target = e.target;
		this.setState({
			schoolId:id,
			schoolValue:target.value,
			schoolName:target.sname,
			showCustomAddSchool: false
		});
	}
	chooseFile=(id)=>{
		document.querySelector(`#file_${id}`).click();
	}

	// 学校和专业的自动补全
	filterCustomData = (value, type) => {
		clearTimeout(timer);
		if(type == "school"){
			timer = setTimeout(() => {
				get("/auth/resume/selectSchool?q="+ value)
				.then(response => response.json()).then(res => {
					this.setState({
						filterCustomData: res
					})
				})
			}, 1000)
		}else if(type == "subject"){
			timer = setTimeout(() => {
				get("/auth/resume/selectMajor?q="+ value)
				.then(response => response.json()).then(res => {
					this.setState({
						filterCustomData: res
					})
				})
			}, 1000)
		}
	}

	// 学校和专业搜索
	searchCustomData = (e) => {
		const target = e.target, flag = target.getAttribute("flag");
		clearTimeout(timer);
		if(flag == "school"){
			timer = setTimeout(() => {
				get("/auth/resume/selectSchool?q="+ target.value)
				.then(response => response.json()).then(res => {
					this.setState({
						schoolArea: [],
						schoolList: res
					})
				})
			}, 1000)
		}else if(flag == "subject"){
			timer = setTimeout(() => {
				get("/auth/resume/selectMajor?q="+ target.value)
				.then(response => response.json()).then(res => {
					this.setState({
						subjectData: [],
						subjectList: res
					})
				})
			}, 1000)
		}
	}

	handleFocus = (type) => {
		if(this.filterCustomData.length == 0){
			this.filterCustomData("", type);
		}
	}

	componentDidMount(){
		let resumeId = window.location.href.split("?")[1].split("=")[1];
		const result = editCond({resumeId:resumeId});
		result.then(response => response.json())
		.then(data => {
			this.setState({
				editEnglish:data.data.canEditEnglishResume,
				lanType:data.data.resumeLanType+"",
				resumeId:resumeId
			})
			//获取模板
			this.getResumeTemp(data.data.resumeLanType, resumeId);
		});
	}

	render(){
		//将模板数据包装（将各模块的infoItemList包装成二维数组）
		let temp = this.state.resumeTemplate;
		let arry = [];
		for(let m = 0;m<temp.length;m++){
			arry = [];
			if(!(temp[m].infoItemList[0] instanceof Array)){
				let a = temp[m].infoItemList;
				arry[0]=new Array();
				arry[0] = [];
				arry[1] = a;
				temp[m].infoItemList = arry;
			}
		}
		return (
			<div className="comp_outer">
				<Row style={{display:this.finishFlag?"none":"block"}}>
			      <Col span={5} style={{paddingRight:"15px"}}>
				    <Affix offsetTop={69}>
				      	<div className="block_left">
				      		<Select value={this.state.lanType} style={{ width: 175 }} onChange={this.handleChangeLan}>
						      <Select.Option value="1">中文简历</Select.Option>
						      {
						      	this.state.editEnglish&&
						      	<Select.Option value="2">英文简历</Select.Option>
						      }
						    </Select>
						    <div className="block_anchor" style={{height: this.state.blockAnchorHeight + "px"}}>
						    	<AnchorWrap resumeTemplate={this.state.resumeTemplate}
						    		isNeedRequired={this.state.isNeedRequired} />
						    </div>
				      	</div>
			      	</Affix>
			      </Col>
			      <Col span={19}>
			      	<div className="block_right">
				      	{
				      		this.state.isLoading?
				      		<Spin tip="Loading..." size="large"
                        		indicator={<Icon type="loading" style={{color: localStorage.themeColor}} />}
				      			style={{color: localStorage.themeColor}} />:
				      		<React.Fragment>
				      			<h1><span>{this.state.lanType=="1"?"推荐评语":"Reviews"}</span><div className="divider"></div></h1>
					      		<div className="main_block-input apply_input">
					      			<div className="whole_block">
										<div className="label"><i style={{visibility:this.state.applyMust?"visible":"hidden"}} className="icon_tip">*</i> <span>{this.state.lanType=="1"?"推荐评语":"Reviews"}</span></div>
								        <textarea ref={this.state.applyMust?"applyLetter":"noNeed"} value={this.state.applyLetter} onChange={(e)=>{this.handleChangeApply(e.target.value)}}></textarea>
										<br/><span></span>
									</div>
					      		</div>
					      		{
					      			temp.map((item, index) => {
					      				return (
					      					<ResumeItem item={item} key={index}
					      						resumeItemId={item.id}
					      						isNeedRequired={this.state.isNeedRequired}
					      						lanType={this.props.lanType}
					      						showMore={this.showMore}
					      						addItem={this.addItem}
												removeItem={this.removeItem}
												filterCustomData={this.filterCustomData}
												handleChangeParam={this.handleChangeParam}
												formData={this.state.formData}
												dataSourceValue={this.state.dataSourceValue}
												customData={this.state.filterCustomData}
												chooseFile={this.chooseFile}
												finish={this.state.finish}
												lanType={this.state.lanType}
												getSchool={this.getSchool}
												handleFocus={this.handleFocus}
					      						showBlock={this.state.showBlock} />
					      				)
					      			})
					      		}
				      		</React.Fragment>
				      	}
			      	</div>
			      </Col>
			    </Row>
			    <div className="footer_btn" style={{right: this.state.footerBtnRight + "px"}}>
			    	<div className="form_button-cancel foot_btn" 
			    		style={{
			    			display:this.state.buttonArray.indexOf(1)!=-1?"inline-block":"none",
			    			color: localStorage.themeColor,
			    			borderColor: "#E5E5E5"
			    		}}
			    		onClick={this.saveEdit}>{this.state.lanType=="1"?"暂存并退出":"Save&Exit"}</div>
			    	<div className="form_button-submit foot_btn" 
			    		style={{
			    			display:this.state.buttonArray.indexOf(4)!=-1?"inline-block":"none",
			    			backgroundColor: localStorage.themeColor,
	                        boxShadow: "1px 1px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")
			    		}}
			    		onClick={this.nextStep}>{this.state.lanType=="1"?"保存并编辑中文简历":"Save&Edit CN-Resume"}</div>
			    	<div className="form_button-submit foot_btn" 
			    		style={{
			    			display:this.state.buttonArray.indexOf(3)!=-1?"inline-block":"none",
			    			backgroundColor: localStorage.themeColor,
	                        boxShadow: "1px 1px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")
			    		}}
			    		onClick={this.nextStep}>{this.state.lanType=="1"?"保存并编辑英文简历":"Save&Edit EN-Resume"}</div>
			    	<div className="form_button-submit foot_btn" 
			    		style={{
			    			display:this.state.buttonArray.indexOf(2)!=-1?"inline-block":"none",
			    			backgroundColor: localStorage.themeColor,
	                        boxShadow: "1px 1px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")
			    		}} 
			    		onClick={this.editAndSend}>{this.state.lanType=="1"?"立即推荐":"Complete"}</div>
		    	</div>
			    <div style={{display:this.finishFlag?"block":"none"}} className="rec-finish tab_dialog">
			    	<div className="logo-success"></div>
		          	<p style={{fontSize:"16px",textAlign:"center",marginBottom:"15px"}}>推荐完成 , 您可以后续在系统<a className="font_link" onClick={this.goTo}>推荐记录</a>中查看结果</p>
		          	<p style={{fontSize:"13px",textAlign:"center"}}>系统也会推送结果消息给到您~~</p>
				</div>
				<Modal visible={this.state.schoolVisible} title="选择学校"
					onCancel={this.schoolCancel}
					footer={[
						<Button key="back" onClick={this.schoolCancel}
						style={{
			    			color: "rgba(0, 0, 0, 0.65)",
			    			borderColor: "#E5E5E5"
			    		}}>取消</Button>,
						<Button key="submit" onClick={this.schoolOk}
						style={{
							color: "#fff",
			    			borderColor: localStorage.themeColor,
			    			backgroundColor: localStorage.themeColor,
	                        boxShadow: "1px 1px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")
			    		}}>确定</Button>
					]}
		        >
				{
					this.state.modalLoading?
		      		<Spin tip="Loading..." size="large"
                        indicator={<Icon type="loading" style={{color: localStorage.themeColor}} />}
		      			style={{color: localStorage.themeColor}} />:
		      		<div>
		      			<div className="custom-search-school">
		          			<Input type="text"
		          				onChange={this.searchCustomData}
		          				flag="school"
		          				suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
	          					placeholder="请输入学校名称" />
	          			</div>
			          	<ul className="school_area">
			          		{
			          			this.state.schoolArea.map((item) => {
			          				return (
			          					<li key={item}
			          						style={{
			          							backgroundColor: this.state.areaNow===item?localStorage.themeColor:"",
			          						}}
			          						className={this.state.areaNow===item?"chooseArea":""} 
			          						onClick={()=>this.chooseArea(item)}>{item}</li>
			          				)
			          			})
			          		}
			          	</ul>
			          	<div className="school_list">
			          		{this.state.schoolList.length>0?
			          			<Radio.Group onChange={(e)=>{this.handleChangeSchool(this.state.schoolSourceId,e)}} value={this.state.schoolValue}>
							        {
							        	this.state.schoolList.map((item) => {
							        		return (
							        			<Radio key={item.id} value={item.code} sname={item.name}>{item.name}</Radio>
							        		)
							        	})
							        }
							    </Radio.Group>:
							    <p>无匹配结果</p>
			          		}
			          	</div>
			          	{
			          		this.state.canAddSchool === 0?<div className="custom-add-school">
			          			<p>没有找到目标院校？
			          				<span onClick={this.showCustomAddSchool}
			          					style={{color: localStorage.themeColor}}>手动添加</span>
			          			</p>
			          			{this.state.showCustomAddSchool?
			          				<Input type="text"
			          					onChange={(e)=>{this.handleCustomAddSchoolChange(this.state.schoolSourceId,e)}}
			          					value={this.state.schoolName}
			          					placeholder="请输入学校名称" />:null}
		          			</div>:null
			          	}
		          	</div>
				}
		        </Modal>
		        <Modal visible={this.state.subjectVisible} title="选择专业"
					onCancel={this.subjectCancel}
					footer={[
						<Button key="back" onClick={this.subjectCancel}
						style={{
			    			color: "rgba(0, 0, 0, 0.65)",
			    			borderColor: "#E5E5E5"
			    		}}>取消</Button>,
						<Button key="submit" onClick={this.subjectOk}
						style={{
							color: "#fff",
			    			borderColor: localStorage.themeColor,
			    			backgroundColor: localStorage.themeColor,
	                        boxShadow: "1px 1px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")
			    		}}>确定</Button>
					]}
		        >
				{
					this.state.modalLoading?
		      		<Spin tip="Loading..." size="large"
                        indicator={<Icon type="loading" style={{color: localStorage.themeColor}} />}
		      			style={{color: localStorage.themeColor}} />:
		      		<div>
		      			<div className="custom-search-school">
		          			<Input type="text"
		          				onChange={this.searchCustomData}
		          				flag="subject"
		          				suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
	          					placeholder="请输入专业名称" />
	          			</div>
		      			{
		      				this.state.subjectData.map((subjectItem) => {
		          				return (
		          					<React.Fragment key={subjectItem.pYin}>
		          						<p>{subjectItem.pYin}</p>
			          					<ul className="school_area">
							          		{
							          			subjectItem.subject.map((item) => {
							          				return (
							          					<li key={item.name}
							          						style={{
							          							backgroundColor: this.state.subjectAreaNow===item.name?localStorage.themeColor:"",
							          						}}
							          						className={this.state.subjectAreaNow===item.name?"chooseArea":""}
							          						onClick={()=>this.chooseSubject(item.name)}>{item.name}</li>
							          				)
							          			})
							          		}
							          	</ul>
						          	</React.Fragment>
		          				)
		          			})
		      			}
			          	<div className="school_list">
			          		{this.state.subjectList.length>0?
			          			<Radio.Group onChange={(e)=>{this.handleChangeSubject(this.state.schoolSourceId,e)}}
				          			value={this.state.schoolValue}>
							        {
							        	this.state.subjectList.map((item) => {
							        		return (
							        			<Radio key={item.id} value={item.code} sname={item.name}>{item.name}</Radio>
							        		)
							        	})
							        }
							    </Radio.Group>:
							    <p>无匹配结果</p>
			          		}
			          	</div>
			          	<div className="custom-add-school">
		          			<p>没有找到目标专业？
		          				<span onClick={this.showCustomAddSchool}
		          					style={{color: localStorage.themeColor}}>手动添加</span>
		          			</p>
		          			{this.state.showCustomAddSchool?
		          				<Input type="text"
		          					onChange={(e)=>{this.handleCustomAddSchoolChange(this.state.schoolSourceId,e)}}
		          					value={this.state.schoolName}
		          					placeholder="请输入专业名称" />:null}
	          			</div>
		          	</div>
				}
		        </Modal>
			</div>
		)
	}
}

export default Completeresume;