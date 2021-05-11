class Password {
  constructor({ id = null } = {}) {
    this.id = id;

    //自定义字段

    this.parsingField();
  }

  parsingField() {}
}

export default Password;
