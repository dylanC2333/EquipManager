"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const request_index = require("../request/index.js");
const service = new request_index.RequestInstance();
const http = {
  get: (url, params, options) => {
    return service.request(__spreadValues({
      url,
      method: "GET",
      data: params
    }, options));
  },
  post: (url, data, options) => {
    return service.request(__spreadValues({
      url,
      method: "POST",
      data
    }, options));
  },
  delete: (url, data, options) => {
    return service.request(__spreadValues({
      url,
      method: "DELETE",
      data
    }, options));
  },
  put: (url, data, options) => {
    return service.request(__spreadValues({
      url,
      method: "PUT",
      data
    }, options));
  }
};
exports.http = http;
