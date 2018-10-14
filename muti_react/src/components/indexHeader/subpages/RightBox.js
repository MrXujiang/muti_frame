import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Dropdown, Icon,Menu,Modal } from "antd";
import {getMessage,remark,remarkAll,cleanAll} from "../../../fetch/home/complete";
import {getRoot,getPath,confirmBox} from "../../../utils/common";
import arrowIcon from "../../../images/icons/arrow-icon.png";

import "../styles";

class RightBox extends Component {
    state = {
        badgeShow: false,
        status:"2",
        messageList:[],
        length:0
    }

    showBadge = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.getMsg("");
        this.setState({
        	badgeShow:!this.state.badgeShow
        });
        this.props.fixedDropdown(true);
    }
    hideBadge = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
        	badgeShow:false
        });
        this.props.fixedDropdown(false);
    }

    deleteBadge = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    
    handleMenu=(item, key, keyPath)=>{
    	const _this = this;
    	this.setState({
    		status:item.key
    	});
    	if(item.key !== "2"){
    		this.getMsg(item.key);
    	}else{
    		this.getMsg("");
    	}
    }
    
    goTo=(type,postId,applyId,id,userResumeId,index)=>{
    	this.remarkThis(false,id,index);
    	let path = window.location.href;
    	let mydate = new Date();
		let time = mydate.getTime();
		localStorage.setItem("activeKey",type+"");
    	if(type === 1){
			window.location.href = `./home.html?t=${time}#/positiondetail/${postId}`;
    	}else if(type === 2 || type === 4){
    		if(userResumeId==null){
			    confirmBox({content:'该记录已被删除，无法查询'});
    		}else{
    			let ai = applyId!=null?applyId:"";
				let pi = postId!=null?postId:"";
				let wi = userResumeId!=null?userResumeId:"";
    			localStorage.setItem("applyId",ai);
	    		localStorage.setItem("postId",pi);
	    		localStorage.setItem("webResumeId",wi);
	    		if(path.indexOf("candidateresdel") != -1){
	    			window.location.reload();
	    		}else{
	    			window.location.href = "./candidate.html#/candidateresdel";
	    		}
    		}
    	}else if(type === 3){
			window.location.href = "./recrecord.html#/?fail=1";
    	}
     //    else if(type === 4){
     //        window.location.href = `./candidate.html?t=${time}#/candidateresdel/${userResumeId}`;
    	// }
    }
    
    getMsg=(status)=>{
    	const _this = this;
    	let result;
    	if(status === ""){
    		result = getMessage();
    	}else{
    		result = getMessage({readStatus:parseInt(status)});
    	}
    	result.then(response => response.json())
		.then(data => {
			if(data.data instanceof Array){
				_this.setState({
					messageList:data.data
				})
			}
		});
    }
    //获取未读消息条数
    getNum=()=>{
    	const _this = this;
    	let result;
		result = getMessage({readStatus:1});
    	result.then(response => response.json())
		.then(data => {
			if(data.data instanceof Array){
				_this.setState({
					length:data.data.length
				})
			}
		});
    }
    remarkThis=(e,id,index)=>{
    	if(e){
    		e.preventDefault();
    		e.stopPropagation();
    	}
    	const _this = this;
    	let l = this.state.length-1;
    	let dom = this.state.messageList;
    	dom[index]["choose"] = true;
    	const result = remark({messageId:id});
    	result.then(response => response.json())
		.then(data => {
			_this.setState({
				messageList:dom,
				length:l
			})
		});
    }
    remarkAllMsg=()=>{
		const _this = this;
    	let dom = this.state.messageList;
    	for(let i = 0;i<dom.length;i++){
    		dom[i]["choose"] = true;
    	}
    	const result = remarkAll();
    	result.then(response => response.json())
		.then(data => {
			_this.setState({
				messageList:dom,
				length:0
			})
		});
	}
	cleanAllMsg =()=>{
		cleanAll().then(response => response.json()).then(res=>{
			console.log(res);
			if(res.type=="success"){
				const msgList = this.state.messageList;
				var msgList2 = msgList.filter(function(item){
					return item.readStatus == 1;
				});
				this.setState({
					messageList:msgList2
				})
			}
		})
	}
	doCover =()=>{
		this.setState({
        	badgeShow:false
        });
        this.props.fixedDropdown(false);
	}
    
    componentDidMount(){
    	// this.getMsg("");
    	this.getNum();
	}

    render() {
    	const _this = this;
    	const menu = (
		  <Menu defaultSelectedKeys={["2"]} onClick={this.handleMenu}>
		    <Menu.Item key="2"> 全部 </Menu.Item>
		    <Menu.Item key="1"> 未读消息 </Menu.Item>
		    <Menu.Item key="0">已读消息</Menu.Item>
		  </Menu>
		);
		const menu2 =(
				<Menu>
					<Menu.Item key="1" onClick={this.remarkAllMsg} >全部标为已读</Menu.Item>
					<Menu.Item key="2" onClick={this.cleanAllMsg} >清空已读消息</Menu.Item>
				</Menu>				
		);
        return(
            <div className="right-box">
                <div 
                    className="imgbox"
                    onClick={ this.showBadge }
                >
                    <img className="header-notify" src={this.props.headerNotify} alt="" />
                    <Badge
                        count={this.state.length}
                        className="header-badge"
                    >
                    </Badge>
                </div>
                <Dropdown 
                    overlay={ this.props.menu }
                    trigger={['click']}
                    onVisibleChange={this.props.fixedDropdown}
                    placement="bottomRight"
                >
                    <span title={this.props.getNames} className="userName-wrap">
						<span className="userName">
							{
							this.props.getSubStringSum(this.props.getNames, 12)
							}
						</span>
                        <span className="userName-icon-wrap"><img src={arrowIcon} className="userName-icon" /></span>
                        {/*<Icon type="down" style={{marginTop: "23px"}} />*/}
                    </span>
                </Dropdown>
				<div className="message_cover" onClick={this.doCover} style={{display: this.state.badgeShow ? "block" : "none"}}></div>
                <div className="block_message-right" style={{height:"100%",background:"#fff",display: this.state.badgeShow ? "block" : "none"}}>
                	<div className="message_title">
                		<Dropdown overlay={menu} trigger={['click']}>
						      <span className="msg_title-text"><span>消息提醒</span> <Icon type="down" /></span>
						</Dropdown>
                		<Dropdown overlay={menu2} trigger={['click']}>
						      <span className="msg_title-text" style={{marginLeft:"185px"}}> <Icon type="ellipsis" /></span>
						</Dropdown>

						<span onClick={this.hideBadge}>
                            <Icon type="close" />
                        </span>
                	</div>
                	<div className="message_body">
                		<ul>
                			{
	                			this.state.messageList.map(function(item, index){
	                				return (
                                        <li id={`${item.postId}-${item.applyId}`} className="msg_list-item" key={ index } onClick={()=>{_this.goTo(item.type,item.postId,item.applyId,item.id,item.userResumeId,index)}}>
	                						<Badge status={item.readStatus==1?"error":"default"} dot={true} />
	                						<b>{item.title}</b><span className="time-text">{item.addDate}</span><br/>
	                						<div title={item.message} className="msg-text">{item.message}</div>
	                						<div className="mark_readed" style={{color: localStorage.themeColor}}>
	                							{
	                								item.readStatus==1&&
	                								<div onClick={(e)=>{_this.remarkThis(e,item.id,index)}}>
	                									{item.choose?<Icon type="check-square-o" className="check-square-o" />:
                                                            <span className="check-square" 
                                                                style={{borderColor: localStorage.themeColor}}></span>}
                                                        <span>标为已读</span>
	                								</div>
	                							}
	                							{
	                								item.readStatus==0&&
	                								<div></div>
	                							}
	                						</div>
                						</li>
	                				)
	                			})
	                		}
                		</ul>
                	</div>
                </div>
            </div>
        );
    }
}

export default RightBox;