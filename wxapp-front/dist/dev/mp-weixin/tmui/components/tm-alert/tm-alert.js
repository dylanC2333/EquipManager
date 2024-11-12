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
if (!Math) {
  (tmIcon + tmText + tmTranslate + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmTranslate = () => "../tm-translate/tm-translate.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-alert",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    transprent: {
      type: [Boolean],
      default: false
    },
    border: {
      type: [Number],
      default: 0
    },
    round: {
      type: [Number],
      default: 2
    },
    margin: {
      type: Array,
      default: () => [32, 12]
    },
    padding: {
      type: Array,
      default: () => [24, 24]
    },
    content: {
      type: [Array, Object],
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    //关闭窗体的动画
    hidnAniName: {
      type: String,
      default: "zoom"
    },
    //轮播间隙
    duration: {
      type: Number,
      default: 3e3
    },
    closable: {
      type: [Boolean, String],
      default: true
    },
    //高度必填。
    height: {
      type: [Number],
      default: 160
    },
    //内容最大显示几行，变成省略号
    maxLine: {
      type: [Number],
      default: 1
    },
    showDot: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const bodyani = common_vendor.ref(null);
    const emits = __emit;
    const props = __props;
    const activeIndex = common_vendor.ref(0);
    const showBody = common_vendor.ref(true);
    let timeid = common_vendor.index.$tm.u.getUid(5);
    const reani = common_vendor.computed(() => props.hidnAniName == "zoom" || props.hidnAniName == "fade" ? true : false);
    const list = common_vendor.computed(() => {
      var _a, _b, _c, _d, _e, _f;
      if (!Array.isArray(props.content)) {
        return [
          {
            content: (_b = (_a = props.content) == null ? void 0 : _a.content) != null ? _b : "",
            title: (_d = (_c = props.content) == null ? void 0 : _c.title) != null ? _d : "",
            icon: (_f = (_e = props.content) == null ? void 0 : _e.icon) != null ? _f : ""
          }
        ];
      }
      let c = props.content.map((el) => {
        var _a2, _b2, _c2;
        el["content"] = (_a2 = el == null ? void 0 : el.content) != null ? _a2 : "";
        el["title"] = (_b2 = el == null ? void 0 : el.title) != null ? _b2 : "";
        el["icon"] = (_c2 = el == null ? void 0 : el.icon) != null ? _c2 : "";
        return el;
      });
      return c;
    });
    const len = common_vendor.computed(() => list.value.length);
    common_vendor.onUnmounted(() => clearTimeout(timeid));
    common_vendor.onMounted(() => {
      if (props.autoPlay) {
        play();
      }
    });
    function hide() {
      clearTimeout(timeid);
      showBody.value = false;
    }
    function play() {
      if (len.value < 1)
        return;
      clearTimeout(timeid);
      timeid = setTimeout(function() {
        next();
      }, props.duration);
    }
    function next() {
      clearTimeout(timeid);
      let index = activeIndex.value + 1;
      if (index == len.value) {
        index = 0;
      }
      activeIndex.value = index;
      play();
    }
    function close() {
      var _a;
      (_a = bodyani.value) == null ? void 0 : _a.play();
      clearTimeout(timeid);
      timeid = setTimeout(function() {
        showBody.value = false;
      }, 301);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showBody.value
      }, showBody.value ? common_vendor.e({
        b: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: activeIndex.value == index
          }, activeIndex.value == index ? common_vendor.e({
            b: item["icon"]
          }, item["icon"] ? {
            c: "36620f08-3-" + i0 + "," + ("36620f08-2-" + i0),
            d: common_vendor.p({
              fontSize: 32,
              lineHeight: 0,
              name: item["icon"]
            })
          } : {}, {
            e: item["title"]
          }, item["title"] ? {
            f: common_vendor.o(($event) => emits("click", item, index), index),
            g: "36620f08-4-" + i0 + "," + ("36620f08-2-" + i0),
            h: common_vendor.p({
              _class: "text-size-m  text-overflow-1 text-weight-b",
              fontSize: 30,
              lineHeight: 0,
              label: item["title"]
            })
          } : {}, {
            i: item["content"]
          }, item["content"] ? common_vendor.e({
            j: common_vendor.o(($event) => emits("click", item, index), index),
            k: "36620f08-5-" + i0 + "," + ("36620f08-2-" + i0),
            l: common_vendor.p({
              fontSize: 26,
              _class: "text-overflow-" + props.maxLine,
              lineHeight: 0,
              label: item["content"]
            }),
            m: len.value > 1 && props.showDot
          }, len.value > 1 && props.showDot ? {
            n: "36620f08-6-" + i0 + "," + ("36620f08-2-" + i0),
            o: common_vendor.p({
              _class: "pt-24",
              label: `${activeIndex.value + 1}/${len.value}`
            })
          } : {}) : {}, {
            p: "36620f08-2-" + i0 + ",36620f08-1",
            q: common_vendor.p({
              name: "zoom",
              _class: "flex-12 flex flex-row flex-row-top-start"
            })
          }) : {}, {
            r: index,
            s: common_vendor.n(activeIndex.value == index ? "flex-12 " : " flex-0 ")
          });
        }),
        c: common_vendor.n(__props.closable ? "pr-24 " : ""),
        d: __props.closable
      }, __props.closable ? {
        e: common_vendor.o(close),
        f: common_vendor.p({
          fontSize: 32,
          lineHeight: 0,
          name: "tmicon-times-circle-fill"
        })
      } : {}, {
        g: common_vendor.p({
          height: props.height - props.padding[1] * 2,
          color: props.color,
          _class: _ctx._class,
          _style: _ctx._style,
          followTheme: props.followTheme,
          dark: props.dark,
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
          margin: props.margin,
          padding: props.padding
        }),
        h: common_vendor.sr(bodyani, "36620f08-0", {
          "k": "bodyani"
        }),
        i: common_vendor.o(hide),
        j: common_vendor.p({
          reverse: reani.value,
          name: __props.hidnAniName,
          autoPlay: false
        })
      }) : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/tmui/components/tm-alert/tm-alert.vue"]]);
wx.createComponent(Component);
