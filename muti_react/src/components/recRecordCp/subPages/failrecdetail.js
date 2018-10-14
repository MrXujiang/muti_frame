import React, { Component } from "react";
import { Input, Timeline, Steps,Spin, Icon } from "antd";
import DetailFail from "./detailFail";

class Failrecdetail extends Component{
	
    showAndHideMonth = (year, e) => {
        const parentEl = e.target.parentNode, ddEl = parentEl.querySelector("dd");
        if(ddEl.style.display == "none"){
            ddEl.style.display = "block";
        }else{
            ddEl.style.display = "none";
        }
        this.props.showMonth(year);
    }

    closeAll=(e)=>{
        const replyBoxs = document.querySelectorAll(".reply-box");
        for(let i=0;i<replyBoxs.length;i++){
            replyBoxs[i].style.display = "none";
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.closeAll, false);
    }

	render() {
        const _this = this;
        if (!this.props.data.rowList) {
            return (
                <Spin tip="Loading..." size="large"
                    indicator={<Icon type="loading" style={{color: localStorage.themeColor}} />}
                    style={{color: localStorage.themeColor}} />
            )
        }
		let list = [];
		if(this.props.data.rowList){
			this.props.data.rowList.map((item, index) => {
                list.push(
                    <DetailFail key={index} closeAll={this.closeAll} data={item.value} time={item.key}></DetailFail>
                );
            })
		}
		return (
			<React.Fragment>
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
                        <div className="title-box clearfix" style={{display:this.props.data.rowCount?'block':'none'}}>
                            <span className="total-record">共{this.props.data.rowCount}条记录</span>
                        </div>
                        <div className="failmessage-box">
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
                </div>
            }
            </React.Fragment>
		)
	}
}
export default Failrecdetail;
