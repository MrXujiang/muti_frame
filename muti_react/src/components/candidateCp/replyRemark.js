import React, { Component } from "react";
import { getRemark } from "../../fetch/candidate/index"

import "./styles";

class ReplyRemark extends Component {
	
	state = {
		remark:[]
	}
	
	getRemarkFun = (id)=>{
		const _this = this;
		const result = getRemark({applyId:id});
		result.then(response => response.json())
		.then(data => {
			if(data.state === 200) {
				_this.setState({
					remark:data.data
				})
			}
		});
	}
	
	// componentWillReceiveProps() {
	// 	let id = this.props.applyId;
	// 	let t = this.props.remarkText;
	// 	this.setState({
	// 		remark:t
	// 	})
	// 	this.getRemarkFun(id);
	// }
	
	render() {
		return (
			<div className="front_reply">
				<ul className="reply-content">
					{
						this.props.remarkText.length>0?this.props.remarkText.map(function(item,index){
							return (
                				<li key={`${item.userId}-${index}`} className={`${item.userType===0?"":"me_block"} con-li clearfix`}>
			                        <div className={item.userType===0?"person-hr":"person-me"}>{item.userType===0?"HR":"我"}</div>
			                        <span className="hour">
			                            {item.addDate}
			                        </span><br/>
			                        <span className="texts">
			                            {item.remark}
			                        </span>
			                    </li>
                			)
						}):<li style={{color: localStorage.themeColor}}>暂无回复记录</li>
					}
				</ul>
			</div>
		)
	}
}

export default ReplyRemark;