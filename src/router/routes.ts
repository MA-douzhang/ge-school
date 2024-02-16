import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SchoolAboutView from "@/views/school/SchoolAboutView.vue";
import SchoolNewsView from "@/views/school/SchoolNewsView.vue";
import SchoolCollaborateView from "@/views/school/SchoolCollaborateView.vue";
import FacultyProfessorView from "@/views/faculty/FacultyProfessorView.vue";
import FacultyTeachersView from "@/views/faculty/FacultyTeachersView.vue";
import FacultyStaffView from "@/views/faculty/FacultyStaffView.vue";
import PedagogicalDynamicView from "@/views/pedagogical/PedagogicalDynamicView.vue";
import PedagogicalCompetitionView from "@/views/pedagogical/PedagogicalCompetitionView.vue";
import ResourcesBaseView from "@/views/resources/ResourcesBaseView.vue";
import ResourcesRoomView from "@/views/resources/ResourcesRoomView.vue";
import ResourcesCollegeView from "@/views/resources/ResourcesCollegeView.vue";
import ResearchExchangesView from "@/views/research/ResearchExchangesView.vue";
import ResearchResultsView from "@/views/research/ResearchResultsView.vue";
import ResearchGroupsView from "@/views/research/ResearchGroupsView.vue";
import WorkConstructionView from "@/views/work/WorkConstructionView.vue";
import WorkRegulationsView from "@/views/work/WorkRegulationsView.vue";
import WorkDemeanorView from "@/views/work/WorkDemeanorView.vue";
import BuildingWorkOrganizationsView from "@/views/buildingWork/BuildingWorkOrganizationsView.vue";
import BuildingWorkActiveView from "@/views/buildingWork/BuildingWorkActiveView.vue";
import postDetail from "@/views/post/postDetail.vue";
import ProfessionalsView from "@/views/professional/ProfessionalsView.vue";
import QuestionView from "@/views/question/QuestionView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import QuestionDetail from "@/views/question/QuestionDetail.vue";
import QuestionAdd from "@/views/question/QuestionAdd.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "学院概况",
    component: HomeView,
  },
  {
    path: "/post/detail",
    name: "文章详情",
    component: postDetail,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/school",
    name: "学院动态",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: "/school/about",
        name: "通知公告",
        component: SchoolAboutView,
      },
      {
        path: "/school/news",
        name: "学校新闻",
        component: SchoolNewsView,
      },
      {
        path: "/school/collaborate",
        name: "学校合作",
        component: SchoolCollaborateView,
      },
    ],
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/professional",
    name: "专业简介",
    component: ProfessionalsView,
  },
  {
    path: "/faculty",
    name: "师资队伍",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: "/faculty/professor",
        name: "特聘教授",
        component: FacultyProfessorView,
      },
      {
        path: "/faculty/teachers",
        name: "专职教师",
        component: FacultyTeachersView,
      },
      {
        path: "/faculty/staff",
        name: "行政人员",
        component: FacultyStaffView,
      },
    ],
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/pedagogical",
    name: "教育教学",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: "/pedagogical/dynamic",
        name: "教学动态",
        component: PedagogicalDynamicView,
      },
      {
        path: "/pedagogical/competition",
        name: "学科竞赛",
        component: PedagogicalCompetitionView,
      },
    ],
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/resources",
    name: "教学资源",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: "/resources/room",
        name: "实验实训室",
        component: ResourcesRoomView,
      },
      {
        path: "/resources/base",
        name: "校外实践基地",
        component: ResourcesBaseView,
      },
      {
        path: "/resources/college",
        name: "产业学院",
        component: ResourcesCollegeView,
      },
    ],
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/research",
    name: "科学研究",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: "/research/groups",
        name: "科研团体",
        component: ResearchGroupsView,
      },
      {
        path: "/research/results",
        name: "科研成果",
        component: ResearchResultsView,
      },
      {
        path: "/research/exchanges",
        name: "学术交流",
        component: ResearchExchangesView,
      },
    ],
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/work",
    name: "学生工作",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: "/work/demeanor",
        name: "学生风采",
        component: WorkDemeanorView,
      },
      {
        path: "/work/construction",
        name: "学风建设",
        component: WorkConstructionView,
      },
      {
        path: "/work/regulations",
        name: "规章制度",
        component: WorkRegulationsView,
      },
    ],
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/buildingWork",
    name: "党建工作",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        path: "/buildingWork/organizations",
        name: "基层组织",
        component: BuildingWorkOrganizationsView,
      },
      {
        path: "/buildingWork/active",
        name: "党员活动",
        component: BuildingWorkActiveView,
      },
    ],
    meta: {
      hideInMenu: false,
    },
  },
  {
    path: "/question",
    name: "问题咨询",
    component: QuestionView,
  },
  {
    path: "/question/detail",
    name: "问题",
    component: QuestionDetail,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/question/add",
    name: "发布问题",
    component: QuestionAdd,
    meta: {
      hideInMenu: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
