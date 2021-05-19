import Captcha from "@/module/user/entity/Captcha";

import * as request from "../request";

class CaptchaRepository {
  static fetchCaptchaCodeByEmail({ email } = {}) {
    return request
      .fetchCaptchaCodeByEmail({ email })
      .then((res) => new Captcha(res.data));
  }
}

export default CaptchaRepository;
