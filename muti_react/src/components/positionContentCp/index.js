import React, { Component } from "react";
import { Spin } from "antd";

import "./styles";

const gotoCandidate = (postId,name,annulusId)=>{
	let ai = annulusId==""?"00":annulusId;
	localStorage.setItem("activeKey","2");
	window.open(`./candidate.html#/?postId=${postId}&postName=${name}&annulusId=${ai}`);
}

const positionContentCp = ({ positionListArr }) => {
	let arr = positionListArr.annulusNumList||[];
    return (
        <div className="positioncp-content-box">
            <div className="position-content-list clearfix">
                <div className="left-box" style={{width: positionListArr.showRecruiter ? "480px" : "700px"}}>
                    <a href="">
                        <p className="post-name">
                            {positionListArr.postName || "暂无"}
                            <i style={{ visibility: positionListArr.new?"visible":"hidden" }} className="postnew" > </i>
                        </p>
                    </a>
                    <div className="post-detail clearfix">
                        <strong className="salary" style={{color: localStorage.themeColor}}>
                            {positionListArr.workingTreatment || "薪资暂无数据"}
                        </strong>
                        <div className="post-mes" style={{ width: positionListArr.showRecruiter ? "330px" : "770px" }}>
                            <span title={positionListArr.workPlace || "暂无"} style={{maxWidth:positionListArr.showRecruiter ? "25%":"12%"}}>{positionListArr.workPlace || "暂无"}</span>
                            <span title={positionListArr.orgName || "暂无"} style={{maxWidth:positionListArr.showRecruiter ? "25%":"12%"}}>{positionListArr.orgName || "暂无"}</span>
                            <span title={positionListArr.education || "暂无"} style={{maxWidth:positionListArr.showRecruiter ? "25%":"12%"}}>{positionListArr.education || "暂无"}</span>
                            <span title={positionListArr.recruitNum || "暂无"} style={{maxWidth:positionListArr.showRecruiter ? "25%":"12%"}}>招聘{positionListArr.recruitNum || 0}人</span>
                            <i style={{display: positionListArr.showRecruiter ? "none" : "inline"}}>
	                            <span title={positionListArr.publishDate || "暂无"} style={{maxWidth:"26%"}}>发布时间：{positionListArr.publishDate || "暂无"}</span>
	                            <span title={positionListArr.expectEntryDate || "暂无"} style={{maxWidth:"26%"}}>
		                            {
		                                positionListArr.expectEntryDate ? `期望到岗时间: ${positionListArr.expectEntryDate}`:""
		                            }
	                            </span>
                            </i>
                        </div>
                    </div>
                    <div className="post-time" style={{display: positionListArr.showRecruiter ? "block" : "none"}}>
                        <span className="release-time">
                            发布时间：{positionListArr.publishDate || "暂无"}
                        </span>
                        <span className="duty-time">
                            {
                                positionListArr.expectEntryDate ? `期望到岗时间: ${positionListArr.expectEntryDate}`:""
                            }
                        </span>
                    </div>
                </div>
                <div className="right-box" style={{float: "right"}}>
                    <ul className="bussiness-card" style={{display: positionListArr.showRecruiter ? "block" : "none"}} >
                        <li className="name">
                            <span>{positionListArr.recruiterName || "暂无"}</span>
                            <span style={{color: localStorage.themeColor}}>招聘负责人</span>
                        </li>
                        <li className="tel">
                            {positionListArr.recruiterPhone || "暂无"}
                        </li>
                        <li className="mail" style={{height: "14px"}}>
                            {positionListArr.recruiterEmail || "暂无"}
                        </li>
                    </ul>
                </div>
                <ul className="center-box" style={{float: "right"}}>
                    {
                    	arr.map(function(n){
                    		return (
                    			<li key={n.annulusId+""} onClick={()=>{gotoCandidate(positionListArr.postId,positionListArr.postName,n.annulusId)}}>
                                    <strong style={{color: localStorage.themeColor}}>{n.annulusNum}</strong>
                                    <span>{n.annulusName}</span>
                                </li>
                    		)
                    	})	
                    }
                </ul>
            </div>
        </div>
    )
}

export default positionContentCp;
