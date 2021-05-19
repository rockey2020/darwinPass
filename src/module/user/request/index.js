import { PasswordListMocker, UserMocker } from "@/module/user/mocker";
import Manage from "@/network/manage";

import {
  DefaultFilter,
  EmptyDefaultFilter,
  ListDefaultFilter,
} from "../responseFilter";

const userRequestPrefix = "/user/";
const passwordRequestPrefix = "/password/";
const captchaRequestPrefix = "/captcha/";

//---------- 用户管理 ----------

export const fetchUser = (params) => {
  return new Manage()
    .setMethod(Manage.GET)
    .setUrl(`${userRequestPrefix}fetchUser`)
    .setParams(params)
    .setResponseFilter(DefaultFilter)
    .send();
};

export const login = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl(`${userRequestPrefix}login`)
    .setParams(params)
    .setResponseFilter(DefaultFilter)
    .send();
};

export const forgotPassword = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl(`${userRequestPrefix}forgotPassword`)
    .setParams(params)
    .setResponseFilter(DefaultFilter)
    .send();
};

export const register = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl(`${userRequestPrefix}register`)
    .setParams(params)
    .setResponseFilter(EmptyDefaultFilter)
    .send();
};

export const updateUser = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl(`${userRequestPrefix}updateUser`)
    .setParams(params)
    .setResponseFilter(EmptyDefaultFilter)
    .send();
};

//---------- 密码管理 ----------

export const fetchPasswordList = (params) => {
  return new Manage()
    .setMethod(Manage.GET)
    .setUrl(`${passwordRequestPrefix}fetchPasswordList`)
    .setParams(params)
    .setResponseFilter(ListDefaultFilter)
    .send();
};

export const batchCreatePassword = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl(`${passwordRequestPrefix}batchCreatePassword`)
    .setParams(params)
    .setResponseFilter(EmptyDefaultFilter)
    .send();
};

export const updatePassword = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl(`${passwordRequestPrefix}updatePassword`)
    .setParams(params)
    .setResponseFilter(EmptyDefaultFilter)
    .send();
};

export const deletePasswordList = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl(`${passwordRequestPrefix}deletePasswordList`)
    .setParams(params)
    .setResponseFilter(EmptyDefaultFilter)
    .send();
};

//---------- 验证码管理 ----------

export const fetchCaptchaCodeByEmail = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl(`${captchaRequestPrefix}fetchCaptchaCodeByEmail`)
    .setParams(params)
    .setResponseFilter(DefaultFilter)
    .send();
};
