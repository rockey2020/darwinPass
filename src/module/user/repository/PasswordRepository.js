import Password from "@/module/user/entity/Password";
import store from "@/store";

import * as request from "../request";

class PasswordRepository {
  static saveList(list = []) {
    store.dispatch("updatePasswordList", list);
  }

  static fetchPasswordList() {
    return request.fetchPasswordList().then((res) => {
      res.data = res.data.map((item) => new Password(item));
      PasswordRepository.saveList(res.data);
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
