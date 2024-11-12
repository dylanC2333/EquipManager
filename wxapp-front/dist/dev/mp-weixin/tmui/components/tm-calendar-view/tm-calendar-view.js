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
const tmui_tool_dayjs_esm_index = require("../../tool/dayjs/esm/index.js");
if (!Math) {
  (rangeDay + monthDay + yearDu + monthYear + monthQuarter + weekDay + tmSheet)();
}
const weekDay = () => "./week-day.js";
const monthYear = () => "./month-year.js";
const yearDu = () => "./year-du.js";
const monthDay = () => "./month-day.js";
const rangeDay = () => "./range-day.js";
const monthQuarter = () => "./month-quarter.js";
const tmSheet = () => "../tm-sheet/tm-sheet.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-calendar-view",
  props: __spreadProps(__spreadValues({}, tmui_tool_lib_minxs.custom_props), {
    followTheme: {
      type: Boolean,
      default: true
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
     * quarter :按季度选择模式。
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
    //隐藏底部确认按钮
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
  emits: ["update:modelValue", "update:modelStr", "confirm", "click", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    var _a, _b;
    (_b = (_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) != null ? _b : null;
    const rDay = common_vendor.ref(null);
    const Day = common_vendor.ref(null);
    const Year = common_vendor.ref(null);
    const Month = common_vendor.ref(null);
    const Week = common_vendor.ref(null);
    const emits = __emit;
    const props = __props;
    const _value = common_vendor.ref(props.defaultValue);
    const _modelType = common_vendor.computed(() => props.model);
    const _confirmText = common_vendor.computed(() => props.confirmText);
    const _textUnit = common_vendor.computed(() => props.textUnit);
    common_vendor.watch(
      () => props.modelValue,
      () => _value.value = props.modelValue,
      { deep: true }
    );
    common_vendor.watch(
      _value,
      () => {
        let fmar = _value.value.map((el) => tmui_tool_dayjs_esm_index.dayjs(el).format(props.format));
        let fm = fmar.join("~");
        emits("update:modelStr", fm);
      },
      { deep: true }
    );
    function change(e) {
      emits("change", e);
    }
    function click(e) {
      emits("click", e);
    }
    function confirm(e) {
      emits("confirm", e);
      emits("update:modelValue", e);
    }
    function getRefs() {
      if (_modelType.value == "day")
        return Day.value;
      if (_modelType.value == "rang")
        return rDay.value;
      if (_modelType.value == "week")
        return Week.value;
      if (_modelType.value == "month")
        return Month.value;
      if (_modelType.value == "year")
        return Year.value;
      return Day.value;
    }
    __expose({
      setDefault: (e) => {
        common_vendor.nextTick$1(() => getRefs().setDefault(e));
      },
      nextYear: () => {
        common_vendor.nextTick$1(() => getRefs().nextYear());
      },
      // mont,year模式下，没有此方法
      nextMonth: () => {
        common_vendor.nextTick$1(() => getRefs().nextMonth());
      },
      prevYear: () => {
        common_vendor.nextTick$1(() => getRefs().prevYear());
      },
      // mont,year模式下，没有此方法
      prevMonth: () => {
        common_vendor.nextTick$1(() => getRefs().prevMonth());
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _modelType.value == "rang"
      }, _modelType.value == "rang" ? {
        b: common_vendor.sr(rDay, "f7e3d308-1,f7e3d308-0", {
          "k": "rDay"
        }),
        c: common_vendor.o(confirm),
        d: common_vendor.o(click),
        e: common_vendor.o(change),
        f: common_vendor.o(($event) => _value.value = $event),
        g: common_vendor.p({
          confirmText: _confirmText.value,
          textUnit: _textUnit.value,
          hideButton: props.hideButton,
          hideTool: props.hideTool,
          followTheme: props.followTheme,
          ["model-value"]: _value.value,
          ["default-value"]: _value.value,
          dateStyle: props.dateStyle,
          disabledDate: props.disabledDate,
          start: props.start,
          end: props.end,
          color: props.color,
          linear: props.linear,
          linearDeep: props.linearDeep
        })
      } : {}, {
        h: _modelType.value == "day"
      }, _modelType.value == "day" ? {
        i: common_vendor.sr(Day, "f7e3d308-2,f7e3d308-0", {
          "k": "Day"
        }),
        j: common_vendor.o(confirm),
        k: common_vendor.o(click),
        l: common_vendor.o(change),
        m: common_vendor.o(($event) => _value.value = $event),
        n: common_vendor.p({
          confirmText: _confirmText.value,
          textUnit: _textUnit.value,
          hideButton: props.hideButton,
          hideTool: props.hideTool,
          followTheme: props.followTheme,
          ["model-value"]: _value.value,
          ["default-value"]: _value.value,
          dateStyle: props.dateStyle,
          disabledDate: props.disabledDate,
          max: props.max,
          multiple: props.multiple,
          start: props.start,
          end: props.end,
          color: props.color,
          linear: props.linear,
          linearDeep: props.linearDeep
        })
      } : {}, {
        o: _modelType.value == "year"
      }, _modelType.value == "year" ? {
        p: common_vendor.sr(Year, "f7e3d308-3,f7e3d308-0", {
          "k": "Year"
        }),
        q: common_vendor.o(confirm),
        r: common_vendor.o(click),
        s: common_vendor.o(change),
        t: common_vendor.o(($event) => _value.value = $event),
        v: common_vendor.p({
          confirmText: _confirmText.value,
          textUnit: _textUnit.value,
          hideButton: props.hideButton,
          hideTool: props.hideTool,
          followTheme: props.followTheme,
          ["model-value"]: _value.value,
          ["default-value"]: _value.value,
          start: props.start,
          end: props.end,
          color: props.color,
          linear: props.linear,
          linearDeep: props.linearDeep
        })
      } : {}, {
        w: _modelType.value == "month"
      }, _modelType.value == "month" ? {
        x: common_vendor.sr(Month, "f7e3d308-4,f7e3d308-0", {
          "k": "Month"
        }),
        y: common_vendor.o(confirm),
        z: common_vendor.o(click),
        A: common_vendor.o(change),
        B: common_vendor.o(($event) => _value.value = $event),
        C: common_vendor.p({
          confirmText: _confirmText.value,
          textUnit: _textUnit.value,
          hideButton: props.hideButton,
          hideTool: props.hideTool,
          followTheme: props.followTheme,
          ["model-value"]: _value.value,
          ["default-value"]: _value.value,
          start: props.start,
          end: props.end,
          color: props.color,
          linear: props.linear,
          linearDeep: props.linearDeep
        })
      } : {}, {
        D: _modelType.value == "quarter"
      }, _modelType.value == "quarter" ? {
        E: common_vendor.sr(Month, "f7e3d308-5,f7e3d308-0", {
          "k": "Month"
        }),
        F: common_vendor.o(confirm),
        G: common_vendor.o(click),
        H: common_vendor.o(change),
        I: common_vendor.o(($event) => _value.value = $event),
        J: common_vendor.p({
          confirmText: _confirmText.value,
          textUnit: _textUnit.value,
          hideButton: props.hideButton,
          hideTool: props.hideTool,
          followTheme: props.followTheme,
          ["model-value"]: _value.value,
          ["default-value"]: _value.value,
          start: props.start,
          end: props.end,
          color: props.color,
          linear: props.linear,
          linearDeep: props.linearDeep
        })
      } : {}, {
        K: _modelType.value == "week"
      }, _modelType.value == "week" ? {
        L: common_vendor.sr(Week, "f7e3d308-6,f7e3d308-0", {
          "k": "Week"
        }),
        M: common_vendor.o(confirm),
        N: common_vendor.o(click),
        O: common_vendor.o(change),
        P: common_vendor.o(($event) => _value.value = $event),
        Q: common_vendor.p({
          confirmText: _confirmText.value,
          textUnit: _textUnit.value,
          hideButton: props.hideButton,
          hideTool: props.hideTool,
          followTheme: props.followTheme,
          ["model-value"]: _value.value,
          ["default-value"]: _value.value,
          start: props.start,
          end: props.end,
          color: props.color,
          linear: props.linear,
          linearDeep: props.linearDeep
        })
      } : {}, {
        R: common_vendor.p({
          margin: [0, 0],
          padding: [0, 0]
        })
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/tmui/components/tm-calendar-view/tm-calendar-view.vue"]]);
wx.createComponent(Component);
