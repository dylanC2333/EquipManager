"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_useVModel = require("../../../utils/useVModel.js");
const utils_common = require("../../../utils/common.js");
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
    show: { type: Boolean },
    title: {},
    modelValue: {},
    columns: {},
    addRecord: { type: Boolean },
    enterTab: { type: Boolean }
  },
  emits: ["update:modelValue", "update:show", "cancel", "add", "confirm", "close"],
  setup(__props, { emit: __emit }) {
    common_vendor.useCssVars((_ctx) => ({
      "6538d78d": common_vendor.unref(gridStyle)
    }));
    const props = __props;
    const emit = __emit;
    const model = utils_useVModel.useVModel(props, "modelValue", emit);
    const form = utils_common.useCompRef();
    const outputModel = common_vendor.computed({
      get() {
        return props.show;
      },
      set(value) {
        emit("update:show", value);
      }
    });
    const gridStyle = props.addRecord ? "repeat(3, 1fr)" : "repeat(2, 1fr)";
    const hdCancel = () => {
      outputModel.value = false;
      emit("cancel");
    };
    const hdConfirm = () => {
      var _a;
      if (!((_a = form.value) == null ? void 0 : _a.validate()))
        return;
      outputModel.value = false;
      emit("confirm");
    };
    const hdAdd = () => {
      var _a;
      if (!((_a = form.value) == null ? void 0 : _a.validate()))
        return;
      emit("add");
    };
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.sr(form, "5e07d3ce-1,5e07d3ce-0", {
          "k": "form"
        }),
        b: common_vendor.o(($event) => common_vendor.isRef(model) ? model.value = $event : null),
        c: common_vendor.p({
          ["enter-tab"]: (_a = _ctx.enterTab) != null ? _a : false,
          columns: _ctx.columns,
          modelValue: common_vendor.unref(model)
        }),
        d: _ctx.addRecord
      }, _ctx.addRecord ? {
        e: common_vendor.o(hdCancel),
        f: common_vendor.p({
          block: true,
          text: true,
          margin: [0, 0],
          height: 120,
          round: -1,
          label: "取消"
        }),
        g: common_vendor.o(hdConfirm),
        h: common_vendor.p({
          block: true,
          margin: [0, 0],
          height: 120,
          round: -1,
          label: "完成"
        }),
        i: common_vendor.o(hdAdd),
        j: common_vendor.p({
          block: true,
          margin: [0, 0],
          height: 120,
          round: -1,
          label: "新增",
          color: "#42b883"
        })
      } : {
        k: common_vendor.o(hdCancel),
        l: common_vendor.p({
          block: true,
          text: true,
          margin: [0, 0],
          height: 100,
          round: -1,
          label: "取消"
        }),
        m: common_vendor.o(hdConfirm),
        n: common_vendor.p({
          block: true,
          margin: [0, 0],
          height: 100,
          round: -1,
          label: "完成"
        })
      }, {
        o: common_vendor.o(($event) => _ctx.$emit("close")),
        p: common_vendor.s(_ctx.__cssVars()),
        q: common_vendor.o(($event) => outputModel.value = $event),
        r: common_vendor.p({
          title: _ctx.title,
          show: outputModel.value
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5e07d3ce"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/recordsManage/components/formModel.vue"]]);
wx.createComponent(Component);
