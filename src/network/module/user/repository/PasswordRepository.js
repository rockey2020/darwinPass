import * as request from "../request";

class PasswordRepository {
  static fetchPasswordList() {
    return request.fetchPasswordList();
  }

  static createPasswordItem() {
    return request.createPasswordItem();
  }

  static updatePasswordItem() {
    return request.updatePasswordItem();
  }

  static deletePasswordItem() {
    return request.deletePasswordItem();
  }
}

export default PasswordRepository;
