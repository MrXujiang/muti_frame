import React, { Component } from "react";
import { Tabs, Icon,Modal,Button } from 'antd';
import {check,getRoot,getLogo,getPath,confirmBox,hex2Rgba} from '../../../utils/common';
import {changePsw} from "../../../fetch/passwordmanage/modifypwd";
import { pageSet } from "../../../fetch/common/index";
const TabPane = Tabs.TabPane;

class ForgetChangePwd extends Component {
	
	state = {
		showResult:false,
		oldState: {
            index: 0,
            mes: ""
        },
        newState: {
            index: 0,
            mes: "",
            describe: ""
        },
        comState: {
            index: 0,
            mes: ""
        },
        comState:false,
        validateCode:"",
        userid:"",
        pwd:"",
        newPwd:"",
        headerLogo:"",
        validateCodeImg:"",
        showFinish:false,
        textColor:"#18BAE2"
	}
	
	handleSave = (newVal, comVal) => {
		const _this = this;
		if(this.state.pwd === this.state.newPwd){
			this.setState({
				comState:false
			})
			const result = changePsw({
	        	userId:_this.state.userid,
	        	password:_this.state.pwd,
	        	validateCode:_this.state.validateCode
	        });
	        result.then(response => response.json())
			.then(data => {
				if(data.state === 200) {
				    confirmBox({content:data.data,
						    onOk:function(){
						    	_this.setState({
						    		showFinish:true
						    	});
						    }
					    });
				}
			});
		}else{
			this.setState({
				comState:true
			})
		}
    }
	handleValidateCode=(e)=>{
		this.setState({
			validateCode:e.target.value
		})
	}
	pwdHandle=(e)=>{
		this.setState({
			pwd:e.target.value
		})
	}
	newPwdHandle=(e)=>{
		this.setState({
			newPwd:e.target.value
		})
	}
	changeImg=()=>{
		let mydate = new Date();
		let time = mydate.getTime();
		let path = getPath+ "/user/changeVcode?t="+time;
		this.setState({
			validateCodeImg:path
		});
	}
	goTo=()=>{
		window.location.href = `./signin.html#/`;
	}
	componentDidMount(){
		let path = window.location.href.split("?");
		let userid;
		if(path.length>1){
			userid = path[1].split("=")[1];
			this.setState({
				userid:userid
			})
		}
		let p = getPath+ "/user/changeVcode";
		this.setState({
			headerLogo: getLogo,
			validateCodeImg:p
		})
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
            <div className="modify-password-box">
                <Tabs
                    className="pwd-tab"
                    defaultActiveKey="1"
                    size="large" style={{display:this.state.showFinish?"none":"block"}}
                >
                    <TabPane
                        tab={
                            <React.Fragment>
                                修改密码
                                <p className="tab-bar-line-fixed" style={{
                                    backgroundColor: this.state.textColor,
                                    bottom: "-15px"
                                }}></p>
                            </React.Fragment>
                        }
                        key="1"
                    >
                        <div className="changepwd-box" style={{width:"800px"}}>
                            <label htmlFor="newPwd">
                                <span>新密码:</span>
                                <input
                                    ref="newValue"
                                    id="newPwd"
                                    type="password"
                                    onChange={this.pwdHandle}
                                    value={this.state.pwd}
                                />
                                <div className="warning-box">
                                    <Icon
                                        type="check-circle" 
                                        style={{
                                            display: this.state.newState.index == 0 ?
                                                "none"
                                                :
                                                this.state.newState.index == 1 ?
                                                "block"
                                                :
                                                "none"
                                            }}
                                    />
                                    <Icon
                                        type="exclamation-circle"
                                        style={{
                                            display: this.state.newState.index == 0 ?
                                                "none"
                                                :
                                                this.state.newState.index == 1 ?
                                                "none"
                                                :
                                                "block"
                                        }}
                                    >
                                        密码不符合要求，请重新输入
                                    </Icon>
                                </div>
                            </label>
                            <label htmlFor="comPwd">
                                <span>确认密码:</span>
                                <input
                                    ref="comValue"
                                    id="comPwd"
                                    type="password"
                                    onChange={this.newPwdHandle}
                                    value={this.state.newPwd}
                                />
                                <div className="warning-box">
                                    <Icon
                                        type="check-circle" 
                                        style={{
                                            display: this.state.comState.index == 0 ?
                                                "none"
                                                :
                                                this.state.comState.index == 1 ?
                                                "block"
                                                :
                                                "none"
                                            }}
                                    />
                                    <Icon
                                        type="exclamation-circle"
                                        style={{
                                            display: this.state.comState?"block" : "none"
                                        }}
                                    >
                                        密码不一致，请重新填写
                                    </Icon>
                                </div>
                            </label>
                            <label htmlFor="veri">
                                <span>验证码：</span>
                                <input
                                    ref="veriValue"
                                    id="veri"
                                    placeholder="请输入验证码"
                                    value={this.state.validateCode}
                                    onChange={this.handleValidateCode}
                                />
                                <div className="imgbox">
                                    <img src={this.state.validateCodeImg} alt="" />
                                </div>
                                <i className="imgbox_text" onClick={this.changeImg}>看不清，换一张</i>
                                <strong style={{display:"none"}} className="warning-box">
                                    验证码错误
                                </strong>
                            </label>
                            <p
                                className="notice"
                            >
                                { this.state.newState.describe }
                            </p>
                            <div className="button-box clearfix">
                                <button 
                                    className="cancel"
                                    style={{
                                        color: this.state.textColor
                                    }}
                                    onClick={ ()=>{
                                        this.refs.newValue.value="";
                                        this.refs.comValue.value="";
                                    } }
                                >
                                    重置
                                </button>
                                <button
                                    className="save"
                                    style={{
                                        backgroundColor: this.state.textColor,
                                        boxShadow: "1px 1px 10px "+ hex2Rgba(this.state.textColor, "0.3")
                                    }}
                                    onClick={() => 
                                        this.handleSave(
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
                </Tabs>
                <div className="finish_page" style={{display:this.state.showFinish?"block":"none"}}>
                	<div className="success_img"></div>
                	<p>修改密码成功</p>
                	<Button className="form_button-cancel" onClick={this.goTo}>前往登录页面</Button>
                </div>
            </div>
        )
    }
}

export default ForgetChangePwd;