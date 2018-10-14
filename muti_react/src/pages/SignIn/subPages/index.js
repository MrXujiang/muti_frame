import React, { Component } from "react";
import { message } from "antd";
import { setCookie, deleteCookie, getQueryString, pageUrl } from "../../../utils/common";
import { WrappedNormalLoginForm } from "../../../components/signInCp";
import {
    getLogin
} from "../../../fetch/signin";
import { pageSet,changeLanType,defaultLanType } from "../../../fetch/common/index";
import { get } from "../../../fetch/get";

import ScanImg from "../../../images/icons/scan_icon";
import {getQrCode,getLogo} from "../../../utils/common";
const QRCode = require("../../../utils/code");

let loginTimer = null;

class Index extends Component {
    state = {
        changeLoginMode: true,
        currentBgIndex: 0,
        isRemind: false,
        isRemindAccount: "isnotremind",
        bgArr: ["signin-small-bg1", "signin-small-bg2", "signin-small-bg3", "signin-small-bg4"],
        showErr:false,
        companyName:"",
        privacy:"",
        copyRight:"",
        uniqueSign: "",
        showLanType:false,
        isDefaultChinaLanType:false,
        isCurrChinaLanType:false,
        btnColor:"#18bae2",
        showQrcode: false
    }

    handleSignIn = values => {
        //登录判断
        const loginResult = getLogin({
            "userName": values.userName,
            "password": values.password
        });

        if(values.remember) {
            setCookie("username", values.userName, 1);
        } else {
            deleteCookie("username");
        }

        loginResult
            .then(res => res.json())
            .then(data => {
                if(data.state == 200) {
                    const redirects = getQueryString(window.location.href);

                    //登录跳转判断
                    if(redirects.redirect) {
                        window.location.href = redirects.redirect;
                    } else {
                        // 登录成功跳转首页
                        localStorage.activeKey = "1";
                        window.location.href = "./home.html";
                    }
                }

                if(data.state == 500) {
//                  message.error(data.data);
					this.setState({
						showErr:true
					})
                }
            });
    }

    hideErr = () => {
        this.setState({
            showErr: false
        })
    }

    //切换登录方式
    handleLoginMode = () => {
        this.setState(prevState => ({
            changeLoginMode: !prevState.changeLoginMode
        }), () => {
            if(!this.state.changeLoginMode){
                // 获取唯一标识
                get("/qr/index/generate").then(response => response.json()).then((res) => {
                    if(res.state == 200) {
                        let qrcodeUrl = pageUrl + "/wechat.html?uniqueSign=" + res.data.uniqueSign + "&appId=" + res.data.appId;
                        const loginQrCode = document.querySelector("#loginQrCode");
                        loginQrCode.innerHTML = "";
                        const qrcode = new QRCode(loginQrCode, {
                            text: qrcodeUrl,
                            width: 100,
                            height: 100
                        });
                        // 轮询
                        loginTimer = setInterval(() => {
                            get("/qr/index/polling?uniqueSign="+ res.data).then(response => response.json()).then((data) => {
                                if(data.state == "200"){
                                    if(data.data != null){
                                        clearInterval(loginTimer);
                                        get("/qr/index/login?loginToken="+data.data).then(response => response.json()).then((response) => {
                                            if(response.state == "200"){
                                                window.location.href = "./home.html";
                                            }
                                        })
                                    }
                                }
                            })
                        }, 1000)
                    }
                })
            }else{
                clearInterval(loginTimer);
            }
        });
    }
    changeLan=(param)=>{
    	const _this = this;
    	const result = changeLanType({
    		lanType:param
    	});
    	result.then(response => response.json())
		.then(data => {
			const pr = pageSet();
	    	pr.then(response => response.json())
			.then(data => {
				_this.setState({
					companyName:data.data.companyName,
					showLanType:data.data.isShowSelectLanType,
					isDefaultChinaLanType:data.data.isDefaultChinaLanType,
					isCurrChinaLanType:data.data.isCurrChinaLanType,
                    showQrcode: data.data.appId?true:false
				})
			});
		});
    }
    
    componentDidMount() {
    	defaultLanType();
    	const result = pageSet();
    	let pageImgType;
    	result.then(response => response.json())
		.then(data => {
            localStorage.themeColor = data.data.themeColor || "#18BAE2";
			if(data.data.themeColor === "#ea0909"||data.data.themeColor === "#f97b00"||data.data.themeColor === "#e9c500"){
			 	pageImgType = 2;
			}else if(data.data.themeColor === "#00b85b"){
				pageImgType = 1;
			}else if(data.data.themeColor === "#7c00b0"||data.data.themeColor === "#f41e97"){
				pageImgType = 3;
			}else{
				pageImgType = 0;
			}
			this.setState({
				companyName:data.data.companyName,
				showLanType:data.data.isShowSelectLanType,
				isDefaultChinaLanType:data.data.isDefaultChinaLanType,
				isCurrChinaLanType:data.data.isCurrChinaLanType,
				currentBgIndex: pageImgType,
				btnColor:data.data.themeColor==null?"#18bae2":data.data.themeColor,
                showQrcode: data.data.appId?true:false
			})
		});
    }

    render() {
        const currentBg = "signin-box " + this.state.bgArr[this.state.currentBgIndex];
            // currentRemind = "remind-account " + this.state.isRemindAccount;
		const _this = this;
        return (
            <div className="bg-box">
            	<div className="comp_img">
            		<img src={getLogo} alt="暂无图片" />
            		<div className="text_lanType" style={{display:this.state.showLanType?"block":"none"}}>
            			<a onClick={()=>{_this.changeLan(1)}} 
                            style={{color: this.state.isCurrChinaLanType?(this.state.btnColor?this.state.btnColor:"#18BAE2"):""}}
                            className={this.state.isCurrChinaLanType?"link_border":""}>中文  </a>|
            			<a onClick={()=>{_this.changeLan(2)}} 
                            style={{color: this.state.isCurrChinaLanType?"":(this.state.btnColor?this.state.btnColor:"#18BAE2")}}
                            className={this.state.isCurrChinaLanType?"":"link_border"}>  English</a>
            		</div>
            	</div>
                <div className={ currentBg }>
                    <div className="inner-box">
                        <h1>{this.state.companyName}</h1>
                        <div
                            style={{
                                display: this.state.changeLoginMode ? "block" : "none"
                            }}
                        >
                            <WrappedNormalLoginForm 
                                userClass="username"
                                pwdClass="password"
                                userPlaceHolder="请输入账号"
                                pwdPlaceHolder="请输入账号密码"
                                handleSignIn={ this.handleSignIn }
                                showErr={this.state.showErr}
                                btnColor={this.state.btnColor}
                                hideErr={this.hideErr}
                            />
                            {/* <label htmlFor="">
                                <input 
                                    ref="userInput"
                                    className="username"
                                    type="text"
                                    placeholder="请输入账号"
                                />
                            </label>
                            <label htmlFor="">
                                <input
                                    ref="pwdInput"
                                    className="password"
                                    type="text"
                                    placeholder="请输入账号密码"
                                />
                                <a className="forgetpwd">忘记密码？</a>
                            </label>
                            <div className="btn-box clearfix">
                                <div 
                                    className={ currentRemind }
                                    onClick={ () => this.handleRemind(this.state.isRemind) }
                                >
                                    记住账号
                                </div>
                                <button
                                    onClick={ this.handleSignIn }
                                >
                                    登&nbsp;&nbsp;&nbsp;&nbsp;录
                                </button>
                            </div> */}
                        </div>
                        <div 
                            className="qrcode-box clearfix"
                            style={{
                                display: !this.state.changeLoginMode ? "block" : "none"
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
                    {this.state.showQrcode?<div
                        onClick={ this.handleLoginMode }
                    >
                        <span 
                            className="scavenge"
                            style={{
                                display: this.state.changeLoginMode ? "block" : "none",
                                backgroundColor: this.state.btnColor
                            }}
                        >
                            扫一扫
                        </span>
                        <span 
                            className="account"
                            style={{
                                display: !this.state.changeLoginMode ? "block" : "none",
                                backgroundColor: this.state.btnColor
                            }}
                        >
                            账号
                        </span>
                    </div>:null}
                </div>
            </div>
        )
    }
}

export default Index;
