const routes = [
  // 路由的默认路径
  {
    //暂时重定向过去
    path: "/",
    name: "home",
    redirect: { name: "login" },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/login/Login.vue"),
    meta: {
      title: "登录注册",
    },
  },
  {
    path: "/preview",
    name: "preview",
    component: () => import("../components/preview/Preview.vue"),
    meta: {
      title: "预览",
    },
  },
  {
    path: "/public",
    name: "public",
    component: () => import("../components/Public.vue"),
    children: [
      {
        path: "apply",
        name: "apply",
        component: () => import("../components/apply/Apply.vue"),
        meta: {
          title: "我的申请",
        },
      },
      {
        path: "msg",
        name: "msg",
        component: () => import("../components/msg/Msg.vue"),
        meta: {
          title: "我的信息",
        },
      },
      {
        path: "chum",
        name: "chum",
        component: () => import("../components/chum/Chum.vue"),
        meta: {
          title: "我的好友",
        },
      },
      {
        path: "file",
        name: "file",
        component: () => import("../components/file/File.vue"),
        meta: {
          title: "我的文件",
        },
      },
      {
        path: "note",
        name: "note",
        component: () => import("../components/note/Notes.vue"),
        meta: {
          title: "我的笔记",
        },
      },
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
];

export { routes };
