export const GeneratePasswordType = {
  Lowercase: 1,
  Uppercase: 2,
  Numbers: 3,
  Symbols: 4,
};
export const GeneratePasswordTypeFront = {
  [GeneratePasswordType.Lowercase]: "小写",
  [GeneratePasswordType.Uppercase]: "大写",
  [GeneratePasswordType.Numbers]: "数字",
  [GeneratePasswordType.Symbols]: "符号",
};

export const ImportPasswordPlatformType = {
  LastPass: 1,
  OnePassword: 2,
  Bitwarden: 3,
};
export const ImportPasswordPlatformTypeFront = {
  [ImportPasswordPlatformType.LastPass]: "LastPass",
  [ImportPasswordPlatformType.OnePassword]: "1Password",
  [ImportPasswordPlatformType.Bitwarden]: "Bitwarden",
};
