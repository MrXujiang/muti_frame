import React, { Component } from "react";
import ApplyEdit from "../../../components/applyEdit";
import PostDetail from "../../../components/postDetail";
import {
    getList
} from "../../../fetch/home/positiondetail";

class Recresume extends Component {
    state={
        positionDetail: {
            postId: 118101,//职位ID
            postName: "运维工程师",//职位名称
            workingTreatment: "4001-6000",//薪资情况
            education: "高中",//学历
            recruitNum: 6,//招聘人数
            workPlace: "苏州市",//工作地点
            orgName: "仪表盘测试",//职位机构名称
            recruiterName: "陈小琴",//招聘负责人姓名
            recruiterPhone: "12345611",//招聘负责人手机号
            recruiterEmail: "xufeilin@dayee.com",//招聘负责人邮箱
            publishDate: "2017-09-05",//发布时间
            expectEntryDate: "2017-05-31",//期望到岗时间
            workContent: "",//工作职责
            serviceCondition: "",//任职资格
            workYears: ""//职位需要的工作经验
        }
    }

    getPositionDetail = postId => {
        const result = getList({ 
            "positionCondition.postId": postId 
        }, data => {
            this.setState({
                positionDetail: data.data
            });
        });
    }

    componentDidMount() {
        //获取简历详情信息
        const id = this.props.match.params.id;

        this.getPositionDetail(id);
    }

    render() {
        return(
            <div className="recresume-wrap">
                <PostDetail positionDetail={ this.state.positionDetail } />
            </div>
        )
    }
}

export default Recresume;