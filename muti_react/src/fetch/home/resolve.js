import { get } from "../get";
import { post } from "../post";
import { filePost } from "../post";

//职位列表接口
export const getResumeList = data => {
    const result = post("/auth/resume/list", data);

    return result;
}
//修改推荐理由接口
export const editApplyLetter = data => {
    const result = post("/auth/applyLetter/edit", data);

    return result;
}
//职位详情接口
export const positionDetail = data => {
    const result = post("/auth/position/detail", data);

    return result;
}
//文件上传接口（单文件上传）
export const upload = data => {
    const result = filePost("/auth/resume/upload", data);

    return result;
}
//文件解析接口
export const analyze = data => {
    const result = post("/auth/resume/analyze", data);

    return result;
}
//简历推荐接口
export const delivery = data => {
    const result = post("/auth/resume/delivery", data);

    return result;
}
//快捷简历需要填写的字段获取
export const quickFileds = data => {
    const result = post("/auth/component/quickFileds", data);

    return result;
}
//快捷简历需要填写的字段获取 新接口
export const getQuickResumeTemplate = data => {
    const result = post("/auth/resume/getQuickResumeTemplate", data);

    return result;
}
//快捷简历推荐接口
export const quickDelivery = data => {
    const result = filePost("/auth/resume/quickDelivery", data);

    return result;
}
//
export const quickApply = data => {
    const result = post("/auth/session/quickApply", data);

    return result;
}

