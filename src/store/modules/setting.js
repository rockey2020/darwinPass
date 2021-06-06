import { ServicePlatformType } from "@/module/common/constant/ServicePlatformConstant";
import { DEFAULT_SERVICE_PLATFORM_URL } from "@/module/common/constant/Setting";

export default {
  state: () => {
    return {
      servicePlatform: {
        servicePlatformType: ServicePlatformType.DarwinPassService,
        servicePlatformUrl: DEFAULT_SERVICE_PLATFORM_URL,
      },
      lastLoginAppTime: "",
      lastLoginUserFormData: {
        email: "",
        servicePlatformType: null,
        servicePlatformUrl: null,
      },
    };
  },
  mutations: {
    updateServicePlatform(state, data) {
      if (data.servicePlatformType === ServicePlatformType.DarwinPassService) {
        data.servicePlatformUrl = DEFAULT_SERVICE_PLATFORM_URL;
      }
      state.servicePlatform = data;
    },
    updateLastLoginAppTime(state, data) {
      state.lastLoginAppTime = data;
    },
    updateLastLoginUserFormData(state, data) {
      const saveKey = "lastLoginUserFormData";
      Object.entries(data).forEach(([key, value]) => {
        if (Object.keys(state[saveKey]).includes(key)) {
          state[saveKey][key] = value;
        }
      });
    },
  },
  actions: {
    updateServicePlatform(context, data) {
      context.commit("updateServicePlatform", data);
    },
    updateLastLoginAppTime(context, data) {
      context.commit("updateLastLoginAppTime", data);
    },
    updateLastLoginUserFormData(context, data) {
      context.commit("updateLastLoginUserFormData", data);
    },
  },
};
