<template>
  <div class="Login">
    <div
      class="da-flex da-flex-fixed da-flex-fixed-top da-flex-fixed-bottom da-flex-fixed-left da-flex-fixed-right"
      style="background-color: unset"
    >
      <div
        class="da-flex da-flex-align-center da-flex-justify-center da-flex-column da-flex-relative content-warp"
      >
        <div class="da-flex da-flex-justify-center logo"><span>登录</span></div>
        <div class="da-flex da-flex-justify-center system-name">
          <span>达尔文密码管理器 v{{ version }}</span>
        </div>
        <div class="da-flex">
          <login-form v-if="showLoginForm" @success="toHome"></login-form>
          <forgot-password-form @success="toHome" v-else></forgot-password-form>
        </div>
        <div class="da-flex da-flex-column da-flex-align-end bottom-nav">
          <div class="da-flex da-flex-inline bottom-nav-item">
            <span @click="showLoginForm = false" v-if="showLoginForm"
              >忘记密码?</span
            >
            <span @click="showLoginForm = true" v-else>去登陆</span>
          </div>
          <div class="da-flex da-flex-inline bottom-nav-item">
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

import packageInfo from "../../../../package.json";

export default {
  name: "Login",
  components: { ForgotPasswordForm, LoginForm },
  data() {
    return {
      version: packageInfo.version,
      showLoginForm: false,
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
      font-size: 13px;
      font-weight: bold;
    }

    .bottom-nav-item {
      height: 2.5rem;
    }
  }
}
</style>
