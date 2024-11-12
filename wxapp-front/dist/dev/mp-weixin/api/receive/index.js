"use strict";
const store_index = require("../../store/index.js");
const utils_columnsHandler = require("../../utils/columnsHandler.js");
const utils_request = require("../../utils/request.js");
const handInManyRecords2Detail = (data) => {
  const mainStore = store_index.useMainStore();
  const newData = JSON.parse(JSON.stringify(data));
  newData.map((item) => utils_columnsHandler.toFormatDate(item));
  return utils_request.http.post(
    mainStore.projInfo.detail + "/createManyRecords",
    newData,
    {
      auth: true
    }
  );
};
const getQlByStore = () => {
  const mainStore = store_index.useMainStore();
  const url = `/project/ql?proname=${mainStore.projInfo.proname}&htd=${mainStore.projInfo.htd}`;
  return utils_request.http.get(url, {
    auth: true
  });
};
exports.getQlByStore = getQlByStore;
exports.handInManyRecords2Detail = handInManyRecords2Detail;
