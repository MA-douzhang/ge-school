import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USERMANAGER: AppRouteRecordRaw = {
  path: '/userManager',
  name: 'userManager',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.userManager',
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 0,
  },
  children: [
    {
      path: 'address',
      name: 'Address',
      component: () => import('@/views/userManger/address/index.vue'),
      meta: {
        locale: '地址管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/userManger/user/index.vue'),
      meta: {
        locale: '用户管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default USERMANAGER;
