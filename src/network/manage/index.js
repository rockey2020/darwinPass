import http from "@/network/http";
import Pipe from "@/pipe";

class Manage {
  static GET = "get";

  static POST = "post";

  static PUT = "put";

  static DELETE = "delete";

  method = null;

  url = null;

  params = null;

  responseType = "json";

  requestMocker = null;

  responseFilter = null;

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

  setRequestMocker(requestMocker) {
    this.requestMocker = requestMocker;
    return this;
  }

  setResponseFilter(responseFilter) {
    this.responseFilter = responseFilter;
    return this;
  }

  send() {
    const { method, url, params, responseType } = this;
    const requestParams = { method, url, params, responseType };

    const defaultProcessResponse = async (response) => {
      if (this.responseFilter) {
        return this.responseFilter(response);
      }
    };

    return new Pipe(async (resolve, reject) => {
      let body = null;
      try {
        if (this.requestMocker) {
          //mocker
          body = this.requestMocker(requestParams).then(defaultProcessResponse);
        } else {
          //real request
          body = http.make(requestParams).then(defaultProcessResponse);
        }
        resolve(body);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default Manage;
