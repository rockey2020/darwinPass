import Captcha from "@/network/module/user/entity/Captcha";

import * as request from "../request";

class CaptchaRepository {
  static fetchCaptchaByEmail({ email } = {}) {
    return request
      .fetchCaptchaByEmail({ email })
      .then((res) => new Captcha(res));
  }
}

export default CaptchaRepository;
