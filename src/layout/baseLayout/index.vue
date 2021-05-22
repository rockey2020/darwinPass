<template>
  <div class="BaseLayout">
    <van-nav-bar
      class="van-nav-bar"
      :fixed="true"
      :placeholder="true"
      title="达尔文密码管理器"
      :left-text="!isHome ? '返回' : ''"
      :left-arrow="!isHome"
      @click-left="$router.back()"
    />
    <div class="router-render">
      <router-view class="router-view"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseLayout",
  computed: {
    isHome() {
      return this.$route.name === "home";
    },
  },
};
</script>

<style lang="less" scoped>
.BaseLayout {
  .van-nav-bar {
    /deep/ .van-nav-bar {
      background-color: #3d8af2;

      .van-nav-bar__title,
      .van-nav-bar__text,
      .van-icon {
        color: white;
      }
    }
  }

  .router-render {
    padding: 2rem;
    margin: 0 auto;

    .router-view {
      border-radius: 2rem;
      overflow: hidden;
    }
  }
}
</style>
