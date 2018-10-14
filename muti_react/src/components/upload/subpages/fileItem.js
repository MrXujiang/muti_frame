import React, { Component } from "react";
import { Icon,Progress  } from 'antd';
import {upload} from "../../../fetch/home/resolve";

import "../styles";

class FileItem extends Component {
	constructor(props) {
        super(props);
		this.state={
			status:"default",
			rate:0,
			proShow:true,
			fileId:""
		}
    }
	
	changeRate = ()=>{
		const _this = this;
		let num = 0;
		_this.timerID = setInterval(function(){
			let n = Math.floor(Math.random()*((98-num)/4) + 1);
			if(num >= 100){
				clearInterval(_this.timerID);
			}else{
				num = num + n;
				_this.setState({
					rate:num
				});
			}
		},500);
	}
	
	uploadFile=()=>{
		let _this = this;
		var data = new FormData();
		data.append('file1', _this.props.files);
		const result = upload(data);
      	result.then(response => response.json())
		.then(data => {
			if(data.state === 200){
				clearInterval(_this.timerID);
				_this.setState({
					status:"success",
					proShow:false,
					rate:100,
					fileId:data.data
				},()=>{
					_this.props.finish(data.data,_this.props.files.name);
				});
			}else{
				clearInterval(_this.timerID);
				_this.setState({
					status:"error",
					proShow:false,
					rate:0
				},()=>{
					_this.props.fail(_this.props.files.name);
				});
			}
		});
	}
	
	close=()=>{
		this.props.close(this.props.index);
	}
	componentDidUpdate(){
//		if(this.state.rate == 0 && this.state.status === "default"){
//			this.changeRate();
//			this.uploadFile();
//		}
	}
	
	componentDidMount(){
		if(this.state.rate == 0 && this.state.status === "default"){
			this.changeRate();
			this.uploadFile();
		}
	}
	 
	render() {
		const _this = this;
		function changeSize(param){
			let num = param/1024/1024;
			let result = num.toFixed(2);
			return result+"MB";
		}
		return (
			<div className="file_item">
	    		<p className="file_name">{this.props.files.name}</p>
	    		<div className="file_size-frame"><span className="file_size">文件大小：{changeSize(_this.props.files.size)} - </span><span className={`rate-${this.state.status}`}>{this.state.rate}%</span></div>
	    		<Progress percent={this.state.rate} showInfo={false} style={{display:this.state.proShow?"inline-block":"none"}} />
	    		<div className="status_flag">
	    			<span className="status_success" style={{display:this.state.status==="success"?"inline-block":"none"}}>
	    				<Icon type="check-circle" />&nbsp;&nbsp;<span style={{verticalAlign: "middle"}}>上传成功</span>
    				</span>
	    			<span className="status_error" style={{display:this.state.status==="error"?"inline-block":"none"}}>
	    				<Icon type="close-circle" />&nbsp;&nbsp;<span style={{verticalAlign: "middle"}}>上传失败</span>
    				</span>
	    		</div>
	    		<Icon type="close" className="btn_close" onClick={this.close} />
	    	</div>
		);
	}
}

export default FileItem;