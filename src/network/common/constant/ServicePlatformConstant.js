export const ServicePlatformType = {
  DarwinPassService: 1,
  AliCloudServerless: 2,
  TencentCloudServerless: 3,
  AWSLambda: 4,
  AzureFunctions: 5,
};
export const ServicePlatformTypeFront = {
  [ServicePlatformType.DarwinPassService]: "DarwinPass官方平台",
  [ServicePlatformType.AliCloudServerless]: "阿里云Serverless",
  [ServicePlatformType.TencentCloudServerless]: "腾讯云Serverless",
  [ServicePlatformType.AWSLambda]: "亚马逊云Lambda",
  [ServicePlatformType.AzureFunctions]: "微软云Functions",
};
