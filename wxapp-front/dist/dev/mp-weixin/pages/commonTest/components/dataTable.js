"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tm_table2 = common_vendor.resolveComponent("tm-table");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_table2 + _easycom_tm_app2)();
}
const _easycom_tm_table = () => "../../../tmui/components/tm-table/tm-table.js";
const _easycom_tm_app = () => "../../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_table + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "dataTable",
  props: {
    data: {}
  },
  emits: ["update", "delete"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const hdClick = (row, col) => {
      if (col === 0) {
        emit("update", row);
      } else if (col === 1) {
        emit("delete", row);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(hdClick),
        b: common_vendor.p({
          ["table-data"]: _ctx.data,
          width: 4e3,
          height: 1e3,
          ["header-height"]: 100,
          ["cell-height"]: 100,
          stripe: true
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3178a405"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/commonTest/components/dataTable.vue"]]);
wx.createComponent(Component);
