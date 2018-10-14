import React, { Component } from "react";
import { Row, Col ,Input } from 'antd';

import '../../../styles/homeconfig';

class Homeconfig extends Component {
	
	state={
		mainColorList:["#ea0909","#f97b00","#e9c500","#00b85b","#18BAE2","#2c22f0","#7c00b0","#f41e97","#505050"],
		assistColorListOne:["#00ba98","#00b9d4","#2c22f0","#ea0909","#ff9421"],
		assistColorListTwo:["#00ba98","#00b9d4","#2c22f0","#ea0909","#ff9421"],
		mainColor:"#18BAE2",
		assColorOne:"#00ba98",
		assColorTwo:"#00ba98",
		logoUrl:"",
		compName:"",
		codeImg:""
	}
	
	chooseColor=(name,color)=>{
		if(name==="mainColor"){
			this.setState({
				mainColor:color
			})
		}else if(name==="assColorOne"){
			this.setState({
				assColorOne:color
			})
		}else{
			this.setState({
				assColorTwo:color
			})
		}
	}
	chooseImg=()=>{
		let dom = document.getElementById("imgFile").files[0];
		let url = URL.createObjectURL(dom);
		this.setState({
			logoUrl:url
		})
	}
	chooseCode=()=>{
		let dom = document.getElementById("codeFile").files[0];
		let url = URL.createObjectURL(dom);
		this.setState({
			codeImg:url
		})
	}
	handleName=(e)=>{
		let value = e.target.value;
		if(value.length<=12){
			this.setState({
				compName:value
			})
		}
	}
	chargeMainColor=()=>{
		let color = this.state.mainColor;
		switch (color){
			case "#ea0909":
				return "red1";
				break;
			case "#f97b00":
				return "red3";
				break;
			case "#e9c500":
				return "red2";
				break;
			case "#00b85b":
				return "green3";
				break;
			case "#18BAE2":
				return "blue1";
				break;
			case "#2c22f0":
				return "blue2";
				break;
			case "#7c00b0":
				return "purple1";
				break;
			case "#f41e97":
				return "purple3";
				break;
			case "#505050":
				return "blue1";
				break;
			default:
				return "blue1";
				break;
		}
	}
	
	render(){
		const _this = this;
		return (
			<Row className="home_config">
		      <Col span={14}>
		      	<div className="block_left">
		      		<div className="left_item">
		      			<span className="line_title">主色：</span>
			      		<div className="block_palette">
			      			{
			      				this.state.mainColorList.map(function(item){
			      					return (
			      						<div onClick={()=>{_this.chooseColor("mainColor",item)}} className={`palette_border ${_this.state.mainColor===item?"palette_border-choose":""}`}>
			      							<div className="palette_item" style={{backgroundColor:item}}></div>
			      						</div>
			      					)
			      				})
			      			}
			      			<div className="block_input">
			      				<input type="text" /><a>颜色预览</a>
			      			</div>
			      		</div>
		      		</div>
		      		<div className="left_item">
		      			<span className="line_title">辅色：</span>
			      		<div className="block_palette">
			      			{
			      				this.state.assistColorListOne.map(function(item){
			      					return (
			      						<div onClick={()=>{_this.chooseColor("assColorOne",item)}} className={`palette_border ${_this.state.assColorOne===item?"palette_border-choose":""}`}>
			      							<div className="palette_item" style={{backgroundColor:item}}></div>
			      						</div>
			      					)
			      				})
			      			}
			      			<div className="block_input">
			      				<input type="text" /><a>颜色预览</a>
			      			</div>
			      		</div>
		      		</div>
		      		<div className="left_item" style={{borderBottom:"1px solid #F2F2F2",paddingBottom:"30px"}}>
		      			<span className="line_title">辅色：</span>
			      		<div className="block_palette">
			      			{
			      				this.state.assistColorListTwo.map(function(item){
			      					return (
			      						<div onClick={()=>{_this.chooseColor("assColorTwo",item)}} className={`palette_border ${_this.state.assColorTwo===item?"palette_border-choose":""}`}>
			      							<div className="palette_item" style={{backgroundColor:item}}></div>
			      						</div>
			      					)
			      				})
			      			}
			      			<div className="block_input">
			      				<input type="text" /><a>颜色预览</a>
			      			</div>
			      		</div>
		      		</div>
		      		<div>
		      			<span className="line_title">设置企业Logo：</span>
		      			<input type="file" onChange={this.chooseImg} id="imgFile" className="file_input" /><br/><br/>
		      			<p className="tip_text">图片格式为(.jpg , .gif , .bmp , .png)</p><br/><br/>
		      			<img src={this.state.logoUrl} className="block_logo"/>
		      		</div>
		      		<div style={{borderBottom:"1px solid #F2F2F2",paddingBottom:"30px",width:"800px",margin:"20px auto"}}>
		      			<i className="tip_text">*</i>&nbsp;&nbsp;
		      			<span>设置登录页公司猎头系统简称：</span>
		      			<input type="text" className="name_input" value={this.state.compName} onChange={this.handleName} /><br/><br/>
		      			<p className="tip_text">不超过12个字符</p>
      				</div>
      				<div>
      					<span className="line_title">设置二维码：</span>
		      			<input type="file" onChange={this.chooseCode} id="codeFile" className="file_input" /><br/><br/>
		      			<p className="tip_text">大小不能超过30kb</p><br/><br/>
		      			<img src={this.state.codeImg} className="block_code"/>
  					</div>
		      	</div>
		      </Col>
		      <Col span={10}>
		      	<div className="block_right">
		      		<div className="block_preview">
		      			<div className="tittle_left" style={{paddingTop:"70px"}}>登<br/>录<br/>页<br/>预<br/>览</div>
		      			<div className="show_right-outer">
		      				<div className="show_right">
		      					<div className={`${this.chargeMainColor()} right_inner`}></div>
		      				</div>
		      			</div>
		      		</div><br/><br/>
		      		<div className="block_preview">
		      			<div className="tittle_left" style={{paddingTop:"40px"}}>登<br/>录<br/>页<br/>二<br/>维<br/>码<br/>预<br/>览</div>
		      			<div className="show_right-outer">
		      				<div className="show_right">
		      					<div className={`${this.chargeMainColor()} right_inner`}>
		      						<div className="blank_inner">
		      							<div className="block_code-right"></div>
		      							<div className="scan_img"></div>
		      						</div>
		      					</div>
		      				</div>
		      			</div>
		      		</div>
		      	</div>
		      </Col>
		    </Row>
		)
	}
}

export default Homeconfig;