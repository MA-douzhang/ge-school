<template>
  <a-row
    id="globalHeader"
    align="center"
    :wrap="false"
    style="background: #282a2e"
  >
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
        theme="dark"
      >
        <a-menu-item key="/" :style="{ padding: 0, marginRight: '38px' }">
          <div class="title-bar">
            <img class="logo" src="../assets/yxtx/schoolLogo.png" />
          </div>
        </a-menu-item>
        <template v-for="item in visibleRoutes" :key="item.name">
          <a-sub-menu
            v-if="item.children && item.children.length > 0"
            :key="item.path"
          >
            <template #title>
              <span> {{ item.name }}</span>
            </template>
            <a-menu-item v-for="temp in item.children" :key="temp.path">
              {{ temp.name }}
            </a-menu-item>
          </a-sub-menu>
          <!-- 没有下级 -->
          <a-menu-item
            v-else
            :key="item.path"
            v-show="item.meta?.hideInMenu !== false"
          >
            {{ item.name }}
          </a-menu-item>
        </template>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        <a-dropdown>
          <a-button>
            {{ store.state.user?.loginUser?.username ?? "未登录" }}
          </a-button>
          <template v-if="store.state.user?.loginUser?.username" #content>
            <a-doption>个人信息</a-doption>
            <a-doption @click="logout">退出</a-doption>
          </template>
          <template v-else #content>
            <a-doption @click="login">登录</a-doption>
          </template>
        </a-dropdown>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { clearToken } from "@/utils/auth";
const router = useRouter();
const store = useStore();

//展示菜单的路由
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    //根据权限过滤菜单

    return true;
  });
});

//路由跳转
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const selectedKeys = ref(["/"]);
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

const logout = () => {
  clearToken();
  doMenuClick("/user/login");
};

const login = () => {
  doMenuClick("/user/login");
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
