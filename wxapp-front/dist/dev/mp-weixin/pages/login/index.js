"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../../common/vendor.js");
const api_index_index = require("../../api/index/index.js");
const store_index = require("../../store/index.js");
const utils_message = require("../../utils/message.js");
const utils_fontSizeHandler = require("../../utils/fontSizeHandler.js");
if (!Array) {
  const _easycom_tm_image2 = common_vendor.resolveComponent("tm-image");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_image2 + _easycom_tm_input2 + _easycom_tm_button2 + _easycom_tm_app2)();
}
const _easycom_tm_image = () => "../../tmui/components/tm-image/tm-image.js";
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_image + _easycom_tm_input + _easycom_tm_button + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const status = common_vendor.reactive({
      username: "",
      password: ""
    });
    const mainStore = store_index.useMainStore();
    const hdLogin = () => __async(this, null, function* () {
      if (!status.username || !status.password) {
        utils_message.toast("请输入用户名和密码");
        return;
      }
      const res = yield api_index_index.loginToService(status);
      mainStore.setToken(res.token);
      mainStore.username = status.username;
      console.log(mainStore.username);
      console.log(res.token);
      common_vendor.index.navigateTo({
        // url: '/pages/tableSelect/index',
        url: "/pages/equipment/equipmentUtilise"
      });
    });
    const toTest = () => __async(this, null, function* () {
      if (mainStore.getToken().length !== 0) {
        common_vendor.index.navigateTo({
          // url: '/pages/tableSelect/index',
          url: "/pages/equipment/equipmentUtilise"
        });
        return;
      }
      const res = yield api_index_index.loginToService({
        username: "admin",
        password: "111111"
      });
      mainStore.setToken(res.token);
      mainStore.username = status.username;
      common_vendor.index.navigateTo({
        url: "/pages/tableSelect/index"
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          width: 400,
          height: 400,
          src: "/static/jiaokong_nowatermark2.png"
        }),
        b: common_vendor.o(($event) => status.username = $event),
        c: common_vendor.p({
          ["font-size"]: common_vendor.unref(utils_fontSizeHandler.fontSize),
          border: 3,
          margin: [100, 25],
          color: "#f5f5f5",
          ["focus-color"]: "#25b1bf",
          placeholder: "请输入账号",
          modelValue: status.username
        }),
        d: common_vendor.o(($event) => status.password = $event),
        e: common_vendor.p({
          ["font-size"]: common_vendor.unref(utils_fontSizeHandler.fontSize),
          border: 3,
          margin: [100, 25],
          color: "#f5f5f5",
          ["focus-color"]: "#25b1bf",
          placeholder: "请输入密码",
          password: true,
          modelValue: status.password
        }),
        f: common_vendor.o(hdLogin),
        g: common_vendor.p({
          ["linear-color"]: ["#de283b", "#ff6366"],
          color: "orange",
          ["font-color"]: "#ffccc4",
          ["font-size"]: 35,
          linear: "right",
          height: 80,
          block: true,
          label: "登录"
        }),
        h: common_vendor.o(toTest),
        i: common_vendor.p({
          label: "测试页面"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-45258083"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
