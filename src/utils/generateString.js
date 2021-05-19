import { customAlphabet } from "nanoid";

const _lowercase = "abcdefghijklmnopqrstuvwxyz";
const _uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const _numbers = "0123456789";
const _symbols = "!\"#$%&'()*+,-./0123456789:;<=>?`~@^{}[]|";
export default async (data = {}) => {
  const {
    lowercase = true,
    uppercase = true,
    numbers = true,
    symbols = true,
    size = 12,
    excludedCharacters = [],
  } = data;
  let str = "";
  if (!lowercase && !uppercase && !numbers && !symbols) return "";

  if (lowercase) str += _lowercase;
  if (uppercase) str += _uppercase;
  if (numbers) str += _numbers;
  if (symbols) str += _symbols;

  for (let i of excludedCharacters) {
    str = str.replace(i, "");
  }

  return customAlphabet(str, size)();
};
