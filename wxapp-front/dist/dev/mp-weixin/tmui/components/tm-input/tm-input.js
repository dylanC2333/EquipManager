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
if (!Math) {
  (tmIcon + tmText + TmButton + tmSheet)();
}
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmText = () => "../tm-text/tm-text.js";
const TmButton = () => "../tm-button/tm-button.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-input",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    followTheme: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: "grey-4"
    },
    searchBgColor: {
      type: String,
      default: "primary"
    },
    searchFontColor: {
      type: String,
      default: ""
    },
    searchWidth: {
      type: Number,
      default: 0
    },
    prefixColor: {
      type: String,
      default: ""
    },
    suffixColor: {
      type: String,
      default: ""
    },
    //激活时的主题配色。
    focusColor: {
      type: String,
      default: "primary"
    },
    /** 清除按钮，显示密码按钮的颜色 */
    clearAndEyeColor: {
      type: String,
      default: ""
    },
    //默认使用自动配色
    fontColor: {
      type: String,
      default: ""
    },
    text: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: false
    },
    border: {
      type: Number,
      default: 0
    },
    transprent: {
      type: Boolean,
      default: false
    },
    round: {
      type: Number,
      default: 3
    },
    shadow: {
      type: Number,
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    padding: {
      type: Array,
      default: () => [0, 0]
    },
    height: {
      type: Number,
      default: 64
    },
    //前缀图标
    prefix: {
      type: String,
      default: ""
    },
    //前缀文字
    prefixLabel: {
      type: String,
      default: ""
    },
    //后缀图标
    suffix: {
      type: String,
      default: ""
    },
    //后缀文字
    suffixLabel: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 30
    },
    //tmicon-search
    search: {
      type: String,
      default: ""
    },
    //搜索
    searchLabel: {
      type: String,
      default: ""
    },
    showClear: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    //错误时，提示的文本。
    errorLabel: {
      type: String,
      default: "请输入内容"
    },
    //对齐方式。
    //left,right,center
    align: {
      type: String,
      default: "left"
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    inputPadding: {
      type: Array,
      default: () => [24, 0]
    },
    //是否显示字符统计。
    showCharNumber: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: -1
    },
    type: {
      type: String,
      default: "text"
    },
    cursorSpacing: {
      type: Number,
      default: 24
    },
    confirmType: {
      type: String,
      default: "done"
    },
    confirmHold: {
      type: Boolean,
      default: false
    },
    autoBlur: {
      type: Boolean,
      default: true
    },
    holdKeyboard: {
      type: Boolean,
      default: false
    },
    adjustPosition: {
      type: Boolean,
      default: true
    },
    //默认的聚集状态
    focus: {
      type: Boolean,
      default: false
    },
    cursor: {
      type: Number,
      default: 0
    },
    showConfirmBar: {
      type: Boolean,
      default: true
    },
    selectionStart: {
      type: Number,
      default: -1
    },
    selectionEnd: {
      type: Number,
      default: -1
    },
    disableDefaultPadding: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    placeholderStyle: {
      type: String,
      default: ""
    },
    autoHeight: {
      type: Boolean,
      default: false
    },
    readyOnly: {
      type: Boolean,
      default: false
    },
    /**横向布局的对齐类,主要是用来配置文本域时,左图标需要顶对齐或者左中对齐. */
    layoutAlign: {
      type: String,
      default: "flex-row-top-start"
    },
    customicon: {
      type: Boolean,
      default: false
    }
  }),
  emits: ["focus", "blur", "confirm", "input", "update:modelValue", "clear", "search", "keyboardheightchange", "click"],
  setup(__props, { emit: __emit }) {
    var _a, _b, _c;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const emits = __emit;
    const proxy = (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const props = __props;
    let parentFormItem = proxy == null ? void 0 : proxy.$parent;
    while (parentFormItem) {
      if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
        break;
      } else {
        parentFormItem = (_c = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c : void 0;
      }
    }
    const isAndroid = common_vendor.ref(false);
    isAndroid.value = common_vendor.index.getSystemInfoSync().osName == "android" ? true : false;
    const _height = common_vendor.computed(() => props.height);
    const _inputPadding = common_vendor.computed(() => {
      if (props.search !== "" || props.searchLabel !== "") {
        return [4, 0];
      }
      return props.inputPadding;
    });
    let timerId = NaN;
    function debounce(func, wait = 500, immediate = false) {
      if (!isNaN(timerId))
        clearTimeout(timerId);
      if (immediate) {
        var callNow = !timerId;
        timerId = setTimeout(() => {
          timerId = NaN;
        }, wait);
        if (callNow)
          typeof func === "function" && func();
      } else {
        timerId = setTimeout(() => {
          typeof func === "function" && func();
          timerId = NaN;
        }, wait);
      }
    }
    const propsDetail = common_vendor.computed(() => {
      return __spreadProps(__spreadValues({}, props), {
        fontSize_px: common_vendor.index.upx2px(props.fontSize)
      });
    });
    props.modelValue;
    const tmcfg = common_vendor.computed(() => store.tmStore);
    common_vendor.computed(() => tmui_tool_lib_minxs.computedStyle(props));
    common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const _requiredError = common_vendor.ref(false);
    const _foucsActive = common_vendor.ref(props.focus || false);
    common_vendor.watch(
      () => props.focus,
      () => {
        _foucsActive.value = props.focus;
      }
    );
    const _color = common_vendor.computed(() => {
      let color = props.color;
      if (_foucsActive.value) {
        if (props.followTheme && store.tmStore.color) {
          color = store.tmStore.color;
        } else {
          color = props.focusColor;
        }
      }
      if (_requiredError.value)
        color = "red";
      return color;
    });
    const tmcomputed = common_vendor.computed(() => {
      const _props = __spreadProps(__spreadValues({}, props), { color: _color.value });
      return tmui_tool_lib_minxs.computedTheme(_props, isDark.value, tmcfg.value);
    });
    const showPasswordText = common_vendor.ref(propsDetail.value.password);
    const showPasswordIcon = common_vendor.computed(() => props.password);
    common_vendor.ref(props.errorLabel);
    const _value = common_vendor.ref(props.modelValue);
    const _valueLenChar = common_vendor.computed(() => {
      let str = String(_value.value).split("");
      return str.length;
    });
    common_vendor.watch(
      () => props.modelValue,
      () => _value.value = props.modelValue
    );
    function searchClick() {
      emits("search", _value.value);
    }
    function clearBtn() {
      _value.value = "";
      emits("update:modelValue", "");
      emits("clear");
    }
    function changeSeePassword() {
      showPasswordText.value = !showPasswordText.value;
    }
    function focus(e) {
      _foucsActive.value = true;
      emits("focus", e);
    }
    function blur(e) {
      _foucsActive.value = false;
      emits("blur", e);
    }
    function confirm() {
      emits("confirm", _value.value);
    }
    function inputHandler(e) {
      emits("input", e.detail.value);
      emits("update:modelValue", e.detail.value);
      return e.detail.value;
    }
    function inputClick(e, type) {
      if (type == "ali") {
        debounce(
          () => {
            emits("click", e);
          },
          200,
          true
        );
        return;
      } else {
        debounce(() => emits("click", e), 200, true);
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: propsDetail.value.search || propsDetail.value.searchLabel
      }, propsDetail.value.search || propsDetail.value.searchLabel ? {} : {}, {
        b: propsDetail.value.prefix
      }, propsDetail.value.prefix ? {
        c: common_vendor.p({
          _style: "transition:color 0.24s",
          ["font-size"]: propsDetail.value.fontSize,
          color: props.prefixColor,
          name: propsDetail.value.prefix,
          customicon: props.customicon
        })
      } : {}, {
        d: propsDetail.value.prefixLabel
      }, propsDetail.value.prefixLabel ? {
        e: common_vendor.p({
          _style: "transition:color 0.24s",
          ["font-size"]: propsDetail.value.fontSize,
          color: props.prefixColor,
          label: propsDetail.value.prefixLabel
        })
      } : {}, {
        f: !isAndroid.value
      }, !isAndroid.value ? common_vendor.e({
        g: propsDetail.value.type != "textarea"
      }, propsDetail.value.type != "textarea" ? {
        h: _value.value,
        i: propsDetail.value.focus,
        j: common_vendor.o(focus),
        k: common_vendor.o(blur),
        l: common_vendor.o(confirm),
        m: common_vendor.o(inputHandler),
        n: common_vendor.o(($event) => emits("keyboardheightchange", $event)),
        o: showPasswordText.value,
        p: propsDetail.value.maxlength,
        q: propsDetail.value.disabled,
        r: propsDetail.value.cursorSpacing,
        s: propsDetail.value.confirmType,
        t: propsDetail.value.confirmHold,
        v: propsDetail.value.autoBlur,
        w: propsDetail.value.holdKeyboard,
        x: propsDetail.value.adjustPosition,
        y: propsDetail.value.readyOnly,
        z: propsDetail.value.type,
        A: propsDetail.value.placeholder,
        B: common_vendor.s({
          height: `${_height.value}rpx`,
          color: propsDetail.value.fontColor ? propsDetail.value.fontColor : tmcomputed.value.textColor,
          "text-align": props.align,
          fontSize: `${propsDetail.value.fontSize_px}px`,
          transition: "color 0.24s"
        }),
        C: `fontSize:${propsDetail.value.fontSize_px}px;${props.placeholderStyle}`,
        D: propsDetail.value.readyOnly
      } : {}, {
        E: propsDetail.value.type == "textarea"
      }, propsDetail.value.type == "textarea" ? {
        F: _value.value,
        G: propsDetail.value.focus,
        H: common_vendor.o(focus),
        I: common_vendor.o(blur),
        J: common_vendor.o(confirm),
        K: common_vendor.o(inputHandler),
        L: common_vendor.o(($event) => emits("keyboardheightchange", $event)),
        M: propsDetail.value.maxlength,
        N: propsDetail.value.disabled,
        O: propsDetail.value.placeholder,
        P: propsDetail.value.cursorSpacing,
        Q: propsDetail.value.confirmHold,
        R: propsDetail.value.autoBlur,
        S: propsDetail.value.holdKeyboard,
        T: propsDetail.value.cursor,
        U: propsDetail.value.showConfirmBar,
        V: propsDetail.value.selectionStart,
        W: propsDetail.value.selectionEnd,
        X: propsDetail.value.disableDefaultPadding,
        Y: propsDetail.value.fixed,
        Z: propsDetail.value.autoHeight,
        aa: propsDetail.value.readyOnly,
        ab: propsDetail.value.adjustPosition,
        ac: propsDetail.value.type,
        ad: common_vendor.s(propsDetail.value.autoHeight ? {} : {
          height: `${_height.value}rpx`
        }),
        ae: common_vendor.s({
          width: "auto",
          "word-break": "break-word",
          color: propsDetail.value.fontColor ? propsDetail.value.fontColor : tmcomputed.value.textColor,
          "text-align": props.align,
          fontSize: `${propsDetail.value.fontSize_px}px`,
          transition: "color 0.24s"
        }),
        af: `fontSize:${propsDetail.value.fontSize_px}px;${props.placeholderStyle}`,
        ag: propsDetail.value.readyOnly
      } : {}, {
        ah: common_vendor.o(($event) => inputClick($event, "ali")),
        ai: common_vendor.s({
          width: "0px"
        })
      }) : {}, {
        aj: isAndroid.value
      }, isAndroid.value ? common_vendor.e({
        ak: propsDetail.value.type != "textarea"
      }, propsDetail.value.type != "textarea" ? {
        al: common_vendor.o(($event) => emits("click", $event)),
        am: _value.value,
        an: propsDetail.value.focus,
        ao: common_vendor.o(focus),
        ap: common_vendor.o(blur),
        aq: common_vendor.o(confirm),
        ar: common_vendor.o(inputHandler),
        as: common_vendor.o(($event) => emits("keyboardheightchange", $event)),
        at: showPasswordText.value,
        av: propsDetail.value.disabled,
        aw: propsDetail.value.cursorSpacing,
        ax: propsDetail.value.confirmType,
        ay: propsDetail.value.confirmHold,
        az: propsDetail.value.autoBlur,
        aA: propsDetail.value.holdKeyboard,
        aB: propsDetail.value.adjustPosition,
        aC: propsDetail.value.maxlength,
        aD: propsDetail.value.type,
        aE: propsDetail.value.readyOnly,
        aF: propsDetail.value.placeholder,
        aG: common_vendor.s({
          height: `${_height.value}rpx`,
          color: propsDetail.value.fontColor ? propsDetail.value.fontColor : tmcomputed.value.textColor,
          "text-align": props.align,
          fontSize: `${propsDetail.value.fontSize_px}px`
        }),
        aH: `fontSize:${propsDetail.value.fontSize_px}px;${props.placeholderStyle}`
      } : {}, {
        aI: propsDetail.value.type == "textarea"
      }, propsDetail.value.type == "textarea" ? {
        aJ: common_vendor.o(($event) => emits("click", $event)),
        aK: _value.value,
        aL: propsDetail.value.focus,
        aM: common_vendor.o(focus),
        aN: common_vendor.o(blur),
        aO: common_vendor.o(confirm),
        aP: common_vendor.o(inputHandler),
        aQ: common_vendor.o(($event) => emits("keyboardheightchange", $event)),
        aR: propsDetail.value.disabled,
        aS: propsDetail.value.placeholder,
        aT: propsDetail.value.cursorSpacing,
        aU: propsDetail.value.confirmHold,
        aV: propsDetail.value.autoBlur,
        aW: propsDetail.value.holdKeyboard,
        aX: propsDetail.value.adjustPosition,
        aY: propsDetail.value.maxlength,
        aZ: propsDetail.value.autoHeight,
        ba: propsDetail.value.cursor,
        bb: propsDetail.value.showConfirmBar,
        bc: propsDetail.value.selectionStart,
        bd: propsDetail.value.selectionEnd,
        be: propsDetail.value.disableDefaultPadding,
        bf: propsDetail.value.readyOnly,
        bg: propsDetail.value.fixed,
        bh: propsDetail.value.type,
        bi: common_vendor.s(propsDetail.value.autoHeight ? {} : {
          height: `${_height.value}rpx`
        }),
        bj: common_vendor.s({
          width: "auto",
          "word-break": "break-word",
          color: propsDetail.value.fontColor ? propsDetail.value.fontColor : tmcomputed.value.textColor,
          "text-align": props.align,
          fontSize: `${propsDetail.value.fontSize_px}px`
        }),
        bk: `fontSize:${propsDetail.value.fontSize_px}px;${props.placeholderStyle}`
      } : {}, {
        bl: common_vendor.s({
          width: "0px"
        })
      }) : {}, {
        bm: propsDetail.value.showClear && _valueLenChar.value > 0
      }, propsDetail.value.showClear && _valueLenChar.value > 0 ? {
        bn: common_vendor.p({
          customicon: props.customicon,
          _style: "transition:color 0.24s",
          userInteractionEnabled: false,
          ["font-size"]: propsDetail.value.fontSize,
          color: props.clearAndEyeColor,
          name: "tmicon-times-circle-fill"
        }),
        bo: common_vendor.o(clearBtn)
      } : {}, {
        bp: _requiredError.value
      }, _requiredError.value ? {
        bq: common_vendor.p({
          _style: "transition:color 0.24s",
          ["font-size"]: propsDetail.value.fontSize,
          name: "tmicon-exclamation-circle"
        })
      } : {}, {
        br: propsDetail.value.suffix
      }, propsDetail.value.suffix ? {
        bs: common_vendor.p({
          customicon: props.customicon,
          _style: "transition:color 0.24s",
          ["font-size"]: propsDetail.value.fontSize,
          color: props.suffixColor,
          name: propsDetail.value.suffix
        })
      } : {}, {
        bt: propsDetail.value.suffixLabel
      }, propsDetail.value.suffixLabel ? {
        bv: common_vendor.p({
          _style: "transition:color 0.24s",
          ["font-size"]: propsDetail.value.fontSize,
          color: props.suffixColor,
          label: propsDetail.value.suffixLabel
        })
      } : {}, {
        bw: showPasswordIcon.value
      }, showPasswordIcon.value ? {
        bx: common_vendor.p({
          color: props.clearAndEyeColor,
          _style: "transition:color 0.24s",
          userInteractionEnabled: false,
          ["font-size"]: propsDetail.value.fontSize,
          name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
        }),
        by: common_vendor.o(changeSeePassword)
      } : {}, {
        bz: propsDetail.value.showCharNumber && _valueLenChar.value > 0 && propsDetail.value.type != "textarea"
      }, propsDetail.value.showCharNumber && _valueLenChar.value > 0 && propsDetail.value.type != "textarea" ? common_vendor.e({
        bA: common_vendor.p({
          _style: "transition:color 0.24s",
          label: _valueLenChar.value
        }),
        bB: propsDetail.value.maxlength > 0
      }, propsDetail.value.maxlength > 0 ? {
        bC: common_vendor.p({
          _style: "transition:color 0.24s",
          label: "/" + propsDetail.value.maxlength
        })
      } : {}) : {}, {
        bD: propsDetail.value.showCharNumber && _valueLenChar.value > 0 && propsDetail.value.type == "textarea"
      }, propsDetail.value.showCharNumber && _valueLenChar.value > 0 && propsDetail.value.type == "textarea" ? common_vendor.e({
        bE: common_vendor.p({
          _style: "transition:color 0.24s",
          label: _valueLenChar.value
        }),
        bF: propsDetail.value.maxlength > 0
      }, propsDetail.value.maxlength > 0 ? {
        bG: common_vendor.p({
          _style: "transition:color 0.24s",
          label: "/" + propsDetail.value.maxlength
        })
      } : {}, {
        bH: common_vendor.n(`b-${12}`)
      }) : {}, {
        bI: propsDetail.value.search || propsDetail.value.searchLabel
      }, propsDetail.value.search || propsDetail.value.searchLabel ? {
        bJ: common_vendor.o(searchClick),
        bK: common_vendor.p({
          round: props.round,
          width: props.searchWidth,
          followTheme: props.followTheme,
          color: props.searchBgColor,
          ["font-size"]: 24,
          height: _height.value - 11,
          padding: [16, 0],
          block: !props.searchWidth,
          margin: [0, 0],
          fontColor: props.searchFontColor,
          icon: propsDetail.value.search,
          label: propsDetail.value.searchLabel
        })
      } : {}, {
        bL: common_vendor.o(($event) => inputClick($event, "")),
        bM: common_vendor.n(propsDetail.value.type == "textarea" ? propsDetail.value.layoutAlign : "flex-row-center-start"),
        bN: common_vendor.s(propsDetail.value.autoHeight && propsDetail.value.type == "textarea" ? {} : {
          height: `${_height.value}rpx`
        }),
        bO: common_vendor.p({
          transprent: props.transprent,
          round: props.round,
          ["no-level"]: true,
          margin: [0, 0],
          padding: _inputPadding.value,
          border: props.border,
          text: props.text,
          color: _color.value,
          outlined: props.outlined,
          shadow: props.shadow,
          linear: props.linear,
          linearDeep: props.linearDeep,
          _style: "transition:border 0.24s"
        }),
        bP: common_vendor.p({
          eventPenetrationEnabled: true,
          transprent: true,
          margin: props.margin,
          padding: props.padding
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e6448e88"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/tmui/components/tm-input/tm-input.vue"]]);
wx.createComponent(Component);
