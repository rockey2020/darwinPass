import http from "@/network/http";

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

  async send() {
    const { method, url, params, responseType } = this;

    if (this.requestMocker) {
      //mocker
      return this.requestMocker({ method, url, params, responseType }).then(
        async (response) => {
          if (this.responseConverter) {
            return await this.responseConverter(response);
          }
        }
      );
    } else {
      //real request
      return http
        .make({ method, url, params, responseType })
        .then(async (response) => {
          if (this.responseConverter) {
            return await this.responseConverter(response);
          }
        });
    }
  }
}

export default Manage;
