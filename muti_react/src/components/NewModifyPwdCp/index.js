import React, { Component } from "react";
import { Tabs, Icon,Modal,Button, Input } from 'antd';
import {check,getRoot,getPath,hex2Rgba,confirmBox} from '../../utils/common';
import { forgetPsw } from "../../fetch/signin/index";
import { pageSet } from "../../fetch/common/index";
const TabPane = Tabs.TabPane;

import "./styles";

class NewModifyPwdCp extends Component {
	
	state={
		emailErr:false,
		email:"",
		validateCode:"",
		validateCodeImg:"",
		emailFinish:false,
        textColor:"#18BAE2"
	}
	
	handleForgetPsw=()=>{
		const _this = this;
		let msg = "";
		const result = forgetPsw({
			email:_this.state.email,
			validateCode:_this.state.validateCode
		});
		result.then(response => response.json())
		.then(data => {
			if(data.data.retCode == 0){
				msg = "邮箱尚未注册";
				this.changeImg();
			}else if(data.data.retCode == 1){
				msg = "发送密码成功";
			}else if(data.data.retCode == 2){
				msg = "图片验证码错误";
				this.changeImg();
			}else{
				msg = "其他异常";
			}
		    confirmBox({content:data.data.msg || msg,onOk:function(){if(data.data.retCode == 1){
			    		window.history.back();
			    	}}});
		});
	}
	reSet=()=>{
		this.setState({
			email:"",
			validateCode:""
		})
		window.location.href = `./signin.html#/`;
	}
	handleEmail=(e)=>{
		let flag = check("电子邮箱",e.target.value);
		this.setState({
			emailErr:!flag,
			email:e.target.value
		})
	}
	handleValidateCode=(e)=>{
		this.setState({
			validateCode:e.target.value
		})
	}
	changeImg=()=>{
		let mydate = new Date();
		let time = mydate.getTime();
		let path = getPath+ "/user/validImg?t="+time;
		console.log(path)
		this.setState({
			validateCodeImg:path
		});
	}
	goTo=()=>{
		
	}
	
	componentDidMount(){
		let path = getPath+ "/user/validImg";
		this.setState({
			validateCodeImg:path
		});
        const result = pageSet();
        result.then(res => res.json())
        .then(data => {
            localStorage.themeColor = data.data.themeColor || "#18BAE2";
            this.setState({
                textColor:data.data.themeColor
            })
        });
	}
    render() {
    	
        return (
            <div className="newmodify-password-box">
                <Tabs
                    className="pwd-tab"
                    defaultActiveKey="1"
                    size="large"
                    style={{display:this.state.emailFinish?"none":"block"}}
                >
                    <TabPane
                        tab={
                            <React.Fragment>
                                修改密码
                                <p className="tab-bar-line-fixed" style={{backgroundColor: this.state.textColor}}></p>
                            </React.Fragment>
                        }
                        key="1"
                    >
                        <div className="changepwd-box">
                            <label htmlFor="mail">
                                <span>电子邮箱：</span>
                                <Input
                                    ref="mailValue"
                                    id="mail"
                                    placeholder="请填写您注册时的电子邮箱"
                                    value={this.state.email}
                                    onChange={this.handleEmail}
                                />
                                <strong style={{display:this.state.emailErr?"inline":"none"}} className="warning-box">
                                    请输入正确的电子邮箱
                                </strong>
                            </label>
                            <label htmlFor="veri">
                                <span>验证码：</span>
                                <Input
                                    ref="veriValue"
                                    id="veri"
                                    placeholder="请输入验证码"
                                    value={this.state.validateCode}
                                    onChange={this.handleValidateCode}
                                />
                                <div className="imgbox">
                                    <img src={this.state.validateCodeImg} alt=""/>
                                </div>
                                <i onClick={this.changeImg}>看不清，换一张</i>
                                <strong style={{display:"none"}} className="warning-box">
                                    验证码错误
                                </strong>
                            </label>
                            <div className="btn-box">
                                <button className="cancel"
                                    style={{
                                        color: this.state.textColor
                                    }}
                                	onClick={this.reSet}>取消</button>
                                <button className="save"
                                    style={{
                                        backgroundColor: this.state.textColor,
                                        boxShadow: "1px 1px 10px "+ hex2Rgba(this.state.textColor, "0.3")
                                    }}
                                	onClick={this.handleForgetPsw}>确认</button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
                <div className="finish_page" style={{display:this.state.emailFinish?"block":"none"}}>
                	<div className="email_img"></div>
                	<p>邮件发送成功</p>
                	<Button className="form_button-cancel" onClick={this.goTo}>前往邮件页面</Button>
                </div>
            </div>
        )
    }
}

export default NewModifyPwdCp;