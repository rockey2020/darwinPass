import Manage from "@/network/manage";
import { PasswordListMocker } from "@/network/modules/user/mocker";

import {
  DefaultConverter,
  EmptyDefaultConverter,
  ListDefaultConverter,
} from "../responseConverter";

//---------- 用户管理 ----------

export const fetchUser = async (params) => {
  return new Manage()
    .setMethod(Manage.GET)
    .setUrl("/")
    .setParams(params)
    .setResponseConverter(DefaultConverter)
    .send();
};

export const login = async (params) => {
  return new Manage()
    .setMethod(Manage.GET)
    .setUrl("/")
    .setParams(params)
    .setResponseConverter(DefaultConverter)
    .send();
};

//---------- 密码管理 ----------

export const fetchPasswordList = async (params) => {
  return new Manage()
    .setMethod(Manage.GET)
    .setUrl("/")
    .setParams(params)
    .setResponseConverter(ListDefaultConverter)
    .setRequestMocker(PasswordListMocker)
    .send();
};

export const createPasswordItem = async (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl("/")
    .setParams(params)
    .setResponseConverter(EmptyDefaultConverter)
    .send();
};

export const updatePasswordItem = async (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl("/")
    .setParams(params)
    .setResponseConverter(EmptyDefaultConverter)
    .send();
};

export const deletePasswordItem = async (params) => {
  return new Manage()
    .setMethod(Manage.POST)
    .setUrl("/")
    .setParams(params)
    .setResponseConverter(EmptyDefaultConverter)
    .send();
};
