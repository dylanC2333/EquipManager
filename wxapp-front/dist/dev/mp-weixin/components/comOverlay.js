"use strict";
const common_vendor = require("../common/vendor.js");
const utils_common = require("../utils/common.js");
const duration = 250;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "comOverlay",
  props: {
    show: { type: Boolean }
  },
  emits: ["close", "update:show"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const fadeFlag = common_vendor.ref(false);
    const showMask = common_vendor.ref(false);
    common_vendor.watch(
      () => props.show,
      (val) => {
        openOrClose(val);
      }
    );
    common_vendor.onMounted(() => {
      if (props.show) {
        openOrClose(true);
      }
    });
    const hdClose = (e) => {
      e.stopPropagation();
      openOrClose(false);
    };
    const switchStatus = (status) => {
      if (status) {
        showMask.value = true;
        setTimeout(() => {
          fadeFlag.value = true;
        }, 15);
        setTimeout(() => {
          emit("update:show", true);
        }, duration);
      } else {
        fadeFlag.value = false;
        setTimeout(() => {
          showMask.value = false;
          emit("close");
          emit("update:show", false);
        }, duration + 15);
      }
    };
    const throttleSwitchStatus = utils_common.throttle(switchStatus, duration + 15, true);
    const openOrClose = (val) => {
      if (showMask.value === val)
        return;
      throttleSwitchStatus(val);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showMask.value
      }, showMask.value ? {
        b: common_vendor.n(fadeFlag.value ? "fade-in" : "fade-out"),
        c: _ctx.duration + "ms",
        d: common_vendor.n(fadeFlag.value ? "fade-in" : "fade-out"),
        e: _ctx.duration + "ms",
        f: common_vendor.o(hdClose)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-813158a5"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/components/comOverlay.vue"]]);
wx.createComponent(Component);
