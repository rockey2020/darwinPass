import http from "@/network/http";

class Manage {
  static GET = "get";
  static POST = "post";

  method = null;
  url = null;
  params = null;
  responseType = "json";

  responseConverter = null;

  setMethod(method) {
    this.method = method;
    return this;
  }

  setParams(params) {
    this.params = params;
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setResponseType(responseType) {
    this.responseType = responseType ?? this.responseType;
    return this;
  }

  setResponseConverter(responseConverter) {
    this.responseConverter = responseConverter;
    return this;
  }

  send() {
    const { method, url, params, responseType } = this;
    return http
      .make({ method, url, params, responseType })
      .then(this.responseConverter);
  }
}

export default Manage;
