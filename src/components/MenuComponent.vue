<template>
  <div>
    <a-card
      :style="{
        width: '190px',
      }"
      class="navbar"
      title="导航栏"
    >
      <a-menu :selected-keys="selectedKeys" @menu-item-click="doMenuClick">
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
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, withDefaults, defineProps } from "vue";
/**
 * 定义组件属性类型
 */
interface Props {
  selectedKeys: string;
  visibleRoutes?: [];
}
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  selectedKeys: () => "/",
  visibleRoutes: () => [],
});

const router = useRouter();
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  position: fixed;
  left: 0;
  margin: 5px;
  height: 60px;
  z-index: 999;
}
</style>
