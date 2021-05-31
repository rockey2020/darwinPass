import CryptoJS from "crypto-js";
import { nanoid } from "nanoid";
import pako from "pako";

import { RequestBody } from "./requestBody_pb";

class ProtobufAdapter {
  requestBody = null;

  constructor({ data } = {}) {
    const secretKey = nanoid(20);

    this.requestBody = new RequestBody();

    this.requestBody.setData(ProtobufAdapter.encrypt(data, secretKey));

    this.requestBody.setSecretKey(secretKey);
  }

  static decrypt(str, secretKey) {
    let bytes = CryptoJS.AES.decrypt(str, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  static encrypt(str, secretKey = "") {
    return CryptoJS.AES.encrypt(JSON.stringify(str), secretKey).toString();
  }

  static zip(str) {
    return pako.deflate(str, { to: "string", level: 9 });
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
    const { data, secretKey } = ProtobufAdapter.deserializeBinary2Obj(
      ProtobufAdapter.unzip(
        ProtobufAdapter.string2Binary(ProtobufAdapter.base64Decode(str))
      )
    );
    return ProtobufAdapter.decrypt(data, secretKey);
  }

  serializeBinary() {
    return this.requestBody.serializeBinary();
  }

  make() {
    return ProtobufAdapter.base64Encode(
      ProtobufAdapter.binary2String(ProtobufAdapter.zip(this.serializeBinary()))
    );
  }
}

export default ProtobufAdapter;
