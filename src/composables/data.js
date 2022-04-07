// 使用封装好的http

// 导出时需要对导出的info进行解构
import { reactive } from "vue"
import { http } from "./http"
// import Router from "vue-router"
import router from "../router/router"

// const route = useRoute()
const info = reactive({
	data: {},
	getInfo,
})

function getInfo() {
	http.get("/user/info", {}, "").then(
		(data) => {
			// console.log(data)
			info.data = data
		},
		(error) => {
			console.log("获取信息失败了", error)
			// 出错时直接跳转会首页
			router.push({
				name: "login",
			})
		}
	)
}

export { info }
