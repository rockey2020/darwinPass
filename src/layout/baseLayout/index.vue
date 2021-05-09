<template>
  <div class="BaseLayout">
    <van-nav-bar
      class="van-nav-bar"
      :fixed="true"
      :placeholder="true"
      title="达尔文密码管理器"
    />
    <div class="router-render">
      <router-view class="router-view"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseLayout",
};
</script>

<style lang="less" scoped>
.BaseLayout {
  .van-nav-bar {
    /deep/ .van-nav-bar {
      background-color: #3d8af2;

      .van-nav-bar__title {
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
