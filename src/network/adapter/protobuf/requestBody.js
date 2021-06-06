/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.org = (function() {

    /**
     * Namespace org.
     * @exports org
     * @namespace
     */
    var org = {};

    org.darwinPass = (function() {

        /**
         * Namespace darwinPass.
         * @memberof org
         * @namespace
         */
        var darwinPass = {};

        darwinPass.requestBody = (function() {

            /**
             * Namespace requestBody.
             * @memberof org.darwinPass
             * @namespace
             */
            var requestBody = {};

            requestBody.RequestBody = (function() {

                /**
                 * Properties of a RequestBody.
                 * @memberof org.darwinPass.requestBody
                 * @interface IRequestBody
                 * @property {string|null} [secretKey] RequestBody secretKey
                 * @property {string|null} [data] RequestBody data
                 */

                /**
                 * Constructs a new RequestBody.
                 * @memberof org.darwinPass.requestBody
                 * @classdesc Represents a RequestBody.
                 * @implements IRequestBody
                 * @constructor
                 * @param {org.darwinPass.requestBody.IRequestBody=} [properties] Properties to set
                 */
                function RequestBody(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RequestBody secretKey.
                 * @member {string} secretKey
                 * @memberof org.darwinPass.requestBody.RequestBody
                 * @instance
                 */
                RequestBody.prototype.secretKey = "";

                /**
                 * RequestBody data.
                 * @member {string} data
                 * @memberof org.darwinPass.requestBody.RequestBody
                 * @instance
                 */
                RequestBody.prototype.data = "";

                /**
                 * Creates a new RequestBody instance using the specified properties.
                 * @function create
                 * @memberof org.darwinPass.requestBody.RequestBody
                 * @static
                 * @param {org.darwinPass.requestBody.IRequestBody=} [properties] Properties to set
                 * @returns {org.darwinPass.requestBody.RequestBody} RequestBody instance
                 */
                RequestBody.create = function create(properties) {
                    return new RequestBody(properties);
                };

                /**
                 * Encodes the specified RequestBody message. Does not implicitly {@link org.darwinPass.requestBody.RequestBody.verify|verify} messages.
                 * @function encode
                 * @memberof org.darwinPass.requestBody.RequestBody
                 * @static
                 * @param {org.darwinPass.requestBody.IRequestBody} message RequestBody message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestBody.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.secretKey != null && Object.hasOwnProperty.call(message, "secretKey"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.secretKey);
                    if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.data);
                    return writer;
                };

                /**
                 * Encodes the specified RequestBody message, length delimited. Does not implicitly {@link org.darwinPass.requestBody.RequestBody.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof org.darwinPass.requestBody.RequestBody
                 * @static
                 * @param {org.darwinPass.requestBody.IRequestBody} message RequestBody message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestBody.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a RequestBody message from the specified reader or buffer.
                 * @function decode
                 * @memberof org.darwinPass.requestBody.RequestBody
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {org.darwinPass.requestBody.RequestBody} RequestBody
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestBody.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.org.darwinPass.requestBody.RequestBody();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.secretKey = reader.string();
                            break;
                        case 2:
                            message.data = reader.string();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a RequestBody message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof org.darwinPass.requestBody.RequestBody
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {org.darwinPass.requestBody.RequestBody} RequestBody
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestBody.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RequestBody message.
                 * @function verify
                 * @memberof org.darwinPass.requestBody.RequestBody
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RequestBody.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.secretKey != null && message.hasOwnProperty("secretKey"))
                        if (!$util.isString(message.secretKey))
                            return "secretKey: string expected";
                    if (message.data != null && message.hasOwnProperty("data"))
                        if (!$util.isString(message.data))
                            return "data: string expected";
                    return null;
                };

                /**
                 * Creates a RequestBody message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof org.darwinPass.requestBody.RequestBody
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {org.darwinPass.requestBody.RequestBody} RequestBody
                 */
                RequestBody.fromObject = function fromObject(object) {
                    if (object instanceof $root.org.darwinPass.requestBody.RequestBody)
                        return object;
                    var message = new $root.org.darwinPass.requestBody.RequestBody();
                    if (object.secretKey != null)
                        message.secretKey = String(object.secretKey);
                    if (object.data != null)
                        message.data = String(object.data);
                    return message;
                };

                /**
                 * Creates a plain object from a RequestBody message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof org.darwinPass.requestBody.RequestBody
                 * @static
                 * @param {org.darwinPass.requestBody.RequestBody} message RequestBody
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RequestBody.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.secretKey = "";
                        object.data = "";
                    }
                    if (message.secretKey != null && message.hasOwnProperty("secretKey"))
                        object.secretKey = message.secretKey;
                    if (message.data != null && message.hasOwnProperty("data"))
                        object.data = message.data;
                    return object;
                };

                /**
                 * Converts this RequestBody to JSON.
                 * @function toJSON
                 * @memberof org.darwinPass.requestBody.RequestBody
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RequestBody.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return RequestBody;
            })();

            return requestBody;
        })();

        return darwinPass;
    })();

    return org;
})();

module.exports = $root;
