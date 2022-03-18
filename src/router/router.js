// history模式
import { createRouter, createWebHashHistory } from "vue-router"

import Info from "../components/Info.vue"
import Login from "../components/Login.vue"
import Main from "../components/Main.vue"

import UpdateInfo from "../components/UpdateInfo.vue"
import Welcome from "../components/Welcome.vue"

const routes = [
	// 路由的默认路径
	{
		path: "/",
		name: "welcome",
		component: Welcome,
	},
	{
		path: "/updateInfo",
		name: "updateInfo",
		component: UpdateInfo,
	},

	{
		path: "/main",
		name: "main",
		component: Main,
	},

	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/info",
		name: "info",
		component: Info,
	},
]

// 创建路由对象
const router = createRouter({
	history: createWebHashHistory(),
	routes,
})
// router.beforeEach((to, from) => {
// 	// ...
// 	// 返回 false 以取消导航
// })
export default router
