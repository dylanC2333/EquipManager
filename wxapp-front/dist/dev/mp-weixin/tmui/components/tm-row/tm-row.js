"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-row",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    height: {
      type: [Number, String],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    width: {
      type: [Number, String],
      default: 0
    },
    round: {
      type: [Number, String],
      default: 0
    },
    //总列数。
    column: {
      type: Number,
      default: 12
    },
    //横向排列
    justify: {
      type: String,
      default: "start"
      //'start' | 'center' | 'end' | 'around' | 'between'
    },
    //纵向排列
    align: {
      type: String,
      default: "center"
      //'start' | 'center' | 'end' | 'stretch'
    },
    color: {
      type: String,
      default: "white"
    }
  }),
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    var _a, _b;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const props = __props;
    const emits = __emit;
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const tmcfg = common_vendor.computed(() => store.tmStore);
    const customCSSStyle = common_vendor.computed(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const tmcomputed = common_vendor.computed(() => tmui_tool_lib_minxs.computedTheme(props, isDark.value, tmcfg.value));
    const colWidth = common_vendor.inject(
      "TmColWidth",
      common_vendor.computed(() => 0)
    );
    const width_px_rect = common_vendor.ref(common_vendor.index.upx2px(Number(props.width)));
    const width_px_rect_rp = common_vendor.computed(() => width_px_rect.value);
    const justifyAlign = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      around: "space-around",
      between: "space-between"
    };
    const justify_rp = common_vendor.computed(() => justifyAlign[props.justify] || "start");
    const AlignAlign = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      stretch: "stretch"
    };
    const align_rp = common_vendor.computed(() => AlignAlign[props.align] || "start");
    const _round = common_vendor.computed(() => {
      if (typeof props.round == "number")
        return "round-" + props.round;
      if (props.round.length == 1)
        return "round-" + props.round;
      if (props.round.length == 2)
        return `round-tl-${props.round[0]} round-tr-${props.round[1]}`;
      if (props.round.length == 3)
        return `round-tl-${props.round[0]} round-tr-${props.round[1]} round-br-${props.round[2]} `;
      if (props.round.length == 4)
        return `round-tl-${props.round[0]} round-tr-${props.round[1]} round-br-${props.round[2]}  round-bl-${props.round[2]}`;
      return [0, 0, 0, 0];
    });
    function wxmpGetRect() {
      if (width_px_rect.value > 0)
        return;
      common_vendor.index.createSelectorQuery().in(proxy).select(".tm-row").boundingClientRect().exec(function(res) {
        var _a2, _b2;
        if ((_a2 = res[0]) == null ? void 0 : _a2.width) {
          width_px_rect.value = (_b2 = res[0]) == null ? void 0 : _b2.width;
        } else {
          wxmpGetRect();
        }
      });
    }
    common_vendor.onMounted(() => {
      wxmpGetRect();
    });
    common_vendor.onUpdated(() => {
      wxmpGetRect();
    });
    common_vendor.provide("TmRowWidth", width_px_rect_rp);
    common_vendor.provide(
      "TmRowColumn",
      common_vendor.computed(() => props.column)
    );
    common_vendor.watchEffect(() => {
      if (colWidth.value > 0) {
        width_px_rect.value = colWidth.value;
      }
    });
    let textColor = common_vendor.computed(() => tmcomputed.value.textColor);
    common_vendor.provide("appTextColor", textColor);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => emits("click", $event)),
        b: common_vendor.n(_round.value),
        c: common_vendor.n(customClass.value),
        d: common_vendor.n(`mx-${props.margin[0]} my-${__props.margin[1]}`),
        e: common_vendor.s({
          flexDirection: "row",
          flexWrap: "wrap"
        }),
        f: common_vendor.s(props.height ? {
          height: props.height + "rpx"
        } : ""),
        g: common_vendor.s(width_px_rect_rp.value ? {
          width: width_px_rect.value + "px"
        } : ""),
        h: common_vendor.s({
          justifyContent: justify_rp.value,
          alignItems: align_rp.value
        }),
        i: common_vendor.s(!props.transprent ? tmcomputed.value.backgroundColorCss : ""),
        j: common_vendor.s(!props.transprent ? tmcomputed.value.shadowColor : ""),
        k: common_vendor.s(customCSSStyle.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/tmui/components/tm-row/tm-row.vue"]]);
wx.createComponent(Component);
