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
    return request.updatePassword({
      id,
      url,
      notes,
      title,
      username,
      password,
    });
  }

  static batchCreatePassword({ list } = {}) {
    return request.batchCreatePassword({ list });
  }

  static batchDeletePassword({ ids }) {
    return request.batchDeletePassword({ ids });
  }
}

export default PasswordRepository;
