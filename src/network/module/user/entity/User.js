import { ServiceTypeParse } from "@/network/module/user/constant";

class User {
  constructor({
    username = "",
    email = "",
    maxIdleTime = 0,
    encryptionAlgorithm = "",
    serviceType = 0,
    //自定义字段
    serviceTypeText = "",
  }) {
    this.username = username;
    this.email = email;
    this.maxIdleTime = maxIdleTime;
    this.encryptionAlgorithm = encryptionAlgorithm;
    this.serviceType = serviceType;

    //自定义字段
    this.serviceTypeText = serviceTypeText;

    this.parsingField();
  }

  parsingField() {
    this.serviceTypeText = ServiceTypeParse[this.serviceType];
  }
}

export default User;
