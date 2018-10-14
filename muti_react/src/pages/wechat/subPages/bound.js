import React, { Component } from "react";
import boundImg from "../../../images/wechat/bound.png";

class Subs extends Component {
	componentDidMount() {
        document.title = "扫码登录";
	}

    render() {
        return (
            <div className="wechat-bind-fail">
                <img className="wechat-fail-img" src={ boundImg } />
                <p>您好!您已微信绑定过该账号</p>
                <p>请在PC端解绑之后在进行绑定！</p>
            </div>
        )
    }
}

export default Subs;
