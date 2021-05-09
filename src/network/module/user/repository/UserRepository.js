import User from "@/network/module/user/entity/User";

import * as request from "../request";

class UserRepository {
  static fetchUser() {
    return request.fetchUser().then((res) => new User(res));
  }

  static login({ email = "", password = "", servicePlatformType = null } = {}) {
    return request.login({ email: "" });
  }

  static updateUser({
    id = null,
    username = "",
    email = "",
    maxIdleTime = 0,
  } = {}) {
    return request.updateUser({
      id: null,
      username: "",
      email: "",
      maxIdleTime: 0,
    });
  }
}

export default UserRepository;
