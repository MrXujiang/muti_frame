import React, { Component } from "react";
import { getQueryString } from "../../../utils/common";
import successImg from "../../../images/wechat/success.png";

class Subs extends Component {
    state = {
        successText: ""
    }

    componentDidMount() {
        const redirects = getQueryString(window.location.href);
        document.title = redirects.from === "bind"?"绑定成功":"登录成功";
        this.setState({
            successText: redirects.from === "bind"?"绑定成功，请刷新PC页面!":"登录成功！"
        })
    }

    render() {
        return (
        	<div className="wechat-bind-success">
        		<img className="wechat-success-img" src={ successImg } />
                <p>{this.state.successText}</p>
            </div>
        )
    }
}

export default Subs;
