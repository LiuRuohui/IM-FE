// history模式
import { createRouter, createWebHashHistory } from "vue-router";
import { filter } from "./function";
import { routes } from "./route";

// 创建路由对象
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (filter.stop(to)) {
    return false;
  }
  //设置标题
  filter.title(to);
});

export default router;
