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
const tmui_tool_useFun_useWindowInfo = require("../../tool/useFun/useWindowInfo.js");
if (!Math) {
  (tmCalendarView + tmDrawer)();
}
const tmCalendarView = () => "../tm-calendar-view/tm-calendar-view.js";
const tmDrawer = () => "../tm-drawer/tm-drawer.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-calendar",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    show: {
      type: Boolean,
      default: false
    },
    /**
     * 数组
     */
    defaultValue: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    //单向绑定输入展示日期，此字段用来在页面上展示。只向外输出。
    //功能目的：用来在页面上显示，特别是在input上绑定显示非常方便。
    //标准数据保存时，请使用modelValue保存，而不是此值。
    modelStr: {
      type: String,
      default: ""
    },
    /**
     * 日期模式
     * day : 单个日期选择模式（可多选，需要设置multiple=true;
     * week :按周选择模式。
     * month :按月选择模式。
     * year :按年选择模式。
     * rang :按日期范围选择模式。
     */
    model: {
      type: String,
      default: "day"
    },
    color: {
      type: String,
      default: "primary"
    },
    linear: {
      type: String,
      default: ""
    },
    linearDeep: {
      type: String,
      default: "light"
    },
    //指的是：有效的可选时间，小于此时间，不允许选中。
    start: {
      type: [String, Number, Date],
      default: ""
    },
    //指的是：有效的可选时间，大于此时间，不允许选中。
    end: {
      type: [String, Number, Date],
      default: ""
    },
    /** 日历组件属性 */
    //被禁用的日期数组。如果["2022-1-1","2022-5-1"]
    //被禁用的日期将无法选中。
    disabledDate: {
      type: Array,
      default: () => []
    },
    //是否允许多选。
    multiple: {
      type: Boolean,
      default: false
    },
    //设定单个日期的样式。
    dateStyle: {
      type: Array,
      default: () => []
    },
    //当multiple=true时，可以选择的最大日期数量。
    max: {
      type: Number,
      default: 999
    },
    /** 日历组件属性结束 */
    round: {
      type: Number,
      default: 12
    },
    hideButton: {
      type: Boolean,
      default: false
    },
    //隐藏头部操作栏
    hideTool: {
      type: Boolean,
      default: false
    },
    /**modelStr的格式化输出选项，不会影响value值，只对输出值有效 */
    format: {
      type: String,
      default: "YYYY/MM/DD"
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    //周次，本日、本季、本年、本月、本周的文字请按顺序提供文本，方便定义其它语言。
    textUnit: {
      type: Array,
      default: ["周次", "一", "二", "三", "四", "五", "六", "日", "本日", "本周", "本月", "本季度", "本年", "月", "第${x}季度", "年"]
    }
  }),
  emits: ["update:modelValue", "update:modelStr", "update:show", "confirm", "click", "change", "cancel", "close", "open"],
  setup(__props, { emit: __emit }) {
    const drawer = common_vendor.ref(null);
    const calendarView = common_vendor.ref(null);
    const emits = __emit;
    const props = __props;
    const sysinfo = tmui_tool_useFun_useWindowInfo.useWindowInfo();
    const _show = common_vendor.ref(props.show);
    const isConfirm = common_vendor.ref(false);
    const _value = common_vendor.ref(props.defaultValue);
    const _strvalue = common_vendor.ref(props.modelStr);
    const _modelType = common_vendor.computed(() => props.model);
    const _textUnit = common_vendor.computed(() => props.textUnit);
    const _confirmText = common_vendor.computed(() => props.confirmText);
    function close() {
      if (!isConfirm.value) {
        emits("cancel");
      }
      emits("close");
      emits("update:show", false);
      isConfirm.value = false;
      _show.value = false;
    }
    function open() {
      emits("open");
      emits("update:show", true);
      _show.value = true;
    }
    common_vendor.watchEffect(() => {
      emits("update:modelStr", _strvalue.value);
      emits("update:modelValue", _value.value);
    });
    common_vendor.watch(
      () => props.show,
      () => {
        var _a, _b;
        if (_show.value == props.show)
          return;
        if (drawer.value) {
          if (props.show) {
            (_a = drawer.value) == null ? void 0 : _a.open();
          } else {
            (_b = drawer.value) == null ? void 0 : _b.close();
          }
        }
      }
    );
    common_vendor.onMounted(() => {
      var _a;
      if (props.show && drawer.value) {
        (_a = drawer.value) == null ? void 0 : _a.open();
      }
    });
    common_vendor.watch(
      () => props.modelValue,
      () => {
        _value.value = props.modelValue;
      },
      { deep: true }
    );
    function change(e) {
      emits("change", e);
    }
    function onclick(e) {
      emits("click", e);
    }
    function confirm(e) {
      var _a;
      emits("confirm", e);
      (_a = drawer.value) == null ? void 0 : _a.close();
    }
    const dHeight = common_vendor.computed(() => {
      if (_modelType.value == "day")
        return 880 + sysinfo.bottomSafe;
      if (_modelType.value == "rang")
        return 880 + sysinfo.bottomSafe;
      if (_modelType.value == "week")
        return 740 + sysinfo.bottomSafe;
      if (_modelType.value == "month")
        return 720 + sysinfo.bottomSafe;
      if (_modelType.value == "quarter")
        return 480 + sysinfo.bottomSafe;
      if (_modelType.value == "year")
        return 620 + sysinfo.bottomSafe;
      return 600 + sysinfo.bottomSafe;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(calendarView, "776d1dbc-1,776d1dbc-0", {
          "k": "calendarView"
        }),
        b: common_vendor.o(($event) => _value.value = $event),
        c: common_vendor.o(($event) => _strvalue.value = $event),
        d: common_vendor.o(change),
        e: common_vendor.o(confirm),
        f: common_vendor.o(onclick),
        g: common_vendor.p({
          format: props.format,
          hideButton: props.hideButton,
          hideTool: props.hideTool,
          ["model-value"]: _value.value,
          ["model-str"]: _strvalue.value,
          ["default-value"]: _value.value,
          model: props.model,
          color: props.color,
          linear: props.linear,
          linearDeep: props.linearDeep,
          start: props.start,
          end: props.end,
          disabledDate: props.disabledDate,
          multiple: props.multiple,
          dateStyle: props.dateStyle,
          max: props.max,
          textUnit: _textUnit.value,
          confirmText: _confirmText.value
        }),
        h: common_vendor.sr(drawer, "776d1dbc-0", {
          "k": "drawer"
        }),
        i: common_vendor.o(close),
        j: common_vendor.o(open),
        k: common_vendor.p({
          disabbleScroll: true,
          round: props.round,
          height: dHeight.value,
          hideHeader: true
        }),
        l: common_vendor.o(($event) => _show.value = !_show.value)
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/tmui/components/tm-calendar/tm-calendar.vue"]]);
wx.createComponent(Component);
