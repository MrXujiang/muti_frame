import React, { Component } from "react";

import Info from "../../../images/icons/personal_info_icon.png";
import Eval from "../../../images/icons/personal_evalution_icon.png";
import Work from "../../../images/icons/personal_work_icon.png";
import Expe from "../../../images/icons/personal_experience_icon.png";
import Educ from "../../../images/icons/perosonal_education_icon.png";
import Train from "../../../images/icons/personal_train_icon.png";
import Lang from "../../../images/icons/personal_language_icon.png";
import Addi from "../../../images/icons/personnal_addition_icon.png";

function ResumeItem({ data }) {

	function chargeImg(name){
		switch (name){
			case "persInfo":
				return Info;
				break;
			case "SELF_EVALUA":
				return Eval;
				break;
			case "JOB_INTENTION":
				return Work;
				break;
			case "WORK_EXPE":
				return Expe;
				break;
			case "EDUC_EXPE":
				return Educ;
				break;
			case "PROJECT_EXPE":
				return Train;
				break;
			case "LANG_ABIL":
				return Lang;
				break;
			case "TRAIN_EXPE":
				return Train;
				break;
			case "ADDI_INFO":
				return Addi;
				break;
			default:
				return Addi;
				break;
		}
	}

	function getBasicItem(item){
		return (
			<li>
	            <span className="tit">基本信息：</span>
	            <span className="con">
	            	{personInfo["F_NAME"] || ""} 
	            	<span className="split_icon" style={{display:personInfo["婚姻状况"]?"inline":"none"}}>|</span>
	            	{personInfo["婚姻状况"]?`${personInfo["婚姻状况"]}`:""}
	            	<span className="split_icon" style={{display:personInfo["年龄"]?"inline":"none"}}>|</span>
	            	{personInfo["年龄"]?`${personInfo["年龄"]}|`:""}
	            	<span className="split_icon" style={{display:personInfo["户口所在地"]?"inline":"none"}}>|</span>
	            	{personInfo["户口所在地"]?`${personInfo["户口所在地"]}`:""} 
	            	<span className="split_icon" style={{display:personInfo["F_HIGHTEST_DEGREE"]?"inline":"none"}}>|</span>
	            	{personInfo["F_HIGHTEST_DEGREE"] || ""}
	            	<span className="split_icon" style={{display:personInfo["工作年限"]?"inline":"none"}}>|</span>
	            	{personInfo["工作年限"]?`${personInfo["工作年限"]}年`:""}
	            </span>
	        </li>
		)
	}

	let list = [];
	data.resumeInfoVOs.map((item, index) => {
		if(item.fieldName == "F_PHOTO_ID") return;
		item.fieldNameLang!=null && list.push(
			<li key={index} className={item.value_!=null&&item.value_.length>50?"whole-li":"half-li"}>
                <span className="tit" title={item.fieldNameLang}>{item.fieldNameLang}：</span>
                <span className="con" dangerouslySetInnerHTML={{__html: item.value_}}>
                </span>
            </li>
		);
	})

	return(
		<div className="resume-list">
            <h2>
                <img src={chargeImg(data.standardCode)} alt="" />{data.setName}
            </h2>
            <ul className="content-ul clearfix">
            	{list}
            </ul>
        </div>
	)
}

export default ResumeItem;