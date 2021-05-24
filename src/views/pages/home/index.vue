<template>
  <div class="Home">
    <edit-password-dialog
      @success="onPasswordSuccess"
      :show="showPasswordItemViewDialog"
      :type="editPasswordItemDialogType"
      :current-password-item="currentPasswordItem"
      @update:show="showPasswordItemViewDialog = $event"
    ></edit-password-dialog>

    <div class="part-password">
      <p class="valid">
        <van-tag plain type="success">当前有效密码</van-tag>
      </p>
      <password-list
        :has-checkbox="false"
        :has-search="false"
        :show-current-domain="true"
        ref="partPassword"
      ></password-list>
    </div>

    <van-collapse v-model="activeCollapseNames">
      <van-cell
        class="cursor-pointer fix-cell-border"
        title="所有密码"
        @click="$router.push('/allPassword')"
      ></van-cell>
      <van-cell
        class="cursor-pointer fix-cell-border"
        title="添加密码"
        @click="showAddPasswordItemViewDialogHandle"
      ></van-cell>
      <van-collapse-item title="批量导入密码" name="ImportPassword">
        <import-password @success="onPasswordSuccess"></import-password>
      </van-collapse-item>
      <van-collapse-item
        title="生成随机安全密码"
        name="GenerateRandomSecurityPassword"
      >
        <generate-random-security-password></generate-random-security-password>
      </van-collapse-item>
      <van-collapse-item title="账号设置" name="AccountSettings">
        <account-settings></account-settings>
      </van-collapse-item>
      <van-cell
        class="cursor-pointer fix-cell-border"
        title="退出登录"
        @click="signOut"
      ></van-cell>
    </van-collapse>
  </div>
</template>

<script>
import UserRepository from "@/module/user/repository/UserRepository";
import PasswordList from "@/views/components/PasswordList";
import AccountSettings from "@/views/pages/home/components/AccountSettings";
import EditPasswordDialog from "@/views/pages/home/components/EditPasswordDialog";
import GenerateRandomSecurityPassword from "@/views/pages/home/components/GenerateRandomSecurityPassword";
import ImportPassword from "@/views/pages/home/components/ImportPassword";

export default {
  name: "Home",
  components: {
    ImportPassword,
    AccountSettings,
    GenerateRandomSecurityPassword,
    EditPasswordDialog,
    PasswordList,
  },
  data() {
    return {
      activeCollapseNames: [],
      showPasswordItemViewDialog: false,
      currentPasswordItem: {},
      editPasswordItemDialogType: "edit",
    };
  },
  methods: {
    async showAddPasswordItemViewDialogHandle() {
      this.currentPasswordItem = {};
      this.showPasswordItemViewDialog = true;
      this.editPasswordItemDialogType = "add";
    },
    async onPasswordSuccess() {
      this.$refs?.partPassword?.fetchPasswordList();
    },
    async signOut() {
      UserRepository.signOut();
    },
  },
};
</script>
<style lang="less" scoped>
.Home {
  .fix-cell-border {
    &::after {
      border-top: 1px solid #ebedf0;
      border-bottom: 0;
      bottom: auto;
      top: 0;
    }
  }

  .part-password {
    background-color: white;
    padding-top: 1rem;

    .valid {
      text-align: center;
      color: #3d8af2;
      margin: 0;
      padding: 0;
      height: 3rem;
      line-height: 3rem;
    }

    /deep/ .PasswordList {
      height: 12rem;

      .password-list-warp {
        height: 10rem;
      }
    }
  }
}
</style>
