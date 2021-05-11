import { createRouter, createWebHashHistory } from "vue-router";

import Manage from "@/network/manage";
import UserRepository from "@/network/module/user/repository/UserRepository";

const baseLayout = () => import("../layout/baseLayout");

function importAllModules(r) {
  return r.keys().map((key) => r(key).default);
}

const PagesChildrenRoutes = importAllModules(
  require.context("../views/pages", true, /router\.js$/)
);
const DefaultChildrenRoutes = importAllModules(
  require.context("../views/default", true, /router\.js$/)
);

const routes = [
  {
    path: "/",
    name: "index",
    component: baseLayout,
    redirect: { name: "login" },
    children: PagesChildrenRoutes,
  },
  ...DefaultChildrenRoutes,
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    redirect: { name: "notFound" },
  },
];

const whitelist = ["login", "about", "notFound"];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  //取消所有准备执行的请求
  Manage.clearRequestQueue();
  //是否登录判断
  if (!UserRepository.isLogin() && !whitelist.includes(to.name)) {
    return next({ name: "login" });
  }
  next();
});

export default router;
