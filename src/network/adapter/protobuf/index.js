import { nanoid } from "nanoid";

import { RequestBody } from "./requestBody_pb";

class ProtobufAdapter {
  requestBody = null;

  constructor({ data } = {}) {
    const secretKey = nanoid(20);
    this.requestBody = new RequestBody();
    this.requestBody.setData(JSON.stringify(data));
    this.requestBody.setSecretKey(JSON.stringify(secretKey));
    console.log(this.serializeBinary());
    console.log(ProtobufAdapter.deserializeBinary2Obj(this.serializeBinary()));
  }

  static decrypt() {}

  static encrypt() {}

  static deserializeBinary2Obj(uint8Array) {
    const deserialize = RequestBody.deserializeBinary(uint8Array);
    return {
      data:
        deserialize.getData().trim().length !== 0
          ? JSON.parse(deserialize.getData())
          : "",
      secretKey:
        deserialize.getSecretKey().trim().length !== 0
          ? JSON.parse(deserialize.getSecretKey())
          : "",
    };
  }

  serializeBinary() {
    return this.requestBody.serializeBinary();
  }
}
export default ProtobufAdapter;
