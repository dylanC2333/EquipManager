"use strict";
var __defProp = Object.defineProperty;
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
const common_vendor = require("../../../common/vendor.js");
const tmui_components_tmTable_newInterface = require("./newInterface.js");
const tmui_components_tmTable_cutomProps = require("./cutomProps.js");
if (!Math) {
  (tmText + tmIcon + tmCol + tmRow + tmDivider + tmButton)();
}
const tmText = () => "../tm-text/tm-text.js";
const tmIcon = () => "../tm-icon/tm-icon.js";
const tmButton = () => "../tm-button/tm-button.js";
const tmRow = () => "../tm-row/tm-row.js";
const tmCol = () => "../tm-col/tm-col.js";
const tmDivider = () => "../tm-divider/tm-divider.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-table",
  props: tmui_components_tmTable_cutomProps.cutomProps,
  emits: ["rowClick"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const _data = common_vendor.ref(props.tableData);
    const sortType = common_vendor.ref("none");
    let tid = NaN;
    const _stripe = common_vendor.computed(() => props.stripe);
    const totalTableWidth = common_vendor.computed(() => {
      let d = props.cellWidth * _data.value.header.length;
      if (d <= props.width)
        d = props.width;
      return d;
    });
    const _rows = common_vendor.ref([]);
    let _rows_back = [];
    const _maxrows = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      _rows.value = chuliRows(_data.value.data);
      _rows_back = common_vendor.index.$tm.u.deepClone(_rows.value);
    });
    common_vendor.watch(
      [() => props.tableData],
      () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          let cdatas = common_vendor.index.$tm.u.deepClone(props.tableData);
          _data.value = __spreadValues({}, cdatas);
          _rows.value = chuliRows(_data.value.data);
          _rows_back = common_vendor.index.$tm.u.deepClone(_rows.value);
        }, 150);
      },
      { deep: true }
    );
    function chuliRows(bigdata) {
      let d = [];
      let dlen = [];
      if (!bigdata) {
        bigdata = [];
      }
      _data.value.data = bigdata.map((el) => {
        var _a;
        let ptps = (_a = el["opts"]) != null ? _a : {};
        _data.value.header.forEach((ielem) => {
          var _a2;
          if (ptps[ielem.field]) {
            ptps[ielem.field] = __spreadValues({}, (_a2 = ptps[ielem.field]) != null ? _a2 : {});
          } else {
            ptps[ielem.field] = {};
          }
        });
        el.opts = ptps;
        return el;
      });
      _data.value.header.forEach((el) => {
        let pd = [];
        pd = _data.value.data.map((ele) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i;
          let isasync = (_b = (_a = el == null ? void 0 : el.opts) == null ? void 0 : _a.asyncStyleCell) != null ? _b : false;
          return {
            value: (_c = ele[el.field]) != null ? _c : "-",
            opts: __spreadValues(__spreadValues(__spreadValues({}, tmui_components_tmTable_newInterface.defaultCellStyle), {
              color: isasync === true ? (_e = (_d = el.opts) == null ? void 0 : _d.color) != null ? _e : "white" : "white",
              fontColor: isasync === true ? (_g = (_f = el.opts) == null ? void 0 : _f.fontColor) != null ? _g : "black" : "",
              light: isasync === true ? (_i = (_h = el.opts) == null ? void 0 : _h.light) != null ? _i : false : false
            }), ele["opts"][el.field])
          };
        });
        d.push(pd);
        dlen.push(pd.length);
      });
      _maxrows.value = Math.max(...dlen.length ? dlen : [0, 0]);
      return d;
    }
    function getOptsCellStyle(index1, index2) {
      var _a, _b;
      let d = (_b = ((_a = _rows.value[index1]) != null ? _a : [])[index2].opts) != null ? _b : __spreadValues({}, tmui_components_tmTable_newInterface.defaultCellStyle);
      return d;
    }
    function cellClick(index1, index2) {
      var _a, _b;
      let dp = (_b = ((_a = _rows.value[index1]) != null ? _a : [])[index2].value) != null ? _b : "";
      emits("rowClick", index2, index1, dp);
    }
    function sort(data, index, type = "none", callback) {
      common_vendor.index.showLoading({
        title: "...",
        mask: true
      });
      let d = data[index];
      if (type == "none") {
        data = common_vendor.index.$tm.u.deepClone(_rows_back);
      }
      if (type == "desc") {
        let dbiaoji = new Array();
        for (let i = 0; i < d.length; i++) {
          dbiaoji.push(i);
        }
        d = d.map((el, iof) => {
          el["__ids"] = iof;
          return el;
        });
        d.sort((a, b) => Number(a.value) - Number(b.value));
        let pd = [];
        data.forEach((element, index2) => {
          let p = [];
          if (index2 !== index) {
            d.forEach((el, index3) => {
              let nm = el["__ids"];
              p.push(element[nm]);
            });
          } else {
            p = d;
          }
          pd.push(p);
        });
        data = pd;
      }
      if (type == "asce") {
        let pd = [];
        data.forEach((element, index2) => {
          let p = [];
          p = [...element.reverse()];
          pd.push(p);
        });
        data = pd;
      }
      common_vendor.nextTick$1(() => {
        if (callback) {
          callback(data);
        }
        common_vendor.index.hideLoading();
      });
    }
    function headerClick(item, index) {
      var _a, _b;
      if ((_b = (_a = item.opts) == null ? void 0 : _a.sort) != null ? _b : false) {
        let d = common_vendor.index.$tm.u.deepClone(_rows.value);
        if (sortType.value == "none") {
          sortType.value = "desc";
        } else if (sortType.value == "desc") {
          sortType.value = "asce";
        } else if (sortType.value == "asce") {
          sortType.value = "none";
        }
        sort(d, index, sortType.value, (ds) => {
          _rows.value = [...ds];
        });
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.showHeader
      }, props.showHeader ? {
        b: common_vendor.f(_data.value.header, (item, index, i0) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
          return common_vendor.e({
            a: "3d418c75-2-" + i0 + "," + ("3d418c75-1-" + i0),
            b: common_vendor.p({
              _class: "text-overflow-2 text-align-center",
              ["line-height"]: 0,
              ["font-size"]: (_b = (_a = item.opts) == null ? void 0 : _a.fontSize) != null ? _b : 0,
              color: (_d = (_c = item.opts) == null ? void 0 : _c.fontColor) != null ? _d : "",
              label: item.name
            }),
            c: (((_f = (_e = item.opts) == null ? void 0 : _e.sort) != null ? _f : false) ? totalTableWidth.value / _data.value.header.length - 60 : totalTableWidth.value / _data.value.header.length - 60) + "rpx",
            d: (_h = (_g = item.opts) == null ? void 0 : _g.sort) != null ? _h : false
          }, ((_j = (_i = item.opts) == null ? void 0 : _i.sort) != null ? _j : false) ? {
            e: "3d418c75-3-" + i0 + "," + ("3d418c75-1-" + i0),
            f: common_vendor.p({
              name: "tmicon-sort",
              ["font-size"]: 26
            })
          } : {}, {
            g: index,
            h: common_vendor.o(($event) => headerClick(item, index), index),
            i: "3d418c75-1-" + i0 + ",3d418c75-0",
            j: common_vendor.p({
              _class: "flex flex-row flex-row-center-center",
              text: (_l = (_k = item.opts) == null ? void 0 : _k.light) != null ? _l : false,
              height: props.headerHeight,
              color: (_n = (_m = item.opts) == null ? void 0 : _m.color) != null ? _n : "primary",
              transprent: false
            })
          });
        }),
        c: common_vendor.p({
          transprent: true,
          width: totalTableWidth.value,
          column: _data.value.header.length
        })
      } : {}, {
        d: common_vendor.f(_maxrows.value, (item, index, i0) => {
          return common_vendor.e(props.showBottomBorder && !_stripe.value ? {
            a: "3d418c75-4-" + i0,
            b: common_vendor.p({
              color: "grey-5",
              margin: [0, 0]
            })
          } : {}, {
            c: common_vendor.f(_data.value.header.length, (item2, index2, i1) => {
              var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
              return common_vendor.e({
                a: ((_c = (_b = ((_a = _rows.value[index2]) != null ? _a : [])[index].opts) == null ? void 0 : _b.type) != null ? _c : "text") == "button"
              }, ((_f = (_e = ((_d = _rows.value[index2]) != null ? _d : [])[index].opts) == null ? void 0 : _e.type) != null ? _f : "text") == "button" ? {
                b: "3d418c75-7-" + i0 + "-" + i1 + "," + ("3d418c75-6-" + i0 + "-" + i1),
                c: common_vendor.p({
                  ["font-size"]: (_h = (_g = getOptsCellStyle(index2, index)) == null ? void 0 : _g.fontSize) != null ? _h : 26,
                  color: (_j = (_i = getOptsCellStyle(index2, index)) == null ? void 0 : _i.fontColor) != null ? _j : "primary",
                  label: (_l = ((_k = _rows.value[index2]) != null ? _k : [])[index].value) != null ? _l : "-",
                  margin: [10, 10],
                  height: props.cellHeight - 20,
                  size: "mini",
                  block: true
                })
              } : {
                d: "3d418c75-8-" + i0 + "-" + i1 + "," + ("3d418c75-6-" + i0 + "-" + i1),
                e: common_vendor.p({
                  ["font-size"]: getOptsCellStyle(index2, index).fontSize,
                  ["line-height"]: 0,
                  color: getOptsCellStyle(index2, index).fontColor,
                  label: (_n = ((_m = _rows.value[index2]) != null ? _m : [])[index].value) != null ? _n : "-"
                })
              }, {
                f: item2,
                g: common_vendor.o(($event) => cellClick(index2, index), item2),
                h: "3d418c75-6-" + i0 + "-" + i1 + "," + ("3d418c75-5-" + i0),
                i: common_vendor.p({
                  text: (_p = (_o = getOptsCellStyle(index2, index)) == null ? void 0 : _o.light) != null ? _p : false,
                  height: props.cellHeight,
                  color: (_r = (_q = getOptsCellStyle(index2, index)) == null ? void 0 : _q.color) != null ? _r : "",
                  transprent: _stripe.value,
                  _class: "flex flex-row flex-row-center-center"
                })
              });
            }),
            d: "3d418c75-5-" + i0,
            e: common_vendor.p({
              color: _stripe.value ? index % 2 ? "grey-5" : "white" : "white",
              width: totalTableWidth.value,
              column: _data.value.header.length,
              transprent: false
            }),
            f: item
          });
        }),
        e: props.showBottomBorder && !_stripe.value,
        f: totalTableWidth.value + "rpx",
        g: common_vendor.s({
          width: props.width + "rpx"
        }),
        h: common_vendor.s(props.height ? {
          height: props.height + "rpx"
        } : "")
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3d418c75"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/tmui/components/tm-table/tm-table.vue"]]);
wx.createComponent(Component);
