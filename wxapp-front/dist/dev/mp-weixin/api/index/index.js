"use strict";
const utils_request = require("../../utils/request.js");
const loginToService = (data) => {
  return utils_request.http.post("/admin/system/index/login", data);
};
exports.loginToService = loginToService;
