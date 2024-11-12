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
const store_index = require("../../store/index.js");
const utils_sheets = require("../../utils/sheets.js");
const api_receive_index = require("../../api/receive/index.js");
if (!Array) {
  const _easycom_tm_button2 = common_vendor.resolveComponent("tm-button");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_button2 + _easycom_tm_app2)();
}
const _easycom_tm_button = () => "../../tmui/components/tm-button/tm-button.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (CellPicker + _easycom_tm_button + _easycom_tm_app)();
}
const CellPicker = () => "./components/cellPicker.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const mainStore = store_index.useMainStore();
    const proname = common_vendor.ref("");
    const htd = common_vendor.ref("");
    const fbgc = common_vendor.ref("");
    const projNames = mainStore.getAllProjName();
    const projPicker = projNames.reduce((p, c, i) => {
      p.push({
        text: c,
        id: i
      });
      return p;
    }, []);
    const contractsPicker = common_vendor.computed(() => {
      const contract = mainStore.getContractsNameByProjName(proname.value);
      return contract.reduce((p, c, i) => {
        p.push({
          text: c,
          id: i
        });
        return p;
      }, []);
    });
    const typePicker = common_vendor.computed(() => {
      const tp = mainStore.getTypeByProjNameAndContractName(
        proname.value,
        htd.value
      );
      return tp.reduce((p, c, i) => {
        p.push({
          text: c,
          id: i
        });
        return p;
      }, []);
    });
    const sheetsBtns = common_vendor.computed(() => {
      return utils_sheets.getSheetsByFBGC(fbgc.value);
    });
    common_vendor.watch(contractsPicker, () => {
      htd.value = "";
      fbgc.value = "";
    });
    common_vendor.watch(typePicker, () => {
      fbgc.value = "";
    });
    const hdClick = (title) => __async(this, null, function* () {
      mainStore.projInfo.proname = proname.value;
      mainStore.projInfo.htd = htd.value;
      mainStore.projInfo.fbgc = fbgc.value;
      mainStore.projInfo.type = title;
      mainStore.projInfo.detail = utils_sheets.getCurRecordPath();
      const ql = yield api_receive_index.getQlByStore();
      mainStore.assignQl(ql);
      common_vendor.index.navigateTo({
        url: "/pages/recordsManage/index"
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => proname.value = $event),
        b: common_vendor.p({
          dataset: common_vendor.unref(projPicker),
          title: "项目名称",
          modelValue: proname.value
        }),
        c: common_vendor.o(($event) => htd.value = $event),
        d: common_vendor.p({
          dataset: contractsPicker.value,
          title: "合同段",
          modelValue: htd.value
        }),
        e: common_vendor.o(($event) => fbgc.value = $event),
        f: common_vendor.p({
          dataset: typePicker.value,
          title: "工程类型",
          modelValue: fbgc.value
        }),
        g: common_vendor.f(sheetsBtns.value, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => hdClick(item.title), index),
            b: "30245f27-4-" + i0 + ",30245f27-0",
            c: common_vendor.p({
              label: item.title,
              color: "#25b1bf",
              ["font-color"]: "#fff",
              ["font-size"]: 35,
              height: 100,
              block: true
            }),
            d: index
          };
        }),
        h: common_vendor.p({
          color: "#ffffff"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-30245f27"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/tableSelect/index.vue"]]);
wx.createPage(MiniProgramPage);
