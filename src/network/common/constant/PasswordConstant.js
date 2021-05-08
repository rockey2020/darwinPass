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
