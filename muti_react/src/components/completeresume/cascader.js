import React, { Component } from "react";
import { Select } from 'antd';
import { getResumeDicByCode } from "../../fetch/home/complete";

class Cascader extends Component {
	
	state = {
		first:"",
		last:"",
		optList:[]
	}
	//第一级菜单选择
	handleSelect=(value,option)=>{
		const _this = this;
		let lan = parseInt(_this.props.lanType);
		const result = getResumeDicByCode({
			code:value,
			lanType:lan
		});
		result.then(response => response.json())
		.then(data => {
			_this.setState({
				first:value,
				last:"",
				optList:data.data instanceof Array?data.data:[]
			})
		});
	}
	//第二级菜单选择
	handleSelectLast=(value,option)=>{
		const _this = this;
		this.setState({
			last:value 
		},()=>{
			_this.props.changeSelect(value);
		})
	}
	
	initData=()=>{
		const l = this.props.opt;
		const value = l.split("/");
		let f = "";
		if(value.length>1){//更改第一级菜单选择项
			f = `${value[0]}/${value[1]}/${value[2]}`;
			const result = getResumeDicByCode({
				code: f,
				lanType: this.props.lanType
			});
			result.then(response => response.json())
			.then(data => {
				this.setState({
					first: f,
					optList: data.data instanceof Array?data.data:[]
				})
			});
		}
		this.setState({
			first: f,
			last: l
		})
	}
	
	componentDidMount(){
		this.initData();
	}
	
	render(){
		//去掉select值中的“N/”前缀
		function changeSelectValue(param){
			if(param.indexOf("N/") != -1){
				return param.split("N/")[1];
			}else{
				return param;
			}
		}
		return (
			<React.Fragment>
				<Select style={{ width: 120 }} onChange={this.handleSelect} 
					value={changeSelectValue(this.state.first)} showSearch 
					filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
			        {
			        	this.props.dataSource.map(function(i){
			        		return (
			        			<Select.Option key={i.code} value={i.code}>{i.name}</Select.Option>
			        		)
			        	})
			        }
			    </Select>&nbsp;&nbsp;
				<Select style={{ width: 120 }} onChange={this.handleSelectLast} 
					value={changeSelectValue(this.state.last)} showSearch 
					filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
			        {
			        	this.state.optList.map(function(item){
			        		return (
			        			<Select.Option key={item.code} value={item.code}>{item.name}</Select.Option>
			        		)
			        	})
			        }
			    </Select>
		    </React.Fragment>
		)
	}
}

export default Cascader;