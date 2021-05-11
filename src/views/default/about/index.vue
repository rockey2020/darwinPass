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

    <pre>
      达尔文密码管理器是一个兼具开放性和安全性的密码管理工具,它同时支持用户自己搭建后端数据平台,也可以使用达尔文官方平台.
      开发者联系:<a href=mailto:rockey543400@foxmail.com>rockey543400@foxmail.com</a>
    </pre>
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

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    margin: 0;
    padding: 0;
    font-size: 14px;
    padding: 2rem;
  }
}
</style>
