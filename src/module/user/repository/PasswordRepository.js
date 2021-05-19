import Password from "@/module/user/entity/Password";

import * as request from "../request";

class PasswordRepository {
  static fetchPasswordList() {
    return request.fetchPasswordList().then((res) => {
      res.data = res.data.map((item) => new Password(item));
      return res;
    });
  }

  static updatePassword({
    id = null,
    url = "",
    notes = "",
    title = "",
    username = "",
    password = "",
  } = {}) {
    return request.updatePassword();
  }

  static batchCreatePassword({ list } = {}) {
    return request.batchCreatePassword({ list });
  }

  static deletePasswordList({ ids }) {
    return request.deletePasswordList({ ids });
  }
}

export default PasswordRepository;
