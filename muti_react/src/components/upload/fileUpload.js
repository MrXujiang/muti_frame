import React, { Component } from "react";
import FileItem from "./subpages/fileItem";
import { Icon,Progress,Button,Modal,message  } from 'antd';
import { upload,analyze } from "../../fetch/home/resolve";
import { confirmBox } from "../../utils/common";

import "./styles";

class FileUpload extends Component {
	constructor(props) {
        super(props);
		this.state = {
			fileList:[],
			startUpload:false,
			resolveReportAll:false,
			resolveFailList:[],
			resolveSuccessList:[],
        	resolveNot:[],
			resolvesIds:[],
			submitLock:false
		}
    }
	dragover = (e)=>{
		e.preventDefault();
	}
	drop = (e)=>{
		e.preventDefault();
//		let types = ["html","pdf","doc","txt","xls","zip","rar","jpg","png","jpeg"];
		let f=e.dataTransfer.files;
		let arr = this.state.fileList;
		for(let i = 0;i<f.length;i++){
//			let type = f[i].type.split("/")[1];
//			if(types.indexOf(type)!=-1){
			let num = f[i].size/1024/1024;
			let result = num.toFixed(2);
			if(result<=5){
				arr.push(f[i]);
			}else{
				confirmBox({content:'单个文件大小不超过5M'});
			}
//			}
		}
		this.setState({
			fileList:arr
		})
	}
	//选择单个文件
	addOneFile=(e)=>{
		let f=e.currentTarget.files[0];
		let arr = this.state.fileList;
		let num = f.size/1024/1024;
		let result = num.toFixed(2);
		if(result<=5){
			arr.push(f);
			this.setState({
				fileList:arr
			});
		}else{
			confirmBox({content:'单个文件大小不超过5M'});
		}
	}
	chooseFile=()=>{
		let btn = document.getElementById("fileChoose");
		btn.click();
	}
	//确定按钮
	submitFile=()=>{
		let _this = this;
		if(!this.state.submitLock){
			this.setState({
				submitLock:true
			});
			this.debounce(_this.props.sendResume(_this.state.resolvesIds,_this.state.resolveSuccessList),500);
			setTimeout(() => {
				_this.setState({
					submitLock:false
				})
			}, 3000);
		}
//		_this.props.sendResume(_this.state.resolvesIds,_this.state.resolveSuccessList);
	}
	debounce=(fn, delay)=>{
	  // 维护一个 timer
	  let timer = null;
	
	  return function() {
	    let context = this;
	    let args = arguments;
	
	    clearTimeout(timer);
	    timer = setTimeout(function() {
	      fn.apply(context, args);
	    }, delay);
	  }
	}
	chargeLength=()=>{
		const _this = this;
		let len = this.state.resolveFailList.length + this.state.resolveSuccessList.length + this.state.resolveNot.length;
		if(len === this.state.fileList.length){
			this.setState({
				resolveReportAll:true
			},()=>{
				_this.props.sendResume(_this.state.resolvesIds,_this.state.resolveSuccessList);
			});
		}
	}
	finish=(id,name)=>{
		const _this = this;
		let arr = this.state.resolveSuccessList;
		let arrIds = this.state.resolvesIds;
		arr.push(name);
		arrIds.push(id);
		this.setState({
			resolveSuccessList:arr,
			resolvesIds:arrIds
		},()=>{
//			_this.chargeLength();
		});
	}
	fail=(name)=>{
		const _this = this;
		let arr = this.state.resolveFailList;
		arr.push(name);
		this.setState({
			resolveFailList:arr
		},()=>{
//			_this.chargeLength();
		});
	}
	
	resolveReportAllOk = ()=>{
		this.setState({
			resolveReportAll:false
		});
	}
	resolveReportAllCancel = ()=>{
		this.setState({
			resolveReportAll:false
		});
	}
	cancel=()=>{
		this.setState({
			fileList:[]
		})
	}
	componentWillReceiveProps(nextProps){
		 if(nextProps.cleanList){
		 	this.setState({
			 	fileList:[],
			 	resolvesIds:[]
			 },()=>{
			 	document.getElementById("fileChoose").value = "";
			 })
		 }
	}
	close(index){
		let data = this.state.fileList;
		data.splice(index,1);
		this.setState({
			fileList:data
		});
	}
	
	
	render() {
		const _this = this;
		return (
			<div>
				<div className="block_fileinput" onDragOver={this.dragover} onDrop={this.drop}>
	    			<span tabIndex="0" className="upload" role="button">
		    			<input id="fileChoose" type="file" onChange={this.addOneFile} accept="html,pdf,doc,txt,xls,zip,rar,jpg,png,jpeg" style={{display: "none"}} />
		    			<div className="upload-drag-container">
			    			<p className="upload_text">将简历文件拖入这里或</p>
			    			<div className="upload_btn" onClick={this.chooseFile}>
				    			<Icon type="cloud-upload-o" />
				    			<span>选择简历</span>
			    			</div>
			    			<p>可以上传一份或多份html、pdf、doc、txt、xls、zip、rar、jpg、png等格式文件解析后继续填写</p>
			    			<p style={{marginTop: "10px",color:"#EA0F0F"}}>单个文件大小不超过5M</p>
		    			</div>
	    			</span>
	    		</div>
	    		{
	    			this.state.fileList.map(function(item,index){
	    				return <FileItem files={item} index={index} key={'key'+index} start={_this.state.startUpload} close={(index)=>{_this.close(index)}} finish={(id,name)=>{_this.finish(id,name)}} fail={(name)=>{_this.fail(name)}}></FileItem>
	    			})
	    		}
	    		<div className="block_btn-footer" style={{marginTop:"80px",display:this.state.fileList.length>0?"block":"none"}}>
	    			<Button className="form_button-cancel" onClick={this.cancel}>取消</Button>
	    			<Button type="primary" className="form_button-submit" onClick={this.submitFile}>确定</Button>
	    		</div>
	    		<Modal title="解析报告" wrapClassName="tab_dialog" width={500} visible={this.state.resolveReportAll} onOk={this.resolveReportAllOk} onCancel={this.resolveReportAllCancel} okText="确定" cancelText="取消" >
		          <div style={{ paddingBottom: "50px" }}>
		          	<div className="resolve-success">
		          		<Icon type="check" style={{ fontSize: 18, color: '#1EC2A6',verticalAlign: "middle" }} />&nbsp;&nbsp;
		          		<span style={{ verticalAlign: "middle" }}>
		          			解析成功{this.state.resolveSuccessList.length}个：
		          			{	
					          	this.state.resolveSuccessList.map(function(item,index){
					          		if(index===(_this.state.resolveSuccessList.length-1)){
					          			return `${item}`;
					          		}else{
					          			return `${item}、`;
					          		}
						      	})
					        }
		          		</span>
		          	</div><br/>
		          	<div className="resolve-fail">
		          		<span>
		          			解析失败{this.state.resolveFailList.length}个
		          		</span>
		          	</div>
		          	<div className="resolve-not">
		          		<span>
		          			不是简历{this.state.resolveNot.length}个
		          		</span>
		          	</div>
	          	  </div>
		        </Modal>
	    	</div>
		);
	}
}

export default FileUpload;