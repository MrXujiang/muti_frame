import React, { Component } from "react";
import "./styles";

/* Steps的props
* current: 当前的步骤step，number
* status: 完成的主题色，string
* style: Steps的样式，object
*/

class Steps extends Component {
    state = {
        current: this.props.current || 0,
        steps: []
    }

    componentDidMount() {
        this.init();
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
    }

    init = (newProps) => {
        const children = newProps?newProps.children:this.props.children;
        const current = parseInt(this.state.current), len = children.length;
        let steps = [];
        children.map((item, index) => {
            steps.push({
                icon: item.props.icon,
                status: item.props.status,
                title: item.props.title,
                description: item.props.description,
                completed: index < current,
                current: index == current && index != len - 1
            })
        })
        this.setState({ steps });
    }
    
    render() {
        return (
            <div className="ct-steps-wrap" style={this.props.style}>
                {
                    this.state.steps.map((item, index) => {
                        // 处理颜色
                        let trailColor, iconDotColor, contentColor;
                        if(item.completed){
                            trailColor = this.props.status;
                            iconDotColor = item.status?item.status:this.props.status;
                            contentColor = item.status?item.status:this.props.status;
                        }else if(item.current){
                            iconDotColor = item.status?item.status:this.props.status;
                            contentColor = item.status?item.status:this.props.status;
                        }else{
                            iconDotColor = item.status;
                            contentColor = item.status;
                        }
                        return (
                            <div className={"ct-step-item "
                                + (item.completed?"ct-step-completed":item.current?"ct-step-current":"")}
                                key={"step_" + index}>
                                <div className="ct-step-trail" style={{
                                    backgroundColor: trailColor}}></div>
                                <div className="ct-step-icon">
                                    {item.icon || <span className="ct-step-dot" style={{
                                        backgroundColor: iconDotColor
                                    }}></span>}
                                </div>
                                <div className="ct-step-content">
                                    <div className="ct-step-title" style={{
                                        color: contentColor
                                    }}>{item.title}</div>
                                    <div className="ct-step-description" style={{
                                        color: contentColor
                                    }}>{item.description}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

/* Step的props
* icon: 步骤图标的类型，ReactNode
* status: 步骤图标和文字的颜色，若未设置，可从父组件获取，string
* title: 标题，string或者ReactNode
* content: 描述，string或者ReactNode
*/

class Step extends Component {
    render() {
        return null;
    }
}

Steps.Step = Step;

export default Steps;