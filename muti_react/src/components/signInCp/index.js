import React, { Component } from "react";
import { getCookie } from "../../utils/common";
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
//判断浏览器是否支持placeholder
const isPlaceholderSupport = "placeholder" in document.createElement("input");

class NormalLoginForm extends Component {
    state = {
        userName: getCookie("username") || "",
        password: "",
        userNameError: false,
        passwordError: false,
        hasModify: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.hasModify && this.validateForm()){
            const submitData = {
                userName: this.state.userName,
                password: this.state.password
            }
            //登录判断
            const loginResult = this.props.handleSignIn(submitData);
        }
    }

    validateForm = () => {
        let valid = true;
        const { userName, password } = this.state;
        if(userName == "" || userName == this.props.userPlaceHolder){
            valid = false;
        }
        if(password == "" || password == this.props.pwdPlaceHolder){
            valid = false;
        }
        return valid;
    }

    handleFocus = (name, e) => {
        var target = e.target;
        target.style.borderColor = this.props.btnColor;
        if(isPlaceholderSupport) return;
        const targetPlaceholder = target.getAttribute("placeholder");
        if(this.state[name] != "" && this.state[name] !== targetPlaceholder) return;
        if(target.getAttribute("inittype") == "password"){
            target.setAttribute("type", "password");
        }
        this.setState({
            [name]: ""
        })
    }

    handleBlur = (name, e) => {
        var target = e.target;
        target.style.borderColor = "#c8c8c8";
        if(isPlaceholderSupport) return;
        const targetPlaceholder = target.getAttribute("placeholder");
        if(this.state[name] != "" && this.state[name] !== targetPlaceholder) return;
        if(target.getAttribute("inittype") == "password"){
            target.setAttribute("type", "text");
        }
        this.setState({
            [name]: targetPlaceholder
        })
    }

    handleChange = (name, e) => {
        const value = e.target.value;
        this.setState({
            [name]: value,
            hasModify: true,
            [name+"Error"]: value === ""?true:false
        })
        this.props.hideErr();
    }

    componentDidMount() {
        if(!isPlaceholderSupport){
            this.setState({
                userName: getCookie("username") || this.props.userPlaceHolder,
                password: this.props.pwdPlaceHolder
            })
        }
    }

    //打开外链
    openOuterLink = url => {
        window.location.href = url;
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={ this.handleSubmit } className="login-form">
                <FormItem 
                    validateStatus={this.state.userNameError?"error":""}
                    help={this.state.userNameError?this.props.userPlaceHolder:""}>
                    <Input
                        type="text"
                        className={ this.props.userClass }
                        placeholder={ this.props.userPlaceHolder } 
                        autoComplete="off"
                        inittype="text"
                        value={this.state.userName}
                        onFocus={(e) => this.handleFocus("userName", e)}
                        onBlur={(e) => this.handleBlur("userName", e)}
                        onChange={(e) => this.handleChange("userName", e)}
                        style={{color: this.props.btnColor, borderColor: "#c8c8c8"}}
                    />
                </FormItem>
                <FormItem
                    validateStatus={this.state.passwordError||this.props.showErr?"error":""}
                    help={this.state.passwordError?this.props.pwdPlaceHolder:(this.props.showErr?"账号密码有误":"")}>
                    <Input
                        type={isPlaceholderSupport?"password":"text"}
                        autoComplete="off"
                        className={ this.props.pwdClass }
                        placeholder={ this.props.pwdPlaceHolder }
                        inittype="password"
                        value={this.state.password}
                        onFocus={(e) => this.handleFocus("password", e)}
                        onBlur={(e) => this.handleBlur("password", e)}
                        onChange={(e) => this.handleChange("password", e)}
                        style={{color: this.props.btnColor, borderColor: "#c8c8c8"}}
                    />
                    <a 
                        className="forgetpwd"
                        style={{color:this.props.btnColor}}
                        onClick={ () => this.openOuterLink("./forgetChangePwd.html#/newmodifypwd") }
                    >
                        忘记密码？
                    </a>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Checkbox
                            className="remind-account"
                        >
                            记住账号
                        </Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="buttons" style={{backgroundColor:this.props.btnColor,borderColor:this.props.btnColor}}>
                        登&nbsp;&nbsp;&nbsp;&nbsp;录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
