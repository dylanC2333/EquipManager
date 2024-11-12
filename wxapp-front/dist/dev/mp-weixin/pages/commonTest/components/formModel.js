"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_useVModel = require("../../../utils/useVModel.js");
if (!Array) {
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  _easycom_tm_button2();
}
const _easycom_tm_button = () => "../../../tmui/components/tm-button/tm-button.js";
if (!Math) {
  (DataForm + _easycom_tm_button + ContentModal)();
}
const DataForm = () => "./dataForm.js";
const ContentModal = () => "../../../components/contentModal.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "formModel",
  props: {
    output: { type: Boolean },
    title: {},
    modelValue: {},
    columns: {},
    addRecord: { type: Boolean },
    enterTab: { type: Boolean }
  },
  emits: ["update:modelValue", "update:output", "cancel", "add", "confirm", "close"],
  setup(__props, { emit: __emit }) {
    common_vendor.useCssVars((_ctx) => ({
      "311ae231": common_vendor.unref(gridStyle)
    }));
    const props = __props;
    const emit = __emit;
    const model = utils_useVModel.useVModel(props, "modelValue", emit);
    const outputModel = common_vendor.computed({
      get() {
        return props.output;
      },
      set(value) {
        emit("update:output", value);
      }
    });
    const gridStyle = props.addRecord ? "repeat(3, 1fr)" : "repeat(2, 1fr)";
    const hdCancel = () => {
      outputModel.value = false;
      emit("cancel");
    };
    const hdConfirm = () => {
      outputModel.value = false;
      emit("confirm");
    };
    const hdAdd = () => {
      emit("add");
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.o(($event) => common_vendor.isRef(model) ? model.value = $event : null),
        b: common_vendor.p({
          ["enter-tab"]: (_a = _ctx.enterTab) != null ? _a : false,
          columns: _ctx.columns,
          modelValue: common_vendor.unref(model)
        }),
        c: _ctx.addRecord
      }, _ctx.addRecord ? {
        d: common_vendor.o(hdCancel),
        e: common_vendor.p({
          block: true,
          text: true,
          margin: [0, 0],
          height: 120,
          round: -1,
          label: "取消"
        }),
        f: common_vendor.o(hdConfirm),
        g: common_vendor.p({
          block: true,
          margin: [0, 0],
          height: 120,
          round: -1,
          label: "完成"
        }),
        h: common_vendor.o(hdAdd),
        i: common_vendor.p({
          block: true,
          margin: [0, 0],
          height: 120,
          round: -1,
          label: "新增",
          color: "#42b883"
        })
      } : {
        j: common_vendor.o(hdCancel),
        k: common_vendor.p({
          block: true,
          text: true,
          margin: [0, 0],
          height: 100,
          round: -1,
          label: "取消"
        }),
        l: common_vendor.o(hdConfirm),
        m: common_vendor.p({
          block: true,
          margin: [0, 0],
          height: 100,
          round: -1,
          label: "完成"
        })
      }, {
        n: common_vendor.s(_ctx.__cssVars()),
        o: common_vendor.o(($event) => outputModel.value = $event),
        p: common_vendor.p({
          title: _ctx.title,
          show: outputModel.value
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-805a5d1b"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/commonTest/components/formModel.vue"]]);
wx.createComponent(Component);
