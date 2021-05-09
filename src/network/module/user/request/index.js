import Manage from "@/network/manage";
import { PasswordListMocker, UserMocker } from "@/network/module/user/mocker";

import {
  DefaultFilter,
  EmptyDefaultFilter,
  ListDefaultFilter,
} from "../responseFilter";

//---------- 用户管理 ----------

export const fetchUser = (params) => {
  return new Manage()
    .setMethod(Manage.GET)
    .setUrl("/")
    .setParams(params)
    .setResponseFilter(DefaultFilter)
    .setRequestMocker(UserMocker)
    .send();
};

export const login = (params) => {
  return new Manage()
    .setMethod(Manage.GET)
    .setUrl("/")
    .setParams(params)
    .setResponseFilter(DefaultFilter)
    .send();
};

export const updateUser = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl("/")
    .setParams(params)
    .setResponseFilter(EmptyDefaultFilter)
    .send();
};

//---------- 密码管理 ----------

export const fetchPasswordList = (params) => {
  return new Manage()
    .setMethod(Manage.GET)
    .setUrl("/")
    .setParams(params)
    .setResponseFilter(ListDefaultFilter)
    .setRequestMocker(PasswordListMocker)
    .send();
};

export const createPasswordItem = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl("/")
    .setParams(params)
    .setResponseFilter(EmptyDefaultFilter)
    .send();
};

export const updatePasswordItem = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl("/")
    .setParams(params)
    .setResponseFilter(EmptyDefaultFilter)
    .send();
};

export const deletePasswordList = (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl("/")
    .setParams(params)
    .setResponseFilter(EmptyDefaultFilter)
    .send();
};
