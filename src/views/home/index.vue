<template>
  <div class="Home">
    <edit-password-item-dialog
      :show="showPasswordItemViewDialog"
      :type="editPasswordItemDialogType"
      :current-password-item="currentPasswordItem"
      @update:show="showPasswordItemViewDialog = $event"
    ></edit-password-item-dialog>

    <van-collapse v-model="activeCollapseNames">
      <van-collapse-item title="所有密码" name="AllPasswordItem">
        <all-password-item></all-password-item>
      </van-collapse-item>
      <van-cell
        class="cursor-pointer fix-cell-border"
        title="添加密码"
        @click="showAddPasswordItemViewDialogHandle"
      ></van-cell>
      <van-collapse-item
        title="生成随机安全密码"
        name="GenerateRandomSecurityPassword"
      >
        <generate-random-security-password></generate-random-security-password>
      </van-collapse-item>
      <van-collapse-item title="账号设置" name="4">
        <account-settings></account-settings>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import AccountSettings from "@/views/home/components/AccountSettings";
import AllPasswordItem from "@/views/home/components/AllPasswordItem";
import EditPasswordItemDialog from "@/views/home/components/EditPasswordItemDialog";
import GenerateRandomSecurityPassword from "@/views/home/components/GenerateRandomSecurityPassword";

export default {
  name: "Home",
  components: {
    AccountSettings,
    GenerateRandomSecurityPassword,
    EditPasswordItemDialog,
    AllPasswordItem,
  },
  data() {
    return {
      activeCollapseNames: ["AllPasswordItem"],
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

  .password-list {
    height: 11rem;
    max-height: 11rem;
    overflow: hidden;

    .full-height {
      height: 100%;
      max-height: 100%;
      overflow: hidden;
      overflow-y: auto;
    }
  }
}
</style>
