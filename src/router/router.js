// history模式
import { createRouter, createWebHashHistory } from "vue-router"
import { filter } from "./function"

const routes = [
	// 路由的默认路径
	{
		path: "/",
		name: "welcome",
		component: () => import("../components/Welcome.vue"),
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../components/Login.vue"),
	},
	{
		path: "/public",
		name: "public",
		component: () => import("../components/Public.vue"),
		children: [
			{
				path: "setting",
				name: "setting",
				component: () => import("../components/setting/Setting.vue"),
				meta: {
					title: "个人设置",
				},
			},
		],
	},
]

// 创建路由对象
const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

router.beforeEach((to, from) => {
	if (filter.stop(to)) {
		return false
	}
	//设置标题
	filter.title(to)
})

export default router
