import { createRouter, createWebHashHistory } from "vue-router";

import UserRepository from "@/module/user/repository/UserRepository";
import Manage from "@/network/manage";

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

const waitFor = (time = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

router.beforeEach(async (to, from, next) => {
  //取消所有准备执行的请求
  await Manage.clearRequestQueue();
  //初始化用户保存在服务器的设置
  await UserRepository.initUserSettings();
  //是否登录判断
  const isLogin = await UserRepository.isLogin();
  if (isLogin && to.name === "login") {
    return next({ name: "home" });
  }
  if (!isLogin && !whitelist.includes(to.name || to.path)) {
    return next({ name: "login" });
  }
  next();
});

export default router;
