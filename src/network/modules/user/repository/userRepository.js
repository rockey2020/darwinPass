import * as request from "../request";

class UserRepository {
  static async getUser() {
    return request.getUser();
  }
}

export default UserRepository;
