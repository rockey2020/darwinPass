import User from "@/network/module/user/entity/User";

import * as request from "../request";

class UserRepository {
  static fetchUser() {
    return request.fetchUser().then((res) => new User(res));
  }

  static login(params) {
    return request.login(params);
  }

  static updateUser(params) {
    return request.updateUser(params);
  }
}

export default UserRepository;
