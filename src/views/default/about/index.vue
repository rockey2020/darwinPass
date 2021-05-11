<template>
  <div class="About">
    <van-nav-bar
      left-text="返回"
      class="van-nav-bar"
      :fixed="true"
      :placeholder="true"
      title="关于我们"
      @click-left="$router.back()"
    />
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style lang="less" scoped>
.About {
  .van-nav-bar {
    /deep/ .van-nav-bar {
      background-color: #3d8af2;

      .van-nav-bar__title,
      .van-nav-bar__text {
        color: white;
      }
    }
  }
}
</style>
