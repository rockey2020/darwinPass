import { ServicePlatformTypeFront } from "@/network/common/constant/servicePlatformConstant";

class User {
  constructor({
    id = "",
    username = "",
    email = "",
    maxIdleTime = 0,
    servicePlatformType = 0,
    //自定义字段
    servicePlatformTypeText = "",
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
