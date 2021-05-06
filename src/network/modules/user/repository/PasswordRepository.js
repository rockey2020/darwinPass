import * as request from "../request";

class PasswordRepository {
  static async fetchPasswordList() {
    return request.fetchPasswordList();
  }

  static async createPasswordItem() {
    return request.createPasswordItem();
  }

  static async updatePasswordItem() {
    return request.updatePasswordItem();
  }

  static async deletePasswordItem() {
    return request.deletePasswordItem();
  }
}

export default PasswordRepository;
