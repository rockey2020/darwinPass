<template>
  <div class="AllPasswordItem">
    <edit-password-item-dialog
      :show="showPasswordItemViewDialog"
      type="edit"
      :current-password-item="currentPasswordItem"
      @update:show="showPasswordItemViewDialog = $event"
    ></edit-password-item-dialog>

    <form action="/">
      <van-search
        input-align="center"
        v-model="searchForm.keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @update:model-value="onSearch"
      />
    </form>
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
  </div>
</template>

<script>
import PasswordRepository from "@/network/modules/user/repository/PasswordRepository";
import fuzzySearchPassword from "@/utils/fuzzySearchPassword";
import EditPasswordItemDialog from "@/views/home/components/EditPasswordItemDialog";

export default {
  name: "AllPasswordItem",
  components: { EditPasswordItemDialog },
  data() {
    return {
      refreshing: false,
      showPasswordItemViewDialog: false,
      currentPasswordItem: {},
      passwordListCached: [],
      passwordList: [],
      searchForm: {
        keywords: "",
      },
    };
  },
  methods: {
    async showPasswordItemViewDialogHandle(item) {
      this.currentPasswordItem = item;
      this.showPasswordItemViewDialog = true;
    },
    async onSearch() {
      this.passwordList = await fuzzySearchPassword(
        this.passwordListCached,
        this.searchForm.keywords
      );
    },
    async onCancel() {
      this.passwordList = this.passwordListCached;
    },
    async onListRefresh() {
      this.refreshing = true;
      PasswordRepository.fetchPasswordList()
        .then(async (res) => {
          this.passwordListCached = res.data;
          this.passwordList = res.data;
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
.AllPasswordItem {
  height: 33rem;
  max-height: 33rem;

  .password-list {
    height: 100%;
    max-height: 100%;
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
