"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tm_cell2 = common_vendor.resolveComponent("tm-cell");
  _easycom_tm_cell2();
}
const _easycom_tm_cell = () => "../../../tmui/components/tm-cell/tm-cell.js";
if (!Math) {
  _easycom_tm_cell();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cellPicker",
  props: {
    dataset: {},
    title: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const model = common_vendor.computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit("update:modelValue", val);
      }
    });
    const hdChange = (e) => {
      model.value = props.dataset[e.detail.value].text;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(model.value || "请选择"),
        b: _ctx.dataset,
        c: common_vendor.o(hdChange),
        d: common_vendor.p({
          bottomBorder: true,
          color: "#f5f5f5",
          ["title-color"]: "#1a1a1a",
          margin: [0, 0],
          titleFontSize: 40,
          title: _ctx.title
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-687eb966"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/tableSelect/components/cellPicker.vue"]]);
wx.createComponent(Component);
