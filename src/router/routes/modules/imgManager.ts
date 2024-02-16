import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const ImgManager: AppRouteRecordRaw = {
  path: '/imgManager',
  name: 'imgManager',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.imgManager',
    requiresAuth: true,
    icon: 'icon-gift',
    order: 0,
  },
  children: [
    {
      path: 'imgList',
      name: 'ImgList',
      component: () => import('@/views/imgManger/list/index.vue'),
      meta: {
        locale: '图片列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default ImgManager;
