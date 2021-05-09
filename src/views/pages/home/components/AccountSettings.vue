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

      <van-field
        clearable
        clickable
        v-model.trim="formData.oldPassword"
        :type="showPasswordController.oldPassword ? 'text' : 'password'"
        label="旧密码"
        placeholder="如无需更换,请为空"
        :right-icon="
          showPasswordController.oldPassword ? 'eye-o' : 'closed-eye'
        "
        @click-right-icon="
          showPasswordController.oldPassword = !showPasswordController.oldPassword
        "
        :rules="rules.oldPassword"
      />

      <van-field
        clearable
        clickable
        v-model.trim="formData.newPassword"
        :type="showPasswordController.newPassword ? 'text' : 'password'"
        label="新密码"
        placeholder="如无需更换,请为空"
        :right-icon="
          showPasswordController.newPassword ? 'eye-o' : 'closed-eye'
        "
        @click-right-icon="
          showPasswordController.newPassword = !showPasswordController.newPassword
        "
        :rules="rules.newPassword"
      />

      <van-field
        clearable
        clickable
        v-model.trim="formData.newPassword2"
        :type="showPasswordController.newPassword2 ? 'text' : 'password'"
        label="二次输入密码"
        placeholder="如无需更换,请为空"
        :right-icon="
          showPasswordController.newPassword2 ? 'eye-o' : 'closed-eye'
        "
        @click-right-icon="
          showPasswordController.newPassword2 = !showPasswordController.newPassword2
        "
        :rules="rules.newPassword2"
      />

      <div class="da-flex da-flex-justify-center">
        <van-button type="primary" class="submit" @click="submit()"
          >更新
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import UserRepository from "@/network/module/user/repository/UserRepository";

export default {
  name: "AccountSettings",
  data() {
    const required = { required: true, message: "不能为空" };
    //请输入10~20位至少两种类型的字符,仅允许数字、字母和标点符号
    const passwordRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
    const password = {
      message: "请输入10~20位至少两种类型的字符,仅允许数字、字母和标点符号",
      validator: (value, rule) => {
        //vant 表单无论required是否为true  都会进行校验
        const required = false;
        if (!required && value.length === 0) return true;
        return passwordRegex.test(value);
      },
    };
    const verifyPassword = {
      message: "新密码输入不一致",
      validator: (value, rule) => {
        //vant 表单无论required是否为true  都会进行校验
        const required = false;
        if (!required && value.length === 0) return true;
        return value === this.formData.newPassword;
      },
    };
    const rules = {
      username: [required],
      email: [required],
      maxIdleTime: [required],
      oldPassword: [password],
      newPassword: [password],
      newPassword2: [password, verifyPassword],
    };
    const showPasswordController = {
      oldPassword: false,
      newPassword: false,
      newPassword2: false,
    };
    return {
      rules,
      showPasswordController,
      formData: {
        username: "",
        email: "",
        maxIdleTime: "",
        servicePlatformTypeText: "",
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
      },
    };
  },
  methods: {
    async fetchUser() {
      UserRepository.fetchUser().then((res) => {
        this.formData = { ...this.formData, ...res };
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
