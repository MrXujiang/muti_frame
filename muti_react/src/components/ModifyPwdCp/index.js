import React, { Component } from "react";
import { Tabs, Icon } from 'antd';
import { get } from "../../fetch/get";
import { getCookie, pageUrl, hex2Rgba } from "../../utils/common";
const TabPane = Tabs.TabPane;
const QRCode = require("../../utils/code");

import "./styles";

class ModifyPwdCp extends Component {
	
	state = {
		showResult: "2",
        nickName: "",
        activeKey:""
	}

    componentDidMount() {
    	const _this = this;
    	let path = window.location.href.split("?");
        get("/auth/bind/user/guessBind").then(response => response.json()).then((res) => {
            if(res.state == "200"){
                this.setState({
                    showResult: res.data.bindStatus,
                    nickName: res.data.nickName
                },()=>{
			    	if(path.length>1){
			    		_this.setState({
			    			activeKey:"2"
			    		},()=>{
			    			document.title = "绑定微信";
			    			_this.getQrCode();
			    		})
			    	}else{
			    		_this.setState({
			    			activeKey:"1"
			    		})
			    	}
                })
            }
        })
    }

    tabChange = (key) => {
        this.setState({
            activeKey: key
        })
        if(key === "2" && this.state.showResult === "1"){
            this.getQrCode();
        }
    }

    getQrCode = () => {
        const username = localStorage.userName;
        get("/qr/index/generate").then(response => response.json()).then((res) => {
            if(res.state == 200) {
                let qrcodeUrl = pageUrl + "/wechat.html?uniqueSign=" + res.data.uniqueSign + "&appId=" + res.data.appId + "&username="+ username +"#/bind";
                const bindQrCode = document.querySelector("#bindQrCode");
                if(bindQrCode){
                    bindQrCode.innerHTML = "";
                }
                const qrcode = new QRCode(bindQrCode, {
                    text: qrcodeUrl,
                    width: 170,
                    height: 170
                });
            }
        })
    }

    unbind = () => {
        get("/auth/bind/user/uniteBind").then(response => response.json()).then((res) => {
            this.setState({
                showResult: "1"
            }, () => {
                this.getQrCode();
            })
        })
    }
    
    render() {
        const { 
            oldState,
            newState,
            comState,
            handleCancel,
            handleSave
        } = this.props;

        return (
            <div className="modify-password-box">
                <Tabs
                    className="pwd-tab"
                    activeKey={this.state.activeKey}
                    size="large"
                    onChange={this.tabChange}
                >
                    <TabPane
                        tab={
                            <React.Fragment>
                                修改密码
                                <p className="tab-bar-line-fixed" style={{backgroundColor: localStorage.themeColor}}></p>
                            </React.Fragment>
                        }
                        key="1"
                    >
                        <div className="changepwd-box">
                            <label htmlFor="pwd">
                                <span>原密码:</span>
                                <input
                                    ref="oldValue"
                                    id="pwd"
                                    type="password"
                                />
                                <strong className="warning-box">
                                    <Icon 
                                        type="check-circle" 
                                        style={{
                                            display: oldState.index == 0 ?
                                                "none"
                                                :
                                                oldState.index == 1 ?
                                                    "block"
                                                    :
                                                    "none"
                                        }}
                                    />
                                    <Icon 
                                        type="exclamation-circle"
                                        style={{
                                            display: oldState.index == 0 ?
                                                "none"
                                                :
                                                oldState.index == 1 ?
                                                    "none"
                                                    :
                                                    "block"
                                        }}
                                    >
                                        { oldState.mes }
                                    </Icon>
                                </strong>
                            </label>
                            <label htmlFor="newPwd">
                                <span>新密码:</span>
                                <input
                                    ref="newValue"
                                    id="newPwd"
                                    type="password"
                                />
                                <div className="warning-box">
                                    <Icon
                                        type="check-circle" 
                                        style={{
                                            display: newState.index == 0 ?
                                                "none"
                                                :
                                                newState.index == 1 ?
                                                "block"
                                                :
                                                "none"
                                            }}
                                    />
                                    <Icon
                                        type="exclamation-circle"
                                        style={{
                                            display: newState.index == 0 ?
                                                "none"
                                                :
                                                newState.index == 1 ?
                                                "none"
                                                :
                                                "block"
                                        }}
                                    >
                                        {newState.describe}
                                    </Icon>
                                </div>
                            </label>
                            <label htmlFor="comPwd">
                                <span>确认密码:</span>
                                <input
                                    ref="comValue"
                                    id="comPwd"
                                    type="password"
                                />
                                <div className="warning-box">
                                    <Icon
                                        type="check-circle" 
                                        style={{
                                            display: comState.index == 0 ?
                                                "none"
                                                :
                                                comState.index == 1 ?
                                                "block"
                                                :
                                                "none"
                                            }}
                                    />
                                    <Icon
                                        type="exclamation-circle"
                                        style={{
                                            display: comState.index == 0 ?
                                                "none"
                                                :
                                                comState.index == 1 ?
                                                "none"
                                                :
                                                "block"
                                        }}
                                    >
                                        密码不一致，请重新填写
                                    </Icon>
                                </div>
                            </label>
                            <p
                                className="notice"
                            >
                                {/* { newState.describe }  */}
                                密码长度应在8-20个字符之间，且必须包含字母和数字
                            </p>
                            <div className="button-box clearfix">
                                <button 
                                    className="cancel"
                                    // onClick={ handleCancel }
                                    style={{
                                        color: localStorage.themeColor
                                    }}
                                    onClick={ ()=>{
                                        this.refs.oldValue.value="";
                                        this.refs.newValue.value="";
                                        this.refs.comValue.value="";
                                    } }
                                >
                                    重置
                                </button>
                                <button
                                    className="save"
                                    style={{
                                        backgroundColor: localStorage.themeColor,
                                        boxShadow: "1px 1px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")
                                    }}
                                    onClick={() => 
                                        handleSave(
                                            this.refs.oldValue.value,
                                            this.refs.newValue.value,
                                            this.refs.comValue.value
                                        )
                                    }
                                >
                                    保存
                                </button>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane
                        tab={
                            <React.Fragment>
                                绑定微信
                                <p className="tab-bar-line-fixed" style={{backgroundColor: localStorage.themeColor}}></p>
                            </React.Fragment>
                        }
                        key="2"
                    >
                    	{this.state.showResult === "1"?<div className="bind_wechat">
                            <div id="bindQrCode" className="code_pic"></div>
                    		<b>使用手机微信扫码绑定</b><br/>
                    		<span>您尚未绑定微信</span>
                    	</div>:""}
                    	{this.state.showResult === "0"?<div className="bind_success">
                    		<Icon type="check-circle-o" className="icon_success" style={{color: localStorage.themeColor}} /><br/>
                    		<b>您已成功绑定微信：</b><b className="wechat_name" style={{color: localStorage.themeColor}}>{this.state.nickName}</b><br/>
                    		<div className="cancel_btn" onClick={this.unbind} style={{color: localStorage.themeColor}}>解除绑定</div>
                    	</div>:""}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default ModifyPwdCp;