import React, { Component } from "react";
import { Form, Input, message, Icon } from "antd";
const FormItem = Form.Item;
import { get } from "../../../fetch/get";
import { post } from "../../../fetch/post";
import { getQueryString, appId, getLogo, pageUrl } from "../../../utils/common";
import loginImg from "../../../images/wechat/login.png";
import logoImg from "../../../images/wechat/logo.png";

class Index extends Component {
    state = {
        hasBound: "",
        hasPwd: false,
        userName: "",
        password: ""
    }
    
    componentDidMount() {
        const redirects = getQueryString(window.location.href);
        
        if(!redirects.code){
            let redirect_uri = pageUrl + "/wechat.html";
            let wechatUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+(redirects.appId || appId)+"&redirect_uri=";
            wechatUrl += encodeURIComponent(redirect_uri) + "&response_type=code&scope=snsapi_userinfo";
            wechatUrl += "&state="+ redirects.uniqueSign +"#wechat_redirect";
            window.location.href = wechatUrl;
            setTimeout(() => {
                this.setState({
                    hasBound: "1"
                })
            }, 2000)
        }else{
            // 获取用户信息和登录
            document.title = "扫码登录";
            get("/qr/index/save?uniqueSign="+ redirects.state +"&code="+redirects.code).then(response => response.json()).then((res) => {
                if(res.state == 200) {
                    if(res.data.bindStatus === "1"){
                        this.setState({
                            hasBound: "3"
                        })
                    }else{
                        this.setState({
                            hasBound: "2"
                        })
                    }
                }
            })
        }
    }

    handleSubmit = () => {
        const redirects = getQueryString(window.location.href);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.uniqueSign = redirects.state;
                //登录判断
                post("/qr/index/bindAccout", values).then(res => res.json()).then(data => {
                    if(data.state == 200) {
                        this.props.history.push("success");
                    }else if(data.state == 606){
                        this.props.history.push("bound");
                    }else{
                        message.destroy();
                        message.error(data.data);
                    }
                })
            }
            
        });
    }

    handleLogin = () => {
        const redirects = getQueryString(window.location.href);
        get("/qr/index/save?uniqueSign="+ redirects.state).then(response => response.json()).then((res) => {
            if(res.state == 200) {
                this.props.history.push("success");
            }
        })
    }

    toForget = () => {
        this.props.history.push("forget");
    }

    closeWindow = () => {
        wx.closeWindow();
    }

    handleChange = (name, e) => {
        if(name == "userName"){
            this.setState({
                userName: e.target.value
            })
        }else{
            this.props.form.setFieldsValue({"password": e.target.value});
            this.setState({
                hasPwd: e.target.value == ""?false:true,
                password: e.target.value
            })
        }
    }



    clearPwd = () => {
        this.props.form.setFieldsValue({"password": ""});
        this.setState({
            password: ""
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <React.Fragment>
                {this.state.hasBound == "1"?<div className="wechat-init-wrap" style={{marginTop: "2.6rem"}}>
                    <p>您已取消此次登录</p>
                    <p>您可关闭窗口再次扫描登录</p>
                </div>
                :(this.state.hasBound == "2"?<div className="wechat-login-wrap">
                    <img className="wechat-login-img" src={ loginImg } />
                    <p className="wechat-login-text">将授权使用您的账号登录该应用</p>
                    <p className="wechat-btn-class" onClick={this.handleLogin}>确认登录</p>
                    <p className="wechat-btn-cancel" onClick={this.closeWindow}>取消</p>
                </div>:
                (this.state.hasBound == "3"?<div className="wechat-bind-wrap">
                    <img className="wechat-bind-img" src={ getLogo || logoImg } />
                    <Form>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{
                                    required: true, message: '请输入用户名',
                                }],
                            })( 
                                <div className="wechat-form-item">
                                    <Input type="text"
                                    value={this.state.userName}
                                    onChange={e => this.handleChange("userName", e)}
                                    prefix={<Icon type="user" style={{ color: '#e0e0e0', fontSize: "0.18rem" }} />}
                                    className="wechat-form-input" placeholder="用户名" />
                                </div>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入登录密码',
                                }],
                            })(
                                <div className="wechat-form-item">
                                    <Input type="password"
                                    value={this.state.password}
                                    onChange={e => this.handleChange("password", e)}
                                    prefix={<Icon type="lock" style={{ color: '#e0e0e0', fontSize: "0.18rem" }} />}
                                    suffix={this.state.hasPwd?<Icon onClick={this.clearPwd} type="close-circle" style={{ color: '#e0e0e0', fontSize: "0.16rem" }} />:null}
                                    className="wechat-form-input" placeholder="登录密码" />
                                </div>
                            )}
                        </FormItem>
                        <p className="wechat-btn-class" onClick={this.handleSubmit}>绑定并登录</p>
                        <p className="wechat-btn-cancel" onClick={this.closeWindow}>取消</p>
                    </Form>
                </div>:null))}
            </React.Fragment>
        )
    }
}

const IndexForm = Form.create()(Index);

export default IndexForm;
