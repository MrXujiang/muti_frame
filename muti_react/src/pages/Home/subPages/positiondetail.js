import React, { Component } from "react";
import PositionContentCp from "../../../components/positionContentCp";
import PositionDetail from "../../../components/positionDetail";
import {
    getList
} from "../../../fetch/home/positiondetail";

class Positiondetail extends Component {
    state = {
        positionListArr: {},
        showBtn:"none"
    }

    //打开其他页面
    openLink = (url, data) => {
        const path = {
            pathname: url + "/" + data,
        }
        this.props.history.push(path);
    }

    getPositionDetail = postId => {
        const listResult = getList({
            "positionCondition.postId": postId
        }, data => {
            this.setState({
                positionListArr: data.data,
                showBtn:data.data.openStatus==1?"none":"block"
            });
        });
    }

    componentDidMount() {
        //获取简历详情数据
        const postId = this.props.match.params.id;
        this.getPositionDetail(postId);
    }

    render() {
        return (
            <div className="position-detail-wrap">
                <PositionContentCp 
                    positionListArr={ this.state.positionListArr }
                />
                <PositionDetail 
                    positionListArr={ this.state.positionListArr }
                    openLink={ this.openLink }
                    id={ this.props.match.params.id }
                    showBtn={this.state.showBtn}
                />
            </div>
        )
    }
}

export default Positiondetail;
