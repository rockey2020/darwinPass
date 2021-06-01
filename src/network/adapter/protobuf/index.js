import CryptoJS from "crypto-js";
import { nanoid } from "nanoid";
import pako from "pako";

import { RequestBody } from "./requestBody_pb";

class ProtobufAdapter {
  requestBody = null;

  constructor({ data } = {}) {
    const secretKey = nanoid(20);

    this.requestBody = new RequestBody();

    data = ProtobufAdapter.encodeData(data);

    data = ProtobufAdapter.zip(data);

    data = ProtobufAdapter.binary2String(data);

    data = ProtobufAdapter.encrypt(data, secretKey);

    this.requestBody.setData(data);

    this.requestBody.setSecretKey(secretKey);
  }

  static encodeData(obj) {
    return encodeURIComponent(JSON.stringify(obj));
  }

  static decodeData(objStr) {
    return JSON.parse(decodeURIComponent(objStr));
  }

  static decrypt(str, secretKey) {
    let bytes = CryptoJS.AES.decrypt(str, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  static encrypt(str, secretKey = "") {
    return CryptoJS.AES.encrypt(str, secretKey).toString();
  }

  static zip(data) {
    return pako.deflate(data, { to: "string", level: 9 });
  }

  static unzip(U8Arr) {
    return pako.inflate(U8Arr);
  }

  static deserializeBinary2Obj(U8Arr) {
    const deserialize = RequestBody.deserializeBinary(U8Arr);
    return {
      data: deserialize.getData(),
      secretKey: deserialize.getSecretKey(),
    };
  }

  static string2Binary(str) {
    return new Uint8Array(
      Array.from(str).map((value, index) => str.charCodeAt(index))
    );
  }

  static binary2String(U8Arr) {
    return String.fromCharCode.apply(null, U8Arr);
  }

  static base64Decode(base64Str) {
    return CryptoJS.enc.Base64.parse(base64Str).toString(CryptoJS.enc.Utf8);
  }

  static base64Encode(str) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str));
  }

  static parse(str) {
    str = ProtobufAdapter.base64Decode(str);
    str = ProtobufAdapter.string2Binary(str);

    let { data, secretKey } = ProtobufAdapter.deserializeBinary2Obj(str);

    data = ProtobufAdapter.decrypt(data, secretKey);
    data = ProtobufAdapter.string2Binary(data);
    data = ProtobufAdapter.unzip(data);
    data = ProtobufAdapter.binary2String(data);
    data = ProtobufAdapter.decodeData(data);

    return data;
  }

  serializeBinary() {
    return this.requestBody.serializeBinary();
  }

  make() {
    return ProtobufAdapter.base64Encode(
      ProtobufAdapter.binary2String(this.serializeBinary())
    );
  }
}

export default ProtobufAdapter;
