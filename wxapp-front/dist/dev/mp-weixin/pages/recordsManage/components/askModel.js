"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  _easycom_tm_button2();
}
const _easycom_tm_button = () => "../../../tmui/components/tm-button/tm-button.js";
if (!Math) {
  (_easycom_tm_button + ContentModal)();
}
const ContentModal = () => "../../../components/contentModal.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "askModel",
  props: {
    show: { type: Boolean },
    title: {},
    checkColor: {},
    content: {}
  },
  emits: ["update:show", "check", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const showModel = common_vendor.computed({
      get() {
        return props.show;
      },
      set(value) {
        emit("update:show", value);
      }
    });
    const hdCheck = () => {
      showModel.value = false;
      emit("check");
    };
    const hdCancel = () => {
      showModel.value = false;
      emit("cancel");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(_ctx.content),
        b: common_vendor.o(hdCancel),
        c: common_vendor.p({
          block: true,
          text: true,
          margin: [0, 0],
          height: 100,
          round: -1,
          label: "取消"
        }),
        d: common_vendor.o(hdCheck),
        e: common_vendor.p({
          block: true,
          margin: [0, 0],
          height: 100,
          round: -1,
          label: "确认",
          color: _ctx.checkColor
        }),
        f: common_vendor.o(($event) => showModel.value = $event),
        g: common_vendor.p({
          title: _ctx.title,
          ["landscape-size"]: {
            width: "300px",
            height: "200px"
          },
          ["portrait-size"]: {
            width: "400px",
            height: "300px"
          },
          show: showModel.value
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cf7ee239"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/recordsManage/components/askModel.vue"]]);
wx.createComponent(Component);
