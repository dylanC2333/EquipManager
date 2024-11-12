"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
const pages_commonTest_columns = require("./columns.js");
const api_receive_index = require("../../api/receive/index.js");
const store_index = require("../../store/index.js");
const utils_columnsHandler = require("../../utils/columnsHandler.js");
const utils_message = require("../../utils/message.js");
if (!Array) {
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_alert2 = common_vendor.resolveComponent("tm-alert");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_text2 + _easycom_tm_alert2 + _easycom_tm_button2 + _easycom_tm_app2)();
}
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_alert = () => "../../tmui/components/tm-alert/tm-alert.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_text + _easycom_tm_alert + _easycom_tm_button + DataTable + FormModel + AskModel + _easycom_tm_app)();
}
const DataTable = () => "./components/dataTable.js";
const FormModel = () => "./components/formModel.js";
const AskModel = () => "./components/askModel.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const mainStore = store_index.useMainStore();
    const showAddModel = common_vendor.ref(false);
    const showDeleteModel = common_vendor.ref(false);
    const showClearModel = common_vendor.ref(false);
    const showUpdateModel = common_vendor.ref(false);
    const showUploadModel = common_vendor.ref(false);
    const flag = common_vendor.ref(false);
    let curDelete = -1;
    let curUpdate = -1;
    const columns = common_vendor.reactive([]);
    const tableData = common_vendor.reactive({});
    const record = common_vendor.ref({});
    const setTableData = (data) => {
      for (const c of data) {
        tableData.data.push(__spreadValues(__spreadProps(__spreadValues({}, c), {
          update: "修改",
          delete: "删除"
        }), pages_commonTest_columns.getAttachmentOpts(pages_commonTest_columns.statusToColor(c.status))));
      }
    };
    const initAllRecords = () => __async(this, null, function* () {
      tableData.data.length = 0;
      const data = yield pages_commonTest_columns.getLocalData();
      setTableData(data);
    });
    const initRecord = () => {
      var _a;
      const lastOne = __spreadValues({}, tableData.data[tableData.data.length - 1]);
      if (lastOne) {
        delete lastOne.update;
        delete lastOne.delete;
        delete lastOne.opts;
        delete lastOne.status;
        for (const key in lastOne) {
          if ((_a = columns.find((item) => item.prop === key)) == null ? void 0 : _a.echo) {
            record.value[key] = lastOne[key];
          }
        }
      }
    };
    pages_commonTest_columns.createColumnsAndTable(columns, tableData);
    pages_commonTest_columns.initDB().then(() => pages_commonTest_columns.initDBTable(columns)).then(() => pages_commonTest_columns.getLocalData()).then((res) => {
      setTableData(res);
      flag.value = true;
    });
    initRecord();
    const clearRecord = () => {
      for (const key in record.value) {
        delete record.value[key];
      }
    };
    const isAllBlank = () => {
      return Object.values(record.value).every((v) => v === "");
    };
    const hdAdd = () => {
      initRecord();
      showAddModel.value = true;
    };
    const hdUpdate = (index) => {
      for (const key in tableData.data[index]) {
        record.value[key] = tableData.data[index][key];
      }
      curUpdate = index;
      showUpdateModel.value = true;
    };
    const hdDelete = (index) => {
      curDelete = index;
      showDeleteModel.value = true;
    };
    const hdClear = () => {
      showClearModel.value = true;
    };
    const hdSave = () => __async(this, null, function* () {
      const rec = pages_commonTest_columns.getPureRecords(tableData, false);
      yield pages_commonTest_columns.saveToLocal(rec);
      yield initAllRecords();
      utils_message.toast("保存成功");
    });
    const hdUpload = () => {
      if (tableData.data.length === 0) {
        utils_message.toast("请先添加数据", "none", 2e3);
        return;
      }
      showUploadModel.value = true;
    };
    const uploadRecords = () => __async(this, null, function* () {
      const rec = pages_commonTest_columns.getPureRecords(tableData, false);
      if (!rec.length) {
        utils_message.toast("没有未提交的数据", "none", 2e3);
        return;
      }
      for (let i = 0; i < rec.length; i++) {
        if (rec[i]["status"] !== "已保存") {
          utils_message.toast("请先保存所有数据", "none", 2e3);
          return;
        }
      }
      rec.map((r) => utils_columnsHandler.attachStableData(r));
      yield api_receive_index.handInManyRecords2Detail(rec);
      yield pages_commonTest_columns.afterUpload(rec);
      yield initAllRecords();
      utils_message.toast("上传成功", "success", 2e3);
    });
    const deleteExistRecord = () => __async(this, null, function* () {
      if (tableData.data[curDelete]["lid"] !== void 0) {
        yield pages_commonTest_columns.deleteLocalData(tableData.data[curDelete]["lid"]);
      }
      tableData.data.splice(curDelete, 1);
    });
    const deleteAllRecord = () => __async(this, null, function* () {
      const rec = pages_commonTest_columns.getPureRecords(tableData);
      yield pages_commonTest_columns.deleteAllLocalData(rec);
      tableData.data.length = 0;
    });
    const updateExistRecord = () => {
      tableData.data.splice(curUpdate, 1, __spreadValues(__spreadProps(__spreadValues({}, record.value), {
        status: "未保存"
      }), pages_commonTest_columns.getAttachmentOpts("red")));
      clearRecord();
    };
    const addRecord = () => {
      if (isAllBlank()) {
        utils_message.toast("请填写完整", "error", 2e3);
        return;
      }
      tableData.data.push(__spreadValues(__spreadProps(__spreadValues({}, record.value), {
        update: "修改",
        delete: "删除",
        status: "未保存"
      }), pages_commonTest_columns.getAttachmentOpts("red")));
      clearRecord();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          ["font-size"]: 50,
          color: "#1a1a1a",
          label: common_vendor.unref(mainStore).getCurType()
        }),
        b: common_vendor.p({
          color: "#25b1bf",
          outlined: true,
          ["border-style"]: "dashed",
          border: 1,
          content: {
            icon: "tmicon-alert",
            content: "当前表单：" + common_vendor.unref(mainStore).getCurInfo()
          },
          height: 80,
          closable: false
        }),
        c: common_vendor.o(hdAdd),
        d: common_vendor.p({
          block: true,
          color: "#0085ff",
          ["font-size"]: 30,
          label: "新建记录"
        }),
        e: common_vendor.o(hdUpload),
        f: common_vendor.p({
          block: true,
          color: "#43A49B",
          ["font-size"]: 30,
          label: "提交记录"
        }),
        g: common_vendor.o(hdSave),
        h: common_vendor.p({
          block: true,
          color: "#ff983f",
          ["font-size"]: 30,
          label: "保存记录"
        }),
        i: common_vendor.o(hdClear),
        j: common_vendor.p({
          block: true,
          label: "清空记录",
          ["font-size"]: 30,
          color: "#de283b"
        }),
        k: flag.value
      }, flag.value ? {
        l: common_vendor.o(hdUpdate),
        m: common_vendor.o(hdDelete),
        n: common_vendor.p({
          data: tableData
        })
      } : {}, {
        o: common_vendor.o(clearRecord),
        p: common_vendor.o(addRecord),
        q: common_vendor.o(addRecord),
        r: common_vendor.o(($event) => record.value = $event),
        s: common_vendor.o(($event) => showAddModel.value = $event),
        t: common_vendor.p({
          columns,
          title: "新建记录",
          ["add-record"]: true,
          ["enter-tab"]: true,
          modelValue: record.value,
          output: showAddModel.value
        }),
        v: common_vendor.o(clearRecord),
        w: common_vendor.o(updateExistRecord),
        x: common_vendor.o(($event) => showUpdateModel.value = $event),
        y: common_vendor.o(($event) => record.value = $event),
        z: common_vendor.p({
          title: "修改记录",
          columns,
          output: showUpdateModel.value,
          modelValue: record.value
        }),
        A: common_vendor.o(deleteAllRecord),
        B: common_vendor.o(($event) => showClearModel.value = $event),
        C: common_vendor.p({
          title: "提示",
          content: "是否确认清空所有记录",
          ["check-color"]: "red",
          show: showClearModel.value
        }),
        D: common_vendor.o(uploadRecords),
        E: common_vendor.o(($event) => showUploadModel.value = $event),
        F: common_vendor.p({
          title: "提示",
          content: "是否确认上传所有记录",
          ["check-color"]: "green",
          show: showUploadModel.value
        }),
        G: common_vendor.o(deleteExistRecord),
        H: common_vendor.o(($event) => showDeleteModel.value = $event),
        I: common_vendor.p({
          title: "提示",
          content: "是否确认删除该记录",
          ["check-color"]: "red",
          show: showDeleteModel.value
        }),
        J: common_vendor.p({
          color: "#ffffff"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b016df11"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/commonTest/index.vue"]]);
wx.createPage(MiniProgramPage);
