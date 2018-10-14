import React, { Component } from "react";
import moment from 'moment';
import { Icon, Modal, Button, Input, message, Select, Form, Row, Col, Radio, Upload, Divider,DatePicker,Checkbox } from 'antd';
import FileUpload from "../../upload/fileUpload";
import { upload,getQuickResumeTemplate,quickDelivery,quickApply } from "../../../fetch/home/resolve";
import { applyType } from "../../../fetch/common/index";
import {check, hex2Rgba,confirmBox} from '../../../utils/common';
import Cascader from "../../completeresume/cascader";
import { get } from "../../../fetch/get";

import "../styles";

let timer = null;

class QuicklyRecommend extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showOne: "block",
			showTwo: "none",
			resolveReportVisible: false,
			quickFiledsList:[],
			fileList: [{
				uid: -1,
				name: 'xxx.png',
				status: 'done',
				url: 'http://www.baidu.com/xxx.png',
			}],
			fileName: "",
			fileId:0,
			applyLetter:"",
			resumeForm: {},
			applyType:"1",
			defaultApplyType:"1",
			quickMustUpload:false,
			showFinish:false,
			repeatFormFlagQuick:"",
			mustHasApplyLetter:false,
			mustList:[],
			showMustList:[],
			showThis:true,
			errorList:[],
			dataSourceValue:[],
			filterCustomData:[]
		}

	}

	handleChange = (value) => {
		this.setState({
			applyType:value
		})

	}
	handleChangeDate = (date,dateString) => {
		let id = document.getElementById("datePicker_id").innerText;
		this.handleChangeInput(id,dateString);
	}
	handleChangeInput = (param, value,type,name) => {
		const _this = this;
		let flag = check(name,value);
		let data = this.state.resumeForm;
		let list = this.state.mustList;
		let arr = this.state.errorList;
		if(value==""&&type){
			list.push({need:param,name:name});
			data[param] = value;
		}else{
			data[param] = value;
		}
		this.setState({
			resumeForm: data,
			mustList:list
		});
		if(flag){
			arr.splice(arr.indexOf(name), 1);
			document.getElementById(param).style.display = "none";
		}else{
			if(arr.indexOf(name)==-1){
				arr.push(name);
			}
			document.getElementById(param).style.display = "block";
		}
		this.setState({
			errorList:arr
		});
		setTimeout(() => {
			this.setState({
				filterCustomData: []
			});
		}, 300)
	}
	handleChangeText = (value)=>{
		this.setState({
			applyLetter:value
		})
	}
	chargeNeed=()=>{
		let need = [];
		let dom = this.state.resumeForm;
		let arr = this.state.quickFiledsList;
		for(let i = 0;i<arr.length;i++){
			if(arr[i].required){
				if(!dom[arr[i].id]||dom[arr[i].id]==""){
					need.push(arr[i]["name"]);
				}
			}
		}
		if(this.state.quickMustUpload && this.state.fileName==""){
			need.push("附件");
		}
		if(this.state.mustHasApplyLetter && this.state.applyLetter==""){
			need.push("推荐理由");
		}
		if(need.length>0){
			this.setState({
				showMustList:need
			})
			return need;
		}else{
			return false;
		}
	}
	handleSubmit = (e) => {
		const _this = this;
		let flag = this.chargeNeed();
		if(flag){
		    confirmBox({title:'您有必填项未填',content:`${flag[0]} 未填`});
		}else{
			if(JSON.stringify(_this.state.resumeForm) == "{}"){
			    confirmBox({content:"请至少填写一项"});
			}else{
				if(this.state.errorList.length>0){
				    confirmBox({content:`${_this.state.errorList} 格式不正确`});
				}else{
					document.getElementById("btnSubmit").click();
				}
			}
		}
	}
	normFile = (e) => {
		console.log('Upload event:', e);
		if(Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	}

	resolveReportHandleOk = () => {
		this.setState({
			resolveReportVisible: false
		});
	}
	resolveReportHandleCancel = () => {
		this.setState({
			resolveReportVisible: false
		});
	}
	//选择文件按钮点击
	chooseFile = () => {
		document.getElementById("file1").click();
	}
	chooseFileIn = () => {
		
	}
	addOneFile = (e) => {
		let types = ["html", "htm", "pdf", "doc", "docx", "txt", "xls", "xlsx", "mht"];
		let f = e.currentTarget.files[0];
		let arr = this.state.fileList;
		this.setState({
			fileName: f.name
		})
	}
	//上传文件
	submitFunc = (e) => {
		e.preventDefault();
		const _this = this;
		var input = document.querySelector('#file1');
		if(input.files.length > 0){
			var data = new FormData();
			data.append('file1', input.files[0]);
			const result = upload(data);
			result.then(response => response.json())
				.then(data => {
					if(data.state === 200) {
						_this.delivery(data.data);
					} else {
						_this.setState({
							resolveReportVisible: true
						});
					}
				});
		}else{
			this.delivery("");
		}
	}
	createFormData = (data) => {
		console.log(data);
		// 处理文件
		const formAllData = new FormData();
		for(let k in data){
			formAllData.append(k, data[k]);
		}
		return formAllData;
	}
	//快速推荐
	delivery=(param)=>{
		const _this = this;
		let flag = this.state.quickFiledsList.length == this.state.resumeForm.length?0:1;
		let data = {
			"applyCondition.postId":_this.props.postId,
			"applyCondition.quickResumeTempId":param,
			"applyCondition.fromQuick":"1",
			"applyCondition.quickResumeIsFinish":0,
			"applyCondition.quickApplyLetter":_this.state.applyLetter,
			"repeatFormFlagQuick":_this.state.repeatFormFlagQuick
		}
		let dom = Object.assign(data,_this.state.resumeForm);
		const formData = this.createFormData(dom);
		const result = quickDelivery(formData);
		result.then(response => response.json())
		.then(data => {
			const r = quickApply();
			r.then(response => response.json())
			.then(data => {
				_this.setState({
					repeatFormFlagQuick:data.data.repeatFormFlagQuick
				})
			});
			if(data.state === 200) {
				console.log(data.data);
				_this.setState({
					showFinish:true,
					showThis:false
				});
			} else if(data.state === 500){
			    confirmBox({content:data.data});
			}else{
			    confirmBox({content:data.data,onOk:function(){
				    	_this.setState({
							showFinish:true,
							showThis:false
						});
				    },
				    onCancel:function(){
				    	_this.setState({
							showFinish:true,
							showThis:false
						});
				    }});
			}
		});
	}
	
	sendResume(ids, arr) {
		this.props.resolveResume(ids, arr);
	}
	
	getApplyType=()=>{
		const _this = this;
		const result = applyType();
		result.then(response => response.json())
		.then(data => {
			this.setState({
				applyType:data.data.defaultApplyType+"",
				defaultApplyType:data.data.defaultApplyType+"",
				quickMustUpload:data.data.quickMustUpload,
				mustHasApplyLetter:data.data.mustHasApplyLetter
			})
		});
	}
	goTo=()=>{
		localStorage.setItem("activeKey","3");
		window.location.href = "./recrecord.html#/";
	}
	//继续推荐
	continueRec=()=>{
		this.setState({
			showFinish:false,
			showThis:true,
			resumeForm: [],
			mustList:[]
		});
	}
	componentDidMount(){
		const _this = this;
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
		const result1 = getQuickResumeTemplate({postId:postid});
		result1.then(response => response.json())
		.then(data => {
			if(data.state === 200) {
				_this.setState({
					quickFiledsList:data.data.resumeTemplate,
					dataSourceValue:data.data.dataSourceValue
				})
			}
			console.log(data.data);
		});
		this.getApplyType();
		
		const r = quickApply();
		r.then(response => response.json())
		.then(data => {
			_this.setState({
				repeatFormFlagQuick:data.data.repeatFormFlagQuick
			})
		});
	}

	handleDeleteFile = () => {
		var input = document.querySelector('#file1');
		console.log("before file: ", input.value);
		input.value = "";
		console.log("before file: ", input.value);
		this.setState({
			fileName: ""
		})
	}
	resetForm=()=>{
		this.handleDeleteFile();
		this.setState({
			resumeForm:{}
		})
	}
	chooseFileBtn=(id)=>{
		this.refs[id].click();
	}

	// 学校和专业的自动补全
	filterCustomData = (value, type) => {
		clearTimeout(timer);
		if(type == "school"){
			timer = setTimeout(() => {
				get("/dic/schoolJson?q="+ value)
				.then(response => response.json()).then(res => {
					this.setState({
						filterCustomData: res
					})
				})
			}, 1000)
		}else if(type == "subject"){
			timer = setTimeout(() => {
				get("/dic/frontMajorJson?q="+ value)
				.then(response => response.json()).then(res => {
					this.setState({
						filterCustomData: res
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

	render() {
		const {
			getFieldDecorator,
			getFieldsError,
			getFieldError,
			isFieldTouched
		} = this.props.form;
		const _this = this;
		const dataSourceValue = this.state.dataSourceValue;
		function handleOpts(params){
			let arr = [];
			for(let i = 0;i<params.length;i++){
				arr.push({label:params[i].name,value:params[i].value});
			}
			return arr;
		}
		//日期格式转换（moment=> string）
		function chargeDate(param,type){
			if(typeof(param)!="undefined"){
				if(param.trim().length==0){
					return "";
				}else{
					return moment(param, type);
				}
			}else{
				return "";
			}
		}
		return(
			<React.Fragment>
				<div className="tab_inner tab_form" style={{display:this.state.showThis?"block":"none"}}>
					<div className="menu_drop-frame">
						<Select value={this.state.applyType} style={{ width: 130 }} onChange={this.handleChange}>
					      <Select.Option style={{display:this.props.canApplyType.indexOf(3)!=-1?"block":"none"}} value="3">快速推荐简历</Select.Option>
					      <Select.Option style={{display:this.props.canApplyType.indexOf(2)!=-1?"block":"none"}} value="2">上传简历</Select.Option>
					    </Select>
					</div>
					<div className="block_body quick_block" style={{display:this.state.applyType=="3"?"block":"none",width:"1110px",margin:"0 auto",minHeight:"500px"}}>
						{
							this.state.quickFiledsList.map(function(item){
								return (
									<div className="block_item" key={item["tId"]}>
										<div className="ant-form-item-label"><label className={item.required?"ant-form-item-required":""} title={item['name']}>{item['name']}</label></div>
										{
											item.fillType == 1 &&
											<React.Fragment>
												{
													item.customDataSource === "school" || item.customDataSource === "subject"?
													<Select style={{ width: 248 }} showSearch={true} notFoundContent={null}
														filterOption={false} onSearch={(value) => _this.filterCustomData(value, item.customDataSource)}
														onChange={(value,option)=>{_this.handleChangeInput(item.id,value,item.required,item['name'])}}
														onFocus={() => _this.handleFocus(item.customDataSource)}
														value={_this.state.resumeForm[item.id]}>
												        {
												        	_this.state.filterCustomData.map(function(i){
												        		return (
												        			<Select.Option key={i.id} value={i.code}>{i.name}</Select.Option>
												        		)
												        	})
												        }
												    </Select>
													:<Input style={{ width: 248 }} placeholder={item.remark}
														value={_this.state.resumeForm[item.id]}
														onChange={(e)=>{_this.handleChangeInput(item.id,e.target.value,item.required,item['name'])}} />
												}
												<span className="check_text" style={{display:"none"}} id={`${item.id}`}>请输入正确的{item['name']}</span>
											</React.Fragment>
										}
										{
											item.fillType == 2 &&
											<React.Fragment>
												<span id="datePicker_id" style={{display:"none"}}>{item.id}</span>
												<DatePicker style={{ width: 248 }} value={chargeDate(_this.state.resumeForm[item.id],"YYYY-MM-DD")} onChange={(date,dateString)=>{_this.handleChangeInput(item.id,dateString,item.required,item['name'])}} />
												<span className="check_text" style={{display:"none"}} id={`${item.id}`}></span>
											</React.Fragment>
										}
										{
											item.fillType == 3 &&
											<React.Fragment>
												<Radio.Group value={_this.state.resumeForm[item.id]} onChange={(e)=>{_this.handleChangeInput(item.id,e.target.value,item.required,item['name'])}}>
											        {
											        	dataSourceValue[item.dataSource].map((i, index) => {
											        		return <Radio key={index} value={i.code}>{i.name}</Radio>
											        	})
											        }
											    </Radio.Group>
										    	<span className="check_text" style={{display:"none"}} id={`${item.id}`}></span>
										    </React.Fragment>
										}
										{
											item.fillType == 4 &&
											<React.Fragment>
												<Select value={_this.state.resumeForm[item.id]} style={{ width: 248 }} onChange={(value)=>{_this.handleChangeInput(item.id,value,item.required,item['name'])}}>
													{
														dataSourceValue[item.dataSource].map((i, index) => {
											        		return <Select.Option key={index} value={i.code}>{i.name}</Select.Option>
											        	})
													}
											    </Select>
										    	<span className="check_text" style={{display:"none"}} id={`${item.id}`}></span>
										    </React.Fragment>
										}
										{
											item.fillType == 5 &&
											<React.Fragment>
												<Checkbox.Group value={_this.state.resumeForm[item.id]} options={handleOpts(dataSourceValue[item.dataSource])} onChange={(value)=>{_this.handleChangeInput(item.id,value,item.required,item['name'])}} />
												<span className="check_text" style={{display:"none"}} id={`${item.id}`}></span>
											</React.Fragment>
										}
										{
											item.fillType == 6 &&
											<React.Fragment>
												<textarea value={_this.state.resumeForm[item.id]} onChange={(e)=>{_this.handleChangeInput(item.id,e.target.value,item.required,item['name'])}} style={{minWidth:"260px",height:"110px",resize:"none"}} placeholder={item.remark}></textarea>
												<span className="check_text" style={{display:"none"}} id={`${item.id}`}></span>
											</React.Fragment>
										}
										{
											item.fillType == 7 &&
											<React.Fragment>
												<Select value={_this.state.resumeForm[item.id]} style={{ width: 260 }} onChange={(value)=>{_this.handleChangeInput(item.id,value,item.required,item['name'])}}>
													{
														dataSourceValue[item.dataSource].map(function(i){
															return <Select.Option key={i.order} value={i.code}>{i.name}</Select.Option>
														})
													}
												</Select>
												<span className="check_text" style={{display:"none"}} id={`${item.id}`}></span>
											</React.Fragment>
										}
										{
											item.fillType == 8 &&
											<React.Fragment>
												<div className="btn_chooseFile" onClick={()=>_this.chooseFileBtn(`${item.id}`)}>选择文件</div>
  												<span className="choosen">{_this.state.resumeForm[item.id]?'已选文件：'+_this.state.resumeForm[item.id].name:""}</span>
												<input ref={`${item.id}`} style={{display:"none"}} type="file" onChange={(e)=>{_this.handleChangeInput(item.id,e.target.files[0],item.required,item['name'])}} />
												<span className="check_text" style={{display:"none"}} id={`${item.id}`}></span>
											</React.Fragment>
										}
										{
											item.fillType == 9 &&
											<React.Fragment>
												{
													item.customDataSource === "school" || item.customDataSource === "subject"?
													<Select style={{ width: 248 }} showSearch={true} notFoundContent={null}
														filterOption={false} onSearch={(value) => _this.filterCustomData(value, item.customDataSource)}
														onChange={(value,option)=>{_this.handleChangeInput(item.id,value,item.required,item['name'])}}
														onFocus={() => _this.handleFocus(item.customDataSource)}
														value={_this.state.resumeForm[item.id]}>
												        {
												        	_this.state.filterCustomData.map(function(i){
												        		return (
												        			<Select.Option key={i.id} value={i.code}>{i.name}</Select.Option>
												        		)
												        	})
												        }
												    </Select>
													:<Cascader lanType={1} dataSource={dataSourceValue[item.dataSource]}
														opt={_this.state.resumeForm[item.id]||""}
														changeSelect={(value)=>{_this.handleChangeInput(item.id,value,item.required,item['name'])}}></Cascader>
												}
												<span className="check_text" style={{display:"none"}} id={`${item.id}`}></span>
											</React.Fragment>
										}
									</div>
								)
							})
						}
						<br/>
						<div className="ant-form-item-label"><label className={this.state.quickMustUpload?"ant-form-item-required":""}>上传附件</label></div>
						<div className="block_file-frame">
			    			<div className="btn_chooseFile" onClick={_this.chooseFile}>选择文件</div>
							<span className="choosen">{_this.state.fileName?'已选文件：'+_this.state.fileName:''}</span>
							<span style={{display:_this.state.fileName!==""?"inline":"none"}}>
								<Icon type="check-circle" />
								{/*<span className="btn_more"><Icon type="solution" /><span>预览</span></span><Divider type="vertical" />*/}
								<span className="btn_more" onClick={this.handleDeleteFile}><Icon type="delete" /><span>删除</span></span><br/><br/>
							</span>
							<p className="text-red">注：可上传格式为html、htm、pdf、doc、docx、txt、xls、xlsx、mht的文件</p>
			    		</div><br/>
						<Row>
					    	<Col span={24}>
					    		<div className="ant-form-item-label"><label className={this.state.mustHasApplyLetter ? 'ant-form-item-required':'' }>推荐理由</label></div>
					    		<textarea className='text_large' onChange={(e)=>{_this.handleChangeText(e.target.value)}}></textarea>
					    	</Col>
					    </Row>
				    	<form  id="fileForm" action="/wt/runner/hunter/auth/resume/upload" encType="multipart/form-data" method="post">
				    		<input type="file" name="file1" id="file1" onChange={this.addOneFile} style={{display:"none"}}/>
				    		<input type="button" id="btnSubmit" style={{display:"none"}} onClick={this.submitFunc}/>
				    	</form>
				    	<Row>
					    	<Col span={24}>
					    		<div className="block_btn-footer">
					    			<Button className="form_button-cancel"
					    				style={{
					                        border: "1px solid #e5e5e5",
					                        color: localStorage.themeColor
					    				}}
					    				onClick={this.resetForm}>重置</Button>
					    			<Button type="primary" className="form_button-submit"
					    				style={{
					                        borderWidth: 0,
					                        backgroundColor: localStorage.themeColor,
					                        boxShadow: "1px 1px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")
					    				}}
					    				onClick={this.handleSubmit}>立即推荐</Button>
					    		</div>
					    	</Col>
					    </Row>
					</div>
					<div className="block_body" style={{display:this.state.applyType=="2"?"block":"none",paddingTop:"20px"}}>
						<FileUpload cleanList={this.props.cleanList} sendResume={(arr)=>{this.sendResume(arr)}}></FileUpload>
					</div>
				</div>
				<div className="finish_block" style={{display:this.state.showFinish?"block":"none",minHeight:"800px",paddingTop:"50px"}}>
					<div className="logo-success"></div>
		          	<p style={{fontSize:"16px",textAlign:"center",marginBottom:"15px"}}>推荐完成 , 您可以后续在系统<a onClick={this.goTo} className="font_link">推荐记录</a>中查看结果</p>
		          	<p style={{fontSize:"13px",textAlign:"center"}}>系统也会推送结果消息给到您~~</p>
		          	<div className="block_btn-footer">
			          	<Button className="form_button-cancel" onClick={this.goTo}>好的</Button>
			          	<Button className="form_button-submit" onClick={this.continueRec}>继续推荐</Button>
		          	</div>
				</div>
				<Modal title="解析报告" wrapClassName="tab_dialog" width={500} visible={this.state.resolveReportVisible} onOk={this.resolveReportHandleOk} onCancel={this.resolveReportHandleCancel} okText="继续上传" cancelText="关闭" >
		          <div className="textAlign-center" style={{height: "70px",paddingTop:"30px"}}>
		          	<Icon type="exclamation-circle" style={{ fontSize: 18, color: '#FF9421',verticalAlign: "middle" }} />&nbsp;&nbsp;
		          	<span style={{verticalAlign: "middle"}}>抱歉,该简历解析失败</span>
	          	  </div>
		        </Modal>
	        </React.Fragment>
		);
	}
}

QuicklyRecommend = Form.create({})(QuicklyRecommend);
export default QuicklyRecommend;