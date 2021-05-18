class Password {
  constructor({ captchaId = null } = {}) {
    this.id = captchaId;

    //自定义字段

    this.parsingField();
  }

  parsingField() {}
}

export default Password;
