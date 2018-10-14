import { post } from "../post";
import { verifyIsLogin } from "../verifyislogin";

export const getList = (data, fn, error) => {
    verifyIsLogin(post, "/auth/position/detail", data, fn, error);
    // const result = post("/wt/runner/hunter/auth/position/detail", data);

    // return result;
}
