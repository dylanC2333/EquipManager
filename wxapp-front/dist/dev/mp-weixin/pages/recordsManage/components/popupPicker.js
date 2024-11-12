"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "popupPicker",
  props: {
    payload: {},
    title: {}
  },
  emits: ["confirm", "cancel"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const popup = common_vendor.ref();
    __expose({
      show() {
        popup.value.open();
      },
      hide() {
        popup.value.close();
      }
    });
    const props = __props;
    const selected = common_vendor.ref([0]);
    const b = common_vendor.computed(() => {
      return props.payload[selected.value[0]];
    });
    const visible = common_vendor.ref(true);
    const indicatorStyle = common_vendor.ref(`height: 68rpx;`);
    const emit = __emit;
    const hdCancel = () => {
      emit("cancel");
      popup.value.close();
      selected.value = [0];
    };
    const hdChange = (i) => {
      selected.value[0] = i;
    };
    const hdConfirm = () => {
      emit("confirm", b.value);
      popup.value.close();
      selected.value = [0];
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(hdCancel),
        b: common_vendor.t(_ctx.title),
        c: common_vendor.o(hdConfirm),
        d: visible.value
      }, visible.value ? {
        e: common_vendor.f(_ctx.payload, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        f: indicatorStyle.value,
        g: selected.value,
        h: common_vendor.o(($event) => hdChange($event.detail.value[0]))
      } : {}, {
        i: common_vendor.sr(popup, "30571b16-0", {
          "k": "popup"
        }),
        j: common_vendor.o(($event) => selected.value[0] = 0),
        k: common_vendor.p({
          type: "bottom"
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-30571b16"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/recordsManage/components/popupPicker.vue"]]);
wx.createComponent(Component);
