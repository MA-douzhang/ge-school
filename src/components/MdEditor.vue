<template>
  <Editor
    :value="value"
    :mode="mode"
    :plugins="plugins"
    :upload-images="handleUploadFile"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import 'bytemd/dist/index.css'
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref, withDefaults, defineProps } from "vue";
import { OssControllerService } from "../../generated/services/OssControllerService";
import mediumZoom from "@bytemd/plugin-medium-zoom";


/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
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
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const handleUploadFile = async (files: any) => {
  const res = await OssControllerService.uploadEditUsingPost(files);
  console.log(res);
  console.log(res.data);

  return [
    {
      title: "图片",
      url: res.data,
    },
  ];
};
</script>

<style>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none;
}
.bytemd {
  height: calc(100vh - 200px);
}
</style>
