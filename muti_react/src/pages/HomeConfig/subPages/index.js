import React, { Component } from "react";
import { Row, Col ,Input,message } from 'antd';
import { getConfig, setConfig } from "../../../fetch/homeconfig"
import {getPath} from "../../../utils/common";
import SigninTemplate from "../../../components/signinTemplate/index";

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
		codeImg:"",
		uniqueKey:""
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

	
	changeState(name, e){
		if(name == "compName" && e.target.value.length>12){
			message.destroy();
			message.error("前台登录页系统简称不超过12个字符");
			return false;
		}
		if(name){
			this.setState({
				[name]: e.target.value
			});
		}
    }
		

	componentWillMount(){
		getConfig({
			brandCode:2
		}).then(response => response.json())
		.then(res => {
			const data = res.data.pageSet;
			console.log(data);
			this.setState({
				mainColor:data.hunterThemeColor,
				assColorOne:data.hunterAssistColorOne,
				assColorTwo:data.hunterAssistColorTwo,
				logoUrl:"",
				compName:data.tabTitle,
				codeImg:"",
				uniqueKey:data.uniqueKey
			})
		});				
	}
	
	

	render(){
		const _this = this;
		const state = this.state;
		let path = getPath+"/NetworkStationConfig/headhunting/setting/save";
		let qrlink = getPath+"/NetworkStationConfig/headhunting/setting/configInfo!showDimensionalCodePic?pageSet.uniqueKey="+this.state.uniqueKey;
		let logolink = getPath+"/NetworkStationConfig/headhunting/setting/viewWebSiteLogo!img?brandCode=2";

		return (
			<Row className="home_config">
		      	<Col span={12}>
					<form action={path} method="post" encType="multipart/form-data" target="form_hunter_result" >
				      	<div className="block_left">
				      		<div className="left_item" style={{paddingLeft: ""}}>
				      			<span className="line_title">模板主色设置：</span>
					      		<div className="block_palette">
					      			{
					      				this.state.mainColorList.map(function(item,index){
					      					return (
					      						<div onClick={()=>{_this.chooseColor("mainColor",item)}} key={index} className={`palette_border ${_this.state.mainColor===item?"palette_border-choose":""}`}>
					      							<div className="palette_item" style={{backgroundColor:item}}></div>
					      						</div>
					      					)
					      				})
					      			}
					      			<div className="block_input">
					      				<input type="text"
					      					id="pageSet.hunterThemeColor"
					      					name="pageSet.hunterThemeColor"
					      					value={state.mainColor}
					      					onChange={(e) => this.changeState("", e)} />
				      					<a style={{backgroundColor:state.mainColor}}>颜色预览</a>
					      			</div>
					      		</div>
				      		</div>
				      		{/*<div className="left_item" style={{paddingLeft: ""}}>
				      			<span className="line_title">模板辅色1设置：</span>
					      		<div className="block_palette">
					      			{
					      				this.state.assistColorListOne.map(function(item,index){
					      					return (
					      						<div onClick={()=>{_this.chooseColor("assColorOne",item)}} key={index} className={`palette_border ${_this.state.assColorOne===item?"palette_border-choose":""}`}>
					      							<div className="palette_item" style={{backgroundColor:item}}></div>
					      						</div>
					      					)
					      				})
					      			}
					      			<div className="block_input">
					      				<input type="text"
					      					id="pageSet.hunterAssistColorOne"
					      					name="pageSet.hunterAssistColorOne"
					      					value={state.assColorOne}
					      					onChange={(e) => this.changeState("assColorOne", e)} />
				      					<a style={{backgroundColor:state.assColorOne}} >颜色预览</a>
					      			</div>
					      		</div>
				      		</div>
				      		<div className="left_item" style={{borderBottom:"1px solid #F2F2F2",paddingBottom:"30px",paddingLeft: ""}}>
				      			<span className="line_title">模板辅色2设置：</span>
					      		<div className="block_palette">
					      			{
					      				this.state.assistColorListTwo.map(function(item,index){
					      					return (
					      						<div onClick={()=>{_this.chooseColor("assColorTwo",item)}} key={index} className={`palette_border ${_this.state.assColorTwo===item?"palette_border-choose":""}`}>
					      							<div className="palette_item" style={{backgroundColor:item}}></div>
					      						</div>
					      					)
					      				})
					      			}
					      			<div className="block_input">
					      				<input type="text"
					      					id="pageSet.hunterAssistColorTwo"
					      					name="pageSet.hunterAssistColorTwo"
					      					value={state.assColorTwo}
					      					onChange={(e) => this.changeState("assColorTwo", e)} />
				      					<a style={{backgroundColor:state.assColorTwo}} >颜色预览</a>
					      			</div>
					      		</div>
				      		</div>*/}
				      		<div>
				      			<span className="line_title">设置企业Logo：</span>
				      			<input type="file" onChange={this.chooseImg} id="imgFile" id="entity.logoSource" name="entity.logoSource" className="file_input" /><br/><br/>
				      			<p className="tip_text">图片格式为(.jpg , .gif , .bmp , .png) , 建议尺寸(高:48px , 宽:不超过600px)</p><br/><br/>
				      			{/* <img src={this.state.logoUrl} className="block_logo"/> */}
				      			<img src={logolink} className="block_logo"/>
				      		</div>
				      		<div style={{borderBottom:"1px solid #F2F2F2",paddingBottom:"30px",width:"",margin:"20px auto"}}>
				      			<i className="tip_text">*</i>&nbsp;&nbsp;
				      			<span>设置前台登录页系统简称：</span>
				      			{/* <input type="text" className="name_input" value={this.state.compName} id="pageSet.tabTitle" name="pageSet.tabTitle"  onChange={this.handleName} /><br/><br/> */}
				      			<input type="text" className="name_input"
				      				value={state.compName.slice(0,12)} id="pageSet.tabTitle" name="pageSet.tabTitle"
			      					onChange={(e) => this.changeState("compName", e)} /><br/><br/>
				      			<p className="tip_text">不超过12个字符</p>
		      				</div>
		      				<div style={{display:"none"}}>
		      					<span className="line_title">设置二维码：</span>
				      			{/* <input type="file" onChange={this.chooseCode} id="codeFile" name="dimensionalCodeIcon" id="dimensionalCodeIcon" className="file_input" /><br/><br/> */}
				      			<input type="file"  id="codeFile" name="dimensionalCodeIcon" id="dimensionalCodeIcon" className="file_input" /><br/><br/>
								 
				      			<p className="tip_text">大小不能超过30kb</p><br/><br/>
				      			{/* <img src={this.state.codeImg} className="block_code"/> */}
				      			<img src={qrlink} className="block_code"/>
		  					</div> 
						  	<div style={{marginTop:"60px"}}>
							  	<input type="hidden" value="2" name="pageSet.brandCode" id="pageSet.brandCode" />
							  	<input type="hidden" id="pageSet.uniqueKey" name="pageSet.uniqueKey" value={state.uniqueKey}/>
							  	<input type="hidden" id="logoNum" name="logoNum" value="1" />
						   		<input type="submit" value="保存设置" style={{display:"block",margin:"0 auto"}}/>
						  	</div>
				      	</div>
					</form>
		      	</Col>
		      	<Col span={10}>
			      	<div className="block_right">
			      		<div className="block_preview">
			      			<div className="tittle_left" style={{paddingTop:"70px"}}>登<br/>录<br/>页<br/>预<br/>览</div>
			      			<div className="show_right-outer">
			      				<div className="show_right">
			      					<SigninTemplate
			      						showQrCodeMode={false}
			      						themeColor={this.state.mainColor}
			      						companyName={this.state.compName} />
			      					{/*<div className={`${this.chargeMainColor()} right_inner`}></div>*/}
			      				</div>
			      			</div>
			      		</div><br/><br/>
			      		<div className="block_preview">
			      			<div className="tittle_left" style={{paddingTop:"40px"}}>登<br/>录<br/>页<br/>二<br/>维<br/>码<br/>预<br/>览</div>
			      			<div className="show_right-outer">
			      				<div className="show_right">
			      					<SigninTemplate
			      						showQrCodeMode={true}
			      						themeColor={this.state.mainColor}
			      						companyName={this.state.compName} />
			      					{/*<div className={`${this.chargeMainColor()} right_inner`}>
			      						<div className="blank_inner">
			      							<div className="block_code-right"></div>
			      							<div className="scan_img"></div>
			      						</div>
			      					</div>*/}
			      				</div>
			      			</div>
			      		</div>
			      	</div>
		      	</Col>
				<iframe name="form_hunter_result" style={{display: "none"}}></iframe>
		    </Row>
		)
	}
}

export default Homeconfig;