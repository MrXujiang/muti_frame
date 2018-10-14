import { get } from "../get";
import { post } from "../post";

//读取页面配置参数
export const getConfig = data => {
    const result = post("/NetworkStationConfig/headhunting/setting/view", data);

    return result;
}
//简历详情展示页面
export const setConfig = data => {
    const result = post("/NetworkStationConfig/headhunting/setting/save", data);

    return result;
}