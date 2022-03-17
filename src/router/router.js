// history模式
import { createRouter, createWebHashHistory } from "vue-router"

import ShowInformation from "../components/ShowInformation.vue"
import LoginPage from "../components/LoginPage.vue"
import WelcomingPage from "../components/WelcomingPage.vue"

const routes = [
	// 路由的默认路径
	{
		path: "/",
		component: WelcomingPage,
	},
	{
		path: "/login",
		component: LoginPage,
	},
	{
		path: "/information",
		component: ShowInformation,
	},
]

// 创建路由对象
const router = createRouter({
	history: createWebHashHistory(),
	routes,
})
export default router
