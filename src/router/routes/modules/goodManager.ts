import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const GOODMANAGER: AppRouteRecordRaw = {
  path: '/goodManager',
  name: 'goodManager',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.goodManager',
    requiresAuth: true,
    icon: 'icon-gift',
    order: 0,
  },
  children: [
    {
      path: 'goodCreate',
      name: 'GoodCreate',
      component: () => import('@/views/goodsManger/create/index.vue'),
      meta: {
        locale: '商品创建',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'goodList',
      name: 'GoodList',
      component: () => import('@/views/goodsManger/list/index.vue'),
      meta: {
        locale: '商品列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'goodEdit',
      name: 'GoodEdit',
      component: () => import('@/views/goodsManger/edit/index.vue'),
      meta: {
        locale: '商品编辑',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};

export default GOODMANAGER;
