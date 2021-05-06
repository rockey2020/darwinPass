import { createRouter, createWebHashHistory } from "vue-router";

import http from "@/network/http";

const baseLayout = () => import("../layout/baseLayout");

function importAllModules(r) {
  return r.keys().map((key) => r(key).default);
}

const IndexChildrenRoutes = importAllModules(
  require.context("../views/", true, /router\.js$/)
);

const routes = [
  {
    path: "/",
    name: "index",
    component: baseLayout,
    redirect: { name: "home" },
    children: IndexChildrenRoutes,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    redirect: { name: "home" },
  },
];

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
  http.clearRequestQueue();
  next();
});

export default router;
