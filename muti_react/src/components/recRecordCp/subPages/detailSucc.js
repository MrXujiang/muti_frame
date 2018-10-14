import React, { Component } from "react";
import StepComponent from "../../StepComponents";
import { Input, Timeline } from "antd";
import { hex2Rgba } from "../../../utils/common";

class DetailSucc extends Component{
	constructor(props) {
		super(props);
	}
	
	handleRemark = (id,postId,applyId,show)=>{
		let ai = applyId!=null?applyId:"";
		let pi = postId!=null?postId:"";
		let wi = id!=null?id:"";
		localStorage.setItem('applyId', ai+"");
		localStorage.setItem('postId', pi+"");
		localStorage.setItem('webResumeId', wi+"");
		localStorage.setItem('show', show+"");
		localStorage.setItem("activeKey","2");
		window.open("./candidate.html#/candidateresdel/:"+id);
	}
	
	render(){
		const _this = this;
		return (
			<React.Fragment>
				<Timeline.Item color={localStorage.themeColor}>
					<span className="nowtime">{this.props.time}</span>
					{
						this.props.data.map((item, index)=>{
							return (
								<div key={item.applyDate +"_"+ index} className="detail-box clearfix">
			                        <div className="process-box">
			                            <p className={`title ${item.isShowApplyStatus?"":"no_step"}`}>
			                                <span className="name" onClick={()=>_this.handleRemark(item.userResumeId,item.postId,item.applyId,"close")}> {item.userName} </span>
			                                <span style={{visibility:item.isShowApplyStatus?"visible":"hidden"}} className="source">{item.annulusName?(item.annulusName+"-"):""}{item.applyStatusDesc||""}</span>
			                                <span className="region">
			                                    {item.postName||"暂无"}
			                                </span>
			                                <span className="changed-time" style={{visibility:item.changeApplyStatusDate?"visible":"hidden"}}>
			                                    环节变更时间：{item.changeApplyStatusDate||"暂无"}
			                                </span>
			                                <span className="odd-time" style={{visibility:item.protectPeriod?"visible":"hidden"}}>
			                                    剩余保护期：{item.protectPeriod||"-"}天
			                                </span>
										</p>
										<div className="step-box" style={{ width: "100%",display:item.isShowApplyStatus?"block":"none",maxWidth:"800px",overFlow:"auto" }}>
											<StepComponent
												stepsArr={item.applyFlow || []}
												process={item.applyStatus}
											/>
										</div>
									</div>
									{
										item.applyRemark!=null&&
										<span className="showMessage" onClick={() => _this.handleRemark(item.userResumeId,item.postId, item.applyId,"open")}>
											<strong style={{backgroundColor: localStorage.themeColor,
                                    			boxShadow: "0 10px 10px "+ hex2Rgba(localStorage.themeColor, "0.3")}}>
												<i style={{ visibility: item.applyRemark.existNotRead ? "visibile" : "hidden" }}></i>
											</strong>
											<span className="text" style={{color: localStorage.themeColor}}>
												{item.applyRemark.remarkNum}条反馈信息
				                            </span>
										</span>
									}
								</div>
							)
						})
					}
				</Timeline.Item>
			</React.Fragment>
		)
	}
}

export default DetailSucc;