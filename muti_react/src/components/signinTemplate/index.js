import React, { Component } from "react";
import { message, Form, Icon, Input, Button, Checkbox } from "antd";
import ScanImg from "../../images/icons/scan_icon";
import "./styles";

const FormItem = Form.Item;

class Index extends Component {
    state = {
        bgArr: ["signin-small-bg1", "signin-small-bg2", "signin-small-bg3", "signin-small-bg4"]
    }

    render() {
    	const themeColor = this.props.themeColor || "#18bae2";
    	let currentBgIndex = 0;
  		if(themeColor === "#ea0909" || themeColor === "#f97b00" || themeColor === "#e9c500"){
		 	currentBgIndex = 2;
		}else if(themeColor === "#00b85b"){
			currentBgIndex = 1;
		}else if(themeColor === "#7c00b0" || themeColor === "#f41e97"){
			currentBgIndex = 3;
		}else{
			currentBgIndex = 0;
		}
        const currentBg = "signin-box " + this.state.bgArr[currentBgIndex];
        return (
        	<div className="login-template-wrap">
	            <div className={ currentBg }>
	                <div className="inner-box">
	                    <h1>{this.props.companyName}</h1>
	                    <div
	                        style={{
	                            display: !this.props.showQrCodeMode ? "block" : "none"
	                        }}
	                    >
	                        <Form className="login-form">
				                <FormItem>
				                    <Input
				                        type="text"
				                        readOnly
				                        className={ this.props.userClass }
				                        placeholder={ this.props.userPlaceHolder } 
				                        style={{color: localStorage.themeColor, borderColor: "#c8c8c8"}}
				                    />
				                </FormItem>
				                <FormItem>
				                    <Input
				                        type="password"
				                        readOnly
				                        className={ this.props.pwdClass }
				                        placeholder={ this.props.pwdPlaceHolder }
				                        style={{color: localStorage.themeColor, borderColor: "#c8c8c8"}}
				                    />
				                    <a 
				                        className="forgetpwd"
				                        style={{color: themeColor}}
				                    >
				                        忘记密码？
				                    </a>
				                </FormItem>
				                <FormItem>
				                    <Checkbox
				                        className="remind-account"
				                    >
				                        记住账号
				                    </Checkbox>
				                    <Button type="primary" htmlType="submit" className="buttons"
				                        style={{backgroundColor: themeColor, borderColor: themeColor}}>
				                        登&nbsp;&nbsp;&nbsp;&nbsp;录
				                    </Button>
				                </FormItem>
				            </Form>
	                    </div>
	                    <div 
	                        className="qrcode-box clearfix"
	                        style={{
	                            display: this.props.showQrCodeMode ? "block" : "none"
	                        }}
	                    >
	                        <div className="qrcode">
	                            <div id="loginQrCode"></div>
	                        </div>
	                        <div className="right-box">
	                            <img src={ ScanImg } alt=""/>
	                            <span>
	                                请使用微信 <br/>
	                                扫描二维码登录
	                            </span>
	                        </div>
	                    </div>
	                </div>
	                <div>
	                    <span 
	                        className="scavenge"
	                        style={{
	                            display: !this.props.showQrCodeMode ? "block" : "none",
	                            backgroundColor: themeColor
	                        }}
	                    >
	                        扫一扫
	                    </span>
	                    <span 
	                        className="account"
	                        style={{
	                            display: this.props.showQrCodeMode ? "block" : "none",
	                            backgroundColor: themeColor
	                        }}
	                    >
	                        账号
	                    </span>
	                </div>
	            </div>
            </div>
        )
    }
}

export default Index;
