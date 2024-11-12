"use strict";
const common_vendor = require("../common/vendor.js");
let _isWide = common_vendor.ref(false);
const isWide = common_vendor.computed(() => {
  common_vendor.index.onWindowResize((res) => {
    _isWide.value = res.size.windowWidth > 768;
  });
  return _isWide.value;
});
let startWide = false;
const setStartWide = (val) => {
  startWide = val;
};
const fontSize = common_vendor.computed(() => {
  let res = 0;
  if (startWide) {
    res = isWide.value ? 30 : 60;
  } else {
    res = isWide.value ? 15 : 30;
  }
  return res;
});
exports.fontSize = fontSize;
exports.setStartWide = setStartWide;
