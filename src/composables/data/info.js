// 使用封装好的http

import { reactive } from "vue";
import { http } from "../http";
import router from "../../router/router";
import Global from "../global";

// 原始的info
const info = reactive({
	data: {},
	getInfo,
	global,
	getUser,
});

//拷贝
const Info = reactive({
	data: {},
	getInfos,
});

function getInfo() {
	http.get("/user/info", {}).then(
		(data) => {
			info.data = data;
			// console.log("获取信息成功了", data);
		},
		(error) => {
			console.log("获取信息失败了", error);
		}
	);
}

function global() {
	http.get("/user/info", {}).then(
		(data) => {
			info.data = data;
			// console.log("获取信息成功了", data);
			Global();
		},
		(error) => {
			console.log("获取信息失败了", error);
		}
	);
}

function getInfos() {
	http.get("/user/info", {}).then(
		(data) => {
			Info.data = data;
			router.push({
				name: "setting",
			});
		},
		(error) => {
			console.log("获取信息失败了", error);
			// 出错时直接跳转会首页
			// router.push({
			//     name: "login",
			// })
		}
	);
}

//获取其他用户的信息
async function getUser(userId) {
	let tmp;
	await http.post("/user/getData", { userId: userId }).then(
		(data) => {
			// console.log("获取其他用户成功", data);
			tmp = data;
		},
		(error) => {
			console.log("获取其他用户失败", error);
		}
	);
	return tmp;
}

export { info, Info };
