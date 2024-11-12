"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_useVModel = require("../../../utils/useVModel.js");
if (!Array) {
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_text2 + _easycom_tm_input2 + _easycom_tm_app2)();
}
const _easycom_tm_text = () => "../../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_input = () => "../../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_app = () => "../../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_text + _easycom_tm_input + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "dataForm",
  props: {
    columns: {},
    modelValue: {},
    enterTab: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currPosition = common_vendor.ref(-1);
    const toNext = () => {
      setTimeout(() => {
        currPosition.value++;
      }, 100);
    };
    const model = utils_useVModel.useVModel(props, "modelValue", emit);
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.f(_ctx.columns, (item, index, i0) => {
          var _a2;
          return common_vendor.e({
            a: "199ed355-1-" + i0 + ",199ed355-0",
            b: common_vendor.p({
              ["font-size"]: 35,
              label: item.name
            })
          }, ((_a2 = _ctx.enterTab) != null ? _a2 : false) ? {
            c: common_vendor.o(($event) => currPosition.value = index, index),
            d: common_vendor.o(toNext, index),
            e: "199ed355-2-" + i0 + ",199ed355-0",
            f: common_vendor.o(($event) => common_vendor.unref(model)[item.prop] = $event, index),
            g: common_vendor.p({
              focus: currPosition.value === index,
              modelValue: common_vendor.unref(model)[item.prop]
            })
          } : {
            h: "199ed355-3-" + i0 + ",199ed355-0",
            i: common_vendor.o(($event) => common_vendor.unref(model)[item.prop] = $event, index),
            j: common_vendor.p({
              modelValue: common_vendor.unref(model)[item.prop]
            })
          }, {
            k: index
          });
        }),
        b: (_a = _ctx.enterTab) != null ? _a : false,
        c: common_vendor.p({
          color: "white"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-199ed355"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/commonTest/components/dataForm.vue"]]);
wx.createComponent(Component);
