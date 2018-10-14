import React, { Component } from "react";
import StepComponents from "../StepComponents";

import "./styles";

const candidateResDelCp = ({ stepsArr, process , data }) => {
	const flows = data.personInfo.flows||[{applyStatus:0}];
    return(
        <div className="candidate-res-del-box">
            <div className="personal-information">
                <div className="left-box">
                    <div className="person-imgbox">
	                    {
	                    	data.personInfo.photoUrl?
	                    	<img src={data.personInfo.photoUrl || "../../images/imgs/user.png"} alt=""/>:
	                    	<div className="user_head"></div>
	                    }
                    </div>
                    <div className="person-info">
                        <p className="name">{data.personInfo.userName || "暂无"}</p>
                        <ul className="basic">
                            <li>{data.personInfo.gender || "暂无性别"}</li>
                            <li>{data.personInfo.workYear || "-"}工作经验</li>
                        </ul>
                        <ul className="basics">
                            <li>{data.personInfo.mobilePhone || "暂无"}</li>
                            <li>{data.personInfo.email || "暂无"}</li>
                        </ul>
                    </div>
                </div>
                <div className="right-box candidate_flow">
                    <h1>{data.personInfo.postName || "暂无"}</h1>
                    <div className="step-box" style={{display:data.isShowApplyStatus?"block":"none"}}>
                        <StepComponents 
                            stepsArr={ flows }
                            process={ data.personInfo.applyStatus}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default candidateResDelCp;