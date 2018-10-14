import { get } from "../get";
import { post } from "../post";

/* 首页登陆接口 */
export const getLogin = data => {
    const result = post("/index/login", data);

    return result;
}

export const forgetPsw = data => {
    const result = post("/user/forgetPsw", data);

    return result;
}