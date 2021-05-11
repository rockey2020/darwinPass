<template>
  <div class="LoginForm">
    <service-platform-popup
      :selected-id="formData.servicePlatformType"
      :show="isShowServicePlatformPopup"
      @onSelected="(val) => (formData.servicePlatformType = val.id)"
      @update:show="isShowServicePlatformPopup = false"
    ></service-platform-popup>
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
      </van-field>

      <van-field
        clearable
        clickable
        v-model.trim="formData.password"
        :type="showPasswordController.password ? 'text' : 'password'"
        placeholder="请输入密码"
        :right-icon="showPasswordController.password ? 'eye-o' : 'closed-eye'"
        @click-right-icon="
          showPasswordController.password = !showPasswordController.password
        "
        :rules="rules.password"
      >
        <template #label><span class="label">密码</span></template>
      </van-field>

      <van-field
        clearable
        clickable
        disabled
        readonly
        v-model.number="ServicePlatformTypeFront[formData.servicePlatformType]"
        :rules="rules.servicePlatformType"
        placeholder="请选择数据服务平台"
        @click="isShowServicePlatformPopup = true"
      >
        <template #label><span class="label">数据服务平台</span></template>
      </van-field>

      <div class="da-flex da-flex-justify-center">
        <van-button type="primary" class="submit" @click="submit"
          >登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {
  ServicePlatformType,
  ServicePlatformTypeFront,
} from "@/network/common/constant/ServicePlatformConstant";
import UserRepository from "@/network/module/user/repository/UserRepository";
import regexRules from "@/utils/regexRules";
import ServicePlatformPopup from "@/views/components/servicePlatformPopup";

export default {
  name: "LoginForm",
  components: { ServicePlatformPopup },
  data() {
    const rules = regexRules.rules;
    const showPasswordController = {
      password: false,
    };

    return {
      rules,
      showPasswordController,
      formData: {
        email: "",
        password: "",
        servicePlatformType: ServicePlatformType.DarwinPassService,
      },
      ServicePlatformTypeFront,
      isShowServicePlatformPopup: false,
    };
  },
  methods: {
    async submit() {
      this.$refs.vanForm.validate().then(() => {
        UserRepository.login(this.formData)
          .makeResponseStatusMessage({
            message: "登录",
          })
          .then((e) => {
            console.log(e);
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.LoginForm {
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
