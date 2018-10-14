import "whatwg-fetch";
import "es6-promise";
import {getRoot} from "../utils/common"

const obj2params = (obj) => {
    let result = "",
        item,
        resultObj;

    for(item in obj) {
        if(Array.isArray(obj[item]) || (typeof obj[item] == "object" && obj[item]!=null)) {
            resultObj = obj[item].toString();
        } else {
            resultObj = encodeURIComponent(obj[item]);
        }

        result += "&" + item + "=" + resultObj;
    }
    
    if(result) {
        result = result.slice(1);
    }

    return result;
}

//const urlY = "http://192.168.0.205:8081";
const hostname = window.location.hostname;
const port = window.location.port;
const urlY = `http://${hostname}:${port}`;

export const post = (url, paramObj) => {
	let root = getRoot;
//	let path = root+url;
	let path = urlY+root+url;
    const result = fetch(path, {
        method: "POST",
        credentials: "include",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: obj2params(paramObj)
    });

    return result;
}

export const filePost = (url, paramObj)=>{
	let root = getRoot;
	let path = urlY+root+url;
	const result = fetch(path, {
        method: "POST",
        credentials: "include",
        body: paramObj
    });

    return result;
}
