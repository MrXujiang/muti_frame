import { get } from "../get";
import { post } from "../post";
import { verifyIsLogin } from "../verifyislogin";

/* 验证老密码接口 */
export const verifyOldPwd = (data, fn, error) => {
    verifyIsLogin(post, "/auth/user/validPass", data, fn, error);
}

/* 修改新密码接口 */
export const changeNewPwd = (data, fn, error) => {
    verifyIsLogin(post, "/auth/user/changePass", data, fn, error);
}
/* 忘记密码的修改密码接口 */
export const changePsw = (data, fn, error) => {
    const result = post("/user/changePsw", data);

    return result;
}