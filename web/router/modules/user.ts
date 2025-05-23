import UserCenter from '@/views/UserCenter/index.vue';
import { RouteRecordRaw } from 'vue-router';
const User: RouteRecordRaw = {
  path: '/userCenter',
  name: 'UserCenter',
  redirect: '/userCenter/index',
  meta: {
    title: '用户中心',
    keywords: '用户中心k',
    description: '用户中心d',
    navActive: 'home',
  },
  component: UserCenter,
  children: [
    {
      path: '/userCenter/index',
      name: 'UserCenterIndex',
      component: () => import('@/views/UserCenter/userInfo/index.vue'),
      meta: {
        title: '用户中心',
        icon: 'User',
        keywords: '用户中心k',
        description: '用户中心d',
        navActive: 'userCenter',
      },
    },
    {
      path: '/userCenter/order',
      name: 'UserCenterOrder',
      redirect: '/userCenter/order/list',
      meta: {
        title: '订单列表',
        keywords: '订单列表k',
        icon: 'List',
        hideChildren: true,
        description: '订单列表d',
      },
      component: () => import('@/views/UserCenter/order/index.vue'),
      children: [
        {
          path: '/userCenter/order/list',
          name: 'UserCenterOrderList',
          component: () => import('@/views/UserCenter/order/list.vue'),
          meta: {
            title: '订单列表',
            keywords: '订单列表k',
            icon: 'List',
            description: '订单列表d',
          },
        },
        {
          path: '/userCenter/order/detail',
          name: 'UserCenterOrderDetail',
          component: () => import('@/views/UserCenter/order/detail.vue'),
          meta: {
            title: '订单详情',
            hideInMenu: true,
            hideMenu: true,
            keywords: '订单详情k',
            navActive: 'UserCenterOrder',
            description: '订单详情d',
          },
        },
      ],
    },
    // {
    //     path: '/userCenter/order/detail',
    //     name: 'UserCenterOrderDetail',
    //     component: () => import('@/views/UserCenter/order/detail.vue'),
    //     meta: {
    //         title: '订单详情',
    //         hideInMenu: true,
    //         hideMenu: true,
    //         keywords: '订单详情k',
    //         navActive: 'UserCenterOrder',
    //         description: '订单详情d',
    //     },
    // },
    {
      path: '/userCenter/safe',
      name: 'UserCenterSafe',
      component: () => import('@/views/UserCenter/safe/index.vue'),
      meta: {
        title: '安全设置',
        icon: 'Setting',
        navActive: 'userCenter',
        keywords: '安全设置k',
        description: '安全设置d',
      },
    },
  ],
};
export default User;
