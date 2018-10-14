import React, { Component } from "react";
import { Tabs,Input,Spin,Pagination } from 'antd';
import Recdetail from "./subPages/recdetail";
import Failrecdetail from "./subPages/failrecdetail";
import {userRecord,userRecordDate } from "../../fetch/recRecord/index";

import "./styles";

const { TabPane } = Tabs;

class RecRecordCp extends Component {
    state = {
    	inputValue:"",
    	activeTab: "0",
        chooseMonth: "",
        chooseYear: "", 
        accordDateType:0,
        timestamp: [
            {
                year: 2013,
                month: [],
                isChoose: false
            }
        ],
        failtimestamp: [
            {
                year: 2013,
                month: [],
                isChoose: false
            }
        ],
        succData:{},
        failData:{},
        isLoading:false,
        totalSucc:0,
        totalFail:0,
        currPageSucc:1,
        currPageFail:1
    }

    /* 选择月份 */
    changeMonth = (month) => {
        this.setState({
            chooseMonth: month,
            inputValue:"",
            currPageSucc: 1,
            currPageFail: 1
        });
        this.getUserRecord(this.state.activeTab,"",this.state.accordDateType,month,0,15,1);
    }

    /* 显示月份 */
    showMonth = year => {
        if(this.state.chooseYear != year) {
            this.setState({
                chooseYear: year
            });
        }
    }
    //输入框值改变
    handleSearch = (value) => {
    	this.setState({
    		inputValue: value
    	})
    }
    //输入框查询
    search = (value) => {
    	this.getUserRecord(this.state.activeTab,value,this.state.accordDateType,"",0,15,1);
    }
    //改变查询的时间类型-下拉框
    changeType=(value)=>{
    	let page = this.state.activeTab=="0"?this.state.currPageSucc:this.state.currPageFail;
    	this.setState({
    		accordDateType: value,
            inputValue:""
    	})
    	this.getUserRecord("0","",value,"",0,15,page);
        this.getTime(0, value);
    }
    
    onChangeSucc=(pageNumber)=>{
        // 切换页码页面回到顶端
        window.scrollTo(0,0);
    	this.setState({
    		currPageSucc: pageNumber
    	});
        this.getUserRecord("0",this.state.inputValue,this.state.accordDateType,this.state.chooseMonth,0,15,pageNumber);
    }
    onChangeFail=(pageNumber)=>{
        // 切换页码页面回到顶端
        window.scrollTo(0,0);
    	this.setState({
    		currPageFail: pageNumber
    	});
        this.getUserRecord("1",this.state.inputValue,this.state.accordDateType,this.state.chooseMonth,0,15,pageNumber);
    }
    //获取推荐记录
    getUserRecord = (applySucc,userName,accordDateType,accordDate,lanType,size,page) => {
        this.setState({
            isLoading:true
        });
        const result = userRecord({
            "recordCondition.applySucc":applySucc,//投递的状态-Integer==0-成功，1-失败
            "recordCondition.userName":userName,//查询投递的候选人名称-String
            "recordCondition.accordDateType":accordDateType,//查询的时间类型-Integer
            "recordCondition.accordDate":accordDate,//查询的时间-String
            "recordCondition.lanType":lanType,//语言类型-Integer
            "pageCondition.rowSize":size,//每页条数
            "pageCondition.currentPage":page//页码
        });
        result.then(response => response.json())
        .then(data => {
            if(data.state === 200) {
                const firstDate = data.data.firstDate || "";
                if(applySucc === "0"){
                    this.setState({
                        isLoading: false,
                        succData: data.data,
                        totalSucc: data.data.rowCount,
                        chooseYear: firstDate.split("-")[0],
                        chooseMonth: firstDate
                    });
                }else{
                    this.setState({
                        isLoading: false,
                        failData: data.data,
                        totalFail: data.data.rowCount,
                        chooseYear: firstDate.split("-")[0],
                        chooseMonth: firstDate
                    });
                }
            }
        });
    }
    //获取左侧时间轴数据
    getTime = (param, accordDateType) => {
    	const _this = this;
    	let list = [];
		const result = userRecordDate({
			"recordCondition.applySucc": param,//投递的状态-Integer==0-成功，1-失败
            "recordCondition.accordDateType": typeof accordDateType === "undefined"?this.state.accordDateType:accordDateType,//查询的时间类型-Integer
		});
		result.then(response => response.json())
		.then(data => {
			if(data.state === 200) {
                data.data.map(item => {
                    let dom = {
                        year: item.year,
                        month: item.months,
                        isChoose: false
                    }
                    list.push(dom);
                })
				if(param === 0){
					this.setState({
						timestamp: list
					});
				}else{
					this.setState({
						failtimestamp: list
					});
				}
			}
		});
    }
    //tab页切换
    handleTabs = (activeKey) => {
        this.setState({
            chooseMonth:"",
            activeTab: activeKey
        })
        if(activeKey == "1"){
            this.getUserRecord("1","",0,"",0,15,1);
            this.getTime(1);
        }else{
            this.getUserRecord("0","",0,"",0,15,1);
            this.getTime(0);
        }
    }
    
    componentDidMount(){
    	let path = window.location.href.split("?");
    	let v;
    	if(path.length>1){
    		v = path[1].split("=")[0];
    		this.setState({
	    		activeTab: "1"
	    	})
    	}
    	this.getUserRecord("0","",0,"",0,15,1);
    	this.getTime(0);
    }

    itemRenderSucc = (current, type, originalElement) => {
        if (type === 'page' && current === this.state.currPageSucc) {
            return (
                <span style={{
                    backgroundColor: localStorage.themeColor,
                }}>{current}</span>
            )
        }else if(type === 'page'){
            return <a style={{color: "rgba(0, 0, 0, 0.65)"}}>{current}</a>
        }
        return originalElement;
    }

    itemRenderFail = (current, type, originalElement) => {
        if (type === 'page' && current === this.state.currPageFail) {
            return (
                <span style={{
                    backgroundColor: localStorage.themeColor,
                }}>{current}</span>
            )
        }else if(type === 'page'){
            return <a style={{color: "rgba(0, 0, 0, 0.65)"}}>{current}</a>
        }
        return originalElement;
    }

    render() {
        return (
            <div className="rec-record-box">
                <Input.Search
                    placeholder="输入姓名按下回车键查询"
                    value={this.state.inputValue}
                    onChange={(e)=>{this.handleSearch(e.target.value)}}
                    onSearch={this.search}
                    style={{ position: "absolute", zIndex:"2", top: "90px", right: "35px", width: 275, border: "1px solid #d9d9d9",display:this.state.activeTab==0||(this.state.totalFail&&this.state.activeTab==1)?'block':'none' }}
                />
            	<Tabs
                    closable={ false }
                    animated={ false }
                    activeKey={this.state.activeTab+""}
                    onChange={this.handleTabs}
                >
                    <TabPane
                        tab={
                            <React.Fragment>
                                推荐成功
                                <p className="tab-bar-line-fixed" style={{backgroundColor: localStorage.themeColor}}></p>
                            </React.Fragment>
                        }
                        key="0"
                        forceRender={ false }
                    >
                    <Recdetail
                    	loading={this.state.isLoading}
                    	data={this.state.succData}
                        changeMonth={ this.changeMonth }
                        timestamp={ this.state.timestamp }
                        showMonth={ this.showMonth }
                        chooseMonth={ this.state.chooseMonth }
                        chooseYear={ this.state.chooseYear }
                        changeType={(value)=>{this.changeType(value)}}
                    />
                    <div className="page_foot">
                    	{this.state.totalSucc>15?<Pagination showQuickJumper
                            current={this.state.currPageSucc}
                            itemRender={this.itemRenderSucc}
                            pageSize={15} defaultCurrent={this.state.currPageSucc}
                            total={this.state.totalSucc} onChange={this.onChangeSucc} />:null}
                    </div>
                    </TabPane>
                    <TabPane
                        tab={
                            <React.Fragment>
                                推荐失败
                                <p className="tab-bar-line-fixed" style={{backgroundColor: localStorage.themeColor}}></p>
                            </React.Fragment>
                        }
                        key="1"
                        forceRender={ false }
                    >
                    <Failrecdetail
                        loading={this.state.isLoading}
                        data={this.state.failData}
                        timestamp={ this.state.failtimestamp }
                        showMonth={ this.showMonth }
                        changeMonth={ this.changeMonth }
                        chooseMonth={ this.state.chooseMonth }
                        chooseYear={ this.state.chooseYear }
                    />
                    <div className="page_foot">
                        {this.state.totalFail>15?<Pagination pageSize={15} showQuickJumper
                            current={this.state.currPageFail}
                            itemRender={this.itemRenderFail}
                            defaultCurrent={this.state.currPageFail} total={this.state.totalFail}
                            onChange={this.onChangeFail} />:null}
                    </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default RecRecordCp;