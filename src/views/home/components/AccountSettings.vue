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
        v-model="formData.maxIdleTime"
        label="最大闲置时间"
        :rules="rules.maxIdleTime"
      />
      <van-field
        clearable
        clickable
        v-model="formData.serviceType"
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
        serviceType: "",
        oldPassword: "",
        password: "",
      },
    };
  },
  methods: {
    async fetchUser() {
      UserRepository.fetchUser()
        .makeResponseStatusMessage({
          message: "请求用户信息",
        })
        .then((res) => {
          console.log(res);
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
