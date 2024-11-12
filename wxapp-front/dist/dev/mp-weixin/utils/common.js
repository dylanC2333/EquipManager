"use strict";
const common_vendor = require("../common/vendor.js");
const throttle = (func, duration, immediate = false) => {
  if (immediate) {
    let t;
    return (...args) => {
      if (!t || Date.now() - t > duration) {
        func(...args);
        t = Date.now();
      }
    };
  } else {
    let timer;
    return (...args) => {
      if (!timer) {
        timer = setTimeout(() => {
          func(...args);
          timer = void 0;
        }, duration);
      }
    };
  }
};
const useCompRef = (_) => {
  return common_vendor.ref();
};
exports.throttle = throttle;
exports.useCompRef = useCompRef;
