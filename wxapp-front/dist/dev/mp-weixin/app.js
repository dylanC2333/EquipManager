"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const tmui_index = require("./tmui/index.js");
const utils_fontSizeHandler = require("./utils/fontSizeHandler.js");
if (!Math) {
  "./pages/login/index.js";
  "./pages/profile/index.js";
  "./pages/tableSelect/index.js";
  "./pages/recordsManage/index.js";
  "./pages/dbTest/index.js";
  "./pages/commonTest/index.js";
  "./pages/equipment/equipmentUtilise.js";
}
const _sfc_main = {
  onLaunch() {
    utils_fontSizeHandler.setStartWide(common_vendor.index.getSystemInfoSync().windowWidth > 768);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(tmui_index.tmui, { shareDisable: false });
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
