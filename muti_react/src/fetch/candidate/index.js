import { get } from "../get";
import { post } from "../post";

//应聘纪录列表接口（候选人）
export const getRecord = data => {
    const result = post("/auth/apply/record", data);

    return result;
}
//简历详情展示页面
export const getDetail = data => {
    const result = post("/auth/resume/detail", data);

    return result;
}
//职位列表接口
export const getPosList = data => {
    const result = post("/auth/position/tree", data);

    return result;
}
//应聘纪录大环节数据（候选人）
export const recordNum = data => {
    const result = post("/auth/apply/recordNum", data);

    return result;
}
//获取反馈信息接口
export const getRemark = data => {
    const result = post("/auth/apply/getRemark", data);

    return result;
}
//添加反馈信息接口
export const addRemark = data => {
    const result = post("/auth/apply/addRemark", data);

    return result;
}
//获取推荐理由
export const applyLetter = data => {
    const result = post("/auth/apply/applyLetter", data);

    return result;
}
//是否支持猎头反馈
export const canRemark = data => {
    const result = post("/common/canRemark", data);

    return result;
}