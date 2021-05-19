import { ServicePlatformType } from "@/module/common/constant/ServicePlatformConstant";
import { DEFAULT_SERVICE_PLATFORM_URL } from "@/module/common/constant/Setting";

export default {
  state: () => {
    return {
      servicePlatform: {
        servicePlatformType: ServicePlatformType.DarwinPassService,
        servicePlatformUrl: DEFAULT_SERVICE_PLATFORM_URL,
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
  },
  actions: {
    updateServicePlatform(context, data) {
      context.commit("updateServicePlatform", data);
    },
  },
};
