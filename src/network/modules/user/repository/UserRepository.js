import * as request from "../request";

class UserRepository {
  static fetchUser() {
    return request.fetchUser();
  }

  static login() {
    return request.login();
  }
}

export default UserRepository;
