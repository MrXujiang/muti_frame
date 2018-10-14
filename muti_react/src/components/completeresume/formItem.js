import React, { Component } from "react";
import moment from 'moment';
import { Select, Input, Radio, DatePicker, AutoComplete, Checkbox, Icon } from 'antd';
import Cascader from "./cascader";

function FormItem(props) {
	const item = props.item, formItemId = props.formItemId;

	const content = (
		<div className="foot_tip">
		    <Icon type="bulb" /><span>还有必填项未完成哦~</span>
		</div>
	)
	//日期格式转换（moment=> string）
	function chargeDate(param, type, name){
		if(param === "至今" || param === "Till now"){
			const elem = document.getElementsByClassName(name);
			if(elem.length){
				elem[0].getElementsByTagName("input").value = "至今";
			}
		}else{
			if(param.trim().length==0){
				return "";
			}else{
				return moment(param, type);
			}
		}
	}
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
	//获取下拉列表等控件的选项
	function getOptions(param){
		let arr = [];
		for(let i = 0;i<param.length;i++){
			let dom = {
				label: param[i].name, 
				value: param[i].code
			}
			arr.push(dom);
		}
		return arr;
	}
	//将字符串转为数组
	function changeAsArr(str, isArray){
		if(str){
			return str.split(";");
		}else{
			return isArray?[]:{};
		}
	}
	
	function changeSelectValue(param){
		if(typeof param === "string" && param.indexOf("N/") != -1){
			return param.split("N/")[1];
		}else{
			return param;
		}
	}
	// return null;
	return (
		<React.Fragment>
			{
				item.fillType == 1 &&
				<div className="half_block" formitemrequired={item.required && props.isNeedRequired?formItemId:undefined}>
					<div className="label" title={item.name}>
						<i style={{visibility: item.required && props.isNeedRequired?"visible":"hidden"}}
						className="icon_tip">*</i>
						<span>{item.name}</span>
					</div>
					<span className="empty_error">
						{
							item.customDataSource === "school" || item.customDataSource === "subject"?
							<Select style={{ width: 250 }} showSearch={true} notFoundContent={null}
								filterOption={false} onSearch={(value) => props.filterCustomData(value, item.customDataSource)}
								onChange={(value, option)=>{props.handleChangeParam(formItemId, value, item.name, formItemId, option)}}
								onFocus={() => props.handleFocus(item.customDataSource)}
								value={changeSelectValue(props.formData[`${formItemId}_text`] || props.formData[formItemId] || "")}>
						        {
						        	props.customData.map((i) => {
						        		return (
						        			<Select.Option key={i.id} value={i.code}>{i.name}</Select.Option>
						        		)
						        	})
						        }
						    </Select>
							:<Input placeholder={item.remark} className="input_form" 
								value={props.formData[formItemId] || ""} 
								onChange={(e)=>{props.handleChangeParam(formItemId, e.target.value, item.name, formItemId)}} />
						}
					</span>
					<br/>
					<span className="check_text" style={{display:"none"}} id={formItemId}>请输入正确的{item.name}</span>
				</div>
			}
			{
				item.fillType == 2 &&
				<div className="half_block" formitemrequired={item.required && props.isNeedRequired?formItemId:undefined}>
					<div className="label" title={item.name}>
						<i style={{visibility: item.required && props.isNeedRequired?"visible":"hidden"}}
							className="icon_tip">*</i>
						<span>{item.name}</span>
					</div>
					<span className="empty_error">
						<DatePicker className={formItemId} placeholder={props.remark} 
							value={chargeDate(props.formData[formItemId] || "", "YYYY-MM-DD", formItemId)}
							onChange={(date, dateString) => {props.handleChangeParam(formItemId, dateString, item.name, formItemId)}} />
					</span>
					<span id={formItemId}></span>
				</div>
			}
			{
				item.fillType == 3 &&
				<div className="half_block" formitemrequired={item.required && props.isNeedRequired?formItemId:undefined}>
					<div className="label" title={item.name}>
						<i style={{visibility: item.required && props.isNeedRequired?"visible":"hidden"}}
							className="icon_tip">*</i>
						<span>{item.name}</span>
					</div>
					<div className="source_block">
						<span className="empty_error">
							<Radio.Group
								onChange={(e) => {props.handleChangeParam(formItemId, e.target.value, item.name,formItemId)}}
								value={props.formData[formItemId] || ""}>
						        {
						        	props.dataSourceValue[item.dataSource].map((i) => {
						        		return (
						        			<Radio key={i.code} value={i.code}>{i.name}</Radio>
						        		)
						        	})
						        }
						    </Radio.Group>
				    	</span>
					</div>
					<span id={formItemId}></span>
				</div>
			}
			{
				item.fillType == 4 &&
				<div className="half_block" formitemrequired={item.required && props.isNeedRequired?formItemId:undefined}>
					<div className="label" title={item.name}>
						<i style={{visibility: item.required && props.isNeedRequired?"visible":"hidden"}}
							className="icon_tip">*</i>
						<span>{item.name}</span>
					</div>
					<span className="empty_error">
						<Select showSearch
							filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							style={{ width: 250 }} onChange={(value, option) => {props.handleChangeParam(formItemId, value, item.name, formItemId)}}
							value={changeSelectValue(props.formData[formItemId] || "")}>
					        {
					        	props.dataSourceValue[item.dataSource].map(function(i){
					        		return (
					        			<Select.Option key={i.code} value={i.code}>{i.name}</Select.Option>
					        		)
					        	})
					        }
					    </Select>
				    </span>
				    <span id={formItemId}></span>
				</div>
			}
			{
				item.fillType == 5 &&
				<div className={getOptions(props.dataSourceValue[item.dataSource]).length>10?"whole_block":"half_block"}
					formitemrequired={item.required && props.isNeedRequired?formItemId:undefined}>
					<div className="label" title={item.name}>
						<i style={{visibility: item.required && props.isNeedRequired?"visible":"hidden"}}
							className="icon_tip">*</i>
						<span>{item.name}</span>
					</div>
			        <div className={getOptions(props.dataSourceValue[item.dataSource]).length>10?"source_block-whole":"source_block"}>
			        	<span className="empty_error">
	    					<Checkbox.Group value={changeAsArr(props.formData[formItemId], true)}
	    						options={getOptions(props.dataSourceValue[item.dataSource])}
	    						onChange={(checkedValue)=>{props.handleChangeParam(formItemId, checkedValue, item.name, formItemId)}} />
			        	</span>
			        </div>
			        <span id={formItemId}></span>
				</div>
			}
			{
				item.fillType == 6 &&
				<div className="whole_block" formitemrequired={item.required && props.isNeedRequired?formItemId:undefined}>
					<div className="label" title={item.name}>
						<i style={{visibility: item.required && props.isNeedRequired?"visible":"hidden"}}
							className="icon_tip">*</i>
						<span>{item.name}</span>
					</div>
					<span className="empty_error">
			        	<textarea placeholder={item.remark} value={props.formData[formItemId] || ""} 
			        		onChange={(e) => {props.handleChangeParam(formItemId, e.target.value, item.name,formItemId)}} />
					</span>
					<br/>
					<span className="check_text" style={{display:"none"}} id={formItemId}>请输入正确的{item.name}</span>
				</div>
			}
			{
				item.fillType == 7 &&
				<div className="half_block" formitemrequired={item.required && props.isNeedRequired?formItemId:undefined}>
					<div className="label" title={item.name}>
						<i style={{visibility: item.required && props.isNeedRequired?"visible":"hidden"}}
							className="icon_tip">*</i>
						<span>{item.name}</span>
					</div>
					多选列表框
				</div>
			}
			{
				item.fillType == 8 &&
				<div className="half_block" formitemrequired={item.required && props.isNeedRequired?formItemId:undefined}>
					<div className="label" title={item.name}>
						<i style={{visibility: item.required && props.isNeedRequired?"visible":"hidden"}}
							className="icon_tip">*</i>
						<span>{item.name}</span>
					</div>
					{props.formData[formItemId]?
						<span className="empty_error">
							<div className="btn_chooseFile"
								onClick={() => props.chooseFile(formItemId)}>选择文件</div>
							<span className="choosen" title={props.formData[formItemId].name || props.formData[formItemId]}>
								已选文件：{props.formData[formItemId].name || props.formData[formItemId]}
							</span>
						</span>:
						<span className="empty_error">
							<div className="btn_chooseFile"
								onClick={() => props.chooseFile(formItemId)}>选择文件</div>
							<span className="choosen">已选文件：{""}</span>
						</span>
					}
					<Input type="file" style={{display:"none"}} id={`file_${formItemId}`}
						onChange={(e) => {props.handleChangeParam(formItemId, e.target.files[0], item.name, formItemId)}} />
					<span id={formItemId}></span>
				</div>
			}
			{
				item.fillType == 9 &&
				<div className="half_block" formitemrequired={item.required && props.isNeedRequired?formItemId:undefined}>
					<div className="label" title={item.name}>
						<i style={{visibility: item.required && props.isNeedRequired?"visible":"hidden"}}
							className="icon_tip">*</i> 
						<span>{item.name}</span>
					</div>
					<span className="empty_error">
						{
							item.customDataSource === "school" || item.customDataSource === "subject"?
							<Input type="text"
								onClick={()=>props.getSchool(item.id, formItemId, item.customDataSource)} 
								readOnly="readonly" className="input_form"
								value={props.formData[`${formItemId}_text`]}/>:
							(props.finish?<Cascader lanType={props.lanType} 
								dataSource={props.dataSourceValue[item.dataSource]} 
								opt={props.formData[formItemId] || ""}
								changeSelect={(value) => {props.handleChangeParam(formItemId, value, item.name, formItemId)}} />:null
							)
						}
					</span>
					<span id={formItemId}></span>
				</div>
			}
		</React.Fragment>
	)
}

export default FormItem;