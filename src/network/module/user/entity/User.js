import { ServicePlatformTypeFront } from "@/network/common/constant/servicePlatformConstant";

class User {
  constructor({
    id = null,
    username = "",
    email = "",
    maxIdleTime = 0,
    servicePlatformType = null,
    //自定义字段
    servicePlatformTypeText = null,
  } = {}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.maxIdleTime = maxIdleTime;
    this.servicePlatformType = servicePlatformType;

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
