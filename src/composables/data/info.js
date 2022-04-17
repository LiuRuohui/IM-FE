// 使用封装好的http

import { reactive } from "vue";
import { http } from "../http";
import router from "../../router/router";

// 原始的info
const info = reactive({
	data: {},
	getInfo,
});

//拷贝
const Info = reactive({
	data: {},
	getInfos,
});

function getInfo() {
	http.get("/user/info", {}, "").then(
		(data) => {
			info.data = data;
			console.log("获取信息成功了", data);
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

function getInfos() {
	http.get("/user/info", {}, "").then(
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

export { info, Info };
