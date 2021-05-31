import axios from "axios";

import UserRepository from "@/module/user/repository/UserRepository";
import ProtobufAdapter from "@/network/adapter/protobuf";
import store from "@/store";

//准备执行的请求队列
const requestQueue = new Map();

//添加进请求队列
function addRequestQueue(config) {
  const CancelToken = axios.CancelToken;
  let cancel = null;

  const { url, params, data, method } = config;
  const key = JSON.stringify({ url, params, data, method });

  config.cancelToken = new CancelToken(function executor(c) {
    cancel = c;
  });

  if (requestQueue.has(key)) {
    removeRequestQueue(config);
  } else {
    requestQueue.set(key, cancel);
  }
}

//取消请求队列里重复的请求方法
function removeRequestQueue(config) {
  const { url, params, data, method } = config;
  const key = JSON.stringify({ url, params, data, method });

  if (requestQueue.has(key)) {
    const cancel = requestQueue.get(key);
    cancel("cancel");
    requestQueue.delete(key);
  }
}

//取消所有请求方法
const clearRequestQueue = () => {
  for (const [key, cancel] of requestQueue) {
    cancel("cancel");
  }
  requestQueue.clear();
};

const getBaseUrl = () => store.state.setting.servicePlatform.servicePlatformUrl;
const getAuthorization = () => UserRepository.getAuthorization();

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    config.url = getBaseUrl() + config.url;
    config.headers.authorization = await getAuthorization();
    addRequestQueue(config);
    return config;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async function (response) {
    removeRequestQueue(response);
    const data = new ProtobufAdapter({
      data: {
        key: "城，宁家。今年的冬天格外冷，床头的闹铃响了好久",
      },
    }).make();
    console.log(data);
    console.log(data.length);
    console.log(ProtobufAdapter.parse(data));
    return response.data;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default {
  get({ url = "", params = {}, responseType = "json" }) {
    const queryConfig = {
      method: "get",
      url,
      params,
      responseType,
    };
    return axiosInstance(queryConfig);
  },
  post({ url = "", params = {}, responseType = "json" }) {
    const queryConfig = {
      method: "post",
      url,
      data: params,
      responseType,
    };
    return axiosInstance(queryConfig);
  },
  make({ method = "get", url = "", params = {}, responseType = "json" }) {
    const queryConfig = {
      method,
      url,
      data: params,
      responseType,
    };
    return axiosInstance(queryConfig);
  },
  clearRequestQueue,
};
