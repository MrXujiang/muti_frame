import { get } from "../get";
import { post } from "../post";

//获取LOGO
export const getLogo = data => {
    const result = post("/common/logo", data);

    return result;
}
//获取二维码
export const qrCode = data => {
    const result = post("/common/qrCode", data);

    return result;
}
//获取页面配置
export const pageSet = data => {
    const result = post("/common/pageSet", data);

    return result;
}
//获取copyRight
export const copyRight = data => {
    const result = post("/common/copyRight", data);

    return result;
}
//获取隐私声明
export const privacy = data => {
    const result = post("/common/privacy", data);

    return result;
}
//投递类型接口
export const applyType = data => {
    const result = post("/common/applyType", data);

    return result;
}
//选择语言的接口
export const changeLanType = data => {
    const result = post("/common/changeLanType", data);

    return result;
}
export const defaultLanType = data => {
    const result = post("/common/defaultLanType", data);

    return result;
}
//获取首页栏目配置
export const column = data => {
    const result = post("/common/column", data);

    return result;
}
