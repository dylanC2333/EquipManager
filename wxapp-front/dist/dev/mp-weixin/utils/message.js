"use strict";
const common_vendor = require("../common/vendor.js");
const toast = (t, icon, duration) => {
  common_vendor.index.showToast({
    title: t,
    icon: icon != null ? icon : "none",
    duration: duration != null ? duration : 1500
  });
};
exports.toast = toast;
