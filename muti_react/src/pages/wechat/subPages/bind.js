import React, { Component } from "react";
import { message } from "antd";
import { get } from "../../../fetch/get";
import { getQueryString, appId, pageUrl } from "../../../utils/common";
import loginImg from "../../../images/wechat/login.png";

class Index extends Component {
    state = {
        hasBound: "1"
    }
    
    componentDidMount() {
        const redirects = getQueryString(window.location.href);
        
        if(!redirects.code){
            let redirect_uri = pageUrl + "/wechat.html?from=bind#/bind";
            let wechatUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+(redirects.appId || appId)+"&redirect_uri=";
            wechatUrl += encodeURIComponent(redirect_uri) + "&response_type=code&scope=snsapi_userinfo";
            wechatUrl += "&state="+ redirects.uniqueSign +";"+ redirects.username +"#wechat_redirect";
            window.location.href = wechatUrl;
        }else{
            // 获取用户信息和登录 
            document.title = "绑定微信";
            get("/save/wechat/saveWechat?uniqueSign="+ redirects.state.split(";")[0] +"&code="+redirects.code).then(response => response.json()).then((res) => {
                if(res.state == 200) {
                    this.setState({
                        hasBound: "2"
                    })
                }
            })
        }
    }

    handleBind = () => {
        const redirects = getQueryString(window.location.href);
        get("/save/wechat/bindUser?uniqueSign="+ redirects.state.split(";")[0] +"&userName="+ redirects.state.split(";")[1])
            .then(response => response.json()).then((res) => {
            if(res.state == 200) {
                this.props.history.push("success");
            }else{
                message.destroy();
                message.error(res.data);
            }
        })
    }

    closeWindow = () => {
        wx.closeWindow();
    }

    render() {
        return (
            <React.Fragment>
                {this.state.hasBound == "1"?null:<div className="wechat-login-wrap">
                    <img className="wechat-login-img" src={ loginImg } />
                    <p className="wechat-login-text">将授权使用您的账号绑定该应用</p>
                    <p className="wechat-btn-class" onClick={this.handleBind}>确认绑定</p>
                    <p className="wechat-btn-cancel" onClick={this.closeWindow}>取消</p>
                </div>}
            </React.Fragment>
        )
    }
}

export default Index;
