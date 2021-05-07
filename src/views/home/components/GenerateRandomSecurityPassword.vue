<template>
  <div class="GenerateRandomSecurityPassword">
    <van-form ref="vanForm" colon show-error validate-trigger="onChange">
      <div class="da-flex da-flex-column">
        <div class="da-flex password-output">
          <van-field class="password" ref="password" v-model="password" />
          <van-icon class="copy" name="records" @click="copyPassword" />
          <van-icon
            class="da-flex-offset-left-5 refresh"
            name="replay"
            @click="refreshPassword"
          />
        </div>
        <div class="da-flex da-flex-column password-makeup">
          <div class="da-flex">
            <div class="da-flex size">
              <div class="da-flex da-flex-item-50">
                <van-field
                  label="长度"
                  class="van-field"
                  type="number"
                  v-model.number="formData.size"
                />
              </div>
              <div class="da-flex da-flex-item-50">
                <van-slider
                  class="van-slider"
                  v-model.number="formData.size"
                  :min="formData.minSize"
                  :max="formData.maxSize"
                  active-color="#80eb99"
                  bar-height="1rem"
                  button-size="2rem"
                >
                </van-slider>
              </div>
            </div>
          </div>
          <div class="da-flex da-flex-column excluded-rules">
            <van-field
              class="van-field excluded-characters"
              label="排除的字符"
              v-model="formData.excludedCharacters"
            />
            <div class="da-flex excluded-checkbox">
              <span class="da-flex da-flex-item-60 da-flex-offset-left-4 label"
                >允许的字符类型:</span
              >
              <van-checkbox-group
                class="van-checkbox-group"
                direction="horizontal"
                checked-color="#ee0a24"
                v-model="formData.charactersCheckedOptions"
              >
                <van-checkbox :name="1">
                  <span>小写</span>
                </van-checkbox>
                <van-checkbox :name="2">
                  <span>大写</span>
                </van-checkbox>
                <van-checkbox :name="3">
                  <span>数字</span>
                </van-checkbox>
                <van-checkbox :name="4">
                  <span>符号</span>
                </van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import copyText from "@/utils/copyText";
import generateString from "@/utils/generateString";

export default {
  name: "GenerateRandomSecurityPassword",
  data() {
    return {
      password: "",
      formData: {
        size: 12,
        maxSize: 256,
        miniSize: 4,
        excludedCharacters: "i,l,o,O,0",
        charactersCheckedOptions: [1, 2, 3],
      },
    };
  },
  watch: {
    async "formData.size"(newVal, oldVal) {
      this.formData.size = Number(this.formData.size);
      if (this.formData.size > this.formData.maxSize) {
        this.formData.size = this.formData.maxSize;
      }
      if (this.formData.size < this.formData.miniSize) {
        this.formData.size = this.formData.miniSize;
      }
      this.generatePassword();
    },
    async "formData.excludedCharacters"() {
      this.generatePassword();
    },
    async "formData.charactersCheckedOptions"() {
      this.generatePassword();
    },
  },
  methods: {
    async refreshPassword() {
      this.generatePassword();
    },
    async generatePassword() {
      const {
        size,
        excludedCharacters,
        charactersCheckedOptions,
      } = this.formData;

      this.password = await generateString({
        size,
        excludedCharacters: excludedCharacters.split(","),
        lowercase: charactersCheckedOptions.includes(1),
        uppercase: charactersCheckedOptions.includes(2),
        numbers: charactersCheckedOptions.includes(3),
        symbols: charactersCheckedOptions.includes(4),
      });
    },
    async copyPassword() {
      if (this.password.length === 0) return;
      copyText(this.password)
        .then(() => {
          this.$toast.success("复制成功");
        })
        .catch(() => {
          this.$toast.fail("复制失败,请手动复制");
        });
    },
  },
  created() {
    this.generatePassword();
  },
};
</script>

<style lang="less" scoped>
.GenerateRandomSecurityPassword {
  .label {
    color: #646566;
    text-align: left;
  }

  .van-field {
    border-bottom: 1px solid #f1f1f1;
  }

  .van-checkbox-group {
    height: 6rem;
  }

  .van-slider {
  }

  .password-makeup {
    margin-top: 1rem;

    .size {
    }

    .excluded-rules {
      .excluded-checkbox {
        padding-top: 0.5rem;
      }
    }
  }

  .password-output {
    .password {
      width: 100%;
    }

    .refresh,
    .copy {
      font-size: 2.5rem;
    }
  }
}
</style>
