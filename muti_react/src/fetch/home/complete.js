import { get } from "../get";
import { post, filePost } from "../post";

//获取编辑简历模板
export const getResumeTemplate = data => {
    const result = post("/auth/resume/getResumeTemplate", data);

    return result;
}
//获取编辑简历信息
export const getResume = data => {
    const result = post("/auth/resume/getResume", data);

    return result;
}
//获取二级联动框
export const getResumeDicByCode = data => {
    const result = post("/auth/resume/getResumeDicByCode", data);

    return result;
}
//编辑简历提交
export const editResume = data => {
    const result = filePost("/auth/resume/editResume", data);

    return result;
}
//获取反馈信息接口
export const getMessage = data => {
    const result = post("/auth/message/list", data);

    return result;
}
//修改消息的已读未读状态接口
export const remark = data => {
    const result = post("/auth/message/remark", data);

    return result;
}
//下一步
export const exitStep = data => {
    const result = filePost("/auth/resume/exitStep", data);

    return result;
}
//
export const editAndRecommand = data => {
    const result = filePost("/auth/resume/editAndRecommand", data);

    return result;
}
//
export const editEnglish = data => {
    const result = post("/common/editEnglish", data);

    return result;
}
//全部标为已读
export const remarkAll = data => {
    const result = post("/auth/message/remarkAll", data);

    return result;
}
//清空已读
export const cleanAll = data => {
    const result = post("/auth/message/cleanAll", data);

    return result;
}
//编辑简历-默认语言类型
export const editCond = data => {
    const result = post("/auth/resume/editCond", data);

    return result;
}
//选择学校
export const getCustomDataSource = data => {
    const result = post("/web/mode400/resume/getCustomDataSource", data);

    return result;
}
