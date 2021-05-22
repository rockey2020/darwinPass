<template>
  <div class="ImportPasswordPlatformTypePopup">
    <van-popup v-model:show="visible" position="bottom">
      <van-picker
        :default-index="defaultIndex"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="visible = false"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { ImportPasswordPlatformTypeFront } from "@/module/common/constant/PasswordConstant";

export default {
  name: "ImportPasswordPlatformTypePopup",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    selectedId: {
      type: [Number, null],
      default: null,
    },
  },
  data() {
    const columns = Object.entries(
      ImportPasswordPlatformTypeFront
    ).map(([key, value]) => ({ text: value, id: Number(key) }));

    const defaultIndex = columns.findIndex((value) => {
      return value.id === this.selectedId;
    });

    return {
      visible: this.$props.show,
      columns,
      defaultIndex,
    };
  },
  watch: {
    async show() {
      this.visible = this.show;
    },
    async visible() {
      if (this.show !== this.visible) {
        this.$emit("update:show", this.visible);
      }
    },
  },
  methods: {
    async onConfirm(value) {
      this.$emit("onSelected", value);
      this.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.ImportPasswordPlatformTypePopup {
}
</style>
