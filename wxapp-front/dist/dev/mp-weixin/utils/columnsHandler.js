"use strict";
const store_index = require("../store/index.js");
const utils_dateFormat = require("./dateFormat.js");
const utils_sheets = require("./sheets.js");
const dateTag = ["jcsj", "jcrq", "sysj"];
const withUpdate = (tableData) => {
  tableData.fields.columns.unshift("update");
  tableData.header.unshift({
    field: "update",
    name: "修改",
    opts: {
      color: "#005461"
    }
  });
};
const withDelete = (tableData) => {
  tableData.fields.columns.unshift("delete");
  tableData.header.unshift({
    field: "delete",
    name: "删除",
    opts: {
      color: "#005461"
    }
  });
};
const withStatus = (tableData) => {
  tableData.fields.columns.unshift("status");
  tableData.header.unshift({
    field: "status",
    name: "状态",
    opts: {
      color: "#005461"
    }
  });
};
const getTableData = (columns) => {
  const tableData = {
    fields: {
      columns: []
    },
    header: [],
    data: []
  };
  for (const column of columns) {
    tableData.fields.columns.push(column.prop);
    tableData.header.push({
      field: column.prop,
      name: column.name,
      opts: {
        color: "#005461"
      }
    });
  }
  return tableData;
};
const attachStableData = (c) => {
  const mainStore = store_index.useMainStore();
  c["proname"] = mainStore.projInfo.proname;
  c["htd"] = mainStore.projInfo.htd;
  c["fbgc"] = utils_sheets.getTrueFBGC();
};
const attachStatus = (c) => {
  c["status"] = "";
};
const toFormatDate = (c) => {
  for (const key in c) {
    if (dateTag.includes(key)) {
      c[key] = utils_dateFormat.readableToFormat(c[key]);
    }
  }
};
exports.attachStableData = attachStableData;
exports.attachStatus = attachStatus;
exports.dateTag = dateTag;
exports.getTableData = getTableData;
exports.toFormatDate = toFormatDate;
exports.withDelete = withDelete;
exports.withStatus = withStatus;
exports.withUpdate = withUpdate;
