import User from "@/network/module/user/entity/User";

import * as request from "../request";

class UserRepository {
  static fetchUser() {
    return request.fetchUser().then((res) => new User(res));
  }

  static login() {
    return request.login();
  }
}

export default UserRepository;
