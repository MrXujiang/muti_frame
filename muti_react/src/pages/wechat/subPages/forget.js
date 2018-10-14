import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
const FormItem = Form.Item;

class Index extends Component {
    state = {
        changeLoginMode: true
    }
    
    componentDidMount() {
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="App-main">
                <h1>重置密码</h1>
                <Form>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{
                                required: true, message: '请输入账号邮箱',
                            }],
                        })(
                            <Input className="wechat-input-class" placeholder="请输入账号邮箱" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" className="wechat-btn-class">确认</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const IndexForm = Form.create()(Index);

export default IndexForm;