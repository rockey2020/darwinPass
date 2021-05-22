<template>
  <div class="AccountSettings">
    <van-form
      ref="vanForm"
      label-width="10rem"
      colon
      show-error
      validate-trigger="onChange"
    >
      <van-field
        clearable
        required
        clickable
        v-model="formData.username"
        label="用户名"
        :rules="rules.username"
      />
      <van-field
        clearable
        required
        clickable
        disabled
        readonly
        v-model="formData.email"
        label="邮箱"
        :rules="rules.email"
      />
      <van-field
        clearable
        required
        clickable
        type="number"
        v-model.number="formData.maxIdleTime"
        label="最大闲置时间"
        :rules="rules.maxIdleTime"
      />
      <van-field
        clearable
        clickable
        required
        disabled
        v-model="formData.servicePlatformTypeText"
        label="数据服务平台"
      />

      <div class="da-flex da-flex-justify-center">
        <van-button type="primary" class="submit" @click="submit"
          >更新
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import UserRepository from "@/module/user/repository/UserRepository";
import regexRules from "@/utils/regexRules";

export default {
  name: "AccountSettings",
  data() {
    return {
      rules: regexRules.rules,
      formData: {
        username: "",
        email: "",
        maxIdleTime: "",
        servicePlatformTypeText: "",
      },
    };
  },
  methods: {
    async fetchUser() {
      UserRepository.fetchUser().then((res) => {
        this.formData = res;
      });
    },
    async submit() {
      this.$refs.vanForm.validate().then(() => {
        UserRepository.updateUser(this.formData)
          .makeResponseStatusMessage({
            message: "更新用户信息",
          })
          .then(() => {
            this.fetchUser();
          });
      });
    },
  },
  created() {
    this.fetchUser();
  },
};
</script>

<style lang="less" scoped>
.AccountSettings {
  .submit {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
}
</style>
