import "whatwg-fetch";
import React, { Component } from "react";
import { Modal } from "antd";

/* 保留固定字数字符串 */
export const getSubStringSum = (str = "", num = 1) => {
    let newStr;
    
    if(typeof str !== "string") {
        str = str.toString().trim();
    }

    if (str.trim().length > num) {
        newStr = str.trim().substring(0, num) + "...";
    } else {
        newStr = str.trim();    
    }

    return newStr;
}

/* 空格转义 */
export const setNewHtml = (str) => {
    str = str ? str.replace(/\n/g, "<br>") : "暂无";
    return { __html: "<p>" + str + "</p>" };
}

/* 设置cookie */
export const setCookie = (name, value, iDay) => {
    const oDate = new Date();

    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
}

/* 获取cookie */
export const getCookie = name => {
    const arr = document.cookie.split('; ');
    
    for(let i = 0; i < arr.length; i++) {
        const arr2 = arr[i].split('=');

        if (arr2[0] == name) {
            return arr2[1];
        }
    }

    return '';
}

/* 删除Cookie */
export const deleteCookie = name => {
    setCookie(name, '', -1);
}

/* 获取url参数 */
export const getQueryString = (str) => {
    //取得查询字符串并去掉开头的问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        args = {},
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;

    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent((item[1]));

        if (name.length) {
            args[name] = value;
        }
    }
    
    return args;
}

export const check = (type,value) => {
	let reg;
	switch (type){
        case "证件号码":
		case "身份证号码":
            // reg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
			reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
			break;
        case "移动电话":
		case "手机号码":
            // reg=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			reg=/^1[345789]\d{9}$/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
			break;
		case "家庭电话":
			reg=/^0\d{2,3}-?\d{7,8}$/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
			break;
		case "电子邮箱":
			reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
			break;
		case "邮箱":
            // reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			reg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if(reg.test(value)){
				return true;
			}else{
				return false;
			}
			break;
		default:
			return true;
			break;
	}
}

const getRootFun = () => {
    let path = window.location.pathname;
    let p = path.split("hunter");
    return (p.length==1?"/wt/runner/":p[0])+"hunter/bg";
}

export const getRoot = getRootFun();

const hostname = window.location.hostname;
const port = window.location.port == ""?"":":"+window.location.port;
const urlY = `http://${hostname}${port}`;

export const getLogo = urlY + getRoot + "/common/logo";
export const getQrCode = urlY + getRoot + "/common/qrCode";

const getPageset = () =>{
	let path = urlY+getRoot+"/common/pageSet";
    const result = fetch(path, {
        method: "POST",
        credentials: "include",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: ""
    });
	result.then(res => res.json())
    .then(data => {
		return data.data;
    });
}
// export const getTheme = getPageset();
// 微信公众号AppId
// export const appId = "wxd0c4bfd889805b2d";    //开发环境
export const appId = "wx6f70f33f79ca58be";    //正式测试环境
// 获取页面实际路径
const getRealUrl = function(){
    let currentUrl = window.location.href.split("hunter");
    let rootUrl = currentUrl.length>1?(currentUrl[0]+"hunter"):window.location.origin;
    return rootUrl;
}

export const pageUrl = getRealUrl();

export const getPath = urlY + getRoot;

//颜色转换16进制转rgba
export function hex2Rgba(hex, opacity) {
	if(!hex) return hex || "#18BAE2";
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + (opacity || "1") + ")"; 
}

export function confirmBox({title="提示",content="内容",okText="确定",cancelText="取消",onOk=function(){},onCancel=function(){}}){
	Modal.confirm({
	    title: title,
	    footer:null,
	    className:"confirm_box",
	    content: <div dangerouslySetInnerHTML={{__html:content}}></div>,
	    iconType:null,
	    okText: okText,
		cancelText: cancelText,
	    onOk:onOk,
	    onCancel:onCancel
	});
	setTimeout(function(){
		let btnPri = document.getElementsByClassName("confirm_box")[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[1];
		let btnCan = document.getElementsByClassName("confirm_box")[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0];
		btnPri.style.backgroundColor=localStorage.themeColor;
		btnPri.style.borderColor=localStorage.themeColor;
		btnPri.style.boxShadow="0 10px 10px "+ hex2Rgba(localStorage.themeColor, "0.3");
		btnCan.onmouseover=function(){
			this.style.borderColor=localStorage.themeColor;
			this.style.color=localStorage.themeColor;
		};
		btnCan.onmouseout=function(){
			this.style.borderColor="#d9d9d9";
			this.style.color="rgba(0, 0, 0, 0.65)";
		};
	});
}