import React, { Component } from "react";
import { Select } from 'antd';
import ResumeItem from "./resumeItem";

const { Option } = Select;

function Resumedetail(props) {
	const handleChange = (value, option) => {
		console.log("handleChange: ", value, option)
	}

	let list = [] , personInfo = {};
	props.data.resumeInfo.map((item, index) => {
		item.resumeInfoVOs != null && list.push(
			<ResumeItem key={index} data={item} />
		);
	})
	return(
        <div className="resumedetail-box">
        	<div className="resumedetail-lang">
        		{/*<Select defaultValue="1" style={{ width: 100 }} onChange={handleChange}>
				    <Option value="1">中文简历</Option>
				    <Option value="2">英文简历</Option>
			  	</Select>*/}
        	</div>
            {list}
        </div>
    )
}

export default Resumedetail;