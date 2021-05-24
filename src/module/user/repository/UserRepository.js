import User from "@/module/user/entity/User";
import router from "@/router";
import store from "@/store";

import * as request from "../request";

class UserRepository {
  static async saveUser(data) {
    store.dispatch("updateUser", data);
  }

  static async clearUser() {
    store.dispatch("updateUser", new User());
  }

  static async getAuthorization() {
    return `Bearer ${store.state.user.authorization || ""}`;
  }

  static async isLogin() {
    const authorization = (await UserRepository.getAuthorization()).replace(
      "Bearer ",
      ""
    );
    return authorization.length !== 0;
  }

  static fetchUser() {
    return request.fetchUser().then((res) => {
      const user = new User(res.data);
      delete user.authorization;
      UserRepository.saveUser(user);
      return user;
    });
  }

  static signOut() {
    return UserRepository.clearUser().then((res) => {
      router.replace("/");
      return res;
    });
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

  static updateUser({ username = "", email = "", maxIdleTime = 0 } = {}) {
    return request.updateUser({
      username,
      email,
      maxIdleTime,
    });
  }
}

export default UserRepository;
