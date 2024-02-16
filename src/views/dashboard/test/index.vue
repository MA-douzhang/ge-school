<template>
  <div id="test">
    <Editor class="editos" :value="value" />
  </div>
</template>

<script setup lang="ts">
import 'bytemd/dist/index.css'
import { Editor, Viewer } from "@bytemd/vue-next";
import { ref } from "vue";

const value=ref("\n" +
  "> Problem: [两数之和]()\n" +
  "\n" +
  "\n" +
  "# 思路\n" +
  "\n" +
  "> 讲述看到这一题的思路\n" +
  "\n" +
  "# 解题方法\n" +
  "\n" +
  "> 描述你的解题方法\n" +
  "\n" +
  "# 复杂度\n" +
  "\n" +
  "时间复杂度:\n" +
  "> 添加时间复杂度, 示例： $O(n)$\n" +
  "\n" +
  "空间复杂度:\n" +
  "> 添加空间复杂度, 示例： $O(n)$\n" +
  "\n" +
  "\n" +
  "\n" +
  "# Code\n" +
  "```Java []\n" +
  "class Solution {\n" +
  "    public int[] twoSum(int[] nums, int target) {\n" +
  "        for(int i=0;i< nums.length;i++){\n" +
  "            int demo=target-nums[i];\n" +
  "            for (int n=i+1;n<nums.length;n++){\n" +
  "                if(nums[n]==demo){\n" +
  "                    return new int[]{i,n};\n" +
  "                }\n" +
  "            }\n" +
  "        }\n" +
  "    return new int[]{-1,-1};\n" +
  "    }\n" +
  "}\n" +
  "```")
</script>

<style scoped>

</style>
