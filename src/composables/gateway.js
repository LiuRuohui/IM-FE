/*
获取网关地址
*/

import axios from "axios";

//获取当前时间戳
const timestamp = new Date().getTime();

let url = "http://api.jinzh.me";
// axios.get("http://im-router.jinzh.me").then(
// 	(response) => {
// 		url = response.data
// 		return response.data
// 	},
// 	(error) => {
// 		console.log("获取gateway地址失败", error.message)
// 	}
// )

export { url };
