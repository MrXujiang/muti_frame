import React, { Component } from "react";
import { Tabs,Spin,Pagination,Modal } from 'antd';
import {getList,getDetail} from "../../../fetch/home/announcement";

import '../../../styles/announcement';

const { TabPane } = Tabs;
class Announcement extends Component {
	state={
		unread:0,
		read:0,
		activeTab:0,
		visible:false,
		unreadList:[],
		readList:[],
		currentPageU:1,
		currentPageR:1,
		modalBody:"",
		modalTitle:""
	}
	
	    //tab页切换
    handleTabs = (activeKey) => {
    	this.setState({
    		activeTab:activeKey==="0"?0:1
    	})
    }
	handleOk=()=>{
		this.setState({
			visible:false
		})
	}
	handleCancel=()=>{
		this.setState({
			visible:false
		})
	}
	openModal=(id,content,title)=>{
		const _this = this;
		this.setState({
			visible:true,
			modalTitle:title,
			modalBody:content
		});
		this.readDetail(id,function(){
			_this.getAnnounceList(0,_this.currentPageR?_this.currentPageR:1);
			_this.getAnnounceList(1,_this.currentPageU?_this.currentPageU:1);
		})
	}
	
	readDetail=(id,func)=>{
		const result = getDetail({announcementId:id});
		result.then(response => response.json())
		.then(data => {
			func();
		});
	}
	
	unreadChange=(pageNumber)=>{
		this.setState({
			currentPageU:pageNumber
		});
		this.getAnnounceList(0,pageNumber);
	}
	readChange=(pageNumber)=>{
		this.setState({
			currentPageR:pageNumber
		});
		this.getAnnounceList(1,pageNumber);
	}
	
	getAnnounceList=(status,currentPage)=>{
		const _this = this;
		const result = getList({
			"status":status,
			"pageCondition.rowSize": 15,
			"pageCondition.currentPage": currentPage
		});
		result.then(response => response.json())
		.then(data => {
			if(status==1){
				_this.setState({
					unreadList:data.data.rowList,
					unread:data.data.rowCount
				})
			}else{
				_this.setState({
					readList:data.data.rowList,
					read:data.data.rowCount
				})
			}
		});
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
	
	componentDidMount(){
		this.getAnnounceList(1,1);
		this.getAnnounceList(0,1);
	}
	
	render(){
		const _this = this;
		function dateFormate(param){
			if(!param) return;
			let arr = param.split("T");
			return `${arr[0]} ${arr[1]}`;
		}
		return (
			<div className="announce-box">
				<Tabs
                    closable={ false }
                    animated={ false }
                    activeKey={this.state.activeTab+""}
                    onChange={this.handleTabs}
                >
                    <TabPane
                        tab={
                            <React.Fragment>
                                未读({this.state.unread})
                                <p className="tab-bar-line-fixed" style={{backgroundColor: localStorage.themeColor}}></p>
                            </React.Fragment>
                        }
                        key="0"
                        forceRender={ false }
                    >
                    	{
                    		this.state.unreadList.length>0?
	                		<ul className="tabs_inner">
	                			{
	                				this.state.unreadList.map((item, index) => {
	                					return (
	                						<li key={index} onClick={()=>this.openModal(item.uniqueKey,item.content,item.title)}>
				                				<i></i>
				                				<div className="block_text">
				                					<div className="block_title">
				                						<p>{item.title}</p>
				                						<span>{dateFormate(item.addDate)}</span>
				            						</div>
				                					<div className="block_main" dangerouslySetInnerHTML={{__html:item.content}}></div>
				                				</div>
				                			</li>
	                					)
	                				})
	                			}
	                		</ul>
	                		:<div className="finish_block">
	                        	<div className="logo-empty"></div><br/>
						 		<p className="empty_text">抱歉!没有相关数据!</p>
	                        </div>
                       	}
                		<div style={{textAlign:"center"}}>
                			{this.state.unreadList>15?<Pagination pageSize={15} showQuickJumper
	                			current={this.state.currentPageU} itemRender={this.itemRender}
	                			total={this.state.unread} onChange={this.unreadChange} />:null}
	                	</div>
                    </TabPane>
                    <TabPane
                        tab={
                            <React.Fragment>
                                已读
                                <p className="tab-bar-line-fixed" style={{backgroundColor: localStorage.themeColor}}></p>
                            </React.Fragment>
                        }
                        key="1"
                        forceRender={ false }
                    >
                    	{
                    		this.state.readList.length>0?
	                    	<ul className="tabs_inner">
	                			{
	                				this.state.readList.map((item, index) => {
	                					return (
	                						<li key={index} onClick={()=>this.openModal(item.uniqueKey,item.content,item.title)}>
				                				<div className="block_text">
				                					<div className="block_title">
				                						<p>{item.title}</p>
				                						<span>{dateFormate(item.addDate)}</span>
				            						</div>
				                					<div className="block_main" dangerouslySetInnerHTML={{__html:item.content}}></div>
				                				</div>
				                			</li>
	                					)
	                				})
	                			}
	                		</ul>
	                		:<div className="finish_block">
	                        	<div className="logo-empty"></div><br/>
						 		<p className="empty_text">抱歉!没有相关数据!</p>
	                        </div>
                		}
                		<div style={{textAlign:"center"}}>
                			{this.state.readList>15?<Pagination pageSize={15} showQuickJumper
	                			current={this.state.currentPageR} itemRender={this.itemRender}
	                			total={this.state.read} onChange={this.readChange} />:null}
	                	</div>
                    </TabPane>
                </Tabs>
                <Modal
                  wrapClassName="announce_modal"
		          visible={this.state.visible}
		          title={this.state.modalTitle}
		          onOk={this.handleOk}
		          onCancel={this.handleCancel}
		          footer={null}
		          width={600}
		        >
		          <div className="announce-content" dangerouslySetInnerHTML={{__html: this.state.modalBody}}></div>
		        </Modal>
			</div>
		)
	}
}

// footer={[
// 	<div className="modal_btn" onClick={this.handleOk} style={{color:localStorage.themeColor}}>查看更多</div>
// ]}

export default Announcement;