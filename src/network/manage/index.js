import http from "@/network/http";
import Pipe from "@/network/pipe";

class Manage {
  static GET = "get";

  static POST = "post";

  method = null;

  url = null;

  params = null;

  responseType = "json";

  responseConverter = null;

  requestMocker = null;

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

  setRequestMocker(requestMocker) {
    this.requestMocker = requestMocker;
    return this;
  }

  send() {
    const { method, url, params, responseType } = this;

    return new Pipe(async (resolve, reject) => {
      let body = null;
      try {
        if (this.requestMocker) {
          //mocker
          body = await this.requestMocker({
            method,
            url,
            params,
            responseType,
          }).then(async (response) => {
            if (this.responseConverter) {
              return await this.responseConverter(response);
            }
          });
        } else {
          //real request
          body = await http
            .make({ method, url, params, responseType })
            .then(async (response) => {
              if (this.responseConverter) {
                return await this.responseConverter(response);
              }
            });
        }
        resolve(body);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default Manage;
