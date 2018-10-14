import React, { Component } from "react";
import ShowMoreBtn from "./showMoreBtn";
import FormItem from "./formItem";
import { Icon } from 'antd';

function ResumeItem(props) {
	//判断是否显示新增一条记录的按钮
	function chargeAdd(name){
		// let arr = ["培训经历","教育经历","项目经验","语言能力","证书","工作经历"];
		let arr = [15, 14, 40, 43, 44, 19];
		if(arr.indexOf(name) !== -1){
			return "block"
		}else{
			return "none"
		}
	}

	return (
		<div id={ props.item.id +"" }>
			<h1>
				<span>{ props.item.name }</span>
				<div className="divider"></div>
				<ShowMoreBtn name={ props.item.id +"" } 
					showMore={() => props.showMore(props.item.id, props.showBlock[props.item.id])} />
			</h1>
			<p style={{display: props.item.remark && props.item.remark != ""?"block":"none"}}
				className="text_remark">{`注：${props.item.remark || ""}`}</p>
			<div style={{display: props.showBlock[props.item.id] || "block"}}>
				{
					props.item.infoItemList.map((infoItem, infoItemIndex) => {
						if(infoItem.length == 0) return null;
						return (
							<div className="main_block-input apply_input" key={infoItemIndex}>
								{infoItemIndex !== 1?<span className="removeItem ant-modal-close-x" onClick={()=>{props.removeItem(props.item.id,infoItemIndex)}} style={{display: chargeAdd(props.item.id)}}></span>:''}
								{
									infoItem.map((info, infoIndex) => {
										return (
											<FormItem item={info} key={infoIndex}
												isNeedRequired={props.isNeedRequired}
												filterCustomData={props.filterCustomData}
												handleChangeParam={props.handleChangeParam}
												formData={props.formData}
												dataSourceValue={props.dataSourceValue}
												customData={props.customData}
												chooseFile={props.chooseFile}
												finish={props.finish}
												lanType={props.lanType}
												getSchool={props.getSchool}
												handleFocus={props.handleFocus}
												formItemId={props.resumeItemId +"_"+ info.id +"_"+ infoItemIndex}
												 />
										)
									})
								}
							</div>
						)
					})
				}
			</div>
  			<div style={{ display: chargeAdd(props.item.id), color: localStorage.themeColor}}
  				className="add_edu-btn" onClick={()=>{props.addItem(props.item.id)}}>
				<Icon type="plus-circle-o" />
				<span>{props.lanType=="1"?"增加更多":"More "}{props.item.name}</span>
			</div>
		</div>
	)
}

export default ResumeItem;