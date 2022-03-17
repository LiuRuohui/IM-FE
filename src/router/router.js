// history模式
import { createRouter, createWebHashHistory } from "vue-router"

import ForgetPasswd from "../components/ForgetPasswd.vue"
import Info from "../components/Info.vue"
import Login from "../components/Login.vue"
import Main from "../components/Main.vue"
import Register from "../components/Register.vue"
import UpdateInfo from "../components/UpdateInfo.vue"
import Welcome from "../components/Welcome.vue"

const routes = [
	// 路由的默认路径
	{
		path: "/",
		component: Welcome,
	},
	{
		path: "/updateInfo",
		component: UpdateInfo,
	},
	{
		path: "/register",
		component: Register,
	},
	{
		path: "/main",
		component: Main,
	},

	{
		path: "/login",
		component: Login,
	},
	{
		path: "/info",
		component: Info,
	},
	{
		path: "/forgetPasswd",
		component: ForgetPasswd,
	},
]

// 创建路由对象
const router = createRouter({
	history: createWebHashHistory(),
	routes,
})
export default router
