import { RouteRecordRaw } from 'vue-router';
const Order: RouteRecordRaw = {
    path: '/order',
    name: 'SubmitOrder',
    redirect: '/order/submit',
    meta: {
        title: '订单结算',
        hideHeader: true,
        hideNavColumn: true,
        navActive: 1,
        hideBreadcrumb: true,
        keywords: '订单结算k',
        description: '订单结算d',
    },
    component: () => import(/* webpackChunkName: "SubmitOrder" */ '@/views/SubmitOrder/index.vue'),
    children: [
        {
            path: '/order/submit',
            name: 'SubmitOrder',
            meta: {
                title: '提交订单',
                hideHeader: true,
                // hideBreadcrumb: true,
                keywords: '提交订单k',
                description: '提交订单d',
                navActive: 1,
            },
            component: () =>
            import(/* webpackChunkName: "SubmitOrder" */ '@/views/SubmitOrder/submit.vue'),
        },
        {
            path: '/order/pay',
            name: 'SubmitOrderPay',
            meta: {
                title: '结算支付',
                hideHeader: true,
                hideBreadcrumb: true,
                keywords: '结算支付k',
                description: '结算支付d',
                navActive: '',
            },
            component: () =>
            import(/* webpackChunkName: "SubmitOrderPay" */ '@/views/SubmitOrder/pay.vue'),
        },
        {
            path: '/order/success',
            name: 'SubmitOrderSuccess',
            meta: {
            title: '提交成功',
                hideHeader: true,
                hideBreadcrumb: true,
                keywords: '提交成功k',
                description: '提交成功d',
                navActive: 3,
            },
            component: () =>
            import(/* webpackChunkName: "SubmitOrderSuccess" */ '@/views/SubmitOrder/success.vue'),
        },
    ]
}
export default Order