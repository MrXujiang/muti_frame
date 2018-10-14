import React from "react";
import { hex2Rgba } from '../../utils/common';
// import { Steps } from "antd";

// const Step = Steps.Step;

import Steps from "../steps";
const { Step }  = Steps;

import "./styles";


const StepComponent = ({ stepsArr, process }) => {
	let index = 0;
	for(let i = 0;i<stepsArr.length;i++){
		if(process === stepsArr[i].applyStatus){
			index = i;
		}
	}
	let stepList = [];
    stepsArr.map((s, i) => {
//  	const flag = (i<(index-2)||i>(index+2));//显示当前环节，富余显示前后两个环节名称及日期，其他环节鼠标移入显示环节名称及时间
    	const show = (i>index);//判断是否是未经历的环节
    	if(i == (stepsArr.length-1) && stepsArr.length != 1){
    		stepList.push(
    			<Step
    				key={i}
    				className="finish_step"
                    status={index>=i?localStorage.themeColor:""}
	                title={s.applyStatusDesc||"暂无"}
	                description={show?"":(s.addDate||"暂无")}
	            />
    		);
    	}else{
//  		if(flag){
//	    		stepList.push(
//	    			<Step
//	    				key={i}
//						className="hide_step"
//		                title={s.applyStatusDesc||"暂无"}
//		                description={show?"":(s.addDate||"暂无")}
//		            />);
//	    	}else{
                const currentIcon = (<span className="custom-step-icon" style={{
                    boxShadow: "0 0 0 2px " + localStorage.themeColor
                }}>
                    <i className="custom-step-icon-before" style={{
                        borderLeftColor: localStorage.themeColor
                    }}></i>
                    <i className="custom-step-icon-after" style={{
                        backgroundColor: localStorage.themeColor
                    }}></i>
                </span>);
	    		stepList.push(
	    			<Step
	    				key={i}
                        icon={index == i?currentIcon:null}
                        status={index>=i?localStorage.themeColor:""}
		                title={s.applyStatusDesc||"暂无"}
		                description={show?"":(s.addDate||"暂无")}
		            />);
//	    	}
    	}
    });

    return(
        <React.Fragment>
            {stepList.length == 1?<div className="stepLine"></div>:null}
            <Steps
            	progressDot
                current={ index }
                size="small"
                status={hex2Rgba(localStorage.themeColor, "0.25")}
            >
                {stepList}
            </Steps>
        </React.Fragment>
    )
}

export default StepComponent;