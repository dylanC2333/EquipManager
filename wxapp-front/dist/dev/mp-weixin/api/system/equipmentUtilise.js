"use strict";
const utils_request = require("../../utils/request.js");
const api_name = "/admin/equipment/equipmentUse";
const findAllRecords = () => {
  const url = `${api_name}/findAll`;
  return utils_request.http.get(url, {}, {
    auth: true
  });
};
const getPageList = (page, limit, searchObj, column, sortorder) => {
  const url = `${api_name}/name/${page}/${limit}/${column}/${sortorder}`;
  return utils_request.http.get(url, searchObj, {
    auth: true
  });
};
const saveEquipUtilise = (equipUtilise) => {
  const url = `${api_name}/save`;
  return utils_request.http.post(url, equipUtilise, {
    auth: true
  });
};
const removeId = (id) => {
  const url = `${api_name}/remove/${id}`;
  return utils_request.http.delete(url, {}, {
    auth: true
  });
};
exports.findAllRecords = findAllRecords;
exports.getPageList = getPageList;
exports.removeId = removeId;
exports.saveEquipUtilise = saveEquipUtilise;
