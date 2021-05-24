import { Notify as notify } from "vant";

import UserRepository from "@/module/user/repository/UserRepository";
import Code from "@/network/code";
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

  showGlobalErrorMessage = true;

  static async clearRequestQueue() {
    http.clearRequestQueue();
  }

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

  setShowGlobalErrorMessage(show = true) {
    this.showGlobalErrorMessage = show;
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

  signOut() {
    UserRepository.signOut();
  }

  makeHttpResponseData({ statusCode, status } = {}) {
    return {
      codeText: Code.findCode(status || statusCode),
      httpCodeText: Code.findHttpCode(status),
      responseCodeText: Code.findResponseCode(statusCode),
      httpCode: status,
      responseCode: statusCode,
    };
  }

  processHttpResponseSuccessHandle(axiosResponse = null) {
    return this.makeHttpResponseData({ statusCode: axiosResponse.statusCode });
  }

  showErrorMessage(message = null) {
    if (!message || message.length === 0) return;
    notify({ message: message, type: "danger" });
  }

  processHttpResponseErrorHandle(axiosResponse = null) {
    const makeHttpResponseData = this.makeHttpResponseData({
      status: axiosResponse.status,
      statusCode: axiosResponse.data.statusCode,
    });
    switch (makeHttpResponseData.httpCode) {
      case 401:
        this.signOut();
        break;
    }
    this.showErrorMessage(makeHttpResponseData.codeText);
    return makeHttpResponseData;
  }

  send() {
    const { method, url, params, responseType } = this;
    const requestParams = { method, url, params, responseType };

    const defaultProcessResponse = async (response) => {
      if (this.responseFilter) {
        const processHttpResponseSuccessHandle = this.processHttpResponseSuccessHandle(
          response
        );
        return this.responseFilter({
          ...response,
          ...processHttpResponseSuccessHandle,
        });
      }
    };

    return new Pipe(async (resolve, reject) => {
      let body = null;
      try {
        if (this.requestMocker) {
          //mocker
          body = await this.requestMocker(requestParams).then(
            defaultProcessResponse
          );
        } else {
          //real request
          body = await http.make(requestParams).then(defaultProcessResponse);
        }
        resolve(body);
      } catch (e) {
        reject(this.processHttpResponseErrorHandle(e.response));
      }
    });
  }
}

export default Manage;
