import Manage from "@/network/manage";
import { UserInfoConverter } from "@/network/modules/user/responseConverter";

export const getUser = async (params) => {
  return new Manage()
    .setMethod(Manage.GET)
    .setUrl("/")
    .setParams(params)
    .setResponseConverter(UserInfoConverter)
    .send();
};
