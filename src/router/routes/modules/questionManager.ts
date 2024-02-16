import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const QuestionManager: AppRouteRecordRaw = {
  path: '/questionManager',
  name: 'questionManager',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.question',
    requiresAuth: true,
    icon: 'icon-question',
    order: 0,
  },
  children: [
    {
      path: 'questionList',
      name: 'questionList',
      component: () => import('@/views/questionManger/list/index.vue'),
      meta: {
        locale: '问题列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'edit',
      name: 'Edit',
      component: () => import('@/views/questionManger/edit/index.vue'),
      meta: {
        locale: '问题编辑',
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
    },
  ],
};

export default QuestionManager;
