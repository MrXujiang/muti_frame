import React, { Component } from "react";
import StepComponent from "../../StepComponents";
import DetailSucc from "./detailSucc";
import { Input, Timeline, Select, Spin, Icon  } from "antd";

class Recdetail extends Component{
	constructor(props) {
		super(props);
		this.state={
			accordDateType:0
		}
	}
	
	handleChange=(value)=>{
		const _this = this;
		this.setState({
			accordDateType:value
		},()=>{
			_this.props.changeType(value);
		})
	}

	showAndHideMonth = (year, e) => {
		const parentEl = e.target.parentNode, ddEl = parentEl.querySelector("dd");
		if(ddEl.style.display == "none"){
			ddEl.style.display = "block";
		}else{
			ddEl.style.display = "none";
		}
		this.props.showMonth(year);
	}
	
	render() {
		const _this = this;
		if (!this.props.data.rowList){
			return (
				<Spin tip="Loading..." size="large"
                    indicator={<Icon type="loading" style={{color: localStorage.themeColor}} />}
					style={{color: localStorage.themeColor}} />
			)
		}
		let list = [] , timeList=[];
		if(this.props.data.rowList){
			this.props.data.rowList.map((item, index) => {
				list.push(
					<DetailSucc key={index} data={item.value} time={item.key}></DetailSucc>
				);
			})
		}
		return (
			<React.Fragment>
				<Select className="meta-select"
					value={this.state.accordDateType}
					defaultValue={this.state.accordDateType}
					onChange={this.handleChange}>
			      <Select.Option value={0}>按推荐时间</Select.Option>
			      <Select.Option value={1}>按状态更新时间</Select.Option>
			    </Select>
			    {
	            	this.props.isLoading?
	            	<Spin tip="Loading..." size="large"
                        indicator={<Icon type="loading" style={{color: localStorage.themeColor}} />}
                        style={{color: localStorage.themeColor}} />:
		            <div className="meta-box clearfix">
		                <div className="left-box">
		                    {
		                        this.props.timestamp.map((item, index) => {
		                            const monthLen = item.month.length * 40 + "px",
		                                yearSel = _this.props.chooseYear == item.year ? "yearsel" : "yearsel-base",
		                                yearselStyle = _this.props.chooseYear == item.year ? {
                                        	borderLeftColor: localStorage.themeColor,
                                        	backgroundColor: localStorage.themeColor
                                        } : {};
		
		                            return(
		                                <dl className="year-dl" key={ index }>
		                                    <dt
		                                        className={ yearSel }
		                                        onClick={ (e) => this.showAndHideMonth(item.year, e) }
		                                        style={yearselStyle}
		                                    >
		                                        { item.year }
		                                    </dt>
		                                    <dd 
		                                        style={{
		                                            maxHeight: yearSel ? monthLen : ""
		                                        }}
		                                    >
		                                        {
		                                            item.month.map((items, indexs) => {
		                                                const monthClass = _this.props.chooseMonth == items.value ? "span-sel" : "";
		
		                                                return (
		                                                    <span
		                                                    	style={{borderLeftColor: localStorage.themeColor}}
		                                                        key={ indexs }
		                                                        className={ monthClass }
		                                                        onClick={ () => _this.props.changeMonth(items.value) }
		                                                    >
		                                                    	<i></i>
		                                                        { items.key }月
		                                                    </span>
		                                                )
		                                            })
		                                        }
		                                    </dd>
		                                </dl>
		                            )
		                        })
		                    }
		                </div>
		                <div className="right-box clearfix">
		                    <div className="title-box clearfix">
		                        <span className="total-record">共{this.props.data.rowCount}条记录</span>
		                    </div>
		                    <Timeline pending=" ">
			                    {
			                    	list.length>0?
			                    	list:
			                    	<div className="finish_block" style={{marginRight:'100px'}}>
			                        	<div className="logo-empty"></div><br/>
								 		<p className="empty_text">抱歉！没有搜索到相关数据！</p>
			                        </div>
			                    }
		                    </Timeline>
		                </div>
		            </div>
	            }
	        </React.Fragment>
		)
	}
}

export default Recdetail;