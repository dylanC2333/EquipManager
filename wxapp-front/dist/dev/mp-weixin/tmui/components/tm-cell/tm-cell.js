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
const tmui_tool_lib_interface = require("../../tool/lib/interface.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
if (!Math) {
  (tmImage + tmText + tmIcon + tmSheet + tmDivider)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmImage = () => "../tm-image/tm-image.js";
const tmDivider = () => "../tm-divider/tm-divider.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-cell",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    shadow: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number, Array],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [32, 0]
    },
    padding: {
      type: Array,
      default: () => [24, 24]
    },
    height: {
      type: [Number],
      default: 0
    },
    width: {
      type: [Number],
      default: 0
    },
    transprent: {
      type: [Boolean],
      default: false
    },
    color: {
      type: String,
      default: "white"
    },
    //标题
    title: {
      type: String,
      default: ""
    },
    titleFontSize: {
      type: [Number],
      default: 28
    },
    titleColor: {
      type: String,
      default: ""
    },
    //标题下方的介绍
    label: {
      type: String,
      default: ""
    },
    labelFontSize: {
      type: [Number],
      default: 22
    },
    labelColor: {
      type: String,
      default: "grey"
    },
    //右边文字
    rightText: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: "tmicon-angle-right"
    },
    //右边文字
    rightColor: {
      type: String,
      default: "grey"
    },
    //右边文字大小。
    rightTextSize: {
      type: Number,
      default: 24
    },
    showAvatar: {
      type: Boolean,
      default: false
    },
    //头像。
    //https://picsum.photos/200
    avatar: {
      type: String,
      default: ""
    },
    avatarSize: {
      type: Number,
      default: 60
    },
    avatarRound: {
      type: Number,
      default: 10
    },
    border: {
      type: [Number],
      default: 0
    },
    borderDirection: {
      type: [String],
      default: tmui_tool_lib_interface.cssDirection.bottom
    },
    //显示下边线
    bottomBorder: {
      type: [Boolean],
      default: false
    },
    //当有链接地址时，将打开链接
    url: {
      type: String,
      default: ""
    },
    //暗下强制的背景色，
    //有时自动的背景，可能不是你想要暗黑背景，此时可以使用此参数，强制使用背景色，
    //只能是颜色值。
    darkBgColor: {
      type: String,
      default: ""
    }
  }),
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    function cellClick(e) {
      emits("click", e);
      if (props.url !== "") {
        try {
          common_vendor.index.navigateTo({
            url: props.url,
            fail(error) {
              console.error("打开连接错误：", error);
            }
          });
        } catch (e2) {
        }
      }
    }
    const _computedValue = common_vendor.computed(() => props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _computedValue.value.showAvatar
      }, _computedValue.value.showAvatar ? {
        b: common_vendor.p({
          round: _computedValue.value.avatarRound,
          width: _computedValue.value.avatarSize,
          height: _computedValue.value.avatarSize,
          src: _computedValue.value.avatar
        }),
        c: `${_computedValue.value.avatarSize}rpx`,
        d: `${_computedValue.value.avatarSize}rpx`
      } : {}, {
        e: common_vendor.p({
          color: _computedValue.value.titleColor,
          fontSize: _computedValue.value.titleFontSize,
          label: _computedValue.value.title
        }),
        f: _computedValue.value.label
      }, _computedValue.value.label ? {
        g: common_vendor.p({
          color: _computedValue.value.labelColor,
          fontSize: _computedValue.value.labelFontSize,
          label: _computedValue.value.label
        })
      } : {}, {
        h: common_vendor.n(_computedValue.value.showAvatar ? "pl-24" : ""),
        i: _computedValue.value.rightText
      }, _computedValue.value.rightText ? {
        j: common_vendor.p({
          _class: "nowrap pr-12",
          color: _computedValue.value.rightColor,
          fontSize: _computedValue.value.rightTextSize,
          label: _computedValue.value.rightText
        })
      } : {}, {
        k: _computedValue.value.rightIcon
      }, _computedValue.value.rightIcon ? {
        l: common_vendor.p({
          _class: "opacity-3",
          name: _computedValue.value.rightIcon,
          fontSize: 22
        })
      } : {}, {
        m: common_vendor.n(_computedValue.value.url ? "url" : ""),
        n: common_vendor.o(cellClick),
        o: common_vendor.p({
          darkBgColor: props.darkBgColor,
          color: props.color,
          followTheme: props.followTheme,
          dark: props.dark,
          followDark: props.followDark,
          round: props.round,
          shadow: props.shadow,
          outlined: props.outlined,
          border: props.border,
          borderStyle: props.borderStyle,
          borderDirection: props.borderDirection,
          text: props.text,
          transprent: props.transprent,
          linear: props.linear,
          linearDeep: props.linearDeep,
          width: props.width,
          height: props.height,
          margin: props.margin,
          padding: props.padding,
          _class: props._class,
          _style: props._style,
          ["hover-class"]: "opacity-6"
        }),
        p: _computedValue.value.bottomBorder
      }, _computedValue.value.bottomBorder ? {
        q: `${_computedValue.value.avatar !== "" ? _computedValue.value.avatarSize + _computedValue.value.margin[0] : 0}rpx`,
        r: common_vendor.p({
          margin: [0, 0],
          border: 2,
          color: "grey-5",
          ["real-color"]: !common_vendor.unref(store).tmStore.dark
        })
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c423bcaa"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/tmui/components/tm-cell/tm-cell.vue"]]);
wx.createComponent(Component);
