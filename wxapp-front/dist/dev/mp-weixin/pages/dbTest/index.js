"use strict";
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
const common_vendor = require("../../common/vendor.js");
const utils_db = require("../../utils/db.js");
const utils_message = require("../../utils/message.js");
if (!Array) {
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_button2 + _easycom_tm_app2)();
}
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_button + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const hdClick = () => __async(this, null, function* () {
      utils_db.deleteTableData("lqlmysd");
    });
    const onclickOpenDB = () => __async(this, null, function* () {
      const { message } = yield utils_db.openDB();
      utils_message.toast(message);
    });
    const onclickIsOpen = () => __async(this, null, function* () {
      const res = yield utils_db.isOpen();
      utils_message.toast(res.message);
    });
    const onclickCloseDB = () => __async(this, null, function* () {
      const res = yield utils_db.closeDB();
      utils_message.toast(res.message);
    });
    const onclickCreateTable = () => __async(this, null, function* () {
      const res = yield utils_db.createTable("user", {
        id: "INTEGER PRIMARY KEY AUTOINCREMENT",
        name: "TEXT",
        age: "INTEGER"
      });
      utils_message.toast(res.message);
    });
    const onclickSelectSQL = () => __async(this, null, function* () {
      const res = yield utils_db.selectTableData("lqlmysd", {
        proname: "延黄高速"
      });
      utils_message.toast(res.data);
    });
    const onclickInsertSQL = () => __async(this, null, function* () {
      const res = yield utils_db.insertTableData("lqlmysd", {
        sffl: "yes"
      });
      utils_message.toast(res.message);
    });
    const onclickDropTable = () => __async(this, null, function* () {
      const res = yield utils_db.dropTable("lqlmysd");
      utils_message.toast(res.message);
    });
    const onclickIsExist = () => __async(this, null, function* () {
      const res = yield utils_db.isTableExist("lqlmysd");
      utils_message.toast(res.data ? "存在" : "不存在");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onclickOpenDB),
        b: common_vendor.o(onclickIsOpen),
        c: common_vendor.o(onclickCloseDB),
        d: common_vendor.o(onclickCreateTable),
        e: common_vendor.o(onclickSelectSQL),
        f: common_vendor.o(onclickInsertSQL),
        g: common_vendor.o(hdClick),
        h: common_vendor.o(onclickDropTable),
        i: common_vendor.o(onclickIsExist)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-755aef69"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/dbTest/index.vue"]]);
wx.createPage(MiniProgramPage);
