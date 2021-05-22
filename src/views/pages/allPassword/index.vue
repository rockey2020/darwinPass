<template>
  <div class="AllPassword">
    <password-list class="password-list" ref="allPassword"></password-list>
  </div>
</template>

<script>
import PasswordList from "@/views/components/PasswordList";

export default {
  name: "AllPassword",
  components: { PasswordList },
};
</script>

<style lang="less" scoped>
.AllPassword {
  padding: 0 2rem;
  background-color: white;
  .password-list {
    margin: 0 auto;
  }
}
</style>
