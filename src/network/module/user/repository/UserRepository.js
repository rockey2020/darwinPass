import User from "@/network/module/user/entity/User";
import store from "@/store";

import * as request from "../request";

class UserRepository {
  static async saveUser(data) {
    store.dispatch("updateUser", data);
  }

  static async clearUser() {
    store.dispatch("updateUser", new User());
  }

  static isLogin() {
    return (
      store.state.user.authorization &&
      store.state.user.authorization.length !== 0
    );
  }

  static fetchUser() {
    return request.fetchUser().then((res) => new User(res));
  }

  static login({ email = "", password = "", servicePlatformType = null } = {}) {
    return request
      .login({ email, password, servicePlatformType })
      .then((res) => {
        UserRepository.saveUser(res);
        return new User(res);
      });
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
