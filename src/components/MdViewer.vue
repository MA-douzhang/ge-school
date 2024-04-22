<template>
  <Viewer
    class="viewer"
    :value="value"
    :plugins="plugins"
    :tabindex="2"
    :sanitize="23"
  ></Viewer>
</template>

<script setup lang="ts">
import "bytemd/dist/index.css";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";
import mediumZoom from "@bytemd/plugin-medium-zoom";

/**
 * 渲染Markdown格式的页面
 */
/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
}

const plugins = [
  gfm(),
  highlight(),
  mediumZoom(),

  // Add more plugins here
];

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style></style>
