import { ServicePlatformTypeFront } from "@/module/common/constant/ServicePlatformConstant";
import store from "@/store";

class User {
  constructor({
    id = null,
    username = "",
    email = "",
    maxIdleTime = 0,
    authorization = "",
    //自定义字段
    servicePlatformTypeText = null,
  } = {}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.maxIdleTime = maxIdleTime;
    this.servicePlatformType =
      store.state.setting.servicePlatform.servicePlatformType;
    this.authorization = authorization;

    //自定义字段
    this.servicePlatformTypeText = servicePlatformTypeText;

    this.parsingField();
  }

  parsingField() {
    this.servicePlatformTypeText =
      ServicePlatformTypeFront[this.servicePlatformType];
  }
}

export default User;
