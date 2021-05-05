<template>
  <div
    class="App da-flex-reset-css da-flex-reset-css-all da-flex-reset-css-all-child"
  >
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="less">
@import "~darwin-flex-layout";
@import "./assets/styles/common";
</style>
