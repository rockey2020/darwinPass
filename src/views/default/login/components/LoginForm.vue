<template>
  <div class="LoginForm">
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
        ><template #label><span class="label">密码</span></template></van-field
      >

      <div class="da-flex da-flex-justify-center">
        <van-button type="primary" class="submit" @click="submit()"
          >登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import UserRepository from "@/network/module/user/repository/UserRepository";

export default {
  name: "LoginForm",
  data() {
    const required = { required: true, message: "不能为空" };
    //请输入10~20位至少两种类型的字符,仅允许数字、字母,中文和标点符号
    const passwordRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
    const password = {
      message:
        "请输入10~20位至少两种类型的字符,仅允许数字、字母,中文和标点符号",
      validator: (value, rule) => {
        //vant 表单无论required是否为true  都会进行校验
        const required = false;
        if (!required && value.length === 0) return true;
        return passwordRegex.test(value);
      },
    };

    const rules = {
      email: [required],
      password: [required, password],
    };
    const showPasswordController = {
      password: false,
    };
    return {
      rules,
      showPasswordController,
      formData: {
        email: "",
        password: "",
      },
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

    /deep/.van-field__control {
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
