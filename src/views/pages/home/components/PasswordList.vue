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
      <div class="da-flex da-flex-inline da-flex-offset-left-2">
        <span>共{{ passwordList.length }}条密码</span>
      </div>
    </div>
    <div v-else class="da-flex da-flex-justify-center">
      <div class="da-flex da-flex-inline" style="height: 2rem">
        <span class="">共{{ passwordList.length }}条密码</span>
      </div>
    </div>
    <div class="password-list-warp" v-if="passwordList.length !== 0">
      <van-checkbox-group
        class="van-checkbox-group full-height"
        ref="checkboxGroup"
        v-model="passwordListChecked"
      >
        <template v-for="(item, index) of passwordList" :key="index">
          <van-checkbox
            :class="{ 'not-checkbox': !hasCheckbox }"
            class="da-flex password-list-warp-item"
            :name="item.id"
          >
            <van-cell
              class="van-cell"
              :title="item.title"
              :label="item.username"
            >
              <template #default>
                <div class="da-flex da-flex-justify-end">
                  <div class="da-flex da-flex-justify-space-around">
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
      </van-checkbox-group>
    </div>
    <div class="da-flex da-flex-justify-center empty" v-else>
      <van-empty image="error" description="暂无数据" />
    </div>
  </div>
</template>

<script>
import PasswordRepository from "@/module/user/repository/PasswordRepository";
import copyText from "@/utils/copyText";
import filterPassword from "@/utils/filterPassword";
import fuzzySearchPassword from "@/utils/fuzzySearchPassword";
import EditPasswordDialog from "@/views/pages/home/components/EditPasswordDialog";

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
      refreshing: false,
      showPasswordItemViewDialog: false,
      currentPasswordItem: {},
      passwordListChecked: [],
      passwordList: [],
      searchForm: {
        keywords: "",
      },
    };
  },
  computed: {
    passwordListCached() {
      return this.$store.state.password.list;
    },
  },
  watch: {
    passwordListCached: {
      handler: async function () {
        let list = this.passwordListCached;
        if (this.showCurrentDomain) {
          list = await filterPassword(list);
          this.passwordList = list;
        }
        this.passwordList = list;
      },
      immediate: true,
    },
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
      if (this.refreshing) return;
      this.passwordListChecked = [];
      this.refreshing = true;

      PasswordRepository.fetchPasswordList().finally(
        () => (this.refreshing = false)
      );
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
          PasswordRepository.batchDeletePassword({
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
          PasswordRepository.batchDeletePassword({
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
  background-color: white;

  .empty {
    /deep/ .van-empty__image {
      width: 80px;
      height: 80px;
    }
  }

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
      .van-cell {
        padding-left: 5px;
        padding-right: 5px;
      }

      /deep/ .van-cell__title {
        overflow-x: hidden;

        * {
          width: 100%;
          overflow-wrap: anywhere;
        }
      }

      /deep/ .van-checkbox__icon {
        font-size: 16px;
      }

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
