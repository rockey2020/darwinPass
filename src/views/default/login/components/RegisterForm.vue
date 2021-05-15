<template>
  <div class="RegisterForm">
    <van-form
      ref="vanForm"
      label-width="0px"
      show-error
      validate-trigger="onChange"
      class="vanForm"
    >
      <van-field
        clearable
        clickable
        v-model="formData.email"
        :rules="rules.email"
        placeholder="请输入邮箱"
      >
        <template #label><span class="label">邮箱</span></template>
        <template #button>
          <van-button
            size="small"
            :disabled="isSend"
            @click="sendCaptcha"
            type="warning"
          >
            <span v-if="!isSend">发送验证码</span>
            <span v-else>{{ countDown }}</span>
          </van-button>
        </template>
      </van-field>

      <van-field
        clearable
        clickable
        v-model="formData.captchaCode"
        :rules="rules.captchaCode"
        placeholder="请输入邮箱验证码"
      >
        <template #label><span class="label">邮箱验证码</span></template>
      </van-field>

      <van-field
        clearable
        clickable
        v-model.trim="formData.password"
        :type="showPasswordController.password ? 'text' : 'password'"
        placeholder="请输入新密码"
        :right-icon="showPasswordController.password ? 'eye-o' : 'closed-eye'"
        @click-right-icon="
          showPasswordController.password = !showPasswordController.password
        "
        :rules="rules.password"
      >
        <template #label><span class="label">新密码</span></template>
      </van-field>

      <div class="da-flex da-flex-justify-center">
        <van-button type="primary" class="submit" @click="submit"
          >提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import CaptchaRepository from "@/network/module/user/repository/CaptchaRepository";
import UserRepository from "@/network/module/user/repository/UserRepository";
import regexRules from "@/utils/regexRules";

export default {
  name: "RegisterForm",
  data() {
    const rules = regexRules.rules;
    return {
      rules,
      showPasswordController: {
        password: false,
      },
      formData: {
        email: "",
        password: "",
        captchaCode: "",
        captchaId: "",
      },
      isSend: false,
      countDown: 0,
      countDownInterval: null,
    };
  },
  methods: {
    async startCountDown() {
      const baseTime = 60; //60秒
      clearInterval(this.countDownInterval);
      this.countDown = baseTime;
      this.countDownInterval = setInterval(async () => {
        if (this.countDown <= 0) {
          this.countDown = 0;
          this.isSend = false;
          clearInterval(this.countDownInterval);
          this.countDownInterval = null;
        } else {
          this.countDown--;
        }
      }, 1000);
    },
    async sendCaptcha() {
      if (this.isSend) return;
      CaptchaRepository.fetchCaptchaByEmail({
        email: this.formData.email,
      })
        .makeResponseStatusMessage({ message: "发送验证码" })
        .then(() => {
          this.isSend = true;
          this.startCountDown();
        });
    },
    async submit() {
      this.$refs.vanForm.validate().then(() => {
        UserRepository.forgotPassword(this.formData)
          .makeResponseStatusMessage({
            message: "找回密码",
          })
          .then((e) => {
            this.$emit("success");
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.RegisterForm {
  width: 100%;
  margin-bottom: 2rem;

  .vanForm {
    /deep/ .van-cell {
      background-color: unset;
      overflow: unset;
      margin-bottom: 3rem;
      margin-top: 5rem;

      &::after {
        border-bottom: 1px solid #a2dcda;
        transform: scaleY(2);
      }
    }

    .label {
      position: absolute;
      top: -2rem;
      color: #60bcb9;
    }

    /deep/ .van-field__control {
      &::placeholder {
        color: #60bcb9;
      }
    }

    .submit {
      background-color: #65c0bd;
      border-color: #65c0bd;
      width: 14rem;
      border-radius: 10rem;
      box-shadow: 0 2px 6px #66c0bd;
    }
  }
}
</style>
