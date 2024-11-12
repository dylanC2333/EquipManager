"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
if (!Array) {
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_text2 + _easycom_tm_app2)();
}
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_text + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const mainStore = store_index.useMainStore();
    const txt = common_vendor.computed(() => {
      if (mainStore.username) {
        return "当前用户：" + mainStore.username;
      }
      return "未登录";
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          label: txt.value
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/profile/index.vue"]]);
wx.createPage(MiniProgramPage);
