class Password {
  constructor({
    id = null,
    url = "",
    notes = "",
    title = "",
    username = "",
    password = "",
  } = {}) {
    this.id = id;
    this.url = url;
    this.notes = notes;
    this.title = title;
    this.username = username;
    this.password = password;

    //自定义字段

    this.parsingField();
  }

  parsingField() {}
}

export default Password;
