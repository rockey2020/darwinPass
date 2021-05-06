<template>
  <div class="Home">
    <edit-password-item-dialog
      :show="showPasswordItemViewDialog"
      :type="editPasswordItemDialogType"
      :current-password-item="currentPasswordItem"
      @update:show="showPasswordItemViewDialog = $event"
    ></edit-password-item-dialog>

    <div class="password-list" v-if="passwordList.length !== 0">
      <van-pull-refresh
        class="full-height"
        v-model="refreshing"
        @refresh="onListRefresh"
      >
        <template v-for="(item, index) of passwordList" :key="index">
          <van-cell
            center
            :title="item.title"
            :label="item.username"
            @click="showPasswordItemViewDialogHandle(item)"
          />
        </template>
      </van-pull-refresh>
    </div>

    <van-collapse v-model="activeCollapseNames">
      <van-collapse-item title="所有密码" name="AllPasswordItem">
        <all-password-item></all-password-item>
      </van-collapse-item>
      <van-collapse-item title="添加密码" name="2"></van-collapse-item>
      <van-collapse-item title="生成随机安全密码" name="3"></van-collapse-item>
      <van-collapse-item title="账号设置" name="4"></van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import PasswordRepository from "@/network/modules/user/repository/PasswordRepository";
import filterPassword from "@/utils/filterPassword";
import AllPasswordItem from "@/views/home/components/AllPasswordItem";
import EditPasswordItemDialog from "@/views/home/components/EditPasswordItemDialog";

export default {
  name: "Home",
  components: { EditPasswordItemDialog, AllPasswordItem },
  data() {
    return {
      activeCollapseNames: [],
      refreshing: false,
      passwordList: [],
      showPasswordItemViewDialog: false,
      currentPasswordItem: {},
      editPasswordItemDialogType: "edit",
    };
  },
  methods: {
    async showPasswordItemViewDialogHandle(item) {
      this.currentPasswordItem = item;
      this.showPasswordItemViewDialog = true;
      this.editPasswordItemDialogType = "edit";
    },
    async onListRefresh() {
      this.refreshing = true;
      PasswordRepository.fetchPasswordList()
        .makeResponseStatusMessage({ message: "请求列表" })
        .then(async (res) => {
          console.log(res);
          this.passwordList = await filterPassword(res.data);
        })
        .finally(() => (this.refreshing = false));
    },
  },
  created() {
    this.onListRefresh();
  },
};
</script>
<style lang="less" scoped>
.Home {
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
