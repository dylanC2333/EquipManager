"use strict";
const uni_modules_zbTable_components_zbTable_js_summary = require("../js/summary.js");
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  mixins: [uni_modules_zbTable_components_zbTable_js_summary.summary]
};
if (!Array) {
  const _component_template = common_vendor.resolveComponent("template");
  _component_template();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.transColumns, (item, index, i0) => {
      return {
        a: common_vendor.t(_ctx.sums[index] || item.emptyString),
        b: common_vendor.n(index < _ctx.fixedLeftColumns.length && "zb-stick-side"),
        c: `${item.left}px`,
        d: `${item.width ? item.width : "100"}px`,
        e: index === _ctx.transColumns.length - 1 ? 1 : "none",
        f: `${item.width ? item.width : "100"}px`,
        g: item.align || "left",
        h: index
      };
    }),
    b: `${_ctx.border ? "1px solid #e8e8e8" : ""}`,
    c: `${_ctx.border ? "1px solid #e8e8e8" : ""}`
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1b92d4af"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/uni_modules/zb-table/components/zb-table/components/table-summary.vue"]]);
wx.createComponent(Component);
