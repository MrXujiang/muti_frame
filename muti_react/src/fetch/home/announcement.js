import { get } from "../get";
import { post, filePost } from "../post";

//猎头公告列表
export const getList = data => {
    const result = post("/auth/announcement/list", data);

    return result;
}
//阅读猎头公告
export const getDetail = data => {
    const result = post("/auth/announcement/detail", data);

    return result;
}