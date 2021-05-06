import * as request from "../request";

class UserRepository {
  static async fetchUser() {
    return request.fetchUser();
  }

  static async login() {
    return request.login();
  }
}

export default UserRepository;
