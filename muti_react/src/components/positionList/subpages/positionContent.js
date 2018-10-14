import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spin, Tooltip, Modal, Icon } from "antd";
import { hex2Rgba,confirmBox } from "../../../utils/common";
import recommendIcon from "../../../images/icons/recommend-icon.png";

const gotoCandidate = (postId,name,annulusId)=>{
	let ai = annulusId==""?"00":annulusId;
	localStorage.setItem("activeKey","2");
	window.open(`./candidate.html#/?postId=${postId}&postName=${name}&annulusId=${ai}`);
}
const open = (func,url,id,flag)=>{
	if(!flag){
		func(url,id);
	}else{
//		Modal.confirm({
//		    title: '提示',
//		    content: "HR未接受简历前，系统会隐藏联系方式哦！",
//		    iconType:"info-circle",
//		    okText: '确定',
//			cancelText: '取消',
//		    onOk:function(){
//		    	func(url,id);
//	    	}
//		});
  		confirmBox({
  			title:'提示',
	  		content:"HR未接受简历前，系统会隐藏联系方式哦！",
	  		onOk:function(){
	  			setTimeout(() => {
  					func(url,id);
	  			}, 300)
  			}
  		});
	}
}


const handleMouseEnter = (e) => {
	console.log("handleMouseEnter: ", e.target)
}

const positionContent = ({ isLoading, positionListArr, openLink, states,name }) => {
    return (
        <div className="position-content-box">
            {
                isLoading ?
                    <Spin 
                        tip="Loading..."
                        size="large"
                        indicator={<Icon type="loading" style={{color: localStorage.themeColor}} />}
                		style={{color: localStorage.themeColor}}
                    />
                    :
                    <React.Fragment>
                    {
                    	positionListArr.length>0?
                    	<React.Fragment>
	                    	{
	                            positionListArr && positionListArr.map((item, index) => {
	                                return(
	                                    <div 
	                                        className="position-content-list clearfix"
	                                        key={ index }
	                                    >
	                                        <Link
	                                            className="left-box" style={{
	                                                    width: states.showRecruiter ? "480px" : "698px"
	                                                }}
                                                to={ "/positiondetail/" + item.postId + "/" + name +"/"}
	                                        >
                                                <p className="post-name">
                                                    <span>{ item.postName || "暂无" }</span>
                                                    <i
                                                        style={{
                                                            display: item.new ? "inline-block" : "none"
                                                        }}
                                                    >
                                                        NEW
                                                    </i>
                                                </p>
	                                            <div className="post-detail clearfix">
	                                                <strong className="salary" style={{color: localStorage.themeColor}}>
	                                                    { item.workingTreatment || "薪资暂无" }
	                                                </strong>
	                                                <div title={`${item.workPlace||"暂无"}|${item.orgName||"暂无"}|${item.education||"暂无"}|${item.recruitNum||0}`} className="post-mes"  style={{
	                                                    maxWidth: states.showRecruiter ? "400px" : "500px"
	                                                }}>
		                                                    <span>{ item.workPlace || "暂无" }</span>
		                                                    <span>{ item.orgName || "暂无" }</span>
		                                                    <span>{ item.education || "暂无" }</span>
		                                                    <span>招聘{ item.recruitNum || 0 }人</span>
		                                                </div>
	                                            </div>
	                                            <div className="post-time">
	                                                <span className="release-time">
	                                                    {
	                                                        item.publishDate?`发布时间：${item.publishDate}`:""
	                                                    }
	                                                </span>
	                                                <span className="duty-time">
	                                                    {
	                                                        item.expectEntryDate?`期望到岗时间：${item.expectEntryDate}`:""
	                                                    }
	                                                </span>
	                                            </div>
	                                        </Link>
	                                        <div className="right-box" style={{float: "right"}}>
	                                            <ul className="bussiness-card" style={{
	                                                    display: states.showRecruiter ? "inline-block" : "none",borderLeft: "1px solid #e0e0e0"
	                                                }}>
	                                                <li className="name">
	                                                    <span>{ item.recruiterName || "暂无" }</span>
	                                                    <span style={{color: localStorage.themeColor}}>招聘负责人</span>
	                                                </li>
	                                                <li className="tel">
	                                                    { item.recruiterPhone || "暂无" }
	                                                </li>
	                                                <li className="mail">
	                                                    { item.recruiterEmail || "暂无" }
	                                                </li>
	                                            </ul>
	                                            <div 
	                                                className="recommend-resume"
	                                                style={{
	                                                    display: states.postionTabIndex == 1 ? "none" : "block",float: "right",marginLeft: "10px"
	                                                }}
	                                                onClick={ () => open(openLink,"/resolve", item.postId,item.headhunterHideContact) }
	                                            >
	                                            	<span className="recommend-icon" 
	                                            		style={{backgroundColor: localStorage.themeColor,
	                                            			boxShadow: "0 10px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")}}>
														<img src={recommendIcon} />
	                                            	</span>
	                                                <span>
	                                                    <i style={{color: localStorage.themeColor}}>
	                                                        推荐简历
	                                                    </i>
	                                                </span>
	                                            </div>
	                                        </div>
	                                        <ul className="center-box" style={{float: "right",borderRight: "none"}}>
	                                        {
	                                        	item.annulusNumList.map(function(n){
	                                        		return (
	                                        			<li key={n.annulusId+""} onClick={()=>{gotoCandidate(item.postId,item.postName,n.annulusId)}}>
			                                                <strong style={{color: localStorage.themeColor}}>{n.annulusNum}</strong>
			                                                <span>{n.annulusName}</span>
			                                            </li>
	                                        		)
	                                        	})	
	                                        }
	                                        </ul>
	                                    </div>
	                                )
	                            })
	                        }
	                    	</React.Fragment>:
	                        <div className="finish_block">
	                        	<div className="logo-empty"></div><br/>
						 		<p className="empty_text">抱歉！没有搜索到相关数据！</p>
	                        </div>
                    }
                    </React.Fragment>
            }
        </div>
    )
}

export default positionContent;
