import React, { Component } from "react";
import { Pagination,Modal,Tag } from 'antd';
import IndexSearch from "../../../components/indexSearch";
import PositionList from "../../../components/positionList";
import updateBg from "../../../images/imgs/update_bg.png";
import {hex2Rgba} from '../../../utils/common';
import {
    getPostList,
    getPositionList,
    getSearchComponent
} from "../../../fetch/home";
import {getList} from "../../../fetch/home/announcement";

class Index extends Component {
    state = {
        searchArray: [],
        positionListArr: [],
        searchArr: [],
        postListArr: [],
        postionTabIndex: 0,
        keyWord: "",
        positionName: [],
        workPlace: [],
        positionType: [],
        workType: [],
        releaseTimeCode: "",
        salaryType: [],
        orgCode: [],
        rowSize: 10,
        totalPage: "",
        totalData: "",
        currentPage: 1,
        isLoading: true,
        rowCount:0,
        showRecruiter:true,
        showSearch:[],
        visible:false,
        isupdate: false,
        modalBody:"",
        announceTitle:""
    }

    //打开其他页面
    openLink = (url, data) => {
    	localStorage.setItem("tab","1");
        const path = {
            pathname: url + "/" + data
        }
        this.props.history.push(path);
    }

    //修改判断状态
    judgeLoading = (booleans) => {
        this.setState({
            isLoading: booleans
        });
    }

    /* 搜索栏添加数据 */
    addSearchData = (showItem, itemCollection, booleans) => {
        if(!booleans) {
            this.setState({
                [showItem]: [
                    ...this.state[showItem],
                    itemCollection
                ]
            });
        } else {
            this.setState({
                [showItem]: itemCollection
            });
        }
    }

    /* 搜索栏删除数据 */
    delSearchData = item => {
        const showItem = item.field;
        let currentItem = this.state[showItem];
        
        //过滤
        currentItem = currentItem.filter(t => t !== item.code);

        this.setState({
            [showItem]: currentItem
        });
    }

    /* 职位列表接口 */
    positionResultAjax = (
        postionTabIndex = 0,
        keyWord = "",
        positionName = "",
        workPlace = "",
        positionType = "",
        workType = "",
        releaseTimeCode = "",
        salaryType = "",
        orgCode = "",
        rowSize = 10,
        currentPage = 1
    ) => {
        this.judgeLoading(true);
        const positionResult = getPositionList({
            "positionCondition.openStatus": postionTabIndex,
            "positionCondition.keyWord": keyWord,
            "positionCondition.positionName": positionName,
            "positionCondition.workPlace": workPlace,
            "positionCondition.positionType": positionType,
            "positionCondition.workType": workType,
            "positionCondition.releaseTimeCode": releaseTimeCode,
            "positionCondition.salaryType": salaryType,
            "positionCondition.orgCode": orgCode,
            "pageCondition.rowSize": rowSize,
            "pageCondition.currentPage": currentPage
        }, data => {
            this.setState({
                positionListArr: data.data.rowList,
                totalPage: data.data.pageCount,
                totalData: data.data.rowCount,
                rowSize: data.data.rowSize,
                rowCount: data.data.rowCount,
                isLoading: false,
                showRecruiter: data.data.rowList[0]?data.data.rowList[0].showRecruiter:true
            });
        });
    }
	
	onPageChange=(page,pageSize)=>{
        // 切换页码页面回到顶端
        window.scrollTo(0,0);
		this.setState({
			currentPage:page
		})
		this.positionResultAjax(
            this.state.postionTabIndex,
            this.state.keyWord,
            this.state.positionName,
            this.state.workPlace,
            this.state.positionType,
            this.state.workType,
            this.state.releaseTimeCode,
            this.state.salaryType,
            this.state.orgCode,
            this.state.rowSize,
            page
        );
	}
	handleOk=()=>{
		localStorage.setItem("activeKey","4");
		window.location.href = "./announcement.html#/";
	} 
	handleCancel=()=>{
        if(this.state.isupdate) {
            this.showAnnounce();
            setTimeout(() => {
                this.setState({
                    isupdate:false
                });
            },300);
        } else {
            this.setState({
                visible:false
            });
        }
	}
    componentDidMount() {
    	const _this = this;
        /* 职位搜索组件接口 */
        const searchArrs = ["", "工作地点", "机构", "职位类型", "工作类型", "", "子公司", "", "职位发布时间", "薪资范围", "关键字搜索", "职位名称"];
        const searchTypeArrs = [
            "", 
            "workPlace", 
            "orgCode", 
            "positionType", 
            "workType", 
            "", 
            "orgCode", 
            "", 
            "releaseTimeCode", 
            "salaryType", 
            "keyWord", 
            "positionName"
        ];

        const searchResult = getSearchComponent({
            "searchCondition.code": "hunterHome_2"
        }, data => {
            const searchArr = [];
			this.setState({
				showSearch:data.data.showSearch
			})
            //处理成JSON数据
            data.data.showSearch.map(item => {
                searchArr.push({
                    [item]: searchArrs[item]
                });
            });

            /* 职位搜索组件显示数据接口 */
            const postListResults = getPostList({
                "searchCondition.id": data.data.searchId,
                "searchCondition.showSearch": JSON.parse(JSON.stringify(data.data.showSearch))
            }, data => {
                this.setState({
                    postListArr: data.data,
                    searchArray: searchTypeArrs,
                    searchArr
                });
            });
        });
        
        //职位列表接口
        this.positionResultAjax(
            this.state.postionTabIndex,
            this.state.keyWord,
            this.state.positionName,
            this.state.workPlace,
            this.state.positionType,
            this.state.workType,
            this.state.releaseTimeCode,
            this.state.salaryType,
            this.state.orgCode,
            this.state.rowSize,
            this.state.currentPage
        );

        if(!localStorage.isupdate) {
            localStorage.isupdate = "true";
            _this.setState({
                isupdate:true,
                visible:true,
                modalBody:'<h2>发现新版本&nbsp;&nbsp;<Tag color="#36cddc">V2.0.0</Tag></h2>' +
                    '<p>1. 职位状态一目了然，推荐简历更快捷<br/>2. 业务流程优化，交互体验更贴心<br/>3. 职位简历动态消息实时提醒</p>'
            });
        } else {
            _this.showAnnounce();
        }
    }

    showAnnounce =() => {
        const _this = this;
        if(!sessionStorage.show){
            const announceResult = getList({
                "status":1,
                "pageCondition.rowSize": 15,
                "pageCondition.currentPage": 1
            });
            announceResult.then(response => response.json())
                .then(data => {
                    sessionStorage.show = "true";
                    if(data.data.rowCount==1){
                        _this.setState({
                            visible:true,
                            announceTitle:data.data.rowList[0].title,
                            modalBody:data.data.rowList[0].content
                        });
                    }else if(data.data.rowCount>0){
                        _this.setState({
                            visible:true,
                            announceTitle:"公告",
                            modalBody:`您有${data.data.rowCount}条未读的公告`
                        });
                    }
                });
        } else {
            this.setState({
                visible:false
            });
        }
    }

    itemRender = (current, type, originalElement) => {
        if (type === 'page' && current === this.state.currentPage) {
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
        	<React.Fragment>
	            <div className="hunter-index-box">
	                <IndexSearch 
	                    addSearchData={ this.addSearchData }
	                    delSearchData={ this.delSearchData }
	                    searchArray={ this.state.searchArray }
	                    searchArr={ this.state.searchArr }
	                    postListArr={ this.state.postListArr }
	                    positionResultAjax={ this.positionResultAjax }
	                    states={ this.state }
	                    showSearch={this.state.showSearch}
	                />
	                <PositionList 
	                    addSearchData={ this.addSearchData }
	                    judgeLoading={ this.judgeLoading } 
	                    positionListArr={ this.state.positionListArr }
	                    isLoading={ this.state.isLoading }
	                    positionResultAjax={ this.positionResultAjax }
	                    openLink={ this.openLink }
	                    states={ this.state }
	                />
	            </div>
	            <div className="home_pageBlock">
	            	{this.state.rowCount>10?<Pagination showQuickJumper
                        defaultCurrent={1} itemRender={this.itemRender}
                        total={this.state.rowCount} onChange={this.onPageChange} />:null}
	            </div>
	            <Modal
                  wrapClassName={this.state.isupdate?"update_box":"announce_modal"}
		          visible={this.state.visible}
		          title={this.state.isupdate?<img src={updateBg} />:this.state.announceTitle}
		          onCancel={this.handleCancel}
		          footer={this.state.isupdate?null:[
		            <div key="more_btn" className="modal_btn" onClick={this.handleOk} style={{color:localStorage.themeColor}}>立即查看</div>
		          ]}
		        >
		          <div dangerouslySetInnerHTML={{__html:this.state.modalBody}}></div>
		        </Modal>
            </React.Fragment>
        );
    }
}

export default Index;
