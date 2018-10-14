import { get } from "../get";
import { post } from "../post";

//推荐记录接口
export const userRecord = data => {
    const result = post("/auth/apply/userRecord", data);

    return result;
}

//推荐记录接口
export const userRecordDate = data => {
    const result = post("/auth/apply/userRecordDate", data);

    return result;
}
