<template>
  <div class="PasswordList">
    <edit-password-dialog
      :show="showPasswordItemViewDialog"
      type="edit"
      :current-password-item="currentPasswordItem"
      @update:show="showPasswordItemViewDialog = $event"
    ></edit-password-dialog>

    <form action="/" v-if="hasSearch">
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
    <div v-if="hasCheckbox" class="da-flex">
      <div class="da-flex da-flex-inline">
        <van-button
          v-if="passwordListChecked.length === 0"
          type="primary"
          size="small"
          @click="checkAll"
          >全选
        </van-button>
        <van-button v-else type="primary" size="small" @click="cancelCheckAll"
          >取消全选
        </van-button>
      </div>
      <div class="da-flex da-flex-inline da-flex-offset-left-2">
        <van-button type="danger" size="small" @click="deletePasswordList"
          >批量删除
        </van-button>
      </div>
    </div>
    <div class="password-list-warp" v-if="passwordList.length !== 0">
      <van-checkbox-group
        class="van-checkbox-group full-height"
        ref="checkboxGroup"
        v-model="passwordListChecked"
      >
        <van-pull-refresh v-model="refreshing" @refresh="fetchPasswordList">
          <template v-for="(item, index) of passwordList" :key="index">
            <van-checkbox
              :class="{ 'not-checkbox': !hasCheckbox }"
              class="da-flex password-list-warp-item"
              :name="item.id"
            >
              <van-cell center :title="item.title" :label="item.username">
                <template #default>
                  <div class="da-flex da-flex-justify-end">
                    <div
                      class="da-flex da-flex-justify-space-around da-flex-item-85"
                    >
                      <div class="da-flex da-flex-inline">
                        <van-button
                          type="primary"
                          size="mini"
                          @click="copyPassword(item)"
                          >复制
                        </van-button>
                      </div>
                      <div class="da-flex da-flex-inline">
                        <van-button
                          type="warning"
                          size="mini"
                          @click="editPassword(item)"
                          >编辑
                        </van-button>
                      </div>
                      <div class="da-flex da-flex-inline">
                        <van-button
                          type="danger"
                          size="mini"
                          @click="deletePassword(item)"
                          >删除
                        </van-button>
                      </div>
                    </div>
                  </div>
                </template>
              </van-cell>
            </van-checkbox>
          </template>
        </van-pull-refresh>
      </van-checkbox-group>
    </div>
  </div>
</template>

<script>
import PasswordRepository from "@/network/module/user/repository/PasswordRepository";
import copyText from "@/utils/copyText";
import filterPassword from "@/utils/filterPassword";
import fuzzySearchPassword from "@/utils/fuzzySearchPassword";
import EditPasswordDialog from "@/views/home/components/EditPasswordDialog";

export default {
  name: "PasswordList",
  components: { EditPasswordDialog },
  props: {
    hasSearch: {
      type: Boolean,
      default: true,
    },
    hasCheckbox: {
      type: Boolean,
      default: true,
    },
    showCurrentDomain: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      refreshing: true,
      showPasswordItemViewDialog: false,
      currentPasswordItem: {},
      passwordListCached: [],
      passwordListChecked: [],
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
    async checkAll() {
      this.passwordListChecked = this.passwordList.map((value) => value.id);
    },
    async cancelCheckAll() {
      this.passwordListChecked = [];
    },
    async fetchPasswordList() {
      if (!this.refreshing) return;
      this.passwordListChecked = [];
      this.refreshing = true;

      PasswordRepository.fetchPasswordList()
        .then(async (res) => {
          if (this.showCurrentDomain) {
            res.data = await filterPassword(res.data);
            this.passwordListCached = res.data;
            this.passwordList = res.data;
          } else {
            this.passwordListCached = res.data;
            this.passwordList = res.data;
          }
        })
        .finally(() => (this.refreshing = false));
    },
    async copyPassword(item) {
      copyText(item.password)
        .then(() => {
          this.$toast.success("复制成功");
        })
        .catch(() => {
          this.$toast.fail("复制失败,请手动复制");
        });
    },
    async editPassword(item) {
      this.showPasswordItemViewDialogHandle(item);
    },
    async deletePassword(item) {
      this.$dialog
        .confirm({
          title: "是否确认删除",
          message: "是否要删除这个密码",
        })
        .then(() => {
          PasswordRepository.deletePasswordList({
            ids: [item.id],
          })
            .makeResponseStatusMessage({ message: "删除密码" })
            .then(this.fetchPasswordList);
        });
    },
    async deletePasswordList() {
      const titles = this.passwordListChecked.map(
        (value) =>
          this.passwordList
            .filter((value1) => value1.id === value)
            .map((value1) => value1.title || value1.url)[0]
      );
      this.$dialog
        .confirm({
          title: "是否确认删除",
          message: `是否要删除以下密码:
          ${titles.join(",")}`,
        })
        .then(() => {
          PasswordRepository.deletePasswordList({
            ids: this.passwordListChecked,
          })
            .makeResponseStatusMessage({ message: "批量删除密码" })
            .then(this.fetchPasswordList);
        });
    },
  },
  created() {
    this.fetchPasswordList();
  },
};
</script>

<style lang="less" scoped>
.PasswordList {
  height: 33rem;

  .password-list-warp {
    height: 78%;
    overflow: hidden;

    .full-height {
      height: 100%;
      max-height: 100%;
      overflow: hidden;
      overflow-y: auto;
    }

    .password-list-warp-item {
      &.not-checkbox {
        /deep/ .van-checkbox__icon {
          display: none;
        }
      }

      /deep/ .van-checkbox__label {
        width: 100%;
      }
    }
  }
}
</style>
