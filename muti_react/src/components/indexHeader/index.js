import React, { Component } from "react";
import { Layout, Menu, Badge, Dropdown, Icon } from "antd";
import { getSubStringSum,getLogo } from "../../utils/common";
import ImgBox from "./subpages/ImgBox";
import MenuComponent from "./subpages/MenuComponent";
import RightBox from "./subpages/RightBox";
import { get } from "../../fetch/get";
import { pageSet } from "../../fetch/common/index"
import { getLogout, getName } from "../../fetch/home";

const { Header } = Layout;

import "./styles";
import "../../styles/iconfont/iconfont.css";
import {headerLogo,headerNotify,headerChangePwd,headerSignout} from "../../utils/imageGroup";

class IndexHeader extends Component {
    state = {
        menuList: [],
        textColor:"",
        getNames: ""
    }

    componentDidMount() {
        get("/auth/common/column").then(response => response.json()).then(data => {
            this.setState({
                menuList: data.data
            })
        })
        const result = pageSet();
		result.then(res => res.json())
        .then(data => {
            localStorage.themeColor = data.data.themeColor || "#18BAE2";
        	this.setState({
        		textColor:data.data.themeColor
        	})
        });
        /* 获取用户信息 */
        const getNameResult = getName({}, data => {
            this.setState({
                getNames: data.data
            });
        });
    }

    openOuterLink = url => {
        window.location.href = url;
    }

    getDate = () => {
        let d = new Date();
        return d.getDate();
    }

    /* 退出登录 */
    handleLogout() {
        const logoutResult = getLogout();

        logoutResult
        .then(response => response.json())
        .then(data => {
            if(data.state == 200) {
                sessionStorage.removeItem("show");
                window.location.href = "./signin.html";
            }
        });
    }

    //修复个人信息下拉被遮挡的bug
    fixedDropdown = (visible) => {
        if(visible){
            document.querySelector(".index-header-box").style.zIndex = 1049;
        }else{
            setTimeout(() => {
                document.querySelector(".index-header-box").style.zIndex = 1051;
            }, 300)
        }
    }

    render() {
        const getDate = this.getDate();
        /* 下拉内容框 */
        const menu = (
            <Menu>
                <Menu.Item>
                    <a 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => this.openOuterLink("./pwdmanage.html#/modifypwd") }
                    >
                        <Icon type="edit" className="icon_wechat" style={{fontSize:"18px",color: localStorage.themeColor}} />
                        <span className="munu-item" style={{color: localStorage.themeColor}}>修改密码</span>
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => this.openOuterLink(`./pwdmanage.html?d=${getDate}#/modifypwd?2`) }
                    >
                        <i className="iconfont icon-wechat icon_wechat" style={{
                            fontSize:"18px",
                            display: "inline",
                            fontWeight: "bold",
                            color: localStorage.themeColor
                        }}></i>
                        <span className="munu-item" style={{color: localStorage.themeColor}}>绑定微信</span>
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={ this.handleLogout }
                    >
                        <Icon type="upload" className="icon_wechat" style={{fontSize:"18px",color: localStorage.themeColor}} />
                        <span className="munu-item" style={{color: localStorage.themeColor}}>退出</span>
                    </a>
                </Menu.Item>
            </Menu>
        )

        return (
            <div className="index-header-box">
                <Header className="header">
                    <ImgBox 
                        headerLogo={ getLogo }
                        openOuterLink={ this.openOuterLink }
                    />
                    <MenuComponent
                        menuList={this.state.menuList}
                        titleIndex={ this.props.titleIndex }
                        openOuterLink={ this.openOuterLink }
                        textColor={this.state.textColor}
                        fixedDropdown={this.fixedDropdown}
                    />
                    <RightBox 
                        getNames={ this.state.getNames }
                        headerNotify={ headerNotify }
                        menu={ menu }
                        getSubStringSum={ getSubStringSum }
                        fixedDropdown={this.fixedDropdown}
                    />
                </Header>
            </div>
        )
    }
}

export default IndexHeader;
