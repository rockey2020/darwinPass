export const ServiceType = {
  DarwinPassService: 1,
  AliCloudServerless: 2,
  TencentCloudServerless: 3,
  AWSLambda: 4,
  AzureFunctions: 5,
  YandexCloudServerless: 6,
  ServerlessIncServerless: 7,
  VercelServerless: 8,
};
export const ServiceTypeParse = {
  [ServiceType.DarwinPassService]: "DarwinPass官方平台",
  [ServiceType.AliCloudServerless]: "阿里云Serverless",
  [ServiceType.TencentCloudServerless]: "腾讯云Serverless",
  [ServiceType.AWSLambda]: "亚马逊云Lambda",
  [ServiceType.AzureFunctions]: "微软云Functions",
  [ServiceType.YandexCloudServerless]: "Yandex云Serverless",
  [ServiceType.ServerlessIncServerless]: "ServerlessInc",
  [ServiceType.VercelServerless]: "Vercel",
};
