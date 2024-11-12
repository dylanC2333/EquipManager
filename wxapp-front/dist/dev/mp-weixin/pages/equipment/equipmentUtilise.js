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
const api_system_equipmentUtilise = require("../../api/system/equipmentUtilise.js");
const tmui_tool_dayjs_esm_index = require("../../tmui/tool/dayjs/esm/index.js");
if (!Array) {
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_zb_table2 = common_vendor.resolveComponent("zb-table");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_form_item2 = common_vendor.resolveComponent("tm-form-item");
  const _easycom_tm_form2 = common_vendor.resolveComponent("tm-form");
  const _easycom_tm_modal2 = common_vendor.resolveComponent("tm-modal");
  const _easycom_tm_calendar2 = common_vendor.resolveComponent("tm-calendar");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_button2 + _easycom_zb_table2 + _easycom_tm_input2 + _easycom_tm_form_item2 + _easycom_tm_form2 + _easycom_tm_modal2 + _easycom_tm_calendar2 + _easycom_tm_app2)();
}
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_zb_table = () => "../../uni_modules/zb-table/components/zb-table/zb-table.js";
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_form_item = () => "../../tmui/components/tm-form-item/tm-form-item.js";
const _easycom_tm_form = () => "../../tmui/components/tm-form/tm-form.js";
const _easycom_tm_modal = () => "../../tmui/components/tm-modal/tm-modal.js";
const _easycom_tm_calendar = () => "../../tmui/components/tm-calendar/tm-calendar.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_button + _easycom_zb_table + _easycom_tm_input + _easycom_tm_form_item + _easycom_tm_form + _easycom_tm_modal + _easycom_tm_calendar + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "equipmentUtilise",
  setup(__props) {
    const list = common_vendor.ref([]);
    common_vendor.ref(false);
    const pagination = common_vendor.ref({
      //存储分页控制数据
      total: 0,
      page: 1,
      limit: 10
    });
    const searchObj = common_vendor.ref({
      // 查询条件
      keyword: ""
    });
    const sortOption = common_vendor.ref({
      // 排序条件
      column: "createTime",
      // 排序字段
      sortorder: "descending"
      // 升降序条件
    });
    const showModel = common_vendor.ref(false);
    const sysEquipUse = common_vendor.ref({
      equipmentCode: "",
      taskCode: "",
      employeeUseCode: "",
      equipmentUseDate: "",
      location: "",
      preUseEquipmentStatus: "",
      maintenanceStatus: "",
      remarks: ""
    });
    const showCal = common_vendor.ref(false);
    const DayJs = tmui_tool_dayjs_esm_index.dayjs;
    const column = common_vendor.reactive([
      { type: "selection", fixed: true, align: "right", width: 40 },
      { name: "operation", type: "operation", fixed: true, label: "操作", renders: [
        {
          name: "详情",
          type: "default",
          func: "detail"
          // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
        }
      ] },
      { name: "equipmentCode", label: "设备编号", fixed: false, width: 130, emptyString: "" },
      { name: "equipmentUseName", label: "设备名称", sorter: false, emptyString: "" },
      { name: "taskCode", label: "任务编号" },
      { name: "equipmentUseDate", label: "使用日期" },
      { name: "employeeUseCode", label: "使用人编号" },
      { name: "employeeUseName", label: "使用人姓名", sorter: true },
      { name: "location", label: "地点" },
      { name: "preUseEquipmentStatus", label: "设备使用前情况" },
      { name: "maintenanceStatus", label: "维护保养情况" },
      { name: "operation", type: "operation", label: "操作", renders: [
        {
          name: "编辑",
          func: "edit"
          // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
        },
        {
          name: "删除",
          type: "warn",
          func: "remove"
        }
      ] }
    ]);
    common_vendor.computed(() => {
      if (!sysEquipUse.value.equipmentUseDate || !Array.isArray(sysEquipUse.value.equipmentUseDate))
        return "";
      if (sysEquipUse.value.equipmentUseDate.length == 0)
        return "";
      return DayJs(sysEquipUse.value.equipmentUseDate[0]).format("YYYY-MM-DD");
    });
    const initialObject = (obj) => {
      Object.keys(obj).forEach((key) => {
        obj[key] = "";
      });
    };
    const SaveorUpdate = () => __async(this, null, function* () {
      console.log("form submit!");
      if (!sysEquipUse.value.id) {
        console.log("add processing!");
        console.log(sysEquipUse.value);
        const res = yield api_system_equipmentUtilise.saveEquipUtilise(sysEquipUse.value);
        console.log(res);
      } else {
        console.log("edit processing!");
        console.log(sysEquipUse.value);
      }
    });
    const add = () => __async(this, null, function* () {
      showModel.value = true;
      initialObject(sysEquipUse.value);
      console.log("add!");
    });
    const buttonEdit = (item, index) => __async(this, null, function* () {
      showModel.value = true;
      sysEquipUse.value = item;
      console.log(sysEquipUse.value);
      console.log("edit!");
    });
    const removeById = (item, index) => __async(this, null, function* () {
      console.log("delete!");
      console.log(item.id);
      const res = yield api_system_equipmentUtilise.removeId(item.id);
      console.log("res: " + res);
      fetchData();
    });
    const detail = () => __async(this, null, function* () {
      console.log("detail!");
    });
    const fetchAll = () => __async(this, null, function* () {
      const list2 = yield api_system_equipmentUtilise.findAllRecords();
      console.log(list2);
    });
    const fetchData = (pageNum = 1) => __async(this, null, function* () {
      pagination.value.page = pageNum;
      const res = yield api_system_equipmentUtilise.getPageList(
        pagination.value.page,
        pagination.value.limit,
        searchObj.value,
        sortOption.value.column,
        sortOption.value.sortorder
      );
      list.value = res.records;
      pagination.value.total = res.total;
      console.log(res);
      console.log(list.value);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => fetchAll()),
        b: common_vendor.p({
          block: true
        }),
        c: common_vendor.o(($event) => fetchData()),
        d: common_vendor.p({
          block: true
        }),
        e: common_vendor.o(add),
        f: common_vendor.p({
          block: true,
          size: "mini"
        }),
        g: common_vendor.o(buttonEdit),
        h: common_vendor.o(removeById),
        i: common_vendor.o(detail),
        j: common_vendor.p({
          ["show-header"]: true,
          columns: column,
          stripe: true,
          fit: false,
          ["show-summary"]: false,
          border: true,
          data: list.value
        }),
        k: common_vendor.o(common_vendor.m(($event) => sysEquipUse.value.equipmentCode = $event, {
          lazy: true
        }, true)),
        l: common_vendor.p({
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          modelValue: sysEquipUse.value.equipmentCode
        }),
        m: common_vendor.p({
          required: true,
          label: "设备编号",
          field: "equipmentCode",
          rules: [{
            required: true,
            message: "必填"
          }]
        }),
        n: common_vendor.o(common_vendor.m(($event) => sysEquipUse.value.taskCode = $event, {
          lazy: true
        }, true)),
        o: common_vendor.p({
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          modelValue: sysEquipUse.value.taskCode
        }),
        p: common_vendor.p({
          required: true,
          label: "任务编号",
          field: "taskCode",
          rules: [{
            required: true,
            message: "必填"
          }]
        }),
        q: common_vendor.o(common_vendor.m(($event) => sysEquipUse.value.employeeUseCode = $event, {
          lazy: true
        }, true)),
        r: common_vendor.p({
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          modelValue: sysEquipUse.value.employeeUseCode
        }),
        s: common_vendor.p({
          required: true,
          label: "使用人编号",
          field: "employeeUseCode",
          rules: [{
            required: true,
            message: "必填"
          }]
        }),
        t: common_vendor.o(common_vendor.m(($event) => sysEquipUse.value.equipmentUseDate = $event, {
          lazy: true
        }, true)),
        v: common_vendor.p({
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          modelValue: sysEquipUse.value.equipmentUseDate
        }),
        w: common_vendor.p({
          required: true,
          label: "使用日期",
          field: "equipmentUseDate",
          rules: [{
            required: true,
            message: "必填"
          }]
        }),
        x: common_vendor.o(common_vendor.m(($event) => sysEquipUse.value.location = $event, {
          lazy: true
        }, true)),
        y: common_vendor.p({
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          modelValue: sysEquipUse.value.location
        }),
        z: common_vendor.p({
          required: true,
          label: "地点",
          field: "location",
          rules: [{
            required: true,
            message: "必填"
          }]
        }),
        A: common_vendor.o(common_vendor.m(($event) => sysEquipUse.value.preUseEquipmentStatus = $event, {
          lazy: true
        }, true)),
        B: common_vendor.p({
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          modelValue: sysEquipUse.value.preUseEquipmentStatus
        }),
        C: common_vendor.p({
          required: true,
          label: "设备使用前情况",
          field: "preUseEquipmentStatus",
          rules: [{
            required: true,
            message: "必填"
          }]
        }),
        D: common_vendor.o(common_vendor.m(($event) => sysEquipUse.value.maintenanceStatus = $event, {
          lazy: true
        }, true)),
        E: common_vendor.p({
          inputPadding: [0, 0],
          transprent: true,
          showBottomBotder: false,
          modelValue: sysEquipUse.value.maintenanceStatus
        }),
        F: common_vendor.p({
          required: true,
          label: "维护保养情况",
          field: "maintenanceStatus",
          rules: [{
            required: true,
            message: "必填"
          }]
        }),
        G: common_vendor.sr("form", "3e71700f-6,3e71700f-5"),
        H: common_vendor.p({
          ["label-width"]: 80
        }),
        I: common_vendor.o(SaveorUpdate),
        J: common_vendor.o(($event) => showModel.value = $event),
        K: common_vendor.p({
          color: "white",
          okColor: "red",
          cancelColor: "red",
          okLinear: "left",
          splitBtn: true,
          title: "添加/修改",
          width: 700,
          height: 1e3,
          show: showModel.value
        }),
        L: common_vendor.o(($event) => sysEquipUse.value.equipmentUseDate = $event),
        M: common_vendor.o(($event) => showCal.value = $event),
        N: common_vendor.p({
          ["default-value"]: sysEquipUse.value.equipmentUseDate,
          modelValue: sysEquipUse.value.equipmentUseDate,
          show: showCal.value
        }),
        O: common_vendor.sr("app", "3e71700f-4"),
        P: common_vendor.p({
          color: "grey-5"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3e71700f"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/equipment/equipmentUtilise.vue"]]);
wx.createPage(MiniProgramPage);
