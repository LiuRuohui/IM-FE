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
		meta: {
			title: "登录注册",
		},
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

export { routes }
