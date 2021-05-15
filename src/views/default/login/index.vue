<template>
  <div class="Login">
    <div
      class="da-flex da-flex-fixed da-flex-fixed-top da-flex-fixed-bottom da-flex-fixed-left da-flex-fixed-right da-flex-align-start"
      style="background-color: unset; overflow-y: auto"
    >
      <div
        class="da-flex da-flex-align-center da-flex-justify-center da-flex-column da-flex-relative content-warp"
      >
        <div class="da-flex da-flex-justify-center logo">
          <span>{{ title[formPanelKey] }}</span>
        </div>
        <div class="da-flex da-flex-justify-center system-name">
          <span>达尔文密码管理器 v{{ version }}</span>
        </div>
        <div class="da-flex">
          <login-form v-if="formPanelKey === 1" @success="toHome"></login-form>
          <forgot-password-form
            @success="formPanelKey = 1"
            v-if="formPanelKey === 2"
          ></forgot-password-form>
          <register-form
            v-if="formPanelKey === 3"
            @success="formPanelKey = 1"
          ></register-form>
        </div>
        <div class="da-flex da-flex-justify-space-around bottom-nav">
          <div class="da-flex da-flex-justify-space-around bottom-nav-item">
            <span @click="formPanelKey = 1">去登陆</span>
            <span @click="formPanelKey = 3">去注册</span>
            <span @click="formPanelKey = 2">忘记密码?</span>
            <router-link to="/about">关于我们</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ForgotPasswordForm from "@/views/default/login/components/ForgotPasswordForm";
import LoginForm from "@/views/default/login/components/LoginForm";
import RegisterForm from "@/views/default/login/components/RegisterForm";

import packageInfo from "../../../../package.json";

export default {
  name: "Login",
  components: { RegisterForm, ForgotPasswordForm, LoginForm },
  data() {
    return {
      version: packageInfo.version,
      //1:登录 2:忘记密码 3:注册
      formPanelKey: 3,
      title: {
        1: "登录",
        2: "忘记密码",
        3: "注册",
      },
    };
  },
  methods: {
    async toHome() {
      this.$router.replace({ name: "home" });
    },
  },
};
</script>

<style lang="less" scoped>
.Login {
  position: relative;
  width: 100%;
  height: 100%;
  @60bcb9: #60bcb9;

  .content-warp {
    padding: 0 3rem;
    padding-top: 3rem;
  }

  .logo {
    font-size: 32px;
    color: @60bcb9;
    font-weight: bold;
  }

  .system-name {
    color: @60bcb9;
    margin-top: 1rem;
  }

  .bottom-nav {
    a,
    span {
      color: @60bcb9;
      font-size: 14px;
      font-weight: bold;
    }

    .bottom-nav-item {
      cursor: pointer;
    }
  }
}
</style>
