"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_useVModel = require("../../../utils/useVModel.js");
const store_index = require("../../../store/index.js");
const utils_common = require("../../../utils/common.js");
const utils_columnsHandler = require("../../../utils/columnsHandler.js");
const utils_rules = require("../../../utils/rules.js");
const utils_fontSizeHandler = require("../../../utils/fontSizeHandler.js");
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
  (_easycom_tm_text + _easycom_tm_input + PopupPicker + _easycom_tm_app)();
}
const PopupPicker = () => "./popupPicker.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "dataForm",
  props: {
    columns: {},
    modelValue: {},
    enterTab: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const validate = () => {
      let res = true;
      for (let i = 0; i < props.columns.length; i++) {
        const item = props.columns[i];
        if (!item.rules)
          continue;
        for (const rule in item.rules) {
          if (!utils_rules.rulesValid[rule](
            item.rules[rule],
            model.value[item.prop]
          )) {
            hintsMsg.value[i] = utils_rules.rulesMsg[rule]();
            res = false;
            break;
          } else {
            hintsMsg.value[i] = "";
          }
        }
      }
      return res;
    };
    __expose({
      validate
    });
    const mainStore = store_index.useMainStore();
    const model = utils_useVModel.useVModel(props, "modelValue", emit);
    const currPosition = common_vendor.ref(-1);
    const currPayload = common_vendor.ref([""]);
    const currTitle = common_vendor.ref("");
    const pickerInstance = utils_common.useCompRef();
    const hintsMsg = common_vendor.ref([]);
    let tmpPosition = -1;
    const getPropByIndex = (index) => {
      return props.columns[index].prop;
    };
    const getPickerValueByIndex = (index) => {
      return props.columns[index].pickerValue;
    };
    const getTitleByIndex = (index) => {
      return props.columns[index].name;
    };
    const toNext = (i) => {
      const next = (i != null ? i : currPosition.value) + 1;
      if (next >= props.columns.length) {
        currPosition.value = -1;
        return;
      }
      if (needPicker(next)) {
        setTimeout(() => {
          tmpPosition = next;
          isQm(next) ? throwPicker(next, mainStore.getAllQl()) : throwPicker(next);
        }, 400);
      } else {
        setTimeout(() => {
          currPosition.value = next;
        }, 100);
      }
    };
    const throwPicker = (index, payload) => {
      var _a;
      currPayload.value = payload != null ? payload : getPickerValueByIndex(index);
      currTitle.value = getTitleByIndex(index);
      (_a = pickerInstance.value) == null ? void 0 : _a.show();
    };
    const needPicker = (index) => {
      return isQm(index) || getPickerValueByIndex(index) !== void 0 && getPickerValueByIndex(index).length > 0 && (model.value[getPropByIndex(index)] === void 0 || model.value[getPropByIndex(index)] === "");
    };
    const isQm = (index) => {
      return getPropByIndex(index) === "qm" || getPropByIndex(index) === "qlmc";
    };
    const needDisable = (prop) => {
      return utils_columnsHandler.dateTag.includes(prop);
    };
    const hdConfirm = (value) => {
      model.value[getPropByIndex(tmpPosition)] = value;
      if (props.enterTab) {
        toNext(tmpPosition);
      }
    };
    const hdClick = (index) => {
      if (needPicker(index)) {
        tmpPosition = index;
        isQm(index) ? throwPicker(index, mainStore.getAllQl()) : throwPicker(index);
      } else {
        setTimeout(() => {
          currPosition.value = index;
        }, 100);
      }
    };
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.f(_ctx.columns, (item, index, i0) => {
          var _a2;
          return common_vendor.e({
            a: "85de2756-1-" + i0 + ",85de2756-0",
            b: common_vendor.p({
              ["font-size"]: 35,
              label: item.name
            }),
            c: "85de2756-2-" + i0 + ",85de2756-0",
            d: common_vendor.p({
              color: "red",
              label: hintsMsg.value[index] || ""
            })
          }, ((_a2 = _ctx.enterTab) != null ? _a2 : false) ? {
            e: common_vendor.o(($event) => toNext(index), index),
            f: common_vendor.o(($event) => currPosition.value = -1, index),
            g: "85de2756-3-" + i0 + ",85de2756-0",
            h: common_vendor.o(($event) => common_vendor.unref(model)[item.prop] = $event, index),
            i: common_vendor.p({
              ["font-size"]: common_vendor.unref(utils_fontSizeHandler.fontSize),
              focus: !needDisable(item.prop) && currPosition.value === index,
              type: item.numberOnly ? "number" : "text",
              disabled: needDisable(item.prop),
              modelValue: common_vendor.unref(model)[item.prop]
            })
          } : {
            j: common_vendor.o(($event) => currPosition.value = -1, index),
            k: "85de2756-4-" + i0 + ",85de2756-0",
            l: common_vendor.o(($event) => common_vendor.unref(model)[item.prop] = $event, index),
            m: common_vendor.p({
              ["font-size"]: common_vendor.unref(utils_fontSizeHandler.fontSize),
              focus: !needDisable(item.prop) && currPosition.value === index,
              type: item.numberOnly ? "number" : "text",
              disabled: needDisable(item.prop),
              modelValue: common_vendor.unref(model)[item.prop]
            })
          }, {
            n: common_vendor.o(($event) => hdClick(index), index),
            o: index
          });
        }),
        b: (_a = _ctx.enterTab) != null ? _a : false,
        c: common_vendor.sr(pickerInstance, "85de2756-5,85de2756-0", {
          "k": "pickerInstance"
        }),
        d: common_vendor.o(hdConfirm),
        e: common_vendor.p({
          payload: currPayload.value,
          title: currTitle.value
        }),
        f: common_vendor.p({
          color: "white"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-85de2756"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/pages/recordsManage/components/dataForm.vue"]]);
wx.createComponent(Component);
