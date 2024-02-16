import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PostManager: AppRouteRecordRaw = {
  path: '/postManager',
  name: 'postManager',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.postManager',
    requiresAuth: true,
    icon: 'icon-desktop',
    order: 0,
  },
  children: [
    {
      path: 'postList',
      name: 'PostList',
      component: () => import('@/views/postManger/list/index.vue'),
      meta: {
        locale: '文章列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'save',
      name: 'Save',
      component: () => import('@/views/postManger/edit/index.vue'),
      meta: {
        locale: '文章新建',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'edit',
      name: 'Edits',
      component: () => import('@/views/postManger/edit/index.vue'),
      meta: {
        locale: "文章编辑",
        requiresAuth: true,
        roles: ['*'],
        hideInMenu:true
      },
    },
  ],
};

export default PostManager;
