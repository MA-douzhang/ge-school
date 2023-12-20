import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const MALLMANAGER: AppRouteRecordRaw = {
  path: '/mallManager',
  name: 'mallManager',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.mallManager',
    requiresAuth: true,
    icon: 'icon-desktop',
    order: 0,
  },
  children: [
    {
      path: 'goodOrder',
      name: 'GoodOrder',
      component: () => import('@/views/mall/order/index.vue'),
      meta: {
        locale: '订单管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default MALLMANAGER;
