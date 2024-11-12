"use strict";
const common_vendor = require("../common/vendor.js");
if (!Math) {
  ComOverlay();
}
const ComOverlay = () => "./comOverlay.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "contentModal",
  props: {
    show: { type: Boolean },
    title: {},
    portraitSize: {},
    landscapeSize: {}
  },
  emits: ["update:show", "close"],
  setup(__props, { emit: __emit }) {
    var _a, _b, _c, _d;
    common_vendor.useCssVars((_ctx) => ({
      "513cc456": common_vendor.unref(lw),
      "513cc474": common_vendor.unref(lh),
      "513cc35e": common_vendor.unref(pw),
      "513cc37c": common_vendor.unref(ph)
    }));
    const props = __props;
    const emit = __emit;
    const showModel = common_vendor.computed({
      get() {
        return props.show;
      },
      set(val) {
        emit("update:show", val);
      }
    });
    const hdClose = () => {
      emit("close");
    };
    const lw = ((_a = props.landscapeSize) == null ? void 0 : _a.width) || "1000px";
    const lh = ((_b = props.landscapeSize) == null ? void 0 : _b.height) || "500px";
    const pw = ((_c = props.portraitSize) == null ? void 0 : _c.width) || "90%";
    const ph = ((_d = props.portraitSize) == null ? void 0 : _d.height) || "80%";
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.title),
        b: common_vendor.o(($event) => $event.stopPropagation()),
        c: common_vendor.o(hdClose),
        d: common_vendor.s(_ctx.__cssVars()),
        e: common_vendor.o(($event) => showModel.value = $event),
        f: common_vendor.p({
          show: showModel.value
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e90c614f"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/components/contentModal.vue"]]);
wx.createComponent(Component);
