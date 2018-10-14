import { get } from "../get";
import { post } from "../post";
import { verifyIsLogin } from "../verifyislogin";

/* 退出登录接口 */
export const getLogout = () => {
    const result = get("/auth/index/logout");

    return result;
}

/* 职位搜索组件接口 */
export const getSearchComponent = (data, fn, error) => {
    verifyIsLogin(post, "/auth/position/searchShow", data, fn, error);
    // const result = post("/wt/runner/hunter/auth/position/searchShow", data);

    // return result;
}

/* 职位搜索组件显示数据接口 */
export const getPostList = (data, fn, error) => {
    verifyIsLogin(post, "/auth/position/searchData", data, fn, error)
    // const result = post("/wt/runner/hunter/auth/position/searchData", data);

    // return result;
}

/* 职位列表接口 */
export const getPositionList = (data, fn, error) => {
    verifyIsLogin(post, "/auth/position/list", data, fn, error);
    // const result = post("/wt/runner/hunter/auth/position/list", data);

    // return result;
}

/* 获取用户名信息 */
export const getName = (data, fn, error) => {
    verifyIsLogin(post, "/auth/user/getName", data, fn, error)
    // const result = post("/wt/runner/hunter/auth/user/getName", data);

    // return result;
}