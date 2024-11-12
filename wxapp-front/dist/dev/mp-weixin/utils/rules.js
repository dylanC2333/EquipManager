"use strict";
const rulesMsg = {
  notNull(s) {
    return s != null ? s : "输入内容不能为空";
  }
};
const rulesValid = {
  notNull(constraint, content) {
    return !constraint || !!content;
  }
};
exports.rulesMsg = rulesMsg;
exports.rulesValid = rulesValid;
