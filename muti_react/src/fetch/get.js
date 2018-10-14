import "whatwg-fetch";
import "es6-promise";
import {getRoot} from "../utils/common"


const hostname = window.location.hostname;
const port = window.location.port;
const urlY = `http://${hostname}:${port}`;
export const get = (url) => {
	let root = getRoot;
	let path = urlY+root+url;
    const result = fetch(path, {
        credentials: "include",
        headers: {
            "Accept": "application/json, text/plain, */*"
        }
    });

    return result;
}