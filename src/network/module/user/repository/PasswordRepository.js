import Password from "@/network/module/user/entity/Password";

import * as request from "../request";

class PasswordRepository {
  static fetchPasswordList() {
    return request.fetchPasswordList().then((res) => {
      res.data = res.data.map((item) => new Password(item));
      return res;
    });
  }

  static updatePasswordItem({
    id = null,
    url = "",
    notes = "",
    title = "",
    username = "",
    password = "",
  } = {}) {
    return request.updatePasswordItem().then((res) => new Password(res));
  }

  static deletePasswordList({ ids }) {
    return request.deletePasswordList({ ids });
  }
}

export default PasswordRepository;
