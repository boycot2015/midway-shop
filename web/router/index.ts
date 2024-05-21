import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
  Router,
} from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import DefaultLayoutRoutes from '@/router/routes';
import DefaultLayout from '@/layouts/DefaultLayout/index.vue';
// import { useUserStore } from '@/store/user';
export const createRouter = (type: RouterType): Router => {
  const router = _createRouter({
    scrollBehavior(/* to, from, savedPosition */) {
      return { top: 0 };
    },
    history: type === 'web' ? createWebHistory() : createMemoryHistory(),
    routes: [
    {
        path: '/',
        name: 'root',
        component: DefaultLayout,
        children: DefaultLayoutRoutes,
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
            openVisit: true, // 游客访问
            keywords: '登录k',
            description: '登录d',
        },
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    },
        {
            name: 'notfound',
            path: '/:pathMatch(.*)*',
            meta: {
                title: 'Not Found',
            },
            component: () => import('@/views/404/index.vue'),
        },
    ],
  });

  router.beforeEach((/** to, from, next */) => {
    if (!import.meta.env.SSR) {
        // start progress bar
        NProgress.start();
        // console.log(to.path, from.path, 'to, from');
        // const userStore = useUserStore();
        // if (!userStore.token && to.path !== '/login') {
        //     if (to.path !== '/login' && !to.meta.openVisit) {
        //         next('/login');
        //     } else {
        //         next();
        //     }
        // } else {
        //     next();
        // }
    } else {
        // next();
    }
  });

  router.afterEach(() => {
    if (!import.meta.env.SSR) {
      // finish progress bar
      NProgress.done();
    }
  });

  return router;
};
