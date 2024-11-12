"use strict";
const uni_modules_zbTable_components_zbTable_js_summary = require("../js/summary.js");
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "table-footer",
  mixins: [uni_modules_zbTable_components_zbTable_js_summary.summary]
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.transColumns, (item, index, i0) => {
      return {
        a: common_vendor.t(_ctx.sums[index]),
        b: `${item.width ? item.width : "100"}px`,
        c: index === _ctx.transColumns.length - 1 ? 1 : "none",
        d: `${item.width ? item.width : "100"}px`,
        e: item.align || "left",
        f: index
      };
    }),
    b: `${_ctx.border ? "1px solid #e8e8e8" : ""}`,
    c: `${_ctx.border ? "1px solid #e8e8e8" : ""}`,
    d: common_vendor.o((...args) => _ctx.handleFooterTableScrollLeft && _ctx.handleFooterTableScrollLeft(...args)),
    e: _ctx.headerFooterTableLeft,
    f: `${_ctx.scrollbarSize}px`
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bc387610"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/uni_modules/zb-table/components/zb-table/components/table-h5-summary.vue"]]);
wx.createComponent(Component);
