export const HttpCodeMapping = {
  401: "您已退出登录",
};
export const ResponseCodeMapping = {};

class Code {
  static findHttpCode(code = 0) {
    return HttpCodeMapping[code];
  }

  static findResponseCode(code = 0) {
    return ResponseCodeMapping[code];
  }

  static findCode(code = 0) {
    return Code.findHttpCode(code) ?? Code.findResponseCode(code);
  }
}

export default Code;
