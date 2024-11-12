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
const utils_db = require("../../utils/db.js");
const utils_columnsHandler = require("../../utils/columnsHandler.js");
const utils_message = require("../../utils/message.js");
const utils_sheets = require("../../utils/sheets.js");
const store_index = require("../../store/index.js");
const utils_titles = require("../../utils/titles.js");
const createColumnsAndTable = (columns, tableData) => {
  var _a;
  const data = (_a = utils_titles.getTitlesByType()) != null ? _a : [];
  Object.assign(columns, data);
  const t = utils_columnsHandler.getTableData(data);
  utils_columnsHandler.withStatus(t);
  utils_columnsHandler.withDelete(t);
  utils_columnsHandler.withUpdate(t);
  Object.assign(tableData, t);
  return true;
};
const initDB = () => __async(exports, null, function* () {
  const op = yield utils_db.isOpen();
  if (op.code === 200)
    return;
  const res = yield utils_db.openDB();
  if (res.code !== 200) {
    utils_message.toast("打开数据库失败");
    return;
  }
});
const initDBTable = (columns) => __async(exports, null, function* () {
  var _a;
  const name = (_a = utils_sheets.getCurTableTitleByFBGC()) != null ? _a : "";
  const res = yield utils_db.isTableExist(name);
  if (res.data) {
    return "ok";
  }
  const data = {};
  utils_columnsHandler.attachStatus(data);
  data["proname"] = "";
  data["htd"] = "";
  data["fbgc"] = "";
  data["username"] = "";
  for (const column of columns) {
    data[column.prop] = "TEXT";
  }
  const res2 = yield utils_db.createTable(name, __spreadValues({
    lid: "INTEGER PRIMARY KEY AUTOINCREMENT"
  }, data));
  if (res2.code !== 200) {
    utils_message.toast("创建表失败");
  }
  return "ok";
});
const getLocalData = () => __async(exports, null, function* () {
  var _a, _b;
  const mainStore = store_index.useMainStore();
  const title = (_a = utils_sheets.getCurTableTitleByFBGC()) != null ? _a : "";
  const res = yield utils_db.selectTableData(title, {
    proname: mainStore.projInfo.proname,
    htd: mainStore.projInfo.htd,
    fbgc: mainStore.projInfo.fbgc,
    username: mainStore.username
  });
  if (res.code !== 200) {
    utils_message.toast("获取数据失败");
    return [];
  }
  return (_b = res.data) != null ? _b : [];
});
const afterUpload = (data) => __async(exports, null, function* () {
  var _a, _b;
  const title = (_a = utils_sheets.getCurTableTitleByFBGC()) != null ? _a : "";
  for (let i = 0; i < data.length; i++) {
    if (((_b = data[i]["status"]) != null ? _b : "未保存") !== "已保存") {
      continue;
    }
    data[i]["status"] = "已提交";
    const res = yield utils_db.updateTableData(title, data[i], "lid", data[i]["lid"]);
    if (res.code !== 200) {
      utils_message.toast("更新数据失败");
    }
  }
});
const deleteLocalData = (lid) => __async(exports, null, function* () {
  var _a;
  const title = (_a = utils_sheets.getCurTableTitleByFBGC()) != null ? _a : "";
  const res = yield utils_db.deleteTableData(title, "lid", lid);
  if (res.code !== 200) {
    utils_message.toast("删除数据失败");
  }
});
const deleteAllLocalData = (data) => __async(exports, null, function* () {
  var _a;
  const title = (_a = utils_sheets.getCurTableTitleByFBGC()) != null ? _a : "";
  for (let i = 0; i < data.length; i++) {
    if (data[i]["lid"] !== void 0) {
      const res = yield utils_db.deleteTableData(title, "lid", data[i]["lid"]);
      if (res.code !== 200) {
        utils_message.toast("删除数据失败");
      }
    }
  }
});
const saveToLocal = (data) => __async(exports, null, function* () {
  var _a, _b;
  const mainStore = store_index.useMainStore();
  const title = (_a = utils_sheets.getCurTableTitleByFBGC()) != null ? _a : "";
  for (let i = 0; i < data.length; i++) {
    if (((_b = data[i]["status"]) != null ? _b : "未保存") !== "未保存") {
      continue;
    }
    data[i]["status"] = "已保存";
    if (data[i]["lid"] !== void 0) {
      const res2 = yield utils_db.updateTableData(title, data[i], "lid", data[i]["lid"]);
      if (res2.code !== 200) {
        return Promise.reject(res2.message);
      }
      continue;
    }
    data[i]["proname"] = mainStore.projInfo.proname;
    data[i]["htd"] = mainStore.projInfo.htd;
    data[i]["fbgc"] = mainStore.projInfo.fbgc;
    data[i]["username"] = mainStore.username;
    const res = yield utils_db.insertTableData(title, data[i]);
    if (res.code !== 200) {
      utils_message.toast("保存数据失败");
      return Promise.reject(res.message);
    }
  }
  return Promise.resolve("保存成功");
});
const getPureRecords = (tableData, needUpload = true) => {
  const rec = [];
  for (let i = 0; i < tableData.data.length; i++) {
    if (!needUpload) {
      if (tableData.data[i]["status"] === "已提交") {
        continue;
      }
    }
    const t = __spreadValues({}, tableData.data[i]);
    delete t["delete"];
    delete t["update"];
    delete t["opts"];
    rec.push(t);
  }
  return rec;
};
const getAttachmentOpts = (color) => {
  return {
    opts: {
      update: {
        type: "button",
        fontColor: "#8FBF9F"
      },
      delete: {
        type: "button",
        fontColor: "#de283b"
      },
      status: {
        fontColor: color
      }
    }
  };
};
const statusToColor = (status) => {
  switch (status) {
    case "已保存":
      return "green";
    case "已提交":
      return "blue";
    default:
      return "red";
  }
};
exports.afterUpload = afterUpload;
exports.createColumnsAndTable = createColumnsAndTable;
exports.deleteAllLocalData = deleteAllLocalData;
exports.deleteLocalData = deleteLocalData;
exports.getAttachmentOpts = getAttachmentOpts;
exports.getLocalData = getLocalData;
exports.getPureRecords = getPureRecords;
exports.initDB = initDB;
exports.initDBTable = initDBTable;
exports.saveToLocal = saveToLocal;
exports.statusToColor = statusToColor;
