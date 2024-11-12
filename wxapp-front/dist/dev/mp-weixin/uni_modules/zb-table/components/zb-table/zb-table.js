"use strict";
const common_vendor = require("../../../../common/vendor.js");
const TableCheckbox = () => "./components/table-checkbox.js";
const TableSummary = () => "./components/table-summary.js";
const TableSideSummary = () => "./components/table-side-summary.js";
const TableH5Summary = () => "./components/table-h5-summary.js";
const ZbLoadMore = () => "./components/zb-load-more.js";
const _sfc_main = {
  components: {
    TableCheckbox,
    TableSummary,
    TableSideSummary,
    TableH5Summary,
    ZbLoadMore
  },
  props: {
    highlight: {
      type: Boolean,
      default: false
    },
    itemDate: {
      type: Object,
      default: () => {
      }
    },
    columns: {
      type: Array,
      default: () => []
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    isShowLoadMore: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    sumText: {
      type: String,
      default: "合计"
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    stripe: {
      type: Boolean,
      default: true
    },
    fit: {
      type: Boolean,
      default: false
    },
    rowKey: [String, Function],
    summaryMethod: Function,
    pullUpLoading: Function,
    formatter: Function,
    cellStyle: Function,
    cellHeaderStyle: Function,
    permissionBtn: Function
  },
  computed: {
    loadMoreHeight() {
      return this.isLoadMore ? 40 : 0;
    },
    fixedLeftColumns() {
      let arr = [];
      for (let i = 0; i < this.columns.length; i++) {
        let item = this.columns[i];
        if (item.fixed) {
          arr.push(item);
        } else {
          break;
        }
      }
      return arr;
    },
    imgs() {
      return (item) => {
        return typeof item === "string" ? [item] : item;
      };
    },
    itemfilters() {
      return (item, ite) => {
        if (item[ite.name] == null) {
          return ite.emptyString;
        }
        return item[ite.name];
      };
    },
    scrollbarSize() {
      return 0;
    },
    isFixedLeft() {
      if (!this.columns.length) {
        return false;
      }
      if (!this.data.length) {
        return false;
      }
      let [firstArr] = this.columns;
      return !!firstArr.fixed;
    },
    transColumns() {
      if (this.fit) {
        this.columns.forEach((column) => {
          if (column.type === "operation" && column.renders) {
            let str = "";
            column.renders.map((item) => {
              str += item.name;
            });
            column.width = this.getTextWidth(str) + column.renders.length * 40;
          } else if (column.type === "img")
            ;
          else if (column.type === "selection")
            ;
          else {
            let arr = [this.getTextWidth(column.label)];
            this.data.forEach((data) => {
              let str = data[column.name] + "";
              if (str === "undefined") {
                arr.push(30);
              } else {
                let width = this.getTextWidth(str);
                arr.push(width);
              }
            });
            column.width = Math.max(...arr) + 20;
          }
        });
      }
      let number = 0;
      this.columns.forEach((item, index) => {
        if (item.type === "operation" && item.renders && !item.width) {
          let str = "";
          item.renders.map((item2) => {
            str += item2.name;
          });
          item.width = this.getTextWidth(str) + item.renders.length * 40;
        }
        if (item.type === "img") {
          if (!item.width) {
            let arr = [];
            let widImg = this.getTextWidth(item.label);
            this.data.forEach((data) => {
              if (data[item.name]) {
                let urls = typeof data[item.name] === "string" ? [data[item.name]] : data[item.name];
                arr.push(urls.length);
              }
              item.width = Math.max(...arr) * 40 + widImg;
            });
          }
        }
        if (item.fixed) {
          if (index === 0) {
            item.left = 0;
            number += item.width;
          } else {
            item.left = number;
            number += item.width;
          }
        }
        item.emptyString = item.emptyString || "--";
      });
      return this.columns;
    },
    transData() {
      let flag = this.columns.some((item) => item.type === "selection");
      this.data.forEach((item, index) => {
        if (flag) {
          if (item.checked) {
            if (!this.selectArr.length) {
              this.selectArr.push(item);
            }
          }
        }
        if (this.rowKey) {
          if (typeof this.rowKey === "function") {
            item.key = Object.freeze(this.rowKey(item)) || Date.now();
          } else {
            item.key = Object.freeze(item[this.rowKey]) || Date.now();
          }
        } else {
          item.key = index;
        }
      });
      if (flag) {
        if (this.data.length) {
          let le = this.data.filter((item) => item.checked).length;
          if (le) {
            if (le === this.data.length) {
              this.checkedAll = true;
            } else {
              this.indeterminate = true;
            }
          } else {
            this.checkedAll = false;
            this.indeterminate = false;
            this.selectArr = [];
          }
        } else {
          this.checkedAll = false;
          this.indeterminate = false;
          this.selectArr = [];
        }
      }
      return this.data;
    },
    isHighlight() {
      return (item, index) => {
        if (this.rowKey) {
          return item.key === this.currentRow["key"];
        } else {
          return index === this.currentRowIndex;
        }
      };
    },
    getHeaderCellStyle() {
      return (column, columnIndex, childIndex) => {
        const cellStyle = this.cellHeaderStyle;
        if (typeof cellStyle === "function") {
          return cellStyle({ column, columnIndex });
        }
        return {};
      };
    },
    getCellStyle() {
      return (row, column, rowIndex, columnIndex) => {
        const cellStyle = this.cellStyle;
        if (typeof cellStyle === "function") {
          return cellStyle({ row, column, rowIndex, columnIndex });
        }
        return {};
      };
    }
  },
  data() {
    return {
      button: [],
      alipayScrollTop: 0,
      alipayScrollOldTop: 0,
      alipayFlag: false,
      bodyTableLeft: 0,
      headerTableLeft: 0,
      lastScrollLeft: 0,
      isLoadMore: false,
      headerFooterTableLeft: 0,
      leftFiexScrollTop: 0,
      bodyScrollTop: 0,
      currentDriver: null,
      currentDriver1: null,
      bodyTime: null,
      currentRowIndex: null,
      currentRow: {},
      bodyTime1: null,
      headerTime: null,
      debounceTime: null,
      operation: {},
      completedFlag: false,
      selectArr: [],
      indeterminate: false,
      checkedAll: false,
      completeLoading: false,
      aliTime: null
    };
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
    this.aliTime && clearTimeout(this.aliTime);
    this.debounceTime && clearTimeout(this.debounceTime);
    this.bodyTime1 && clearTimeout(this.bodyTime1);
    this.bodyTime && clearTimeout(this.bodyTime);
    this.selectArr = [];
    this.indeterminate = false;
    this.checkedAll = false;
  },
  methods: {
    clearSelection() {
      this.transData.forEach((item) => {
        item.checked = false;
      });
      this.selectArr = [];
      this.indeterminate = false;
      this.checkedAll = false;
    },
    formatterAction(row, column, rowIndex, columnIndex) {
      if (column.formatter && typeof this.formatter === "function") {
        return this.formatter(row, column, rowIndex, columnIndex);
      }
      return row[column.name] == null || row[column.name] === "" ? column.emptyString : row[column.name];
    },
    permission(item, renders, index) {
      if (this.permissionBtn && typeof this.permissionBtn === "function") {
        return this.permissionBtn(item, renders, index);
      }
      return renders;
    },
    pullUpCompleteLoading(type) {
      this.isLoadMore = false;
      if (type === "ok") {
        this.completeLoading = true;
      }
    },
    scrollAlipay(e) {
      if (!this.alipayScrollOldTop) {
        this.alipayScrollOldTop = e.detail.scrollTop;
      }
      this.aliTime && clearTimeout(this.aliTime);
      this.aliTime = setTimeout(() => {
        if (this.alipayFlag && e.detail.scrollTop > this.alipayScrollOldTop) {
          this.pullLoad();
        }
        this.alipayFlag = false;
        this.alipayScrollOldTop = null;
      }, 500);
    },
    pullLoad() {
      if (this.isShowLoadMore) {
        this.isLoadMore = true;
        this.$emit("pullUpLoading");
        let that = this;
        this.pullUpLoading && this.pullUpLoading.call(this.$parent.$parent, (type) => {
          that.isLoadMore = false;
          if (type === "ok") {
            that.completeLoading = true;
          }
        });
      }
    },
    scrolltolower(e) {
      this.alipayFlag = true;
      if (e.detail.direction === "bottom") {
        this.pullLoad();
      }
    },
    previewImage(item, url, current) {
      let urls = typeof url === "string" ? [url] : url;
      common_vendor.index.previewImage({
        current,
        urls
      });
    },
    resetHighlight() {
      this.currentRowIndex = null;
      this.currentRow = {};
    },
    cellClick(row, index, column) {
      this.$emit("cellClick", row, index, column);
    },
    rowClick(row, index) {
      if (this.highlight) {
        this.currentRowIndex = index;
        this.currentRow = row;
        this.$emit("currentChange", row, index);
      }
      this.$emit("rowClick", row, index);
    },
    checkboxSelectedAll(e) {
      this.indeterminate = false;
      if (e.checked) {
        this.selectArr = [];
        this.checkedAll = true;
        this.data.forEach((item) => {
          item.checked = true;
          this.selectArr.push(item);
        });
      } else {
        this.checkedAll = false;
        this.data.forEach((item) => {
          this.$set(item, "checked", false);
        });
        this.selectArr = [];
      }
      this.$forceUpdate();
      this.$emit("toggleAllSelection", e.checked, this.selectArr);
    },
    checkboxSelected(e, item) {
      this.data.forEach((item2) => {
        if (item2.key === e.data.key) {
          item2.checked = e.checked;
        }
      });
      item.checked = e.checked;
      e.data.checked = e.checked;
      if (e.checked) {
        this.selectArr.push(e.data);
      } else {
        this.selectArr = this.selectArr.filter((item2) => item2.key !== e.data.key);
      }
      if (this.selectArr.length === this.transData.length) {
        this.indeterminate = false;
        this.checkedAll = true;
      } else {
        this.indeterminate = true;
        this.checkedAll = false;
      }
      if (!this.selectArr.length) {
        this.checkedAll = false;
        this.indeterminate = false;
      }
      this.$forceUpdate();
      this.$emit("toggleRowSelection", e.checked, this.selectArr);
    },
    itemFilter(item, ite) {
      if (ite.filters && ite.name) {
        let key = item[ite.name];
        return ite.filters[key] || "";
      }
      return item[ite.name] || ite.emptyString;
    },
    // 默认字体为微软雅黑 Microsoft YaHei,字体大小为 14px
    getTextWidth(str) {
      if (str.length < 3) {
        return 40;
      }
      let regx = /^[0-9]+.?[0-9]*$/;
      let flexWidth = 0;
      for (const char of str) {
        if (char >= "A" && char <= "Z" || char >= "a" && char <= "z") {
          flexWidth += 10;
        } else if (char >= "一" && char <= "龥") {
          flexWidth += 15;
        } else if (regx.test(char)) {
          flexWidth += 9;
        } else {
          flexWidth += 7;
        }
      }
      return flexWidth;
    },
    width(item) {
      return `${item.width ? item.width : "100"}px`;
    },
    showStripe(index) {
      if (this.currentDriver)
        return;
      if (this.stripe) {
        return index % 2 != 0 ? "odd" : "even";
      } else {
        return "";
      }
    },
    //验证字符串是否是数字
    checkNumber(theObj) {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(theObj)) {
        return true;
      }
      return false;
    },
    isDate(data) {
      if (isNaN(data) && !isNaN(Date.parse(data))) {
        return true;
      }
      return false;
    },
    sortAction(item, index) {
      if (!item.sorter) {
        return false;
      }
      this.$set(item, "sorterMode", item.sorterMode === "_asc" ? "_desc" : "_asc");
      if (item.sorter === "custom") {
        this.$emit("sort-change", item, item.sorterMode.replace("_", ""), index);
      } else {
        this.sortData(item);
      }
      this.$forceUpdate();
    },
    sortData(item) {
      let key = item.name;
      if (item.sorterMode === "_asc") {
        this.data.sort((a, b) => {
          if (this.checkNumber(a[key])) {
            return a[key] - b[key];
          }
          if (this.isDate(a[key])) {
            let a1 = new Date(a[key]).getTime();
            let b1 = new Date(b[key]).getTime();
            return a1 - b1;
          }
        });
      } else {
        this.data.sort((a, b) => {
          if (this.checkNumber(a[key])) {
            return b[key] - a[key];
          }
          if (this.isDate(a[key])) {
            let a1 = new Date(a[key]).getTime();
            let b1 = new Date(b[key]).getTime();
            return b1 - a1;
          }
        });
      }
    },
    throttle(method, delay = 60) {
      let time = null;
      return (...args) => {
        if (!time) {
          time = setTimeout(() => {
            method(...args);
            time = null;
          }, delay);
        }
      };
    },
    debounce(method, delay = 1e3) {
      return (...args) => {
        this.debounceTime && clearTimeout(this.debounceTime);
        this.debounceTime = setTimeout(() => {
          method(...args);
        }, delay);
      };
    },
    handleBodyScroll(e) {
      if (this.currentDriver && this.currentDriver !== e.currentTarget.id)
        return;
      this.currentDriver = e.currentTarget.id;
      this.headerTableLeft = e.detail.scrollLeft;
      this.headerFooterTableLeft = e.detail.scrollLeft;
      this.leftFiexScrollTop = e.detail.scrollTop;
      this.bodyTime && clearTimeout(this.bodyTime);
      this.bodyTime = setTimeout(() => {
        this.currentDriver = null;
      }, 200);
    },
    leftFixedScrollAction(e) {
      if (this.currentDriver && this.currentDriver !== e.currentTarget.id)
        return;
      this.currentDriver = e.currentTarget.id;
      this.bodyScrollTop = e.detail.scrollTop;
      this.bodyTime && clearTimeout(this.bodyTime);
      this.bodyTime = setTimeout(() => {
        this.currentDriver = null;
      }, 200);
    },
    scrollToLeft(e) {
      if (this.currentDriver1 && this.currentDriver1 !== e.currentTarget.id)
        return;
      this.currentDriver1 = e.currentTarget.id;
      if (e.detail.direction === "left" && this.headerTableLeft < 10) {
        this.headerTableLeft = 0;
      } else if (e.detail.direction === "top" && this.leftFiexScrollTop < 10) {
        this.leftFiexScrollTop = 0;
      }
      this.bodyTime && clearTimeout(this.bodyTime);
      this.bodyTime = setTimeout(() => {
        this.currentDriver1 = null;
      }, 200);
    },
    scrollToFixedLeft(e) {
      if (this.currentDriver1 && this.currentDriver1 !== e.currentTarget.id)
        return;
      this.currentDriver1 = e.currentTarget.id;
      if (e.detail.direction === "top" && this.bodyScrollTop < 10) {
        this.bodyScrollTop = 0;
      }
      this.bodyTime && clearTimeout(this.bodyTime);
      this.bodyTime = setTimeout(() => {
        this.currentDriver1 = null;
      }, 200);
    },
    handleTableScrollLeft(e, type) {
      if (this.currentDriver && this.currentDriver !== e.currentTarget.id)
        return;
      this.currentDriver = e.currentTarget.id;
      this.bodyTableLeft = e.detail.scrollLeft;
      this.headerFooterTableLeft = e.detail.scrollLeft;
      this.bodyTime && clearTimeout(this.bodyTime);
      this.bodyTime = setTimeout(() => {
        this.currentDriver = null;
      }, 200);
    },
    handleFooterTableScrollLeft(e) {
      if (this.currentDriver && this.currentDriver !== e.currentTarget.id)
        return;
      this.currentDriver = e.currentTarget.id;
      this.bodyTableLeft = e.detail.scrollLeft;
      this.headerTableLeft = e.detail.scrollLeft;
      this.bodyTime && clearTimeout(this.bodyTime);
      this.bodyTime = setTimeout(() => {
        this.currentDriver = null;
      }, 200);
    }
  }
};
if (!Array) {
  const _component_tableCheckbox = common_vendor.resolveComponent("tableCheckbox");
  const _component_table_summary = common_vendor.resolveComponent("table-summary");
  const _component_zb_load_more = common_vendor.resolveComponent("zb-load-more");
  (_component_tableCheckbox + _component_table_summary + _component_zb_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showHeader
  }, $props.showHeader ? {
    b: common_vendor.f($options.transColumns, (item, index, i0) => {
      return common_vendor.e({
        a: item.type === "selection"
      }, item.type === "selection" ? {
        b: common_vendor.o($options.checkboxSelectedAll, index),
        c: "27eb226a-0-" + i0,
        d: common_vendor.p({
          indeterminate: $data.indeterminate,
          checked: $data.checkedAll
        })
      } : common_vendor.e({
        e: common_vendor.t(item.label || ""),
        f: item.sorter
      }, item.sorter ? {
        g: common_vendor.n(item.sorterMode === "_asc" && `sorting${item.sorterMode || ""}`),
        h: common_vendor.n(item.sorterMode === "_desc" && `sorting${item.sorterMode || ""}`)
      } : {}), {
        i: common_vendor.o(($event) => $options.sortAction(item, index), index),
        j: common_vendor.n(index < $options.fixedLeftColumns.length && "zb-stick-side"),
        k: `${item.left}px`,
        l: `${item.width ? item.width : "100"}px`,
        m: index === $options.transColumns.length - 1 ? 1 : "none",
        n: `${item.width ? item.width : "100"}px`,
        o: item.align || "left",
        p: index
      });
    }),
    c: `${$props.border ? "1px solid #e8e8e8" : ""}`,
    d: `${$props.border ? "1px solid #e8e8e8" : ""}`
  } : {}, {
    e: !$props.data.length
  }, !$props.data.length ? {} : {}, {
    f: common_vendor.f($options.transData, (item, index, i0) => {
      return {
        a: common_vendor.f($options.transColumns, (ite, i, i1) => {
          return common_vendor.e({
            a: ite.type === "operation"
          }, ite.type === "operation" ? {
            b: common_vendor.f($options.permission(item, ite.renders, index), (ren, ind, i2) => {
              return common_vendor.e({
                a: ren.type === "custom"
              }, ren.type === "custom" ? {
                b: common_vendor.t(ren.name),
                c: common_vendor.n(ren.class || "")
              } : {
                d: common_vendor.t(ren.name),
                e: common_vendor.n(ren.class || ""),
                f: ren.type || "primary",
                g: ren.size || "mini"
              }, {
                h: ind,
                i: common_vendor.o(($event) => _ctx.$emit(ren.func, item, index), ind)
              });
            }),
            c: ite.renders.length > 1 ? "8px" : "0"
          } : ite.type === "selection" ? {
            e: common_vendor.o((e) => $options.checkboxSelected(e, item), i),
            f: "27eb226a-1-" + i0 + "-" + i1,
            g: common_vendor.p({
              cellData: item,
              checked: item.checked
            })
          } : ite.type === "img" ? common_vendor.e({
            i: item[ite.name]
          }, item[ite.name] ? {
            j: common_vendor.f($options.imgs(item[ite.name]), (iImageTem, iImage, i2) => {
              return {
                a: common_vendor.o(($event) => $options.previewImage(iImageTem, item[ite.name], iImage), iImage),
                b: iImage,
                c: iImageTem
              };
            }),
            k: common_vendor.o(() => {
            }, i)
          } : {
            l: common_vendor.t(ite.emptyString)
          }) : ite.type === "index" ? {
            n: common_vendor.t(index + 1)
          } : {
            o: common_vendor.t(ite.filters ? $options.itemFilter(item, ite) : $options.formatterAction(item, ite, index, i))
          }, {
            d: ite.type === "selection",
            h: ite.type === "img",
            m: ite.type === "index",
            p: common_vendor.s({
              left: `${ite.left}px`,
              width: `${ite.width ? ite.width : "100"}px`,
              flex: i === $options.transColumns.length - 1 ? 1 : "none",
              minWidth: `${ite.width ? ite.width : "100"}px`,
              borderRight: `${$props.border ? "1px solid #e8e8e8" : ""}`,
              textAlign: ite.align || "left"
            }),
            q: common_vendor.s($options.getCellStyle(item, ite, index, i)),
            r: common_vendor.o(($event) => $options.cellClick(item, index, ite), i),
            s: common_vendor.n(i < $options.fixedLeftColumns.length && "zb-stick-side"),
            t: i
          });
        }),
        b: common_vendor.n($props.stripe ? index % 2 != 0 ? "odd" : "even" : ""),
        c: common_vendor.n($props.highlight && $options.isHighlight(item, index) ? "current-row" : ""),
        d: common_vendor.o(($event) => $options.rowClick(item, index), item.key),
        e: item.key
      };
    }),
    g: $props.showSummary
  }, $props.showSummary ? {
    h: common_vendor.p({
      data: $props.data,
      showSummary: $props.showSummary,
      fixedLeftColumns: $options.fixedLeftColumns,
      transColumns: $options.transColumns,
      border: $props.border,
      ["summary-method"]: $props.summaryMethod,
      sumText: $props.sumText
    })
  } : {}, {
    i: common_vendor.o((...args) => $options.scrolltolower && $options.scrolltolower(...args)),
    j: $data.isLoadMore && !$data.completeLoading
  }, $data.isLoadMore && !$data.completeLoading ? {} : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-27eb226a"], ["__file", "D:/EquipmentManagerDev/EquipManager/wxapp-front/src/uni_modules/zb-table/components/zb-table/zb-table.vue"]]);
wx.createComponent(Component);
