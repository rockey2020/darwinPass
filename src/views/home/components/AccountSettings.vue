<template>
  <div class="AccountSettings">
    <van-form ref="vanForm" colon show-error validate-trigger="onChange">
      <van-field
        v-model="formData.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="formData.username"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        :rules="rules.username"
      />
      <van-field
        v-model="formData.username"
        name="最大闲置时间"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
    </van-form>
  </div>
</template>

<script>
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
        oldPassword: "",
        password: "",
        maxIdleTime: "",
        encryptionAlgorithm: "",
        serviceType: "",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.AccountSettings {
}
</style>
