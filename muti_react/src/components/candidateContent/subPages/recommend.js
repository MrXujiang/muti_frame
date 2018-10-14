import React, { Component }  from "react";
import Comment from "../../../images/icons/rec_comment_icon.png";
import { applyLetter } from "../../../fetch/candidate/index"

class Recommend extends Component {
	
	state = {
		recommendText:""
	}
	
	getRecommend = (id) => {
		const _this = this;
		const result = applyLetter({
			applyId:id
		});
		result.then(response => response.json())
		.then(data => {
			if(data.state === 200) {
				_this.setState({
					recommendText:data.data
				})
			}
		});
	}
	
	componentDidMount() {
		let id = localStorage.getItem('applyId');
//		this.getRecommend(id);
	}
	
	render(){
		return(
	        <div className="recommend-box">
	            <h2>
	                <img src={ Comment } alt=""/>
	                推荐评语
	            </h2>
	            <p className="rec-substain">
	            	{this.props.data.applyLetter}
	            </p>
	        </div>
	    )
	}
}

export default Recommend;