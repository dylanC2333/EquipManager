"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../common/vendor.js");
const config_index = require("../config/index.js");
const store_index = require("../store/index.js");
const utils_message = require("../utils/message.js");
class RequestInstance {
  constructor() {
    __publicField(this, "baseURL", config_index.config.BASE_URL);
    __publicField(this, "beforeRequest", (options) => {
      const mainStore = store_index.useMainStore();
      return new Promise((resolve) => {
        options.url = this.baseURL + options.url;
        options.timeout = 1e4;
        if (options.auth) {
          options.header = {
            token: mainStore.getToken()
          };
        }
        resolve(options);
      });
    });
    __publicField(this, "handleResponse", (response) => {
      return new Promise((resolve, reject) => {
        const { data } = response;
        let msg = "";
        if (data.code !== 200) {
          msg = data.message || "请求失败";
          return reject(new Error(msg));
        }
        return resolve(data.data);
      });
    });
    __publicField(this, "request", (options) => {
      return new Promise((resolve, reject) => __async(this, null, function* () {
        const opt = yield this.beforeRequest(options);
        common_vendor.index.request(opt).then((res) => __async(this, null, function* () {
          this.handleResponse(res).then((data) => {
            resolve(data);
          }).catch((err) => {
            utils_message.toast(err.message);
            reject(err);
          });
        })).catch((err) => {
          utils_message.toast("网络或服务器出错");
          reject(err);
        });
      }));
    });
  }
}
exports.RequestInstance = RequestInstance;
