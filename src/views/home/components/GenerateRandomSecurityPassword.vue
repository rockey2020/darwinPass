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
                  type="digit"
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
                v-model="formData.generatePasswordTypeCheckedList"
              >
                <template
                  v-for="(item, index) of generatePasswordTypeSelectOptions"
                  :key="index"
                >
                  <van-checkbox :name="Number(index)">
                    <span>{{ item }}</span>
                  </van-checkbox>
                </template>
              </van-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import {
  GeneratePasswordType,
  GeneratePasswordTypeParse,
} from "@/network/common/constant/password";
import copyText from "@/utils/copyText";
import generateString from "@/utils/generateString";

export default {
  name: "GenerateRandomSecurityPassword",
  data() {
    const generatePasswordTypeSelectOptions = GeneratePasswordTypeParse;
    const generatePasswordTypeCheckedList = [
      GeneratePasswordType.Lowercase,
      GeneratePasswordType.Uppercase,
      GeneratePasswordType.Numbers,
    ];
    return {
      generatePasswordTypeSelectOptions,
      password: "",
      formData: {
        size: 12,
        maxSize: 256,
        miniSize: 4,
        excludedCharacters: "iloO0",
        generatePasswordTypeCheckedList,
      },
    };
  },
  watch: {
    async "formData.size"(newVal, oldVal) {
      newVal = Number(newVal);
      oldVal = Number(oldVal);

      if (newVal < this.formData.miniSize) {
        newVal = this.formData.miniSize;
      }
      if (newVal > this.formData.maxSize) {
        newVal = this.formData.maxSize;
      }

      this.formData.size = newVal;
      if (oldVal > this.formData.miniSize) {
        this.generatePassword();
      }
    },
    async "formData.excludedCharacters"() {
      this.generatePassword();
    },
    async "formData.generatePasswordTypeCheckedList"() {
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
        generatePasswordTypeCheckedList,
      } = this.formData;

      this.password = await generateString({
        size,
        excludedCharacters: excludedCharacters.split(""),
        lowercase: generatePasswordTypeCheckedList.includes(
          GeneratePasswordType.Lowercase
        ),
        uppercase: generatePasswordTypeCheckedList.includes(
          GeneratePasswordType.Uppercase
        ),
        numbers: generatePasswordTypeCheckedList.includes(
          GeneratePasswordType.Numbers
        ),
        symbols: generatePasswordTypeCheckedList.includes(
          GeneratePasswordType.Symbols
        ),
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
