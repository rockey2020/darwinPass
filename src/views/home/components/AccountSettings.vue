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
        clickable
        v-model="formData.username"
        label="用户名"
        :rules="rules.username"
      />
      <van-field
        clearable
        clickable
        v-model="formData.email"
        label="邮箱"
        :rules="rules.email"
      />
      <van-field
        clearable
        clickable
        type="number"
        v-model.number="formData.maxIdleTime"
        label="最大闲置时间"
        :rules="rules.maxIdleTime"
      />
      <van-field
        clearable
        clickable
        disabled
        v-model="formData.servicePlatformTypeText"
        label="数据服务平台"
      />
    </van-form>
  </div>
</template>

<script>
import UserRepository from "@/network/module/user/repository/UserRepository";

export default {
  name: "AccountSettings",
  data() {
    const required = { required: true, message: "不能为空" };
    const rules = {
      username: [required],
      email: [required],
      maxIdleTime: [required],
    };
    return {
      rules,
      formData: {
        username: "",
        email: "",
        maxIdleTime: "",
        servicePlatformTypeText: "",
        oldPassword: "",
        password: "",
      },
    };
  },
  methods: {
    async fetchUser() {
      UserRepository.fetchUser().then((res) => {
        this.formData = { ...this.formData, ...res };
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
}
</style>
