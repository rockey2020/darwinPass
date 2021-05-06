<template>
  <div class="Home">
    <p>首页</p>
  </div>
</template>

<script>
import UserRepository from "@/network/modules/user/repository/userRepository";

export default {
  name: "Home",
  created() {
    for (let i = 0; i < 10; i++) {
      UserRepository.getUser().then((res) => {
        console.log("getUser:", res);
      });
    }
  },
};
</script>
<style lang="less" scoped></style>
