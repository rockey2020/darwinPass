import User from "@/module/user/entity/User";
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
    return request.fetchUser().then((res) => new User(res.data));
  }

  static login({
    email = "",
    password = "",
    servicePlatformType = null,
    servicePlatformUrl = null,
  } = {}) {
    store.dispatch("updateServicePlatform", {
      servicePlatformType,
      servicePlatformUrl,
    });
    return request.login({ email, password }).then((res) => {
      const data = new User(res.data);
      UserRepository.saveUser(data);
      return data;
    });
  }

  static forgotPassword({
    email = "",
    password = "",
    captchaCode = "",
    captchaId = "",
  } = {}) {
    return request.forgotPassword({ email, password, captchaCode, captchaId });
  }

  static register({
    email = "",
    password = "",
    captchaCode = "",
    captchaId = "",
    maxIdleTime = null,
    username = "",
  } = {}) {
    return request.register({
      email,
      password,
      captchaCode,
      captchaId,
      maxIdleTime,
      username,
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
