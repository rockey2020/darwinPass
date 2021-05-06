<template>
  <div class="EditPasswordItemDialog">
    <van-dialog
      v-model:show="visible"
      theme="round-button"
      show-cancel-button
      :title="type === 'edit' ? '编辑密码' : '添加密码'"
      @confirm="onSubmit"
      :before-close="() => false"
      @cancel="() => (visible = false)"
    >
      <van-form
        ref="vanForm"
        @submit="onSubmit"
        label-width="5rem"
        colon
        show-error
        submit-on-enter
        validate-trigger="onChange"
      >
        <van-field
          clearable
          clickable
          v-model.trim="formData.url"
          name="网址"
          label="网址"
          placeholder="网址"
          rows="3"
          type="textarea"
          autosize
          :rules="rules.url"
        />
        <van-field
          clearable
          clickable
          v-model.trim="formData.title"
          name="标题"
          label="标题"
          placeholder="标题"
          :rules="rules.title"
        />
        <van-field
          clearable
          clickable
          v-model.trim="formData.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="rules.username"
        />
        <van-field
          clearable
          clickable
          v-model.trim="formData.password"
          :type="showPassword ? 'text' : 'password'"
          name="密码"
          label="密码"
          placeholder="密码"
          :right-icon="showPassword ? 'eye-o' : 'closed-eye'"
          @click-right-icon="showPassword = !showPassword"
          :rules="rules.password"
        />
        <van-field
          clearable
          clickable
          v-model.trim="formData.notes"
          name="备注"
          label="备注"
          rows="5"
          type="textarea"
          autosize
          placeholder="备注"
        />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import PasswordRepository from "@/network/modules/user/repository/PasswordRepository";

export default {
  name: "EditPasswordItemDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    // add or edit
    type: {
      type: String,
      default: "add",
    },
    currentPasswordItem: {
      type: Object,
      default: () => ({
        id: null,
        url: "",
        title: "",
        username: "",
        password: "",
        notes: "",
      }),
    },
  },
  data() {
    const required = { required: true, message: "不能为空" };
    const url = {
      pattern: /(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/,
      message: "url格式不正确",
    };
    return {
      visible: this.$props.show,
      showPassword: false,
      formData: {
        url: "",
        title: "",
        username: "",
        password: "",
        notes: "",
      },
      rules: {
        url: [required, url],
        title: [required],
        username: [required],
        password: [required],
      },
    };
  },
  watch: {
    async show() {
      this.visible = this.show;
      if (this.show) {
        if (this.type === "edit") {
          this.formData = this.currentPasswordItem;
        } else {
          this.formData = {
            url: "",
            title: "",
            username: "",
            password: "",
            notes: "",
          };
        }
      }
    },
    async visible() {
      this.$emit("update:show", this.visible);
    },
    async "formData.url"() {
      this.formData.url = this.formData.url.replace(/\r\n/g, "");
      this.formData.url = this.formData.url.replace(/\n/g, "");
    },
  },
  methods: {
    async onSubmit() {
      this.$refs.vanForm.validate().then(() => {
        PasswordRepository.updatePasswordItem(this.formData).then(
          () => (this.visible = false)
        );
      });
    },
  },
};
</script>

<style lang="less" scoped>
.EditPasswordItemDialog {
}
</style>
