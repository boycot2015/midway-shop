import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home/index.vue';
import CustomPage from '@/views/CustomPage/index.vue';
interface RouteRedirect  {
    redirect?: string
}
const DefaultLayoutRoutes: Array<RouteRecordRaw|RouteRedirect> = [
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      keywords: '首页k',
      description: '首页d',
      navActive: 'home',
    },
    component: Home,
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/',
    meta: {
      title: '首页',
      keywords: '首页k',
      description: '首页d',
      navActive: 'home',
    },
    component: Home,
  },
  {
    path: '/customPage',
    name: 'CustomPage',
    meta: {
      title: '自定义页面',
      keywords: '自定义页面k',
      description: '自定义页面d',
      navActive: 'CustomPage',
    },
    component: CustomPage,
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于',
      keywords: '关于k',
      description: '关于d',
      navActive: 'about',
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About/index.vue'),
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    meta: {
      title: '商品列表',
      keywords: '商品列表k',
      description: '商品列表d',
      navActive: 'goodsList',
    },
    component: () =>
      import(/* webpackChunkName: "detail" */ '@/views/GoodsList/index.vue'),
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: '详情',
      keywords: '详情k',
      description: '详情d',
      navActive: 'about',
    },
    component: () =>
      import(/* webpackChunkName: "detail" */ '@/views/Detail/index.vue'),
  },
  {
    path: '/localapi',
    name: 'localapi',
    meta: {
      title: '请求本地api样列',
      keywords: '请求本地,api样列',
      description: '请求本地midway服务api样列',
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/Localapi/index.vue'),
  },
];

export default DefaultLayoutRoutes;
