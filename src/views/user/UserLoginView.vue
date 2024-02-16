<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 32px">用户登录</h2>
    <a-form
      :model="form"
      size="large"
      @submit="handleSubmit"
      label-align="left"
      auto-label-width
      style="max-width: 320px; margin: 0 auto"
    >
      <a-form-item
        field="username"
        :validate-trigger="['change', 'input']"
        :rules="[
          { minLength: 4, message: '账号长度不能少于4位' },
          { maxLength: 16, message: '账号长度不能超过16位' },
        ]"
      >
        <a-input v-model="form.username" placeholder="账号 (4~16位)" />
      </a-form-item>
      <a-form-item
        field="password"
        :validate-trigger="['change', 'input']"
        :rules="[
          { minLength: 6, message: '密码长度不能少于6位' },
          { maxLength: 16, message: '密码长度不能超过16位' },
        ]"
      >
        <a-input-password
          v-model="form.password"
          placeholder="密码 (6~16位)"
          aria-required="true"
        />
      </a-form-item>

      <a-form-item field="autoLogin" style="text-aligt: center">
        <div style="width: 100%; text-align: right">
          <a style="cursor: pointer; color: #1677ff" @click="toRegister"
            >没有账号？去注册</a
          >
        </div>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 320px"
          >登 录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { AdminUserControllerService, OpenAPI } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { clearToken, getToken, setToken } from "@/utils/auth";

/**
 * 表单信息
 */
const form = reactive({
  username: "",
  password: "",
} as any);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async (values: any, errors: any) => {
  if (values?.errors) {
    return;
  }
  if (form.username == "") {
    message.error("请输入账号！");
    return;
  }
  if (form.password == "") {
    message.error("请输入密码！");
    return;
  }
  const res = await AdminUserControllerService.loginUsingPost(form);
  // 登录成功，跳转到主页
  if (res.code === 0) {
    setToken(res.data.token);
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    clearToken();
    message.error("登陆失败，" + res.message);
  }
};

/**
 * 跳转至注册页面
 */
const toRegister = () => {
  router.push({
    path: "/user/register",
    replace: true,
  });
};
</script>
