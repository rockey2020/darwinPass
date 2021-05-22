<template>
  <div class="ImportPassword">
    <import-password-platform-type-popup
      :selected-id="formData.importPlatform"
      :show="showImportPasswordPlatformTypePopup"
      @onSelected="(val) => (formData.importPlatform = val.id)"
      @update:show="showImportPasswordPlatformTypePopup = false"
    ></import-password-platform-type-popup>

    <van-form
      ref="vanForm"
      label-width="9rem"
      colon
      show-error
      validate-trigger="onChange"
    >
      <van-field
        clearable
        required
        clickable
        readonly
        v-model="ImportPasswordPlatformTypeFront[formData.importPlatform]"
        label="文件来源平台"
        placeholder="请选择文件来源平台"
        :rules="rules.importPlatform"
        @click="showImportPasswordPlatformTypePopup = true"
      />

      <van-field
        clearable
        required
        clickable
        readonly
        label="选择文件"
        placeholder="选择文件"
        :rules="rules.file"
      >
        <template #input>
          <van-uploader
            accept=".csv"
            :max-count="1"
            v-model="formData.file"
            :result-type="'file'"
          >
            <van-button icon="plus" type="primary" size="mini"
              >选择文件(仅支持csv格式)
            </van-button>
          </van-uploader>
        </template>
      </van-field>

      <div class="da-flex da-flex-justify-center">
        <van-button type="primary" class="submit" @click="submit"
          >开始解析文件
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Papa from "papaparse";

import {
  ImportPasswordPlatformType,
  ImportPasswordPlatformTypeFront,
} from "@/module/common/constant/PasswordConstant";
import PasswordRepository from "@/module/user/repository/PasswordRepository";
import Pipe from "@/pipe";
import regexRules from "@/utils/regexRules";
import ImportPasswordPlatformTypePopup from "@/views/components/ImportPasswordPlatformTypePopup";

class Dictionary {
  dictMapping = {
    url: {
      [ImportPasswordPlatformType.LastPass]: "url",
      [ImportPasswordPlatformType.OnePassword]: "url",
      [ImportPasswordPlatformType.Bitwarden]: "url",
    },
    notes: {
      [ImportPasswordPlatformType.LastPass]: "extra",
      [ImportPasswordPlatformType.OnePassword]: "extra",
      [ImportPasswordPlatformType.Bitwarden]: "extra",
    },
    title: {
      [ImportPasswordPlatformType.LastPass]: "name",
      [ImportPasswordPlatformType.OnePassword]: "name",
      [ImportPasswordPlatformType.Bitwarden]: "name",
    },
    username: {
      [ImportPasswordPlatformType.LastPass]: "username",
      [ImportPasswordPlatformType.OnePassword]: "username",
      [ImportPasswordPlatformType.Bitwarden]: "username",
    },
    password: {
      [ImportPasswordPlatformType.LastPass]: "password",
      [ImportPasswordPlatformType.OnePassword]: "password",
      [ImportPasswordPlatformType.Bitwarden]: "password",
    },
  };

  constructor(
    params = {},
    importPlatform = ImportPasswordPlatformType.LastPass
  ) {
    this.params = params;
    this.importPlatform = importPlatform;
  }

  makeParams() {
    return {
      url: this.getUrl(),
      notes: this.getNotes(),
      title: this.getTitle(),
      username: this.getUsername(),
      password: this.getPassword(),
    };
  }

  getUrl() {
    return this.params[this.dictMapping.url[this.importPlatform]];
  }

  getNotes() {
    return this.params[this.dictMapping.notes[this.importPlatform]];
  }

  getTitle() {
    return this.params[this.dictMapping.title[this.importPlatform]];
  }

  getUsername() {
    return this.params[this.dictMapping.username[this.importPlatform]];
  }

  getPassword() {
    return this.params[this.dictMapping.password[this.importPlatform]];
  }
}

export default {
  name: "ImportPassword",
  components: { ImportPasswordPlatformTypePopup },
  data() {
    return {
      ImportPasswordPlatformTypeFront,
      rules: {
        importPlatform: [regexRules.required],
        file: [regexRules.required],
      },
      showImportPasswordPlatformTypePopup: false,
      formData: {
        importPlatform: null,
        file: [],
      },
    };
  },
  methods: {
    async parseFile() {
      this.csv2Json(this.formData.file[0].file)
        .makeResponseStatusMessage({
          message: "文件解析",
        })
        .then(async (data) => {
          const list = await this.parsePlatform(data);
          this.$dialog
            .confirm({
              title: "是否导入",
              message: `共${list.length}条密码,确认是否导入?`,
            })
            .then(() => {
              PasswordRepository.batchCreatePassword({
                list,
              })
                .makeResponseStatusMessage({ message: "批量导入密码" })
                .then(() => {
                  this.formData = {
                    importPlatform: null,
                    file: [],
                  };
                  this.$emit("success");
                });
            });
        });
    },
    async submit() {
      this.$refs.vanForm.validate().then(() => {
        this.parseFile();
      });
    },
    async parsePlatform(data = []) {
      const list = [];
      for (let i of data) {
        const item = new Dictionary(i);
        list.push(item.makeParams());
      }
      return list;
    },
    csv2Json(file) {
      return new Pipe((resolve, reject) => {
        Papa.parse(file, {
          complete: async ({ data }) => {
            const columnHeader = data[0];
            const parseData = [];
            for (let i = 1; i < data.length; i++) {
              const makeParams = {};
              const item = data[i];
              columnHeader.forEach((value, index) => {
                makeParams[value] = item[index];
              });
              parseData.push(makeParams);
            }
            resolve(parseData);
          },
          error: reject,
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ImportPassword {
}
</style>
