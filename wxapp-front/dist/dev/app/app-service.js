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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
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
if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom2) {
    return typeof component === "string" ? easycom2 : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  var colortool = {
    rgbaToHsla(scolor) {
      let { r, g, b, a } = scolor;
      r = r / 255;
      g = g / 255;
      b = b / 255;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h, s, l;
      if (max === min) {
        h = 0;
      } else if (max === r) {
        h = 60 * (g - b) / (max - min);
      } else if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
      } else {
        h = 60 * (4 + (r - g) / (max - min));
      }
      if (h < 0) {
        h += 360;
      }
      l = (max + min) / 2;
      if (max === min) {
        s = 0;
      } else if (l < 0.5) {
        s = (max - min) / (max + min);
      } else {
        s = (max - min) / (2 - max - min);
      }
      return { h, s: s * 100, l: l * 100, a };
    },
    hslaToRgba(scolor) {
      let { h, s, l, a } = scolor;
      h = h / 360;
      s = s / 100;
      l = l / 100;
      var r, g, b;
      if (s === 0) {
        r = g = b = l;
      } else {
        let hue2rgb = function(p2, q2, t) {
          if (t < 0)
            t += 1;
          if (t > 1)
            t -= 1;
          if (t < 1 / 6)
            return p2 + (q2 - p2) * 6 * t;
          if (t < 1 / 2)
            return q2;
          if (t < 2 / 3)
            return p2 + (q2 - p2) * (2 / 3 - t) * 6;
          return p2;
        };
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
        a
      };
    },
    cssToRgba: function(sColor) {
      if (!sColor) {
        return { r: 0, g: 0, b: 0, a: 0 };
      }
      let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      sColor = sColor.toLowerCase();
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          let sColorNew = "#";
          for (let i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return {
          r: sColorChange[0],
          g: sColorChange[1],
          b: sColorChange[2],
          a: 1
        };
      } else if (/^(rgb|RGB|rgba|RGBA)/.test(sColor)) {
        let arr = sColor.replace(/(?:\(|\)|rgba|rgb|RGB|RGBA)*/g, "").split(",");
        let p = arr.map((val) => Number(val));
        if (p.length < 3) {
          return {
            r: 0,
            g: 0,
            b: 0,
            a: 1
          };
        }
        if (p.length == 3) {
          p.push(1);
        }
        return {
          r: p[0],
          g: p[1],
          b: p[2],
          a: p[3]
        };
      } else {
        return {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        };
      }
    },
    rgbaToHsva: function(rgba2) {
      if (!rgba2)
        return {
          h: 0,
          s: 1,
          v: 1,
          a: 1
        };
      const r = rgba2.r / 255;
      const g = rgba2.g / 255;
      const b = rgba2.b / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      if (max !== min) {
        if (max === r) {
          h = 60 * (0 + (g - b) / (max - min));
        } else if (max === g) {
          h = 60 * (2 + (b - r) / (max - min));
        } else if (max === b) {
          h = 60 * (4 + (r - g) / (max - min));
        }
      }
      if (h < 0)
        h = h + 360;
      const s = max === 0 ? 0 : (max - min) / max;
      const hsv = [h, s, max];
      return {
        h: hsv[0],
        s: hsv[1],
        v: hsv[2],
        a: rgba2.a
      };
    },
    hsvaToRgba: function(sColor) {
      var { h, s, v, a } = sColor;
      var r = 0;
      var g = 0;
      var b = 0;
      var i;
      var f;
      var p;
      var q;
      var t;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }
      return { r, g, b, a };
    },
    rgbaToCss: function(sColor) {
      return `rgba(${sColor.r},${sColor.g},${sColor.b},${sColor.a})`;
    }
  };
  var cssDirection = /* @__PURE__ */ ((cssDirection2) => {
    cssDirection2["left"] = "left";
    cssDirection2["right"] = "right";
    cssDirection2["bottom"] = "bottom";
    cssDirection2["top"] = "top";
    cssDirection2["leftright"] = "x";
    cssDirection2["topbottom"] = "y";
    cssDirection2["topleft"] = "top-left";
    cssDirection2["topright"] = "top-right";
    cssDirection2["bottomleft"] = "bottom-left";
    cssDirection2["bottomright"] = "bottom-right";
    cssDirection2["all"] = "all";
    return cssDirection2;
  })(cssDirection || {});
  var linearDirection = /* @__PURE__ */ ((linearDirection2) => {
    linearDirection2["left"] = "to left";
    linearDirection2["right"] = "to right";
    linearDirection2["top"] = "to top";
    linearDirection2["bottom"] = "to bottom";
    linearDirection2["none"] = "";
    return linearDirection2;
  })(linearDirection || {});
  var linearDeep = /* @__PURE__ */ ((linearDeep2) => {
    linearDeep2["light"] = "light";
    linearDeep2["dark"] = "dark";
    linearDeep2["accent"] = "accent";
    return linearDeep2;
  })(linearDeep || {});
  var borderStyle = /* @__PURE__ */ ((borderStyle2) => {
    borderStyle2["solid"] = "solid";
    borderStyle2["dashed"] = "dashed";
    borderStyle2["dotted"] = "dotted";
    return borderStyle2;
  })(borderStyle || {});
  let localTheme = {};
  try {
    localTheme = JSON.parse(uni.getStorageSync("$tmTheme"));
  } catch (e) {
  }
  let theme = ((_b = (_a = uni == null ? void 0 : uni.$tm) == null ? void 0 : _a.config) == null ? void 0 : _b.theme) ? __spreadValues({}, uni.$tm.config.theme) : localTheme;
  var colors = [];
  var colorObj = __spreadValues({
    red: "#FE1C00",
    pink: "#CA145D",
    purple: "#A61BC3",
    "deep-purple": "#6A0E81",
    indigo: "#652DF4",
    blue: "#0163FF",
    "light-blue": "#0889FF",
    cyan: "#11CDE8",
    teal: "#00998a",
    green: "#5DBD1F",
    "light-green": "#83D54A",
    lime: "#D4ED00",
    yellow: "#FFC400",
    amber: "#FFFB01",
    orange: "#FEA600",
    "deep-orange": "#FE5C00",
    brown: "#795548",
    "blue-grey": "#607D8B",
    grey: "#9E9E9E",
    black: "#000000",
    white: "#FFFFFF",
    primary: "#0163FF",
    "grey-5": "#fafafa",
    "grey-4": "#f5f5f5",
    "grey-3": "#eeeeee",
    "grey-2": "#e0e0e0",
    "grey-1": "#bdbdbd",
    "grey-darken-1": "#757575",
    "grey-darken-2": "#616161",
    "grey-darken-3": "#404044",
    "grey-darken-4": "#202022",
    "grey-darken-5": "#111112",
    "grey-darken-6": "#0A0A0B"
  }, theme);
  for (const key in colorObj) {
    if (Object.prototype.hasOwnProperty.call(colorObj, key)) {
      const element = String(colorObj[key]);
      if (isCssColor(element)) {
        let rgba = colortool.cssToRgba(element);
        colors.push({
          name: key,
          value: element,
          hsva: colortool.rgbaToHsva(colortool.cssToRgba(element)),
          rgba: colortool.cssToRgba(element),
          hsla: colortool.rgbaToHsla(rgba),
          csscolor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
        });
      }
    }
  }
  function isCssColor(color) {
    const reg1 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    const reg2 = /^(rgb|RGB|rgba|RGBA)/;
    return reg1.test(color) || reg2.test(color);
  }
  function getColor(colorName) {
    let isHand = colors.findIndex(function(el, index) {
      return el.name == colorName;
    });
    if (isHand == -1) {
      colorName = "primary";
      isHand = colors.findIndex(function(el, index) {
        return el.name == colorName;
      });
      formatAppLog("warn", "at tmui/tool/theme/theme.ts:92", "主题中不存在相关名称的主题。");
    }
    return colors[isHand];
  }
  class themeColors {
    constructor(c = colors) {
      __publicField(this, "colors", []);
      this.colors = c;
    }
    hasColors(colorName = "") {
      let isHand = this.colors.filter(function(el, index) {
        return el.name == colorName;
      });
      return isHand.length > 0;
    }
    add(colorName = "", value = "") {
      let isHand = this.colors.filter(function(el, index) {
        return el.name == colorName;
      });
      if (isHand.length > 0) {
        return this.colors;
      }
      if (!value) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:118", "颜色值必填!!!");
        return this.colors;
      }
      let rgba = colortool.cssToRgba(value);
      let color = {
        csscolor: "",
        hsva: { h: 0, s: 0, v: 0, a: 0 },
        hsla: { h: 0, s: 0, l: 0, a: 0 },
        rgba: { r: 0, g: 0, b: 0, a: 0 },
        name: colorName,
        value
      };
      color.csscolor = colortool.rgbaToCss(rgba);
      color.hsva = colortool.rgbaToHsva(rgba);
      color.rgba = rgba;
      color.hsla = colortool.rgbaToHsla(rgba);
      this.colors.push(color);
      return this.colors;
    }
    del(colorName) {
      let isHand = this.colors.findIndex(function(el, index) {
        return el.name == colorName;
      });
      if (isHand == -1) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:142", "删除失败，主题中不存在相关名称的主题。");
        return;
      }
      this.colors.splice(isHand, 1);
    }
    getColor(colorName) {
      let isHand = this.colors.findIndex(function(el, index) {
        return el.name == colorName;
      });
      if (isHand == -1) {
        colorName = "primary";
        isHand = this.colors.findIndex(function(el, index) {
          return el.name == colorName;
        });
        formatAppLog("error", "at tmui/tool/theme/theme.ts:156", "主题中不存在相关名称的主题。");
      }
      return this.colors[isHand];
    }
    /**
     * 计算主题
     * @author tmui3.0|tmzdy
     * @param config 样式的细化
     * @returns cssstyle 返回一个计算好的主题系。
     */
    getTheme(config2 = { colorname: "primary", dark: false }) {
      var _a2, _b2, _c2, _d2;
      if (!config2["colorname"]) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:170", "颜色名称必填");
        config2.colorname = "primary";
      }
      let index = this.colors.findIndex((el) => el.name == config2.colorname);
      if (index == -1) {
        formatAppLog("error", "at tmui/tool/theme/theme.ts:175", "主题不存在，默认为primary");
        config2.colorname = "primary";
      }
      let nowColor = __spreadValues({}, this.colors[index]);
      config2.borderWidth = isNaN(parseInt(String(config2["borderWidth"]))) ? 0 : (_a2 = config2["borderWidth"]) != null ? _a2 : 0;
      config2.borderStyle = config2["borderStyle"] ? config2["borderStyle"] : "solid";
      config2.borderColor = config2["borderColor"] || "";
      config2.borderDirection = config2["borderDirection"] || cssDirection.all;
      config2.linearDirection = config2["linearDirection"] || linearDirection.none;
      config2.linearDeep = config2["linearDeep"] || linearDeep.light;
      config2.shadow = isNaN(parseInt(String(config2["shadow"]))) ? 6 : config2["shadow"];
      config2.round = isNaN(parseInt(String(config2["round"]))) ? 4 : config2["round"];
      config2.opaticy = isNaN(parseInt(String(config2["opaticy"]))) ? 1 : config2["opaticy"];
      config2.outlined = typeof config2["outlined"] == "boolean" ? config2["outlined"] : false;
      config2.text = typeof config2["text"] == "boolean" ? config2["text"] : false;
      config2.blur = typeof config2["blur"] == "boolean" ? config2["blur"] : false;
      function isDarkColorFun(r, g, b) {
        const yiq = (r * 2126 + g * 7152 + b * 722) / 1e4;
        return yiq < 180;
      }
      let isBlack = false;
      let isWhite = false;
      let isBlackAndWhite = false;
      let isGrey = false;
      let isDarkColor = false;
      isDarkColor = isDarkColorFun(nowColor.rgba.r, nowColor.rgba.g, nowColor.rgba.b);
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
        isBlack = true;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
        isWhite = true;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l < 100) {
        isGrey = true;
      }
      if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
        isBlackAndWhite = true;
      }
      let css = {};
      css.color = nowColor.value;
      css.config = __spreadValues({}, config2);
      css.isBlackAndWhite = isBlackAndWhite;
      css.gradientColor = [];
      css.colorname = config2.colorname;
      let borderhsl = __spreadValues({}, nowColor.hsla);
      css.borderCss = {};
      let bghsl = __spreadValues({}, nowColor.hsla);
      if (config2.dark && !isBlackAndWhite) {
        bghsl.l = 40;
      }
      if (config2.blur) {
        bghsl.a = 0.85;
      }
      css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadValues({}, bghsl)));
      if (isBlackAndWhite && config2.dark) {
        css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, bghsl), { h: 240, s: 3, l: 8 })));
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { h: 240, s: 3, l: 12 })));
      }
      if (isWhite && !config2.dark) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 90 })));
      }
      if (isBlack && !config2.dark) {
        css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, borderhsl), { l: 12 })));
      }
      css.backgroundColorCss = { "background-color": css.backgroundColor };
      let txcolor = __spreadValues({}, nowColor.hsla);
      if (config2.dark) {
        txcolor.l = 95;
      } else {
        if (isDarkColor) {
          txcolor.l = 95;
        } else {
          if (isGrey) {
            txcolor.l = 10;
          } else {
            txcolor.l = 20;
          }
        }
      }
      if (config2.outlined) {
        txcolor.l = nowColor.hsla.l;
        if (config2.dark) {
          txcolor.l = 55;
        } else {
          if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0 && !isDarkColorFun(nowColor.rgba.r, nowColor.rgba.g, nowColor.rgba.b)) {
            txcolor.l = 20;
          }
        }
        if ((isBlack || isWhite) && config2.dark) {
          txcolor.l = 100;
        }
        config2.borderWidth = config2["borderWidth"] || 2;
        let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 0, a: 0 };
        let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.backgroundColor = o_bgcss;
        css.backgroundColorCss = { "background-color": o_bgcss };
        css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
      }
      if (config2.text) {
        txcolor.l = nowColor.hsla.l;
        if (isGrey) {
          txcolor.l = 15;
        } else {
          if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0 && !isDarkColorFun(nowColor.rgba.r, nowColor.rgba.g, nowColor.rgba.b)) {
            txcolor.l = 20;
          }
        }
        if (config2.dark) {
          txcolor.l = 60;
          if (!isBlackAndWhite) {
            txcolor.s = 100;
          }
        }
        if (isBlack) {
          txcolor.l = 90;
        }
        if (isWhite) {
          txcolor.l = 15;
        }
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && config2.dark) {
          txcolor.l = 90;
        }
        css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
        css.border = css.textColor;
        let o_now_bgColor = nowColor.csscolor;
        let n_hsl = { h: nowColor.hsla.h, s: nowColor.hsla.s, l: 96, a: nowColor.hsla.a };
        if (config2.dark) {
          if (nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
            n_hsl.l = 12;
            n_hsl.s = 35;
          } else {
            n_hsl.l = 12;
            n_hsl.s = 0;
          }
        }
        if (config2.blur) {
          n_hsl.a = 0.85;
        }
        o_now_bgColor = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.backgroundColor = o_now_bgColor;
        css.backgroundColorCss = { "background-color": o_now_bgColor };
      }
      if (config2.shadow) {
        let n_hsl = { h: nowColor.hsla.h, s: 100, l: 50, a: 0.2 };
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
          n_hsl = { h: 0, s: 0, l: 20, a: 0.07 };
        }
        let o_bgcss = colortool.rgbaToCss(colortool.hslaToRgba(n_hsl));
        css.shadowColor = {
          boxShadow: `0rpx ${config2.shadow * 2.5}rpx ${config2.shadow * 6}rpx ${o_bgcss}`
        };
      }
      if (config2.linearDirection) {
        let liner_color_1 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
        let liner_color_2 = { h: 0, s: 0, l: 0, a: nowColor.hsla.a };
        let dir_str = linearDirection[config2.linearDirection];
        let addling = 0;
        if (nowColor.hsla.h < 180 && nowColor.hsla.h > 0) {
          addling = 20;
        } else {
          addling = -37;
        }
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 100) {
          if (config2.linearDeep == "light") {
            liner_color_1.l = 80;
            liner_color_2.l = 20;
          } else {
            liner_color_1.l = 50;
            liner_color_2.l = 40;
          }
        } else if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0 && nowColor.hsla.l == 0) {
          if (config2.linearDeep == "light") {
            liner_color_1.l = 40;
            liner_color_2.l = 10;
          } else {
            liner_color_1.l = 30;
            liner_color_2.l = 0;
          }
        } else {
          liner_color_2.h = nowColor.hsla.h;
          liner_color_2.s = nowColor.hsla.s;
          liner_color_1.h = nowColor.hsla.h;
          liner_color_1.s = nowColor.hsla.s;
          if (config2.linearDeep == "light") {
            liner_color_1.h = liner_color_1.h;
            liner_color_1.s = 90;
            liner_color_1.l = 70;
            liner_color_2.l = 44;
          } else if (config2.linearDeep == "dark") {
            liner_color_2.s = 90;
            liner_color_2.l = 26;
            liner_color_1.s = 90;
            liner_color_1.l = 50;
          } else if (config2.linearDeep == "accent") {
            liner_color_1.h -= 0;
            liner_color_1.s = 90;
            liner_color_1.l = 54;
            liner_color_2.h -= addling;
            liner_color_2.s = 90;
            liner_color_2.l = 54;
          }
        }
        if (config2.dark) {
          liner_color_1.l = 40;
          liner_color_2.l = 40;
          txcolor.l = 90;
        }
        let color_t_1 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_1));
        let color_t_2 = colortool.rgbaToCss(colortool.hslaToRgba(liner_color_2));
        if (!config2.text && !config2.outlined) {
          css.backgroundColorCss = { "background-image": `linear-gradient(${dir_str},${color_t_1},${color_t_2})` };
          let newBgcolor = {
            h: (liner_color_1.h + liner_color_2.h) / 2,
            s: (liner_color_1.s + liner_color_2.s) / 2,
            l: (liner_color_1.l + liner_color_2.l) / 2,
            a: (liner_color_1.a + liner_color_2.a) / 2
          };
          let newBgcolorRgb = colortool.hslaToRgba(newBgcolor);
          if (!config2.dark) {
            if (!isDarkColorFun(newBgcolorRgb.r, newBgcolorRgb.g, newBgcolorRgb.b) && nowColor.hsla.h != 0 && nowColor.hsla.s != 0) {
              txcolor.l = 20;
            }
          }
          css.backgroundColor = colortool.rgbaToCss(colortool.hslaToRgba(newBgcolor));
          css.gradientColor = [color_t_1, color_t_2];
          css.linearDirectionStr = dir_str;
        }
      }
      if (config2.dark == true) {
        css = __spreadValues(__spreadValues({}, css), (_d2 = (_c2 = (_b2 = uni.$tm.config) == null ? void 0 : _b2.themeConfig) == null ? void 0 : _c2.dark) != null ? _d2 : {});
      }
      css.textColor = colortool.rgbaToCss(colortool.hslaToRgba(txcolor));
      if (config2.dark) {
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
          css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 12 })));
        } else {
          css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l + 10 })));
        }
      } else {
        if (nowColor.hsla.h == 0 && nowColor.hsla.s == 0) {
          css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 90 })));
        } else {
          if (config2.text && config2.outlined) {
            css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: 90 })));
          } else if (!config2.text && config2.outlined) {
            css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadValues({}, txcolor)));
          } else if (!config2.text && !config2.outlined && config2.borderWidth > 0) {
            css.border = colortool.rgbaToCss(colortool.hslaToRgba(__spreadProps(__spreadValues({}, nowColor.hsla), { l: bghsl.l - 3 })));
          }
        }
        css.border = config2.borderColor || css.border;
      }
      let bcss = `${config2.borderWidth}rpx ${config2.borderStyle} ${css.border}`;
      if (config2.borderDirection == "all") {
        css.borderCss[`border`] = bcss;
      } else if (config2.borderDirection == "x" || config2.borderDirection == "leftright") {
        css.borderCss[`border-left`] = bcss;
        css.borderCss[`border-right`] = bcss;
      } else if (config2.borderDirection == "y" || config2.borderDirection == "topbottom") {
        css.borderCss[`border-top`] = bcss;
        css.borderCss[`border-bottom`] = bcss;
      } else if (config2.borderDirection == "bottomleft") {
        css.borderCss[`border-left`] = bcss;
        css.borderCss[`border-bottom`] = bcss;
      } else if (config2.borderDirection == "bottomright") {
        css.borderCss[`border-right`] = bcss;
        css.borderCss[`border-bottom`] = bcss;
      } else if (config2.borderDirection == "topleft") {
        css.borderCss[`border-left`] = bcss;
        css.borderCss[`border-top`] = bcss;
      } else if (config2.borderDirection == "topright") {
        css.borderCss[`border-right`] = bcss;
        css.borderCss[`border-top`] = bcss;
      } else {
        let str = "-" + config2.borderDirection;
        css.borderCss[`border${str}`] = bcss;
      }
      return css;
    }
  }
  const theme$1 = {
    isCssColor,
    themeColors,
    getColor
  };
  const custom_props = {
    /**
     * 自定义的样式属性
     */
    _style: {
      type: [Array, String, Object],
      default: () => []
    },
    /**
     * 自定义类名
     */
    _class: {
      type: [Array, String],
      default: ""
    },
    /**
     * 当前组件的主题。可以是颜色值，也可以是主题名称。
     */
    color: {
      type: String,
      default: "primary"
    },
    /**
     * 是否跟随全局主题的变换而变换
     */
    followTheme: {
      type: [Boolean, String],
      default: false
    },
    /**
     * 暗黑
     */
    dark: {
      type: [Boolean, String],
      default: false
    },
    /**
     * 是否跟随主题全局切换暗黑模式。
     */
    followDark: {
      type: [Boolean, String],
      default: true
    },
    /**
     * 圆角
     */
    round: {
      type: [Number, Array],
      default: 0
    },
    /**
     * 投影，安卓上只有黑灰投影。
     */
    shadow: {
      type: [Number],
      default: 0
      //4
    },
    /**
     * 是否镂空背景。
     */
    outlined: {
      type: [Boolean],
      default: false
    },
    /**
     * 边线
     */
    border: {
      type: [Number],
      default: 0
    },
    /**
     * 边线样式
     * @field solid|dashed|dotted
     * @default solid
     */
    borderStyle: {
      type: String,
      default: borderStyle.solid
    },
    /**
     * 边线的方向。
     */
    borderDirection: {
      type: String,
      default: cssDirection.all
    },
    /**
     * 是否浅色背景
     */
    text: {
      type: [Boolean, String],
      default: false
    },
    /**
     * 是否透明背景
     */
    transprent: {
      type: [Boolean, String],
      default: true
    },
    /**
     * 是否透明背景,等同transprent,因单词拼写错误，现在写一个正确的。
     */
    transparent: {
      type: [Boolean, String],
      default: true
    },
    /**
     * 渐变背景方向,
     * left:右->左，right:左->右。top:下->上，bottom:上->下。
     */
    linear: {
      type: String,
      default: ""
    },
    /** 渐变的亮浅 light,dark,accent亮系渐变和深色渐变。 */
    linearDeep: {
      type: String,
      default: "light"
    },
    /**当开启渐变时，如果提供些数组属性将产生自定义颜色的渐变值。 */
    linearColor: {
      type: [Array],
      default: () => []
    },
    //是否禁用圆角功能 ，针对安卓的特别处理。
    isDisabledRoundAndriod: {
      type: [Boolean, String],
      default: false
    },
    //是否开启磨砂背景。
    blur: {
      type: Boolean,
      default: false
    },
    /**线的边线颜色,如果不提供自动从color中匹配计算。 */
    borderColor: {
      type: String,
      default: ""
    }
  };
  const computedDark = (props, tmcfg) => {
    const followDark = props.followDark;
    const dark2 = props.dark;
    const glboalDark = tmcfg.dark;
    if (followDark) {
      return glboalDark;
    }
    return dark2;
  };
  const computedClass = (props) => {
    const _class = props._class;
    if (typeof _class == "string") {
      return _class;
    }
    if (Array.isArray(_class)) {
      return _class.join(" ");
    }
    return "";
  };
  const computedStyle$1 = (props) => {
    const _style = props._style;
    if (typeof _style == "string") {
      let p = _style.split(";");
      let k = p.map((el) => {
        el = el.replace(";", "");
        let node = {};
        let idx = el.split(":");
        node[idx[0]] = idx[1];
        return node;
      });
      let kl = {};
      k.forEach((el) => {
        kl = __spreadValues(__spreadValues({}, kl), el);
      });
      return kl;
    }
    if (typeof _style == "object" && !Array.isArray(_style)) {
      return _style;
    }
    if (typeof _style == "object" && Array.isArray(_style)) {
      let kl = {};
      _style.forEach((el) => {
        kl = __spreadValues(__spreadValues({}, kl), el);
      });
      return kl;
    }
    return {};
  };
  const computedTheme$1 = (props, dark2, store) => {
    var _a2;
    const color = props.color;
    const border = props.border;
    const shadow = props.shadow;
    const round = props.round;
    const outlined = props.outlined;
    const text = props.text;
    const borderStyle2 = props.borderStyle;
    const borderDirection = props.borderDirection;
    const linear = props.linear;
    const linearDeep2 = props.linearDeep;
    const blur = props.blur;
    var borderColor = (_a2 = props == null ? void 0 : props.borderColor) != null ? _a2 : "";
    var theme2 = new theme$1.themeColors(store.colorList);
    if (theme$1.isCssColor(color) && !theme2.hasColors(color)) {
      theme2 = new theme$1.themeColors(theme2.add(color, color));
    }
    let defaultColorName = color || "primary";
    if ((props == null ? void 0 : props.followTheme) == true && store.color) {
      defaultColorName = store.color;
      borderColor = "";
    }
    let c = theme2.getTheme({
      colorname: defaultColorName,
      dark: dark2,
      borderWidth: border,
      shadow: parseInt(String(shadow)),
      round: parseInt(String(round)),
      outlined: outlined ? true : false,
      text: text ? true : false,
      borderStyle: borderStyle2,
      borderDirection,
      linearDirection: linear,
      linearDeep: linearDeep2,
      blur,
      borderColor
    });
    return c;
  };
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a2;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof globalThis !== "undefined" && ((_a2 = globalThis.perf_hooks) === null || _a2 === void 0 ? void 0 : _a2.performance)) {
      supported = true;
      perf = globalThis.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    setRealTarget(target) {
      return __async(this, null, function* () {
        this.target = target;
        for (const item of this.onQueue) {
          this.target.on[item.method](...item.args);
        }
        for (const item of this.targetQueue) {
          item.resolve(yield this.target[item.method](...item.args));
        }
      });
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy) {
        setupFn(proxy.proxiedTarget);
      }
    }
  }
  /*!
   * pinia v2.1.7
   * (c) 2023 Eduardo San Martin Morote
   * @license MIT
   */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const getActivePinia = () => vue.hasInjectionContext() && vue.inject(piniaSymbol) || activePinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject$1(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  function actionGlobalCopyState(pinia) {
    return __async(this, null, function* () {
      if (checkClipboardAccess())
        return;
      try {
        yield navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
        toastMessage("Global state copied to clipboard.");
      } catch (error) {
        if (checkNotFocusedError(error))
          return;
        toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
        console.error(error);
      }
    });
  }
  function actionGlobalPasteState(pinia) {
    return __async(this, null, function* () {
      if (checkClipboardAccess())
        return;
      try {
        loadStoresState(pinia, JSON.parse(yield navigator.clipboard.readText()));
        toastMessage("Global state pasted from clipboard.");
      } catch (error) {
        if (checkNotFocusedError(error))
          return;
        toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
        console.error(error);
      }
    });
  }
  function actionGlobalSaveState(pinia) {
    return __async(this, null, function* () {
      try {
        saveAs(new Blob([JSON.stringify(pinia.state.value)], {
          type: "text/plain;charset=utf-8"
        }), "pinia-state.json");
      } catch (error) {
        toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
        console.error(error);
      }
    });
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = () => __async(this, null, function* () {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: yield file.text(), file });
        });
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  function actionGlobalOpenStateFile(pinia) {
    return __async(this, null, function* () {
      try {
        const open2 = getFileOpener();
        const result = yield open2();
        if (!result)
          return;
        const { text, file } = result;
        loadStoresState(pinia, JSON.parse(text));
        toastMessage(`Global state imported from "${file.name}".`);
      } catch (error) {
        toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
        console.error(error);
      }
    });
  }
  function loadStoresState(pinia, state) {
    for (const key in state) {
      const storeState = pinia.state.value[key];
      if (storeState) {
        Object.assign(storeState, state[key]);
      } else {
        pinia.state.value[key] = state[key];
      }
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: () => __async(this, null, function* () {
              yield actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            }),
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: () => __async(this, null, function* () {
              yield actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            }),
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: 'Reset the state (with "$reset")',
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (typeof store.$reset !== "function") {
                toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames, wrapWithProxy) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = wrapWithProxy ? new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        }) : store;
        activeAction = _actionId;
        const retValue = actions[actionName].apply(trackedStore, arguments);
        activeAction = void 0;
        return retValue;
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    store._isOptionsAPI = !!options.state;
    patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
    const originalHotUpdate = store._hotUpdate;
    vue.toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
    };
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  const isUseStore = (fn) => {
    return typeof fn === "function" && typeof fn.$id === "string";
  };
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  function acceptHMRUpdate(initialUseStore, hot) {
    return (newModule) => {
      const pinia = hot.data.pinia || initialUseStore._pinia;
      if (!pinia) {
        return;
      }
      hot.data.pinia = pinia;
      for (const exportName in newModule) {
        const useStore = newModule[exportName];
        if (isUseStore(useStore) && pinia._s.has(useStore.$id)) {
          const id = useStore.$id;
          if (id !== initialUseStore.$id) {
            console.warn(`The id of the store changed from "${initialUseStore.$id}" to "${id}". Reloading.`);
            return hot.invalidate();
          }
          const existingStore = pinia._s.get(id);
          if (!existingStore) {
            console.log(`[Pinia]: skipping hmr because store doesn't exist yet`);
            return;
          }
          useStore(pinia, existingStore);
        }
      }
    };
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  const fallbackRunWithContext = (fn) => fn();
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function skipHydrate(obj) {
    return Object.defineProperty(obj, skipHydrateSymbol, {});
  }
  function shouldHydrate(obj) {
    return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign: assign$2 } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign$2(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign$2({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = [];
    let actionSubscriptions = [];
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign$2($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign$2({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(assign$2(
      {
        _hmrPayload,
        _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
        // devtools custom properties
      },
      partialStore
      // must be added later
      // setupStore
    ));
    pinia._s.set($id, store);
    const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia._e.run(() => (scope = vue.effectScope()).run(setup)));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign$2(store, setupStore);
      assign$2(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign$2($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject$1(newStateTarget) && isPlainObject$1(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign$2({ value: store[p] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign$2(store, extensions);
      } else {
        assign$2(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
      if (typeof id !== "string") {
        throw new Error(`[🍍]: "defineStore()" must be passed a store id as its first argument.`);
      }
    }
    function useStore(pinia, hot) {
      const hasContext = vue.hasInjectionContext();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || (hasContext ? vue.inject(piniaSymbol, null) : null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign$2({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT) {
        const currentInstance = vue.getCurrentInstance();
        if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
        !hot) {
          const vm = currentInstance.proxy;
          const cache2 = "_pStores" in vm ? vm._pStores : vm._pStores = {};
          cache2[id] = store;
        }
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  let mapStoreSuffix = "Store";
  function setMapStoreSuffix(suffix) {
    mapStoreSuffix = suffix;
  }
  function mapStores(...stores) {
    if (Array.isArray(stores[0])) {
      console.warn(`[🍍]: Directly pass all stores to "mapStores()" without putting them in an array:
Replace
	mapStores([useAuthStore, useCartStore])
with
	mapStores(useAuthStore, useCartStore)
This will fail in production if not fixed.`);
      stores = stores[0];
    }
    return stores.reduce((reduced, useStore) => {
      reduced[useStore.$id + mapStoreSuffix] = function() {
        return useStore(this.$pinia);
      };
      return reduced;
    }, {});
  }
  function mapState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function() {
        return useStore(this.$pinia)[key];
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function() {
        const store = useStore(this.$pinia);
        const storeKey = keysOrMapper[key];
        return typeof storeKey === "function" ? storeKey.call(this, store) : store[storeKey];
      };
      return reduced;
    }, {});
  }
  const mapGetters = mapState;
  function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[key](...args);
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[keysOrMapper[key]](...args);
      };
      return reduced;
    }, {});
  }
  function mapWritableState(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[key];
        },
        set(value) {
          return useStore(this.$pinia)[key] = value;
        }
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = {
        get() {
          return useStore(this.$pinia)[keysOrMapper[key]];
        },
        set(value) {
          return useStore(this.$pinia)[keysOrMapper[key]] = value;
        }
      };
      return reduced;
    }, {});
  }
  function storeToRefs(store) {
    {
      store = vue.toRaw(store);
      const refs = {};
      for (const key in store) {
        const value = store[key];
        if (vue.isRef(value) || vue.isReactive(value)) {
          refs[key] = // ---
          vue.toRef(store, key);
        }
      }
      return refs;
    }
  }
  const PiniaVuePlugin = function(_Vue) {
    _Vue.mixin({
      beforeCreate() {
        const options = this.$options;
        if (options.pinia) {
          const pinia = options.pinia;
          if (!this._provided) {
            const provideCache = {};
            Object.defineProperty(this, "_provided", {
              get: () => provideCache,
              set: (v) => Object.assign(provideCache, v)
            });
          }
          this._provided[piniaSymbol] = pinia;
          if (!this.$pinia) {
            this.$pinia = pinia;
          }
          pinia._a = this;
          if (IS_CLIENT) {
            setActivePinia(pinia);
          }
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(pinia._a, pinia);
          }
        } else if (!this.$pinia && options.parent && options.parent.$pinia) {
          this.$pinia = options.parent.$pinia;
        }
      },
      destroyed() {
        delete this._pStores;
      }
    });
  };
  const Pinia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    get MutationType() {
      return MutationType;
    },
    PiniaVuePlugin,
    acceptHMRUpdate,
    createPinia,
    defineStore,
    getActivePinia,
    mapActions,
    mapGetters,
    mapState,
    mapStores,
    mapWritableState,
    setActivePinia,
    setMapStoreSuffix,
    skipHydrate,
    storeToRefs
  }, Symbol.toStringTag, { value: "Module" }));
  function preview(url = "", list = [], rangKey = "url") {
    if (!url) {
      uni.$tm.u.toast("参数有误");
      return;
    }
    if (arguments.length == 1) {
      uni.previewImage({
        current: url,
        urls: [url]
      });
    } else if (arguments.length === 3) {
      if (typeof list[0] === "object" && typeof list[0] !== "undefined") {
        let urls = [];
        list.forEach((item) => {
          urls.push(item[rangKey]);
        });
        uni.previewImage({
          current: url,
          urls,
          fail: (er) => {
            formatAppLog("warn", "at tmui/tool/function/preview.ts:35", er);
          }
        });
      } else if (typeof list[0] === "string") {
        uni.previewImage({
          current: url,
          urls: list
        });
      }
    } else {
      uni.$tm.u.toast("参数有误");
    }
  }
  function isNumber$1(arg, defaultNum = 0) {
    const p = Number(arg);
    return p || defaultNum;
  }
  function isString$1(arg, defaultStr = "") {
    let p = "";
    if (typeof arg === "string" && arg != null) {
      p = String(arg);
    } else
      p = defaultStr;
    return p;
  }
  function paginate(total, pageSize) {
    const pages2 = Math.ceil(total / pageSize);
    const pageArr = [];
    for (let i = 0; i < pages2; i++) {
      pageArr.push(i + 1);
    }
    return pageArr;
  }
  function getValue(data, keys) {
    const keyArr = keys.split(".");
    let result = __spreadValues({}, data);
    for (const key of keyArr) {
      result = result[key];
      if (result === void 0 || result === null) {
        return result;
      }
    }
    return result;
  }
  function setValue(data, keys, value) {
    const keyArr = keys.split(".");
    let obj = data;
    for (let i = 0; i < keyArr.length - 1; i++) {
      const key = keyArr[i];
      if (!(key in obj)) {
        obj[key] = {};
      }
      obj = obj[key];
    }
    obj[keyArr[keyArr.length - 1]] = value;
  }
  function getMaxDepth(data) {
    let maxDepth = 0;
    function traverse(obj, depth) {
      if (typeof obj !== "object" || obj === null) {
        maxDepth = Math.max(maxDepth, depth);
        return;
      }
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          traverse(obj[key], depth + 1);
        }
      }
    }
    traverse(data, 0);
    return maxDepth;
  }
  function deepObjectMerge(FirstOBJ, SecondOBJ) {
    var _a2;
    for (var key in SecondOBJ) {
      FirstOBJ[key] = FirstOBJ[key] && ((_a2 = FirstOBJ[key]) == null ? void 0 : _a2.toString()) === "[object Object]" ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
    }
    return FirstOBJ;
  }
  function splitData(arr = [], size = 1) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
  function deepClone(data) {
    if (data === null || typeof data !== "object") {
      return data;
    }
    if (Array.isArray(data)) {
      const clone2 = [];
      for (const item of data) {
        clone2.push(deepClone(item));
      }
      return clone2;
    }
    if (data instanceof Date) {
      return new Date(data.getTime());
    }
    if (data instanceof RegExp) {
      const flags = data.flags;
      return new RegExp(data.source, flags);
    }
    if (typeof data === "function") {
      return data;
    }
    const clone = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        clone[key] = deepClone(data[key]);
      }
    }
    return clone;
  }
  function timeMuch(t) {
    let format2 = {
      d: "00",
      h: "00",
      m: "00",
      s: "00"
    };
    if (t > 0) {
      let d = Math.floor(t / 86400);
      let h = Math.floor(t / 3600 % 24);
      let m = Math.floor(t / 60 % 60);
      let s = Math.floor(t % 60);
      format2.d = d < 10 ? "0" + d : d;
      format2.h = h < 10 ? "0" + h : h;
      format2.m = m < 10 ? "0" + m : m;
      format2.s = s < 10 ? "0" + s : s;
    }
    return format2;
  }
  function getDateToNewData(timestamp = (/* @__PURE__ */ new Date()).getTime()) {
    if (typeof timestamp == "string") {
      timestamp = new Date(timestamp).getTime();
    }
    var arrTimestamp = (timestamp + "").split("");
    for (var start = 0; start < 13; start++) {
      if (!arrTimestamp[start]) {
        arrTimestamp[start] = "0";
      }
    }
    timestamp = Number(arrTimestamp.join("")) * 1;
    var minute = 1e3 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var now2 = (/* @__PURE__ */ new Date()).getTime();
    var diffValue = now2 - timestamp;
    if (diffValue < 0) {
      return "不久前";
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var zero = function(value) {
      if (value < 10) {
        return "0" + value;
      }
      return value;
    };
    if (monthC > 12) {
      return function() {
        var date = new Date(timestamp);
        return date.getFullYear() + "年" + zero(date.getMonth() + 1) + "月" + zero(date.getDate()) + "日";
      }();
    } else if (monthC >= 1) {
      return parseInt(monthC + "") + "月前";
    } else if (weekC >= 1) {
      return parseInt(weekC + "") + "周前";
    } else if (dayC >= 1) {
      return parseInt(dayC + "") + "天前";
    } else if (hourC >= 1) {
      return parseInt(hourC + "") + "小时前";
    } else if (minC >= 1) {
      return parseInt(minC + "") + "分钟前";
    }
    return "刚刚";
  }
  function callPhone(phoneNumber = "") {
    let num = phoneNumber.toString();
    return new Promise((rs, rj) => {
      uni.makePhoneCall({
        phoneNumber: num,
        success: () => rs(true),
        fail: (err) => rj(err)
      });
    });
  }
  function scanCode(onlyFromCamera = true, scanType = ["barCode", "qrCode", "datamatrix", "datamatrix"]) {
    return new Promise((rs, rj) => {
      uni.scanCode({
        onlyFromCamera,
        scanType,
        success: (res) => rs(res),
        fail: (error) => rj(error)
      });
    });
  }
  function setClipboardData(data) {
    return new Promise((rs, rj) => {
      uni.setClipboardData({
        data,
        success: () => rs(true),
        fail: (error) => rj(error)
      });
    });
  }
  function getClipboardData() {
    return new Promise((rs, rj) => {
      uni.getClipboardData({
        success: (res) => rs(res.data),
        fail: (error) => rj(error)
      });
    });
  }
  function setCookie(key, data) {
    try {
      uni.setStorageSync(key, data);
      return true;
    } catch (e) {
      return false;
    }
  }
  function delCookie(key) {
    try {
      uni.removeStorageSync(key);
      return true;
    } catch (e) {
      return false;
    }
  }
  function getCookie(key) {
    try {
      const value = uni.getStorageSync(key);
      try {
        let val = JSON.parse(value);
        return val;
      } catch (e) {
        return value;
      }
    } catch (e) {
      return void 0;
    }
  }
  function httpUrlAddKey(uri, key, value) {
    if (!value) {
      return uri;
    }
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      return uri + separator + key + "=" + value;
    }
  }
  function getQueryString(url, key) {
    var query_string = url.substring(url.indexOf("?"));
    if (!query_string)
      return "";
    var re = /[?&]?([^=]+)=([^&]*)/g;
    var tokens;
    while (tokens = re.exec(query_string)) {
      if (decodeURIComponent(tokens[1]) === key) {
        return decodeURIComponent(tokens[2]);
      }
    }
    return "";
  }
  function getUid(rdix = 1, length = 12, isAddStr = false) {
    return Math.floor(Math.random() * rdix * Math.floor(Math.random() * Date.now())).toString(isAddStr ? 16 : 10).substring(0, length);
  }
  var timeout = getUid(1);
  function debounce(func, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      typeof func === "function" && func();
    } else {
      timeout = getUid(1);
      timeout = setTimeout(() => {
        typeof func === "function" && func();
      }, wait);
    }
  }
  var throttleFlag;
  function throttle$1(func, wait = 500, immediate = true) {
    if (immediate) {
      if (!throttleFlag) {
        throttleFlag = true;
        typeof func === "function" && func();
        setTimeout(() => {
          throttleFlag = false;
        }, wait);
      }
    } else {
      if (!throttleFlag) {
        throttleFlag = true;
        setTimeout(() => {
          throttleFlag = false;
          typeof func === "function" && func();
        }, wait);
      }
    }
  }
  function quereyDom(t, node) {
    return new Promise((res, rej) => {
      const query = uni.createSelectorQuery().in(t);
      query.select(node).boundingClientRect((el) => {
        res(el);
      }).exec();
    });
  }
  const queryDom = quereyDom;
  function isPhone(phone) {
    let val = String(phone);
    let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    return !!val.match(reg);
  }
  function isChina(s) {
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    return !!patrn.exec(s);
  }
  function isEmpty(s) {
    if (typeof s === "string") {
      s = s.trim();
    }
    if (s == "")
      return true;
    if (s == null)
      return true;
    if (typeof s === "undefined")
      return true;
    if (Array.isArray(s)) {
      if (s.length == 0)
        return true;
    }
    if (typeof s === "object") {
      if (Object.keys(s).length == 0)
        return true;
    }
    return false;
  }
  function isEmail(s) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !!s.match(reg);
  }
  function isIdCard(val) {
    val = String(val);
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    var code = val.substring(17);
    if (p.test(val)) {
      var sum = 0;
      for (var i = 0; i < 17; i++) {
        let id = val[i];
        sum += id * factor[i];
      }
      if (parity[sum % 11] == code.toUpperCase()) {
        return true;
      }
    }
    return false;
  }
  function isIdCar(s) {
    let reg = /^[京|沪|津|渝|鲁|冀|晋|蒙|辽|吉|黑|苏|浙|皖|闽|赣|豫|湘|鄂|粤|桂|琼|川|贵|云|藏|陕|甘|青|宁|新|港|澳|台|新|使]{1}[A-Z]{1}[A-Z_0-9]{5,6}$/;
    return !!s.match(reg);
  }
  function isPasswordOfNumber(s, len = 6, maxLen = 20) {
    s = String(s);
    let reg = new RegExp(`^[0-9]{${len},${maxLen}}$`);
    return !!s.match(reg);
  }
  function isPasswordOfOther(s, len = 6, maxLen = 20, model = 0) {
    s = String(s);
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (model === 1) {
      reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
    }
    if (model === 2) {
      reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/;
    }
    return !!s.match(reg);
  }
  function isDate$1(s) {
    if (s == null || typeof s === "undefined" || !s)
      return false;
    if (typeof s === "string") {
      s = s.replace("-", "/");
    }
    let d = new Date(s);
    if (d.toString() == "Invalid Date")
      return false;
    return true;
  }
  function toast$1(word, mask = true, icon = "none") {
    uni.showToast({
      mask,
      title: word,
      icon
    });
  }
  function getWindow() {
    var _a2, _b2, _c2, _d2, _e2;
    const sysinfo = uni.getSystemInfoSync();
    let top = 0;
    let height = sysinfo.windowHeight;
    let nowPage = getCurrentPages().pop();
    let isCustomHeader = false;
    (_b2 = (_a2 = uni.$tm) == null ? void 0 : _a2.pages) != null ? _b2 : [];
    let bottom = (_d2 = (_c2 = sysinfo.safeAreaInsets) == null ? void 0 : _c2.bottom) != null ? _d2 : 0;
    if (((_e2 = uni.$tm) == null ? void 0 : _e2.globalNavStyle) == "custom") {
      isCustomHeader = true;
    } else {
      for (let i = 0; i < uni.$tm.pages.length; i++) {
        if ((nowPage == null ? void 0 : nowPage.route) == uni.$tm.pages[i].path && uni.$tm.pages[i].custom == "custom") {
          isCustomHeader = true;
          break;
        }
      }
    }
    let results = { bottom, height, width: sysinfo.windowWidth, top, isCustomHeader, statusBarHeight: sysinfo.statusBarHeight || 0, sysinfo };
    return results;
  }
  function routerTo(url, type = "navigate") {
    let funType = {
      navigate: "navigateTo",
      redirect: "redirectTo",
      switchTab: "switchTab",
      reLaunch: "reLaunch",
      navigateBack: "navigateBack"
    };
    let fun = funType[type];
    if (fun == "navigateBack") {
      uni.navigateBack({
        fail(error) {
          formatAppLog("error", "at tmui/tool/function/util.ts:779", error);
        }
      });
    } else if (fun == "reLaunch") {
      uni.reLaunch({
        url,
        fail(error) {
          formatAppLog("error", "at tmui/tool/function/util.ts:786", error);
        }
      });
    } else if (fun == "switchTab") {
      uni.switchTab({
        url,
        fail(error) {
          formatAppLog("error", "at tmui/tool/function/util.ts:793", error);
        }
      });
    } else if (fun == "redirectTo") {
      uni.redirectTo({
        url,
        fail(error) {
          formatAppLog("error", "at tmui/tool/function/util.ts:800", error);
        }
      });
    } else if (fun == "navigateTo") {
      uni.navigateTo({
        url,
        fail(error) {
          formatAppLog("error", "at tmui/tool/function/util.ts:807", error);
        }
      });
    }
  }
  function torpx(v, screenWidth = 0) {
    if (typeof screenWidth === "undefined" || !screenWidth) {
      screenWidth = uni.getSystemInfoSync().screenWidth;
    }
    let pixelRatio = 750 / screenWidth;
    return Math.ceil(v * pixelRatio);
  }
  function topx(v) {
    return Math.ceil(uni.upx2px(Number(v)));
  }
  var lastTime = 0;
  function requestAnimationFrame(callback) {
    const currentTime = (/* @__PURE__ */ new Date()).getTime();
    const timeToCall = Math.max(0, 16 - (currentTime - lastTime));
    const id = setTimeout(() => {
      callback(currentTime + timeToCall);
    }, timeToCall);
    lastTime = currentTime + timeToCall;
    return id;
  }
  function cancelAnimationFrame(id) {
    clearTimeout(id);
  }
  function valToMarginAr(val) {
    let ar = [];
    if (typeof val === "string" && val) {
      ar = [Number(val)];
    } else if (typeof val === "number" && isNaN(Number(val))) {
      ar = [val];
    } else if (typeof val === "undefined" || typeof val === null || val === "" || val === void 0) {
      val = [0];
    } else if (Array.isArray(val)) {
      ar = val.map((el) => Number(el));
    }
    if (ar.length == 1) {
      ar = new Array(4).fill(ar[0]);
    } else if (ar.length == 2) {
      ar = [...ar, ...ar];
    } else if (ar.length == 3) {
      ar = [...ar, 0];
    }
    return ar;
  }
  function valToRoundStrClass(val) {
    let dstr = "";
    if (typeof val == "number")
      return "round-" + val;
    if (val.length == 1)
      return "round-" + val;
    if (val.length == 2)
      return `round-tl-${val[0]} round-tr-${val[1]}`;
    if (val.length == 3)
      return `round-tl-${val[0]} round-tr-${val[1]} round-br-${val[2]} `;
    if (val.length == 4)
      return `round-tl-${val[0]} round-tr-${val[1]} round-br-${val[2]}  round-bl-${val[2]}`;
    return dstr;
  }
  const util = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    callPhone,
    cancelAnimationFrame,
    debounce,
    deepClone,
    deepObjectMerge,
    default: preview,
    delCookie,
    getClipboardData,
    getCookie,
    getDateToNewData,
    getMaxDepth,
    getQueryString,
    getUid,
    getValue,
    getWindow,
    httpUrlAddKey,
    isChina,
    isDate: isDate$1,
    isEmail,
    isEmpty,
    isIdCar,
    isIdCard,
    isNumber: isNumber$1,
    isPasswordOfNumber,
    isPasswordOfOther,
    isPhone,
    isString: isString$1,
    paginate,
    quereyDom,
    queryDom,
    requestAnimationFrame,
    routerTo,
    scanCode,
    setClipboardData,
    setCookie,
    setValue,
    splitData,
    throttle: throttle$1,
    timeMuch,
    toast: toast$1,
    topx,
    torpx,
    valToMarginAr,
    valToRoundStrClass
  }, Symbol.toStringTag, { value: "Module" }));
  let pdefault_cookies_color = getCookie("setTmVuetifyColor") || "";
  let pdefault_cookies_black = getCookie("setTmVuetifyBlack");
  let pdefault_cookies_local = getCookie("setTmVuetifyLocal") || "zh-Hans";
  let pdefault_cookies_colorArrayList = getCookie("colorArrayList");
  let dark = typeof pdefault_cookies_black === "boolean" ? pdefault_cookies_black : false;
  let themeObj = new theme$1.themeColors();
  if (pdefault_cookies_colorArrayList) {
    const result2 = pdefault_cookies_colorArrayList.filter((item) => themeObj.colors.every((subItem) => subItem.name !== item.name));
    themeObj = new theme$1.themeColors([...themeObj.colors, ...result2]);
  }
  const colorArray = themeObj.colors;
  const os = (_d = (_c = uni.getSystemInfoSync()) == null ? void 0 : _c.osName) != null ? _d : "";
  setCookie("colorArrayList", colorArray);
  const useTmpiniaStore = defineStore("tmpinia", {
    state: () => {
      return {
        tmStore: {
          color: pdefault_cookies_color,
          dark,
          tmVueTifly_pages: "",
          tmVueTifly_pagesIndex: "",
          os,
          //这里是微信小程序和微信H5的配置资料。
          wxshareConfig_miniMp: {
            title: "",
            // 分享标题
            desc: "",
            // 描述
            imageUrl: "",
            // 分享图片
            path: "",
            // 分享路径
            copyLink: "",
            // 复制链接
            query: {}
            // 分享参数
          },
          //当前存储存的主题对象。
          colorList: colorArray,
          //当前的语言
          local: pdefault_cookies_local
        }
      };
    },
    actions: {
      setPageNow(url) {
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          tmVueTifly_pages: url
        });
      },
      setPageNowIndex(index) {
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          tmVueTifly_pagesIndex: index
        });
      },
      setTmVuetifyDark(dark2) {
        dark2 = typeof dark2 !== "boolean" ? false : dark2;
        setCookie("setTmVuetifyBlack", dark2);
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          dark: dark2
        });
      },
      setTmAutoDark(autoDark = false) {
        var _a2, _b2;
        setCookie("setTmVuetifyAutoDark", autoDark);
        this.tmuiConfig.autoDark = autoDark;
        if (autoDark) {
          let nowstrdark = "";
          nowstrdark = (_b2 = (_a2 = uni.getSystemInfoSync()) == null ? void 0 : _a2.osTheme) != null ? _b2 : "";
          this.setTmVuetifyDark(nowstrdark == "dark" ? true : false);
        }
      },
      setWxShare(cfg) {
        let pcf = cfg || {};
        if (typeof pcf !== "object" || Array.isArray(cfg))
          pcf = {};
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          wxshareConfig_miniMp: __spreadValues(__spreadValues({}, this.tmStore.wxshareConfig_miniMp), pcf)
        });
      },
      setTmVuetifyTheme(color) {
        let defaultColorName = color;
        if (!defaultColorName || defaultColorName == "" || theme$1.isCssColor(defaultColorName)) {
          defaultColorName = "";
        }
        setCookie("setTmVuetifyColor", defaultColorName);
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), { color: defaultColorName });
      },
      //添加一个主题
      setTmVuetifyAddTheme(colorName, color, isSet = true) {
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          colorList: themeObj.add(colorName, color)
        });
        setCookie("colorArrayList", this.tmStore.colorList);
        if (isSet) {
          this.setTmVuetifyTheme(colorName);
        }
      },
      setTmLocal(language2) {
        language2 = language2 || "zh-Hans";
        setCookie("setTmVuetifyLocal", language2);
        this.tmStore = __spreadProps(__spreadValues({}, this.tmStore), {
          local: language2
        });
      }
    }
  });
  const useTheme = (props, store) => {
    var _a2, _b2;
    let dark2 = vue.ref(false);
    let isNvue = vue.ref(false);
    let customCSSStyle = vue.ref({});
    let parentClass = vue.ref("");
    let transparent = vue.ref(false);
    let blur = vue.ref(false);
    let customClass = vue.ref("");
    let margin = vue.ref([]);
    let padding = vue.ref([]);
    let round = vue.ref("");
    let theme2 = vue.ref(computedTheme(props.value, dark2.value, store.value));
    let customThemeConfig = {};
    vue.watchEffect(() => {
      var _a3, _b3, _c2, _d2, _e2, _f2, _g2, _h2, _i, _j, _k, _l, _m, _n, _o, _p;
      const followDark = props.value.followDark;
      let lsdark = props.value.dark;
      if (followDark) {
        lsdark = store.value.dark;
      }
      dark2.value = lsdark;
      if (store.value.os == "android" && isNvue.value) {
        blur.value = false;
      } else {
        blur.value = (_b3 = (_a3 = props.value) == null ? void 0 : _a3.blur) != null ? _b3 : false;
      }
      customCSSStyle.value = computedStyle((_c2 = props.value) == null ? void 0 : _c2._style);
      parentClass.value = ((_d2 = props.value) == null ? void 0 : _d2.parenClass) || ((_e2 = props.value) == null ? void 0 : _e2.parentClass) || "";
      transparent.value = ((_h2 = (_f2 = props.value) == null ? void 0 : _f2.transprent) != null ? _h2 : (_g2 = props.value) == null ? void 0 : _g2.transparent) || false;
      customClass.value = computedClas((_j = (_i = props.value) == null ? void 0 : _i._class) != null ? _j : "");
      margin.value = valToMarginAr((_l = (_k = props.value) == null ? void 0 : _k.margin) != null ? _l : null);
      padding.value = valToMarginAr((_n = (_m = props.value) == null ? void 0 : _m.padding) != null ? _n : null);
      round.value = valToRoundStrClass((_p = (_o = props.value) == null ? void 0 : _o.round) != null ? _p : "");
      theme2.value = computedTheme(__spreadValues(__spreadValues({}, props.value), customThemeConfig), dark2.value, store.value);
    });
    return {
      dark: dark2,
      isNvue,
      round,
      padding,
      margin,
      customCSSStyle,
      theme: (config2 = {}) => {
        for (let key in config2) {
          if (config2[key] !== null) {
            customThemeConfig[key] = config2[key];
          }
        }
        return theme2;
      },
      customClass,
      parentClass,
      transparent,
      _props: props,
      proxy: (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null,
      blur
    };
  };
  function computedStyle(_style) {
    if (typeof _style == "string") {
      let p = _style.split(";");
      let k = p.map((el) => {
        el = el.replace(";", "");
        let node = {};
        let idx = el.split(":");
        node[idx[0]] = idx[1];
        return node;
      });
      let kl = {};
      k.forEach((el) => {
        kl = __spreadValues(__spreadValues({}, kl), el);
      });
      return kl;
    }
    if (typeof _style == "object" && !Array.isArray(_style)) {
      return _style;
    }
    if (typeof _style == "object" && Array.isArray(_style)) {
      let kl = {};
      _style.forEach((el) => {
        kl = __spreadValues(__spreadValues({}, kl), el);
      });
      return kl;
    }
    return {};
  }
  function computedClas(_class) {
    if (typeof _class == "string") {
      return _class;
    }
    if (Array.isArray(_class)) {
      return _class.join(" ");
    }
    return "";
  }
  function computedTheme(props, dark2, store) {
    var _a2;
    const color = props.color;
    const border = props.border;
    const shadow = props.shadow;
    const round = props.round;
    const outlined = props.outlined;
    const text = props.text;
    const borderStyle2 = props.borderStyle;
    const borderDirection = props.borderDirection;
    const linear = props.linear;
    const linearDeep2 = props.linearDeep;
    const blur = props.blur;
    var borderColor = (_a2 = props == null ? void 0 : props.borderColor) != null ? _a2 : "";
    var theme2 = new theme$1.themeColors(store.colorList);
    if (theme$1.isCssColor(color) && !theme2.hasColors(color)) {
      theme2 = new theme$1.themeColors(theme2.add(color, color));
    }
    let defaultColorName = color || "primary";
    if ((props == null ? void 0 : props.followTheme) == true && store.color) {
      defaultColorName = store.color;
      borderColor = "";
    }
    let c = theme2.getTheme({
      colorname: defaultColorName,
      dark: dark2,
      borderWidth: border,
      shadow: parseInt(String(shadow)),
      round: parseInt(String(round)),
      outlined,
      text,
      borderStyle: borderStyle2,
      borderDirection,
      linearDirection: linear,
      linearDeep: linearDeep2,
      blur,
      borderColor
    });
    return c;
  }
  const _sfc_main$y = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-sheet",
    props: __spreadProps(__spreadValues({}, custom_props), {
      parenClass: {
        type: String,
        default: ""
      },
      contStyle: {
        type: String,
        default: ""
      },
      height: {
        type: [Number],
        default: 0
      },
      width: {
        type: [Number],
        default: 0
      },
      color: {
        type: String,
        default: "white"
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Number, String],
        default: 0
      },
      margin: {
        type: Array,
        default: () => [32]
      },
      padding: {
        type: Array,
        default: () => [24]
      },
      unit: {
        type: String,
        default: "rpx"
      },
      hoverClass: {
        type: String,
        default: "none"
      },
      //暗下强制的背景色，
      //有时自动的背景，可能不是你想要暗黑背景，此时可以使用此参数，强制使用背景色，
      //只能是颜色值。
      darkBgColor: {
        type: String,
        default: ""
      },
      //不是同层背景，默认是同层，为false
      //如果输入框表单与tmshee在同一层下。他们的黑白暗黑背景色是相同的。为了区分这个问题，需要单独指示，以便区分背景同层。
      //主意：它只在黑和白之间的色系才起作用，其它颜色下不起作用。
      noLevel: {
        type: Boolean,
        default: false
      },
      //是否开启磨砂背景。只有是黑白灰色系才能使用。
      blur: {
        type: Boolean,
        default: false
      },
      url: {
        type: String,
        default: ""
      },
      round: {
        type: [Number, Array],
        default: 0
      }
    }),
    emits: ["click", "longpress", "touchend", "touchstart", "touchcancel", "mousedown", "mouseup", "mouseleave"],
    setup(__props, { emit: __emit }) {
      const store = useTmpiniaStore();
      const props = __props;
      const emits = __emit;
      const tmcfg = vue.computed(() => store.tmStore);
      const {
        dark: dark2,
        isNvue,
        customCSSStyle,
        customClass,
        parentClass,
        transparent,
        _props,
        proxy,
        blur,
        round,
        margin,
        padding,
        theme: theme2
      } = useTheme(vue.computed(() => props), tmcfg);
      const tmcomputed = theme2({ text: blur.value && tmcfg.value.os == "ios" && isNvue.value ? true : null });
      const _width = vue.computed(() => props.width + padding.value[0] + padding.value[2]);
      const _height = vue.computed(() => props.height + padding.value[1] + padding.value[3]);
      const _width_real = vue.computed(() => props.width);
      const _height_real = vue.computed(() => props.height);
      const _blue_sheet = vue.ref(true);
      const blurEffect = vue.computed(() => {
        if (props.blur === true && dark2.value)
          return "dark";
        if (props.blur === true && !dark2.value)
          return "extralight";
        return "none";
      });
      vue.watch(
        () => dark2.value,
        () => {
        }
      );
      const _bgcolor = vue.computed(() => {
        var _a2;
        if (transparent.value === true)
          return `background-color:rgba(255,255,255,0);`;
        if (props.darkBgColor !== "" && dark2.value === true) {
          return `background-color:${props.darkBgColor};`;
        }
        if (props.linearColor.length == 2) {
          return {
            "background-image": `linear-gradient(${tmcomputed.value.linearDirectionStr},${props.linearColor[0]},${props.linearColor[1]})`
          };
        }
        if (((_a2 = tmcomputed.value.gradientColor) == null ? void 0 : _a2.length) == 2) {
          return tmcomputed.value.backgroundColorCss;
        }
        if (_props.value.noLevel && tmcomputed.value.isBlackAndWhite === true && dark2.value === true) {
          return `background-color: ${tmcomputed.value.inputcolor}`;
        }
        return `background-color: ${tmcomputed.value.backgroundColor}`;
      });
      const isLongPress = vue.ref(false);
      function longpress(e) {
        isLongPress.value = true;
        emits("longpress", e);
      }
      function touchstart(e) {
        isLongPress.value = true;
        emits("touchstart", e);
      }
      function touchend(e) {
        isLongPress.value = false;
        emits("touchend", e);
      }
      function touchcancel(e) {
        isLongPress.value = false;
        emits("touchcancel", e);
      }
      function mousedown(e) {
        isLongPress.value = true;
        emits("mousedown", e);
      }
      function mouseup(e) {
        isLongPress.value = false;
        emits("mouseup", e);
      }
      function mouseleave(e) {
        isLongPress.value = false;
        emits("mouseleave", e);
      }
      function onClick(e) {
        emits("click", e);
        if (typeof props.url === "string" && props.url) {
          uni.navigateTo({
            url: props.url,
            fail(result) {
              formatAppLog("log", "at tmui/components/tm-sheet/tm-sheet.vue:225", result);
            }
          });
        }
      }
      let textColor = vue.computed(() => {
        return tmcomputed.value.textColor;
      });
      vue.provide("appTextColor", textColor);
      return (_ctx, _cache) => {
        return _blue_sheet.value ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          "hover-class": (vue.unref(_props).url ? " opacity-7 " : "  ") + vue.unref(_props).hoverClass,
          blurEffect: blurEffect.value,
          onClick,
          onLongpress: longpress,
          onTouchend: touchend,
          onTouchstart: touchstart,
          onTouchcancel: touchcancel,
          onMousedown: mousedown,
          onMouseup: mouseup,
          onMouseleave: mouseleave,
          class: vue.normalizeClass(["flex flex-col noNvueBorder", vue.unref(parentClass), !_ctx.isDisabledRoundAndriod ? vue.unref(round) : ""]),
          style: vue.normalizeStyle([
            {
              marginLeft: vue.unref(margin)[0] + "rpx",
              marginTop: vue.unref(margin)[1] + "rpx",
              marginRight: vue.unref(margin)[2] + "rpx",
              marginBottom: vue.unref(margin)[3] + "rpx",
              paddingLeft: vue.unref(padding)[0] + "rpx",
              paddingTop: vue.unref(padding)[1] + "rpx",
              paddingRight: vue.unref(padding)[2] + "rpx",
              paddingBottom: vue.unref(padding)[3] + "rpx"
            },
            _height_real.value ? { height: _height.value + vue.unref(_props).unit } : "",
            _width_real.value ? { width: _width.value + vue.unref(_props).unit } : "",
            vue.unref(tmcomputed).borderCss,
            vue.unref(blur) && vue.unref(store).tmStore.os == "ios" && vue.unref(isNvue) === true ? "" : _bgcolor.value,
            !vue.unref(transparent) && vue.unref(_props).shadow > 0 ? vue.unref(tmcomputed).shadowColor : "",
            !vue.unref(transparent) && vue.unref(blur) ? { backdropFilter: "blur(6px)" } : "",
            vue.unref(customCSSStyle)
          ])
        }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["flex noNvueBorder flex-col flex-1", vue.unref(customClass)]),
              style: vue.normalizeStyle(vue.unref(_props).contStyle)
            },
            [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ],
            6
            /* CLASS, STYLE */
          )
        ], 46, ["hover-class", "blurEffect"])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const tmSheet = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-c6f3e58c"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-sheet/tm-sheet.vue"]]);
  const _sfc_main$x = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-text",
    props: __spreadProps(__spreadValues({}, custom_props), {
      label: {
        type: [String, Number],
        default: ""
      },
      fontSize: {
        type: [Number],
        default: 28
      },
      color: {
        type: String,
        default: ""
      },
      selectable: {
        type: [Boolean],
        default: false
      },
      unit: {
        type: String,
        default: "rpx"
      },
      parentClass: {
        type: String,
        default: ""
      },
      lineHeight: {
        type: [Number, String],
        default: "auto"
      }
    }),
    emits: ["click"],
    setup(__props, { emit: __emit }) {
      const store = useTmpiniaStore();
      const props = __props;
      const emits = __emit;
      const _parentClass = vue.computed(() => props.parentClass);
      const tmcfg = vue.computed(() => store.tmStore);
      const customCSSStyle = vue.computed(() => computedStyle$1(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const _label = vue.computed(() => props.label);
      const _fontSize = vue.computed(() => {
        var _a2, _b2, _c2;
        return Number(props.fontSize) * ((_c2 = (_b2 = (_a2 = store == null ? void 0 : store.tmuiConfig) == null ? void 0 : _a2.themeConfig) == null ? void 0 : _b2.globalFontSizeRatio) != null ? _c2 : 1);
      });
      const appTextColor = vue.inject(
        "appTextColor",
        vue.computed(() => void 0)
      );
      const textColor = vue.computed(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        let isColorHex = theme$1.isCssColor(props.color);
        if (isColorHex)
          return props.color;
        if (props.color && !isColorHex) {
          let nowcolor = theme$1.getColor(props.color);
          return nowcolor.csscolor;
        }
        if (!appTextColor) {
          if (isDark)
            return "rgba(252, 252, 252, 1.0)";
          return "rgba(34, 34, 34, 1.0)";
        }
        if (appTextColor.value) {
          return appTextColor.value;
        }
        return "rgba(34, 34, 34, 1.0)";
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            "render-whole": true,
            class: vue.normalizeClass(["flex text-view nv", [_parentClass.value]])
          },
          [
            vue.createElementVNode("text", {
              onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
              selectable: __props.selectable,
              "user-select": __props.selectable,
              class: vue.normalizeClass([__props.fontSize ? "" : "text-size-m", customClass.value]),
              style: vue.normalizeStyle([
                props.lineHeight == "auto" ? { lineHeight: (_fontSize.value ? _fontSize.value * 1.3 : 42) + props.unit } : {},
                props.lineHeight > 0 ? { lineHeight: props.lineHeight + props.unit } : {},
                {
                  color: textColor.value
                },
                _fontSize.value ? { fontSize: _fontSize.value + props.unit } : "",
                customCSSStyle.value
              ])
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createTextVNode(
                  vue.toDisplayString(_label.value),
                  1
                  /* TEXT */
                )
              ], true)
            ], 14, ["selectable", "user-select"])
          ],
          2
          /* CLASS */
        );
      };
    }
  });
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-3acfd808"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-text/tm-text.vue"]]);
  const _sfc_main$w = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-icon",
    props: __spreadProps(__spreadValues({}, custom_props), {
      fontSize: {
        type: [Number],
        default: 34
      },
      color: {
        type: String,
        default: ""
      },
      /** 自定义图标规则为:myicon-music-e617,图标前缀和字体名称相同-图标类名-图标unicode符 */
      name: {
        type: String,
        //图标名称。
        default: ""
      },
      spin: {
        type: [Boolean],
        default: false
      },
      unit: {
        type: String,
        default: "rpx"
      },
      //-1表示自动
      lineHeight: {
        type: [Number],
        default: -1
      },
      rotate: {
        type: Boolean,
        default: false
      },
      rotateDeg: {
        type: Number,
        default: 0
      },
      /**
       * 为了提高响应速度，只有开启了自定图标显示功能才会去解析用户自定义图标规则名称
       */
      customicon: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["click", "longpress"],
    setup(__props, { emit: __emit }) {
      var _a2, _b2;
      const store = useTmpiniaStore();
      const props = __props;
      const _rotateDeg = vue.computed(() => props.rotateDeg);
      const emits = __emit;
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = vue.computed(() => store.tmStore);
      const customCSSStyle = vue.computed(() => computedStyle$1(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      vue.computed(() => computedTheme$1(props, isDark.value, tmcfg.value));
      function clickhandle(e) {
        emits("click", e);
      }
      const appTextColor = vue.inject(
        "appTextColor",
        vue.computed(() => void 0)
      );
      const textColor = vue.computed(() => {
        if (props.followTheme && store.tmStore.color)
          return store.tmStore.color;
        let isColorHex = theme$1.isCssColor(props.color);
        if (isColorHex)
          return props.color;
        if (props.color && !isColorHex) {
          let nowcolor = theme$1.getColor(props.color);
          return nowcolor.csscolor;
        }
        if (appTextColor.value)
          return appTextColor.value;
        return "rgba(34, 34, 34, 1.0)";
      });
      const fontSizeComputed = vue.computed(() => {
        let strc = {
          fontSize: (props.fontSize || 30) + props.unit,
          lineHeight: props.lineHeight > -1 ? props.lineHeight + props.unit : (props.fontSize || 30) + props.unit
        };
        if (props.lineHeight == 0) {
          delete strc.lineHeight;
        }
        return strc;
      });
      const isImg = vue.computed(() => {
        if (props.name[0] == "." || props.name[0] == "@" || props.name[0] == "/" || props.name[0] == "~" || props.name.substring(0, 5) == "data:" || props.name.substring(0, 4) == "http" || props.name.substring(0, 5) == "https" || props.name.substring(0, 3) == "ftp") {
          return true;
        }
        return false;
      });
      const prefx = vue.computed(() => {
        var _a3;
        let prefix = (_a3 = props.name.split("-")) == null ? void 0 : _a3[0];
        return prefix;
      });
      const iconComputed = vue.computed(() => {
        if (isImg.value)
          return props.name;
        if (props.customicon) {
          try {
            let names = props.name.split("-");
            if (/^e[0-9|a-z|A-Z]{3}/.test(names[names.length - 1])) {
              let clasName = props.name.substring(0, props.name.lastIndexOf("-"));
              return clasName;
            }
          } catch (e) {
          }
        }
        return props.name;
      });
      const spinComputed = vue.computed(() => props.spin);
      const custom_space_size = vue.inject("custom_space_size", [0, 0]);
      vue.computed(() => Math.ceil(props.fontSize || 34) + custom_space_size[0]);
      vue.computed(() => Math.ceil(props.fontSize || 34) + custom_space_size[1]);
      vue.watch(spinComputed, () => {
      });
      vue.onBeforeMount(() => {
      });
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            "render-whole": true,
            class: "flex flex-row flex-row-center-center",
            style: vue.normalizeStyle([
              {
                marginRight: vue.unref(custom_space_size)[0] + "rpx",
                marginBottom: vue.unref(custom_space_size)[1] + "rpx"
              }
            ])
          },
          [
            !isImg.value ? (vue.openBlock(), vue.createElementBlock(
              "text",
              {
                key: 0,
                onClick: clickhandle,
                onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
                class: vue.normalizeClass([props.rotate ? "ani" : "", spinComputed.value ? "spin" : "", "text-size-n d-inline-block", prefx.value, iconComputed.value, customClass.value]),
                style: vue.normalizeStyle([{ transform: `rotate(${_rotateDeg.value}deg)` }, fontSizeComputed.value, { color: textColor.value }, customCSSStyle.value])
              },
              null,
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            )) : vue.createCommentVNode("v-if", true),
            isImg.value ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 1,
              "render-whole": true,
              onClick: clickhandle,
              onLongpress: _cache[1] || (_cache[1] = ($event) => emits("longpress", $event)),
              ref: "icon",
              src: iconComputed.value,
              class: vue.normalizeClass([props.rotate ? "ani" : "", spinComputed.value ? "spin" : "", customClass.value]),
              style: vue.normalizeStyle([
                { transform: `rotate(${_rotateDeg.value}deg)` },
                {
                  width: (props.fontSize || 30) + props.unit,
                  height: (props.fontSize || 30) + props.unit
                },
                customCSSStyle.value
              ])
            }, null, 46, ["src"])) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        );
      };
    }
  });
  const tmIcon = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-e3e455a0"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-icon/tm-icon.vue"]]);
  const _sfc_main$v = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-translate",
    props: __spreadProps(__spreadValues({}, custom_props), {
      duration: {
        type: Number,
        default: 300
      },
      delay: {
        type: Number,
        default: 0
      },
      //动画名称
      name: {
        type: String,
        default: "fade"
        //fade,left,right,up,down,zoom
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      height: {
        type: [Number, String],
        default: 0
      },
      width: {
        type: [Number, String],
        default: 0
      },
      //是否反向动画
      reverse: {
        type: [Boolean, String],
        default: false
      },
      //每变动一次，就重置动画一下，这个属性不对外，特殊情况使用。
      initByWechat: {
        type: Boolean,
        default: false
      }
    }),
    emits: ["start", "end", "click"],
    setup(__props, { expose: __expose, emit: __emit }) {
      var _a2, _b2;
      const props = __props;
      const emits = __emit;
      function hanlder(e) {
        emits("click", e);
      }
      (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const customCSSStyle = vue.computed(() => computedStyle$1(props));
      const customClass = vue.computed(() => computedClass(props));
      const computedHeight = vue.computed(() => {
        if (!props.height || !Number(props.height)) {
          return 0;
        }
        if (String(props.height).indexOf("px") > -1 || String(props.height).indexOf("rpx") > -1) {
          return String(props.height);
        }
        return String(props.height) + "rpx";
      });
      const computedWidth = vue.computed(() => {
        if (!props.width) {
          return 0;
        }
        if (String(props.width).indexOf("px") > -1 || String(props.width).indexOf("rpx") > -1) {
          return props.width;
        }
        return props.width + "rpx";
      });
      const animationName = vue.computed(() => props.name || "fade");
      const durationtos = vue.ref(props.duration);
      const computedReverse = vue.computed(() => props.reverse);
      const reverseAniPrefxname = vue.computed(() => computedReverse.value ? "-reverse" : "");
      const animationClassName = vue.ref(animationName.value + reverseAniPrefxname.value);
      const animationStatus = vue.ref(0);
      const tmid = vue.ref(Number(uni.$tm.u.getUid(3)));
      const isLoadEl = vue.ref(false);
      vue.ref(null);
      vue.watch([() => props.initByWechat, () => props.name], () => {
        reset();
      });
      vue.watch([() => props.name], () => {
        animationClassName.value = animationName.value + reverseAniPrefxname.value;
      });
      function init() {
        vue.nextTick(() => {
          isLoadEl.value = true;
          if (props.autoPlay == true && !props.disabled) {
            vue.nextTick(() => play());
          }
        });
      }
      function play() {
        if (props.disabled == true)
          return;
        animationStatus.value = 0;
        noNvueAmations();
      }
      function stop() {
        if (props.disabled == true)
          return;
        clearTimeout(tmid.value);
        animationStatus.value = 0;
      }
      function reset() {
        stop();
        animationStatus.value = 0;
      }
      __expose({
        init,
        play,
        stop,
        reset
      });
      vue.onMounted(() => init());
      vue.onUnmounted(() => {
        clearTimeout(tmid.value);
        animationStatus.value = 0;
      });
      function noNvueAmations() {
        clearTimeout(tmid.value);
        tmid.value = setTimeout(() => {
          if (computedReverse.value) {
            animationClassName.value = animationName.value;
          } else {
            animationClassName.value = animationName.value + "-reverse";
          }
          tmid.value = setTimeout(() => {
            emits("end");
          }, props.duration);
        }, 20);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            ref: "bodywk",
            onClick: hanlder,
            class: vue.normalizeClass([customClass.value, "overflow"]),
            style: vue.normalizeStyle([computedHeight.value ? { height: computedHeight.value } : "", computedWidth.value ? { width: computedWidth.value } : "", customCSSStyle.value])
          },
          [
            isLoadEl.value ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                ref: "nvueElAni",
                style: vue.normalizeStyle({
                  transitionDuration: `${durationtos.value}ms`,
                  transitionTimingFunction: "cubic-bezier(.04,.78,.42,1)"
                }),
                class: vue.normalizeClass(["flex-col flex ", animationClassName.value, customClass.value])
              },
              [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ],
              6
              /* CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        );
      };
    }
  });
  const tmTranslate = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-1c8a1639"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-translate/tm-translate.vue"]]);
  const _sfc_main$u = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-image",
    props: __spreadProps(__spreadValues({}, custom_props), {
      //外部间隙
      margin: {
        type: Array,
        default: () => [0, 0]
      },
      //内部间隙
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      color: {
        type: String,
        default: "white"
      },
      transprent: {
        type: [Boolean, String],
        default: true
      },
      border: {
        type: Number,
        default: 0
      },
      width: {
        type: [Number],
        default: 200,
        required: true
      },
      height: {
        type: [Number],
        default: 200,
        required: true
      },
      src: {
        type: String,
        default: "",
        required: true
      },
      errorIcon: {
        type: String,
        default: ""
      },
      errorLabel: {
        type: String,
        default: "重新加载"
      },
      loadIcon: {
        type: String,
        default: ""
      },
      //是否显示加载动画。
      showLoad: {
        type: Boolean,
        default: true
      },
      //是否开启预览。
      preview: {
        type: [Boolean],
        default: false
      },
      //是否开启图片额外插槽显示内容。
      extra: {
        type: [Boolean],
        default: false
      },
      extraPosition: {
        type: String,
        default: "in"
        //in:叠加图片上显示,out：图片下方显示,
      },
      //展示关闭删除按钮。
      delete: {
        type: [Boolean],
        default: false
      },
      //是否允许点击delete图标关闭自己，如果为false,将仅触发delete事件，本身图片不会被关闭。
      allowDelete: {
        type: [Boolean],
        default: true
      },
      //图片绽放模式。
      //同官方阅读：https://uniapp.dcloud.io/component/image.html
      model: {
        type: String,
        default: "scaleToFill"
      },
      unit: {
        type: String,
        default: "rpx"
      },
      //开启长按图片显示识别小程序码菜单,与preview不冲突,可点击预览也可长按,默认不开启
      showMenuByLongPress: {
        type: [Boolean],
        default: false
      }
    }),
    emits: ["load", "error", "click", "delete", "close"],
    setup(__props, { emit: __emit }) {
      var _a2, _b2, _c2;
      const aniplay = vue.ref(null);
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const emits = __emit;
      const props = __props;
      if (!props.height && !props.width) {
        formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:204", "错误：图片宽度和高度必须设置一个");
      }
      const img_width = vue.computed(() => {
        return props.width;
      });
      const img_height = vue.computed(() => {
        return props.height - props.padding[1];
      });
      const img_src = vue.computed(() => props.src);
      const loading = vue.ref(true);
      const error = vue.ref(false);
      const isRmove = vue.ref(false);
      const _loadIcon = vue.ref(props.loadIcon || "tmicon-shuaxin");
      const _errorIcon = vue.ref(props.errorIcon || "tmicon-exclamation-circle");
      let parent = proxy == null ? void 0 : proxy.$parent;
      while (parent) {
        if ((parent == null ? void 0 : parent.tmImageGroup) == "tmImageGroup" || !parent) {
          break;
        } else {
          parent = (_c2 = parent == null ? void 0 : parent.$parent) != null ? _c2 : void 0;
        }
      }
      const ImagGrupList = vue.inject(
        "ImagGrupList",
        vue.computed(() => [])
      );
      if (parent == null ? void 0 : parent.pushKey) {
        parent.pushKey({
          width: img_width.value,
          height: img_width.value,
          src: props.src
        });
      }
      vue.watch(img_src, () => {
        loading.value = true;
        error.value = false;
        if (parent == null ? void 0 : parent.pushKey) {
          parent.pushKey({
            width: img_width.value,
            height: img_width.value,
            src: props.src
          });
        }
      });
      function imageLoad(event) {
        loading.value = false;
        emits("load", event);
      }
      function imageError(event) {
        formatAppLog("error", "at tmui/components/tm-image/tm-image.vue:260", "图片加载错:" + props.src, event);
        error.value = true;
        loading.value = false;
        emits("error", event);
      }
      function imageClick(event) {
        emits("click", event);
        if (props.preview) {
          let list = ImagGrupList.value.length > 0 ? ImagGrupList.value : [props.src];
          uni.previewImage({
            urls: list,
            current: props.src
          });
        }
      }
      function del2() {
        return __async(this, null, function* () {
          var _a3, _b3;
          isRmove.value = false;
          if (!props.allowDelete) {
            emits("delete", props.src);
            return;
          }
          if ((_a3 = aniplay.value) == null ? void 0 : _a3.play) {
            (_b3 = aniplay.value) == null ? void 0 : _b3.play();
          } else {
            isRmove.value = true;
            emits("close", props.src);
          }
        });
      }
      function aniEnd() {
        isRmove.value = true;
        emits("close", props.src);
      }
      function reloadImg() {
        loading.value = true;
        error.value = false;
      }
      return (_ctx, _cache) => {
        return !isRmove.value ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            style: vue.normalizeStyle([
              {
                margin: props.margin[0] + props.unit + " " + (props.margin[1] || props.margin[0]) + props.unit
              }
            ])
          },
          [
            vue.createVNode(tmTranslate, {
              width: img_width.value + props.padding[0] * 2 + props.unit,
              onEnd: aniEnd,
              ref_key: "aniplay",
              ref: aniplay,
              autoPlay: false,
              name: "zoom",
              reverse: ""
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(tmSheet, {
                  margin: [0],
                  color: props.color,
                  transprent: props.transprent,
                  round: props.round,
                  border: props.border,
                  padding: [props.padding[0], 0],
                  class: vue.normalizeClass(["round-" + props.round]),
                  width: img_width.value - props.padding[0] * 2,
                  unit: props.unit,
                  height: img_height.value - props.padding[0] * 2
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass([`pb-${props.padding[1]}`, "flex flex-col flex-col-center-center", "relative"])
                      },
                      [
                        !error.value ? (vue.openBlock(), vue.createElementBlock("image", {
                          key: 0,
                          onLoad: imageLoad,
                          onError: imageError,
                          "show-menu-by-longpress": props.showMenuByLongPress,
                          onClick: imageClick,
                          class: vue.normalizeClass(["round-" + props.round, loading.value ? "opacity-0" : ""]),
                          src: img_src.value,
                          style: vue.normalizeStyle([{ width: img_width.value + props.unit, height: img_height.value + props.unit }]),
                          mode: props.model
                        }, null, 46, ["show-menu-by-longpress", "src", "mode"])) : vue.createCommentVNode("v-if", true),
                        loading.value && !error.value ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 1,
                            style: vue.normalizeStyle([{ width: img_width.value + props.unit, height: img_height.value + 10 + props.unit }]),
                            class: "flex flex-center opacity-3 absolute l-0 t-0"
                          },
                          [
                            vue.renderSlot(_ctx.$slots, "load", {}, () => [
                              props.showLoad ? (vue.openBlock(), vue.createBlock(tmIcon, {
                                key: 0,
                                "font-size": 26,
                                spin: "",
                                name: _loadIcon.value
                              }, null, 8, ["name"])) : vue.createCommentVNode("v-if", true)
                            ])
                          ],
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true),
                        !loading.value && error.value ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 2,
                            style: vue.normalizeStyle([{ width: img_width.value + props.unit, height: img_height.value + props.unit }]),
                            class: "flex flex-col flex-center opacity-5 absolute l-0 t-0"
                          },
                          [
                            vue.renderSlot(_ctx.$slots, "error", {}, () => [
                              vue.createElementVNode("view", { onClick: reloadImg }, [
                                vue.createVNode(tmIcon, {
                                  userInteractionEnabled: false,
                                  name: _errorIcon.value
                                }, null, 8, ["name"]),
                                vue.createVNode(__easycom_0$4, {
                                  userInteractionEnabled: false,
                                  _class: "pt-10",
                                  "font-size": 26,
                                  label: props.errorLabel
                                }, null, 8, ["label"])
                              ])
                            ])
                          ],
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createCommentVNode(" extra "),
                        props.extra ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 3,
                            eventPenetrationEnabled: true,
                            class: vue.normalizeClass([props.extraPosition == "in" ? "absolute l-0 b-0 zIndex-5 " : "", "flex flex-col flex-col-bottom-start "]),
                            style: vue.normalizeStyle([
                              props.extra && props.extraPosition == "in" ? { height: img_height.value + props.unit, width: img_width.value + props.unit } : "",
                              props.extra && props.extraPosition == "out" ? { width: img_width.value + props.unit } : ""
                            ])
                          },
                          [
                            vue.createElementVNode(
                              "view",
                              {
                                onClick: vue.withModifiers(imageClick, ["stop"]),
                                class: vue.normalizeClass(["flex flex-col flex-col-bottom-start flex-1"]),
                                style: vue.normalizeStyle([
                                  props.extra && props.extraPosition == "in" ? { height: img_height.value + props.unit, width: img_width.value + props.unit } : "",
                                  props.extra && props.extraPosition == "out" ? { width: img_width.value + props.unit } : ""
                                ])
                              },
                              [
                                vue.renderSlot(_ctx.$slots, "extra")
                              ],
                              4
                              /* STYLE */
                            )
                          ],
                          6
                          /* CLASS, STYLE */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createCommentVNode(" delete 展示删除按钮。 "),
                        props.delete ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 4,
                            class: "absolute r-4 t-4 flex flex-col flex-col-center-end zIndex-10",
                            style: vue.normalizeStyle([props.delete ? { width: img_width.value + props.unit } : ""])
                          },
                          [
                            vue.createVNode(tmIcon, {
                              onClick: del2,
                              color: "red",
                              name: "tmicon-times-circle-fill"
                            })
                          ],
                          4
                          /* STYLE */
                        )) : vue.createCommentVNode("v-if", true)
                      ],
                      2
                      /* CLASS */
                    )
                  ]),
                  _: 3
                  /* FORWARDED */
                }, 8, ["color", "transprent", "round", "border", "padding", "class", "width", "unit", "height"])
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["width"])
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  const tmImage = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-image/tm-image.vue"]]);
  const _sfc_main$t = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-button",
    props: __spreadProps(__spreadValues({}, custom_props), {
      transprent: {
        type: Boolean,
        default: false
      },
      followTheme: {
        type: Boolean,
        default: true
      },
      hoverClass: {
        type: String,
        default: "opacity-7"
      },
      /**
       * mini,small,normal,middle,large
       */
      size: {
        type: String,
        default: "normal"
      },
      fontSize: {
        type: Number,
        default: 0
      },
      fontColor: {
        type: String,
        default: ""
      },
      margin: {
        type: Array,
        default: () => [0, 16]
      },
      padding: {
        type: Array,
        default: () => [0, 0]
      },
      //不是同层背景，默认是同层，为false
      //如果输入框表单与tmshee在同一层下。他们的黑白暗黑背景色是相同的。为了区分这个问题，需要单独指示，以便区分背景同层。
      //主意：它只在黑和白之间的色系才起作用，其它颜色下不起作用。
      noLevel: {
        type: Boolean,
        default: false
      },
      shadow: {
        type: Number,
        default: 0
      },
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      //如果为true，采用块状flex布局，自动宽和高度。
      block: {
        type: Boolean,
        default: false
      },
      round: {
        type: Number,
        default: 0
      },
      loading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      //提供时，点击后会中转到对应页面。
      url: {
        type: String,
        default: ""
      },
      label: {
        type: String,
        default: ""
      },
      icon: {
        type: String,
        default: ""
      },
      /**
       * submit,reset 在tm-form中使用。
       */
      formType: {
        type: String,
        default: ""
      },
      //开放能力
      openType: {
        type: String,
        default: ""
      },
      //打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      appParameter: {
        type: String,
        default: ""
      },
      sessionFrom: {
        type: String,
        default: ""
      },
      sendMessageTitle: {
        type: String,
        default: ""
      },
      sendMessagePath: {
        type: String,
        default: ""
      },
      sendMessageImg: {
        type: String,
        default: ""
      },
      sendMessageCard: {
        type: String,
        default: ""
      },
      groupId: {
        type: String,
        default: ""
      },
      guildId: {
        type: String,
        default: ""
      },
      publicId: {
        type: String,
        default: ""
      },
      unit: {
        type: String,
        default: "rpx"
      },
      darkBgColor: {
        type: String,
        default: ""
      },
      /**禁用后的主题色 */
      disabledColor: {
        type: String,
        default: "grey-1"
      }
    }),
    emits: ["click", "touchstart", "touchmove", "touchcancel", "touchend", "tap", "longpress", "getphonenumber", "getUserInfo", "getUserProfile", "error", "opensetting", "launchapp", "contact", "chooseavatar"],
    setup(__props, { emit: __emit }) {
      var _a2, _b2, _c2, _d2;
      const store = useTmpiniaStore();
      const emits = __emit;
      vue.ref(false);
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const props = __props;
      const formtype = vue.computed(() => props.formType);
      let FormParent = null;
      let FilterParent = null;
      if (formtype.value == "reset" || formtype.value == "submit") {
        FormParent = proxy == null ? void 0 : proxy.$parent;
        while (FormParent) {
          if ((FormParent == null ? void 0 : FormParent.tmFormComnameId) == "tmFormId" || !FormParent) {
            break;
          } else {
            FormParent = (_c2 = FormParent == null ? void 0 : FormParent.$parent) != null ? _c2 : void 0;
          }
        }
      }
      if (formtype.value == "filterCancel" || formtype.value == "filterConfirm") {
        FilterParent = proxy == null ? void 0 : proxy.$parent;
        while (FilterParent) {
          if ((FilterParent == null ? void 0 : FilterParent.FilterMenu) == "FilterMenu" || !FilterParent) {
            break;
          } else {
            FilterParent = (_d2 = FilterParent == null ? void 0 : FilterParent.$parent) != null ? _d2 : void 0;
          }
        }
      }
      const _noLevel = vue.computed(() => props.noLevel);
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      let textColor = vue.computed(() => {
        if (theme$1.isCssColor(_fontColor.value))
          return _fontColor.value;
        if (!props.fontColor)
          return tmcomputed.value.textColor;
        return theme$1.getColor(props.fontColor).value;
      });
      const customCSSStyle = vue.computed(() => {
        return __spreadValues({}, computedStyle$1(props));
      });
      const customClass = vue.computed(() => computedClass(props));
      const tmcfg = vue.computed(() => store.tmStore);
      const _shadow = vue.computed(() => {
        var _a3, _b3, _c3, _d3;
        return props.shadow || ((_d3 = (_c3 = (_b3 = (_a3 = store.tmuiConfig.themeConfig) == null ? void 0 : _a3.component) == null ? void 0 : _b3.button) == null ? void 0 : _c3.shadow) != null ? _d3 : 0);
      });
      const tmcomputed = vue.computed(() => {
        let nprops = __spreadProps(__spreadValues({}, props), { shadow: _shadow.value });
        if (_disabled.value) {
          nprops.color = props.disabledColor;
        }
        return computedTheme$1(__spreadValues({}, nprops), isDark.value, tmcfg.value);
      });
      const isclickOn = vue.ref(false);
      const _load = vue.computed(() => props.loading);
      const _disabled = vue.computed(() => props.disabled);
      const _label = vue.computed(() => props.label);
      const _icon = vue.computed(() => props.icon);
      vue.computed(() => {
        if (props.outlined && props.border == 0)
          return 1;
        if (props.border > 0)
          return props.border;
        return 0;
      });
      const sizeObj = vue.computed(() => {
        let ptest = {
          block: { w: 0, h: 80, fontSize: 28, round: 3 },
          mini: { w: 88, h: 36, fontSize: 20, round: 3 },
          small: { w: 120, h: 56, fontSize: 22, round: 3 },
          normal: { w: 220, h: 80, fontSize: 28, round: 3 },
          middle: { w: 300, h: 80, fontSize: 30, round: 3 },
          large: { w: 375, h: 80, fontSize: 32, round: 3 }
        };
        if (props.unit == "px") {
          let key = "block";
          let key2 = "w";
          for (key in ptest) {
            for (key2 in ptest[key]) {
              ptest[key][key2] = uni.upx2px(ptest[key][key2]);
            }
          }
        }
        return ptest;
      });
      const btnSizeObj = vue.computed(() => {
        var _a3, _b3, _c3, _d3, _e2, _f2, _g2, _h2;
        let fontSize2 = props.fontSize || 0;
        if (props.block) {
          return {
            w: 0,
            h: props.height || sizeObj.value.block.h,
            fontSize: fontSize2 || sizeObj.value.block.fontSize,
            round: props.round == -1 ? 0 : props.round || ((_d3 = (_c3 = (_b3 = (_a3 = store.tmuiConfig.themeConfig) == null ? void 0 : _a3.component) == null ? void 0 : _b3.button) == null ? void 0 : _c3.round) != null ? _d3 : 0) || sizeObj.value.normal.round
          };
        }
        return {
          w: props.width || sizeObj.value[props.size].w,
          h: props.height || sizeObj.value[props.size].h,
          fontSize: fontSize2 || sizeObj.value[props.size].fontSize,
          round: props.round == -1 ? 0 : props.round || ((_h2 = (_g2 = (_f2 = (_e2 = store.tmuiConfig.themeConfig) == null ? void 0 : _e2.component) == null ? void 0 : _f2.button) == null ? void 0 : _g2.round) != null ? _h2 : 0) || sizeObj.value[props.size].round
        };
      });
      const _fontColor = vue.computed(() => props.fontColor);
      const _transprent = vue.computed(() => props.transprent);
      const _margin = vue.computed(() => {
        if (props.margin.length == 1)
          return [props.margin[0], props.margin[0], props.margin[0], props.margin[0]];
        if (props.margin.length == 2)
          return [props.margin[0], props.margin[1], props.margin[0], props.margin[1]];
        if (props.margin.length == 3)
          return [props.margin[0], props.margin[1], props.margin[2], 0];
        if (props.margin.length == 4)
          return [props.margin[0], props.margin[1], props.margin[2], props.margin[3]];
        return [0, 0, 0, 0];
      });
      const _padding = vue.computed(() => {
        if (props.padding.length == 1)
          return [props.padding[0], props.padding[0], props.padding[0], props.padding[0]];
        if (props.padding.length == 2)
          return [props.padding[0], props.padding[1], props.padding[0], props.padding[1]];
        if (props.padding.length == 3)
          return [props.padding[0], props.padding[1], props.padding[2], 0];
        if (props.padding.length == 4)
          return [props.padding[0], props.padding[1], props.padding[2], props.padding[3]];
        return [0, 0, 0, 0];
      });
      const _bgcolor = vue.computed(() => {
        var _a3;
        if (_transprent.value === true)
          return `background-color:rgba(255,255,255,0);`;
        if (props.darkBgColor !== "" && isDark.value === true) {
          return `background-color:${props.darkBgColor};`;
        }
        if (props.linearColor.length == 2) {
          return {
            "background-image": `linear-gradient(${tmcomputed.value.linearDirectionStr},${props.linearColor[0]},${props.linearColor[1]})`
          };
        }
        if (((_a3 = tmcomputed.value.gradientColor) == null ? void 0 : _a3.length) == 2) {
          return tmcomputed.value.backgroundColorCss;
        }
        if (_noLevel.value && tmcomputed.value.isBlackAndWhite === true && isDark.value === true) {
          return `background-color: ${tmcomputed.value.inputcolor}`;
        }
        return `background-color: ${tmcomputed.value.backgroundColor}`;
      });
      function touchstart(e) {
        isclickOn.value = true;
        emits("touchstart", e);
      }
      function touchend(e) {
        isclickOn.value = false;
        emits("touchend", e);
      }
      function touchcancel(e) {
        isclickOn.value = false;
        emits("touchcancel", e);
      }
      function onclick(e) {
        if (FormParent != null && typeof FormParent != "undefined" && formtype.value && !props.loading) {
          FormParent[formtype.value]();
        }
        if (FilterParent != null && typeof FilterParent != "undefined" && formtype.value && !props.loading) {
          FilterParent[formtype.value]();
        }
        if (props.loading)
          return;
        emits("click", e);
        if (props.url !== "" && typeof props.url === "string") {
          let url = props.url;
          if (url[0] !== "/")
            url = "/" + url;
          uni.navigateTo({
            url
          });
          return;
        }
        if (props.openType == "getUserInfo" || props.openType == "getUserProfile")
          ;
      }
      vue.provide("appTextColor", textColor);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("button", {
          onClick: onclick,
          onTouchstart: touchstart,
          onTouchend: touchend,
          onLongpress: _cache[0] || (_cache[0] = ($event) => emits("longpress", $event)),
          onTouchcancel: touchcancel,
          onTouchmove: _cache[1] || (_cache[1] = ($event) => emits("touchmove", $event)),
          onGetphonenumber: _cache[2] || (_cache[2] = ($event) => emits("getphonenumber", $event)),
          onError: _cache[3] || (_cache[3] = ($event) => emits("error", $event)),
          onOpensetting: _cache[4] || (_cache[4] = ($event) => emits("opensetting", $event)),
          onLaunchapp: _cache[5] || (_cache[5] = ($event) => emits("launchapp", $event)),
          onContact: _cache[6] || (_cache[6] = ($event) => emits("contact", $event)),
          onChooseavatar: _cache[7] || (_cache[7] = ($event) => emits("chooseavatar", $event)),
          "form-type": props.formType,
          openType: props.openType,
          appParameter: props.appParameter,
          sessionFrom: props.sessionFrom,
          sendMessageTitle: props.sendMessageTitle,
          sendMessagePath: props.sendMessagePath,
          sendMessageImg: props.sendMessageImg,
          sendMessageCard: props.sendMessageCard,
          loading: _load.value,
          disabled: _disabled.value,
          "group-id": props.groupId,
          "guild-id": props.guildId,
          "public-id": props.publicId,
          "hover-start-time": 1e7,
          "hover-stop-propagation": "",
          class: vue.normalizeClass([
            "button alipay flex flex-row flex-row-center-center",
            isclickOn.value && !_disabled.value && !_load.value ? props.hoverClass + " bhover" : "",
            !_disabled.value && !_load.value ? "webpc" : "",
            _load.value || _disabled.value ? "opacity-8" : "",
            !_ctx.isDisabledRoundAndriod ? `round-${btnSizeObj.value.round}` : "",
            customClass.value
          ]),
          style: vue.normalizeStyle([
            {
              marginLeft: _margin.value[0] + "rpx",
              marginTop: _margin.value[1] + "rpx",
              marginRight: _margin.value[2] + "rpx",
              marginBottom: _margin.value[3] + "rpx",
              paddingLeft: _padding.value[0] + "rpx",
              paddingTop: _padding.value[1] + "rpx",
              paddingRight: _padding.value[2] + "rpx",
              paddingBottom: _padding.value[3] + "rpx"
            },
            {
              height: btnSizeObj.value.h + props.unit,
              fontSize: btnSizeObj.value.fontSize + props.unit,
              color: vue.unref(textColor),
              lineHeight: btnSizeObj.value.h + props.unit
            },
            btnSizeObj.value.w && !props.block ? { width: btnSizeObj.value.w + props.unit } : "",
            tmcomputed.value.borderCss,
            _bgcolor.value,
            !_transprent.value && _shadow.value > 0 && !props.text ? tmcomputed.value.shadowColor : "",
            customCSSStyle.value
          ])
        }, [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            _icon.value && !_load.value ? (vue.openBlock(), vue.createBlock(tmIcon, {
              key: 0,
              lineHeight: btnSizeObj.value.fontSize * 0.9,
              userInteractionEnabled: false,
              color: _fontColor.value,
              _class: _label.value ? "pr-10" : "",
              unit: props.unit,
              fontSize: btnSizeObj.value.fontSize * 0.9,
              name: _icon.value
            }, null, 8, ["lineHeight", "color", "_class", "unit", "fontSize", "name"])) : vue.createCommentVNode("v-if", true),
            vue.createTextVNode(
              " " + vue.toDisplayString(_label.value),
              1
              /* TEXT */
            )
          ], true)
        ], 46, ["form-type", "openType", "appParameter", "sessionFrom", "sendMessageTitle", "sendMessagePath", "sendMessageImg", "sendMessageCard", "loading", "disabled", "group-id", "guild-id", "public-id"]);
      };
    }
  });
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-f3634985"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-button/tm-button.vue"]]);
  const _sfc_main$s = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-input",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      var _a2, _b2, _c2;
      const store = useTmpiniaStore();
      const emits = __emit;
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const props = __props;
      let parentFormItem = proxy == null ? void 0 : proxy.$parent;
      while (parentFormItem) {
        if ((parentFormItem == null ? void 0 : parentFormItem.tmFormComnameFormItem) == "tmFormComnameFormItem" || !parentFormItem) {
          break;
        } else {
          parentFormItem = (_c2 = parentFormItem == null ? void 0 : parentFormItem.$parent) != null ? _c2 : void 0;
        }
      }
      const isAndroid = vue.ref(false);
      isAndroid.value = uni.getSystemInfoSync().osName == "android" ? true : false;
      const _height = vue.computed(() => props.height);
      const _inputPadding = vue.computed(() => {
        if (props.search !== "" || props.searchLabel !== "") {
          return [4, 0];
        }
        return props.inputPadding;
      });
      let timerId = NaN;
      function debounce2(func, wait = 500, immediate = false) {
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
      const propsDetail = vue.computed(() => {
        return __spreadProps(__spreadValues({}, props), {
          fontSize_px: uni.upx2px(props.fontSize)
        });
      });
      props.modelValue;
      const tmcfg = vue.computed(() => store.tmStore);
      vue.computed(() => computedStyle$1(props));
      vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const _requiredError = vue.ref(false);
      const _foucsActive = vue.ref(props.focus || false);
      vue.watch(
        () => props.focus,
        () => {
          _foucsActive.value = props.focus;
        }
      );
      const _color = vue.computed(() => {
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
      const tmcomputed = vue.computed(() => {
        const _props = __spreadProps(__spreadValues({}, props), { color: _color.value });
        return computedTheme$1(_props, isDark.value, tmcfg.value);
      });
      const showPasswordText = vue.ref(propsDetail.value.password);
      const showPasswordIcon = vue.computed(() => props.password);
      vue.ref(props.errorLabel);
      const _value = vue.ref(props.modelValue);
      const _valueLenChar = vue.computed(() => {
        let str = String(_value.value).split("");
        return str.length;
      });
      vue.watch(
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
        _value.value = e.detail.value;
        emits("input", e.detail.value);
        emits("update:modelValue", e.detail.value);
        return e.detail.value;
      }
      function inputClick(e, type) {
        if (type == "ali") {
          debounce2(
            () => {
              emits("click", e);
            },
            200,
            true
          );
          return;
        } else {
          debounce2(() => emits("click", e), 200, true);
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(tmSheet, {
          eventPenetrationEnabled: true,
          transprent: true,
          margin: props.margin,
          padding: props.padding
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(tmSheet, {
              transprent: props.transprent,
              round: props.round,
              "no-level": "",
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
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["flex flex-row relative", [propsDetail.value.type == "textarea" ? propsDetail.value.layoutAlign : "flex-row-center-start"]]),
                    onClick: _cache[7] || (_cache[7] = ($event) => inputClick($event, "")),
                    style: vue.normalizeStyle([propsDetail.value.autoHeight && propsDetail.value.type == "textarea" ? {} : { height: `${_height.value}rpx` }])
                  },
                  [
                    propsDetail.value.search || propsDetail.value.searchLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "px-9"
                    })) : vue.createCommentVNode("v-if", true),
                    vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
                    propsDetail.value.prefix ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "pr-16"
                    }, [
                      vue.createVNode(tmIcon, {
                        _style: "transition:color 0.24s",
                        "font-size": propsDetail.value.fontSize,
                        color: props.prefixColor,
                        name: propsDetail.value.prefix,
                        customicon: props.customicon
                      }, null, 8, ["font-size", "color", "name", "customicon"])
                    ])) : vue.createCommentVNode("v-if", true),
                    propsDetail.value.prefixLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 2,
                      class: "pr-24"
                    }, [
                      vue.createVNode(__easycom_0$4, {
                        _style: "transition:color 0.24s",
                        "font-size": propsDetail.value.fontSize,
                        color: props.prefixColor,
                        label: propsDetail.value.prefixLabel
                      }, null, 8, ["font-size", "color", "label"])
                    ])) : vue.createCommentVNode("v-if", true),
                    !isAndroid.value ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 3,
                      onClick: _cache[2] || (_cache[2] = ($event) => inputClick($event, "ali")),
                      class: "flex-1 relative flex-row flex",
                      style: vue.normalizeStyle([{ width: "0px" }])
                    }, [
                      vue.createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                      propsDetail.value.type != "textarea" ? (vue.openBlock(), vue.createElementBlock("input", {
                        key: 0,
                        class: "flex-1",
                        userInteractionEnabled: false,
                        value: _value.value,
                        focus: propsDetail.value.focus,
                        onFocus: focus,
                        onBlur: blur,
                        onConfirm: confirm,
                        onInput: inputHandler,
                        onKeyboardheightchange: _cache[0] || (_cache[0] = ($event) => emits("keyboardheightchange", $event)),
                        password: showPasswordText.value,
                        maxlength: propsDetail.value.maxlength,
                        disabled: propsDetail.value.disabled,
                        cursorSpacing: propsDetail.value.cursorSpacing,
                        confirmType: propsDetail.value.confirmType,
                        confirmHold: propsDetail.value.confirmHold,
                        autoBlur: propsDetail.value.autoBlur,
                        holdKeyboard: propsDetail.value.holdKeyboard,
                        adjustPosition: propsDetail.value.adjustPosition,
                        readonly: propsDetail.value.readyOnly,
                        type: propsDetail.value.type,
                        placeholder: propsDetail.value.placeholder,
                        style: vue.normalizeStyle([
                          {
                            height: `${_height.value}rpx`,
                            color: propsDetail.value.fontColor ? propsDetail.value.fontColor : tmcomputed.value.textColor,
                            "text-align": props.align,
                            fontSize: `${propsDetail.value.fontSize_px}px`,
                            transition: "color 0.24s"
                          }
                        ]),
                        "placeholder-style": `fontSize:${propsDetail.value.fontSize_px}px;${props.placeholderStyle}`,
                        "ready-only": propsDetail.value.readyOnly
                      }, null, 44, ["value", "focus", "password", "maxlength", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "readonly", "type", "placeholder", "placeholder-style", "ready-only"])) : vue.createCommentVNode("v-if", true),
                      propsDetail.value.type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
                        key: 1,
                        userInteractionEnabled: false,
                        value: _value.value,
                        focus: propsDetail.value.focus,
                        onFocus: focus,
                        onBlur: blur,
                        onConfirm: confirm,
                        onInput: inputHandler,
                        onKeyboardheightchange: _cache[1] || (_cache[1] = ($event) => emits("keyboardheightchange", $event)),
                        maxlength: propsDetail.value.maxlength,
                        disabled: propsDetail.value.disabled,
                        placeholder: propsDetail.value.placeholder,
                        cursorSpacing: propsDetail.value.cursorSpacing,
                        confirmHold: propsDetail.value.confirmHold,
                        autoBlur: propsDetail.value.autoBlur,
                        holdKeyboard: propsDetail.value.holdKeyboard,
                        cursor: propsDetail.value.cursor,
                        "show-confirm-bar": propsDetail.value.showConfirmBar,
                        selectionStart: propsDetail.value.selectionStart,
                        selectionEnd: propsDetail.value.selectionEnd,
                        "disable-default-padding": propsDetail.value.disableDefaultPadding,
                        fixed: propsDetail.value.fixed,
                        autoHeight: propsDetail.value.autoHeight,
                        readonly: propsDetail.value.readyOnly,
                        adjustPosition: propsDetail.value.adjustPosition,
                        type: propsDetail.value.type,
                        style: vue.normalizeStyle([
                          propsDetail.value.autoHeight ? {} : { height: `${_height.value}rpx` },
                          {
                            width: "auto",
                            "word-break": "break-word",
                            color: propsDetail.value.fontColor ? propsDetail.value.fontColor : tmcomputed.value.textColor,
                            "text-align": props.align,
                            fontSize: `${propsDetail.value.fontSize_px}px`,
                            transition: "color 0.24s"
                          }
                        ]),
                        class: "wrap flex-1",
                        "placeholder-style": `fontSize:${propsDetail.value.fontSize_px}px;${props.placeholderStyle}`,
                        "ready-only": propsDetail.value.readyOnly
                      }, null, 44, ["value", "focus", "maxlength", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "cursor", "show-confirm-bar", "selectionStart", "selectionEnd", "disable-default-padding", "fixed", "autoHeight", "readonly", "adjustPosition", "type", "placeholder-style", "ready-only"])) : vue.createCommentVNode("v-if", true)
                    ])) : vue.createCommentVNode("v-if", true),
                    isAndroid.value ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 4,
                      class: "flex-1 relative flex-row flex",
                      style: vue.normalizeStyle([{ width: "0px" }])
                    }, [
                      vue.createCommentVNode(` <view @click.stop="emits('click',$event)" class=" l-0 t-0 flex-1 " :style="{height: \`\${_height}rpx\`,background:'red'}"></view> `),
                      propsDetail.value.type != "textarea" ? (vue.openBlock(), vue.createElementBlock("input", {
                        key: 0,
                        class: "flex-1",
                        onClick: _cache[3] || (_cache[3] = vue.withModifiers(($event) => emits("click", $event), ["stop"])),
                        userInteractionEnabled: false,
                        value: _value.value,
                        focus: propsDetail.value.focus,
                        onFocus: focus,
                        onBlur: blur,
                        onConfirm: confirm,
                        onInput: inputHandler,
                        onKeyboardheightchange: _cache[4] || (_cache[4] = ($event) => emits("keyboardheightchange", $event)),
                        password: showPasswordText.value,
                        disabled: propsDetail.value.disabled,
                        cursorSpacing: propsDetail.value.cursorSpacing,
                        confirmType: propsDetail.value.confirmType,
                        confirmHold: propsDetail.value.confirmHold,
                        autoBlur: propsDetail.value.autoBlur,
                        holdKeyboard: propsDetail.value.holdKeyboard,
                        adjustPosition: propsDetail.value.adjustPosition,
                        maxlength: propsDetail.value.maxlength,
                        type: propsDetail.value.type,
                        readonly: propsDetail.value.readyOnly,
                        placeholder: propsDetail.value.placeholder,
                        style: vue.normalizeStyle([
                          {
                            height: `${_height.value}rpx`,
                            color: propsDetail.value.fontColor ? propsDetail.value.fontColor : tmcomputed.value.textColor,
                            "text-align": props.align,
                            fontSize: `${propsDetail.value.fontSize_px}px`
                          }
                        ]),
                        "placeholder-style": `fontSize:${propsDetail.value.fontSize_px}px;${props.placeholderStyle}`
                      }, null, 44, ["value", "focus", "password", "disabled", "cursorSpacing", "confirmType", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "type", "readonly", "placeholder", "placeholder-style"])) : vue.createCommentVNode("v-if", true),
                      propsDetail.value.type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
                        key: 1,
                        onClick: _cache[5] || (_cache[5] = vue.withModifiers(($event) => emits("click", $event), ["stop"])),
                        userInteractionEnabled: false,
                        value: _value.value,
                        focus: propsDetail.value.focus,
                        onFocus: focus,
                        onBlur: blur,
                        onConfirm: confirm,
                        onInput: inputHandler,
                        onKeyboardheightchange: _cache[6] || (_cache[6] = ($event) => emits("keyboardheightchange", $event)),
                        disabled: propsDetail.value.disabled,
                        placeholder: propsDetail.value.placeholder,
                        cursorSpacing: propsDetail.value.cursorSpacing,
                        confirmHold: propsDetail.value.confirmHold,
                        autoBlur: propsDetail.value.autoBlur,
                        holdKeyboard: propsDetail.value.holdKeyboard,
                        adjustPosition: propsDetail.value.adjustPosition,
                        maxlength: propsDetail.value.maxlength,
                        autoHeight: propsDetail.value.autoHeight,
                        cursor: propsDetail.value.cursor,
                        "show-confirm-bar": propsDetail.value.showConfirmBar,
                        selectionStart: propsDetail.value.selectionStart,
                        selectionEnd: propsDetail.value.selectionEnd,
                        "disable-default-padding": propsDetail.value.disableDefaultPadding,
                        readonly: propsDetail.value.readyOnly,
                        fixed: propsDetail.value.fixed,
                        type: propsDetail.value.type,
                        style: vue.normalizeStyle([
                          propsDetail.value.autoHeight ? {} : { height: `${_height.value}rpx` },
                          {
                            width: "auto",
                            "word-break": "break-word",
                            color: propsDetail.value.fontColor ? propsDetail.value.fontColor : tmcomputed.value.textColor,
                            "text-align": props.align,
                            fontSize: `${propsDetail.value.fontSize_px}px`
                          }
                        ]),
                        class: "wrap flex-1",
                        "placeholder-style": `fontSize:${propsDetail.value.fontSize_px}px;${props.placeholderStyle}`
                      }, null, 44, ["value", "focus", "disabled", "placeholder", "cursorSpacing", "confirmHold", "autoBlur", "holdKeyboard", "adjustPosition", "maxlength", "autoHeight", "cursor", "show-confirm-bar", "selectionStart", "selectionEnd", "disable-default-padding", "readonly", "fixed", "type", "placeholder-style"])) : vue.createCommentVNode("v-if", true)
                    ])) : vue.createCommentVNode("v-if", true),
                    propsDetail.value.showClear && _valueLenChar.value > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 5,
                      onClick: clearBtn,
                      class: "pl-16"
                    }, [
                      vue.createVNode(tmIcon, {
                        customicon: props.customicon,
                        _style: "transition:color 0.24s",
                        userInteractionEnabled: false,
                        "font-size": propsDetail.value.fontSize,
                        color: props.clearAndEyeColor,
                        name: "tmicon-times-circle-fill"
                      }, null, 8, ["customicon", "font-size", "color"])
                    ])) : vue.createCommentVNode("v-if", true),
                    _requiredError.value ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 6,
                      class: "pl-16"
                    }, [
                      vue.createVNode(tmIcon, {
                        _style: "transition:color 0.24s",
                        "font-size": propsDetail.value.fontSize,
                        name: "tmicon-exclamation-circle"
                      }, null, 8, ["font-size"])
                    ])) : vue.createCommentVNode("v-if", true),
                    propsDetail.value.suffix ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 7,
                      class: "pl-16"
                    }, [
                      vue.createVNode(tmIcon, {
                        customicon: props.customicon,
                        _style: "transition:color 0.24s",
                        "font-size": propsDetail.value.fontSize,
                        color: props.suffixColor,
                        name: propsDetail.value.suffix
                      }, null, 8, ["customicon", "font-size", "color", "name"])
                    ])) : vue.createCommentVNode("v-if", true),
                    propsDetail.value.suffixLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 8,
                      class: "pl-16"
                    }, [
                      vue.createVNode(__easycom_0$4, {
                        _style: "transition:color 0.24s",
                        "font-size": propsDetail.value.fontSize,
                        color: props.suffixColor,
                        label: propsDetail.value.suffixLabel
                      }, null, 8, ["font-size", "color", "label"])
                    ])) : vue.createCommentVNode("v-if", true),
                    showPasswordIcon.value ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 9,
                      onClick: changeSeePassword,
                      class: "pl-16"
                    }, [
                      vue.createCommentVNode(" tmicon-eyeslash-fill "),
                      vue.createVNode(tmIcon, {
                        color: props.clearAndEyeColor,
                        _style: "transition:color 0.24s",
                        userInteractionEnabled: false,
                        "font-size": propsDetail.value.fontSize,
                        name: showPasswordText.value ? "tmicon-eyeslash-fill" : "tmicon-eye-fill"
                      }, null, 8, ["color", "font-size", "name"])
                    ])) : vue.createCommentVNode("v-if", true),
                    propsDetail.value.showCharNumber && _valueLenChar.value > 0 && propsDetail.value.type != "textarea" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 10,
                      class: "pl-16 flex-row flex"
                    }, [
                      vue.createVNode(__easycom_0$4, {
                        _style: "transition:color 0.24s",
                        label: _valueLenChar.value
                      }, null, 8, ["label"]),
                      propsDetail.value.maxlength > 0 ? (vue.openBlock(), vue.createBlock(__easycom_0$4, {
                        key: 0,
                        _style: "transition:color 0.24s",
                        label: "/" + propsDetail.value.maxlength
                      }, null, 8, ["label"])) : vue.createCommentVNode("v-if", true)
                    ])) : vue.createCommentVNode("v-if", true),
                    vue.createCommentVNode(" 原因是支付宝小程序自带了计数器。会导致重叠。 "),
                    propsDetail.value.showCharNumber && _valueLenChar.value > 0 && propsDetail.value.type == "textarea" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 11,
                      class: vue.normalizeClass(["pl-16 flex-row flex absolute r-0", [`b-${12}`]])
                    }, [
                      vue.createVNode(__easycom_0$4, {
                        _style: "transition:color 0.24s",
                        label: _valueLenChar.value
                      }, null, 8, ["label"]),
                      propsDetail.value.maxlength > 0 ? (vue.openBlock(), vue.createBlock(__easycom_0$4, {
                        key: 0,
                        _style: "transition:color 0.24s",
                        label: "/" + propsDetail.value.maxlength
                      }, null, 8, ["label"])) : vue.createCommentVNode("v-if", true)
                    ])) : vue.createCommentVNode("v-if", true),
                    vue.renderSlot(_ctx.$slots, "right", {}, () => [
                      propsDetail.value.search || propsDetail.value.searchLabel ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "pl-16"
                      }, [
                        vue.createVNode(__easycom_2, {
                          round: props.round,
                          width: props.searchWidth,
                          followTheme: props.followTheme,
                          onClick: searchClick,
                          color: props.searchBgColor,
                          "font-size": 24,
                          height: _height.value - 11,
                          padding: [16, 0],
                          block: !props.searchWidth,
                          margin: [0, 0],
                          fontColor: props.searchFontColor,
                          icon: propsDetail.value.search,
                          label: propsDetail.value.searchLabel
                        }, null, 8, ["round", "width", "followTheme", "color", "height", "block", "fontColor", "icon", "label"])
                      ])) : vue.createCommentVNode("v-if", true)
                    ], true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["transprent", "round", "padding", "border", "text", "color", "outlined", "shadow", "linear", "linearDeep"])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["margin", "padding"]);
      };
    }
  });
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-e6448e88"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-input/tm-input.vue"]]);
  const useWindowInfo = () => {
    let winSize = vue.reactive({
      top: 0,
      topSafe: 0,
      width: uni.upx2px(750),
      height: uni.upx2px(750),
      statusBar: 24,
      navigatorBar: 44,
      bottomSafe: 0,
      nvue: false,
      // 是否存在系统自带的状态栏，针对h5优化。
      h5IsSystemBar: true
    });
    function init() {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
      let sysinfo = uni.getSystemInfoSync();
      winSize.topSafe = ((_a2 = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _a2 : 24) + ((_b2 = sysinfo == null ? void 0 : sysinfo.navigationBarHeight) != null ? _b2 : 44);
      winSize.width = (_c2 = sysinfo == null ? void 0 : sysinfo.windowWidth) != null ? _c2 : uni.upx2px(750);
      winSize.height = (_d2 = sysinfo == null ? void 0 : sysinfo.windowHeight) != null ? _d2 : uni.upx2px(750);
      winSize.statusBar = (_e2 = sysinfo == null ? void 0 : sysinfo.statusBarHeight) != null ? _e2 : 24;
      winSize.navigatorBar = (_f2 = sysinfo == null ? void 0 : sysinfo.navigationBarHeight) != null ? _f2 : 44;
      winSize.bottomSafe = (_h2 = (_g2 = sysinfo.safeAreaInsets) == null ? void 0 : _g2.bottom) != null ? _h2 : 0;
    }
    init();
    vue.onMounted(() => {
      setTimeout(() => {
        init();
      }, 0);
    });
    return winSize;
  };
  const _sfc_main$r = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-app",
    props: __spreadProps(__spreadValues({}, custom_props), {
      /**
       * 是否透明背景
       */
      transprent: {
        type: [Boolean, String],
        default: false
      },
      /**
       * 是否透明背景,等同transprent,因单词拼写错误，现在写一个正确的。
       */
      transparent: {
        type: [Boolean, String],
        default: false
      },
      //整体的主题色调同全局色一样。
      /**暂时不可用 */
      theme: {
        type: String,
        default: "grey-5"
      },
      bgImg: {
        type: String,
        default: ""
      },
      /** 背景层div的样式 */
      bgStyle: {
        type: String,
        default: ""
      },
      //应用的背景颜色。
      color: {
        type: String,
        default: "grey-4"
      },
      /**自定义暗黑的背景，你也可以通过全局配置 */
      darkColor: {
        type: String,
        default: "#050505"
      },
      /**是否模糊背景，暂时不可用 */
      blur: {
        type: [Boolean, String],
        default: false
      },
      /**这是一个淘汰的属性，请在pages.json中配置即可，会自动读取。而不需要在这里设置 */
      navbar: {
        type: Object,
        default: () => {
          return {
            background: "",
            fontColor: ""
          };
        }
      },
      /**是否自动修改系统自带的navbar的主题。 */
      navbarDarkAuto: {
        type: Boolean,
        default: true
      }
    }),
    setup(__props, { expose: __expose }) {
      const store = useTmpiniaStore();
      const props = __props;
      const tmcfg = vue.computed(() => store.tmStore);
      const isSetThemeOk = vue.ref(false);
      const {
        dark: dark2,
        isNvue,
        customCSSStyle,
        customClass,
        parentClass,
        transparent,
        _props,
        proxy,
        blur,
        round,
        margin,
        padding,
        theme: theme2
      } = useTheme(vue.computed(() => props), tmcfg);
      const tmcomputed = theme2();
      let isTabbarPage = false;
      let nowPage = getCurrentPages().pop();
      const _bgStyle = vue.computed(() => props.bgStyle);
      let winSize = useWindowInfo();
      let appConfig = vue.ref({
        width: winSize.width,
        height: winSize.height,
        theme: tmcomputed.value.backgroundColor,
        bgImg: props.bgImg,
        dark: dark2.value
      });
      onLoad((opts) => {
        var _a2, _b2;
        try {
          (_b2 = store.tmuiConfig.router) == null ? void 0 : _b2.useTmRouterAfter({
            path: (_a2 = nowPage == null ? void 0 : nowPage.route) != null ? _a2 : "",
            opts,
            context: proxy != null ? proxy : null
          });
        } catch (error) {
        }
      });
      vue.onMounted(() => {
        _onInit();
      });
      function _onInit() {
        var _a2, _b2;
        let barLit = (_b2 = (_a2 = uni.$tm.tabBar) == null ? void 0 : _a2.list) != null ? _b2 : [];
        for (let i = 0; i < barLit.length; i++) {
          if ((nowPage == null ? void 0 : nowPage.route) == barLit[i].pagePath) {
            isTabbarPage = true;
            break;
          }
        }
        if (store.tmuiConfig.autoDark) {
          osChangeTheme(uni.getSystemInfoSync().osTheme);
        } else {
          setAppStyle();
        }
      }
      vue.watch([() => tmcfg.value.color, dark2], () => {
        isSetThemeOk.value = false;
        setAppStyle();
      });
      vue.watch([() => props.color], () => {
        appConfig.value.theme = tmcomputed.value.backgroundColor;
      });
      function setAppStyle() {
        var _a2, _b2, _c2, _d2, _e2;
        if (dark2.value) {
          appConfig.value.theme = ((_c2 = (_b2 = (_a2 = store.tmuiConfig) == null ? void 0 : _a2.themeConfig) == null ? void 0 : _b2.dark) == null ? void 0 : _c2.bodyColor) || props.darkColor;
        } else {
          appConfig.value.theme = tmcomputed.value.backgroundColor;
        }
        if ((_e2 = (_d2 = plus == null ? void 0 : plus.webview) == null ? void 0 : _d2.currentWebview()) == null ? void 0 : _e2.setStyle) {
          plus.webview.currentWebview().setStyle({
            background: appConfig.value.theme,
            backgroundColorTop: appConfig.value.theme,
            backgroundColorBottom: appConfig.value.theme,
            userSelect: true,
            webviewBGTransparent: true
          });
        }
        if (dark2.value) {
          try {
            if (!uni.$tm.isOpenDarkModel && props.navbarDarkAuto) {
              uni.setNavigationBarColor({
                backgroundColor: "#000000",
                frontColor: "#ffffff"
              }).catch((error) => {
              });
            }
          } catch (error) {
          }
          plus.navigator.setStatusBarStyle("light");
          if (isTabbarPage) {
            if (uni.$tm.tabBar.selectedColor.indexOf("@") == -1) {
              uni.setTabBarStyle({
                backgroundColor: "#141415",
                borderStyle: "black",
                color: "#ffffff",
                selectedColor: uni.$tm.tabBar.selectedColor || tmcomputed.value.textColor
              }).catch((error) => {
              });
            }
          }
        } else {
          try {
            let nowPageConfigs = uni.$tm.pages.filter((el) => el.path == (nowPage == null ? void 0 : nowPage.route));
            if (nowPageConfigs.length > 0 && !props.navbar.background) {
              if (nowPageConfigs[0].navigationBarTextStyle.indexOf("@") > -1)
                return;
              let tcolor = nowPageConfigs[0].navigationBarTextStyle;
              tcolor = tcolor.toLocaleLowerCase();
              tcolor = tcolor == "black" ? "#000000" : tcolor;
              tcolor = tcolor == "white" ? "#ffffff" : tcolor;
              if (props.navbarDarkAuto) {
                uni.setNavigationBarColor({
                  backgroundColor: nowPageConfigs[0].navigationBarBackgroundColor,
                  frontColor: tcolor
                }).catch((error) => {
                });
              }
              uni.setStorageSync(
                "tmuiNavStyle",
                JSON.stringify({
                  navbarBackground: nowPageConfigs[0].navigationBarBackgroundColor,
                  navbarFontColor: tcolor
                })
              );
            } else if (!uni.$tm.isOpenDarkModel) {
              if (props.navbarDarkAuto) {
                uni.setNavigationBarColor({
                  backgroundColor: props.navbar.background,
                  frontColor: props.navbar.fontColor
                }).catch((error) => {
                });
              }
              uni.setStorageSync(
                "tmuiNavStyle",
                JSON.stringify({
                  navbarBackground: props.navbar.background,
                  navbarFontColor: props.navbar.fontColor
                })
              );
            }
          } catch (error) {
          }
          plus.navigator.setStatusBarStyle("dark");
          try {
            if (isTabbarPage && !uni.$tm.isOpenDarkModel) {
              uni.setTabBarStyle({
                backgroundColor: uni.$tm.tabBar.backgroundColor || props.navbar.background,
                borderStyle: uni.$tm.tabBar.borderStyle || "white",
                color: uni.$tm.tabBar.color || props.navbar.fontColor,
                selectedColor: uni.$tm.tabBar.selectedColor || tmcomputed.value.textColor
              }).catch((error) => {
              });
            }
          } catch (error) {
          }
        }
        isSetThemeOk.value = true;
      }
      function setTheme(colorName) {
        store.setTmVuetifyTheme(colorName);
      }
      function setDark(darks) {
        let maindark = !dark2.value;
        if (typeof darks !== "undefined" && typeof darks == "boolean") {
          maindark = darks;
        }
        appConfig.value.dark = maindark;
        store.setTmVuetifyDark(maindark);
        setAppStyle();
      }
      try {
        uni.onThemeChange((ev) => {
          osChangeTheme(ev.theme);
        });
      } catch (error) {
        formatAppLog("warn", "at tmui/components/tm-app/tm-app.vue:347", "没有主题切换功能：", error);
      }
      function osChangeTheme(ev) {
        if (!store.tmuiConfig.autoDark)
          return;
        if (ev === "light") {
          setDark(false);
        } else if (ev === "dark") {
          setDark(true);
        }
      }
      vue.provide(
        "appTextColor",
        vue.computed(() => tmcomputed.value.textColor)
      );
      vue.provide("custom_space_size", [0, 0]);
      __expose({
        setTheme,
        setDark
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "flex relative app flex-1",
            style: vue.normalizeStyle(
              [
                vue.unref(appConfig).theme ? { background: vue.unref(transparent) ? "" : vue.unref(appConfig).theme } : "",
                vue.unref(_props).bgImg ? { backgroundImage: `url(${vue.unref(_props).bgImg})` } : "",
                _bgStyle.value
              ]
            )
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              vue.createElementVNode("text", null, "在这里放置内容")
            ], true)
          ],
          4
          /* STYLE */
        );
      };
    }
  });
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-690d8382"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-app/tm-app.vue"]]);
  const config$1 = {
    BASE_URL: "http://10.0.2.2:8800"
    // BASE_URL: 'http://172.20.10.4:8800'
  };
  const useMainStore = defineStore("main", () => {
    const projInfo = vue.reactive({
      type: "",
      detail: "",
      proname: "",
      htd: "",
      fbgc: ""
    });
    const allProject = vue.reactive([]);
    const token = vue.ref("");
    const username = vue.ref("");
    const ql = vue.reactive([]);
    const getCurType = () => {
      return projInfo.type;
    };
    const getCurDetail = () => {
      return projInfo.detail;
    };
    const getCurInfo = () => {
      const res = `${projInfo.proname}---${projInfo.htd}---${projInfo.fbgc}---${projInfo.type}`;
      if (res !== "---------") {
        return res;
      }
      return "";
    };
    const setToken = (t) => {
      token.value = t;
    };
    const getToken = () => {
      return token.value;
    };
    const assignProjInfo = (data) => {
      Object.assign(allProject, data);
    };
    const getAllProjName = () => {
      return allProject.map((item) => item.name);
    };
    const assignQl = (data) => {
      Object.assign(ql, data);
    };
    const getAllQl = () => {
      return ql;
    };
    const getContractsNameByProjName = (name) => {
      var _a2;
      return ((_a2 = allProject.find((item) => item.name === name)) == null ? void 0 : _a2.contract.map((item) => item.name)) || [];
    };
    const getTypeByProjNameAndContractName = (name, contractName) => {
      var _a2, _b2;
      return ((_b2 = (_a2 = allProject.find((item) => item.name === name)) == null ? void 0 : _a2.contract.find((item) => item.name === contractName)) == null ? void 0 : _b2.type) || [];
    };
    return {
      projInfo,
      username,
      allProject,
      getCurType,
      getCurInfo,
      getCurDetail,
      getToken,
      setToken,
      assignProjInfo,
      getAllProjName,
      getContractsNameByProjName,
      getTypeByProjNameAndContractName,
      getAllQl,
      assignQl
    };
  });
  const toast = (t, icon, duration2) => {
    uni.showToast({
      title: t,
      icon: icon != null ? icon : "none",
      duration: duration2 != null ? duration2 : 1500
    });
  };
  class RequestInstance {
    constructor() {
      __publicField(this, "baseURL", config$1.BASE_URL);
      __publicField(this, "beforeRequest", (options) => {
        const mainStore = useMainStore();
        return new Promise((resolve) => {
          options.url = this.baseURL + options.url;
          options.timeout = 1e4;
          if (options.auth) {
            options.header = {
              token: mainStore.getToken()
            };
          }
          resolve(options);
        });
      });
      __publicField(this, "handleResponse", (response) => {
        return new Promise((resolve, reject) => {
          const { data } = response;
          let msg = "";
          if (data.code !== 200) {
            msg = data.message || "请求失败";
            return reject(new Error(msg));
          }
          return resolve(data.data);
        });
      });
      __publicField(this, "request", (options) => {
        return new Promise((resolve, reject) => __async(this, null, function* () {
          const opt = yield this.beforeRequest(options);
          uni.request(opt).then((res) => __async(this, null, function* () {
            this.handleResponse(res).then((data) => {
              resolve(data);
            }).catch((err) => {
              toast(err.message);
              reject(err);
            });
          })).catch((err) => {
            toast("网络或服务器出错");
            reject(err);
          });
        }));
      });
    }
  }
  const service = new RequestInstance();
  const http = {
    get: (url, options) => {
      return service.request(__spreadValues({
        url,
        method: "GET"
      }, options));
    },
    post: (url, data, options) => {
      return service.request(__spreadValues({
        url,
        method: "POST",
        data
      }, options));
    }
  };
  const loginToService = (data) => {
    return http.post("/admin/system/index/login", data);
  };
  const formatReadableDate = (date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };
  const readableToFormat = (date) => {
    return date.replace(/年/g, "-").replace(/月/g, "-").replace(/日/g, " ") + "00:00:00";
  };
  const sheetsMaps = [
    {
      name: "路面工程",
      path: "/lmgc",
      sheets: [
        {
          title: "沥青路面压实度",
          path: "/lqlmysd"
        },
        {
          title: "路面弯沉贝克曼梁法",
          path: "/lmwc",
          subclass: "路面工程"
        },
        {
          title: "沥青路面渗水系数",
          path: "/lmssxs"
        },
        {
          title: "混凝土路面强度",
          path: "/hntlmqd"
        },
        {
          title: "砼路面相邻板高差",
          path: "/tlmxlbgc"
        },
        {
          title: "路面构造深度手工铺砂法",
          path: "/lmgzsdsgpsf"
        },
        {
          title: "高速沥青路面厚度钻芯法",
          path: "/gslqlmhdzxf"
        },
        {
          title: "混凝土路面厚度钻芯法",
          path: "/hntlmhdzxf"
        },
        {
          title: "路面横坡",
          path: "/lmhp"
        }
      ]
    },
    {
      name: "交安工程",
      path: "/jtaqss",
      sheets: [
        {
          title: "交安标线",
          path: "/jabx",
          subclass: "标线"
        },
        {
          title: "交安标志",
          path: "/jabz",
          subclass: "交通安全设施"
        },
        {
          title: "交安波形防护栏",
          path: "/jabxfhl",
          subclass: "防护栏"
        },
        {
          title: "交安砼护栏强度",
          path: "/jathlqd",
          subclass: "砼防护栏"
        },
        {
          title: "交安砼护栏断面尺寸",
          path: "/jathldmcc",
          subclass: "砼防护栏"
        }
      ]
    },
    {
      name: "路基工程",
      path: "/ljgc",
      sheets: [
        {
          title: "涵洞砼强度",
          path: "/hdgqd",
          subclass: "涵洞"
        },
        {
          title: "涵洞结构尺寸",
          path: "/hdjgcc",
          subclass: "涵洞"
        },
        {
          title: "排水断面尺寸",
          path: "/psdmcc",
          subclass: "排水工程"
        },
        {
          title: "排水铺砌厚度",
          path: "/pspqhd",
          subclass: "排水工程"
        },
        {
          title: "路基土石方压实度(灰土)",
          path: "/ljtsfysd/ht",
          subclass: "路基土石方"
        },
        {
          title: "路基土石方压实度(沙砾)",
          path: "/ljtsfysd/sl",
          subclass: "路基土石方"
        },
        {
          title: "路基压实度沉降",
          path: "/ljcj",
          subclass: "路基土石方(石方路基)"
        },
        {
          title: "路基弯沉贝克曼梁法",
          path: "/ljwc",
          subclass: "路基土石方"
        },
        {
          title: "路基边坡",
          path: "/ljbp",
          subclass: "路基土石方"
        },
        {
          title: "小桥结构尺寸",
          path: "/xqjgcc",
          subclass: "小桥"
        },
        {
          title: "小桥砼强度",
          path: "/xqgqd",
          subclass: "小桥"
        },
        {
          title: "支挡断面尺寸",
          path: "/zddmcc",
          subclass: "支挡工程"
        },
        {
          title: "支挡砼强度",
          path: "/zdgqd",
          subclass: "支挡工程"
        }
      ]
    },
    {
      name: "桥梁工程",
      path: "/qlgc",
      sheets: [
        {
          title: "桥面平整度三米直尺法",
          path: "/qmpzd"
        },
        {
          title: "桥面横坡",
          path: "/qmhp",
          subclass: "桥面系"
        },
        {
          title: "桥面构造深度手工铺砂法",
          path: "/qmgzsd"
        },
        {
          title: "桥梁上部砼强度",
          path: "/sb/tqd",
          subclass: "桥梁上部"
        },
        {
          title: "桥梁上部结构尺寸",
          path: "/sb/jgcc",
          subclass: "桥梁上部"
        },
        {
          title: "桥梁上部保护层厚度",
          path: "/sb/bhchd",
          subclass: "桥梁上部"
        },
        {
          title: "桥梁下部墩台砼强度",
          path: "/xb/tqd",
          subclass: "桥梁下部"
        },
        {
          title: "桥梁下部结构尺寸",
          path: "/xb/jgcc",
          subclass: "桥梁下部"
        },
        {
          title: "桥梁下部保护层厚度",
          path: "/xb/bhchd",
          subclass: "桥梁下部"
        },
        {
          title: "桥梁下部竖直度",
          path: "/xb/szd",
          subclass: "桥梁下部"
        }
      ]
    },
    {
      name: "隧道工程",
      path: "/sdgc",
      sheets: [
        {
          title: "隧道衬砌砼强度",
          path: "/cqtqd",
          subclass: "衬砌"
        },
        {
          title: "隧道衬砌厚度",
          path: "/cqhd",
          subclass: "衬砌"
        },
        {
          title: "隧道大面平整度",
          path: "/dmpzd"
        },
        {
          title: "隧道沥青路面压实度",
          path: "/sdlqlmysd"
        },
        {
          title: "隧道沥青路面渗水系数",
          path: "/lmssxs"
        },
        {
          title: "隧道混凝土路面强度",
          path: "/hntlmqd"
        },
        {
          title: "隧道砼路面相邻板高差",
          path: "/tlmxlbgc"
        },
        {
          title: "隧道路面构造深度手工铺砂法",
          path: "/lmgzsdsgpsf"
        },
        {
          title: "隧道沥青路面厚度钻芯法",
          path: "/gssdlqlmhdzxf"
        },
        {
          title: "隧道混凝土路面厚度钻芯法",
          path: "/sdhntlmhdzxf"
        },
        {
          title: "隧道横坡",
          path: "/sdhp"
        },
        {
          title: "隧道总体宽度",
          path: "/ztkd",
          subclass: "衬砌"
        },
        {
          title: "净空",
          path: "/jk",
          subclass: "总体"
        }
      ]
    }
  ];
  const getCurRecordPath = () => {
    const mainStore = useMainStore();
    let path = "/jjg/fbgc";
    const mid = sheetsMaps.find((item) => item.name === mainStore.projInfo.fbgc);
    path += mid == null ? void 0 : mid.path;
    const midPath = mid == null ? void 0 : mid.sheets.find(
      (item) => item.title === mainStore.projInfo.type
    );
    path += midPath == null ? void 0 : midPath.path;
    return path;
  };
  const getSheetsByFBGC = (name) => {
    const mid = sheetsMaps.find((item) => item.name === name);
    return (mid == null ? void 0 : mid.sheets) || [];
  };
  const getCurTableTitleByFBGC = () => {
    const mainStore = useMainStore();
    const tp = mainStore.getCurType();
    const name = mainStore.projInfo.fbgc;
    const res = sheetsMaps.find((item) => item.name === name);
    const ttl = res == null ? void 0 : res.sheets.find((item) => item.title === tp);
    return ttl == null ? void 0 : ttl.path.slice(1).replace(/\//g, "_");
  };
  const getTrueFBGC = () => {
    var _a2;
    const mainStore = useMainStore();
    const sheetName = mainStore.getCurType();
    const f = mainStore.projInfo.fbgc;
    const res = (_a2 = sheetsMaps.find((item) => item.name === f)) == null ? void 0 : _a2.sheets.find((item) => item.title === sheetName);
    return (res == null ? void 0 : res.subclass) || f;
  };
  const dateTag = ["jcsj", "jcrq", "sysj"];
  const withUpdate = (tableData) => {
    tableData.fields.columns.unshift("update");
    tableData.header.unshift({
      field: "update",
      name: "修改",
      opts: {
        color: "#005461"
      }
    });
  };
  const withDelete = (tableData) => {
    tableData.fields.columns.unshift("delete");
    tableData.header.unshift({
      field: "delete",
      name: "删除",
      opts: {
        color: "#005461"
      }
    });
  };
  const withStatus = (tableData) => {
    tableData.fields.columns.unshift("status");
    tableData.header.unshift({
      field: "status",
      name: "状态",
      opts: {
        color: "#005461"
      }
    });
  };
  const getTableData = (columns) => {
    const tableData = {
      fields: {
        columns: []
      },
      header: [],
      data: []
    };
    for (const column of columns) {
      tableData.fields.columns.push(column.prop);
      tableData.header.push({
        field: column.prop,
        name: column.name,
        opts: {
          color: "#005461"
        }
      });
    }
    return tableData;
  };
  const attachStableData = (c) => {
    const mainStore = useMainStore();
    c["proname"] = mainStore.projInfo.proname;
    c["htd"] = mainStore.projInfo.htd;
    c["fbgc"] = getTrueFBGC();
  };
  const attachStatus = (c) => {
    c["status"] = "";
  };
  const toFormatDate = (c) => {
    for (const key in c) {
      if (dateTag.includes(key)) {
        c[key] = readableToFormat(c[key]);
      }
    }
  };
  const getProjectDetail = () => {
    return http.get("/project/getAllProject4App", {
      auth: true
    });
  };
  const handInManyRecords2Detail = (data) => {
    const mainStore = useMainStore();
    const newData = JSON.parse(JSON.stringify(data));
    newData.map((item) => toFormatDate(item));
    return http.post(
      mainStore.projInfo.detail + "/createManyRecords",
      newData,
      {
        auth: true
      }
    );
  };
  const getQlByStore = () => {
    const mainStore = useMainStore();
    const url = `/project/ql?proname=${mainStore.projInfo.proname}&htd=${mainStore.projInfo.htd}`;
    return http.get(url, {
      auth: true
    });
  };
  const initProjects = (res) => {
    const a = [];
    for (let i = 0; i < res.length; i++) {
      const b = {};
      b.name = res[i].name;
      b.contract = [];
      if (!res[i].children) {
        a.push(b);
        continue;
      }
      for (let j = 0; j < res[i].children.length; j++) {
        const c = {};
        c.name = res[i].children[j].name;
        c.type = [];
        if (!res[i].children[j].children) {
          b.contract.push(c);
          continue;
        }
        for (let k = 0; k < res[i].children[j].children.length; k++) {
          const d = res[i].children[j].children[k].name;
          c.type.push(d);
        }
        b.contract.push(c);
      }
      a.push(b);
    }
    return a;
  };
  let _isWide = vue.ref(false);
  const isWide = vue.computed(() => {
    uni.onWindowResize((res) => {
      _isWide.value = res.size.windowWidth > 768;
    });
    return _isWide.value;
  });
  let startWide = false;
  const setStartWide = (val) => {
    startWide = val;
  };
  const fontSize = vue.computed(() => {
    let res = 0;
    if (startWide) {
      res = isWide.value ? 30 : 60;
    } else {
      res = isWide.value ? 15 : 30;
    }
    return res;
  });
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const status = vue.reactive({
        username: "",
        password: ""
      });
      const mainStore = useMainStore();
      const hdLogin = () => __async(this, null, function* () {
        if (!status.username || !status.password) {
          toast("请输入用户名和密码");
          return;
        }
        const res = yield loginToService(status);
        mainStore.setToken(res.token);
        mainStore.username = status.username;
        const detail = yield getProjectDetail();
        const pj = initProjects(detail);
        mainStore.assignProjInfo(pj);
        uni.navigateTo({
          url: "/pages/tableSelect/index"
        });
      });
      const toTest = () => __async(this, null, function* () {
        if (mainStore.getToken().length !== 0) {
          uni.navigateTo({
            url: "/pages/tableSelect/index"
          });
          return;
        }
        const res = yield loginToService({
          username: "admin",
          password: "111111"
        });
        mainStore.setToken(res.token);
        mainStore.username = status.username;
        const detail = yield getProjectDetail();
        const pj = initProjects(detail);
        mainStore.assignProjInfo(pj);
        uni.navigateTo({
          url: "/pages/tableSelect/index"
        });
      });
      return (_ctx, _cache) => {
        const _component_tm_image = resolveEasycom(vue.resolveDynamicComponent("tm-image"), tmImage);
        const _component_tm_input = resolveEasycom(vue.resolveDynamicComponent("tm-input"), __easycom_1$1);
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), __easycom_2);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_3);
        return vue.openBlock(), vue.createBlock(_component_tm_app, null, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "bg" }, [
              vue.createElementVNode("view", { class: "card" }, [
                vue.createElementVNode("view", { class: "logo" }, [
                  vue.createVNode(_component_tm_image, {
                    width: 400,
                    height: 400,
                    src: "/static/jiaokong_nowatermark2.png"
                  })
                ]),
                vue.createElementVNode("view", { class: "input" }, [
                  vue.createVNode(_component_tm_input, {
                    modelValue: status.username,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => status.username = $event),
                    "font-size": vue.unref(fontSize),
                    border: 3,
                    margin: [100, 25],
                    color: "#f5f5f5",
                    "focus-color": "#25b1bf",
                    placeholder: "请输入账号"
                  }, null, 8, ["modelValue", "font-size"]),
                  vue.createVNode(_component_tm_input, {
                    modelValue: status.password,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => status.password = $event),
                    "font-size": vue.unref(fontSize),
                    border: 3,
                    margin: [100, 25],
                    color: "#f5f5f5",
                    "focus-color": "#25b1bf",
                    placeholder: "请输入密码",
                    password: ""
                  }, null, 8, ["modelValue", "font-size"])
                ]),
                vue.createElementVNode("view", { class: "btn" }, [
                  vue.createVNode(_component_tm_button, {
                    "linear-color": ["#de283b", "#ff6366"],
                    color: "orange",
                    "font-color": "#ffccc4",
                    "font-size": 35,
                    linear: "right",
                    height: 80,
                    block: "",
                    label: "登录",
                    onClick: hdLogin
                  })
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "bottom-btn" }, [
              vue.createVNode(_component_tm_button, {
                label: "测试页面",
                onClick: toTest
              })
            ])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  });
  const PagesLoginIndex = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-45258083"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/login/index.vue"]]);
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const mainStore = useMainStore();
      const txt = vue.computed(() => {
        if (mainStore.username) {
          return "当前用户：" + mainStore.username;
        }
        return "未登录";
      });
      return (_ctx, _cache) => {
        const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), __easycom_0$4);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_3);
        return vue.openBlock(), vue.createBlock(_component_tm_app, null, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_tm_text, { label: txt.value }, null, 8, ["label"])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  });
  const PagesProfileIndex = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/profile/index.vue"]]);
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-divider",
    props: __spreadProps(__spreadValues({}, custom_props), {
      color: {
        type: String,
        default: "grey-3"
      },
      fontColor: {
        type: String,
        default: "grey-1"
      },
      fontSize: {
        type: Number,
        default: 26
      },
      vertical: {
        type: [Boolean],
        default: false
      },
      height: {
        type: [Number, String],
        default: 26
      },
      label: {
        type: String,
        default: ""
      },
      showLabel: {
        type: Boolean,
        default: false
      },
      align: {
        type: String,
        default: "center"
        //left,right,center
      },
      margin: {
        type: Array,
        default: () => [16, 24]
      },
      border: {
        type: [Number],
        default: 1
      },
      //使用原始颜色为线条色，而不使用计算过的颜色值。
      realColor: {
        type: [Boolean],
        default: false
      }
    }),
    emits: ["click"],
    setup(__props, { emit: __emit }) {
      const store = useTmpiniaStore();
      const props = __props;
      const emits = __emit;
      const borderDir = vue.computed(() => props.vertical ? "left" : "bottom");
      const _label = vue.computed(() => props.label || props.showLabel);
      const tmcfg = vue.computed(() => store.tmStore);
      const _realColor = vue.computed(() => props.realColor);
      const isDark = vue.computed(
        () => computedDark(
          __spreadProps(__spreadValues({}, props), {
            borderDirection: borderDir.value
          }),
          tmcfg.value
        )
      );
      const tmcomputed = vue.computed(
        () => computedTheme$1(
          __spreadProps(__spreadValues({}, props), {
            borderDirection: borderDir.value
          }),
          isDark.value,
          tmcfg.value
        )
      );
      function onClick(e) {
        emits("click", e);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { onClick }, [
          !_label.value && props.vertical ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              userInteractionEnabled: false,
              style: vue.normalizeStyle([
                { backgroundColor: _realColor.value ? tmcomputed.value.color : tmcomputed.value.border },
                props.vertical ? { width: props.border + "rpx", height: props.height + "rpx" } : ""
              ]),
              class: vue.normalizeClass([props.vertical ? `mx-${props.margin[0]}` : `my-${props.margin[1]}`])
            },
            null,
            6
            /* CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true),
          _label.value && !props.vertical ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            userInteractionEnabled: false,
            class: "flex flex-row flex-center"
          }, [
            vue.createElementVNode(
              "view",
              {
                style: vue.normalizeStyle([
                  tmcomputed.value ? {
                    backgroundColor: _realColor.value ? tmcomputed.value.color : tmcomputed.value.border,
                    height: props.border + "rpx"
                  } : ""
                ]),
                class: vue.normalizeClass([
                  `my-${props.margin[1]}`,
                  __props.align == "left" ? "flex-2" : "",
                  __props.align == "right" ? "flex-10" : "",
                  __props.align == "center" ? "flex-1" : ""
                ])
              },
              null,
              6
              /* CLASS, STYLE */
            ),
            _label.value ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass([isDark.value ? "opacity-4" : ""])
              },
              [
                vue.renderSlot(_ctx.$slots, "label", {}, () => [
                  vue.createVNode(__easycom_0$4, {
                    fontSize: props.fontSize,
                    dark: isDark.value,
                    followTheme: props.followTheme,
                    color: props.fontColor,
                    label: props.label,
                    _class: ["mx-32"]
                  }, null, 8, ["fontSize", "dark", "followTheme", "color", "label"])
                ])
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                style: vue.normalizeStyle([
                  tmcomputed.value ? {
                    backgroundColor: _realColor.value ? tmcomputed.value.color : tmcomputed.value.border,
                    height: props.border + "rpx"
                  } : ""
                ]),
                class: vue.normalizeClass([
                  `my-${props.margin[1]}`,
                  __props.align == "left" ? "flex-10" : "",
                  __props.align == "right" ? "flex-2" : "",
                  __props.align == "center" ? "flex-1" : ""
                ])
              },
              null,
              6
              /* CLASS, STYLE */
            )
          ])) : vue.createCommentVNode("v-if", true),
          !_label.value && !props.vertical ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            userInteractionEnabled: false,
            class: "flex flex-row flex-center"
          }, [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["flex-1", [`my-${props.margin[1]}`]]),
                style: vue.normalizeStyle([
                  tmcomputed.value ? {
                    backgroundColor: _realColor.value ? tmcomputed.value.color : tmcomputed.value.border,
                    height: props.border + "rpx"
                  } : ""
                ])
              },
              null,
              6
              /* CLASS, STYLE */
            )
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const tmDivider = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-divider/tm-divider.vue"]]);
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-cell",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
        default: cssDirection.bottom
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
      const store = useTmpiniaStore();
      function cellClick(e) {
        emits("click", e);
        if (props.url !== "") {
          try {
            uni.navigateTo({
              url: props.url,
              fail(error) {
                formatAppLog("error", "at tmui/components/tm-cell/tm-cell.vue:257", "打开连接错误：", error);
              }
            });
          } catch (e2) {
          }
        }
      }
      const _computedValue = vue.computed(() => props);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "relative overflow" }, [
          vue.createVNode(tmSheet, {
            darkBgColor: props.darkBgColor,
            onClick: cellClick,
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
            "hover-class": "opacity-6"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  userInteractionEnabled: true,
                  class: vue.normalizeClass(["flex flex-row flex-row-center-center", [_computedValue.value.url ? "url" : ""]])
                },
                [
                  _computedValue.value.showAvatar ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      style: vue.normalizeStyle({
                        width: `${_computedValue.value.avatarSize}rpx`,
                        height: `${_computedValue.value.avatarSize}rpx`
                      }),
                      class: "flex flex-row flex-row-center-center"
                    },
                    [
                      vue.renderSlot(_ctx.$slots, "avatar", {}, () => [
                        vue.createVNode(tmImage, {
                          round: _computedValue.value.avatarRound,
                          width: _computedValue.value.avatarSize,
                          height: _computedValue.value.avatarSize,
                          src: _computedValue.value.avatar
                        }, null, 8, ["round", "width", "height", "src"])
                      ], true)
                    ],
                    4
                    /* STYLE */
                  )) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", {
                    class: "flex-1 flex flex-row flex-row-center-between",
                    style: { "width": "0px" }
                  }, [
                    vue.createElementVNode("view", null, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: vue.normalizeClass(["flex flex-5 flex-col", [_computedValue.value.showAvatar ? "pl-24" : ""]])
                        },
                        [
                          vue.renderSlot(_ctx.$slots, "title", {}, () => [
                            vue.createVNode(__easycom_0$4, {
                              color: _computedValue.value.titleColor,
                              fontSize: _computedValue.value.titleFontSize,
                              label: _computedValue.value.title
                            }, null, 8, ["color", "fontSize", "label"])
                          ], true),
                          vue.renderSlot(_ctx.$slots, "label", {}, () => [
                            _computedValue.value.label ? (vue.openBlock(), vue.createElementBlock("view", {
                              key: 0,
                              class: "mt-6"
                            }, [
                              vue.createVNode(__easycom_0$4, {
                                color: _computedValue.value.labelColor,
                                fontSize: _computedValue.value.labelFontSize,
                                label: _computedValue.value.label
                              }, null, 8, ["color", "fontSize", "label"])
                            ])) : vue.createCommentVNode("v-if", true)
                          ], true)
                        ],
                        2
                        /* CLASS */
                      )
                    ]),
                    vue.createElementVNode("view", {
                      class: "flex-1 flex-row flex-row-center-end",
                      style: { "width": "0px" }
                    }, [
                      vue.renderSlot(_ctx.$slots, "rightText", {}, () => [
                        _computedValue.value.rightText ? (vue.openBlock(), vue.createBlock(__easycom_0$4, {
                          key: 0,
                          _class: "nowrap pr-12",
                          color: _computedValue.value.rightColor,
                          fontSize: _computedValue.value.rightTextSize,
                          label: _computedValue.value.rightText
                        }, null, 8, ["color", "fontSize", "label"])) : vue.createCommentVNode("v-if", true)
                      ], true),
                      vue.renderSlot(_ctx.$slots, "right", {}, () => [
                        _computedValue.value.rightIcon ? (vue.openBlock(), vue.createBlock(tmIcon, {
                          key: 0,
                          _class: "opacity-3",
                          name: _computedValue.value.rightIcon,
                          fontSize: 22
                        }, null, 8, ["name"])) : vue.createCommentVNode("v-if", true)
                      ], true)
                    ])
                  ])
                ],
                2
                /* CLASS */
              )
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["darkBgColor", "color", "followTheme", "dark", "followDark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "width", "height", "margin", "padding", "_class", "_style"]),
          _computedValue.value.bottomBorder ? (vue.openBlock(), vue.createBlock(tmDivider, {
            key: 0,
            margin: [0, 0],
            border: 2,
            color: "grey-5",
            "real-color": !vue.unref(store).tmStore.dark,
            style: vue.normalizeStyle({
              left: `${_computedValue.value.avatar !== "" ? _computedValue.value.avatarSize + _computedValue.value.margin[0] : 0}rpx`
            })
          }, null, 8, ["real-color", "style"])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-c423bcaa"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-cell/tm-cell.vue"]]);
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
    __name: "cellPicker",
    props: {
      dataset: { type: Array, required: true },
      title: { type: String, required: true },
      modelValue: { type: String, required: true }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const model = vue.computed({
        get() {
          return props.modelValue;
        },
        set(val) {
          emit("update:modelValue", val);
        }
      });
      const hdChange = (e) => {
        model.value = props.dataset[e.detail.value].text;
      };
      return (_ctx, _cache) => {
        const _component_tm_cell = resolveEasycom(vue.resolveDynamicComponent("tm-cell"), __easycom_0$3);
        return vue.openBlock(), vue.createBlock(_component_tm_cell, {
          bottomBorder: "",
          color: "#f5f5f5",
          "title-color": "#1a1a1a",
          margin: [0, 0],
          titleFontSize: 40,
          title: _ctx.title
        }, {
          right: vue.withCtx(() => [
            vue.createElementVNode("picker", {
              mode: "selector",
              range: _ctx.dataset,
              "range-key": "text",
              onChange: hdChange
            }, [
              vue.createElementVNode(
                "view",
                { class: "right-side" },
                vue.toDisplayString(model.value || "请选择"),
                1
                /* TEXT */
              )
            ], 40, ["range"])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["title"]);
      };
    }
  });
  const CellPicker = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-687eb966"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/tableSelect/components/cellPicker.vue"]]);
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const mainStore = useMainStore();
      const proname = vue.ref("");
      const htd = vue.ref("");
      const fbgc = vue.ref("");
      const projNames = mainStore.getAllProjName();
      const projPicker = projNames.reduce((p, c, i) => {
        p.push({
          text: c,
          id: i
        });
        return p;
      }, []);
      const contractsPicker = vue.computed(() => {
        const contract = mainStore.getContractsNameByProjName(proname.value);
        return contract.reduce((p, c, i) => {
          p.push({
            text: c,
            id: i
          });
          return p;
        }, []);
      });
      const typePicker = vue.computed(() => {
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
      const sheetsBtns = vue.computed(() => {
        return getSheetsByFBGC(fbgc.value);
      });
      vue.watch(contractsPicker, () => {
        htd.value = "";
        fbgc.value = "";
      });
      vue.watch(typePicker, () => {
        fbgc.value = "";
      });
      const hdClick = (title) => __async(this, null, function* () {
        mainStore.projInfo.proname = proname.value;
        mainStore.projInfo.htd = htd.value;
        mainStore.projInfo.fbgc = fbgc.value;
        mainStore.projInfo.type = title;
        mainStore.projInfo.detail = getCurRecordPath();
        const ql = yield getQlByStore();
        mainStore.assignQl(ql);
        uni.navigateTo({
          url: "/pages/recordsManage/index"
        });
      });
      return (_ctx, _cache) => {
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), __easycom_2);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_3);
        return vue.openBlock(), vue.createBlock(_component_tm_app, { color: "#ffffff" }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "container" }, [
              vue.createElementVNode("view", { class: "main" }, [
                vue.createElementVNode("view", { class: "cells" }, [
                  vue.createVNode(CellPicker, {
                    dataset: vue.unref(projPicker),
                    title: "项目名称",
                    modelValue: proname.value,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => proname.value = $event)
                  }, null, 8, ["dataset", "modelValue"]),
                  vue.createVNode(CellPicker, {
                    dataset: contractsPicker.value,
                    title: "合同段",
                    modelValue: htd.value,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => htd.value = $event)
                  }, null, 8, ["dataset", "modelValue"]),
                  vue.createVNode(CellPicker, {
                    dataset: typePicker.value,
                    title: "工程类型",
                    modelValue: fbgc.value,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => fbgc.value = $event)
                  }, null, 8, ["dataset", "modelValue"])
                ]),
                vue.createElementVNode("view", { class: "btn-container" }, [
                  vue.createElementVNode("view", { class: "btns" }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(sheetsBtns.value, (item, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "btn",
                          key: index
                        }, [
                          vue.createVNode(_component_tm_button, {
                            label: item.title,
                            color: "#25b1bf",
                            "font-color": "#fff",
                            "font-size": 35,
                            onClick: ($event) => hdClick(item.title),
                            height: 100,
                            block: ""
                          }, null, 8, ["label", "onClick"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  });
  const PagesTableSelectIndex = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-30245f27"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/tableSelect/index.vue"]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-alert",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      const bodyani = vue.ref(null);
      const emits = __emit;
      const props = __props;
      const activeIndex = vue.ref(0);
      const showBody = vue.ref(true);
      let timeid = uni.$tm.u.getUid(5);
      const reani = vue.computed(() => props.hidnAniName == "zoom" || props.hidnAniName == "fade" ? true : false);
      const list = vue.computed(() => {
        var _a2, _b2, _c2, _d2, _e2, _f2;
        if (!Array.isArray(props.content)) {
          return [
            {
              content: (_b2 = (_a2 = props.content) == null ? void 0 : _a2.content) != null ? _b2 : "",
              title: (_d2 = (_c2 = props.content) == null ? void 0 : _c2.title) != null ? _d2 : "",
              icon: (_f2 = (_e2 = props.content) == null ? void 0 : _e2.icon) != null ? _f2 : ""
            }
          ];
        }
        let c = props.content.map((el) => {
          var _a3, _b3, _c3;
          el["content"] = (_a3 = el == null ? void 0 : el.content) != null ? _a3 : "";
          el["title"] = (_b3 = el == null ? void 0 : el.title) != null ? _b3 : "";
          el["icon"] = (_c3 = el == null ? void 0 : el.icon) != null ? _c3 : "";
          return el;
        });
        return c;
      });
      const len = vue.computed(() => list.value.length);
      vue.onUnmounted(() => clearTimeout(timeid));
      vue.onMounted(() => {
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
        var _a2;
        (_a2 = bodyani.value) == null ? void 0 : _a2.play();
        clearTimeout(timeid);
        timeid = setTimeout(function() {
          showBody.value = false;
        }, 301);
      }
      return (_ctx, _cache) => {
        return showBody.value ? (vue.openBlock(), vue.createBlock(tmTranslate, {
          key: 0,
          onEnd: hide,
          ref_key: "bodyani",
          ref: bodyani,
          reverse: reani.value,
          name: __props.hidnAniName,
          autoPlay: false
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(tmSheet, {
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
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "relative bdcld flex flex-row flex-row-top-start" }, [
                  vue.createElementVNode(
                    "view",
                    {
                      style: { "width": "0px" },
                      class: vue.normalizeClass(["flex flex-12 flex-row flex-row-top-start", [__props.closable ? "pr-24 " : ""]])
                    },
                    [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(list.value, (item, index) => {
                          return vue.openBlock(), vue.createElementBlock(
                            "view",
                            {
                              key: index,
                              class: vue.normalizeClass([[activeIndex.value == index ? "flex-12 " : " flex-0 "], "flex flex-row flex-row-top-start anifun"])
                            },
                            [
                              activeIndex.value == index ? (vue.openBlock(), vue.createBlock(
                                tmTranslate,
                                {
                                  key: 0,
                                  name: "zoom",
                                  style: { "width": "100%" },
                                  _class: "flex-12 flex flex-row flex-row-top-start"
                                },
                                {
                                  default: vue.withCtx(() => [
                                    vue.createElementVNode("view", { class: "flex-12 flex flex-row flex-row-top-start" }, [
                                      item["icon"] ? (vue.openBlock(), vue.createElementBlock("view", {
                                        key: 0,
                                        class: "pr-32",
                                        style: { height: "36rpx" }
                                      }, [
                                        vue.createVNode(tmIcon, {
                                          fontSize: 32,
                                          lineHeight: 0,
                                          name: item["icon"]
                                        }, null, 8, ["name"])
                                      ])) : vue.createCommentVNode("v-if", true),
                                      vue.createElementVNode("view", {
                                        style: { "width": "0px" },
                                        class: "flex-12 flex flex-col"
                                      }, [
                                        item["title"] ? (vue.openBlock(), vue.createElementBlock("view", {
                                          key: 0,
                                          class: "flex flex-col flex-col-top-start",
                                          style: { height: "36rpx" }
                                        }, [
                                          vue.createVNode(__easycom_0$4, {
                                            onClick: ($event) => emits("click", item, index),
                                            _class: "text-size-m  text-overflow-1 text-weight-b",
                                            fontSize: 30,
                                            lineHeight: 0,
                                            label: item["title"]
                                          }, null, 8, ["onClick", "label"])
                                        ])) : vue.createCommentVNode("v-if", true),
                                        item["content"] ? (vue.openBlock(), vue.createElementBlock("view", {
                                          key: 1,
                                          class: "flex-12 overflow"
                                        }, [
                                          vue.createVNode(__easycom_0$4, {
                                            onClick: ($event) => emits("click", item, index),
                                            fontSize: 26,
                                            _class: "text-overflow-" + props.maxLine,
                                            lineHeight: 0,
                                            label: item["content"]
                                          }, null, 8, ["onClick", "_class", "label"]),
                                          len.value > 1 && props.showDot ? (vue.openBlock(), vue.createBlock(__easycom_0$4, {
                                            key: 0,
                                            _class: "pt-24",
                                            label: `${activeIndex.value + 1}/${len.value}`
                                          }, null, 8, ["label"])) : vue.createCommentVNode("v-if", true)
                                        ])) : vue.createCommentVNode("v-if", true)
                                      ])
                                    ])
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                },
                                1024
                                /* DYNAMIC_SLOTS */
                              )) : vue.createCommentVNode("v-if", true)
                            ],
                            2
                            /* CLASS */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    2
                    /* CLASS */
                  ),
                  vue.renderSlot(_ctx.$slots, "right", {}, () => [
                    __props.closable ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "flex flex-row flex-row-top-end"
                    }, [
                      vue.createVNode(tmIcon, {
                        onClick: close,
                        fontSize: 32,
                        lineHeight: 0,
                        name: "tmicon-times-circle-fill"
                      })
                    ])) : vue.createCommentVNode("v-if", true)
                  ])
                ])
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["height", "color", "_class", "_style", "followTheme", "dark", "round", "shadow", "outlined", "border", "borderStyle", "borderDirection", "text", "transprent", "linear", "linearDeep", "margin", "padding"])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["reverse", "name"])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-alert/tm-alert.vue"]]);
  const DB_NAME = "jjgdb";
  const DB_PATH = "_doc/jjgdb.db";
  const obj2str = (obj, sp = " ", need = false) => {
    const tmp = JSON.stringify(obj).slice(1, -1).split(",");
    const res = tmp.map((i) => {
      return i.replace(/[:]/, sp);
    });
    const str = res.join(",");
    if (need) {
      return str;
    }
    return str.replace(/["]/g, "");
  };
  const unfoldCondition = (condition2) => {
    const res = [];
    for (const key in condition2) {
      res.push(`${key} = "${condition2[key]}"`);
    }
    return res.toString().replace(/,/g, " and ");
  };
  const getObjKeys = (obj) => {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      keys[i] = '"' + keys[i] + '"';
    }
    return keys.toString();
  };
  const getObjValues = (obj) => {
    const values = [];
    for (const key in obj) {
      const v = '"' + obj[key] + '"';
      values.push(v);
    }
    return values.toString();
  };
  const isOpen = () => __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      if (plus.sqlite.isOpenDatabase({
        name: DB_NAME,
        path: DB_PATH
      })) {
        resolve({ code: 200, message: "数据库已打开" });
      } else {
        resolve({ code: 404, message: "数据库未打开" });
      }
    });
  });
  const openDB = () => __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      plus.sqlite.openDatabase({
        name: DB_NAME,
        path: DB_PATH,
        success: (e) => {
          resolve({ code: 200, message: "打开数据库成功" });
        },
        fail: (e) => {
          resolve({ code: 404, message: `打开数据库失败: ${JSON.stringify(e)}` });
        }
      });
    });
  });
  const closeDB = () => __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      plus.sqlite.closeDatabase({
        name: DB_NAME,
        success: (e) => {
          resolve({ code: 200, message: "关闭数据库成功" });
        },
        fail: (e) => {
          resolve({ code: 404, message: `关闭数据库失败: ${JSON.stringify(e)}` });
        }
      });
    });
  });
  const isTableExist = (tableName) => __async(this, null, function* () {
    return new Promise((resolve, reject) => {
      plus.sqlite.selectSql({
        name: DB_NAME,
        sql: `select count(*) as count from sqlite_master where type = 'table' and name = '${tableName}'`,
        success: (e) => {
          resolve({ code: 200, message: "", data: e[0].count !== 0 });
        },
        fail: (e) => {
          reject({ code: 404, message: `查询数据库失败: ${JSON.stringify(e)}` });
        }
      });
    });
  });
  const createTable = (dbTable, data) => {
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: DB_NAME,
        sql: [`CREATE TABLE IF NOT EXISTS ${dbTable}(${obj2str(data)})`],
        success(e) {
          resolve({ code: 200, message: "创建表成功" });
        },
        fail(e) {
          reject({ code: 404, message: `创建表失败: ${JSON.stringify(e)}` });
        }
      });
    });
  };
  const dropTable = (dbTable) => {
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: DB_NAME,
        sql: [`DROP TABLE ${dbTable}`],
        success(e) {
          resolve({ code: 200, message: "删除表成功" });
        },
        fail(e) {
          reject({ code: 404, message: `删除表失败: ${JSON.stringify(e)}` });
        }
      });
    });
  };
  const insertTableData = (dbTable, data, condition2) => {
    if (dbTable !== void 0 && data !== void 0) {
      var bol = JSON.stringify(data) === "{}";
      if (!bol) {
        var sql = `INSERT INTO ${dbTable} (${getObjKeys(data)}) VALUES(${getObjValues(data)})`;
        return new Promise((resolve, reject) => {
          plus.sqlite.executeSql({
            name: DB_NAME,
            sql: [sql],
            success(e) {
              resolve({ code: 200, message: "添加数据成功" });
            },
            fail(e) {
              reject({ code: 404, message: `添加数据失败: ${JSON.stringify(e)}` });
            }
          });
        });
      } else {
        return new Promise((resolve, reject) => {
          reject("错误添加");
        });
      }
    } else {
      return new Promise((resolve, reject) => {
        reject("错误添加");
      });
    }
  };
  const deleteTableData = (dbTable, lname, lvalue) => {
    if (dbTable !== void 0) {
      if (lname == void 0) {
        var sql = `DELETE FROM ${dbTable}`;
      } else {
        var sql = `DELETE FROM ${dbTable} WHERE ${lname} = '${lvalue}'`;
      }
      return new Promise((resolve, reject) => {
        plus.sqlite.executeSql({
          name: DB_NAME,
          sql: [sql],
          success(e) {
            resolve({ code: 200, message: "删除数据成功" });
          },
          fail(e) {
            reject({ code: 404, message: `删除数据失败: ${JSON.stringify(e)}` });
          }
        });
      });
    } else {
      return Promise.reject("错误删除");
    }
  };
  const selectTableData = (dbTable, condition2) => {
    if (dbTable !== void 0) {
      if (condition2) {
        var sql = `SELECT * FROM ${dbTable} WHERE ${unfoldCondition(condition2)}`;
      } else {
        var sql = `SELECT * FROM ${dbTable}`;
      }
      return new Promise((resolve, reject) => {
        plus.sqlite.selectSql({
          name: DB_NAME,
          sql,
          success(e) {
            resolve({ code: 200, message: "查询数据成功", data: e });
          },
          fail(e) {
            reject({ code: 404, message: `查询数据失败: ${JSON.stringify(e)}` });
          }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("错误查询");
      });
    }
  };
  const updateTableData = (dbTable, data, lname, lvalue) => {
    var sql;
    {
      var sql = `UPDATE ${dbTable} SET ${obj2str(
        data,
        " = ",
        true
      )} WHERE ${lname} = '${lvalue}'`;
    }
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: DB_NAME,
        sql: [sql],
        success(e) {
          resolve({ code: 200, message: "修改数据成功" });
        },
        fail(e) {
          reject({ code: 404, message: `修改数据失败: ${JSON.stringify(e)}` });
        }
      });
    });
  };
  const titles = [
    // * 路面
    {
      type: "沥青路面压实度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: true
        },
        {
          name: "路面类型",
          prop: "lmlx",
          echo: true
        },
        {
          name: "路、桥、隧",
          prop: "lqs",
          echo: true,
          pickerValue: ["路", "桥", "隧"]
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "取样位置",
          prop: "qywz",
          echo: true
        },
        {
          name: "层位",
          prop: "cw",
          echo: true,
          pickerValue: ["上面层", "中间层", "下面层"]
        },
        {
          name: "干燥试件质量",
          prop: "gzsjzl",
          echo: false,
          rules: {
            notNull: true
          }
        },
        {
          name: "试件水中质量",
          prop: "sjszzl",
          echo: false
        },
        {
          name: "时间表干质量",
          prop: "sjbgzl",
          echo: false
        },
        {
          name: "实验室标准密度",
          prop: "sysbzmd",
          echo: true
        },
        {
          name: "最大理论密度",
          prop: "zdllmd",
          echo: true
        },
        {
          name: "实验室标准密度规定值",
          prop: "sysbzmdgdz",
          echo: true
        },
        {
          name: "最大理论密度规定值",
          prop: "zdllmdgdz",
          echo: true
        },
        {
          name: "是否分离",
          prop: "sffl",
          echo: true,
          pickerValue: ["是", "否"]
        }
      ]
    },
    {
      type: "路面弯沉贝克曼梁法",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "工程部位",
          prop: "gcbw",
          echo: true
        },
        {
          name: "验收弯沉值",
          prop: "yswcz",
          echo: true
        },
        {
          name: "季节影响系数",
          prop: "jjyxxs",
          echo: true
        },
        {
          name: "结构层次",
          prop: "jgcc",
          echo: true
        },
        {
          name: "结构类型",
          prop: "jglx",
          echo: true
        },
        {
          name: "目标可靠指标",
          prop: "mbkkzb",
          echo: true
        },
        {
          name: "湿度影响系数",
          prop: "sdyxxs",
          echo: true
        },
        {
          name: "材料层厚度",
          prop: "clchd",
          echo: true
        },
        {
          name: "平衡湿度路基顶面回弹模量",
          prop: "phsdljdmhtml",
          echo: true
        },
        {
          name: "后轴重",
          prop: "hzz",
          echo: true
        },
        {
          name: "轮胎气压",
          prop: "ltqy",
          echo: true
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "车道",
          prop: "cd",
          echo: false,
          pickerValue: ["行1", "行2", "行3", "行4", "行5", "行6", "行7", "行8"]
        },
        {
          name: "左值",
          prop: "zz",
          echo: true
        },
        {
          name: "右值",
          prop: "yz",
          echo: true
        },
        {
          name: "路表温度",
          prop: "lbwd",
          echo: false
        },
        {
          name: "备注",
          prop: "bz",
          echo: false
        },
        {
          name: "测前5h平均温度",
          prop: "cqpjwd",
          echo: true
        },
        {
          name: "沥青层总厚度",
          prop: "lqczhd",
          echo: true
        },
        {
          name: "沥青表面温度",
          prop: "lqbmwd",
          echo: false
        },
        {
          name: "序号",
          prop: "xh",
          echo: true
        }
      ]
    },
    {
      type: "沥青路面渗水系数",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "主线、匝道、隧道",
          prop: "lxlx",
          echo: true,
          pickerValue: ["主线", "匝道", "隧道"]
        },
        {
          name: "初读数",
          prop: "cds",
          echo: true
        },
        {
          name: "第一分钟读数",
          prop: "ofzds",
          echo: false
        },
        {
          name: "第二分钟读数",
          prop: "tfzds",
          echo: false
        },
        {
          name: "水量",
          prop: "sl",
          echo: true
        },
        {
          name: "时间",
          prop: "sj",
          echo: true
        },
        {
          name: "渗水系数规定值",
          prop: "ssxsgdz",
          echo: true
        }
      ]
    },
    {
      type: "混凝土路面强度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "取样位置名称",
          prop: "qywzmc",
          echo: true
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "试样平均直径",
          prop: "sypjzj",
          echo: false
        },
        {
          name: "试样平均厚度",
          prop: "sypjhd",
          echo: false
        },
        {
          name: "极限荷载",
          prop: "jxhz",
          echo: true
        },
        {
          name: "路面强度规定值",
          prop: "lmqdgdz",
          echo: true
        }
      ]
    },
    {
      type: "砼路面相邻板高差",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "取样位置名称",
          prop: "qywzmc",
          echo: true
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "实测值1",
          prop: "scz1",
          echo: false
        },
        {
          name: "实测值2",
          prop: "scz2",
          echo: false
        },
        {
          name: "实测值3",
          prop: "scz3",
          echo: false
        },
        {
          name: "实测值4",
          prop: "scz4",
          echo: false
        },
        {
          name: "板高差规定值",
          prop: "bgcgdz",
          echo: true
        }
      ]
    },
    {
      type: "路面构造深度手工铺砂法",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "路面类型",
          prop: "lmlx",
          echo: true
        },
        {
          name: "ABM",
          prop: "abm",
          echo: false
        },
        {
          name: "ZY",
          prop: "zy",
          echo: true,
          pickerValue: ["z", "y"]
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "车道",
          prop: "cd",
          echo: true,
          pickerValue: ["行1", "行2", "行3", "行4", "行5", "行6", "行7", "行8"]
        },
        {
          name: "设计最小值",
          prop: "sjzxz",
          echo: true,
          numberOnly: true
        },
        {
          name: "设计最大值",
          prop: "sjzdz",
          echo: true,
          numberOnly: true
        },
        {
          name: "测点1D1",
          prop: "cd1d1",
          echo: false
        },
        {
          name: "测点1D2",
          prop: "cd1d2",
          echo: false
        },
        {
          name: "测点2D1",
          prop: "cd2d1",
          echo: false
        },
        {
          name: "测点2D2",
          prop: "cd2d2",
          echo: false
        },
        {
          name: "测点3D1",
          prop: "cd3d1",
          echo: false
        },
        {
          name: "测点3D2",
          prop: "cd3d2",
          echo: false
        }
      ]
    },
    {
      type: "高速沥青路面厚度钻芯法",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "路、桥、隧、匝道",
          prop: "lx",
          echo: false,
          pickerValue: ["路", "桥", "隧", "匝道"]
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "上面层测值1",
          prop: "smccz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "上面层测值2",
          prop: "smccz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "上面层测值3",
          prop: "smccz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "上面层测值4",
          prop: "smccz4",
          echo: false,
          numberOnly: true
        },
        {
          name: "上面层设计值",
          prop: "smcsjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "总厚度测值1",
          prop: "zhdcz1",
          echo: false
        },
        {
          name: "总厚度测值2",
          prop: "zhdcz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "总厚度测值3",
          prop: "zhdcz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "总厚度测值4",
          prop: "zhdcz4",
          echo: false,
          numberOnly: true
        },
        {
          name: "总厚度设计值",
          prop: "zhdsjz",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "混凝土路面厚度钻芯法",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "路、桥、隧、匝道",
          prop: "lx",
          echo: false,
          pickerValue: ["路", "桥", "隧", "匝道"]
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "部位",
          prop: "bw",
          echo: true
        },
        {
          name: "测值1",
          prop: "cz1",
          echo: false
        },
        {
          name: "测值2",
          prop: "cz2",
          echo: false
        },
        {
          name: "测值3",
          prop: "cz3",
          echo: false
        },
        {
          name: "测值4",
          prop: "cz4",
          echo: false
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true
        },
        {
          name: "允许偏差",
          prop: "yxps",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "路面横坡",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "路面类型",
          prop: "lmlx",
          echo: true
        },
        {
          name: "Z/Y",
          prop: "zy",
          echo: false,
          pickerValue: ["z", "y"]
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "位置",
          prop: "wz",
          echo: false,
          pickerValue: ["左幅", "右幅"]
        },
        {
          name: "前视读数",
          prop: "qsds",
          echo: true
        },
        {
          name: "后视读数",
          prop: "hsds",
          echo: true
        },
        {
          name: "长",
          prop: "length",
          echo: true,
          numberOnly: true
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "允许偏差",
          prop: "yxps",
          // ? why ps ? need pc ?
          echo: true,
          numberOnly: true
        },
        {
          name: "路线类型",
          prop: "lxlx",
          echo: true
        }
      ]
    },
    // * 路基
    {
      type: "涵洞砼强度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "部位1",
          prop: "bw1",
          echo: true,
          pickerValue: ["Z0#", "Y0#", "Z1#", "Y1#"]
        },
        {
          name: "部位2",
          prop: "bw2",
          echo: true,
          pickerValue: ["涵身", "八字墙"]
        },
        {
          name: "值1",
          prop: "z1",
          echo: false,
          numberOnly: true
        },
        {
          name: "值2",
          prop: "z2",
          echo: false,
          numberOnly: true
        },
        {
          name: "值3",
          prop: "z3",
          echo: false,
          numberOnly: true
        },
        {
          name: "值4",
          prop: "z4",
          echo: false,
          numberOnly: true
        },
        {
          name: "值5",
          prop: "z5",
          echo: false,
          numberOnly: true
        },
        {
          name: "值6",
          prop: "z6",
          echo: false,
          numberOnly: true
        },
        {
          name: "值7",
          prop: "z7",
          echo: false,
          numberOnly: true
        },
        {
          name: "值8",
          prop: "z8",
          echo: false,
          numberOnly: true
        },
        {
          name: "值9",
          prop: "z9",
          echo: false,
          numberOnly: true
        },
        {
          name: "值10",
          prop: "z10",
          echo: false,
          numberOnly: true
        },
        {
          name: "值11",
          prop: "z11",
          echo: false,
          numberOnly: true
        },
        {
          name: "值12",
          prop: "z12",
          echo: false,
          numberOnly: true
        },
        {
          name: "值13",
          prop: "z13",
          echo: false,
          numberOnly: true
        },
        {
          name: "值14",
          prop: "z14",
          echo: false,
          numberOnly: true
        },
        {
          name: "值15",
          prop: "z15",
          echo: false,
          numberOnly: true
        },
        {
          name: "值16",
          prop: "z16",
          echo: false,
          numberOnly: true
        },
        {
          name: "回弹角度",
          prop: "htjd",
          echo: true,
          pickerValue: ["90", "60", "45", "30", "-90", "-60", "-45", "-30"]
        },
        {
          name: "浇筑面",
          prop: "jzm",
          echo: true,
          pickerValue: ["表面", "底面", "侧面"]
        },
        {
          name: "碳化深度",
          prop: "thsd",
          echo: true,
          pickerValue: [
            "0.0",
            "0.5",
            "1.0",
            "2.0",
            "2.5",
            "3.0",
            "3.5",
            "4.0",
            "4.5",
            "5.0",
            "5.5",
            "≥6.0"
          ]
        },
        {
          name: "是否泵送",
          prop: "sfbs",
          echo: true,
          pickerValue: ["是", "否"]
        },
        {
          name: "设计强度",
          prop: "sjqd",
          echo: true,
          pickerValue: [
            "C15",
            "C20",
            "C25",
            "C30",
            "C35",
            "C40",
            "C45",
            "C50",
            "C55",
            "C60",
            "C65",
            "C70",
            "C75",
            "C80"
          ]
        }
      ]
    },
    {
      type: "涵洞结构尺寸",
      columns: [
        {
          name: "检测日期",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "部位",
          prop: "bw",
          echo: true,
          pickerValue: ["左侧", "右侧", "0#", "1#"]
        },
        {
          name: "类别",
          prop: "lb",
          echo: true,
          pickerValue: ["涵长", "净高", "盖板高度"]
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值",
          prop: "scz",
          echo: false,
          numberOnly: true
        },
        {
          name: "允许误差+(mm)",
          prop: "yxwcz",
          echo: true,
          numberOnly: true
        },
        {
          name: "允许误差-(mm)",
          prop: "yxwcf",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "排水断面尺寸",
      columns: [
        {
          name: "检测日期",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "部位",
          prop: "bw",
          echo: true,
          pickerValue: ["左侧", "右侧"]
        },
        {
          name: "类别",
          prop: "lb",
          echo: true
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值",
          prop: "scz",
          echo: false,
          numberOnly: true
        },
        {
          name: "允许误差+",
          prop: "yxwcz",
          echo: true,
          numberOnly: true
        },
        {
          name: "允许误差-",
          prop: "yxwcf",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "排水铺砌厚度",
      columns: [
        {
          name: "检测日期",
          prop: "jcsj",
          echo: true
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "部位",
          prop: "bw",
          echo: true,
          pickerValue: ["左侧", "右侧"]
        },
        {
          name: "类别",
          prop: "lb",
          echo: true
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值",
          prop: "scz",
          echo: false,
          numberOnly: true
        },
        {
          name: "允许误差",
          prop: "yxwc",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "路基土石方压实度(灰土)",
      columns: [
        {
          name: "试验时间",
          prop: "sysj",
          echo: false
        },
        {
          name: "路基压实度_灰土规定值",
          prop: "htgdz",
          echo: true
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "结构层次",
          prop: "jgcc",
          echo: true,
          pickerValue: ["路床顶"]
        },
        {
          name: "结构类型",
          prop: "jglx",
          echo: true,
          pickerValue: ["灰土", "水泥土", "砂砾", "建筑垃圾"]
        },
        {
          name: "最大干密度",
          prop: "zdgmd",
          echo: true
        },
        {
          name: "标准砂密度",
          prop: "bzsmd",
          echo: true
        },
        {
          name: "取样桩号及位置",
          prop: "qyzhjwz",
          echo: true
        },
        {
          name: "试坑深度",
          prop: "sksd",
          echo: true
        },
        {
          name: "锥体及基板和表面间砂质量",
          prop: "ztjjbhbmjszl",
          echo: true
        },
        {
          name: "灌砂前筒+砂质量",
          prop: "gsqtszl",
          echo: true
        },
        {
          name: "灌砂后筒+砂质量",
          prop: "gshtszl",
          echo: true
        },
        {
          name: "试样质量",
          prop: "syzl",
          echo: true
        },
        {
          name: "盒号",
          prop: "hh",
          echo: false
        },
        {
          name: "盒质量",
          prop: "hzl",
          echo: false
        },
        {
          name: "盒+湿试样质量",
          prop: "hsshzl",
          echo: false
        },
        {
          name: "盒+干试样质量",
          prop: "hgsyzl",
          echo: false
        },
        {
          name: "序号",
          prop: "xh",
          echo: false
        }
      ]
    },
    {
      type: "路基土石方压实度(沙砾)",
      columns: [
        {
          name: "试验时间",
          prop: "sysj"
        },
        {
          name: "路基压实度_砂砾规定值",
          prop: "slgdz"
        },
        {
          name: "桩号",
          prop: "zh"
        },
        {
          name: "a",
          prop: "a"
        },
        {
          name: "b",
          prop: "b"
        },
        {
          name: "c",
          prop: "c"
        },
        {
          name: "取样桩号及位置",
          prop: "qyzhjwz"
        },
        {
          name: "试坑深度",
          prop: "sksd"
        },
        {
          name: "灌砂前筒+砂质量",
          prop: "gsqtszl"
        },
        {
          name: "灌砂后筒+砂质量",
          prop: "gshtszl"
        },
        {
          name: "锥体砂重",
          prop: "ztsz"
        },
        {
          name: "量砂的密度",
          prop: "lsdmd"
        },
        {
          name: "混合料的湿质量",
          prop: "hhldszl"
        },
        {
          name: "盒号",
          prop: "hh"
        },
        {
          name: "盒+干质量",
          prop: "hgzl"
        },
        {
          name: "盒质量",
          prop: "hzl"
        },
        {
          name: "5-38mm颗粒质量",
          prop: "klzl"
        },
        {
          name: "序号",
          prop: "xh"
        }
      ]
    },
    {
      type: "路基压实度沉降",
      columns: [
        {
          name: "检测日期",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "允许偏差",
          prop: "yxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "检查桩号",
          prop: "jczh",
          echo: true
        },
        {
          name: "碾压读数1",
          prop: "nyds1",
          echo: false
        },
        {
          name: "碾压读数2",
          prop: "nyds2",
          echo: false
        },
        {
          name: "备注",
          prop: "bz",
          echo: false
        },
        {
          name: "序号",
          prop: "xh",
          echo: false
        }
      ]
    },
    {
      type: "路基弯沉贝克曼梁法",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "验收弯沉值",
          prop: "yswcz",
          echo: true
        },
        {
          name: "目标可靠指标",
          prop: "mbkkzb",
          echo: true
        },
        {
          name: "温度影响系数",
          prop: "sdyxxs",
          // ? sd or wd ?
          echo: true
        },
        {
          name: "季节影响系数",
          prop: "jjyxxs",
          echo: true
        },
        {
          name: "结构层次",
          prop: "jgcc",
          echo: true
        },
        {
          name: "结构类型",
          prop: "jglx",
          echo: true,
          pickerValue: ["灰土", "水泥土", "砂砾", "建筑垃圾"]
        },
        {
          name: "后轴重",
          prop: "hzz",
          echo: true
        },
        {
          name: "轮胎气压",
          prop: "ltqy",
          echo: true
        },
        {
          name: "抽检桩号",
          prop: "cjzh",
          echo: false
        },
        {
          name: "车道",
          prop: "cd",
          echo: false,
          pickerValue: ["行1", "行2", "行3", "行4", "行5", "行6", "行7", "行8"]
        },
        {
          name: "左值",
          prop: "zz",
          echo: false
        },
        {
          name: "右值",
          prop: "yz",
          echo: false
        },
        {
          name: "路表温度",
          prop: "lbwd",
          echo: true
        },
        {
          name: "备注",
          prop: "bz",
          echo: false
        },
        {
          name: "序号",
          prop: "xh",
          echo: false
        }
      ]
    },
    {
      type: "路基边坡",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "位置",
          prop: "wz",
          echo: true,
          pickerValue: ["左侧", "右侧"]
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "长",
          prop: "length",
          echo: false
        },
        {
          name: "高",
          prop: "high",
          echo: false
        }
      ]
    },
    {
      type: "小桥结构尺寸",
      columns: [
        {
          name: "检测时间",
          // ? sj or rq ?
          prop: "jcsj",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "部位",
          prop: "bw",
          echo: true,
          pickerValue: ["中心线", "桥台", "腹板"]
        },
        {
          name: "类别",
          prop: "lb",
          echo: true,
          pickerValue: ["桥长", "台宽", "台帽高", "板高"]
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值",
          prop: "scz",
          echo: false,
          numberOnly: true
        },
        {
          name: "允许误差+",
          prop: "yxwcz",
          echo: true,
          numberOnly: true
        },
        {
          name: "允许误差-",
          prop: "yxwcf",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "小桥砼强度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "部位1",
          prop: "bw1",
          echo: true
        },
        {
          name: "部位2",
          prop: "bw2",
          echo: true,
          pickerValue: ["底板", "台身"]
        },
        {
          name: "测定值1",
          prop: "cdz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "值2",
          prop: "z2",
          echo: false,
          numberOnly: true
        },
        {
          name: "值3",
          prop: "z3",
          echo: false,
          numberOnly: true
        },
        {
          name: "值4",
          prop: "z4",
          echo: false,
          numberOnly: true
        },
        {
          name: "值5",
          prop: "z5",
          echo: false,
          numberOnly: true
        },
        {
          name: "值6",
          prop: "z6",
          echo: false,
          numberOnly: true
        },
        {
          name: "值7",
          prop: "z7",
          echo: false,
          numberOnly: true
        },
        {
          name: "值8",
          prop: "z8",
          echo: false,
          numberOnly: true
        },
        {
          name: "值9",
          prop: "z9",
          echo: false,
          numberOnly: true
        },
        {
          name: "值10",
          prop: "z10",
          echo: false,
          numberOnly: true
        },
        {
          name: "值11",
          prop: "z11",
          echo: false,
          numberOnly: true
        },
        {
          name: "值12",
          prop: "z12",
          echo: false,
          numberOnly: true
        },
        {
          name: "值13",
          prop: "z13",
          echo: false,
          numberOnly: true
        },
        {
          name: "值14",
          prop: "z14",
          echo: false,
          numberOnly: true
        },
        {
          name: "值15",
          prop: "z15",
          echo: false,
          numberOnly: true
        },
        {
          name: "值16",
          prop: "z16",
          echo: false,
          numberOnly: true
        },
        {
          name: "回弹角度",
          prop: "htjd",
          echo: true,
          pickerValue: ["90", "60", "45", "30", "-90", "-60", "-45", "-30"]
        },
        {
          name: "浇筑面",
          prop: "jzm",
          echo: true,
          pickerValue: ["表面", "底面", "侧面"]
        },
        {
          name: "碳化深度",
          prop: "thsd",
          echo: true,
          pickerValue: [
            "0.0",
            "0.5",
            "1.0",
            "2.0",
            "2.5",
            "3.0",
            "3.5",
            "4.0",
            "4.5",
            "5.0",
            "5.5",
            "≥6.0"
          ]
        },
        {
          name: "是否泵送",
          prop: "sfbs",
          echo: true,
          pickerValue: ["是", "否"]
        },
        {
          name: "设计强度",
          prop: "sjqd",
          echo: true,
          pickerValue: [
            "C15",
            "C20",
            "C25",
            "C30",
            "C35",
            "C40",
            "C45",
            "C50",
            "C55",
            "C60",
            "C65",
            "C70",
            "C75",
            "C80"
          ]
        }
      ]
    },
    {
      type: "支挡断面尺寸",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桩号及位置",
          prop: "zhjwz",
          echo: true
        },
        {
          name: "抽检桩号",
          prop: "cjzh",
          echo: true
        },
        {
          name: "部位",
          prop: "bw",
          echo: true,
          pickerValue: [
            "抗滑桩",
            "拱形骨架梁",
            "窗孔式护面墙",
            "挡土墙",
            "护面墙",
            "路堑墙",
            "路肩墙"
          ]
        },
        {
          name: "类别",
          prop: "lb",
          echo: true,
          pickerValue: [
            "长",
            "宽",
            "护坡梁宽",
            "拱形窗净宽",
            "窗孔式净宽",
            "厚度"
          ]
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值",
          prop: "scz",
          echo: false,
          numberOnly: true
        },
        {
          name: "允许误差+",
          prop: "yxwcz",
          echo: true,
          numberOnly: true
        },
        {
          name: "允许误差-",
          prop: "yxwcf",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "支挡砼强度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "部位1",
          prop: "bw1",
          echo: true
        },
        {
          name: "部位2",
          prop: "bw2",
          echo: true,
          pickerValue: ["拱架", "框架", "墙身"]
        },
        {
          name: "测定值1",
          prop: "cdz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "值2",
          prop: "z2",
          echo: false,
          numberOnly: true
        },
        {
          name: "值3",
          prop: "z3",
          echo: false,
          numberOnly: true
        },
        {
          name: "值4",
          prop: "z4",
          echo: false,
          numberOnly: true
        },
        {
          name: "值5",
          prop: "z5",
          echo: false,
          numberOnly: true
        },
        {
          name: "值6",
          prop: "z6",
          echo: false,
          numberOnly: true
        },
        {
          name: "值7",
          prop: "z7",
          echo: false,
          numberOnly: true
        },
        {
          name: "值8",
          prop: "z8",
          echo: false,
          numberOnly: true
        },
        {
          name: "值9",
          prop: "z9",
          echo: false,
          numberOnly: true
        },
        {
          name: "值10",
          prop: "z10",
          echo: false,
          numberOnly: true
        },
        {
          name: "值11",
          prop: "z11",
          echo: false,
          numberOnly: true
        },
        {
          name: "值12",
          prop: "z12",
          echo: false,
          numberOnly: true
        },
        {
          name: "值13",
          prop: "z13",
          echo: false,
          numberOnly: true
        },
        {
          name: "值14",
          prop: "z14",
          echo: false,
          numberOnly: true
        },
        {
          name: "值15",
          prop: "z15",
          echo: false,
          numberOnly: true
        },
        {
          name: "值16",
          prop: "z16",
          echo: false,
          numberOnly: true
        },
        {
          name: "回弹角度",
          prop: "htjd",
          echo: true,
          pickerValue: ["90", "60", "45", "30", "-90", "-60", "-45", "-30"]
        },
        {
          name: "浇筑面",
          prop: "jzm",
          echo: true,
          pickerValue: ["表面", "底面", "侧面"]
        },
        {
          name: "碳化深度",
          prop: "thsd",
          echo: true,
          pickerValue: [
            "0.0",
            "0.5",
            "1.0",
            "2.0",
            "2.5",
            "3.0",
            "3.5",
            "4.0",
            "4.5",
            "5.0",
            "5.5",
            "≥6.0"
          ]
        },
        {
          name: "是否泵送",
          prop: "sfbs",
          echo: true,
          pickerValue: ["是", "否"]
        },
        {
          name: "设计强度",
          prop: "sjqd",
          echo: true,
          pickerValue: [
            "C15",
            "C20",
            "C25",
            "C30",
            "C35",
            "C40",
            "C45",
            "C50",
            "C55",
            "C60",
            "C65",
            "C70",
            "C75",
            "C80"
          ]
        }
      ]
    },
    {
      type: "支挡表面平整度",
      columns: []
    },
    // * 桥梁
    {
      type: "桥面平整度三米直尺法",
      columns: [
        {
          name: "检测日期",
          // ? rq or sj ?
          prop: "jcsj",
          echo: false
        },
        {
          name: "桥名",
          prop: "qm",
          echo: true
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "位置",
          prop: "wz",
          echo: true,
          pickerValue: ["左侧", "右侧"]
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值",
          prop: "scz",
          echo: false,
          numberOnly: true
        }
        // ? there is 'lmlx' in the database
        // ? but why it can't be shown at the frontend?
        // ? should it be necessary?
      ]
    },
    {
      type: "桥面横坡",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桥梁名称",
          prop: "qlmc",
          echo: true
        },
        {
          name: "路面类型",
          prop: "lmlx",
          echo: true
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "位置",
          prop: "wz",
          echo: true,
          pickerValue: ["左幅", "右幅"]
        },
        {
          name: "前视读数",
          prop: "qsds",
          echo: false
        },
        {
          name: "后视读数",
          prop: "hsds",
          echo: false
        },
        {
          name: "长",
          prop: "length",
          echo: true
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "允许偏差",
          prop: "yxps",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "桥面构造深度手工铺砂法",
      columns: [
        {
          name: "检测日期",
          prop: "jcsj",
          echo: true
        },
        {
          name: "桥梁名称",
          prop: "qlmc",
          echo: true
        },
        {
          name: "路面类型",
          // ? lmlx or jgmc ?
          prop: "jgmc",
          echo: true
        },
        {
          name: "ABM",
          prop: "abm",
          echo: true
        },
        {
          name: "ZY",
          prop: "zy",
          echo: true
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "车道",
          prop: "cd",
          echo: true,
          pickerValue: ["行1", "行2", "行3", "行4", "行5", "行6", "行7", "行8"]
        },
        {
          name: "设计最小值",
          prop: "sjzxz",
          echo: true,
          numberOnly: true
        },
        {
          name: "设计最大值",
          prop: "sjzdz",
          echo: true,
          numberOnly: true
        },
        {
          name: "测点1D1",
          prop: "cd1d1",
          echo: false
        },
        {
          name: "测点1D2",
          prop: "cd1d2",
          echo: false
        },
        {
          name: "测点2D1",
          prop: "cd2d1",
          echo: false
        },
        {
          name: "测点2D2",
          prop: "cd2d2",
          echo: false
        },
        {
          name: "测点3D1",
          prop: "cd3d1",
          echo: false
        },
        {
          name: "测点3D2",
          prop: "cd3d2",
          echo: false
        }
      ]
    },
    {
      type: "桥梁上部砼强度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桥梁名称",
          prop: "qlmc",
          echo: true
        },
        {
          name: "部位1",
          prop: "bw1",
          echo: true
        },
        {
          name: "部位2",
          prop: "bw2",
          echo: true,
          pickerValue: ["梁腹板", "梁底板"]
        },
        {
          name: "测定值1",
          prop: "cdz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "值2",
          prop: "z2",
          echo: false,
          numberOnly: true
        },
        {
          name: "值3",
          prop: "z3",
          echo: false,
          numberOnly: true
        },
        {
          name: "值4",
          prop: "z4",
          echo: false,
          numberOnly: true
        },
        {
          name: "值5",
          prop: "z5",
          echo: false,
          numberOnly: true
        },
        {
          name: "值6",
          prop: "z6",
          echo: false,
          numberOnly: true
        },
        {
          name: "值7",
          prop: "z7",
          echo: false,
          numberOnly: true
        },
        {
          name: "值8",
          prop: "z8",
          echo: false,
          numberOnly: true
        },
        {
          name: "值9",
          prop: "z9",
          echo: false,
          numberOnly: true
        },
        {
          name: "值10",
          prop: "z10",
          echo: false,
          numberOnly: true
        },
        {
          name: "值11",
          prop: "z11",
          echo: false,
          numberOnly: true
        },
        {
          name: "值12",
          prop: "z12",
          echo: false,
          numberOnly: true
        },
        {
          name: "值13",
          prop: "z13",
          echo: false,
          numberOnly: true
        },
        {
          name: "值14",
          prop: "z14",
          echo: false,
          numberOnly: true
        },
        {
          name: "值15",
          prop: "z15",
          echo: false,
          numberOnly: true
        },
        {
          name: "值16",
          prop: "z16",
          echo: false,
          numberOnly: true
        },
        {
          name: "回弹角度",
          prop: "htjd",
          echo: true,
          pickerValue: ["90", "60", "45", "30", "-90", "-60", "-45", "-30"]
        },
        {
          name: "浇筑面",
          prop: "jzm",
          echo: true,
          pickerValue: ["表面", "底面", "侧面"]
        },
        {
          name: "碳化深度",
          prop: "thsd",
          echo: true,
          pickerValue: [
            "0.0",
            "0.5",
            "1.0",
            "2.0",
            "2.5",
            "3.0",
            "3.5",
            "4.0",
            "4.5",
            "5.0",
            "5.5",
            "≥6.0"
          ]
        },
        {
          name: "是否泵送",
          prop: "sfbs",
          echo: true,
          pickerValue: ["是", "否"]
        },
        {
          name: "设计强度",
          prop: "sjqd",
          echo: true,
          pickerValue: [
            "C15",
            "C20",
            "C25",
            "C30",
            "C35",
            "C40",
            "C45",
            "C50",
            "C55",
            "C60",
            "C65",
            "C70",
            "C75",
            "C80"
          ]
        }
      ]
    },
    {
      type: "桥梁上部结构尺寸",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桥梁名称",
          prop: "qlmc",
          echo: false
        },
        {
          name: "部位",
          prop: "bw",
          echo: true,
          pickerValue: ["梁底板", "梁腹板"]
        },
        {
          name: "类别",
          prop: "lb",
          echo: true,
          pickerValue: ["高度", "宽度"]
        },
        {
          name: "梁板号",
          prop: "lbh",
          echo: true
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值",
          prop: "scz",
          echo: false,
          numberOnly: true
        },
        {
          name: "允许误差+",
          // ? wc or pc ?
          prop: "yxwcz",
          echo: true,
          numberOnly: true
        },
        {
          name: "允许误差-",
          prop: "yxwcf",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "桥梁上部保护层厚度",
      columns: [
        {
          name: "检测日期",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桥梁名称",
          prop: "qlmc",
          echo: true
        },
        {
          name: "构件编号及检测部位",
          prop: "gjbhjjcbw",
          echo: true
        },
        {
          name: "钢筋直径",
          prop: "gjzj",
          echo: true
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值1",
          prop: "scz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "实测值2",
          prop: "scz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "实测值3",
          prop: "scz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "实测值4",
          prop: "scz4",
          echo: false,
          numberOnly: true
        },
        {
          name: "实测值5",
          prop: "scz5",
          echo: false,
          numberOnly: true
        },
        {
          name: "实测值6",
          prop: "scz6",
          echo: false,
          numberOnly: true
        },
        {
          name: "修正值",
          prop: "xzz",
          echo: true
        },
        {
          name: "允许误差+",
          prop: "yxwcz",
          echo: true,
          numberOnly: true
        },
        {
          name: "允许误差-",
          prop: "yxwcz1",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "桥梁下部墩台砼强度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桥梁名称",
          prop: "qlmc",
          echo: true
        },
        {
          name: "部位1",
          prop: "bw1",
          echo: true
        },
        {
          name: "部位2",
          prop: "bw2",
          echo: true,
          pickerValue: ["墩柱", "桥台", "盖梁"]
        },
        {
          name: "测定值1",
          prop: "cdz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "值2",
          prop: "z2",
          echo: false,
          numberOnly: true
        },
        {
          name: "值3",
          prop: "z3",
          echo: false,
          numberOnly: true
        },
        {
          name: "值4",
          prop: "z4",
          echo: false,
          numberOnly: true
        },
        {
          name: "值5",
          prop: "z5",
          echo: false,
          numberOnly: true
        },
        {
          name: "值6",
          prop: "z6",
          echo: false,
          numberOnly: true
        },
        {
          name: "值7",
          prop: "z7",
          echo: false,
          numberOnly: true
        },
        {
          name: "值8",
          prop: "z8",
          echo: false,
          numberOnly: true
        },
        {
          name: "值9",
          prop: "z9",
          echo: false,
          numberOnly: true
        },
        {
          name: "值10",
          prop: "z10",
          echo: false,
          numberOnly: true
        },
        {
          name: "值11",
          prop: "z11",
          echo: false,
          numberOnly: true
        },
        {
          name: "值12",
          prop: "z12",
          echo: false,
          numberOnly: true
        },
        {
          name: "值13",
          prop: "z13",
          echo: false,
          numberOnly: true
        },
        {
          name: "值14",
          prop: "z14",
          echo: false,
          numberOnly: true
        },
        {
          name: "值15",
          prop: "z15",
          echo: false,
          numberOnly: true
        },
        {
          name: "值16",
          prop: "z16",
          echo: false,
          numberOnly: true
        },
        {
          name: "回弹角度",
          prop: "htjd",
          echo: true,
          pickerValue: ["90", "60", "45", "30", "-90", "-60", "-45", "-30"]
        },
        {
          name: "浇筑面",
          prop: "jzm",
          echo: true,
          pickerValue: ["表面", "底面", "侧面"]
        },
        {
          name: "碳化深度",
          prop: "thsd",
          echo: true,
          pickerValue: ["90", "60", "45", "30", "-90", "-60", "-45", "-30"]
        },
        {
          name: "是否泵送",
          prop: "sfbs",
          echo: true,
          pickerValue: ["是", "否"]
        },
        {
          name: "设计强度",
          prop: "sjqd",
          echo: true,
          pickerValue: [
            "C15",
            "C20",
            "C25",
            "C30",
            "C35",
            "C40",
            "C45",
            "C50",
            "C55",
            "C60",
            "C65",
            "C70",
            "C75",
            "C80"
          ]
        }
      ]
    },
    {
      type: "桥梁下部结构尺寸",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桥梁名称",
          prop: "qlmc",
          echo: true
        },
        {
          name: "部位",
          prop: "bw",
          echo: true,
          pickerValue: ["墩柱", "桥台", "盖梁"]
        },
        {
          name: "类别",
          prop: "lb",
          echo: true,
          pickerValue: ["直径", "长", "宽", "上宽"]
        },
        {
          name: "墩台号",
          prop: "dth",
          echo: true
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值",
          prop: "scz",
          echo: false,
          numberOnly: true
        },
        {
          name: "允许误差+",
          prop: "yxwcz",
          echo: true,
          numberOnly: true
        },
        {
          name: "允许误差-",
          prop: "yxwcf",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "桥梁下部保护层厚度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桥梁名称",
          prop: "qlmc",
          echo: true
        },
        {
          name: "构件编号及检测部位",
          prop: "gjbhjjcbw",
          echo: true
        },
        {
          name: "钢筋直径",
          prop: "gjzj",
          echo: true
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值1",
          prop: "scz1",
          echo: false
        },
        {
          name: "实测值2",
          prop: "scz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "实测值3",
          prop: "scz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "实测值4",
          prop: "scz4",
          echo: false,
          numberOnly: true
        },
        {
          name: "实测值5",
          prop: "scz5",
          echo: false,
          numberOnly: true
        },
        {
          name: "实测值6",
          prop: "scz6",
          echo: false,
          numberOnly: true
        },
        {
          name: "修正值",
          prop: "xzz",
          echo: true
        },
        {
          name: "允许误差+",
          prop: "yxwcz",
          echo: true,
          numberOnly: true
        },
        {
          name: "允许误差-",
          prop: "yxwcf",
          echo: true,
          numberOnly: true
        }
      ]
    },
    {
      type: "桥梁下部竖直度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桥梁名称",
          prop: "qlmc",
          echo: true
        },
        {
          name: "墩台号",
          prop: "dth",
          echo: true
        },
        {
          name: "墩柱高度",
          prop: "dzgd",
          echo: true
        },
        {
          name: "横向实测值",
          prop: "hxscz",
          echo: false,
          numberOnly: true
        },
        {
          name: "纵向实测值",
          prop: "zxscz",
          echo: false,
          numberOnly: true
        }
      ]
    },
    // * 交安
    {
      type: "交安标线",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "标线类型",
          prop: "bxlx",
          echo: true,
          pickerValue: [
            "溶剂型涂料标线",
            "热熔型涂料标线",
            "水性涂料标线",
            "双组分涂料标线",
            "预成型标线带标线"
          ]
        },
        {
          name: "位置",
          prop: "wz",
          echo: true
        },
        {
          name: "厚度规定值",
          prop: "hdgdz",
          echo: true,
          numberOnly: true
        },
        {
          name: "厚度允许偏差+",
          prop: "hdyxpsz",
          echo: true,
          numberOnly: true
        },
        {
          name: "厚度允许偏差-",
          prop: "hdyxpsf",
          echo: true,
          numberOnly: true
        },
        {
          name: "厚度实测值1",
          prop: "hdscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "厚度实测值2",
          prop: "hdscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "厚度实测值3",
          prop: "hdscz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "厚度实测值4",
          prop: "hdscz4",
          echo: false,
          numberOnly: true
        },
        {
          name: "厚度实测值5",
          prop: "hdscz5",
          echo: false,
          numberOnly: true
        },
        {
          name: "白线逆反射系数规定值",
          prop: "bxnfsxsgdz",
          echo: true,
          numberOnly: true
        },
        {
          name: "白线实测值1",
          prop: "bxscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "白线实测值2",
          prop: "bxscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "白线实测值3",
          prop: "bxscz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "白线实测值4",
          prop: "bxscz4",
          echo: false,
          numberOnly: true
        },
        {
          name: "白线实测值5",
          prop: "bxscz5",
          echo: false,
          numberOnly: true
        },
        {
          name: "黄线逆反射系数规定值",
          prop: "hxnfsxsgdz",
          echo: true,
          numberOnly: true
        },
        {
          name: "黄线实测值1",
          prop: "hxscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "黄线实测值2",
          prop: "hxscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "黄线实测值3",
          prop: "hxscz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "黄线实测值4",
          prop: "hxscz4",
          echo: false,
          numberOnly: true
        },
        {
          name: "黄线实测值5",
          prop: "hxscz5",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "交安标志",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "位置",
          prop: "wz",
          echo: true
        },
        {
          name: "立柱类型",
          prop: "lzlx",
          echo: true,
          pickerValue: ["单悬", "单柱", "双柱", "附着"]
        },
        {
          name: "竖直度允许偏差",
          prop: "szdyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "方向1实测值1",
          prop: "fx1scz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "方向1实测值2",
          prop: "fx1scz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "方向2实测值1",
          prop: "fx2scz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "方向2实测值2",
          prop: "fx2scz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "净空规定值",
          prop: "jkgdz",
          echo: true,
          numberOnly: true
        },
        {
          name: "净空实测值",
          prop: "jkscz",
          echo: false,
          numberOnly: true
        },
        {
          name: "厚度允许偏差",
          prop: "hdyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "厚度测值1",
          prop: "hdcz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "厚度测值2",
          prop: "hdcz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "白色V类允许偏差",
          prop: "bsvlyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "白色V类实测值1",
          prop: "bsvlscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "白色V类实测值2",
          prop: "bsvlscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "白色IV类允许偏差",
          prop: "bswlyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "白色IV类实测值1",
          prop: "bswlscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "白色IV类实测值2",
          prop: "bswlscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "绿色V类允许偏差",
          prop: "lsvlyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "绿色V类实测值1",
          prop: "lsvlscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "绿色V类实测值2",
          prop: "lsvlscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "绿色IV类允许偏差",
          prop: "lswlyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "绿色IV类实测值1",
          prop: "lswlscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "绿色IV类实测值2",
          prop: "lswlscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "黄色V类允许偏差",
          prop: "hsvlyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "黄色V类实测值1",
          prop: "hsvlscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "黄色V类实测值2",
          prop: "hsvlscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "黄色IV类允许偏差",
          prop: "hswlyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "黄色IV类实测值1",
          prop: "hswlscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "黄色IV类实测值2",
          prop: "hswlscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "蓝色V类允许偏差",
          prop: "lasvlyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "蓝色V类实测值1",
          prop: "lasvlscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "蓝色V类实测值2",
          prop: "lasvlscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "蓝色IV类允许偏差",
          prop: "laswlyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "蓝色IV类实测值1",
          prop: "laswlscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "蓝色IV类实测值2",
          prop: "laswlscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "红色V类允许偏差",
          prop: "rsvlyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "红色V类实测值1",
          prop: "rsvlscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "红色V类实测值2",
          prop: "rsvlscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "红色IV类允许偏差",
          prop: "rswlyxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "红色IV类实测值1",
          prop: "rswlscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "红色IV类实测值2",
          prop: "rswlscz2",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "交安波形防护栏",
      columns: [
        {
          name: "检测日期",
          prop: "jcsj",
          echo: false
        },
        {
          name: "位置及类型",
          prop: "wzjlx",
          echo: true
        },
        {
          name: "基底厚度规定值",
          prop: "jdhdgdz",
          echo: true,
          numberOnly: true
        },
        {
          name: "基底厚度实测值1",
          prop: "jdhdscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "基底厚度实测值2",
          prop: "jdhdscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "基底厚度实测值3",
          prop: "jdhdscz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "立柱壁厚规定值",
          prop: "lzbhgdz",
          echo: true,
          numberOnly: true
        },
        {
          name: "立柱壁厚实测值1",
          prop: "lzbhscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "立柱壁厚实测值2",
          prop: "lzbhscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "立柱壁厚实测值3",
          prop: "lzbhscz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "中心高度规定值",
          prop: "zxgdgdz",
          echo: true,
          numberOnly: true
        },
        {
          name: "中心高度允许偏差+",
          prop: "zxgdyxpsz",
          echo: true,
          numberOnly: true
        },
        {
          name: "中心高度允许偏差-",
          prop: "zxgdyxpsf",
          echo: true,
          numberOnly: true
        },
        {
          name: "中心高度实测值1",
          prop: "zxgdscz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "中心高度实测值2",
          prop: "zxgdscz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "中心高度实测值3",
          prop: "zxgdscz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "埋入深度规定值",
          prop: "mrsdgdz",
          echo: true,
          numberOnly: true
        },
        {
          name: "埋入深度实测值",
          prop: "mrsdscz",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "交安砼护栏强度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "位置",
          prop: "zh",
          echo: true
        },
        {
          name: "部位1",
          prop: "bw1",
          echo: true
        },
        {
          name: "部位2",
          prop: "bw2",
          echo: true,
          pickerValue: ["护栏"]
        },
        {
          name: "测定值1",
          prop: "cdz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "值2",
          prop: "z2",
          echo: false,
          numberOnly: true
        },
        {
          name: "值3",
          prop: "z3",
          echo: false,
          numberOnly: true
        },
        {
          name: "值4",
          prop: "z4",
          echo: false,
          numberOnly: true
        },
        {
          name: "值5",
          prop: "z5",
          echo: false,
          numberOnly: true
        },
        {
          name: "值6",
          prop: "z6",
          echo: false,
          numberOnly: true
        },
        {
          name: "值7",
          prop: "z7",
          echo: false,
          numberOnly: true
        },
        {
          name: "值8",
          prop: "z8",
          echo: false,
          numberOnly: true
        },
        {
          name: "值9",
          prop: "z9",
          echo: false,
          numberOnly: true
        },
        {
          name: "值10",
          prop: "z10",
          echo: false,
          numberOnly: true
        },
        {
          name: "值11",
          prop: "z11",
          echo: false,
          numberOnly: true
        },
        {
          name: "值12",
          prop: "z12",
          echo: false,
          numberOnly: true
        },
        {
          name: "值13",
          prop: "z13",
          echo: false,
          numberOnly: true
        },
        {
          name: "值14",
          prop: "z14",
          echo: false,
          numberOnly: true
        },
        {
          name: "值15",
          prop: "z15",
          echo: false,
          numberOnly: true
        },
        {
          name: "值16",
          prop: "z16",
          echo: false,
          numberOnly: true
        },
        {
          name: "回弹角度",
          prop: "htjd",
          echo: true,
          pickerValue: ["90", "60", "45", "30", "-90", "-60", "-45", "-30"]
        },
        {
          name: "浇筑面",
          prop: "jzm",
          echo: true,
          pickerValue: ["表面", "底面", "侧面"]
        },
        {
          name: "碳化深度",
          prop: "thsd",
          echo: true,
          pickerValue: [
            "0.0",
            "0.5",
            "1.0",
            "2.0",
            "2.5",
            "3.0",
            "3.5",
            "4.0",
            "4.5",
            "5.0",
            "5.5",
            "≥6.0"
          ]
        },
        {
          name: "是否泵送",
          prop: "sfbs",
          echo: true,
          pickerValue: ["是", "否"]
        },
        {
          name: "设计强度",
          prop: "sjqd",
          echo: true,
          pickerValue: [
            "C15",
            "C20",
            "C25",
            "C30",
            "C35",
            "C40",
            "C45",
            "C50",
            "C55",
            "C60",
            "C65",
            "C70",
            "C75",
            "C80"
          ]
        }
      ]
    },
    {
      type: "交安砼护栏断面尺寸",
      columns: [
        {
          name: "检测日期",
          prop: "jcrq",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "部位",
          prop: "bw",
          echo: true
        },
        {
          name: "类别",
          prop: "lb",
          echo: true,
          pickerValue: ["上宽", "高"]
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值",
          prop: "scz",
          echo: false,
          numberOnly: true
        },
        {
          name: "允许误差+",
          prop: "yxwcz",
          echo: true,
          numberOnly: true
        },
        {
          name: "允许误差-",
          prop: "yxwcf",
          echo: true,
          numberOnly: true
        }
      ]
    },
    // * 隧道
    {
      type: "隧道衬砌砼强度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: true
        },
        {
          name: "部位1",
          prop: "bw1",
          echo: true
        },
        {
          name: "部位2",
          prop: "bw2",
          echo: true,
          pickerValue: ["左边墙", "右边墙"]
        },
        {
          name: "测定值1",
          prop: "cdz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "值2",
          prop: "z2",
          echo: false,
          numberOnly: true
        },
        {
          name: "值3",
          prop: "z3",
          echo: false,
          numberOnly: true
        },
        {
          name: "值4",
          prop: "z4",
          echo: false,
          numberOnly: true
        },
        {
          name: "值5",
          prop: "z5",
          echo: false,
          numberOnly: true
        },
        {
          name: "值6",
          prop: "z6",
          echo: false,
          numberOnly: true
        },
        {
          name: "值7",
          prop: "z7",
          echo: false,
          numberOnly: true
        },
        {
          name: "值8",
          prop: "z8",
          echo: false,
          numberOnly: true
        },
        {
          name: "值9",
          prop: "z9",
          echo: false,
          numberOnly: true
        },
        {
          name: "值10",
          prop: "z10",
          echo: false,
          numberOnly: true
        },
        {
          name: "值11",
          prop: "z11",
          echo: false,
          numberOnly: true
        },
        {
          name: "值12",
          prop: "z12",
          echo: false,
          numberOnly: true
        },
        {
          name: "值13",
          prop: "z13",
          echo: false,
          numberOnly: true
        },
        {
          name: "值14",
          prop: "z14",
          echo: false,
          numberOnly: true
        },
        {
          name: "值15",
          prop: "z15",
          echo: false,
          numberOnly: true
        },
        {
          name: "值16",
          prop: "z16",
          echo: false,
          numberOnly: true
        },
        {
          name: "回弹角度",
          prop: "htjd",
          echo: true,
          pickerValue: ["90", "60", "45", "30", "-90", "-60", "-45", "-30"]
        },
        {
          name: "浇筑面",
          prop: "jzm",
          echo: true,
          pickerValue: ["表面", "底面", "侧面"]
        },
        {
          name: "碳化深度",
          prop: "thsd",
          echo: true,
          pickerValue: [
            "0.0",
            "0.5",
            "1.0",
            "2.0",
            "2.5",
            "3.0",
            "3.5",
            "4.0",
            "4.5",
            "5.0",
            "5.5",
            "≥6.0"
          ]
        },
        {
          name: "是否泵送",
          prop: "sfbs",
          echo: true,
          pickerValue: ["是", "否"]
        },
        {
          name: "设计强度",
          prop: "sjqd",
          echo: true,
          pickerValue: [
            "C15",
            "C20",
            "C25",
            "C30",
            "C35",
            "C40",
            "C45",
            "C50",
            "C55",
            "C60",
            "C65",
            "C70",
            "C75",
            "C80"
          ]
        }
      ]
    },
    {
      type: "隧道衬砌厚度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: true
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "位置",
          prop: "wz",
          echo: true,
          pickerValue: ["左幅", "右幅"]
        },
        {
          name: "设计厚度",
          prop: "sjhd",
          echo: true
        },
        {
          name: "左拱腰1",
          prop: "zgy1",
          echo: false
        },
        {
          name: "左拱腰2",
          prop: "zgy2",
          echo: false
        },
        {
          name: "左拱腰3",
          prop: "zgy3",
          echo: false
        },
        {
          name: "右拱腰1",
          prop: "ygy1",
          echo: false
        },
        {
          name: "右拱腰2",
          prop: "ygy2",
          echo: false
        },
        {
          name: "右拱腰3",
          prop: "ygy3",
          echo: false
        },
        {
          name: "拱顶",
          prop: "gd",
          echo: false
        }
      ]
    },
    {
      type: "隧道大面平整度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: true
        },
        {
          name: "桩号",
          prop: "zh",
          echo: true
        },
        {
          name: "允许偏差",
          prop: "yxps",
          echo: true,
          numberOnly: true
        },
        {
          name: "实测值",
          prop: "scz",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "隧道沥青路面压实度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "路面类型",
          prop: "lmlx",
          echo: false
        },
        {
          name: "路桥隧",
          prop: "lqs",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: false
        },
        {
          name: "取样位置",
          prop: "qywz",
          echo: false
        },
        {
          name: "层位",
          prop: "cw",
          echo: false
        },
        {
          name: "干燥试件质量",
          prop: "gzsjzl",
          echo: false
        },
        {
          name: "试件水中质量",
          prop: "sjszzl",
          echo: false
        },
        {
          name: "时间表干质量",
          prop: "sjbgzl",
          echo: false
        },
        {
          name: "实验室标准密度",
          prop: "sysbzmd",
          echo: false
        },
        {
          name: "最大理论密度",
          prop: "zdllmd",
          echo: false
        },
        {
          name: "实验室标准密度规定值",
          prop: "sysbzmdgdz",
          echo: false,
          numberOnly: true
        },
        {
          name: "最大理论密度规定值",
          prop: "zdllmdgdz",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "隧道沥青路面渗水系数",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: false
        },
        {
          name: "主线、匝道、隧道",
          prop: "lzdsd",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: false
        },
        {
          name: "初读数",
          prop: "cds",
          echo: false
        },
        {
          name: "第一分钟读数",
          prop: "ofzds",
          echo: false
        },
        {
          name: "第二分钟读数",
          prop: "tfzds",
          echo: false
        },
        {
          name: "水量",
          prop: "sl",
          echo: false
        },
        {
          name: "时间",
          prop: "sj",
          echo: false
        },
        {
          name: "渗水系数规定值",
          prop: "ssxsgdz",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "隧道混凝土路面强度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: false
        },
        {
          name: "试样平均直径",
          prop: "sypjzj",
          echo: false
        },
        {
          name: "试样平均厚度",
          prop: "sypjhd",
          echo: false
        },
        {
          name: "极限荷载",
          prop: "jxhz",
          echo: false
        },
        {
          name: "路面强度规定值",
          prop: "lmqdgdz",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "隧道砼路面相邻板高差",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: false
        },
        {
          name: "取样缝位置",
          prop: "qyfwz",
          echo: false
        },
        {
          name: "实测值1",
          prop: "scz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "实测值2",
          prop: "scz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "实测值3",
          prop: "scz3",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "隧道路面构造深度手工铺砂法",
      columns: [
        {
          name: "检测日期",
          prop: "jcsj",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: false
        },
        {
          name: "路面类型",
          prop: "lmlx",
          echo: false
        },
        {
          name: "ABM",
          prop: "abm",
          echo: false
        },
        {
          name: "ZY",
          prop: "zy",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: false
        },
        {
          name: "车道",
          prop: "cd",
          echo: false
        },
        {
          name: "设计最小值",
          prop: "sjzxz",
          echo: false,
          numberOnly: true
        },
        {
          name: "设计最大值",
          prop: "sjzdz",
          echo: false,
          numberOnly: true
        },
        {
          name: "测点1D1",
          prop: "cd1d1",
          echo: false
        },
        {
          name: "测点1D2",
          prop: "cd1d2",
          echo: false
        },
        {
          name: "测点2D1",
          prop: "cd2d1",
          echo: false
        },
        {
          name: "测点2D2",
          prop: "cd2d2",
          echo: false
        },
        {
          name: "测点3D1",
          prop: "cd3d1",
          echo: false
        },
        {
          name: "测点3D2",
          prop: "cd3d2",
          echo: false
        }
      ]
    },
    {
      type: "隧道沥青路面厚度钻芯法",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "路、桥、隧、匝道",
          prop: "lqszd",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: false
        },
        {
          name: "部位",
          prop: "bw",
          echo: false
        },
        {
          name: "上面层测值1",
          prop: "smcz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "上面层测值2",
          prop: "smcz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "上面层测值3",
          prop: "smcz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "上面层测值4",
          prop: "smcz4",
          echo: false,
          numberOnly: true
        },
        {
          name: "上面层设计值",
          prop: "smcsjz",
          echo: false,
          numberOnly: true
        },
        {
          name: "总厚度测值1",
          prop: "zhdz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "总厚度测值2",
          prop: "zhdz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "总厚度测值3",
          prop: "zhdz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "总厚度测值4",
          prop: "zhdz4",
          echo: false,
          numberOnly: true
        },
        {
          name: "总厚度设计值",
          prop: "zhdsjz",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "隧道混凝土路面厚度钻芯法",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "路、桥、隧、匝道",
          prop: "lqszd",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: false
        },
        {
          name: "部位",
          prop: "bw",
          echo: false
        },
        {
          name: "测值1",
          prop: "cz1",
          echo: false,
          numberOnly: true
        },
        {
          name: "测值2",
          prop: "cz2",
          echo: false,
          numberOnly: true
        },
        {
          name: "测值3",
          prop: "cz3",
          echo: false,
          numberOnly: true
        },
        {
          name: "测值4",
          prop: "cz4",
          echo: false,
          numberOnly: true
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "隧道横坡",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: false
        },
        {
          name: "路面类型",
          prop: "lmlx",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: false
        },
        {
          name: "位置",
          prop: "wz",
          echo: false
        },
        {
          name: "前视读数",
          prop: "qsds",
          echo: false
        },
        {
          name: "后视读数",
          prop: "hsds",
          echo: false
        },
        {
          name: "长",
          prop: "length",
          echo: false
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: false,
          numberOnly: true
        },
        {
          name: "允许偏差",
          prop: "yxps",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "隧道总体宽度",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "隧道名称",
          prop: "sdmc",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: false
        },
        {
          name: "左边宽",
          prop: "zbk",
          echo: false
        },
        {
          name: "右边宽",
          prop: "ybk",
          echo: false
        },
        {
          name: "设计值",
          prop: "sjz",
          echo: false,
          numberOnly: true
        }
      ]
    },
    {
      type: "净空",
      columns: [
        {
          name: "检测时间",
          prop: "jcsj",
          echo: false
        },
        {
          name: "桩号",
          prop: "zh",
          echo: false
        },
        {
          name: "点号",
          prop: "dh",
          echo: false
        },
        {
          name: "X",
          prop: "xz",
          echo: false
        },
        {
          name: "Z",
          prop: "zz",
          echo: false
        },
        {
          name: "偏差值",
          prop: "pcz",
          echo: false
        }
      ]
    }
  ];
  const getTitlesByType = () => {
    var _a2;
    const mainStore = useMainStore();
    const t = mainStore.getCurType();
    return (_a2 = titles.find((item) => item.type === t)) == null ? void 0 : _a2.columns;
  };
  const createColumnsAndTable$1 = (columns, tableData) => {
    var _a2;
    const data = (_a2 = getTitlesByType()) != null ? _a2 : [];
    Object.assign(columns, data);
    const t = getTableData(data);
    withStatus(t);
    withDelete(t);
    withUpdate(t);
    Object.assign(tableData, t);
    return true;
  };
  const initDB$1 = () => __async(this, null, function* () {
    const op = yield isOpen();
    if (op.code === 200)
      return;
    const res = yield openDB();
    if (res.code !== 200) {
      toast("打开数据库失败");
      return;
    }
  });
  const initDBTable$1 = (columns) => __async(this, null, function* () {
    var _a2;
    const name = (_a2 = getCurTableTitleByFBGC()) != null ? _a2 : "";
    const res = yield isTableExist(name);
    if (res.data) {
      return "ok";
    }
    const data = {};
    attachStatus(data);
    data["proname"] = "";
    data["htd"] = "";
    data["fbgc"] = "";
    data["username"] = "";
    for (const column of columns) {
      data[column.prop] = "TEXT";
    }
    const res2 = yield createTable(name, __spreadValues({
      lid: "INTEGER PRIMARY KEY AUTOINCREMENT"
    }, data));
    if (res2.code !== 200) {
      toast("创建表失败");
    }
    return "ok";
  });
  const getLocalData$1 = () => __async(this, null, function* () {
    var _a2, _b2;
    const mainStore = useMainStore();
    const title = (_a2 = getCurTableTitleByFBGC()) != null ? _a2 : "";
    const res = yield selectTableData(title, {
      proname: mainStore.projInfo.proname,
      htd: mainStore.projInfo.htd,
      fbgc: getTrueFBGC(),
      username: mainStore.username
    });
    if (res.code !== 200) {
      toast("获取数据失败");
      return [];
    }
    return (_b2 = res.data) != null ? _b2 : [];
  });
  const afterUpload$1 = (data) => __async(this, null, function* () {
    var _a2, _b2;
    const title = (_a2 = getCurTableTitleByFBGC()) != null ? _a2 : "";
    for (let i = 0; i < data.length; i++) {
      if (((_b2 = data[i]["status"]) != null ? _b2 : "未保存") !== "已保存") {
        continue;
      }
      data[i]["status"] = "已提交";
      const res = yield updateTableData(title, data[i], "lid", data[i]["lid"]);
      if (res.code !== 200) {
        toast("更新数据失败");
      }
    }
  });
  const deleteLocalData$1 = (lid) => __async(this, null, function* () {
    var _a2;
    const title = (_a2 = getCurTableTitleByFBGC()) != null ? _a2 : "";
    const res = yield deleteTableData(title, "lid", lid);
    if (res.code !== 200) {
      toast("删除数据失败");
    }
  });
  const deleteAllLocalData$1 = (data) => __async(this, null, function* () {
    var _a2;
    const title = (_a2 = getCurTableTitleByFBGC()) != null ? _a2 : "";
    for (let i = 0; i < data.length; i++) {
      if (data[i]["lid"] !== void 0) {
        const res = yield deleteTableData(title, "lid", data[i]["lid"]);
        if (res.code !== 200) {
          toast("删除数据失败");
        }
      }
    }
  });
  const saveToLocal$1 = (data) => __async(this, null, function* () {
    var _a2;
    const mainStore = useMainStore();
    const title = getCurTableTitleByFBGC();
    if (!title) {
      return Promise.reject("未找到表名");
    }
    for (let i = 0; i < data.length; i++) {
      if (((_a2 = data[i]["status"]) != null ? _a2 : "未保存") !== "未保存") {
        continue;
      }
      data[i]["status"] = "已保存";
      if (data[i]["lid"] !== void 0) {
        const res2 = yield updateTableData(title, data[i], "lid", data[i]["lid"]);
        if (res2.code !== 200) {
          return Promise.reject(res2.message);
        }
        continue;
      }
      data[i]["proname"] = mainStore.projInfo.proname;
      data[i]["htd"] = mainStore.projInfo.htd;
      data[i]["fbgc"] = getTrueFBGC();
      data[i]["username"] = mainStore.username;
      const res = yield insertTableData(title, data[i]);
      if (res.code !== 200) {
        toast("保存数据失败");
        return Promise.reject(res.message);
      }
    }
    return Promise.resolve("保存成功");
  });
  const getPureRecords$1 = (tableData, needUpload = true) => {
    const rec = [];
    for (let i = 0; i < tableData.data.length; i++) {
      if (!needUpload) {
        if (tableData.data[i]["status"] === "已提交") {
          continue;
        }
      }
      const t = __spreadValues({}, tableData.data[i]);
      delete t["delete"];
      delete t["update"];
      delete t["opts"];
      rec.push(t);
    }
    return rec;
  };
  const getAttachmentOpts$1 = (color) => {
    return {
      opts: {
        update: {
          type: "button",
          fontColor: "#8FBF9F"
        },
        delete: {
          type: "button",
          fontColor: "#de283b"
        },
        status: {
          fontColor: color
        }
      }
    };
  };
  const statusToColor$1 = (status) => {
    switch (status) {
      case "已保存":
        return "green";
      case "已提交":
        return "blue";
      default:
        return "red";
    }
  };
  const defaultCellStyle = {
    type: "text",
    color: "white",
    fontColor: "black",
    fontSize: 26,
    light: false,
    transparent: true,
    asyncStyleCell: false,
    sort: false
  };
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-row",
    props: __spreadProps(__spreadValues({}, custom_props), {
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
      var _a2, _b2;
      const store = useTmpiniaStore();
      const props = __props;
      const emits = __emit;
      const proxy = (_b2 = (_a2 = vue.getCurrentInstance()) == null ? void 0 : _a2.proxy) != null ? _b2 : null;
      const tmcfg = vue.computed(() => store.tmStore);
      const customCSSStyle = vue.computed(() => computedStyle$1(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const tmcomputed = vue.computed(() => computedTheme$1(props, isDark.value, tmcfg.value));
      const colWidth = vue.inject(
        "TmColWidth",
        vue.computed(() => 0)
      );
      const width_px_rect = vue.ref(uni.upx2px(Number(props.width)));
      const width_px_rect_rp = vue.computed(() => width_px_rect.value);
      const justifyAlign = {
        start: "flex-start",
        end: "flex-end",
        center: "center",
        around: "space-around",
        between: "space-between"
      };
      const justify_rp = vue.computed(() => justifyAlign[props.justify] || "start");
      const AlignAlign = {
        start: "flex-start",
        end: "flex-end",
        center: "center",
        stretch: "stretch"
      };
      const align_rp = vue.computed(() => AlignAlign[props.align] || "start");
      const _round = vue.computed(() => {
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
        uni.createSelectorQuery().in(proxy).select(".tm-row").boundingClientRect().exec(function(res) {
          var _a3, _b3;
          if ((_a3 = res[0]) == null ? void 0 : _a3.width) {
            width_px_rect.value = (_b3 = res[0]) == null ? void 0 : _b3.width;
          } else {
            wxmpGetRect();
          }
        });
      }
      vue.onMounted(() => {
        wxmpGetRect();
      });
      vue.onUpdated(() => {
        wxmpGetRect();
      });
      vue.provide("TmRowWidth", width_px_rect_rp);
      vue.provide(
        "TmRowColumn",
        vue.computed(() => props.column)
      );
      vue.watchEffect(() => {
        if (colWidth.value > 0) {
          width_px_rect.value = colWidth.value;
        }
      });
      let textColor = vue.computed(() => tmcomputed.value.textColor);
      vue.provide("appTextColor", textColor);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            ref: "tmRow",
            onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => emits("click", $event), ["stop"])),
            class: vue.normalizeClass(["flex tm-row", ["overflow ", _round.value, customClass.value, `mx-${props.margin[0]} my-${__props.margin[1]}`]]),
            style: vue.normalizeStyle([
              { flexDirection: "row", flexWrap: "wrap" },
              props.height ? { height: props.height + "rpx" } : "",
              width_px_rect_rp.value ? { width: width_px_rect.value + "px" } : "",
              { justifyContent: justify_rp.value, alignItems: align_rp.value },
              !props.transprent ? tmcomputed.value.backgroundColorCss : "",
              !props.transprent ? tmcomputed.value.shadowColor : "",
              customCSSStyle.value
            ])
          },
          [
            vue.renderSlot(_ctx.$slots, "default")
          ],
          6
          /* CLASS, STYLE */
        );
      };
    }
  });
  const tmRow = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-row/tm-row.vue"]]);
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-col",
    props: __spreadProps(__spreadValues({}, custom_props), {
      height: {
        type: [Number, String],
        default: 50
      },
      color: {
        type: String,
        default: "white"
      },
      //占据的列数。
      col: {
        type: Number,
        default: 1
      },
      transprent: {
        type: [Boolean, String],
        default: false
      },
      align: {
        type: String,
        default: "center"
        //'start' | 'center' | 'end'
      },
      margin: {
        type: Array,
        default: () => [0]
      },
      //这里因为这个组件可能会被大量使用嵌套
      //为了性能，其它属性不再使用主题，而是直接使用值，对性能来说更为重要。
      borderColor: {
        type: String,
        default: "rgba(0,0,0,0.04)"
      },
      //表示四周的边线，这里与原有的border属性不关联，为了不与前面的属性产生混乱，
      //重新取一个属性作为值来使用。
      borderGutter: {
        type: Array,
        default: () => [0, 0, 0, 0]
      },
      hoverClass: {
        type: String,
        default: ""
      }
    }),
    emits: ["click"],
    setup(__props, { emit: __emit }) {
      const store = useTmpiniaStore();
      const emits = __emit;
      const props = __props;
      const tmcfg = vue.computed(() => store.tmStore);
      const customCSSStyle = vue.computed(() => computedStyle$1(props));
      const customClass = vue.computed(() => computedClass(props));
      const isDark = vue.computed(() => computedDark(props, tmcfg.value));
      const tmcomputed = vue.computed(() => computedTheme$1(props, isDark.value, tmcfg.value));
      const _borderColor = vue.computed(() => {
        if (isDark.value)
          return "rgba(255,255,255,0.02)";
        return props.borderColor || "rgba(0,0,0,0.04)";
      });
      const _margin = vue.computed(() => {
        if (props.margin.length == 1)
          return [props.margin[0], props.margin[0], props.margin[0], props.margin[0]];
        if (props.margin.length == 2)
          return [props.margin[0], props.margin[1], props.margin[0], props.margin[1]];
        if (props.margin.length == 3)
          return [props.margin[0], props.margin[1], props.margin[2], 0];
        if (props.margin.length == 4)
          return [props.margin[0], props.margin[1], props.margin[2], props.margin[3]];
        return [0, 0, 0, 0];
      });
      const TmRowWidth = vue.inject(
        "TmRowWidth",
        vue.computed(() => 0)
      );
      const TmRowColumn = vue.inject(
        "TmRowColumn",
        vue.computed(() => 0)
      );
      const colWidth = vue.computed(() => {
        if (TmRowWidth.value == 0)
          return 0;
        let w = Number(TmRowWidth.value / TmRowColumn.value * props.col).toFixed(4);
        return w;
      });
      vue.provide(
        "TmColWidth",
        vue.computed(() => Number(colWidth.value) - uni.upx2px(_margin.value[0] + _margin.value[2]))
      );
      let justifyAlign = {
        start: "flex-start",
        end: "flex-end",
        center: "center"
      };
      const alignComputed = vue.computed(() => justifyAlign[props.align]);
      let textColor = vue.computed(() => tmcomputed.value.textColor);
      vue.provide("appTextColor", textColor);
      return (_ctx, _cache) => {
        return colWidth.value ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          "hover-class": props.hoverClass,
          onClick: _cache[0] || (_cache[0] = ($event) => emits("click", $event)),
          class: "flex relative",
          style: vue.normalizeStyle([{ width: colWidth.value + "px" }, props.height ? { height: props.height + "rpx" } : ""])
        }, [
          vue.createElementVNode(
            "view",
            {
              eventPenetrationEnabled: true,
              style: vue.normalizeStyle([
                {
                  marginLeft: _margin.value[0] + "rpx",
                  marginTop: _margin.value[1] + "rpx",
                  marginRight: _margin.value[2] + "rpx",
                  marginBottom: _margin.value[3] + "rpx",
                  borderLeft: `${props.borderGutter[0]}rpx solid ${_borderColor.value}`,
                  borderTop: `${props.borderGutter[1]}rpx solid ${_borderColor.value}`,
                  borderRight: `${props.borderGutter[2]}rpx solid ${_borderColor.value}`,
                  borderBottom: `${props.borderGutter[3]}rpx solid ${_borderColor.value}`
                },
                !__props.transprent && props.shadow > 0 ? tmcomputed.value.shadowColor : "",
                !__props.transprent ? tmcomputed.value.backgroundColorCss : "",
                { alignItems: alignComputed.value, justifyContent: alignComputed.value },
                customCSSStyle.value
              ]),
              class: vue.normalizeClass(["flex flex-col flex-1 ", `round-${props.round}`, customClass.value])
            },
            [
              vue.renderSlot(_ctx.$slots, "default")
            ],
            6
            /* CLASS, STYLE */
          )
        ], 12, ["hover-class"])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  const tmCol = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-col/tm-col.vue"]]);
  const cutomProps = {
    /**是否显示表格头 */
    showHeader: {
      type: Boolean,
      default: true
    },
    /**表格数据 */
    tableData: {
      type: Object,
      default: () => {
        return {
          data: [],
          fields: {
            columns: []
          },
          header: []
        };
      }
    },
    /**宽度 */
    width: {
      type: Number,
      default: 750
    },
    /**表格单元格的宽度  */
    cellWidth: {
      type: Number,
      default: 160
    },
    /**如果提供了高度，将产生上下滑动的表格。 */
    height: {
      type: Number,
      default: 0
    },
    /**单元格的高度。 */
    cellHeight: {
      type: Number,
      default: 72
    },
    /**头部的高度。 */
    headerHeight: {
      type: Number,
      default: 100
    },
    /**是否显示格格下划线 */
    showBottomBorder: {
      type: Boolean,
      default: true
    },
    /**是否显示固定列 */
    showFixed: {
      type: Boolean,
      default: false
    },
    /**开户间隔条纹 */
    stripe: {
      type: Boolean,
      default: false
    }
  };
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "tm-table",
    props: cutomProps,
    emits: ["rowClick"],
    setup(__props, { emit: __emit }) {
      const emits = __emit;
      const props = __props;
      const _data = vue.ref(props.tableData);
      const sortType = vue.ref("none");
      let tid = NaN;
      const _stripe = vue.computed(() => props.stripe);
      const totalTableWidth = vue.computed(() => {
        let d = props.cellWidth * _data.value.header.length;
        if (d <= props.width)
          d = props.width;
        return d;
      });
      const _rows = vue.ref([]);
      let _rows_back = [];
      const _maxrows = vue.ref(0);
      vue.onMounted(() => {
        _rows.value = chuliRows(_data.value.data);
        _rows_back = uni.$tm.u.deepClone(_rows.value);
      });
      vue.watch(
        [() => props.tableData],
        () => {
          clearTimeout(tid);
          tid = setTimeout(() => {
            let cdatas = uni.$tm.u.deepClone(props.tableData);
            _data.value = __spreadValues({}, cdatas);
            _rows.value = chuliRows(_data.value.data);
            _rows_back = uni.$tm.u.deepClone(_rows.value);
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
          var _a2;
          let ptps = (_a2 = el["opts"]) != null ? _a2 : {};
          _data.value.header.forEach((ielem) => {
            var _a3;
            if (ptps[ielem.field]) {
              ptps[ielem.field] = __spreadValues({}, (_a3 = ptps[ielem.field]) != null ? _a3 : {});
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
            var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i;
            let isasync = (_b2 = (_a2 = el == null ? void 0 : el.opts) == null ? void 0 : _a2.asyncStyleCell) != null ? _b2 : false;
            return {
              value: (_c2 = ele[el.field]) != null ? _c2 : "-",
              opts: __spreadValues(__spreadValues(__spreadValues({}, defaultCellStyle), {
                color: isasync === true ? (_e2 = (_d2 = el.opts) == null ? void 0 : _d2.color) != null ? _e2 : "white" : "white",
                fontColor: isasync === true ? (_g2 = (_f2 = el.opts) == null ? void 0 : _f2.fontColor) != null ? _g2 : "black" : "",
                light: isasync === true ? (_i = (_h2 = el.opts) == null ? void 0 : _h2.light) != null ? _i : false : false
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
        var _a2, _b2;
        let d = (_b2 = ((_a2 = _rows.value[index1]) != null ? _a2 : [])[index2].opts) != null ? _b2 : __spreadValues({}, defaultCellStyle);
        return d;
      }
      function cellClick(index1, index2) {
        var _a2, _b2;
        let dp = (_b2 = ((_a2 = _rows.value[index1]) != null ? _a2 : [])[index2].value) != null ? _b2 : "";
        emits("rowClick", index2, index1, dp);
      }
      function sort(data, index, type = "none", callback) {
        uni.showLoading({
          title: "...",
          mask: true
        });
        let d = data[index];
        if (type == "none") {
          data = uni.$tm.u.deepClone(_rows_back);
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
        vue.nextTick(() => {
          if (callback) {
            callback(data);
          }
          uni.hideLoading();
        });
      }
      function headerClick(item, index) {
        var _a2, _b2;
        if ((_b2 = (_a2 = item.opts) == null ? void 0 : _a2.sort) != null ? _b2 : false) {
          let d = uni.$tm.u.deepClone(_rows.value);
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
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: "tableBox",
            style: vue.normalizeStyle([{ width: props.width + "rpx" }, props.height ? { height: props.height + "rpx" } : ""])
          },
          [
            props.showHeader ? (vue.openBlock(), vue.createBlock(tmRow, {
              key: 0,
              transprent: true,
              width: totalTableWidth.value,
              column: _data.value.header.length
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(_data.value.header, (item, index) => {
                    var _a2, _b2, _c2, _d2;
                    return vue.openBlock(), vue.createBlock(tmCol, {
                      _class: "flex flex-row flex-row-center-center",
                      text: (_b2 = (_a2 = item.opts) == null ? void 0 : _a2.light) != null ? _b2 : false,
                      height: props.headerHeight,
                      color: (_d2 = (_c2 = item.opts) == null ? void 0 : _c2.color) != null ? _d2 : "primary",
                      transprent: false,
                      key: index,
                      onClick: ($event) => headerClick(item, index)
                    }, {
                      default: vue.withCtx(() => {
                        var _a3, _b3, _c3, _d3, _e2, _f2, _g2, _h2;
                        return [
                          vue.createElementVNode(
                            "view",
                            {
                              style: vue.normalizeStyle({
                                width: (((_b3 = (_a3 = item.opts) == null ? void 0 : _a3.sort) != null ? _b3 : false) ? totalTableWidth.value / _data.value.header.length - 60 : totalTableWidth.value / _data.value.header.length - 60) + "rpx"
                              })
                            },
                            [
                              vue.createVNode(__easycom_0$4, {
                                _class: "text-overflow-2 text-align-center",
                                "line-height": 0,
                                "font-size": (_d3 = (_c3 = item.opts) == null ? void 0 : _c3.fontSize) != null ? _d3 : 0,
                                color: (_f2 = (_e2 = item.opts) == null ? void 0 : _e2.fontColor) != null ? _f2 : "",
                                label: item.name
                              }, null, 8, ["font-size", "color", "label"])
                            ],
                            4
                            /* STYLE */
                          ),
                          ((_h2 = (_g2 = item.opts) == null ? void 0 : _g2.sort) != null ? _h2 : false) ? (vue.openBlock(), vue.createBlock(tmIcon, {
                            key: 0,
                            name: "tmicon-sort",
                            "font-size": 26
                          })) : vue.createCommentVNode("v-if", true)
                        ];
                      }),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["text", "height", "color", "onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["width", "column"])) : vue.createCommentVNode("v-if", true),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(_maxrows.value, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: item },
                  [
                    vue.createElementVNode(
                      "view",
                      {
                        style: vue.normalizeStyle({ width: totalTableWidth.value + "rpx" })
                      },
                      [
                        props.showBottomBorder && !_stripe.value ? (vue.openBlock(), vue.createBlock(tmDivider, {
                          key: 0,
                          color: "grey-5",
                          margin: [0, 0]
                        })) : vue.createCommentVNode("v-if", true)
                      ],
                      4
                      /* STYLE */
                    ),
                    vue.createVNode(tmRow, {
                      color: _stripe.value ? index % 2 ? "grey-5" : "white" : "white",
                      width: totalTableWidth.value,
                      column: _data.value.header.length,
                      transprent: false
                    }, {
                      default: vue.withCtx(() => [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(_data.value.header.length, (item2, index2) => {
                            var _a2, _b2, _c2, _d2;
                            return vue.openBlock(), vue.createBlock(tmCol, {
                              text: (_b2 = (_a2 = getOptsCellStyle(index2, index)) == null ? void 0 : _a2.light) != null ? _b2 : false,
                              height: props.cellHeight,
                              key: item2,
                              color: (_d2 = (_c2 = getOptsCellStyle(index2, index)) == null ? void 0 : _c2.color) != null ? _d2 : "",
                              transprent: _stripe.value,
                              onClick: ($event) => cellClick(index2, index),
                              _class: "flex flex-row flex-row-center-center"
                            }, {
                              default: vue.withCtx(() => {
                                var _a3, _b3, _c3, _d3, _e2, _f2, _g2, _h2, _i, _j, _k;
                                return [
                                  ((_c3 = (_b3 = ((_a3 = _rows.value[index2]) != null ? _a3 : [])[index].opts) == null ? void 0 : _b3.type) != null ? _c3 : "text") == "button" ? (vue.openBlock(), vue.createElementBlock("view", {
                                    key: 0,
                                    class: "flex-1"
                                  }, [
                                    vue.createVNode(__easycom_2, {
                                      "font-size": (_e2 = (_d3 = getOptsCellStyle(index2, index)) == null ? void 0 : _d3.fontSize) != null ? _e2 : 26,
                                      color: (_g2 = (_f2 = getOptsCellStyle(index2, index)) == null ? void 0 : _f2.fontColor) != null ? _g2 : "primary",
                                      label: (_i = ((_h2 = _rows.value[index2]) != null ? _h2 : [])[index].value) != null ? _i : "-",
                                      margin: [10, 10],
                                      height: props.cellHeight - 20,
                                      size: "mini",
                                      block: ""
                                    }, null, 8, ["font-size", "color", "label", "height"])
                                  ])) : (vue.openBlock(), vue.createBlock(__easycom_0$4, {
                                    key: 1,
                                    "font-size": getOptsCellStyle(index2, index).fontSize,
                                    "line-height": 0,
                                    color: getOptsCellStyle(index2, index).fontColor,
                                    label: (_k = ((_j = _rows.value[index2]) != null ? _j : [])[index].value) != null ? _k : "-"
                                  }, null, 8, ["font-size", "color", "label"]))
                                ];
                              }),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["text", "height", "color", "transprent", "onClick"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["color", "width", "column"])
                  ],
                  64
                  /* STABLE_FRAGMENT */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          4
          /* STYLE */
        );
      };
    }
  });
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-3d418c75"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/tmui/components/tm-table/tm-table.vue"]]);
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "dataTable",
    props: {
      data: { type: null, required: true }
    },
    emits: ["update", "delete"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const hdClick = (row, col) => {
        if (col === 0) {
          emit("update", row);
        } else if (col === 1) {
          emit("delete", row);
        }
      };
      return (_ctx, _cache) => {
        const _component_tm_table = resolveEasycom(vue.resolveDynamicComponent("tm-table"), __easycom_0$2);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_3);
        return vue.openBlock(), vue.createBlock(_component_tm_app, null, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "table" }, [
              vue.createVNode(_component_tm_table, {
                "table-data": _ctx.data,
                width: 4e3,
                height: 1e3,
                "header-height": 100,
                "cell-height": 100,
                stripe: "",
                onRowClick: hdClick
              }, null, 8, ["table-data"])
            ])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  });
  const DataTable$1 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-ca296120"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/recordsManage/components/dataTable.vue"]]);
  const useVModel = (props, propName, emit) => {
    return vue.computed({
      get() {
        const proxy = new Proxy(props[propName], {
          get(target, key) {
            return Reflect.get(target, key);
          },
          set(target, key, value) {
            emit("update:" + propName, __spreadProps(__spreadValues({}, target), {
              [key]: value
            }));
            return true;
          }
        });
        return proxy;
      },
      set(val) {
        emit("update:" + propName, val);
      }
    });
  };
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation(__spreadValues({}, options));
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config2 = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, __spreadValues({
          styles
        }, config2), (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config: config2
        } = obj;
        this._animateRun(styles, config2).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config2 = {}) {
      this.animation.step(config2);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$f = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = __spreadProps(__spreadValues({}, this.styles), {
          "transition-duration": this.duration / 1e3 + "s"
        });
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config2 = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            console.error(`方法 ${i} 不存在`);
          }
        }
        this.animation.step(config2);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$2], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/node_modules/@dcloudio/uni-ui/lib/uni-transition/uni-transition.vue"]]);
  const _sfc_main$e = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        type: String
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          backgroundColor: "transparent",
          borderRadius: this.borderRadius || "0",
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      getStyles() {
        let res = { backgroundColor: this.bg };
        if (this.borderRadius || "0") {
          res = Object.assign(res, { borderRadius: this.borderRadius });
        }
        return res;
      },
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    activated() {
      this.setH5Visible(!this.showPopup);
    },
    deactivated() {
      this.setH5Visible(true);
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible(visible = true) {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          console.error("缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$1);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle($options.getStyles),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$1], ["__scopeId", "data-v-7db519c7"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/node_modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue"]]);
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "popupPicker",
    props: {
      payload: { type: Array, required: true },
      title: { type: String, required: true }
    },
    emits: ["confirm", "cancel"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const popup = vue.ref();
      __expose({
        show() {
          popup.value.open();
        },
        hide() {
          popup.value.close();
        }
      });
      const props = __props;
      const selected = vue.ref([0]);
      const b = vue.computed(() => {
        return props.payload[selected.value[0]];
      });
      const visible = vue.ref(true);
      const indicatorStyle = vue.ref(`height: 68rpx;`);
      const emit = __emit;
      const hdCancel = () => {
        emit("cancel");
        popup.value.close();
        selected.value = [0];
      };
      const hdChange = (i) => {
        selected.value[0] = i;
      };
      const hdConfirm = () => {
        emit("confirm", b.value);
        popup.value.close();
        selected.value = [0];
      };
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0);
        return vue.openBlock(), vue.createBlock(
          _component_uni_popup,
          {
            ref_key: "popup",
            ref: popup,
            type: "bottom",
            onMaskClick: _cache[1] || (_cache[1] = ($event) => selected.value[0] = 0)
          },
          {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", { class: "popup-view" }, [
                vue.createElementVNode("div", { class: "popup-view-header" }, [
                  vue.createElementVNode("div", {
                    class: "popup-view-1",
                    onClick: hdCancel
                  }, "取消"),
                  vue.createElementVNode(
                    "div",
                    { class: "popup-view-2" },
                    vue.toDisplayString(_ctx.title),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("div", {
                    class: "popup-view-3",
                    onClick: hdConfirm
                  }, "完成")
                ]),
                visible.value ? (vue.openBlock(), vue.createElementBlock("picker-view", {
                  key: 0,
                  "indicator-style": indicatorStyle.value,
                  value: selected.value,
                  class: "picker-view",
                  onChange: _cache[0] || (_cache[0] = ($event) => hdChange($event.detail.value[0]))
                }, [
                  vue.createElementVNode("picker-view-column", null, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(_ctx.payload, (item, index) => {
                        return vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            class: "item",
                            key: index
                          },
                          vue.toDisplayString(item),
                          1
                          /* TEXT */
                        );
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ], 40, ["indicator-style", "value"])) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        );
      };
    }
  });
  const PopupPicker = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-30571b16"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/recordsManage/components/popupPicker.vue"]]);
  const throttle = (func, duration2, immediate = false) => {
    if (immediate) {
      let t;
      return (...args) => {
        if (!t || Date.now() - t > duration2) {
          func(...args);
          t = Date.now();
        }
      };
    } else {
      let timer;
      return (...args) => {
        if (!timer) {
          timer = setTimeout(() => {
            func(...args);
            timer = void 0;
          }, duration2);
        }
      };
    }
  };
  const useCompRef = (_) => {
    return vue.ref();
  };
  const rulesMsg = {
    notNull(s) {
      return s != null ? s : "输入内容不能为空";
    }
  };
  const rulesValid = {
    notNull(constraint, content) {
      return !constraint || !!content;
    }
  };
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "dataForm",
    props: {
      columns: { type: Array, required: true },
      modelValue: { type: null, required: true },
      enterTab: { type: Boolean, required: true }
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
            if (!rulesValid[rule](
              item.rules[rule],
              model.value[item.prop]
            )) {
              hintsMsg.value[i] = rulesMsg[rule]();
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
      const mainStore = useMainStore();
      const model = useVModel(props, "modelValue", emit);
      const currPosition = vue.ref(-1);
      const currPayload = vue.ref([""]);
      const currTitle = vue.ref("");
      const pickerInstance = useCompRef();
      const hintsMsg = vue.ref([]);
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
        var _a2;
        currPayload.value = payload != null ? payload : getPickerValueByIndex(index);
        currTitle.value = getTitleByIndex(index);
        (_a2 = pickerInstance.value) == null ? void 0 : _a2.show();
      };
      const needPicker = (index) => {
        return isQm(index) || getPickerValueByIndex(index) !== void 0 && getPickerValueByIndex(index).length > 0 && (model.value[getPropByIndex(index)] === void 0 || model.value[getPropByIndex(index)] === "");
      };
      const isQm = (index) => {
        return getPropByIndex(index) === "qm" || getPropByIndex(index) === "qlmc";
      };
      const needDisable = (prop) => {
        return dateTag.includes(prop);
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
        const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), __easycom_0$4);
        const _component_tm_input = resolveEasycom(vue.resolveDynamicComponent("tm-input"), __easycom_1$1);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_3);
        return vue.openBlock(), vue.createBlock(_component_tm_app, { color: "white" }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "container" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(_ctx.columns, (item, index) => {
                  var _a2;
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "chunk",
                    key: index
                  }, [
                    vue.createVNode(_component_tm_text, {
                      "font-size": 35,
                      label: item.name
                    }, null, 8, ["label"]),
                    vue.createVNode(_component_tm_text, {
                      color: "red",
                      label: hintsMsg.value[index] || ""
                    }, null, 8, ["label"]),
                    ((_a2 = _ctx.enterTab) != null ? _a2 : false) ? (vue.openBlock(), vue.createBlock(_component_tm_input, {
                      key: 0,
                      "font-size": vue.unref(fontSize),
                      focus: !needDisable(item.prop) && currPosition.value === index,
                      modelValue: vue.unref(model)[item.prop],
                      "onUpdate:modelValue": ($event) => vue.unref(model)[item.prop] = $event,
                      type: item.numberOnly ? "number" : "text",
                      onConfirm: ($event) => toNext(index),
                      onBlur: _cache[0] || (_cache[0] = ($event) => currPosition.value = -1),
                      disabled: needDisable(item.prop)
                    }, null, 8, ["font-size", "focus", "modelValue", "onUpdate:modelValue", "type", "onConfirm", "disabled"])) : (vue.openBlock(), vue.createBlock(_component_tm_input, {
                      key: 1,
                      "font-size": vue.unref(fontSize),
                      focus: !needDisable(item.prop) && currPosition.value === index,
                      modelValue: vue.unref(model)[item.prop],
                      "onUpdate:modelValue": ($event) => vue.unref(model)[item.prop] = $event,
                      type: item.numberOnly ? "number" : "text",
                      onBlur: _cache[1] || (_cache[1] = ($event) => currPosition.value = -1),
                      disabled: needDisable(item.prop)
                    }, null, 8, ["font-size", "focus", "modelValue", "onUpdate:modelValue", "type", "disabled"])),
                    vue.createElementVNode("view", {
                      class: "overlap",
                      onClick: ($event) => hdClick(index)
                    }, null, 8, ["onClick"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              vue.createVNode(PopupPicker, {
                ref_key: "pickerInstance",
                ref: pickerInstance,
                payload: currPayload.value,
                title: currTitle.value,
                onConfirm: hdConfirm
              }, null, 8, ["payload", "title"])
            ])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  });
  const DataForm$1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-85de2756"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/recordsManage/components/dataForm.vue"]]);
  const duration = 250;
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "comOverlay",
    props: {
      show: { type: Boolean, required: true }
    },
    emits: ["close", "update:show"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const fadeFlag = vue.ref(false);
      const showMask = vue.ref(false);
      vue.watch(
        () => props.show,
        (val) => {
          openOrClose(val);
        }
      );
      vue.onMounted(() => {
        if (props.show) {
          openOrClose(true);
        }
      });
      const hdClose = (e) => {
        e.stopPropagation();
        openOrClose(false);
      };
      const switchStatus = (status) => {
        if (status) {
          showMask.value = true;
          setTimeout(() => {
            fadeFlag.value = true;
          }, 15);
          setTimeout(() => {
            emit("update:show", true);
          }, duration);
        } else {
          fadeFlag.value = false;
          setTimeout(() => {
            showMask.value = false;
            emit("close");
            emit("update:show", false);
          }, duration + 15);
        }
      };
      const throttleSwitchStatus = throttle(switchStatus, duration + 15, true);
      const openOrClose = (val) => {
        if (showMask.value === val)
          return;
        throttleSwitchStatus(val);
      };
      return (_ctx, _cache) => {
        return showMask.value ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["mask", "overlap", fadeFlag.value ? "fade-in" : "fade-out"]),
              style: vue.normalizeStyle({
                transitionDuration: duration + "ms"
              })
            },
            null,
            6
            /* CLASS, STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["close-area", fadeFlag.value ? "fade-in" : "fade-out"]),
              style: vue.normalizeStyle({
                transitionDuration: duration + "ms"
              }),
              onClick: vue.withModifiers(hdClose, ["stop"])
            },
            [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ],
            6
            /* CLASS, STYLE */
          )
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  });
  const ComOverlay = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-813158a5"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/components/comOverlay.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "contentModal",
    props: {
      show: { type: Boolean, required: true },
      title: { type: String, required: true },
      portraitSize: { type: Object, required: false },
      landscapeSize: { type: Object, required: false }
    },
    emits: ["update:show", "close"],
    setup(__props, { emit: __emit }) {
      var _a2, _b2, _c2, _d2;
      vue.useCssVars((_ctx) => ({
        "e90c614f-lw": vue.unref(lw),
        "e90c614f-lh": vue.unref(lh),
        "e90c614f-pw": vue.unref(pw),
        "e90c614f-ph": vue.unref(ph)
      }));
      const props = __props;
      const emit = __emit;
      const showModel = vue.computed({
        get() {
          return props.show;
        },
        set(val) {
          emit("update:show", val);
        }
      });
      const hdClose = () => {
        emit("close");
      };
      const lw = ((_a2 = props.landscapeSize) == null ? void 0 : _a2.width) || "1000px";
      const lh = ((_b2 = props.landscapeSize) == null ? void 0 : _b2.height) || "500px";
      const pw = ((_c2 = props.portraitSize) == null ? void 0 : _c2.width) || "90%";
      const ph = ((_d2 = props.portraitSize) == null ? void 0 : _d2.height) || "80%";
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(ComOverlay, {
          show: showModel.value,
          "onUpdate:show": _cache[1] || (_cache[1] = ($event) => showModel.value = $event),
          onClose: hdClose
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: "border",
              onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => $event.stopPropagation(), ["stop"]))
            }, [
              vue.createElementVNode("view", { class: "title" }, [
                vue.createElementVNode(
                  "h1",
                  null,
                  vue.toDisplayString(props.title),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "content" }, [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ]),
              vue.createElementVNode("view", { class: "button" }, [
                vue.renderSlot(_ctx.$slots, "button", {}, void 0, true)
              ])
            ])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["show"]);
      };
    }
  });
  const ContentModal = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-e90c614f"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/components/contentModal.vue"]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "formModel",
    props: {
      show: { type: Boolean, required: true },
      title: { type: String, required: true },
      modelValue: { type: null, required: true },
      columns: { type: Array, required: true },
      addRecord: { type: Boolean, required: false },
      enterTab: { type: Boolean, required: false }
    },
    emits: ["update:modelValue", "update:show", "cancel", "add", "confirm", "close"],
    setup(__props, { emit: __emit }) {
      vue.useCssVars((_ctx) => ({
        "5e07d3ce-gridStyle": vue.unref(gridStyle)
      }));
      const props = __props;
      const emit = __emit;
      const model = useVModel(props, "modelValue", emit);
      const form = useCompRef();
      const outputModel = vue.computed({
        get() {
          return props.show;
        },
        set(value) {
          emit("update:show", value);
        }
      });
      const gridStyle = props.addRecord ? "repeat(3, 1fr)" : "repeat(2, 1fr)";
      const hdCancel = () => {
        outputModel.value = false;
        emit("cancel");
      };
      const hdConfirm = () => {
        var _a2;
        if (!((_a2 = form.value) == null ? void 0 : _a2.validate()))
          return;
        outputModel.value = false;
        emit("confirm");
      };
      const hdAdd = () => {
        var _a2;
        if (!((_a2 = form.value) == null ? void 0 : _a2.validate()))
          return;
        emit("add");
      };
      return (_ctx, _cache) => {
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), __easycom_2);
        return vue.openBlock(), vue.createBlock(ContentModal, {
          title: _ctx.title,
          show: outputModel.value,
          "onUpdate:show": _cache[1] || (_cache[1] = ($event) => outputModel.value = $event),
          onClose: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("close"))
        }, {
          default: vue.withCtx(() => {
            var _a2;
            return [
              vue.createVNode(DataForm$1, {
                ref_key: "form",
                ref: form,
                "enter-tab": (_a2 = _ctx.enterTab) != null ? _a2 : false,
                modelValue: vue.unref(model),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(model) ? model.value = $event : null),
                columns: _ctx.columns
              }, null, 8, ["enter-tab", "modelValue", "columns"])
            ];
          }),
          button: vue.withCtx(() => [
            _ctx.addRecord ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "bottom-btns"
            }, [
              vue.createVNode(_component_tm_button, {
                block: "",
                text: "",
                margin: [0, 0],
                height: 120,
                round: -1,
                label: "取消",
                onClick: hdCancel
              }),
              vue.createVNode(_component_tm_button, {
                block: "",
                margin: [0, 0],
                height: 120,
                round: -1,
                label: "完成",
                onClick: hdConfirm
              }),
              vue.createVNode(_component_tm_button, {
                block: "",
                margin: [0, 0],
                height: 120,
                round: -1,
                label: "新增",
                onClick: hdAdd,
                color: "#42b883"
              })
            ])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "bottom-btns"
            }, [
              vue.createVNode(_component_tm_button, {
                block: "",
                text: "",
                margin: [0, 0],
                height: 100,
                round: -1,
                label: "取消",
                onClick: hdCancel
              }),
              vue.createVNode(_component_tm_button, {
                block: "",
                margin: [0, 0],
                height: 100,
                round: -1,
                label: "完成",
                onClick: hdConfirm
              })
            ]))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["title", "show"]);
      };
    }
  });
  const FormModel$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-5e07d3ce"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/recordsManage/components/formModel.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "askModel",
    props: {
      show: { type: Boolean, required: true },
      title: { type: String, required: true },
      checkColor: { type: String, required: false },
      content: { type: String, required: true }
    },
    emits: ["update:show", "check", "cancel"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const showModel = vue.computed({
        get() {
          return props.show;
        },
        set(value) {
          emit("update:show", value);
        }
      });
      const hdCheck = () => {
        showModel.value = false;
        emit("check");
      };
      const hdCancel = () => {
        showModel.value = false;
        emit("cancel");
      };
      return (_ctx, _cache) => {
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), __easycom_2);
        return vue.openBlock(), vue.createBlock(ContentModal, {
          show: showModel.value,
          "onUpdate:show": _cache[0] || (_cache[0] = ($event) => showModel.value = $event),
          title: _ctx.title,
          "landscape-size": {
            width: "300px",
            height: "200px"
          },
          "portrait-size": {
            width: "400px",
            height: "300px"
          }
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "view",
              { class: "content" },
              vue.toDisplayString(_ctx.content),
              1
              /* TEXT */
            )
          ]),
          button: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "bottom-btns" }, [
              vue.createVNode(_component_tm_button, {
                block: "",
                text: "",
                margin: [0, 0],
                height: 100,
                round: -1,
                label: "取消",
                onClick: hdCancel
              }),
              vue.createVNode(_component_tm_button, {
                block: "",
                margin: [0, 0],
                height: 100,
                round: -1,
                label: "确认",
                color: _ctx.checkColor,
                onClick: hdCheck
              }, null, 8, ["color"])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["show", "title"]);
      };
    }
  });
  const AskModel$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-cf7ee239"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/recordsManage/components/askModel.vue"]]);
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const mainStore = useMainStore();
      const showAddModel = vue.ref(false);
      const showDeleteModel = vue.ref(false);
      const showClearModel = vue.ref(false);
      const showUpdateModel = vue.ref(false);
      const showUploadModel = vue.ref(false);
      const flag = vue.ref(false);
      let curDelete = -1;
      let curUpdate = -1;
      const columns = vue.reactive([]);
      const tableData = vue.reactive({});
      const record = vue.ref({});
      const setTableData = (data) => {
        for (const c of data) {
          tableData.data.push(__spreadValues(__spreadProps(__spreadValues({}, c), {
            update: "修改",
            delete: "删除"
          }), getAttachmentOpts$1(statusToColor$1(c.status))));
        }
      };
      const initAllRecords = () => __async(this, null, function* () {
        tableData.data.length = 0;
        const data = yield getLocalData$1();
        setTableData(data);
      });
      const initRecord = () => {
        const lastOne = __spreadValues({}, tableData.data[tableData.data.length - 1]);
        if (lastOne) {
          delete lastOne.update;
          delete lastOne.delete;
          delete lastOne.opts;
          delete lastOne.status;
          const needEchoProp = columns.filter((item) => item.echo).map((item) => item.prop);
          for (const item of needEchoProp) {
            record.value[item] = lastOne[item] || "";
          }
        }
        const dataKey = columns.find((item) => dateTag.includes(item.prop));
        if (dataKey) {
          record.value[dataKey.prop] = formatReadableDate(/* @__PURE__ */ new Date());
        }
      };
      createColumnsAndTable$1(columns, tableData);
      initDB$1().then(() => initDBTable$1(columns)).then(() => getLocalData$1()).then((res) => {
        setTableData(res);
        flag.value = true;
      });
      initRecord();
      const clearRecord = () => {
        for (const key in record.value) {
          delete record.value[key];
        }
      };
      const isAllBlank = () => {
        return Object.values(record.value).every((v) => v === "");
      };
      const hdAdd = () => {
        initRecord();
        showAddModel.value = true;
      };
      const hdUpdate = (index) => {
        for (const key in tableData.data[index]) {
          record.value[key] = tableData.data[index][key];
        }
        curUpdate = index;
        showUpdateModel.value = true;
      };
      const hdDelete = (index) => {
        curDelete = index;
        showDeleteModel.value = true;
      };
      const hdClear = () => {
        showClearModel.value = true;
      };
      const hdSave = () => __async(this, null, function* () {
        const rec = getPureRecords$1(tableData, false);
        yield saveToLocal$1(rec);
        yield initAllRecords();
        toast("保存成功");
      });
      const hdUpload = () => {
        if (tableData.data.length === 0) {
          toast("请先添加数据", "none", 2e3);
          return;
        }
        showUploadModel.value = true;
      };
      const uploadRecords = () => __async(this, null, function* () {
        const rec = getPureRecords$1(tableData, false);
        if (!rec.length) {
          toast("没有未提交的数据", "none", 2e3);
          return;
        }
        for (let i = 0; i < rec.length; i++) {
          if (rec[i]["status"] !== "已保存") {
            toast("请先保存所有数据", "none", 2e3);
            return;
          }
        }
        rec.map((r) => attachStableData(r));
        yield handInManyRecords2Detail(rec);
        yield afterUpload$1(rec);
        yield initAllRecords();
        toast("上传成功", "success", 2e3);
      });
      const deleteExistRecord = () => __async(this, null, function* () {
        if (tableData.data[curDelete]["lid"] !== void 0) {
          yield deleteLocalData$1(tableData.data[curDelete]["lid"]);
        }
        tableData.data.splice(curDelete, 1);
      });
      const deleteAllRecord = () => __async(this, null, function* () {
        const rec = getPureRecords$1(tableData);
        yield deleteAllLocalData$1(rec);
        tableData.data.length = 0;
      });
      const updateExistRecord = () => {
        tableData.data.splice(curUpdate, 1, __spreadValues(__spreadProps(__spreadValues({}, record.value), {
          status: "未保存"
        }), getAttachmentOpts$1("red")));
        clearRecord();
      };
      const addRecord = () => {
        if (isAllBlank()) {
          toast("请填写完整", "error", 2e3);
          return;
        }
        tableData.data.push(__spreadValues(__spreadProps(__spreadValues({}, record.value), {
          update: "修改",
          delete: "删除",
          status: "未保存"
        }), getAttachmentOpts$1("red")));
        clearRecord();
      };
      const toNewRecord = () => {
        addRecord();
        initRecord();
      };
      return (_ctx, _cache) => {
        const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), __easycom_0$4);
        const _component_tm_alert = resolveEasycom(vue.resolveDynamicComponent("tm-alert"), __easycom_1);
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), __easycom_2);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_3);
        return vue.openBlock(), vue.createBlock(_component_tm_app, { color: "#ffffff" }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "container" }, [
              vue.createElementVNode("view", { class: "main" }, [
                vue.createElementVNode("view", { class: "title" }, [
                  vue.createVNode(_component_tm_text, {
                    "font-size": 50,
                    color: "#1a1a1a",
                    label: vue.unref(mainStore).getCurType()
                  }, null, 8, ["label"])
                ]),
                vue.createElementVNode("view", { class: "status" }, [
                  vue.createVNode(_component_tm_alert, {
                    color: "#25b1bf",
                    outlined: "",
                    "border-style": "dashed",
                    border: 1,
                    content: {
                      icon: "tmicon-alert",
                      content: "当前表单：" + vue.unref(mainStore).getCurInfo()
                    },
                    height: 80,
                    closable: false
                  }, null, 8, ["content"])
                ]),
                vue.createElementVNode("view", { class: "btns" }, [
                  vue.createElementVNode("view", { class: "btn" }, [
                    vue.createVNode(_component_tm_button, {
                      block: "",
                      onClick: hdAdd,
                      color: "#0085ff",
                      "font-size": 30,
                      label: "新建记录"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "btn" }, [
                    vue.createVNode(_component_tm_button, {
                      block: "",
                      onClick: hdUpload,
                      color: "#43A49B",
                      "font-size": 30,
                      label: "提交记录"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "btn" }, [
                    vue.createVNode(_component_tm_button, {
                      block: "",
                      onClick: hdSave,
                      color: "#ff983f",
                      "font-size": 30,
                      label: "保存记录"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "btn" }, [
                    vue.createVNode(_component_tm_button, {
                      block: "",
                      onClick: hdClear,
                      label: "清空记录",
                      "font-size": 30,
                      color: "#de283b"
                    })
                  ])
                ]),
                flag.value ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "shown-table"
                }, [
                  vue.createVNode(DataTable$1, {
                    data: tableData,
                    onUpdate: hdUpdate,
                    onDelete: hdDelete
                  }, null, 8, ["data"])
                ])) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            vue.createVNode(AskModel$1, {
              show: showClearModel.value,
              "onUpdate:show": _cache[0] || (_cache[0] = ($event) => showClearModel.value = $event),
              title: "提示",
              content: "是否确认清空所有记录",
              "check-color": "red",
              onCheck: deleteAllRecord
            }, null, 8, ["show"]),
            vue.createVNode(AskModel$1, {
              show: showUploadModel.value,
              "onUpdate:show": _cache[1] || (_cache[1] = ($event) => showUploadModel.value = $event),
              title: "提示",
              content: "是否确认上传所有记录",
              "check-color": "green",
              onCheck: uploadRecords
            }, null, 8, ["show"]),
            vue.createVNode(AskModel$1, {
              show: showDeleteModel.value,
              "onUpdate:show": _cache[2] || (_cache[2] = ($event) => showDeleteModel.value = $event),
              title: "提示",
              content: "是否确认删除该记录",
              "check-color": "red",
              onCheck: deleteExistRecord
            }, null, 8, ["show"]),
            vue.createVNode(FormModel$1, {
              modelValue: record.value,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => record.value = $event),
              columns,
              title: "新建记录",
              show: showAddModel.value,
              "onUpdate:show": _cache[4] || (_cache[4] = ($event) => showAddModel.value = $event),
              "add-record": "",
              "enter-tab": "",
              onCancel: clearRecord,
              onConfirm: addRecord,
              onAdd: toNewRecord
            }, null, 8, ["modelValue", "columns", "show"]),
            vue.createVNode(FormModel$1, {
              title: "修改记录",
              show: showUpdateModel.value,
              "onUpdate:show": _cache[5] || (_cache[5] = ($event) => showUpdateModel.value = $event),
              modelValue: record.value,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => record.value = $event),
              columns,
              onClose: clearRecord,
              onConfirm: updateExistRecord
            }, null, 8, ["show", "modelValue", "columns"])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  });
  const PagesRecordsManageIndex = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-f3f09ad4"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/recordsManage/index.vue"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const hdClick = () => __async(this, null, function* () {
        deleteTableData("lqlmysd");
      });
      const onclickOpenDB = () => __async(this, null, function* () {
        const { message } = yield openDB();
        toast(message);
      });
      const onclickIsOpen = () => __async(this, null, function* () {
        const res = yield isOpen();
        toast(res.message);
      });
      const onclickCloseDB = () => __async(this, null, function* () {
        const res = yield closeDB();
        toast(res.message);
      });
      const onclickCreateTable = () => __async(this, null, function* () {
        const res = yield createTable("user", {
          id: "INTEGER PRIMARY KEY AUTOINCREMENT",
          name: "TEXT",
          age: "INTEGER"
        });
        toast(res.message);
      });
      const onclickSelectSQL = () => __async(this, null, function* () {
        const res = yield selectTableData("lqlmysd", {
          proname: "延黄高速"
        });
        toast(res.data);
      });
      const onclickInsertSQL = () => __async(this, null, function* () {
        const res = yield insertTableData("lqlmysd", {
          sffl: "yes"
        });
        toast(res.message);
      });
      const onclickDropTable = () => __async(this, null, function* () {
        const res = yield dropTable("lqlmysd");
        toast(res.message);
      });
      const onclickIsExist = () => __async(this, null, function* () {
        const res = yield isTableExist("lqlmysd");
        toast(res.data ? "存在" : "不存在");
      });
      return (_ctx, _cache) => {
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), __easycom_2);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_3);
        return vue.openBlock(), vue.createBlock(_component_tm_app, null, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "container" }, [
              vue.createVNode(_component_tm_button, {
                style: { "width": "30%", "margin-bottom": "10rpx" },
                onClick: onclickOpenDB
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("打开DB")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_tm_button, {
                style: { "width": "30%", "margin-bottom": "10rpx" },
                onClick: onclickIsOpen
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("是否打开")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_tm_button, {
                style: { "width": "30%", "margin-bottom": "10rpx" },
                onClick: onclickCloseDB
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("关闭DB")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_tm_button, {
                style: { "width": "30%", "margin-bottom": "10rpx" },
                onClick: onclickCreateTable
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("创建表")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_tm_button, {
                style: { "width": "30%", "margin-bottom": "10rpx" },
                onClick: onclickSelectSQL
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("查询内容")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_tm_button, {
                style: { "width": "30%", "margin-bottom": "10rpx" },
                onClick: onclickInsertSQL
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("插入内容")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_tm_button, {
                style: { "width": "30%", "margin-bottom": "10rpx" },
                onClick: hdClick
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("test")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_tm_button, {
                style: { "width": "30%", "margin-bottom": "10rpx" },
                onClick: onclickDropTable
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("删除表")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_tm_button, {
                style: { "width": "30%", "margin-bottom": "10rpx" },
                onClick: onclickIsExist
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("是否存在表")
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  });
  const PagesDbTestIndex = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-755aef69"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/dbTest/index.vue"]]);
  const createColumnsAndTable = (columns, tableData) => {
    var _a2;
    const data = (_a2 = getTitlesByType()) != null ? _a2 : [];
    Object.assign(columns, data);
    const t = getTableData(data);
    withStatus(t);
    withDelete(t);
    withUpdate(t);
    Object.assign(tableData, t);
    return true;
  };
  const initDB = () => __async(this, null, function* () {
    const op = yield isOpen();
    if (op.code === 200)
      return;
    const res = yield openDB();
    if (res.code !== 200) {
      toast("打开数据库失败");
      return;
    }
  });
  const initDBTable = (columns) => __async(this, null, function* () {
    var _a2;
    const name = (_a2 = getCurTableTitleByFBGC()) != null ? _a2 : "";
    const res = yield isTableExist(name);
    if (res.data) {
      return "ok";
    }
    const data = {};
    attachStatus(data);
    data["proname"] = "";
    data["htd"] = "";
    data["fbgc"] = "";
    data["username"] = "";
    for (const column of columns) {
      data[column.prop] = "TEXT";
    }
    const res2 = yield createTable(name, __spreadValues({
      lid: "INTEGER PRIMARY KEY AUTOINCREMENT"
    }, data));
    if (res2.code !== 200) {
      toast("创建表失败");
    }
    return "ok";
  });
  const getLocalData = () => __async(this, null, function* () {
    var _a2, _b2;
    const mainStore = useMainStore();
    const title = (_a2 = getCurTableTitleByFBGC()) != null ? _a2 : "";
    const res = yield selectTableData(title, {
      proname: mainStore.projInfo.proname,
      htd: mainStore.projInfo.htd,
      fbgc: mainStore.projInfo.fbgc,
      username: mainStore.username
    });
    if (res.code !== 200) {
      toast("获取数据失败");
      return [];
    }
    return (_b2 = res.data) != null ? _b2 : [];
  });
  const afterUpload = (data) => __async(this, null, function* () {
    var _a2, _b2;
    const title = (_a2 = getCurTableTitleByFBGC()) != null ? _a2 : "";
    for (let i = 0; i < data.length; i++) {
      if (((_b2 = data[i]["status"]) != null ? _b2 : "未保存") !== "已保存") {
        continue;
      }
      data[i]["status"] = "已提交";
      const res = yield updateTableData(title, data[i], "lid", data[i]["lid"]);
      if (res.code !== 200) {
        toast("更新数据失败");
      }
    }
  });
  const deleteLocalData = (lid) => __async(this, null, function* () {
    var _a2;
    const title = (_a2 = getCurTableTitleByFBGC()) != null ? _a2 : "";
    const res = yield deleteTableData(title, "lid", lid);
    if (res.code !== 200) {
      toast("删除数据失败");
    }
  });
  const deleteAllLocalData = (data) => __async(this, null, function* () {
    var _a2;
    const title = (_a2 = getCurTableTitleByFBGC()) != null ? _a2 : "";
    for (let i = 0; i < data.length; i++) {
      if (data[i]["lid"] !== void 0) {
        const res = yield deleteTableData(title, "lid", data[i]["lid"]);
        if (res.code !== 200) {
          toast("删除数据失败");
        }
      }
    }
  });
  const saveToLocal = (data) => __async(this, null, function* () {
    var _a2, _b2;
    const mainStore = useMainStore();
    const title = (_a2 = getCurTableTitleByFBGC()) != null ? _a2 : "";
    for (let i = 0; i < data.length; i++) {
      if (((_b2 = data[i]["status"]) != null ? _b2 : "未保存") !== "未保存") {
        continue;
      }
      data[i]["status"] = "已保存";
      if (data[i]["lid"] !== void 0) {
        const res2 = yield updateTableData(title, data[i], "lid", data[i]["lid"]);
        if (res2.code !== 200) {
          return Promise.reject(res2.message);
        }
        continue;
      }
      data[i]["proname"] = mainStore.projInfo.proname;
      data[i]["htd"] = mainStore.projInfo.htd;
      data[i]["fbgc"] = mainStore.projInfo.fbgc;
      data[i]["username"] = mainStore.username;
      const res = yield insertTableData(title, data[i]);
      if (res.code !== 200) {
        toast("保存数据失败");
        return Promise.reject(res.message);
      }
    }
    return Promise.resolve("保存成功");
  });
  const getPureRecords = (tableData, needUpload = true) => {
    const rec = [];
    for (let i = 0; i < tableData.data.length; i++) {
      if (!needUpload) {
        if (tableData.data[i]["status"] === "已提交") {
          continue;
        }
      }
      const t = __spreadValues({}, tableData.data[i]);
      delete t["delete"];
      delete t["update"];
      delete t["opts"];
      rec.push(t);
    }
    return rec;
  };
  const getAttachmentOpts = (color) => {
    return {
      opts: {
        update: {
          type: "button",
          fontColor: "#8FBF9F"
        },
        delete: {
          type: "button",
          fontColor: "#de283b"
        },
        status: {
          fontColor: color
        }
      }
    };
  };
  const statusToColor = (status) => {
    switch (status) {
      case "已保存":
        return "green";
      case "已提交":
        return "blue";
      default:
        return "red";
    }
  };
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "dataTable",
    props: {
      data: { type: null, required: true }
    },
    emits: ["update", "delete"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const hdClick = (row, col) => {
        if (col === 0) {
          emit("update", row);
        } else if (col === 1) {
          emit("delete", row);
        }
      };
      return (_ctx, _cache) => {
        const _component_tm_table = resolveEasycom(vue.resolveDynamicComponent("tm-table"), __easycom_0$2);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_3);
        return vue.openBlock(), vue.createBlock(_component_tm_app, null, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "table" }, [
              vue.createVNode(_component_tm_table, {
                "table-data": _ctx.data,
                width: 4e3,
                height: 1e3,
                "header-height": 100,
                "cell-height": 100,
                stripe: "",
                onRowClick: hdClick
              }, null, 8, ["table-data"])
            ])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  });
  const DataTable = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-3178a405"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/commonTest/components/dataTable.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "dataForm",
    props: {
      columns: { type: Array, required: true },
      modelValue: { type: null, required: true },
      enterTab: { type: Boolean, required: true }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const currPosition = vue.ref(-1);
      const toNext = () => {
        setTimeout(() => {
          currPosition.value++;
        }, 100);
      };
      const model = useVModel(props, "modelValue", emit);
      return (_ctx, _cache) => {
        const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), __easycom_0$4);
        const _component_tm_input = resolveEasycom(vue.resolveDynamicComponent("tm-input"), __easycom_1$1);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_3);
        return vue.openBlock(), vue.createBlock(_component_tm_app, { color: "white" }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "container" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(_ctx.columns, (item, index) => {
                  var _a2;
                  return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
                    vue.createVNode(_component_tm_text, {
                      "font-size": 35,
                      label: item.name
                    }, null, 8, ["label"]),
                    ((_a2 = _ctx.enterTab) != null ? _a2 : false) ? (vue.openBlock(), vue.createBlock(_component_tm_input, {
                      key: 0,
                      focus: currPosition.value === index,
                      onFocus: ($event) => currPosition.value = index,
                      modelValue: vue.unref(model)[item.prop],
                      "onUpdate:modelValue": ($event) => vue.unref(model)[item.prop] = $event,
                      onConfirm: toNext
                    }, null, 8, ["focus", "onFocus", "modelValue", "onUpdate:modelValue"])) : (vue.openBlock(), vue.createBlock(_component_tm_input, {
                      key: 1,
                      modelValue: vue.unref(model)[item.prop],
                      "onUpdate:modelValue": ($event) => vue.unref(model)[item.prop] = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]))
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  });
  const DataForm = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-199ed355"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/commonTest/components/dataForm.vue"]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "formModel",
    props: {
      output: { type: Boolean, required: true },
      title: { type: String, required: true },
      modelValue: { type: null, required: true },
      columns: { type: Array, required: true },
      addRecord: { type: Boolean, required: false },
      enterTab: { type: Boolean, required: false }
    },
    emits: ["update:modelValue", "update:output", "cancel", "add", "confirm", "close"],
    setup(__props, { emit: __emit }) {
      vue.useCssVars((_ctx) => ({
        "805a5d1b-gridStyle": vue.unref(gridStyle)
      }));
      const props = __props;
      const emit = __emit;
      const model = useVModel(props, "modelValue", emit);
      const outputModel = vue.computed({
        get() {
          return props.output;
        },
        set(value) {
          emit("update:output", value);
        }
      });
      const gridStyle = props.addRecord ? "repeat(3, 1fr)" : "repeat(2, 1fr)";
      const hdCancel = () => {
        outputModel.value = false;
        emit("cancel");
      };
      const hdConfirm = () => {
        outputModel.value = false;
        emit("confirm");
      };
      const hdAdd = () => {
        emit("add");
      };
      return (_ctx, _cache) => {
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), __easycom_2);
        return vue.openBlock(), vue.createBlock(ContentModal, {
          title: _ctx.title,
          show: outputModel.value,
          "onUpdate:show": _cache[1] || (_cache[1] = ($event) => outputModel.value = $event)
        }, {
          default: vue.withCtx(() => {
            var _a2;
            return [
              vue.createVNode(DataForm, {
                "enter-tab": (_a2 = _ctx.enterTab) != null ? _a2 : false,
                modelValue: vue.unref(model),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(model) ? model.value = $event : null),
                columns: _ctx.columns
              }, null, 8, ["enter-tab", "modelValue", "columns"])
            ];
          }),
          button: vue.withCtx(() => [
            _ctx.addRecord ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "bottom-btns"
            }, [
              vue.createVNode(_component_tm_button, {
                block: "",
                text: "",
                margin: [0, 0],
                height: 120,
                round: -1,
                label: "取消",
                onClick: hdCancel
              }),
              vue.createVNode(_component_tm_button, {
                block: "",
                margin: [0, 0],
                height: 120,
                round: -1,
                label: "完成",
                onClick: hdConfirm
              }),
              vue.createVNode(_component_tm_button, {
                block: "",
                margin: [0, 0],
                height: 120,
                round: -1,
                label: "新增",
                onClick: hdAdd,
                color: "#42b883"
              })
            ])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "bottom-btns"
            }, [
              vue.createVNode(_component_tm_button, {
                block: "",
                text: "",
                margin: [0, 0],
                height: 100,
                round: -1,
                label: "取消",
                onClick: hdCancel
              }),
              vue.createVNode(_component_tm_button, {
                block: "",
                margin: [0, 0],
                height: 100,
                round: -1,
                label: "完成",
                onClick: hdConfirm
              })
            ]))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["title", "show"]);
      };
    }
  });
  const FormModel = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-805a5d1b"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/commonTest/components/formModel.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "askModel",
    props: {
      show: { type: Boolean, required: true },
      title: { type: String, required: true },
      checkColor: { type: String, required: false },
      content: { type: String, required: true }
    },
    emits: ["update:show", "check"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const emit = __emit;
      const showModel = vue.computed({
        get() {
          return props.show;
        },
        set(value) {
          emit("update:show", value);
        }
      });
      const hdCheck = () => {
        showModel.value = false;
        emit("check");
      };
      return (_ctx, _cache) => {
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), __easycom_2);
        return vue.openBlock(), vue.createBlock(ContentModal, {
          show: showModel.value,
          "onUpdate:show": _cache[1] || (_cache[1] = ($event) => showModel.value = $event),
          title: _ctx.title,
          "landscape-size": {
            width: "300px",
            height: "200px"
          },
          "portrait-size": {
            width: "400px",
            height: "300px"
          },
          center: ""
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode(
              "view",
              { class: "content" },
              vue.toDisplayString(_ctx.content),
              1
              /* TEXT */
            )
          ]),
          button: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "bottom-btns" }, [
              vue.createVNode(_component_tm_button, {
                block: "",
                text: "",
                margin: [0, 0],
                height: 100,
                round: -1,
                label: "取消",
                onClick: _cache[0] || (_cache[0] = ($event) => showModel.value = false)
              }),
              vue.createVNode(_component_tm_button, {
                block: "",
                margin: [0, 0],
                height: 100,
                round: -1,
                label: "确认",
                color: _ctx.checkColor,
                onClick: hdCheck
              }, null, 8, ["color"])
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["show", "title"]);
      };
    }
  });
  const AskModel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-453e6d39"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/commonTest/components/askModel.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const mainStore = useMainStore();
      const showAddModel = vue.ref(false);
      const showDeleteModel = vue.ref(false);
      const showClearModel = vue.ref(false);
      const showUpdateModel = vue.ref(false);
      const showUploadModel = vue.ref(false);
      const flag = vue.ref(false);
      let curDelete = -1;
      let curUpdate = -1;
      const columns = vue.reactive([]);
      const tableData = vue.reactive({});
      const record = vue.ref({});
      const setTableData = (data) => {
        for (const c of data) {
          tableData.data.push(__spreadValues(__spreadProps(__spreadValues({}, c), {
            update: "修改",
            delete: "删除"
          }), getAttachmentOpts(statusToColor(c.status))));
        }
      };
      const initAllRecords = () => __async(this, null, function* () {
        tableData.data.length = 0;
        const data = yield getLocalData();
        setTableData(data);
      });
      const initRecord = () => {
        var _a2;
        const lastOne = __spreadValues({}, tableData.data[tableData.data.length - 1]);
        if (lastOne) {
          delete lastOne.update;
          delete lastOne.delete;
          delete lastOne.opts;
          delete lastOne.status;
          for (const key in lastOne) {
            if ((_a2 = columns.find((item) => item.prop === key)) == null ? void 0 : _a2.echo) {
              record.value[key] = lastOne[key];
            }
          }
        }
      };
      createColumnsAndTable(columns, tableData);
      initDB().then(() => initDBTable(columns)).then(() => getLocalData()).then((res) => {
        setTableData(res);
        flag.value = true;
      });
      initRecord();
      const clearRecord = () => {
        for (const key in record.value) {
          delete record.value[key];
        }
      };
      const isAllBlank = () => {
        return Object.values(record.value).every((v) => v === "");
      };
      const hdAdd = () => {
        initRecord();
        showAddModel.value = true;
      };
      const hdUpdate = (index) => {
        for (const key in tableData.data[index]) {
          record.value[key] = tableData.data[index][key];
        }
        curUpdate = index;
        showUpdateModel.value = true;
      };
      const hdDelete = (index) => {
        curDelete = index;
        showDeleteModel.value = true;
      };
      const hdClear = () => {
        showClearModel.value = true;
      };
      const hdSave = () => __async(this, null, function* () {
        const rec = getPureRecords(tableData, false);
        yield saveToLocal(rec);
        yield initAllRecords();
        toast("保存成功");
      });
      const hdUpload = () => {
        if (tableData.data.length === 0) {
          toast("请先添加数据", "none", 2e3);
          return;
        }
        showUploadModel.value = true;
      };
      const uploadRecords = () => __async(this, null, function* () {
        const rec = getPureRecords(tableData, false);
        if (!rec.length) {
          toast("没有未提交的数据", "none", 2e3);
          return;
        }
        for (let i = 0; i < rec.length; i++) {
          if (rec[i]["status"] !== "已保存") {
            toast("请先保存所有数据", "none", 2e3);
            return;
          }
        }
        rec.map((r) => attachStableData(r));
        yield handInManyRecords2Detail(rec);
        yield afterUpload(rec);
        yield initAllRecords();
        toast("上传成功", "success", 2e3);
      });
      const deleteExistRecord = () => __async(this, null, function* () {
        if (tableData.data[curDelete]["lid"] !== void 0) {
          yield deleteLocalData(tableData.data[curDelete]["lid"]);
        }
        tableData.data.splice(curDelete, 1);
      });
      const deleteAllRecord = () => __async(this, null, function* () {
        const rec = getPureRecords(tableData);
        yield deleteAllLocalData(rec);
        tableData.data.length = 0;
      });
      const updateExistRecord = () => {
        tableData.data.splice(curUpdate, 1, __spreadValues(__spreadProps(__spreadValues({}, record.value), {
          status: "未保存"
        }), getAttachmentOpts("red")));
        clearRecord();
      };
      const addRecord = () => {
        if (isAllBlank()) {
          toast("请填写完整", "error", 2e3);
          return;
        }
        tableData.data.push(__spreadValues(__spreadProps(__spreadValues({}, record.value), {
          update: "修改",
          delete: "删除",
          status: "未保存"
        }), getAttachmentOpts("red")));
        clearRecord();
      };
      return (_ctx, _cache) => {
        const _component_tm_text = resolveEasycom(vue.resolveDynamicComponent("tm-text"), __easycom_0$4);
        const _component_tm_alert = resolveEasycom(vue.resolveDynamicComponent("tm-alert"), __easycom_1);
        const _component_tm_button = resolveEasycom(vue.resolveDynamicComponent("tm-button"), __easycom_2);
        const _component_tm_app = resolveEasycom(vue.resolveDynamicComponent("tm-app"), __easycom_3);
        return vue.openBlock(), vue.createBlock(_component_tm_app, { color: "#ffffff" }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "container" }, [
              vue.createElementVNode("view", { class: "main" }, [
                vue.createElementVNode("view", { class: "title" }, [
                  vue.createVNode(_component_tm_text, {
                    "font-size": 50,
                    color: "#1a1a1a",
                    label: vue.unref(mainStore).getCurType()
                  }, null, 8, ["label"])
                ]),
                vue.createElementVNode("view", { class: "status" }, [
                  vue.createVNode(_component_tm_alert, {
                    color: "#25b1bf",
                    outlined: "",
                    "border-style": "dashed",
                    border: 1,
                    content: {
                      icon: "tmicon-alert",
                      content: "当前表单：" + vue.unref(mainStore).getCurInfo()
                    },
                    height: 80,
                    closable: false
                  }, null, 8, ["content"])
                ]),
                vue.createElementVNode("view", { class: "btns" }, [
                  vue.createElementVNode("view", { class: "btn" }, [
                    vue.createVNode(_component_tm_button, {
                      block: "",
                      onClick: hdAdd,
                      color: "#0085ff",
                      "font-size": 30,
                      label: "新建记录"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "btn" }, [
                    vue.createVNode(_component_tm_button, {
                      block: "",
                      onClick: hdUpload,
                      color: "#43A49B",
                      "font-size": 30,
                      label: "提交记录"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "btn" }, [
                    vue.createVNode(_component_tm_button, {
                      block: "",
                      onClick: hdSave,
                      color: "#ff983f",
                      "font-size": 30,
                      label: "保存记录"
                    })
                  ]),
                  vue.createElementVNode("view", { class: "btn" }, [
                    vue.createVNode(_component_tm_button, {
                      block: "",
                      onClick: hdClear,
                      label: "清空记录",
                      "font-size": 30,
                      color: "#de283b"
                    })
                  ])
                ]),
                flag.value ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "shown-table"
                }, [
                  vue.createVNode(DataTable, {
                    data: tableData,
                    onUpdate: hdUpdate,
                    onDelete: hdDelete
                  }, null, 8, ["data"])
                ])) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createVNode(FormModel, {
                modelValue: record.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => record.value = $event),
                columns,
                title: "新建记录",
                output: showAddModel.value,
                "onUpdate:output": _cache[1] || (_cache[1] = ($event) => showAddModel.value = $event),
                "add-record": "",
                "enter-tab": "",
                onCancel: clearRecord,
                onConfirm: addRecord,
                onAdd: addRecord
              }, null, 8, ["modelValue", "columns", "output"]),
              vue.createVNode(FormModel, {
                title: "修改记录",
                output: showUpdateModel.value,
                "onUpdate:output": _cache[2] || (_cache[2] = ($event) => showUpdateModel.value = $event),
                modelValue: record.value,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => record.value = $event),
                columns,
                onClose: clearRecord,
                onConfirm: updateExistRecord
              }, null, 8, ["output", "modelValue", "columns"]),
              vue.createVNode(AskModel, {
                show: showClearModel.value,
                "onUpdate:show": _cache[4] || (_cache[4] = ($event) => showClearModel.value = $event),
                title: "提示",
                content: "是否确认清空所有记录",
                "check-color": "red",
                onCheck: deleteAllRecord
              }, null, 8, ["show"]),
              vue.createVNode(AskModel, {
                show: showUploadModel.value,
                "onUpdate:show": _cache[5] || (_cache[5] = ($event) => showUploadModel.value = $event),
                title: "提示",
                content: "是否确认上传所有记录",
                "check-color": "green",
                onCheck: uploadRecords
              }, null, 8, ["show"]),
              vue.createVNode(AskModel, {
                show: showDeleteModel.value,
                "onUpdate:show": _cache[6] || (_cache[6] = ($event) => showDeleteModel.value = $event),
                title: "提示",
                content: "是否确认删除该记录",
                "check-color": "red",
                onCheck: deleteExistRecord
              }, null, 8, ["show"])
            ])
          ]),
          _: 1
          /* STABLE */
        });
      };
    }
  });
  const PagesCommonTestIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b016df11"], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/pages/commonTest/index.vue"]]);
  __definePage("pages/login/index", PagesLoginIndex);
  __definePage("pages/profile/index", PagesProfileIndex);
  __definePage("pages/tableSelect/index", PagesTableSelectIndex);
  __definePage("pages/recordsManage/index", PagesRecordsManageIndex);
  __definePage("pages/dbTest/index", PagesDbTestIndex);
  __definePage("pages/commonTest/index", PagesCommonTestIndex);
  let config = {
    url: "",
    data: {},
    statusCode: 200,
    header: {
      // "content-type":"application/json"
    },
    method: "POST",
    timeout: 6e4,
    dataType: "json",
    responseType: "text",
    sslVerify: true,
    withCredentials: false,
    firstIpv4: false
  };
  function request(cog = config, complete, beforeRequest2, afterRequest2) {
    let newConfig = __spreadValues(__spreadValues({}, config), cog);
    return new Promise((resolve, reject) => __async(this, null, function* () {
      if (typeof beforeRequest2 === "function") {
        let opts = yield beforeRequest2(newConfig);
        if (typeof opts !== "object") {
          opts = {};
        }
        newConfig = __spreadValues(__spreadValues({}, newConfig), opts);
      }
      uni.request({
        url: newConfig.url || "",
        data: newConfig.data,
        header: newConfig.header,
        method: newConfig.method,
        timeout: newConfig.timeout,
        dataType: newConfig.dataType,
        responseType: newConfig.responseType,
        sslVerify: newConfig.sslVerify,
        withCredentials: newConfig.withCredentials,
        firstIpv4: newConfig.firstIpv4,
        success(result) {
          return __async(this, null, function* () {
            var _a3;
            if (result.statusCode !== (newConfig == null ? void 0 : newConfig.statusCode)) {
              reject(result);
              return;
            }
            if (typeof afterRequest2 === "function") {
              let opts = yield afterRequest2(result);
              try {
                if (typeof opts !== "object") {
                  opts = result;
                }
                if (typeof opts === "object" && ((_a3 = Object.keys(opts)) == null ? void 0 : _a3.length) == 0) {
                  opts = result;
                }
              } catch (e) {
                formatAppLog("error", "at tmui/tool/lib/fetch.ts:56", "tmui:", e);
              }
              result = __spreadValues({}, opts);
            }
            resolve(result);
          });
        },
        fail(result) {
          reject(result);
        },
        complete(result) {
          if (typeof complete === "function") {
            complete(result);
          }
        }
      });
    }));
  }
  var beforeRequest = (val) => val;
  var afterRequest = (val) => val;
  class fetchNet {
    /**
     * 构建新的请求
     * @param cog 请示配置见：fetchConfig
     * @param beforeRequest 访问前执行的函数，可以是Promise,你可以对执行前的参数进行修改之类的，将以你最新的修改参数为准进行请求。
     * @param afterRequest 访问后执行的函数，可以是Promise,提供请示后的数据，你可以在这里修改，返回，这样所有请求的数据返回后都为返回你修改后的数据。
     */
    constructor(cog, beforeRequestFun, afterRequesFunt) {
      config = __spreadValues(__spreadValues({}, config), cog || {});
      if (typeof beforeRequestFun == "function") {
        beforeRequest = beforeRequestFun;
      }
      if (typeof afterRequesFunt == "function") {
        afterRequest = afterRequesFunt;
      }
    }
    static get(url, data = {}, opts = {}) {
      let cfg = __spreadProps(__spreadValues(__spreadValues({}, config), opts || {}), { url, method: "GET", data });
      return request(cfg);
    }
    static post(url, data = {}, opts = {}) {
      let cfg = __spreadProps(__spreadValues(__spreadValues({}, config), opts || {}), { url, method: "POST", data });
      return request(cfg);
    }
    /**
     * 请求
     * @param cog 配置
     * @param complete 访问结束后执行的函数
     */
    static request() {
      return __async(this, arguments, function* (cog = config, beforeFun, afterFun, complete) {
        let newConfig = __spreadValues(__spreadValues({}, config), cog);
        if (typeof beforeFun == "function") {
          let testFun = yield beforeFun();
          let cb = { errMsg: "中止请求" };
          if (!testFun)
            return cb;
        }
        return request(newConfig, complete, beforeFun || beforeRequest, afterFun || afterRequest);
      });
    }
  }
  const fontJson = [
    {
      "icon_id": "400994",
      "name": "paypal",
      "font_class": "paypal",
      "unicode": "e8c8",
      "unicode_decimal": 59592
    },
    {
      "icon_id": "4936951",
      "name": "google",
      "font_class": "google",
      "unicode": "e8c9",
      "unicode_decimal": 59593
    },
    {
      "icon_id": "5634565",
      "name": "apple-pay",
      "font_class": "apple-pay",
      "unicode": "f166",
      "unicode_decimal": 61798
    },
    {
      "icon_id": "6808509",
      "name": "Apple",
      "font_class": "Apple",
      "unicode": "edd8",
      "unicode_decimal": 60888
    },
    {
      "icon_id": "27365105",
      "name": "google-pay",
      "font_class": "google-pay",
      "unicode": "ec04",
      "unicode_decimal": 60420
    },
    {
      "icon_id": "1039",
      "name": "钱袋",
      "font_class": "qiandai",
      "unicode": "e600",
      "unicode_decimal": 58880
    },
    {
      "icon_id": "1431",
      "name": "券",
      "font_class": "quan",
      "unicode": "e601",
      "unicode_decimal": 58881
    },
    {
      "icon_id": "780044",
      "name": "红包",
      "font_class": "hongbao",
      "unicode": "e6da",
      "unicode_decimal": 59098
    },
    {
      "icon_id": "577373",
      "name": "通知-fill",
      "font_class": "tongzhifill",
      "unicode": "e758",
      "unicode_decimal": 59224
    },
    {
      "icon_id": "844648",
      "name": "人民币3",
      "font_class": "renminbi3",
      "unicode": "e73e",
      "unicode_decimal": 59198
    },
    {
      "icon_id": "1240755",
      "name": "投票",
      "font_class": "toupiao",
      "unicode": "e60e",
      "unicode_decimal": 58894
    },
    {
      "icon_id": "5117623",
      "name": "票券-色块icon",
      "font_class": "icon",
      "unicode": "e658",
      "unicode_decimal": 58968
    },
    {
      "icon_id": "5178379",
      "name": "足球",
      "font_class": "svggeshi-",
      "unicode": "e65d",
      "unicode_decimal": 58973
    },
    {
      "icon_id": "5387627",
      "name": "美元",
      "font_class": "meiyuan",
      "unicode": "eb1a",
      "unicode_decimal": 60186
    },
    {
      "icon_id": "7516900",
      "name": "汽车",
      "font_class": "qiche",
      "unicode": "e611",
      "unicode_decimal": 58897
    },
    {
      "icon_id": "8023415",
      "name": "通知",
      "font_class": "tongzhi",
      "unicode": "e612",
      "unicode_decimal": 58898
    },
    {
      "icon_id": "8575345",
      "name": "会员",
      "font_class": "huiyuan",
      "unicode": "e62f",
      "unicode_decimal": 58927
    },
    {
      "icon_id": "9456772",
      "name": "md-phone-portrait",
      "font_class": "md-phone-portrait",
      "unicode": "e6c2",
      "unicode_decimal": 59074
    },
    {
      "icon_id": "9456777",
      "name": "md-planet",
      "font_class": "md-planet",
      "unicode": "e6c3",
      "unicode_decimal": 59075
    },
    {
      "icon_id": "9456779",
      "name": "md-phone-landscape",
      "font_class": "md-phone-landscape",
      "unicode": "e6c4",
      "unicode_decimal": 59076
    },
    {
      "icon_id": "9456788",
      "name": "md-power",
      "font_class": "md-power",
      "unicode": "e6c5",
      "unicode_decimal": 59077
    },
    {
      "icon_id": "9456798",
      "name": "md-redo",
      "font_class": "md-redo",
      "unicode": "e6c6",
      "unicode_decimal": 59078
    },
    {
      "icon_id": "9456808",
      "name": "md-rocket",
      "font_class": "md-rocket",
      "unicode": "e6c7",
      "unicode_decimal": 59079
    },
    {
      "icon_id": "9456819",
      "name": "md-ribbon",
      "font_class": "md-ribbon",
      "unicode": "e6c8",
      "unicode_decimal": 59080
    },
    {
      "icon_id": "9456835",
      "name": "md-undo",
      "font_class": "md-undo",
      "unicode": "e6cb",
      "unicode_decimal": 59083
    },
    {
      "icon_id": "9456837",
      "name": "md-trending-down",
      "font_class": "md-trending-down",
      "unicode": "e6cc",
      "unicode_decimal": 59084
    },
    {
      "icon_id": "9456851",
      "name": "md-trending-up",
      "font_class": "md-trending-up",
      "unicode": "e6cd",
      "unicode_decimal": 59085
    },
    {
      "icon_id": "9457020",
      "name": "md-git-merge",
      "font_class": "md-git-merge",
      "unicode": "e6de",
      "unicode_decimal": 59102
    },
    {
      "icon_id": "9457071",
      "name": "md-female",
      "font_class": "md-female",
      "unicode": "e6e2",
      "unicode_decimal": 59106
    },
    {
      "icon_id": "9457091",
      "name": "md-male",
      "font_class": "md-male",
      "unicode": "e6e3",
      "unicode_decimal": 59107
    },
    {
      "icon_id": "9457108",
      "name": "md-heart-dislike",
      "font_class": "md-heart-dislike",
      "unicode": "e6e4",
      "unicode_decimal": 59108
    },
    {
      "icon_id": "9457111",
      "name": "md-heart",
      "font_class": "md-heart1",
      "unicode": "e6e7",
      "unicode_decimal": 59111
    },
    {
      "icon_id": "9457220",
      "name": "ios-text",
      "font_class": "ios-text",
      "unicode": "e6f1",
      "unicode_decimal": 59121
    },
    {
      "icon_id": "9457232",
      "name": "ios-rose",
      "font_class": "ios-rose",
      "unicode": "e6f2",
      "unicode_decimal": 59122
    },
    {
      "icon_id": "9457346",
      "name": "logo-game-controller-b",
      "font_class": "logo-game-controller-b",
      "unicode": "e6fd",
      "unicode_decimal": 59133
    },
    {
      "icon_id": "9457416",
      "name": "ios-beer",
      "font_class": "ios-beer",
      "unicode": "e707",
      "unicode_decimal": 59143
    },
    {
      "icon_id": "9457424",
      "name": "ios-cafe",
      "font_class": "ios-cafe",
      "unicode": "e709",
      "unicode_decimal": 59145
    },
    {
      "icon_id": "9457440",
      "name": "ios-chatbubbles",
      "font_class": "ios-chatbubbles",
      "unicode": "e70a",
      "unicode_decimal": 59146
    },
    {
      "icon_id": "9457465",
      "name": "ios-color-palette",
      "font_class": "ios-color-palette",
      "unicode": "e70e",
      "unicode_decimal": 59150
    },
    {
      "icon_id": "9457485",
      "name": "ios-filing",
      "font_class": "ios-filing",
      "unicode": "e712",
      "unicode_decimal": 59154
    },
    {
      "icon_id": "9457494",
      "name": "ios-finger-print",
      "font_class": "ios-finger-print",
      "unicode": "e713",
      "unicode_decimal": 59155
    },
    {
      "icon_id": "9457501",
      "name": "ios-hand",
      "font_class": "ios-hand",
      "unicode": "e716",
      "unicode_decimal": 59158
    },
    {
      "icon_id": "9457504",
      "name": "ios-flower",
      "font_class": "ios-flower",
      "unicode": "e714",
      "unicode_decimal": 59156
    },
    {
      "icon_id": "9457529",
      "name": "ios-ice-cream",
      "font_class": "ios-ice-cream",
      "unicode": "e719",
      "unicode_decimal": 59161
    },
    {
      "icon_id": "9457539",
      "name": "ios-grid",
      "font_class": "ios-grid",
      "unicode": "e71c",
      "unicode_decimal": 59164
    },
    {
      "icon_id": "9457540",
      "name": "ios-mail-open",
      "font_class": "ios-mail-open1",
      "unicode": "e71d",
      "unicode_decimal": 59165
    },
    {
      "icon_id": "9457543",
      "name": "ios-key",
      "font_class": "ios-key",
      "unicode": "e71e",
      "unicode_decimal": 59166
    },
    {
      "icon_id": "9457545",
      "name": "ios-man",
      "font_class": "ios-man",
      "unicode": "e71f",
      "unicode_decimal": 59167
    },
    {
      "icon_id": "12387153",
      "name": "美元",
      "font_class": "meiyuan1",
      "unicode": "e90d",
      "unicode_decimal": 59661
    },
    {
      "icon_id": "13030084",
      "name": "自定义",
      "font_class": "zidingyi",
      "unicode": "e60d",
      "unicode_decimal": 58893
    },
    {
      "icon_id": "20587178",
      "name": "刷新",
      "font_class": "shuaxin",
      "unicode": "e6ce",
      "unicode_decimal": 59086
    },
    {
      "icon_id": "21242934",
      "name": "会员",
      "font_class": "huiyuan1",
      "unicode": "e646",
      "unicode_decimal": 58950
    },
    {
      "icon_id": "1250665",
      "name": "圆",
      "font_class": "yuan",
      "unicode": "e657",
      "unicode_decimal": 58967
    },
    {
      "icon_id": "7137863",
      "name": "ios-airplane",
      "font_class": "ios-airplane",
      "unicode": "e852",
      "unicode_decimal": 59474
    },
    {
      "icon_id": "7137864",
      "name": "ios-woman",
      "font_class": "ios-woman",
      "unicode": "e859",
      "unicode_decimal": 59481
    },
    {
      "icon_id": "7137869",
      "name": "ios-aperture",
      "font_class": "ios-aperture",
      "unicode": "e866",
      "unicode_decimal": 59494
    },
    {
      "icon_id": "7137873",
      "name": "ios-alarm",
      "font_class": "ios-alarm",
      "unicode": "e868",
      "unicode_decimal": 59496
    },
    {
      "icon_id": "7137875",
      "name": "ios-arrow-dropdown",
      "font_class": "ios-arrow-dropdown",
      "unicode": "e869",
      "unicode_decimal": 59497
    },
    {
      "icon_id": "7137879",
      "name": "ios-arrow-dropleft-c",
      "font_class": "ios-arrow-dropleft-c",
      "unicode": "e876",
      "unicode_decimal": 59510
    },
    {
      "icon_id": "7137880",
      "name": "ios-arrow-dropleft",
      "font_class": "ios-arrow-dropleft",
      "unicode": "e87c",
      "unicode_decimal": 59516
    },
    {
      "icon_id": "7137881",
      "name": "ios-arrow-dropup",
      "font_class": "ios-arrow-dropup",
      "unicode": "e87f",
      "unicode_decimal": 59519
    },
    {
      "icon_id": "7137882",
      "name": "ios-arrow-dropright-",
      "font_class": "ios-arrow-dropright-",
      "unicode": "e880",
      "unicode_decimal": 59520
    },
    {
      "icon_id": "7137883",
      "name": "ios-arrow-dropdown-c",
      "font_class": "ios-arrow-dropdown-c",
      "unicode": "e886",
      "unicode_decimal": 59526
    },
    {
      "icon_id": "7137886",
      "name": "ios-arrow-dropup-cir",
      "font_class": "ios-arrow-dropup-cir",
      "unicode": "e88d",
      "unicode_decimal": 59533
    },
    {
      "icon_id": "7137887",
      "name": "ios-arrow-dropright",
      "font_class": "ios-arrow-dropright",
      "unicode": "e890",
      "unicode_decimal": 59536
    },
    {
      "icon_id": "7137892",
      "name": "ios-attach",
      "font_class": "ios-attach",
      "unicode": "e893",
      "unicode_decimal": 59539
    },
    {
      "icon_id": "7137893",
      "name": "ios-at",
      "font_class": "ios-at",
      "unicode": "e894",
      "unicode_decimal": 59540
    },
    {
      "icon_id": "7137901",
      "name": "ios-bed",
      "font_class": "ios-bed",
      "unicode": "e895",
      "unicode_decimal": 59541
    },
    {
      "icon_id": "7137903",
      "name": "ios-battery-full",
      "font_class": "ios-battery-full",
      "unicode": "e896",
      "unicode_decimal": 59542
    },
    {
      "icon_id": "7137906",
      "name": "ios-bookmarks",
      "font_class": "ios-bookmarks",
      "unicode": "e897",
      "unicode_decimal": 59543
    },
    {
      "icon_id": "7137926",
      "name": "ios-bluetooth",
      "font_class": "ios-bluetooth",
      "unicode": "e898",
      "unicode_decimal": 59544
    },
    {
      "icon_id": "7137930",
      "name": "ios-cellular",
      "font_class": "ios-cellular",
      "unicode": "e899",
      "unicode_decimal": 59545
    },
    {
      "icon_id": "7137971",
      "name": "ios-cut",
      "font_class": "ios-cut",
      "unicode": "e89a",
      "unicode_decimal": 59546
    },
    {
      "icon_id": "7138027",
      "name": "ios-leaf",
      "font_class": "ios-leaf",
      "unicode": "e89b",
      "unicode_decimal": 59547
    },
    {
      "icon_id": "7138043",
      "name": "ios-mic",
      "font_class": "ios-mic",
      "unicode": "e89c",
      "unicode_decimal": 59548
    },
    {
      "icon_id": "7138045",
      "name": "ios-mail-open",
      "font_class": "ios-mail-open",
      "unicode": "e89d",
      "unicode_decimal": 59549
    },
    {
      "icon_id": "7138078",
      "name": "ios-partly-sunny",
      "font_class": "ios-partly-sunny",
      "unicode": "e8a0",
      "unicode_decimal": 59552
    },
    {
      "icon_id": "7138095",
      "name": "ios-radio-button-on",
      "font_class": "ios-radio-button-on",
      "unicode": "e8a1",
      "unicode_decimal": 59553
    },
    {
      "icon_id": "7138098",
      "name": "ios-radio-button-off",
      "font_class": "ios-radio-button-off",
      "unicode": "e8a2",
      "unicode_decimal": 59554
    },
    {
      "icon_id": "7138105",
      "name": "ios-remove",
      "font_class": "ios-remove",
      "unicode": "e8a3",
      "unicode_decimal": 59555
    },
    {
      "icon_id": "7138112",
      "name": "ios-remove-circle-ou",
      "font_class": "ios-remove-circle-ou",
      "unicode": "e8a4",
      "unicode_decimal": 59556
    },
    {
      "icon_id": "7138113",
      "name": "ios-remove-circle",
      "font_class": "ios-remove-circle",
      "unicode": "e8a5",
      "unicode_decimal": 59557
    },
    {
      "icon_id": "7138118",
      "name": "ios-rocket",
      "font_class": "ios-rocket",
      "unicode": "e8a6",
      "unicode_decimal": 59558
    },
    {
      "icon_id": "7138122",
      "name": "ios-ribbon",
      "font_class": "ios-ribbon",
      "unicode": "e8a7",
      "unicode_decimal": 59559
    },
    {
      "icon_id": "7138128",
      "name": "ios-star",
      "font_class": "ios-star",
      "unicode": "e8a8",
      "unicode_decimal": 59560
    },
    {
      "icon_id": "7138134",
      "name": "ios-star-half",
      "font_class": "ios-star-half",
      "unicode": "e8a9",
      "unicode_decimal": 59561
    },
    {
      "icon_id": "7138135",
      "name": "ios-star-outline",
      "font_class": "ios-star-outline",
      "unicode": "e8aa",
      "unicode_decimal": 59562
    },
    {
      "icon_id": "7138137",
      "name": "ios-snow",
      "font_class": "ios-snow",
      "unicode": "e8ab",
      "unicode_decimal": 59563
    },
    {
      "icon_id": "7138138",
      "name": "ios-stopwatch",
      "font_class": "ios-stopwatch",
      "unicode": "e8ac",
      "unicode_decimal": 59564
    },
    {
      "icon_id": "7138139",
      "name": "ios-sunny",
      "font_class": "ios-sunny",
      "unicode": "e8ad",
      "unicode_decimal": 59565
    },
    {
      "icon_id": "7138160",
      "name": "ios-unlock",
      "font_class": "ios-unlock",
      "unicode": "e8ae",
      "unicode_decimal": 59566
    },
    {
      "icon_id": "7138165",
      "name": "ios-trophy",
      "font_class": "ios-trophy",
      "unicode": "e8af",
      "unicode_decimal": 59567
    },
    {
      "icon_id": "7138167",
      "name": "ios-umbrella",
      "font_class": "ios-umbrella",
      "unicode": "e8b0",
      "unicode_decimal": 59568
    },
    {
      "icon_id": "7138168",
      "name": "ios-videocam",
      "font_class": "ios-videocam",
      "unicode": "e8b1",
      "unicode_decimal": 59569
    },
    {
      "icon_id": "7138169",
      "name": "ios-volume-high",
      "font_class": "ios-volume-high",
      "unicode": "e8b2",
      "unicode_decimal": 59570
    },
    {
      "icon_id": "7138170",
      "name": "ios-water",
      "font_class": "ios-water",
      "unicode": "e8b3",
      "unicode_decimal": 59571
    },
    {
      "icon_id": "7138176",
      "name": "ios-wifi",
      "font_class": "ios-wifi",
      "unicode": "e8b4",
      "unicode_decimal": 59572
    },
    {
      "icon_id": "7138213",
      "name": "md-water",
      "font_class": "md-water",
      "unicode": "e8b5",
      "unicode_decimal": 59573
    },
    {
      "icon_id": "7138292",
      "name": "md-checkbox",
      "font_class": "md-checkbox",
      "unicode": "e8b6",
      "unicode_decimal": 59574
    },
    {
      "icon_id": "7138295",
      "name": "md-chatbubbles",
      "font_class": "md-chatbubbles",
      "unicode": "e8b7",
      "unicode_decimal": 59575
    },
    {
      "icon_id": "7138296",
      "name": "md-chatboxes",
      "font_class": "md-chatboxes",
      "unicode": "e8b8",
      "unicode_decimal": 59576
    },
    {
      "icon_id": "7138301",
      "name": "md-cloud-done",
      "font_class": "md-cloud-done",
      "unicode": "e8b9",
      "unicode_decimal": 59577
    },
    {
      "icon_id": "7138303",
      "name": "md-cloud-upload",
      "font_class": "md-cloud-upload",
      "unicode": "e8ba",
      "unicode_decimal": 59578
    },
    {
      "icon_id": "7138310",
      "name": "md-cloudy",
      "font_class": "md-cloudy",
      "unicode": "e8bb",
      "unicode_decimal": 59579
    },
    {
      "icon_id": "7138328",
      "name": "md-contrast",
      "font_class": "md-contrast",
      "unicode": "e8bc",
      "unicode_decimal": 59580
    },
    {
      "icon_id": "7138332",
      "name": "md-disc",
      "font_class": "md-disc",
      "unicode": "e8bd",
      "unicode_decimal": 59581
    },
    {
      "icon_id": "7138369",
      "name": "md-heart-empty",
      "font_class": "md-heart-empty",
      "unicode": "e8be",
      "unicode_decimal": 59582
    },
    {
      "icon_id": "7138372",
      "name": "md-heart",
      "font_class": "md-heart",
      "unicode": "e8bf",
      "unicode_decimal": 59583
    },
    {
      "icon_id": "7138374",
      "name": "md-home",
      "font_class": "md-home",
      "unicode": "e8c0",
      "unicode_decimal": 59584
    },
    {
      "icon_id": "7138376",
      "name": "md-mail-open",
      "font_class": "md-mail-open",
      "unicode": "e8c1",
      "unicode_decimal": 59585
    },
    {
      "icon_id": "7138391",
      "name": "md-heart-half",
      "font_class": "md-heart-half",
      "unicode": "e8c2",
      "unicode_decimal": 59586
    },
    {
      "icon_id": "7138393",
      "name": "md-person",
      "font_class": "md-person",
      "unicode": "e8c3",
      "unicode_decimal": 59587
    },
    {
      "icon_id": "7138405",
      "name": "md-people",
      "font_class": "md-people",
      "unicode": "e8c4",
      "unicode_decimal": 59588
    },
    {
      "icon_id": "7138421",
      "name": "md-more",
      "font_class": "md-more",
      "unicode": "e8c5",
      "unicode_decimal": 59589
    },
    {
      "icon_id": "7138431",
      "name": "md-moon",
      "font_class": "md-moon",
      "unicode": "e8c6",
      "unicode_decimal": 59590
    },
    {
      "icon_id": "7138481",
      "name": "md-pin",
      "font_class": "md-pin",
      "unicode": "e8c7",
      "unicode_decimal": 59591
    },
    {
      "icon_id": "577338",
      "name": "更多",
      "font_class": "gengduo",
      "unicode": "e73a",
      "unicode_decimal": 59194
    },
    {
      "icon_id": "1420800",
      "name": "IOS",
      "font_class": "ios",
      "unicode": "e60c",
      "unicode_decimal": 58892
    },
    {
      "icon_id": "1445619",
      "name": "wifi-off",
      "font_class": "wifi-off",
      "unicode": "e93a",
      "unicode_decimal": 59706
    },
    {
      "icon_id": "3629124",
      "name": "列表空空",
      "font_class": "shiliangzhinengduixiang-",
      "unicode": "e6ad",
      "unicode_decimal": 59053
    },
    {
      "icon_id": "3977929",
      "name": "微信支付",
      "font_class": "weixinzhifu",
      "unicode": "e605",
      "unicode_decimal": 58885
    },
    {
      "icon_id": "8338693",
      "name": "银行卡",
      "font_class": "yinhangqia",
      "unicode": "e6c9",
      "unicode_decimal": 59081
    },
    {
      "icon_id": "9306316",
      "name": "云闪付",
      "font_class": "yunshanfu",
      "unicode": "e68b",
      "unicode_decimal": 59019
    },
    {
      "icon_id": "15989503",
      "name": "头条样式",
      "font_class": "toutiaoyangshi",
      "unicode": "e622",
      "unicode_decimal": 58914
    },
    {
      "icon_id": "18166694",
      "name": "抖音",
      "font_class": "douyin",
      "unicode": "e8db",
      "unicode_decimal": 59611
    },
    {
      "icon_id": "18166716",
      "name": "支付,支付宝",
      "font_class": "alipay",
      "unicode": "e8de",
      "unicode_decimal": 59614
    },
    {
      "icon_id": "24164616",
      "name": "华为",
      "font_class": "huawei",
      "unicode": "e610",
      "unicode_decimal": 58896
    },
    {
      "icon_id": "167190",
      "name": "链接",
      "font_class": "lianjie",
      "unicode": "e665",
      "unicode_decimal": 58981
    },
    {
      "icon_id": "1185485",
      "name": "微信",
      "font_class": "weixin",
      "unicode": "e63f",
      "unicode_decimal": 58943
    },
    {
      "icon_id": "6556747",
      "name": "朋友圈",
      "font_class": "pengyouquan",
      "unicode": "e615",
      "unicode_decimal": 58901
    },
    {
      "icon_id": "6756291",
      "name": "微博",
      "font_class": "weibo",
      "unicode": "e608",
      "unicode_decimal": 58888
    },
    {
      "icon_id": "16286932",
      "name": "QQ",
      "font_class": "QQ",
      "unicode": "e60f",
      "unicode_decimal": 58895
    },
    {
      "icon_id": "16322953",
      "name": "小程序",
      "font_class": "xiaochengxu",
      "unicode": "e706",
      "unicode_decimal": 59142
    },
    {
      "icon_id": "6151036",
      "name": "display-code",
      "font_class": "display-code",
      "unicode": "e792",
      "unicode_decimal": 59282
    },
    {
      "icon_id": "6151037",
      "name": "display-arrow-right",
      "font_class": "display-arrow-right",
      "unicode": "e793",
      "unicode_decimal": 59283
    },
    {
      "icon_id": "6151038",
      "name": "display-arrow-left",
      "font_class": "display-arrow-left",
      "unicode": "e794",
      "unicode_decimal": 59284
    },
    {
      "icon_id": "6151039",
      "name": "laptop-error",
      "font_class": "laptop-error",
      "unicode": "e795",
      "unicode_decimal": 59285
    },
    {
      "icon_id": "6151040",
      "name": "laptop-check",
      "font_class": "laptop-check",
      "unicode": "e796",
      "unicode_decimal": 59286
    },
    {
      "icon_id": "6151041",
      "name": "laptop",
      "font_class": "laptop",
      "unicode": "e797",
      "unicode_decimal": 59287
    },
    {
      "icon_id": "6151050",
      "name": "mobile-error",
      "font_class": "mobile-error",
      "unicode": "e798",
      "unicode_decimal": 59288
    },
    {
      "icon_id": "6151051",
      "name": "mobile-check",
      "font_class": "mobile-check",
      "unicode": "e799",
      "unicode_decimal": 59289
    },
    {
      "icon_id": "6151052",
      "name": "mobile-alt",
      "font_class": "mobile-alt",
      "unicode": "e79a",
      "unicode_decimal": 59290
    },
    {
      "icon_id": "6151059",
      "name": "aliwangwang",
      "font_class": "aliwangwang",
      "unicode": "e79d",
      "unicode_decimal": 59293
    },
    {
      "icon_id": "6151060",
      "name": "nail",
      "font_class": "nail",
      "unicode": "e79e",
      "unicode_decimal": 59294
    },
    {
      "icon_id": "6151061",
      "name": "nail-fixed",
      "font_class": "nail-fixed",
      "unicode": "e79f",
      "unicode_decimal": 59295
    },
    {
      "icon_id": "6151070",
      "name": "edit",
      "font_class": "edit",
      "unicode": "e7a0",
      "unicode_decimal": 59296
    },
    {
      "icon_id": "6151072",
      "name": "dollar",
      "font_class": "dollar",
      "unicode": "e7a1",
      "unicode_decimal": 59297
    },
    {
      "icon_id": "6151080",
      "name": "transanction",
      "font_class": "transanction",
      "unicode": "e7a2",
      "unicode_decimal": 59298
    },
    {
      "icon_id": "6151087",
      "name": "filter-fill",
      "font_class": "filter-fill",
      "unicode": "e7a3",
      "unicode_decimal": 59299
    },
    {
      "icon_id": "6151089",
      "name": "all-fill",
      "font_class": "all-fill",
      "unicode": "e7a4",
      "unicode_decimal": 59300
    },
    {
      "icon_id": "6151090",
      "name": "database plus-fill",
      "font_class": "databaseplus-fill",
      "unicode": "e7a5",
      "unicode_decimal": 59301
    },
    {
      "icon_id": "6151091",
      "name": "database-fill",
      "font_class": "database-fill",
      "unicode": "e7a6",
      "unicode_decimal": 59302
    },
    {
      "icon_id": "6151092",
      "name": "comment lines-fill",
      "font_class": "commentlines-fill",
      "unicode": "e7a7",
      "unicode_decimal": 59303
    },
    {
      "icon_id": "6151093",
      "name": "comment dots-fill",
      "font_class": "commentdots-fill",
      "unicode": "e7a8",
      "unicode_decimal": 59304
    },
    {
      "icon_id": "6151095",
      "name": "paper plane-fill",
      "font_class": "paperplane-fill",
      "unicode": "e7a9",
      "unicode_decimal": 59305
    },
    {
      "icon_id": "6151096",
      "name": "eye slash-fill",
      "font_class": "eyeslash-fill",
      "unicode": "e7aa",
      "unicode_decimal": 59306
    },
    {
      "icon_id": "6151097",
      "name": "eye-fill",
      "font_class": "eye-fill",
      "unicode": "e7ab",
      "unicode_decimal": 59307
    },
    {
      "icon_id": "6151098",
      "name": "lightbulb-fill",
      "font_class": "lightbulb-fill",
      "unicode": "e7ac",
      "unicode_decimal": 59308
    },
    {
      "icon_id": "6151099",
      "name": "flag-fill",
      "font_class": "flag-fill",
      "unicode": "e7ad",
      "unicode_decimal": 59309
    },
    {
      "icon_id": "6151100",
      "name": "tag-fill",
      "font_class": "tag-fill",
      "unicode": "e7ae",
      "unicode_decimal": 59310
    },
    {
      "icon_id": "6151101",
      "name": "position-fill",
      "font_class": "position-fill",
      "unicode": "e7af",
      "unicode_decimal": 59311
    },
    {
      "icon_id": "6151102",
      "name": "location-fill",
      "font_class": "location-fill",
      "unicode": "e7b0",
      "unicode_decimal": 59312
    },
    {
      "icon_id": "6151103",
      "name": "map-fill",
      "font_class": "map-fill",
      "unicode": "e7b1",
      "unicode_decimal": 59313
    },
    {
      "icon_id": "6151105",
      "name": "inbox in-fill",
      "font_class": "inboxin-fill",
      "unicode": "e7b2",
      "unicode_decimal": 59314
    },
    {
      "icon_id": "6151106",
      "name": "box-fill",
      "font_class": "box-fill",
      "unicode": "e7b3",
      "unicode_decimal": 59315
    },
    {
      "icon_id": "6151108",
      "name": "database set-fill",
      "font_class": "databaseset-fill",
      "unicode": "e7b4",
      "unicode_decimal": 59316
    },
    {
      "icon_id": "6151109",
      "name": "layer group-fill",
      "font_class": "layergroup-fill",
      "unicode": "e7b5",
      "unicode_decimal": 59317
    },
    {
      "icon_id": "6151111",
      "name": "cry-fill",
      "font_class": "cry-fill",
      "unicode": "e7b6",
      "unicode_decimal": 59318
    },
    {
      "icon_id": "6151113",
      "name": "smile-fill",
      "font_class": "smile-fill",
      "unicode": "e7b7",
      "unicode_decimal": 59319
    },
    {
      "icon_id": "6151115",
      "name": "unlock-fill",
      "font_class": "unlock-fill",
      "unicode": "e7b8",
      "unicode_decimal": 59320
    },
    {
      "icon_id": "6151117",
      "name": "lock-fill",
      "font_class": "lock-fill",
      "unicode": "e7b9",
      "unicode_decimal": 59321
    },
    {
      "icon_id": "6151118",
      "name": "align right-fill",
      "font_class": "alignright-fill",
      "unicode": "e7ba",
      "unicode_decimal": 59322
    },
    {
      "icon_id": "6151119",
      "name": "align left-fill",
      "font_class": "alignleft-fill",
      "unicode": "e7bb",
      "unicode_decimal": 59323
    },
    {
      "icon_id": "6151120",
      "name": "border bottom-fill",
      "font_class": "borderbottom-fill",
      "unicode": "e7bc",
      "unicode_decimal": 59324
    },
    {
      "icon_id": "6151121",
      "name": "border top-fill",
      "font_class": "bordertop-fill",
      "unicode": "e7bd",
      "unicode_decimal": 59325
    },
    {
      "icon_id": "6151122",
      "name": "align center-fill",
      "font_class": "aligncenter-fill",
      "unicode": "e7be",
      "unicode_decimal": 59326
    },
    {
      "icon_id": "32631406",
      "name": "sort-down-copy",
      "font_class": "sort-down-nogap-copy",
      "unicode": "f167",
      "unicode_decimal": 61799
    },
    {
      "icon_id": "6151123",
      "name": "border verticle-fill",
      "font_class": "borderverticle-fill",
      "unicode": "e7bf",
      "unicode_decimal": 59327
    },
    {
      "icon_id": "6151126",
      "name": "pic center-fill",
      "font_class": "piccenter-fill",
      "unicode": "e7c0",
      "unicode_decimal": 59328
    },
    {
      "icon_id": "6151127",
      "name": "pic side-fill",
      "font_class": "picside-fill",
      "unicode": "e7c1",
      "unicode_decimal": 59329
    },
    {
      "icon_id": "6151128",
      "name": "folder open-fill",
      "font_class": "folderopen-fill",
      "unicode": "e7c2",
      "unicode_decimal": 59330
    },
    {
      "icon_id": "6151129",
      "name": "folder plus-fill",
      "font_class": "folderplus-fill",
      "unicode": "e7c3",
      "unicode_decimal": 59331
    },
    {
      "icon_id": "6151130",
      "name": "folder-fill",
      "font_class": "folder-fill",
      "unicode": "e7c4",
      "unicode_decimal": 59332
    },
    {
      "icon_id": "6151132",
      "name": "file-SQL",
      "font_class": "file-SQL",
      "unicode": "e7c5",
      "unicode_decimal": 59333
    },
    {
      "icon_id": "6151133",
      "name": "file plus-fill",
      "font_class": "fileplus-fill",
      "unicode": "e7c6",
      "unicode_decimal": 59334
    },
    {
      "icon_id": "6151134",
      "name": "file-fill",
      "font_class": "file-fill",
      "unicode": "e7c7",
      "unicode_decimal": 59335
    },
    {
      "icon_id": "6151135",
      "name": "copy-fill",
      "font_class": "copy-fill",
      "unicode": "e7c8",
      "unicode_decimal": 59336
    },
    {
      "icon_id": "6151136",
      "name": "headset-fill",
      "font_class": "headset-fill",
      "unicode": "e7c9",
      "unicode_decimal": 59337
    },
    {
      "icon_id": "6151138",
      "name": "phone-fill",
      "font_class": "phone-fill",
      "unicode": "e7ca",
      "unicode_decimal": 59338
    },
    {
      "icon_id": "6151139",
      "name": "pause circle-fill",
      "font_class": "pausecircle-fill",
      "unicode": "e7cb",
      "unicode_decimal": 59339
    },
    {
      "icon_id": "6151140",
      "name": "stop circle-fill",
      "font_class": "stopcircle-fill",
      "unicode": "e7cc",
      "unicode_decimal": 59340
    },
    {
      "icon_id": "6151141",
      "name": "play circle-fill",
      "font_class": "playcircle-fill",
      "unicode": "e7cd",
      "unicode_decimal": 59341
    },
    {
      "icon_id": "6151143",
      "name": "delete-fill",
      "font_class": "delete-fill",
      "unicode": "e7ce",
      "unicode_decimal": 59342
    },
    {
      "icon_id": "6151144",
      "name": "picture-fill",
      "font_class": "picture-fill",
      "unicode": "e7cf",
      "unicode_decimal": 59343
    },
    {
      "icon_id": "6151145",
      "name": "mail-fill",
      "font_class": "mail-fill",
      "unicode": "e7d0",
      "unicode_decimal": 59344
    },
    {
      "icon_id": "6151146",
      "name": "heart-fill",
      "font_class": "heart-fill",
      "unicode": "e7d1",
      "unicode_decimal": 59345
    },
    {
      "icon_id": "6151147",
      "name": "collection-fill",
      "font_class": "collection-fill",
      "unicode": "e7d2",
      "unicode_decimal": 59346
    },
    {
      "icon_id": "6151149",
      "name": "user-group-fill",
      "font_class": "user-group-fill",
      "unicode": "e7d3",
      "unicode_decimal": 59347
    },
    {
      "icon_id": "6151150",
      "name": "user plus-fill",
      "font_class": "userplus-fill",
      "unicode": "e7d4",
      "unicode_decimal": 59348
    },
    {
      "icon_id": "6151151",
      "name": "user-fill",
      "font_class": "user-fill",
      "unicode": "e7d5",
      "unicode_decimal": 59349
    },
    {
      "icon_id": "6151152",
      "name": "cog-fill",
      "font_class": "cog-fill",
      "unicode": "e7d6",
      "unicode_decimal": 59350
    },
    {
      "icon_id": "6151154",
      "name": "clock-fill",
      "font_class": "clock-fill",
      "unicode": "e7d7",
      "unicode_decimal": 59351
    },
    {
      "icon_id": "6151155",
      "name": "calendar alt-fill",
      "font_class": "calendaralt-fill",
      "unicode": "e7d8",
      "unicode_decimal": 59352
    },
    {
      "icon_id": "6151157",
      "name": "cloud download-fill",
      "font_class": "clouddownload-fill",
      "unicode": "e7d9",
      "unicode_decimal": 59353
    },
    {
      "icon_id": "6151158",
      "name": "cloud upload-fill",
      "font_class": "cloudupload-fill",
      "unicode": "e7da",
      "unicode_decimal": 59354
    },
    {
      "icon_id": "6151159",
      "name": "exchange-fill",
      "font_class": "exchange-fill",
      "unicode": "e7db",
      "unicode_decimal": 59355
    },
    {
      "icon_id": "6151161",
      "name": "info-circle-fill",
      "font_class": "info-circle-fill",
      "unicode": "e7dc",
      "unicode_decimal": 59356
    },
    {
      "icon_id": "6151162",
      "name": "question-circle-fill",
      "font_class": "question-circle-fill",
      "unicode": "e7dd",
      "unicode_decimal": 59357
    },
    {
      "icon_id": "6151171",
      "name": "exclamation circle-f",
      "font_class": "exclamationcircle-f",
      "unicode": "e7de",
      "unicode_decimal": 59358
    },
    {
      "icon_id": "6151173",
      "name": "minus-circle-fill",
      "font_class": "minus-circle-fill",
      "unicode": "e7df",
      "unicode_decimal": 59359
    },
    {
      "icon_id": "6151174",
      "name": "plus-circle-fill",
      "font_class": "plus-circle-fill",
      "unicode": "e7e0",
      "unicode_decimal": 59360
    },
    {
      "icon_id": "6151176",
      "name": "times-circle-fill",
      "font_class": "times-circle-fill",
      "unicode": "e7e1",
      "unicode_decimal": 59361
    },
    {
      "icon_id": "6151177",
      "name": "check-circle-fill",
      "font_class": "check-circle-fill",
      "unicode": "e7e2",
      "unicode_decimal": 59362
    },
    {
      "icon_id": "6151178",
      "name": "compress alt-fill",
      "font_class": "compressalt-fill",
      "unicode": "e7e3",
      "unicode_decimal": 59363
    },
    {
      "icon_id": "6151181",
      "name": "expand alt-fill",
      "font_class": "expandalt-fill",
      "unicode": "e7e4",
      "unicode_decimal": 59364
    },
    {
      "icon_id": "6151187",
      "name": "filter",
      "font_class": "filter",
      "unicode": "e7e5",
      "unicode_decimal": 59365
    },
    {
      "icon_id": "6151188",
      "name": "all",
      "font_class": "all",
      "unicode": "e7e6",
      "unicode_decimal": 59366
    },
    {
      "icon_id": "6151192",
      "name": "database-plus",
      "font_class": "database-plus",
      "unicode": "e7e7",
      "unicode_decimal": 59367
    },
    {
      "icon_id": "6151193",
      "name": "database",
      "font_class": "database",
      "unicode": "e7e8",
      "unicode_decimal": 59368
    },
    {
      "icon_id": "6151195",
      "name": "comment-lines",
      "font_class": "comment-lines",
      "unicode": "e7e9",
      "unicode_decimal": 59369
    },
    {
      "icon_id": "6151196",
      "name": "comment-dots",
      "font_class": "comment-dots",
      "unicode": "e7ea",
      "unicode_decimal": 59370
    },
    {
      "icon_id": "6151198",
      "name": "paper-plane",
      "font_class": "paper-plane",
      "unicode": "e7eb",
      "unicode_decimal": 59371
    },
    {
      "icon_id": "6151208",
      "name": "eye-slash",
      "font_class": "eye-slash",
      "unicode": "e7ec",
      "unicode_decimal": 59372
    },
    {
      "icon_id": "6151209",
      "name": "eye",
      "font_class": "eye",
      "unicode": "e7ed",
      "unicode_decimal": 59373
    },
    {
      "icon_id": "6151210",
      "name": "lightbulb",
      "font_class": "lightbulb",
      "unicode": "e7ee",
      "unicode_decimal": 59374
    },
    {
      "icon_id": "6151211",
      "name": "flag",
      "font_class": "flag",
      "unicode": "e7ef",
      "unicode_decimal": 59375
    },
    {
      "icon_id": "6151212",
      "name": "tag",
      "font_class": "tag",
      "unicode": "e7f0",
      "unicode_decimal": 59376
    },
    {
      "icon_id": "6151214",
      "name": "position",
      "font_class": "position",
      "unicode": "e7f1",
      "unicode_decimal": 59377
    },
    {
      "icon_id": "6151215",
      "name": "location",
      "font_class": "location",
      "unicode": "e7f2",
      "unicode_decimal": 59378
    },
    {
      "icon_id": "6151216",
      "name": "map",
      "font_class": "map",
      "unicode": "e7f3",
      "unicode_decimal": 59379
    },
    {
      "icon_id": "6151218",
      "name": "inbox-in",
      "font_class": "inbox-in",
      "unicode": "e7f4",
      "unicode_decimal": 59380
    },
    {
      "icon_id": "6151219",
      "name": "box",
      "font_class": "box",
      "unicode": "e7f5",
      "unicode_decimal": 59381
    },
    {
      "icon_id": "6151221",
      "name": "database-set",
      "font_class": "database-set",
      "unicode": "e7f6",
      "unicode_decimal": 59382
    },
    {
      "icon_id": "6151223",
      "name": "layer-group",
      "font_class": "layer-group",
      "unicode": "e7f7",
      "unicode_decimal": 59383
    },
    {
      "icon_id": "6151224",
      "name": "wind-cry",
      "font_class": "wind-cry",
      "unicode": "e7f8",
      "unicode_decimal": 59384
    },
    {
      "icon_id": "6151225",
      "name": "wind-smile",
      "font_class": "wind-smile",
      "unicode": "e7f9",
      "unicode_decimal": 59385
    },
    {
      "icon_id": "6151227",
      "name": "unlock",
      "font_class": "unlock",
      "unicode": "e7fa",
      "unicode_decimal": 59386
    },
    {
      "icon_id": "6151228",
      "name": "lock",
      "font_class": "lock",
      "unicode": "e7fb",
      "unicode_decimal": 59387
    },
    {
      "icon_id": "6151230",
      "name": "align-right",
      "font_class": "align-right",
      "unicode": "e7fc",
      "unicode_decimal": 59388
    },
    {
      "icon_id": "6151231",
      "name": "align-left",
      "font_class": "align-left",
      "unicode": "e7fd",
      "unicode_decimal": 59389
    },
    {
      "icon_id": "6151232",
      "name": "border-bottom",
      "font_class": "border-bottom",
      "unicode": "e7fe",
      "unicode_decimal": 59390
    },
    {
      "icon_id": "6151233",
      "name": "border-top",
      "font_class": "border-top",
      "unicode": "e7ff",
      "unicode_decimal": 59391
    },
    {
      "icon_id": "6151234",
      "name": "align-center",
      "font_class": "align-center",
      "unicode": "e800",
      "unicode_decimal": 59392
    },
    {
      "icon_id": "6151236",
      "name": "border-verticle",
      "font_class": "border-verticle",
      "unicode": "e801",
      "unicode_decimal": 59393
    },
    {
      "icon_id": "6151237",
      "name": "pic-center",
      "font_class": "pic-center",
      "unicode": "e802",
      "unicode_decimal": 59394
    },
    {
      "icon_id": "6151238",
      "name": "pic-side",
      "font_class": "pic-side",
      "unicode": "e803",
      "unicode_decimal": 59395
    },
    {
      "icon_id": "6151239",
      "name": "folder-open",
      "font_class": "folder-open",
      "unicode": "e804",
      "unicode_decimal": 59396
    },
    {
      "icon_id": "6151241",
      "name": "folder-plus",
      "font_class": "folder-plus",
      "unicode": "e805",
      "unicode_decimal": 59397
    },
    {
      "icon_id": "6151242",
      "name": "folder",
      "font_class": "folder",
      "unicode": "e806",
      "unicode_decimal": 59398
    },
    {
      "icon_id": "6151251",
      "name": "file-SQL",
      "font_class": "file-SQL1",
      "unicode": "e807",
      "unicode_decimal": 59399
    },
    {
      "icon_id": "6151252",
      "name": "file-plus",
      "font_class": "file-plus",
      "unicode": "e808",
      "unicode_decimal": 59400
    },
    {
      "icon_id": "6151253",
      "name": "file",
      "font_class": "file",
      "unicode": "e809",
      "unicode_decimal": 59401
    },
    {
      "icon_id": "6151256",
      "name": "copy",
      "font_class": "copy",
      "unicode": "e80a",
      "unicode_decimal": 59402
    },
    {
      "icon_id": "6151257",
      "name": "headset",
      "font_class": "headset",
      "unicode": "e80b",
      "unicode_decimal": 59403
    },
    {
      "icon_id": "6151258",
      "name": "phone",
      "font_class": "phone",
      "unicode": "e80c",
      "unicode_decimal": 59404
    },
    {
      "icon_id": "6151260",
      "name": "pause circle",
      "font_class": "pausecircle",
      "unicode": "e80d",
      "unicode_decimal": 59405
    },
    {
      "icon_id": "6151261",
      "name": "stop circle",
      "font_class": "stopcircle",
      "unicode": "e80e",
      "unicode_decimal": 59406
    },
    {
      "icon_id": "6151262",
      "name": "play circle",
      "font_class": "playcircle",
      "unicode": "e80f",
      "unicode_decimal": 59407
    },
    {
      "icon_id": "6151263",
      "name": "delete",
      "font_class": "delete",
      "unicode": "e810",
      "unicode_decimal": 59408
    },
    {
      "icon_id": "6151264",
      "name": "picture",
      "font_class": "picture",
      "unicode": "e811",
      "unicode_decimal": 59409
    },
    {
      "icon_id": "6151265",
      "name": "mail",
      "font_class": "mail",
      "unicode": "e812",
      "unicode_decimal": 59410
    },
    {
      "icon_id": "6151266",
      "name": "like",
      "font_class": "like",
      "unicode": "e813",
      "unicode_decimal": 59411
    },
    {
      "icon_id": "6151267",
      "name": "collection",
      "font_class": "collection",
      "unicode": "e814",
      "unicode_decimal": 59412
    },
    {
      "icon_id": "6151268",
      "name": "user-group",
      "font_class": "user-group",
      "unicode": "e815",
      "unicode_decimal": 59413
    },
    {
      "icon_id": "6151270",
      "name": "account-plus",
      "font_class": "account-plus",
      "unicode": "e816",
      "unicode_decimal": 59414
    },
    {
      "icon_id": "6151272",
      "name": "account",
      "font_class": "account",
      "unicode": "e817",
      "unicode_decimal": 59415
    },
    {
      "icon_id": "6151273",
      "name": "cog",
      "font_class": "cog",
      "unicode": "e818",
      "unicode_decimal": 59416
    },
    {
      "icon_id": "6151275",
      "name": "clock",
      "font_class": "clock",
      "unicode": "e819",
      "unicode_decimal": 59417
    },
    {
      "icon_id": "6151276",
      "name": "calendar-alt",
      "font_class": "calendar-alt",
      "unicode": "e81a",
      "unicode_decimal": 59418
    },
    {
      "icon_id": "6151277",
      "name": "cloud download",
      "font_class": "clouddownload",
      "unicode": "e81b",
      "unicode_decimal": 59419
    },
    {
      "icon_id": "6151278",
      "name": "cloud upload",
      "font_class": "cloudupload",
      "unicode": "e81c",
      "unicode_decimal": 59420
    },
    {
      "icon_id": "6151279",
      "name": "exchange",
      "font_class": "exchange",
      "unicode": "e81d",
      "unicode_decimal": 59421
    },
    {
      "icon_id": "6151280",
      "name": "info-circle",
      "font_class": "info-circle",
      "unicode": "e81e",
      "unicode_decimal": 59422
    },
    {
      "icon_id": "6151281",
      "name": "question-circle",
      "font_class": "question-circle",
      "unicode": "e81f",
      "unicode_decimal": 59423
    },
    {
      "icon_id": "6151282",
      "name": "exclamation-circle",
      "font_class": "exclamation-circle",
      "unicode": "e820",
      "unicode_decimal": 59424
    },
    {
      "icon_id": "6151283",
      "name": "minus-circle",
      "font_class": "minus-circle",
      "unicode": "e821",
      "unicode_decimal": 59425
    },
    {
      "icon_id": "6151285",
      "name": "plus-circle",
      "font_class": "plus-circle",
      "unicode": "e822",
      "unicode_decimal": 59426
    },
    {
      "icon_id": "6151286",
      "name": "times-circle",
      "font_class": "times-circle",
      "unicode": "e823",
      "unicode_decimal": 59427
    },
    {
      "icon_id": "6151287",
      "name": "check-circle",
      "font_class": "check-circle",
      "unicode": "e824",
      "unicode_decimal": 59428
    },
    {
      "icon_id": "6151288",
      "name": "compress-alt",
      "font_class": "compress-alt",
      "unicode": "e825",
      "unicode_decimal": 59429
    },
    {
      "icon_id": "6151289",
      "name": "expand-alt",
      "font_class": "expand-alt",
      "unicode": "e826",
      "unicode_decimal": 59430
    },
    {
      "icon_id": "6151290",
      "name": "ban",
      "font_class": "ban",
      "unicode": "e827",
      "unicode_decimal": 59431
    },
    {
      "icon_id": "6151292",
      "name": "minus",
      "font_class": "minus",
      "unicode": "e828",
      "unicode_decimal": 59432
    },
    {
      "icon_id": "6151293",
      "name": "plus",
      "font_class": "plus",
      "unicode": "e829",
      "unicode_decimal": 59433
    },
    {
      "icon_id": "6151294",
      "name": "times",
      "font_class": "times",
      "unicode": "e82a",
      "unicode_decimal": 59434
    },
    {
      "icon_id": "6151295",
      "name": "check",
      "font_class": "check",
      "unicode": "e82b",
      "unicode_decimal": 59435
    },
    {
      "icon_id": "6151299",
      "name": "search-minus",
      "font_class": "search-minus",
      "unicode": "e82c",
      "unicode_decimal": 59436
    },
    {
      "icon_id": "6151300",
      "name": "search-plus",
      "font_class": "search-plus",
      "unicode": "e82d",
      "unicode_decimal": 59437
    },
    {
      "icon_id": "6151301",
      "name": "search",
      "font_class": "search",
      "unicode": "e82e",
      "unicode_decimal": 59438
    },
    {
      "icon_id": "6151304",
      "name": "reply",
      "font_class": "reply",
      "unicode": "e82f",
      "unicode_decimal": 59439
    },
    {
      "icon_id": "6151306",
      "name": "undo",
      "font_class": "undo",
      "unicode": "e830",
      "unicode_decimal": 59440
    },
    {
      "icon_id": "6151307",
      "name": "redo",
      "font_class": "redo",
      "unicode": "e831",
      "unicode_decimal": 59441
    },
    {
      "icon_id": "6151308",
      "name": "external-link",
      "font_class": "external-link",
      "unicode": "e832",
      "unicode_decimal": 59442
    },
    {
      "icon_id": "6151309",
      "name": "arrows-alt",
      "font_class": "arrows-alt",
      "unicode": "e833",
      "unicode_decimal": 59443
    },
    {
      "icon_id": "6151310",
      "name": "indent",
      "font_class": "indent",
      "unicode": "e834",
      "unicode_decimal": 59444
    },
    {
      "icon_id": "6151311",
      "name": "outdent",
      "font_class": "outdent",
      "unicode": "e835",
      "unicode_decimal": 59445
    },
    {
      "icon_id": "6151312",
      "name": "sort-line",
      "font_class": "sort-line",
      "unicode": "e836",
      "unicode_decimal": 59446
    },
    {
      "icon_id": "6151314",
      "name": "switch",
      "font_class": "switch",
      "unicode": "e837",
      "unicode_decimal": 59447
    },
    {
      "icon_id": "6151316",
      "name": "wind-descending",
      "font_class": "wind-descending",
      "unicode": "e838",
      "unicode_decimal": 59448
    },
    {
      "icon_id": "6151317",
      "name": "wind-ascending",
      "font_class": "wind-ascending",
      "unicode": "e839",
      "unicode_decimal": 59449
    },
    {
      "icon_id": "6151351",
      "name": "download",
      "font_class": "download",
      "unicode": "e83a",
      "unicode_decimal": 59450
    },
    {
      "icon_id": "6151353",
      "name": "upload",
      "font_class": "upload",
      "unicode": "e83b",
      "unicode_decimal": 59451
    },
    {
      "icon_id": "6151360",
      "name": "arrow-to-bottom",
      "font_class": "arrow-to-bottom",
      "unicode": "e83c",
      "unicode_decimal": 59452
    },
    {
      "icon_id": "6151361",
      "name": "arrow-to-top",
      "font_class": "arrow-to-top",
      "unicode": "e83d",
      "unicode_decimal": 59453
    },
    {
      "icon_id": "6151363",
      "name": "long-arrow-down",
      "font_class": "long-arrow-down",
      "unicode": "e83e",
      "unicode_decimal": 59454
    },
    {
      "icon_id": "6151364",
      "name": "long-arrow-up",
      "font_class": "long-arrow-up",
      "unicode": "e83f",
      "unicode_decimal": 59455
    },
    {
      "icon_id": "6151368",
      "name": "arrow-right",
      "font_class": "arrow-right",
      "unicode": "e840",
      "unicode_decimal": 59456
    },
    {
      "icon_id": "6151370",
      "name": "arrow-left",
      "font_class": "arrow-left",
      "unicode": "e841",
      "unicode_decimal": 59457
    },
    {
      "icon_id": "6151371",
      "name": "sort",
      "font_class": "sort",
      "unicode": "e842",
      "unicode_decimal": 59458
    },
    {
      "icon_id": "6151377",
      "name": "sort-down",
      "font_class": "sort-down",
      "unicode": "e843",
      "unicode_decimal": 59459
    },
    {
      "icon_id": "6151384",
      "name": "sort-up",
      "font_class": "sort-up",
      "unicode": "e844",
      "unicode_decimal": 59460
    },
    {
      "icon_id": "6151385",
      "name": "caret-right",
      "font_class": "caret-right",
      "unicode": "e845",
      "unicode_decimal": 59461
    },
    {
      "icon_id": "6151386",
      "name": "caret-left",
      "font_class": "caret-left",
      "unicode": "e846",
      "unicode_decimal": 59462
    },
    {
      "icon_id": "6151387",
      "name": "arrows-v",
      "font_class": "arrows-v",
      "unicode": "e847",
      "unicode_decimal": 59463
    },
    {
      "icon_id": "6151390",
      "name": "angle- double-down",
      "font_class": "angle-double-down",
      "unicode": "e848",
      "unicode_decimal": 59464
    },
    {
      "icon_id": "6151391",
      "name": "angle-double-up",
      "font_class": "angle-double-up",
      "unicode": "e849",
      "unicode_decimal": 59465
    },
    {
      "icon_id": "6151392",
      "name": "angle-double-right",
      "font_class": "angle-double-right",
      "unicode": "e84a",
      "unicode_decimal": 59466
    },
    {
      "icon_id": "6151393",
      "name": "angle-double-left",
      "font_class": "angle-double-left",
      "unicode": "e84b",
      "unicode_decimal": 59467
    },
    {
      "icon_id": "6151394",
      "name": "angle-down",
      "font_class": "angle-down",
      "unicode": "e84c",
      "unicode_decimal": 59468
    },
    {
      "icon_id": "6151395",
      "name": "angle-up",
      "font_class": "angle-up",
      "unicode": "e84d",
      "unicode_decimal": 59469
    },
    {
      "icon_id": "6151396",
      "name": "angle-right",
      "font_class": "angle-right",
      "unicode": "e84e",
      "unicode_decimal": 59470
    },
    {
      "icon_id": "6151456",
      "name": "angle-left",
      "font_class": "angle-left",
      "unicode": "e84f",
      "unicode_decimal": 59471
    },
    {
      "icon_id": "6168585",
      "name": "paperclip",
      "font_class": "paperclip",
      "unicode": "e850",
      "unicode_decimal": 59472
    },
    {
      "icon_id": "6172713",
      "name": "connection",
      "font_class": "connection",
      "unicode": "e851",
      "unicode_decimal": 59473
    },
    {
      "icon_id": "6172717",
      "name": "training",
      "font_class": "training",
      "unicode": "e853",
      "unicode_decimal": 59475
    },
    {
      "icon_id": "6172721",
      "name": "process",
      "font_class": "process",
      "unicode": "e854",
      "unicode_decimal": 59476
    },
    {
      "icon_id": "6172722",
      "name": "news",
      "font_class": "news",
      "unicode": "e855",
      "unicode_decimal": 59477
    },
    {
      "icon_id": "6172724",
      "name": "save",
      "font_class": "save",
      "unicode": "e856",
      "unicode_decimal": 59478
    },
    {
      "icon_id": "6172748",
      "name": "print",
      "font_class": "print",
      "unicode": "e857",
      "unicode_decimal": 59479
    },
    {
      "icon_id": "6172751",
      "name": "new-releases",
      "font_class": "new-releases",
      "unicode": "e858",
      "unicode_decimal": 59480
    },
    {
      "icon_id": "6172758",
      "name": "release",
      "font_class": "release",
      "unicode": "e85a",
      "unicode_decimal": 59482
    },
    {
      "icon_id": "6172762",
      "name": "alert",
      "font_class": "alert",
      "unicode": "e85b",
      "unicode_decimal": 59483
    },
    {
      "icon_id": "6172770",
      "name": "backspace",
      "font_class": "backspace",
      "unicode": "e85c",
      "unicode_decimal": 59484
    },
    {
      "icon_id": "6172775",
      "name": "gem",
      "font_class": "gem",
      "unicode": "e85d",
      "unicode_decimal": 59485
    },
    {
      "icon_id": "6172776",
      "name": "integral",
      "font_class": "integral",
      "unicode": "e85e",
      "unicode_decimal": 59486
    },
    {
      "icon_id": "6172777",
      "name": "star-circle",
      "font_class": "star-circle",
      "unicode": "e85f",
      "unicode_decimal": 59487
    },
    {
      "icon_id": "6172778",
      "name": "user-circle",
      "font_class": "user-circle",
      "unicode": "e860",
      "unicode_decimal": 59488
    },
    {
      "icon_id": "6172783",
      "name": "cloud-machine-fill",
      "font_class": "cloud-machine-fill",
      "unicode": "e861",
      "unicode_decimal": 59489
    },
    {
      "icon_id": "6172784",
      "name": "cloud-machine",
      "font_class": "cloud-machine",
      "unicode": "e862",
      "unicode_decimal": 59490
    },
    {
      "icon_id": "6172785",
      "name": "terminal-fill",
      "font_class": "terminal-fill",
      "unicode": "e863",
      "unicode_decimal": 59491
    },
    {
      "icon_id": "6172786",
      "name": "terminal",
      "font_class": "terminal",
      "unicode": "e864",
      "unicode_decimal": 59492
    },
    {
      "icon_id": "6173016",
      "name": "shopping-cart-fill",
      "font_class": "shopping-cart-fill",
      "unicode": "e865",
      "unicode_decimal": 59493
    },
    {
      "icon_id": "6228652",
      "name": "resource",
      "font_class": "resource",
      "unicode": "e867",
      "unicode_decimal": 59495
    },
    {
      "icon_id": "6303226",
      "name": "rank",
      "font_class": "rank",
      "unicode": "e86a",
      "unicode_decimal": 59498
    },
    {
      "icon_id": "6343820",
      "name": "sync-alt",
      "font_class": "sync-alt",
      "unicode": "e86b",
      "unicode_decimal": 59499
    },
    {
      "icon_id": "6343821",
      "name": "compass",
      "font_class": "compass",
      "unicode": "e86c",
      "unicode_decimal": 59500
    },
    {
      "icon_id": "6343822",
      "name": "arrow-alt- from-top",
      "font_class": "arrow-alt-from-top",
      "unicode": "e86d",
      "unicode_decimal": 59501
    },
    {
      "icon_id": "6343823",
      "name": "arrow-alt-from-botto",
      "font_class": "arrow-alt-from-botto",
      "unicode": "e86e",
      "unicode_decimal": 59502
    },
    {
      "icon_id": "6343824",
      "name": "menu",
      "font_class": "menu",
      "unicode": "e86f",
      "unicode_decimal": 59503
    },
    {
      "icon_id": "6353291",
      "name": "icon-drag",
      "font_class": "icon-drag",
      "unicode": "e870",
      "unicode_decimal": 59504
    },
    {
      "icon_id": "6353292",
      "name": "early-warning",
      "font_class": "early-warning",
      "unicode": "e871",
      "unicode_decimal": 59505
    },
    {
      "icon_id": "6353293",
      "name": "share",
      "font_class": "share",
      "unicode": "e872",
      "unicode_decimal": 59506
    },
    {
      "icon_id": "6353306",
      "name": "share",
      "font_class": "share1",
      "unicode": "e873",
      "unicode_decimal": 59507
    },
    {
      "icon_id": "6861314",
      "name": "management",
      "font_class": "management-",
      "unicode": "e874",
      "unicode_decimal": 59508
    },
    {
      "icon_id": "6863066",
      "name": "accesskeys",
      "font_class": "accesskeys",
      "unicode": "e875",
      "unicode_decimal": 59509
    },
    {
      "icon_id": "7357537",
      "name": "arrow-sort down-small",
      "font_class": "arrow-sortdown-smal",
      "unicode": "e877",
      "unicode_decimal": 59511
    },
    {
      "icon_id": "7410218",
      "name": "minus-square-fill",
      "font_class": "minus-square-fill",
      "unicode": "e878",
      "unicode_decimal": 59512
    },
    {
      "icon_id": "7410219",
      "name": "plus-square-fill",
      "font_class": "plus-square-fill",
      "unicode": "e879",
      "unicode_decimal": 59513
    },
    {
      "icon_id": "7410220",
      "name": "minus-square",
      "font_class": "minus-square",
      "unicode": "e87a",
      "unicode_decimal": 59514
    },
    {
      "icon_id": "7410222",
      "name": "plus-square",
      "font_class": "plus-square",
      "unicode": "e87b",
      "unicode_decimal": 59515
    },
    {
      "icon_id": "7906283",
      "name": "step mode",
      "font_class": "stepmode",
      "unicode": "e87d",
      "unicode_decimal": 59517
    },
    {
      "icon_id": "7906284",
      "name": "scrolling mode",
      "font_class": "scrollingmode",
      "unicode": "e87e",
      "unicode_decimal": 59518
    },
    {
      "icon_id": "8268337",
      "name": "shopping cart",
      "font_class": "shoppingcart",
      "unicode": "e881",
      "unicode_decimal": 59521
    },
    {
      "icon_id": "8305716",
      "name": "waiting-fill",
      "font_class": "waiting-fill",
      "unicode": "e882",
      "unicode_decimal": 59522
    },
    {
      "icon_id": "8305718",
      "name": "waiting",
      "font_class": "waiting",
      "unicode": "e883",
      "unicode_decimal": 59523
    },
    {
      "icon_id": "8307796",
      "name": "right-arrow-rect",
      "font_class": "right-arrow-rect",
      "unicode": "e884",
      "unicode_decimal": 59524
    },
    {
      "icon_id": "8307800",
      "name": "left-arrow-rect",
      "font_class": "left-arrow-rect",
      "unicode": "e885",
      "unicode_decimal": 59525
    },
    {
      "icon_id": "8623603",
      "name": "bell",
      "font_class": "bell",
      "unicode": "e887",
      "unicode_decimal": 59527
    },
    {
      "icon_id": "8762555",
      "name": "structured data",
      "font_class": "structured-data",
      "unicode": "e888",
      "unicode_decimal": 59528
    },
    {
      "icon_id": "6150957",
      "name": "drag",
      "font_class": "drag",
      "unicode": "e769",
      "unicode_decimal": 59241
    },
    {
      "icon_id": "8762556",
      "name": "vector",
      "font_class": "vector",
      "unicode": "e889",
      "unicode_decimal": 59529
    },
    {
      "icon_id": "6150958",
      "name": "ellipsis-v",
      "font_class": "ellipsis-vertical",
      "unicode": "e76a",
      "unicode_decimal": 59242
    },
    {
      "icon_id": "9009443",
      "name": "NEW",
      "font_class": "NEW-copy",
      "unicode": "e88a",
      "unicode_decimal": 59530
    },
    {
      "icon_id": "6150959",
      "name": "gallery-view",
      "font_class": "gallery-view",
      "unicode": "e76b",
      "unicode_decimal": 59243
    },
    {
      "icon_id": "9009475",
      "name": "HOT",
      "font_class": "HOT-copy",
      "unicode": "e88b",
      "unicode_decimal": 59531
    },
    {
      "icon_id": "6150960",
      "name": "WIFI",
      "font_class": "WIFI",
      "unicode": "e76c",
      "unicode_decimal": 59244
    },
    {
      "icon_id": "9066652",
      "name": "home",
      "font_class": "home",
      "unicode": "e88c",
      "unicode_decimal": 59532
    },
    {
      "icon_id": "6150961",
      "name": "bug-report",
      "font_class": "bug-report",
      "unicode": "e76d",
      "unicode_decimal": 59245
    },
    {
      "icon_id": "9340469",
      "name": "monitoring",
      "font_class": "monitoring",
      "unicode": "e88e",
      "unicode_decimal": 59534
    },
    {
      "icon_id": "6150962",
      "name": "qrcode",
      "font_class": "qrcode",
      "unicode": "e76e",
      "unicode_decimal": 59246
    },
    {
      "icon_id": "9340470",
      "name": "diagnose",
      "font_class": "diagnose",
      "unicode": "e88f",
      "unicode_decimal": 59535
    },
    {
      "icon_id": "6150963",
      "name": "scan",
      "font_class": "scan",
      "unicode": "e76f",
      "unicode_decimal": 59247
    },
    {
      "icon_id": "10273624",
      "name": "loading",
      "font_class": "loading",
      "unicode": "e891",
      "unicode_decimal": 59537
    },
    {
      "icon_id": "6150964",
      "name": "cut",
      "font_class": "cut",
      "unicode": "e770",
      "unicode_decimal": 59248
    },
    {
      "icon_id": "11307823",
      "name": "Directory tree",
      "font_class": "Directory-tree",
      "unicode": "e892",
      "unicode_decimal": 59538
    },
    {
      "icon_id": "6150965",
      "name": "gift",
      "font_class": "gift",
      "unicode": "e771",
      "unicode_decimal": 59249
    },
    {
      "icon_id": "12253601",
      "name": "application",
      "font_class": "application",
      "unicode": "e89e",
      "unicode_decimal": 59550
    },
    {
      "icon_id": "6150966",
      "name": "link",
      "font_class": "link",
      "unicode": "e772",
      "unicode_decimal": 59250
    },
    {
      "icon_id": "12253602",
      "name": "application  group",
      "font_class": "applicationgroup",
      "unicode": "e89f",
      "unicode_decimal": 59551
    },
    {
      "icon_id": "6150968",
      "name": "poweroff",
      "font_class": "poweroff",
      "unicode": "e774",
      "unicode_decimal": 59252
    },
    {
      "icon_id": "6150969",
      "name": "key",
      "font_class": "key",
      "unicode": "e775",
      "unicode_decimal": 59253
    },
    {
      "icon_id": "6150970",
      "name": "safety-certificate",
      "font_class": "safety-certificate",
      "unicode": "e776",
      "unicode_decimal": 59254
    },
    {
      "icon_id": "6150971",
      "name": "supervise",
      "font_class": "supervise",
      "unicode": "e777",
      "unicode_decimal": 59255
    },
    {
      "icon_id": "6151018",
      "name": "tag-subscipt",
      "font_class": "tag-subscipt",
      "unicode": "e78a",
      "unicode_decimal": 59274
    },
    {
      "icon_id": "6151030",
      "name": "chart-pie-alt",
      "font_class": "chart-pie-alt",
      "unicode": "e78c",
      "unicode_decimal": 59276
    },
    {
      "icon_id": "6151031",
      "name": "chart-relation",
      "font_class": "chart-relation",
      "unicode": "e78d",
      "unicode_decimal": 59277
    },
    {
      "icon_id": "6151032",
      "name": "chart-scatter-plot",
      "font_class": "chart-scatter-plot",
      "unicode": "e78e",
      "unicode_decimal": 59278
    },
    {
      "icon_id": "6151033",
      "name": "chart-area",
      "font_class": "chart-area",
      "unicode": "e78f",
      "unicode_decimal": 59279
    },
    {
      "icon_id": "6151034",
      "name": "chart-line",
      "font_class": "chart-line",
      "unicode": "e790",
      "unicode_decimal": 59280
    },
    {
      "icon_id": "6151035",
      "name": "chart-bar",
      "font_class": "chart-bar",
      "unicode": "e791",
      "unicode_decimal": 59281
    }
  ];
  const language$2 = "English-US";
  const en = {
    language: language$2,
    "index.search.subtext": "Fully compatible with vue3 TypeScript pinia component library",
    "index.search.tips": "Chinese/English name",
    "index.search.btntext": "search",
    "index.com.navtitle": "TMUI All platforms",
    "index.com.title": "Category Navigation",
    "index.com.tongyong": "Universal",
    "index.com.row": "Layout",
    "index.com.show": "Display",
    "index.com.form": "Form",
    "index.com.fd": "Reminder",
    "index.com.nav": "Navigation",
    "index.com.yewu": "Business",
    "index.com.other": "Other",
    "index.com.tubiao": "Chart",
    "index.com.tongyongSub": "can't translate",
    "index.com.rowSub": "can't translate",
    "index.com.showSub": "can't translate",
    "index.com.formSub": "can't translate",
    "index.com.fdSub": "can't translate",
    "index.com.navSub": "can't translate",
    "index.com.yewuSub": "can't translate",
    "index.com.otherSub": "can't translate",
    "index.com.tubiaoSub": "Echarts 5.3.2",
    "index.com.render": "Render",
    "index.com.renderSub": "cavas render",
    "index.com.pag": "PAG",
    "index.com.pagSub": "pag animation",
    "index.com.bottom": "TMUI3.0",
    "index.com.setLocal": "language setting",
    "index.com.autoDark": "followDark system",
    "index.com.love": "Action support",
    "index.com.loveSub": "Watch an ad",
    "index.com.themetext": "Dynamically switch theme sore of see docs",
    "index.com.themeGreen": "Yellow",
    "index.com.themeBlue": "Blue",
    "index.com.themeRed": "Red",
    "index.com.themeDefault": "Default",
    "index.com.themeCustText": "custom",
    "message.load.text": "Loading",
    "message.error.text": "Error",
    "message.info.text": "Tips",
    "message.warn.text": "Warning",
    "message.quest.text": "Question",
    "message.success.text": "Success",
    "message.disabled.text": "Disabled",
    "message.wait.text": "Waiting"
  };
  const language$1 = "简体-中国";
  const zhHans = {
    language: language$1,
    "index.search.subtext": "全端兼容vue3 TypeScript pinia组件库",
    "index.search.tips": "组件中文/英文名称",
    "index.search.btntext": "搜索组件",
    "index.com.navtitle": "TMUI 全平台组件库",
    "index.com.title": "分类导航",
    "index.com.tongyong": "通用组件",
    "index.com.tongyongSub": "高频常用组件",
    "index.com.row": "布局组件",
    "index.com.rowSub": "布局排版",
    "index.com.show": "展示组件",
    "index.com.showSub": "常见数据展示",
    "index.com.form": "表单录入",
    "index.com.formSub": "数据提交类",
    "index.com.fd": "反馈类型",
    "index.com.fdSub": "提示弹层类组件",
    "index.com.nav": "导航类型",
    "index.com.navSub": "分页导航类",
    "index.com.yewu": "业务型组件",
    "index.com.yewuSub": "优惠券导购类",
    "index.com.other": "其它",
    "index.com.otherSub": "功能型组件",
    "index.com.tubiao": "图表组件",
    "index.com.tubiaoSub": "Echarts 5.3.2",
    "index.com.render": "tmCv",
    "index.com.renderSub": "canvas动画渲染",
    "index.com.pag": "PAG",
    "index.com.pagSub": "腾讯pag动画",
    "index.com.bottom": "TMUI3.0",
    "index.com.setLocal": "设置语言",
    "index.com.autoDark": "暗黑跟随系统",
    "index.com.love": "TMUI用户中心",
    "index.com.loveSub": "看广告赚积分",
    "index.com.themetext": "动态切换主题,默认主题见文档",
    "index.com.themeGreen": "小黄",
    "index.com.themeBlue": "蓝色",
    "index.com.themeRed": "红色",
    "index.com.themeDefault": "默认",
    "index.com.themeCustText": "自定",
    "message.load.text": "加载中",
    "message.error.text": "操作错误",
    "message.info.text": "提示信息",
    "message.warn.text": "警告信息",
    "message.quest.text": "似乎有问题",
    "message.success.text": "操作成功",
    "message.disabled.text": "禁止操作",
    "message.wait.text": "请稍候.."
  };
  /*!
    * @intlify/shared v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const inBrowser = typeof window !== "undefined";
  let mark;
  let measure;
  {
    const perf2 = inBrowser && window.performance;
    if (perf2 && perf2.mark && perf2.measure && perf2.clearMarks && perf2.clearMeasures) {
      mark = (tag) => perf2.mark(tag);
      measure = (name, startTag, endTag) => {
        perf2.measure(name, startTag, endTag);
        perf2.clearMarks(startTag);
        perf2.clearMarks(endTag);
      };
    }
  }
  const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
  function format(message, ...args) {
    if (args.length === 1 && isObject$1(args[0])) {
      args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
      args = {};
    }
    return message.replace(RE_ARGS, (match, identifier) => {
      return args.hasOwnProperty(identifier) ? args[identifier] : "";
    });
  }
  const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
  const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
  const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
  const isNumber = (val) => typeof val === "number" && isFinite(val);
  const isDate = (val) => toTypeString(val) === "[object Date]";
  const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
  const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
  function warn(msg, err) {
    if (typeof console !== "undefined") {
      console.warn(`[intlify] ` + msg);
      if (err) {
        console.warn(err.stack);
      }
    }
  }
  const assign = Object.assign;
  let _globalThis;
  const getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function escapeHtml(rawText) {
    return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  function hasOwn$1(obj, key) {
    return hasOwnProperty$1.call(obj, key);
  }
  const isArray = Array.isArray;
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isBoolean = (val) => typeof val === "boolean";
  const isObject$1 = (val) => (
    // eslint-disable-line
    val !== null && typeof val === "object"
  );
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject = (val) => toTypeString(val) === "[object Object]";
  const toDisplayString = (val) => {
    return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j]}`);
          const lineLength = lines[j].length;
          if (j === i) {
            const pad = start - (count - lineLength) + 1;
            const length = Math.max(1, end > count ? lineLength - pad : end - start);
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + 1;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }
  function createEmitter() {
    const events = /* @__PURE__ */ new Map();
    const emitter = {
      events,
      on(event, handler) {
        const handlers = events.get(event);
        const added = handlers && handlers.push(handler);
        if (!added) {
          events.set(event, [handler]);
        }
      },
      off(event, handler) {
        const handlers = events.get(event);
        if (handlers) {
          handlers.splice(handlers.indexOf(handler) >>> 0, 1);
        }
      },
      emit(event, payload) {
        (events.get(event) || []).slice().map((handler) => handler(payload));
        (events.get("*") || []).slice().map((handler) => handler(event, payload));
      }
    };
    return emitter;
  }
  /*!
    * @intlify/message-resolver v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  const isObject = (val) => (
    // eslint-disable-line
    val !== null && typeof val === "object"
  );
  const pathStateMachine = [];
  pathStateMachine[
    0
    /* BEFORE_PATH */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      0
      /* BEFORE_PATH */
    ],
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4
      /* IN_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7
      /* AFTER_PATH */
    ]
  };
  pathStateMachine[
    1
    /* IN_PATH */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      1
      /* IN_PATH */
    ],
    [
      "."
      /* DOT */
    ]: [
      2
      /* BEFORE_IDENT */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4
      /* IN_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7
      /* AFTER_PATH */
    ]
  };
  pathStateMachine[
    2
    /* BEFORE_IDENT */
  ] = {
    [
      "w"
      /* WORKSPACE */
    ]: [
      2
      /* BEFORE_IDENT */
    ],
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "0"
      /* ZERO */
    ]: [
      3,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    3
    /* IN_IDENT */
  ] = {
    [
      "i"
      /* IDENT */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "0"
      /* ZERO */
    ]: [
      3,
      0
      /* APPEND */
    ],
    [
      "w"
      /* WORKSPACE */
    ]: [
      1,
      1
      /* PUSH */
    ],
    [
      "."
      /* DOT */
    ]: [
      2,
      1
      /* PUSH */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4,
      1
      /* PUSH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: [
      7,
      1
      /* PUSH */
    ]
  };
  pathStateMachine[
    4
    /* IN_SUB_PATH */
  ] = {
    [
      "'"
      /* SINGLE_QUOTE */
    ]: [
      5,
      0
      /* APPEND */
    ],
    [
      '"'
      /* DOUBLE_QUOTE */
    ]: [
      6,
      0
      /* APPEND */
    ],
    [
      "["
      /* LEFT_BRACKET */
    ]: [
      4,
      2
      /* INC_SUB_PATH_DEPTH */
    ],
    [
      "]"
      /* RIGHT_BRACKET */
    ]: [
      1,
      3
      /* PUSH_SUB_PATH */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      4,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    5
    /* IN_SINGLE_QUOTE */
  ] = {
    [
      "'"
      /* SINGLE_QUOTE */
    ]: [
      4,
      0
      /* APPEND */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      5,
      0
      /* APPEND */
    ]
  };
  pathStateMachine[
    6
    /* IN_DOUBLE_QUOTE */
  ] = {
    [
      '"'
      /* DOUBLE_QUOTE */
    ]: [
      4,
      0
      /* APPEND */
    ],
    [
      "o"
      /* END_OF_FAIL */
    ]: 8,
    [
      "l"
      /* ELSE */
    ]: [
      6,
      0
      /* APPEND */
    ]
  };
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
    return literalValueRE.test(exp);
  }
  function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
  }
  function getPathCharType(ch) {
    if (ch === void 0 || ch === null) {
      return "o";
    }
    const code = ch.charCodeAt(0);
    switch (code) {
      case 91:
      case 93:
      case 46:
      case 34:
      case 39:
        return ch;
      case 95:
      case 36:
      case 45:
        return "i";
      case 9:
      case 10:
      case 13:
      case 160:
      case 65279:
      case 8232:
      case 8233:
        return "w";
    }
    return "i";
  }
  function formatSubPath(path) {
    const trimmed = path.trim();
    if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
      return false;
    }
    return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
  }
  function parse(path) {
    const keys = [];
    let index = -1;
    let mode = 0;
    let subPathDepth = 0;
    let c;
    let key;
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[
      0
      /* APPEND */
    ] = () => {
      if (key === void 0) {
        key = newChar;
      } else {
        key += newChar;
      }
    };
    actions[
      1
      /* PUSH */
    ] = () => {
      if (key !== void 0) {
        keys.push(key);
        key = void 0;
      }
    };
    actions[
      2
      /* INC_SUB_PATH_DEPTH */
    ] = () => {
      actions[
        0
        /* APPEND */
      ]();
      subPathDepth++;
    };
    actions[
      3
      /* PUSH_SUB_PATH */
    ] = () => {
      if (subPathDepth > 0) {
        subPathDepth--;
        mode = 4;
        actions[
          0
          /* APPEND */
        ]();
      } else {
        subPathDepth = 0;
        if (key === void 0) {
          return false;
        }
        key = formatSubPath(key);
        if (key === false) {
          return false;
        } else {
          actions[
            1
            /* PUSH */
          ]();
        }
      }
    };
    function maybeUnescapeQuote() {
      const nextChar = path[index + 1];
      if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
        index++;
        newChar = "\\" + nextChar;
        actions[
          0
          /* APPEND */
        ]();
        return true;
      }
    }
    while (mode !== null) {
      index++;
      c = path[index];
      if (c === "\\" && maybeUnescapeQuote()) {
        continue;
      }
      type = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap[
        "l"
        /* ELSE */
      ] || 8;
      if (transition === 8) {
        return;
      }
      mode = transition[0];
      if (transition[1] !== void 0) {
        action = actions[transition[1]];
        if (action) {
          newChar = c;
          if (action() === false) {
            return;
          }
        }
      }
      if (mode === 7) {
        return keys;
      }
    }
  }
  const cache = /* @__PURE__ */ new Map();
  function resolveValue(obj, path) {
    if (!isObject(obj)) {
      return null;
    }
    let hit = cache.get(path);
    if (!hit) {
      hit = parse(path);
      if (hit) {
        cache.set(path, hit);
      }
    }
    if (!hit) {
      return null;
    }
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
      const val = last[hit[i]];
      if (val === void 0) {
        return null;
      }
      last = val;
      i++;
    }
    return last;
  }
  function handleFlatJson(obj) {
    if (!isObject(obj)) {
      return obj;
    }
    for (const key in obj) {
      if (!hasOwn(obj, key)) {
        continue;
      }
      if (!key.includes(
        "."
        /* DOT */
      )) {
        if (isObject(obj[key])) {
          handleFlatJson(obj[key]);
        }
      } else {
        const subKeys = key.split(
          "."
          /* DOT */
        );
        const lastIndex = subKeys.length - 1;
        let currentObj = obj;
        for (let i = 0; i < lastIndex; i++) {
          if (!(subKeys[i] in currentObj)) {
            currentObj[subKeys[i]] = {};
          }
          currentObj = currentObj[subKeys[i]];
        }
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
        if (isObject(currentObj[subKeys[lastIndex]])) {
          handleFlatJson(currentObj[subKeys[lastIndex]]);
        }
      }
    }
    return obj;
  }
  /*!
    * @intlify/runtime v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const DEFAULT_MODIFIER = (str) => str;
  const DEFAULT_MESSAGE = (ctx) => "";
  const DEFAULT_MESSAGE_DATA_TYPE = "text";
  const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
  const DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
      return choice ? choice > 1 ? 1 : 0 : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
    const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
    return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
  }
  function normalizeNamed(pluralIndex, props) {
    if (!props.count) {
      props.count = pluralIndex;
    }
    if (!props.n) {
      props.n = pluralIndex;
    }
  }
  function createMessageContext(options = {}) {
    const locale = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
    const orgPluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
    const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
    const _list = options.list || [];
    const list = (index) => _list[index];
    const _named = options.named || {};
    isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    function message(key) {
      const msg = isFunction(options.messages) ? options.messages(key) : isObject$1(options.messages) ? options.messages[key] : false;
      return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
    }
    const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
    const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
    const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
    const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
    const ctx = {
      [
        "list"
        /* LIST */
      ]: list,
      [
        "named"
        /* NAMED */
      ]: named,
      [
        "plural"
        /* PLURAL */
      ]: plural,
      [
        "linked"
        /* LINKED */
      ]: (key, modifier) => {
        const msg = message(key)(ctx);
        return isString(modifier) ? _modifier(modifier)(msg) : msg;
      },
      [
        "message"
        /* MESSAGE */
      ]: message,
      [
        "type"
        /* TYPE */
      ]: type,
      [
        "interpolate"
        /* INTERPOLATE */
      ]: interpolate,
      [
        "normalize"
        /* NORMALIZE */
      ]: normalize
    };
    return ctx;
  }
  /*!
    * @intlify/message-compiler v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const errorMessages$2 = {
    // tokenizer error messages
    [
      0
      /* EXPECTED_TOKEN */
    ]: `Expected token: '{0}'`,
    [
      1
      /* INVALID_TOKEN_IN_PLACEHOLDER */
    ]: `Invalid token in placeholder: '{0}'`,
    [
      2
      /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */
    ]: `Unterminated single quote in placeholder`,
    [
      3
      /* UNKNOWN_ESCAPE_SEQUENCE */
    ]: `Unknown escape sequence: \\{0}`,
    [
      4
      /* INVALID_UNICODE_ESCAPE_SEQUENCE */
    ]: `Invalid unicode escape sequence: {0}`,
    [
      5
      /* UNBALANCED_CLOSING_BRACE */
    ]: `Unbalanced closing brace`,
    [
      6
      /* UNTERMINATED_CLOSING_BRACE */
    ]: `Unterminated closing brace`,
    [
      7
      /* EMPTY_PLACEHOLDER */
    ]: `Empty placeholder`,
    [
      8
      /* NOT_ALLOW_NEST_PLACEHOLDER */
    ]: `Not allowed nest placeholder`,
    [
      9
      /* INVALID_LINKED_FORMAT */
    ]: `Invalid linked format`,
    // parser error messages
    [
      10
      /* MUST_HAVE_MESSAGES_IN_PLURAL */
    ]: `Plural must have messages`,
    [
      11
      /* UNEXPECTED_EMPTY_LINKED_MODIFIER */
    ]: `Unexpected empty linked modifier`,
    [
      12
      /* UNEXPECTED_EMPTY_LINKED_KEY */
    ]: `Unexpected empty linked key`,
    [
      13
      /* UNEXPECTED_LEXICAL_ANALYSIS */
    ]: `Unexpected lexical analysis in token: '{0}'`
  };
  function createCompileError(code, loc, options = {}) {
    const { domain, messages, args } = options;
    const msg = format((messages || errorMessages$2)[code] || "", ...args || []);
    const error = new SyntaxError(String(msg));
    error.code = code;
    error.domain = domain;
    return error;
  }
  /*!
    * @intlify/devtools-if v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const IntlifyDevToolsHooks = {
    I18nInit: "i18n:init",
    FunctionTranslate: "function:translate"
  };
  /*!
    * @intlify/core-base v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  let devtools = null;
  function setDevToolsHook(hook) {
    devtools = hook;
  }
  function initI18nDevTools(i18n, version, meta) {
    devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
      timestamp: Date.now(),
      i18n,
      version,
      meta
    });
  }
  const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
  function createDevToolsHook(hook) {
    return (payloads) => devtools && devtools.emit(hook, payloads);
  }
  const warnMessages$1 = {
    [
      0
      /* NOT_FOUND_KEY */
    ]: `Not found '{key}' key in '{locale}' locale messages.`,
    [
      1
      /* FALLBACK_TO_TRANSLATE */
    ]: `Fall back to translate '{key}' key with '{target}' locale.`,
    [
      2
      /* CANNOT_FORMAT_NUMBER */
    ]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
    [
      3
      /* FALLBACK_TO_NUMBER_FORMAT */
    ]: `Fall back to number format '{key}' key with '{target}' locale.`,
    [
      4
      /* CANNOT_FORMAT_DATE */
    ]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
    [
      5
      /* FALLBACK_TO_DATE_FORMAT */
    ]: `Fall back to datetime format '{key}' key with '{target}' locale.`
  };
  function getWarnMessage$1(code, ...args) {
    return format(warnMessages$1[code], ...args);
  }
  const VERSION$1 = "9.1.9";
  const NOT_REOSLVED = -1;
  const MISSING_RESOLVE_VALUE = "";
  function getDefaultLinkedModifiers() {
    return {
      upper: (val) => isString(val) ? val.toUpperCase() : val,
      lower: (val) => isString(val) ? val.toLowerCase() : val,
      // prettier-ignore
      capitalize: (val) => isString(val) ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}` : val
    };
  }
  let _compiler;
  let _additionalMeta = null;
  const setAdditionalMeta = (meta) => {
    _additionalMeta = meta;
  };
  const getAdditionalMeta = () => _additionalMeta;
  let _cid = 0;
  function createCoreContext(options = {}) {
    const version = isString(options.version) ? options.version : VERSION$1;
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const messages = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
    const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
    const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
    const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || {};
    const missing = isFunction(options.missing) ? options.missing : null;
    const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    const processor = isPlainObject(options.processor) ? options.processor : null;
    const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
    const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
    const internalOptions = options;
    const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
    const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
    const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
    _cid++;
    const context = {
      version,
      cid: _cid,
      locale,
      fallbackLocale,
      messages,
      datetimeFormats,
      numberFormats,
      modifiers,
      pluralRules,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackFormat,
      unresolving,
      postTranslation,
      processor,
      warnHtmlMessage,
      escapeParameter,
      messageCompiler,
      onWarn,
      __datetimeFormatters,
      __numberFormatters,
      __meta
    };
    {
      context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
    }
    {
      initI18nDevTools(context, version, __meta);
    }
    return context;
  }
  function isTranslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
  }
  function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
  }
  function handleMissing(context, key, locale, missingWarn, type) {
    const { missing, onWarn } = context;
    {
      const emitter = context.__v_emitter;
      if (emitter) {
        emitter.emit("missing", {
          locale,
          key,
          type,
          groupId: `${type}:${key}`
        });
      }
    }
    if (missing !== null) {
      const ret = missing(context, locale, key, type);
      return isString(ret) ? ret : key;
    } else {
      if (isTranslateMissingWarn(missingWarn, key)) {
        onWarn(getWarnMessage$1(0, { key, locale }));
      }
      return key;
    }
  }
  function getLocaleChain(ctx, fallback, start) {
    const context = ctx;
    if (!context.__localeChainCache) {
      context.__localeChainCache = /* @__PURE__ */ new Map();
    }
    let chain = context.__localeChainCache.get(start);
    if (!chain) {
      chain = [];
      let block = [start];
      while (isArray(block)) {
        block = appendBlockToChain(chain, block, fallback);
      }
      const defaults = isArray(fallback) ? fallback : isPlainObject(fallback) ? fallback["default"] ? fallback["default"] : null : fallback;
      block = isString(defaults) ? [defaults] : defaults;
      if (isArray(block)) {
        appendBlockToChain(chain, block, false);
      }
      context.__localeChainCache.set(start, chain);
    }
    return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && isBoolean(follow); i++) {
      const locale = block[i];
      if (isString(locale)) {
        follow = appendLocaleToChain(chain, block[i], blocks);
      }
    }
    return follow;
  }
  function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split("-");
    do {
      const target = tokens.join("-");
      follow = appendItemToChain(chain, target, blocks);
      tokens.splice(-1, 1);
    } while (tokens.length && follow === true);
    return follow;
  }
  function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
      follow = true;
      if (target) {
        follow = target[target.length - 1] !== "!";
        const locale = target.replace(/!/g, "");
        chain.push(locale);
        if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
          follow = blocks[locale];
        }
      }
    }
    return follow;
  }
  function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = /* @__PURE__ */ new Map();
    getLocaleChain(ctx, fallback, locale);
  }
  function createCoreError(code) {
    return createCompileError(code, null, { messages: errorMessages$1 });
  }
  const errorMessages$1 = {
    [
      14
      /* INVALID_ARGUMENT */
    ]: "Invalid arguments",
    [
      15
      /* INVALID_DATE_ARGUMENT */
    ]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
    [
      16
      /* INVALID_ISO_DATE_ARGUMENT */
    ]: "The argument provided is not a valid ISO date string"
  };
  const NOOP_MESSAGE_FUNCTION = () => "";
  const isMessageFunction = (val) => isFunction(val);
  function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
    const resolvedMessage = !!options.resolvedMessage;
    const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : key : fallbackFormat ? key : "";
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
    const locale = isString(options.locale) ? options.locale : context.locale;
    escapeParameter && escapeParams(options);
    let [format2, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
      key,
      locale,
      messages[locale] || {}
    ];
    let cacheBaseKey = key;
    if (!resolvedMessage && !(isString(format2) || isMessageFunction(format2))) {
      if (enableDefaultMsg) {
        format2 = defaultMsgOrKey;
        cacheBaseKey = format2;
      }
    }
    if (!resolvedMessage && (!(isString(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
      return unresolving ? NOT_REOSLVED : key;
    }
    if (isString(format2) && context.messageCompiler == null) {
      warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key}'.`);
      return key;
    }
    let occurred = false;
    const errorDetector = () => {
      occurred = true;
    };
    const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) : format2;
    if (occurred) {
      return format2;
    }
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    const ret = postTranslation ? postTranslation(messaged) : messaged;
    {
      const payloads = {
        timestamp: Date.now(),
        key: isString(key) ? key : isMessageFunction(format2) ? format2.key : "",
        locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
        format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
        message: ret
      };
      payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
      translateDevTools(payloads);
    }
    return ret;
  }
  function escapeParams(options) {
    if (isArray(options.list)) {
      options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
    } else if (isObject$1(options.named)) {
      Object.keys(options.named).forEach((key) => {
        if (isString(options.named[key])) {
          options.named[key] = escapeHtml(options.named[key]);
        }
      });
    }
  }
  function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages, onWarn } = context;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    let message = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "translate";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(1, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      message = messages[targetLocale] || {};
      let start = null;
      let startTag;
      let endTag;
      if (inBrowser) {
        start = window.performance.now();
        startTag = "intlify-message-resolve-start";
        endTag = "intlify-message-resolve-end";
        mark && mark(startTag);
      }
      if ((format2 = resolveValue(message, key)) === null) {
        format2 = message[key];
      }
      if (inBrowser) {
        const end = window.performance.now();
        const emitter = context.__v_emitter;
        if (emitter && start && format2) {
          emitter.emit("message-resolve", {
            type: "message-resolve",
            key,
            message: format2,
            time: end - start,
            groupId: `${type}:${key}`
          });
        }
        if (startTag && endTag && mark && measure) {
          mark(endTag);
          measure("intlify message resolve", startTag, endTag);
        }
      }
      if (isString(format2) || isFunction(format2))
        break;
      const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
      if (missingRet !== key) {
        format2 = missingRet;
      }
      from = to;
    }
    return [format2, targetLocale, message];
  }
  function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, errorDetector) {
    const { messageCompiler, warnHtmlMessage } = context;
    if (isMessageFunction(format2)) {
      const msg2 = format2;
      msg2.locale = msg2.locale || targetLocale;
      msg2.key = msg2.key || key;
      return msg2;
    }
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-compilation-start";
      endTag = "intlify-message-compilation-end";
      mark && mark(startTag);
    }
    const msg = messageCompiler(format2, getCompileOptions(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, errorDetector));
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-compilation", {
          type: "message-compilation",
          message: format2,
          time: end - start,
          groupId: `${"translate"}:${key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message compilation", startTag, endTag);
      }
    }
    msg.locale = targetLocale;
    msg.key = key;
    msg.source = format2;
    return msg;
  }
  function evaluateMessage(context, msg, msgCtx) {
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-evaluation-start";
      endTag = "intlify-message-evaluation-end";
      mark && mark(startTag);
    }
    const messaged = msg(msgCtx);
    if (inBrowser) {
      const end = window.performance.now();
      const emitter = context.__v_emitter;
      if (emitter && start) {
        emitter.emit("message-evaluation", {
          type: "message-evaluation",
          value: messaged,
          time: end - start,
          groupId: `${"translate"}:${msg.key}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message evaluation", startTag, endTag);
      }
    }
    return messaged;
  }
  function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {};
    if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
    if (isNumber(arg2)) {
      options.plural = arg2;
    } else if (isString(arg2)) {
      options.default = arg2;
    } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
      options.named = arg2;
    } else if (isArray(arg2)) {
      options.list = arg2;
    }
    if (isNumber(arg3)) {
      options.plural = arg3;
    } else if (isString(arg3)) {
      options.default = arg3;
    } else if (isPlainObject(arg3)) {
      assign(options, arg3);
    }
    return [key, options];
  }
  function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
    return {
      warnHtmlMessage,
      onError: (err) => {
        errorDetector && errorDetector(err);
        {
          const message = `Message compilation error: ${err.message}`;
          const codeFrame = err.location && generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
          const emitter = context.__v_emitter;
          if (emitter) {
            emitter.emit("compile-error", {
              message: source,
              error: err.message,
              start: err.location && err.location.start.offset,
              end: err.location && err.location.end.offset,
              groupId: `${"translate"}:${key}`
            });
          }
          console.error(codeFrame ? `${message}
${codeFrame}` : message);
        }
      },
      onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
    };
  }
  function getMessageContextOptions(context, locale, message, options) {
    const { modifiers, pluralRules } = context;
    const resolveMessage = (key) => {
      const val = resolveValue(message, key);
      if (isString(val)) {
        let occurred = false;
        const errorDetector = () => {
          occurred = true;
        };
        const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
        return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
      } else if (isMessageFunction(val)) {
        return val;
      } else {
        return NOOP_MESSAGE_FUNCTION;
      }
    };
    const ctxOptions = {
      locale,
      modifiers,
      pluralRules,
      messages: resolveMessage
    };
    if (context.processor) {
      ctxOptions.processor = context.processor;
    }
    if (options.list) {
      ctxOptions.list = options.list;
    }
    if (options.named) {
      ctxOptions.named = options.named;
    }
    if (isNumber(options.plural)) {
      ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
  }
  const intlDefined = typeof Intl !== "undefined";
  const Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
    numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
  };
  function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __datetimeFormatters } = context;
    if (!Availabilities.dateTimeFormat) {
      onWarn(getWarnMessage$1(
        4
        /* CANNOT_FORMAT_DATE */
      ));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseDateTimeArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.DateTimeFormat(locale).format(value);
    }
    let datetimeFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "datetime format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(5, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      datetimeFormat = datetimeFormats[targetLocale] || {};
      format2 = datetimeFormat[key];
      if (isPlainObject(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
      __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    let value;
    if (isString(arg1)) {
      if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
        throw createCoreError(
          16
          /* INVALID_ISO_DATE_ARGUMENT */
        );
      }
      value = new Date(arg1);
      try {
        value.toISOString();
      } catch (e) {
        throw createCoreError(
          16
          /* INVALID_ISO_DATE_ARGUMENT */
        );
      }
    } else if (isDate(arg1)) {
      if (isNaN(arg1.getTime())) {
        throw createCoreError(
          15
          /* INVALID_DATE_ARGUMENT */
        );
      }
      value = arg1;
    } else if (isNumber(arg1)) {
      value = arg1;
    } else {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearDateTimeFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__datetimeFormatters.has(id)) {
        continue;
      }
      context.__datetimeFormatters.delete(id);
    }
  }
  function number(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __numberFormatters } = context;
    if (!Availabilities.numberFormat) {
      onWarn(getWarnMessage$1(
        2
        /* CANNOT_FORMAT_NUMBER */
      ));
      return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, overrides] = parseNumberArgs(...args);
    const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === "") {
      return new Intl.NumberFormat(locale).format(value);
    }
    let numberFormat = {};
    let targetLocale;
    let format2 = null;
    let from = locale;
    let to = null;
    const type = "number format";
    for (let i = 0; i < locales.length; i++) {
      targetLocale = to = locales[i];
      if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key)) {
        onWarn(getWarnMessage$1(3, {
          key,
          target: targetLocale
        }));
      }
      if (locale !== targetLocale) {
        const emitter = context.__v_emitter;
        if (emitter) {
          emitter.emit("fallback", {
            type,
            key,
            from,
            to,
            groupId: `${type}:${key}`
          });
        }
      }
      numberFormat = numberFormats[targetLocale] || {};
      format2 = numberFormat[key];
      if (isPlainObject(format2))
        break;
      handleMissing(context, key, targetLocale, missingWarn, type);
      from = to;
    }
    if (!isPlainObject(format2) || !isString(targetLocale)) {
      return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(overrides)) {
      id = `${id}__${JSON.stringify(overrides)}`;
    }
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
      formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
      __numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let overrides = {};
    if (!isNumber(arg1)) {
      throw createCoreError(
        14
        /* INVALID_ARGUMENT */
      );
    }
    const value = arg1;
    if (isString(arg2)) {
      options.key = arg2;
    } else if (isPlainObject(arg2)) {
      options = arg2;
    }
    if (isString(arg3)) {
      options.locale = arg3;
    } else if (isPlainObject(arg3)) {
      overrides = arg3;
    }
    if (isPlainObject(arg4)) {
      overrides = arg4;
    }
    return [options.key || "", value, options, overrides];
  }
  function clearNumberFormat(ctx, locale, format2) {
    const context = ctx;
    for (const key in format2) {
      const id = `${locale}__${key}`;
      if (!context.__numberFormatters.has(id)) {
        continue;
      }
      context.__numberFormatters.delete(id);
    }
  }
  /*!
    * @intlify/vue-devtools v9.1.9
    * (c) 2021 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VueDevToolsLabels = {
    [
      "vue-devtools-plugin-vue-i18n"
      /* PLUGIN */
    ]: "Vue I18n devtools",
    [
      "vue-i18n-resource-inspector"
      /* CUSTOM_INSPECTOR */
    ]: "I18n Resources",
    [
      "vue-i18n-timeline"
      /* TIMELINE */
    ]: "Vue I18n"
  };
  const VueDevToolsPlaceholders = {
    [
      "vue-i18n-resource-inspector"
      /* CUSTOM_INSPECTOR */
    ]: "Search for scopes ..."
  };
  const VueDevToolsTimelineColors = {
    [
      "vue-i18n-timeline"
      /* TIMELINE */
    ]: 16764185
  };
  /*!
    * vue-i18n v9.1.9
    * (c) 2022 kazuya kawaguchi
    * Released under the MIT License.
    */
  const VERSION = "9.1.9";
  function initFeatureFlags() {
    let needWarn = false;
    {
      needWarn = true;
    }
    if (needWarn) {
      console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
    }
  }
  const warnMessages = {
    [
      6
      /* FALLBACK_TO_ROOT */
    ]: `Fall back to {type} '{key}' with root locale.`,
    [
      7
      /* NOT_SUPPORTED_PRESERVE */
    ]: `Not supported 'preserve'.`,
    [
      8
      /* NOT_SUPPORTED_FORMATTER */
    ]: `Not supported 'formatter'.`,
    [
      9
      /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
    ]: `Not supported 'preserveDirectiveContent'.`,
    [
      10
      /* NOT_SUPPORTED_GET_CHOICE_INDEX */
    ]: `Not supported 'getChoiceIndex'.`,
    [
      11
      /* COMPONENT_NAME_LEGACY_COMPATIBLE */
    ]: `Component name legacy compatible: '{name}' -> 'i18n'`,
    [
      12
      /* NOT_FOUND_PARENT_SCOPE */
    ]: `Not found parent scope. use the global scope.`
  };
  function getWarnMessage(code, ...args) {
    return format(warnMessages[code], ...args);
  }
  function createI18nError(code, ...args) {
    return createCompileError(code, null, { messages: errorMessages, args });
  }
  const errorMessages = {
    [
      14
      /* UNEXPECTED_RETURN_TYPE */
    ]: "Unexpected return type in composer",
    [
      15
      /* INVALID_ARGUMENT */
    ]: "Invalid argument",
    [
      16
      /* MUST_BE_CALL_SETUP_TOP */
    ]: "Must be called at the top of a `setup` function",
    [
      17
      /* NOT_INSLALLED */
    ]: "Need to install with `app.use` function",
    [
      22
      /* UNEXPECTED_ERROR */
    ]: "Unexpected error",
    [
      18
      /* NOT_AVAILABLE_IN_LEGACY_MODE */
    ]: "Not available in legacy mode",
    [
      19
      /* REQUIRED_VALUE */
    ]: `Required in value: {0}`,
    [
      20
      /* INVALID_VALUE */
    ]: `Invalid value`,
    [
      21
      /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
    ]: `Cannot setup vue-devtools plugin`
  };
  const DEVTOOLS_META = "__INTLIFY_META__";
  const TransrateVNodeSymbol = makeSymbol("__transrateVNode");
  const DatetimePartsSymbol = makeSymbol("__datetimeParts");
  const NumberPartsSymbol = makeSymbol("__numberParts");
  const EnableEmitter = makeSymbol("__enableEmitter");
  const DisableEmitter = makeSymbol("__disableEmitter");
  const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
  const InejctWithOption = makeSymbol("__injectWithOption");
  let composerID = 0;
  function defineCoreMissingHandler(missing) {
    return (ctx, locale, key, type) => {
      return missing(locale, key, vue.getCurrentInstance() || void 0, type);
    };
  }
  function getLocaleMessages(locale, options) {
    const { messages, __i18n } = options;
    const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
    if (isArray(__i18n)) {
      __i18n.forEach(({ locale: locale2, resource }) => {
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      });
    }
    if (options.flatJson) {
      for (const key in ret) {
        if (hasOwn$1(ret, key)) {
          handleFlatJson(ret[key]);
        }
      }
    }
    return ret;
  }
  const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray(val);
  function deepCopy(src, des) {
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
      throw createI18nError(
        20
        /* INVALID_VALUE */
      );
    }
    for (const key in src) {
      if (hasOwn$1(src, key)) {
        if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
          des[key] = src[key];
        } else {
          deepCopy(src[key], des[key]);
        }
      }
    }
  }
  const getMetaInfo = () => {
    const instance = vue.getCurrentInstance();
    return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
  };
  function createComposer(options = {}) {
    const { __root } = options;
    const _isGlobal = __root === void 0;
    let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
    const _locale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : "en-US"
    );
    const _fallbackLocale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
    );
    const _messages = vue.ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = vue.ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
    const _numberFormats = vue.ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
    let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
    let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
    let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    let _fallbackFormat = !!options.fallbackFormat;
    let _missing = isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
    let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
    let _warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
    let _escapeParameter = !!options.escapeParameter;
    const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
    let _pluralRules = options.pluralRules || __root && __root.pluralRules;
    let _context;
    function getCoreContext() {
      return createCoreContext({
        version: VERSION,
        locale: _locale.value,
        fallbackLocale: _fallbackLocale.value,
        messages: _messages.value,
        messageCompiler: function compileToFunction(source) {
          return (ctx) => {
            return ctx.normalize([source]);
          };
        },
        datetimeFormats: _datetimeFormats.value,
        numberFormats: _numberFormats.value,
        modifiers: _modifiers,
        pluralRules: _pluralRules,
        missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
        missingWarn: _missingWarn,
        fallbackWarn: _fallbackWarn,
        fallbackFormat: _fallbackFormat,
        unresolving: true,
        postTranslation: _postTranslation === null ? void 0 : _postTranslation,
        warnHtmlMessage: _warnHtmlMessage,
        escapeParameter: _escapeParameter,
        __datetimeFormatters: isPlainObject(_context) ? _context.__datetimeFormatters : void 0,
        __numberFormatters: isPlainObject(_context) ? _context.__numberFormatters : void 0,
        __v_emitter: isPlainObject(_context) ? _context.__v_emitter : void 0,
        __meta: { framework: "vue" }
      });
    }
    _context = getCoreContext();
    updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    function trackReactivityValues() {
      return [
        _locale.value,
        _fallbackLocale.value,
        _messages.value,
        _datetimeFormats.value,
        _numberFormats.value
      ];
    }
    const locale = vue.computed({
      get: () => _locale.value,
      set: (val) => {
        _locale.value = val;
        _context.locale = _locale.value;
      }
    });
    const fallbackLocale = vue.computed({
      get: () => _fallbackLocale.value,
      set: (val) => {
        _fallbackLocale.value = val;
        _context.fallbackLocale = _fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, val);
      }
    });
    const messages = vue.computed(() => _messages.value);
    const datetimeFormats = vue.computed(() => _datetimeFormats.value);
    const numberFormats = vue.computed(() => _numberFormats.value);
    function getPostTranslationHandler() {
      return isFunction(_postTranslation) ? _postTranslation : null;
    }
    function setPostTranslationHandler(handler) {
      _postTranslation = handler;
      _context.postTranslation = handler;
    }
    function getMissingHandler() {
      return _missing;
    }
    function setMissingHandler(handler) {
      if (handler !== null) {
        _runtimeMissing = defineCoreMissingHandler(handler);
      }
      _missing = handler;
      _context.missing = _runtimeMissing;
    }
    function isResolvedTranslateMessage(type, arg) {
      return type !== "translate" || !!arg.resolvedMessage === false;
    }
    function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
      trackReactivityValues();
      let ret;
      {
        try {
          setAdditionalMeta(getMetaInfo());
          ret = fn(_context);
        } finally {
          setAdditionalMeta(null);
        }
      }
      if (isNumber(ret) && ret === NOT_REOSLVED) {
        const [key, arg2] = argumentParser();
        if (__root && isString(key) && isResolvedTranslateMessage(warnType, arg2)) {
          if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key) || isTranslateMissingWarn(_missingWarn, key))) {
            warn(getWarnMessage(6, {
              key,
              type: warnType
            }));
          }
          {
            const { __v_emitter: emitter } = _context;
            if (emitter && _fallbackRoot) {
              emitter.emit("fallback", {
                type: warnType,
                key,
                to: "global",
                groupId: `${warnType}:${key}`
              });
            }
          }
        }
        return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
      } else if (successCondition(ret)) {
        return ret;
      } else {
        throw createI18nError(
          14
          /* UNEXPECTED_RETURN_TYPE */
        );
      }
    }
    function t(...args) {
      return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root) => root.t(...args), (key) => key, (val) => isString(val));
    }
    function rt(...args) {
      const [arg1, arg2, arg3] = args;
      if (arg3 && !isObject$1(arg3)) {
        throw createI18nError(
          15
          /* INVALID_ARGUMENT */
        );
      }
      return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
    }
    function d(...args) {
      return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root) => root.d(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function n(...args) {
      return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root) => root.n(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
    }
    function normalize(values) {
      return values.map((val) => isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val);
    }
    const interpolate = (val) => val;
    const processor = {
      normalize,
      interpolate,
      type: "vnode"
    };
    function transrateVNode(...args) {
      return wrapWithDeps(
        (context) => {
          let ret;
          const _context2 = context;
          try {
            _context2.processor = processor;
            ret = translate(_context2, ...args);
          } finally {
            _context2.processor = null;
          }
          return ret;
        },
        () => parseTranslateArgs(...args),
        "translate",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[TransrateVNodeSymbol](...args),
        (key) => [vue.createVNode(vue.Text, null, key, 0)],
        (val) => isArray(val)
      );
    }
    function numberParts(...args) {
      return wrapWithDeps(
        (context) => number(context, ...args),
        () => parseNumberArgs(...args),
        "number format",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[NumberPartsSymbol](...args),
        () => [],
        (val) => isString(val) || isArray(val)
      );
    }
    function datetimeParts(...args) {
      return wrapWithDeps(
        (context) => datetime(context, ...args),
        () => parseDateTimeArgs(...args),
        "datetime format",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (root) => root[DatetimePartsSymbol](...args),
        () => [],
        (val) => isString(val) || isArray(val)
      );
    }
    function setPluralRules(rules) {
      _pluralRules = rules;
      _context.pluralRules = _pluralRules;
    }
    function te(key, locale2) {
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      return resolveValue(message, key) !== null;
    }
    function resolveMessages(key) {
      let messages2 = null;
      const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
      for (let i = 0; i < locales.length; i++) {
        const targetLocaleMessages = _messages.value[locales[i]] || {};
        const messageValue = resolveValue(targetLocaleMessages, key);
        if (messageValue != null) {
          messages2 = messageValue;
          break;
        }
      }
      return messages2;
    }
    function tm(key) {
      const messages2 = resolveMessages(key);
      return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
    }
    function getLocaleMessage(locale2) {
      return _messages.value[locale2] || {};
    }
    function setLocaleMessage(locale2, message) {
      _messages.value[locale2] = message;
      _context.messages = _messages.value;
    }
    function mergeLocaleMessage(locale2, message) {
      _messages.value[locale2] = _messages.value[locale2] || {};
      deepCopy(message, _messages.value[locale2]);
      _context.messages = _messages.value;
    }
    function getDateTimeFormat(locale2) {
      return _datetimeFormats.value[locale2] || {};
    }
    function setDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = format2;
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function mergeDateTimeFormat(locale2, format2) {
      _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
      _context.datetimeFormats = _datetimeFormats.value;
      clearDateTimeFormat(_context, locale2, format2);
    }
    function getNumberFormat(locale2) {
      return _numberFormats.value[locale2] || {};
    }
    function setNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = format2;
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    function mergeNumberFormat(locale2, format2) {
      _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
      _context.numberFormats = _numberFormats.value;
      clearNumberFormat(_context, locale2, format2);
    }
    composerID++;
    if (__root) {
      vue.watch(__root.locale, (val) => {
        if (_inheritLocale) {
          _locale.value = val;
          _context.locale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
      vue.watch(__root.fallbackLocale, (val) => {
        if (_inheritLocale) {
          _fallbackLocale.value = val;
          _context.fallbackLocale = val;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      });
    }
    const composer = {
      id: composerID,
      locale,
      fallbackLocale,
      get inheritLocale() {
        return _inheritLocale;
      },
      set inheritLocale(val) {
        _inheritLocale = val;
        if (val && __root) {
          _locale.value = __root.locale.value;
          _fallbackLocale.value = __root.fallbackLocale.value;
          updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
        }
      },
      get availableLocales() {
        return Object.keys(_messages.value).sort();
      },
      messages,
      datetimeFormats,
      numberFormats,
      get modifiers() {
        return _modifiers;
      },
      get pluralRules() {
        return _pluralRules || {};
      },
      get isGlobal() {
        return _isGlobal;
      },
      get missingWarn() {
        return _missingWarn;
      },
      set missingWarn(val) {
        _missingWarn = val;
        _context.missingWarn = _missingWarn;
      },
      get fallbackWarn() {
        return _fallbackWarn;
      },
      set fallbackWarn(val) {
        _fallbackWarn = val;
        _context.fallbackWarn = _fallbackWarn;
      },
      get fallbackRoot() {
        return _fallbackRoot;
      },
      set fallbackRoot(val) {
        _fallbackRoot = val;
      },
      get fallbackFormat() {
        return _fallbackFormat;
      },
      set fallbackFormat(val) {
        _fallbackFormat = val;
        _context.fallbackFormat = _fallbackFormat;
      },
      get warnHtmlMessage() {
        return _warnHtmlMessage;
      },
      set warnHtmlMessage(val) {
        _warnHtmlMessage = val;
        _context.warnHtmlMessage = val;
      },
      get escapeParameter() {
        return _escapeParameter;
      },
      set escapeParameter(val) {
        _escapeParameter = val;
        _context.escapeParameter = val;
      },
      t,
      rt,
      d,
      n,
      te,
      tm,
      getLocaleMessage,
      setLocaleMessage,
      mergeLocaleMessage,
      getDateTimeFormat,
      setDateTimeFormat,
      mergeDateTimeFormat,
      getNumberFormat,
      setNumberFormat,
      mergeNumberFormat,
      getPostTranslationHandler,
      setPostTranslationHandler,
      getMissingHandler,
      setMissingHandler,
      [TransrateVNodeSymbol]: transrateVNode,
      [NumberPartsSymbol]: numberParts,
      [DatetimePartsSymbol]: datetimeParts,
      [SetPluralRulesSymbol]: setPluralRules,
      [InejctWithOption]: options.__injectWithOption
      // eslint-disable-line @typescript-eslint/no-explicit-any
    };
    {
      composer[EnableEmitter] = (emitter) => {
        _context.__v_emitter = emitter;
      };
      composer[DisableEmitter] = () => {
        _context.__v_emitter = void 0;
      };
    }
    return composer;
  }
  function convertComposerOptions(options) {
    const locale = isString(options.locale) ? options.locale : "en-US";
    const fallbackLocale = isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
    const missing = isFunction(options.missing) ? options.missing : void 0;
    const missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
    const fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
    const fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
    const warnHtmlMessage = isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = isBoolean(options.sync) ? options.sync : true;
    if (options.formatter) {
      warn(getWarnMessage(
        8
        /* NOT_SUPPORTED_FORMATTER */
      ));
    }
    if (options.preserveDirectiveContent) {
      warn(getWarnMessage(
        9
        /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
      ));
    }
    let messages = options.messages;
    if (isPlainObject(options.sharedMessages)) {
      const sharedMessages = options.sharedMessages;
      const locales = Object.keys(sharedMessages);
      messages = locales.reduce((messages2, locale2) => {
        const message = messages2[locale2] || (messages2[locale2] = {});
        assign(message, sharedMessages[locale2]);
        return messages2;
      }, messages || {});
    }
    const { __i18n, __root, __injectWithOption } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    const flatJson = options.flatJson;
    return {
      locale,
      fallbackLocale,
      messages,
      flatJson,
      datetimeFormats,
      numberFormats,
      missing,
      missingWarn,
      fallbackWarn,
      fallbackRoot,
      fallbackFormat,
      modifiers,
      pluralRules: pluralizationRules,
      postTranslation,
      warnHtmlMessage,
      escapeParameter,
      inheritLocale,
      __i18n,
      __root,
      __injectWithOption
    };
  }
  function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options));
    const vueI18n = {
      // id
      id: composer.id,
      // locale
      get locale() {
        return composer.locale.value;
      },
      set locale(val) {
        composer.locale.value = val;
      },
      // fallbackLocale
      get fallbackLocale() {
        return composer.fallbackLocale.value;
      },
      set fallbackLocale(val) {
        composer.fallbackLocale.value = val;
      },
      // messages
      get messages() {
        return composer.messages.value;
      },
      // datetimeFormats
      get datetimeFormats() {
        return composer.datetimeFormats.value;
      },
      // numberFormats
      get numberFormats() {
        return composer.numberFormats.value;
      },
      // availableLocales
      get availableLocales() {
        return composer.availableLocales;
      },
      // formatter
      get formatter() {
        warn(getWarnMessage(
          8
          /* NOT_SUPPORTED_FORMATTER */
        ));
        return {
          interpolate() {
            return [];
          }
        };
      },
      set formatter(val) {
        warn(getWarnMessage(
          8
          /* NOT_SUPPORTED_FORMATTER */
        ));
      },
      // missing
      get missing() {
        return composer.getMissingHandler();
      },
      set missing(handler) {
        composer.setMissingHandler(handler);
      },
      // silentTranslationWarn
      get silentTranslationWarn() {
        return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
      },
      set silentTranslationWarn(val) {
        composer.missingWarn = isBoolean(val) ? !val : val;
      },
      // silentFallbackWarn
      get silentFallbackWarn() {
        return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
      },
      set silentFallbackWarn(val) {
        composer.fallbackWarn = isBoolean(val) ? !val : val;
      },
      // modifiers
      get modifiers() {
        return composer.modifiers;
      },
      // formatFallbackMessages
      get formatFallbackMessages() {
        return composer.fallbackFormat;
      },
      set formatFallbackMessages(val) {
        composer.fallbackFormat = val;
      },
      // postTranslation
      get postTranslation() {
        return composer.getPostTranslationHandler();
      },
      set postTranslation(handler) {
        composer.setPostTranslationHandler(handler);
      },
      // sync
      get sync() {
        return composer.inheritLocale;
      },
      set sync(val) {
        composer.inheritLocale = val;
      },
      // warnInHtmlMessage
      get warnHtmlInMessage() {
        return composer.warnHtmlMessage ? "warn" : "off";
      },
      set warnHtmlInMessage(val) {
        composer.warnHtmlMessage = val !== "off";
      },
      // escapeParameterHtml
      get escapeParameterHtml() {
        return composer.escapeParameter;
      },
      set escapeParameterHtml(val) {
        composer.escapeParameter = val;
      },
      // preserveDirectiveContent
      get preserveDirectiveContent() {
        warn(getWarnMessage(
          9
          /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
        ));
        return true;
      },
      set preserveDirectiveContent(val) {
        warn(getWarnMessage(
          9
          /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
        ));
      },
      // pluralizationRules
      get pluralizationRules() {
        return composer.pluralRules || {};
      },
      // for internal
      __composer: composer,
      // t
      t(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = {};
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(
            15
            /* INVALID_ARGUMENT */
          );
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      rt(...args) {
        return composer.rt(...args);
      },
      // tc
      tc(...args) {
        const [arg1, arg2, arg3] = args;
        const options2 = { plural: 1 };
        let list = null;
        let named = null;
        if (!isString(arg1)) {
          throw createI18nError(
            15
            /* INVALID_ARGUMENT */
          );
        }
        const key = arg1;
        if (isString(arg2)) {
          options2.locale = arg2;
        } else if (isNumber(arg2)) {
          options2.plural = arg2;
        } else if (isArray(arg2)) {
          list = arg2;
        } else if (isPlainObject(arg2)) {
          named = arg2;
        }
        if (isString(arg3)) {
          options2.locale = arg3;
        } else if (isArray(arg3)) {
          list = arg3;
        } else if (isPlainObject(arg3)) {
          named = arg3;
        }
        return composer.t(key, list || named || {}, options2);
      },
      // te
      te(key, locale) {
        return composer.te(key, locale);
      },
      // tm
      tm(key) {
        return composer.tm(key);
      },
      // getLocaleMessage
      getLocaleMessage(locale) {
        return composer.getLocaleMessage(locale);
      },
      // setLocaleMessage
      setLocaleMessage(locale, message) {
        composer.setLocaleMessage(locale, message);
      },
      // mergeLocaleMessage
      mergeLocaleMessage(locale, message) {
        composer.mergeLocaleMessage(locale, message);
      },
      // d
      d(...args) {
        return composer.d(...args);
      },
      // getDateTimeFormat
      getDateTimeFormat(locale) {
        return composer.getDateTimeFormat(locale);
      },
      // setDateTimeFormat
      setDateTimeFormat(locale, format2) {
        composer.setDateTimeFormat(locale, format2);
      },
      // mergeDateTimeFormat
      mergeDateTimeFormat(locale, format2) {
        composer.mergeDateTimeFormat(locale, format2);
      },
      // n
      n(...args) {
        return composer.n(...args);
      },
      // getNumberFormat
      getNumberFormat(locale) {
        return composer.getNumberFormat(locale);
      },
      // setNumberFormat
      setNumberFormat(locale, format2) {
        composer.setNumberFormat(locale, format2);
      },
      // mergeNumberFormat
      mergeNumberFormat(locale, format2) {
        composer.mergeNumberFormat(locale, format2);
      },
      // getChoiceIndex
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getChoiceIndex(choice, choicesLength) {
        warn(getWarnMessage(
          10
          /* NOT_SUPPORTED_GET_CHOICE_INDEX */
        ));
        return -1;
      },
      // for internal
      __onComponentInstanceCreated(target) {
        const { componentInstanceCreatedListener } = options;
        if (componentInstanceCreatedListener) {
          componentInstanceCreatedListener(target, vueI18n);
        }
      }
    };
    {
      vueI18n.__enableEmitter = (emitter) => {
        const __composer = composer;
        __composer[EnableEmitter] && __composer[EnableEmitter](emitter);
      };
      vueI18n.__disableEmitter = () => {
        const __composer = composer;
        __composer[DisableEmitter] && __composer[DisableEmitter]();
      };
    }
    return vueI18n;
  }
  const baseFormatProps = {
    tag: {
      type: [String, Object]
    },
    locale: {
      type: String
    },
    scope: {
      type: String,
      validator: (val) => val === "parent" || val === "global",
      default: "parent"
    },
    i18n: {
      type: Object
    }
  };
  const Translation = {
    /* eslint-disable */
    name: "i18n-t",
    props: assign({
      keypath: {
        type: String,
        required: true
      },
      plural: {
        type: [Number, String],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validator: (val) => isNumber(val) || !isNaN(val)
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const { slots, attrs } = context;
      const i18n = props.i18n || useI18n({
        useScope: props.scope,
        __useComponent: true
      });
      const keys = Object.keys(slots).filter((key) => key !== "_");
      return () => {
        const options = {};
        if (props.locale) {
          options.locale = props.locale;
        }
        if (props.plural !== void 0) {
          options.plural = isString(props.plural) ? +props.plural : props.plural;
        }
        const arg = getInterpolateArg(context, keys);
        const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
        const assignedAttrs = assign({}, attrs);
        return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$1(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
      };
    }
  };
  function getInterpolateArg({ slots }, keys) {
    if (keys.length === 1 && keys[0] === "default") {
      return slots.default ? slots.default() : [];
    } else {
      return keys.reduce((arg, key) => {
        const slot = slots[key];
        if (slot) {
          arg[key] = slot();
        }
        return arg;
      }, {});
    }
  }
  function renderFormatter(props, context, slotKeys, partFormatter) {
    const { slots, attrs } = context;
    return () => {
      const options = { part: true };
      let overrides = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (isString(props.format)) {
        options.key = props.format;
      } else if (isObject$1(props.format)) {
        if (isString(props.format.key)) {
          options.key = props.format.key;
        }
        overrides = Object.keys(props.format).reduce((options2, prop) => {
          return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
        }, {});
      }
      const parts = partFormatter(...[props.value, options, overrides]);
      let children = [options.key];
      if (isArray(parts)) {
        children = parts.map((part, index) => {
          const slot = slots[part.type];
          return slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        });
      } else if (isString(parts)) {
        children = [parts];
      }
      const assignedAttrs = assign({}, attrs);
      return isString(props.tag) ? vue.h(props.tag, assignedAttrs, children) : isObject$1(props.tag) ? vue.h(props.tag, assignedAttrs, children) : vue.h(vue.Fragment, assignedAttrs, children);
    };
  }
  const NUMBER_FORMAT_KEYS = [
    "localeMatcher",
    "style",
    "unit",
    "unitDisplay",
    "currency",
    "currencyDisplay",
    "useGrouping",
    "numberingSystem",
    "minimumIntegerDigits",
    "minimumFractionDigits",
    "maximumFractionDigits",
    "minimumSignificantDigits",
    "maximumSignificantDigits",
    "notation",
    "formatMatcher"
  ];
  const NumberFormat = {
    /* eslint-disable */
    name: "i18n-n",
    props: assign({
      value: {
        type: Number,
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n[NumberPartsSymbol](...args)
      ));
    }
  };
  const DATETIME_FORMAT_KEYS = [
    "dateStyle",
    "timeStyle",
    "fractionalSecondDigits",
    "calendar",
    "dayPeriod",
    "numberingSystem",
    "localeMatcher",
    "timeZone",
    "hour12",
    "hourCycle",
    "formatMatcher",
    "weekday",
    "era",
    "year",
    "month",
    "day",
    "hour",
    "minute",
    "second",
    "timeZoneName"
  ];
  const DatetimeFormat = {
    /* eslint-disable */
    name: "i18n-d",
    props: assign({
      value: {
        type: [Number, Date],
        required: true
      },
      format: {
        type: [String, Object]
      }
    }, baseFormatProps),
    /* eslint-enable */
    setup(props, context) {
      const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
      return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n[DatetimePartsSymbol](...args)
      ));
    }
  };
  function getComposer$2(i18n, instance) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      return i18nInternal.__getInstance(instance) || i18n.global;
    } else {
      const vueI18n = i18nInternal.__getInstance(instance);
      return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
    }
  }
  function vTDirective(i18n) {
    const bind = (el, { instance, value, modifiers }) => {
      if (!instance || !instance.$) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const composer = getComposer$2(i18n, instance.$);
      if (modifiers.preserve) {
        warn(getWarnMessage(
          7
          /* NOT_SUPPORTED_PRESERVE */
        ));
      }
      const parsedValue = parseValue(value);
      el.textContent = composer.t(...makeParams(parsedValue));
    };
    return {
      beforeMount: bind,
      beforeUpdate: bind
    };
  }
  function parseValue(value) {
    if (isString(value)) {
      return { path: value };
    } else if (isPlainObject(value)) {
      if (!("path" in value)) {
        throw createI18nError(19, "path");
      }
      return value;
    } else {
      throw createI18nError(
        20
        /* INVALID_VALUE */
      );
    }
  }
  function makeParams(value) {
    const { path, locale, args, choice, plural } = value;
    const options = {};
    const named = args || {};
    if (isString(locale)) {
      options.locale = locale;
    }
    if (isNumber(choice)) {
      options.plural = choice;
    }
    if (isNumber(plural)) {
      options.plural = plural;
    }
    return [path, named, options];
  }
  function apply(app, i18n, ...options) {
    const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
    if (globalInstall && useI18nComponentName) {
      warn(getWarnMessage(11, {
        name: Translation.name
      }));
    }
    if (globalInstall) {
      app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
      app.component(NumberFormat.name, NumberFormat);
      app.component(DatetimeFormat.name, DatetimeFormat);
    }
    app.directive("t", vTDirective(i18n));
  }
  const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
  let devtoolsApi;
  function enableDevTools(app, i18n) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        try {
          setupDevtoolsPlugin({
            id: "vue-devtools-plugin-vue-i18n",
            label: VueDevToolsLabels[
              "vue-devtools-plugin-vue-i18n"
              /* PLUGIN */
            ],
            packageName: "vue-i18n",
            homepage: "https://vue-i18n.intlify.dev",
            logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
            componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
            app
          }, (api) => {
            devtoolsApi = api;
            api.on.visitComponentTree(({ componentInstance, treeNode }) => {
              updateComponentTreeTags(componentInstance, treeNode, i18n);
            });
            api.on.inspectComponent(({ componentInstance, instanceData }) => {
              if (componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
                if (i18n.mode === "legacy") {
                  if (componentInstance.vnode.el.__VUE_I18N__ !== i18n.global.__composer) {
                    inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                  }
                } else {
                  inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                }
              }
            });
            api.addInspector({
              id: "vue-i18n-resource-inspector",
              label: VueDevToolsLabels[
                "vue-i18n-resource-inspector"
                /* CUSTOM_INSPECTOR */
              ],
              icon: "language",
              treeFilterPlaceholder: VueDevToolsPlaceholders[
                "vue-i18n-resource-inspector"
                /* CUSTOM_INSPECTOR */
              ]
            });
            api.on.getInspectorTree((payload) => {
              if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
                registerScope(payload, i18n);
              }
            });
            api.on.getInspectorState((payload) => {
              if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
                inspectScope(payload, i18n);
              }
            });
            api.on.editInspectorState((payload) => {
              if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
                editScope(payload, i18n);
              }
            });
            api.addTimelineLayer({
              id: "vue-i18n-timeline",
              label: VueDevToolsLabels[
                "vue-i18n-timeline"
                /* TIMELINE */
              ],
              color: VueDevToolsTimelineColors[
                "vue-i18n-timeline"
                /* TIMELINE */
              ]
            });
            resolve(true);
          });
        } catch (e) {
          console.error(e);
          reject(false);
        }
      });
    });
  }
  function updateComponentTreeTags(instance, treeNode, i18n) {
    const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    if (instance && instance.vnode.el.__VUE_I18N__) {
      if (instance.vnode.el.__VUE_I18N__ !== global2) {
        const label = instance.type.name || instance.type.displayName || instance.type.__file;
        const tag = {
          label: `i18n (${label} Scope)`,
          textColor: 0,
          backgroundColor: 16764185
        };
        treeNode.tags.push(tag);
      }
    }
  }
  function inspectComposer(instanceData, composer) {
    const type = VUE_I18N_COMPONENT_TYPES;
    instanceData.state.push({
      type,
      key: "locale",
      editable: true,
      value: composer.locale.value
    });
    instanceData.state.push({
      type,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    });
    instanceData.state.push({
      type,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    });
    instanceData.state.push({
      type,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    });
    instanceData.state.push({
      type,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    });
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
  function getLocaleMessageValue(messages) {
    const value = {};
    Object.keys(messages).forEach((key) => {
      const v = messages[key];
      if (isFunction(v) && "source" in v) {
        value[key] = getMessageFunctionDetails(v);
      } else if (isObject$1(v)) {
        value[key] = getLocaleMessageValue(v);
      } else {
        value[key] = v;
      }
    });
    return value;
  }
  const ESC = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "&": "&amp;"
  };
  function escape(s) {
    return s.replace(/[<>"&]/g, escapeChar);
  }
  function escapeChar(a) {
    return ESC[a] || a;
  }
  function getMessageFunctionDetails(func) {
    const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
    return {
      _custom: {
        type: "function",
        display: `<span>ƒ</span> ${argString}`
      }
    };
  }
  function registerScope(payload, i18n) {
    payload.rootNodes.push({
      id: "global",
      label: "Global Scope"
    });
    const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    for (const [keyInstance, instance] of i18n.__instances) {
      const composer = i18n.mode === "composition" ? instance : instance.__composer;
      if (global2 === composer) {
        continue;
      }
      const label = keyInstance.type.name || keyInstance.type.displayName || keyInstance.type.__file;
      payload.rootNodes.push({
        id: composer.id.toString(),
        label: `${label} Scope`
      });
    }
  }
  function getComposer$1(nodeId, i18n) {
    if (nodeId === "global") {
      return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    } else {
      const instance = Array.from(i18n.__instances.values()).find((item) => item.id.toString() === nodeId);
      if (instance) {
        return i18n.mode === "composition" ? instance : instance.__composer;
      } else {
        return null;
      }
    }
  }
  function inspectScope(payload, i18n) {
    const composer = getComposer$1(payload.nodeId, i18n);
    if (composer) {
      payload.state = makeScopeInspectState(composer);
    }
  }
  function makeScopeInspectState(composer) {
    const state = {};
    const localeType = "Locale related info";
    const localeStates = [
      {
        type: localeType,
        key: "locale",
        editable: true,
        value: composer.locale.value
      },
      {
        type: localeType,
        key: "fallbackLocale",
        editable: true,
        value: composer.fallbackLocale.value
      },
      {
        type: localeType,
        key: "availableLocales",
        editable: false,
        value: composer.availableLocales
      },
      {
        type: localeType,
        key: "inheritLocale",
        editable: true,
        value: composer.inheritLocale
      }
    ];
    state[localeType] = localeStates;
    const localeMessagesType = "Locale messages info";
    const localeMessagesStates = [
      {
        type: localeMessagesType,
        key: "messages",
        editable: false,
        value: getLocaleMessageValue(composer.messages.value)
      }
    ];
    state[localeMessagesType] = localeMessagesStates;
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
    return state;
  }
  function addTimelineEvent(event, payload) {
    if (devtoolsApi) {
      let groupId;
      if (payload && "groupId" in payload) {
        groupId = payload.groupId;
        delete payload.groupId;
      }
      devtoolsApi.addTimelineEvent({
        layerId: "vue-i18n-timeline",
        event: {
          title: event,
          groupId,
          time: Date.now(),
          meta: {},
          data: payload || {},
          logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
        }
      });
    }
  }
  function editScope(payload, i18n) {
    const composer = getComposer$1(payload.nodeId, i18n);
    if (composer) {
      const [field] = payload.path;
      if (field === "locale" && isString(payload.state.value)) {
        composer.locale.value = payload.state.value;
      } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray(payload.state.value) || isObject$1(payload.state.value))) {
        composer.fallbackLocale.value = payload.state.value;
      } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
        composer.inheritLocale = payload.state.value;
      }
    }
  }
  function defineMixin(vuei18n, composer, i18n) {
    return {
      beforeCreate() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(
            22
            /* UNEXPECTED_ERROR */
          );
        }
        const options = this.$options;
        if (options.i18n) {
          const optionsI18n = options.i18n;
          if (options.__i18n) {
            optionsI18n.__i18n = options.__i18n;
          }
          optionsI18n.__root = composer;
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, optionsI18n);
          } else {
            optionsI18n.__injectWithOption = true;
            this.$i18n = createVueI18n(optionsI18n);
          }
        } else if (options.__i18n) {
          if (this === this.$root) {
            this.$i18n = mergeToRoot(vuei18n, options);
          } else {
            this.$i18n = createVueI18n({
              __i18n: options.__i18n,
              __injectWithOption: true,
              __root: composer
            });
          }
        } else {
          this.$i18n = vuei18n;
        }
        vuei18n.__onComponentInstanceCreated(this.$i18n);
        i18n.__setInstance(instance, this.$i18n);
        this.$t = (...args) => this.$i18n.t(...args);
        this.$rt = (...args) => this.$i18n.rt(...args);
        this.$tc = (...args) => this.$i18n.tc(...args);
        this.$te = (key, locale) => this.$i18n.te(key, locale);
        this.$d = (...args) => this.$i18n.d(...args);
        this.$n = (...args) => this.$i18n.n(...args);
        this.$tm = (key) => this.$i18n.tm(key);
      },
      mounted() {
        {
          this.$el.__VUE_I18N__ = this.$i18n.__composer;
          const emitter = this.__v_emitter = createEmitter();
          const _vueI18n = this.$i18n;
          _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
          emitter.on("*", addTimelineEvent);
        }
      },
      beforeUnmount() {
        const instance = vue.getCurrentInstance();
        if (!instance) {
          throw createI18nError(
            22
            /* UNEXPECTED_ERROR */
          );
        }
        {
          if (this.__v_emitter) {
            this.__v_emitter.off("*", addTimelineEvent);
            delete this.__v_emitter;
          }
          const _vueI18n = this.$i18n;
          _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
          delete this.$el.__VUE_I18N__;
        }
        delete this.$t;
        delete this.$rt;
        delete this.$tc;
        delete this.$te;
        delete this.$d;
        delete this.$n;
        delete this.$tm;
        i18n.__deleteInstance(instance);
        delete this.$i18n;
      }
    };
  }
  function mergeToRoot(root, options) {
    root.locale = options.locale || root.locale;
    root.fallbackLocale = options.fallbackLocale || root.fallbackLocale;
    root.missing = options.missing || root.missing;
    root.silentTranslationWarn = options.silentTranslationWarn || root.silentFallbackWarn;
    root.silentFallbackWarn = options.silentFallbackWarn || root.silentFallbackWarn;
    root.formatFallbackMessages = options.formatFallbackMessages || root.formatFallbackMessages;
    root.postTranslation = options.postTranslation || root.postTranslation;
    root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
    root.escapeParameterHtml = options.escapeParameterHtml || root.escapeParameterHtml;
    root.sync = options.sync || root.sync;
    root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
    const messages = getLocaleMessages(root.locale, {
      messages: options.messages,
      __i18n: options.__i18n
    });
    Object.keys(messages).forEach((locale) => root.mergeLocaleMessage(locale, messages[locale]));
    if (options.datetimeFormats) {
      Object.keys(options.datetimeFormats).forEach((locale) => root.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
    }
    if (options.numberFormats) {
      Object.keys(options.numberFormats).forEach((locale) => root.mergeNumberFormat(locale, options.numberFormats[locale]));
    }
    return root;
  }
  function createI18n(options = {}) {
    const __legacyMode = isBoolean(options.legacy) ? options.legacy : true;
    const __globalInjection = !!options.globalInjection;
    const __instances = /* @__PURE__ */ new Map();
    const __global = __legacyMode ? createVueI18n(options) : createComposer(options);
    const symbol = makeSymbol("vue-i18n");
    const i18n = {
      // mode
      get mode() {
        return __legacyMode ? "legacy" : "composition";
      },
      // install plugin
      install(app, ...options2) {
        return __async(this, null, function* () {
          {
            app.__VUE_I18N__ = i18n;
          }
          app.__VUE_I18N_SYMBOL__ = symbol;
          app.provide(app.__VUE_I18N_SYMBOL__, i18n);
          if (!__legacyMode && __globalInjection) {
            injectGlobalFields(app, i18n.global);
          }
          {
            apply(app, i18n, ...options2);
          }
          if (__legacyMode) {
            app.mixin(defineMixin(__global, __global.__composer, i18n));
          }
          {
            const ret = yield enableDevTools(app, i18n);
            if (!ret) {
              throw createI18nError(
                21
                /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
              );
            }
            const emitter = createEmitter();
            if (__legacyMode) {
              const _vueI18n = __global;
              _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
            } else {
              const _composer = __global;
              _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
            }
            emitter.on("*", addTimelineEvent);
          }
        });
      },
      // global accessor
      get global() {
        return __global;
      },
      // @internal
      __instances,
      // @internal
      __getInstance(component) {
        return __instances.get(component) || null;
      },
      // @internal
      __setInstance(component, instance) {
        __instances.set(component, instance);
      },
      // @internal
      __deleteInstance(component) {
        __instances.delete(component);
      }
    };
    return i18n;
  }
  function useI18n(options = {}) {
    const instance = vue.getCurrentInstance();
    if (instance == null) {
      throw createI18nError(
        16
        /* MUST_BE_CALL_SETUP_TOP */
      );
    }
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
      throw createI18nError(
        17
        /* NOT_INSLALLED */
      );
    }
    const i18n = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
    if (!i18n) {
      throw createI18nError(
        22
        /* UNEXPECTED_ERROR */
      );
    }
    const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
    const scope = isEmptyObject(options) ? "__i18n" in instance.type ? "local" : "global" : !options.useScope ? "local" : options.useScope;
    if (scope === "global") {
      let messages = isObject$1(options.messages) ? options.messages : {};
      if ("__i18nGlobal" in instance.type) {
        messages = getLocaleMessages(global2.locale.value, {
          messages,
          __i18n: instance.type.__i18nGlobal
        });
      }
      const locales = Object.keys(messages);
      if (locales.length) {
        locales.forEach((locale) => {
          global2.mergeLocaleMessage(locale, messages[locale]);
        });
      }
      if (isObject$1(options.datetimeFormats)) {
        const locales2 = Object.keys(options.datetimeFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
          });
        }
      }
      if (isObject$1(options.numberFormats)) {
        const locales2 = Object.keys(options.numberFormats);
        if (locales2.length) {
          locales2.forEach((locale) => {
            global2.mergeNumberFormat(locale, options.numberFormats[locale]);
          });
        }
      }
      return global2;
    }
    if (scope === "parent") {
      let composer2 = getComposer(i18n, instance, options.__useComponent);
      if (composer2 == null) {
        {
          warn(getWarnMessage(
            12
            /* NOT_FOUND_PARENT_SCOPE */
          ));
        }
        composer2 = global2;
      }
      return composer2;
    }
    if (i18n.mode === "legacy") {
      throw createI18nError(
        18
        /* NOT_AVAILABLE_IN_LEGACY_MODE */
      );
    }
    const i18nInternal = i18n;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
      const type = instance.type;
      const composerOptions = assign({}, options);
      if (type.__i18n) {
        composerOptions.__i18n = type.__i18n;
      }
      if (global2) {
        composerOptions.__root = global2;
      }
      composer = createComposer(composerOptions);
      setupLifeCycle(i18nInternal, instance, composer);
      i18nInternal.__setInstance(instance, composer);
    }
    return composer;
  }
  function getComposer(i18n, target, useComponent = false) {
    let composer = null;
    const root = target.root;
    let current = target.parent;
    while (current != null) {
      const i18nInternal = i18n;
      if (i18n.mode === "composition") {
        composer = i18nInternal.__getInstance(current);
      } else {
        const vueI18n = i18nInternal.__getInstance(current);
        if (vueI18n != null) {
          composer = vueI18n.__composer;
        }
        if (useComponent && composer && !composer[InejctWithOption]) {
          composer = null;
        }
      }
      if (composer != null) {
        break;
      }
      if (root === current) {
        break;
      }
      current = current.parent;
    }
    return composer;
  }
  function setupLifeCycle(i18n, target, composer) {
    let emitter = null;
    vue.onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    vue.onUnmounted(() => {
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        const _composer = composer;
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n.__deleteInstance(target);
    }, target);
  }
  const globalExportProps = [
    "locale",
    "fallbackLocale",
    "availableLocales"
  ];
  const globalExportMethods = ["t", "rt", "d", "n", "tm"];
  function injectGlobalFields(app, composer) {
    const i18n = /* @__PURE__ */ Object.create(null);
    globalExportProps.forEach((prop) => {
      const desc = Object.getOwnPropertyDescriptor(composer, prop);
      if (!desc) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const wrap = vue.isRef(desc.value) ? {
        get() {
          return desc.value.value;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        set(val) {
          desc.value.value = val;
        }
      } : {
        get() {
          return desc.get && desc.get();
        }
      };
      Object.defineProperty(i18n, prop, wrap);
    });
    app.config.globalProperties.$i18n = i18n;
    globalExportMethods.forEach((method) => {
      const desc = Object.getOwnPropertyDescriptor(composer, method);
      if (!desc || !desc.value) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
    });
  }
  {
    initFeatureFlags();
  }
  {
    const target = getGlobalThis();
    target.__INTLIFY__ = true;
    setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
  }
  const language = function(key) {
    const messages = {
      en,
      "zh-Hans": zhHans
    };
    let i18nConfig = {
      locale: uni.getLocale(),
      // 获取已设置的语言
      messages
    };
    const i18n = createI18n(i18nConfig);
    return i18n.global.t(key);
  };
  const languageByGlobal = function() {
    const messages = {
      en,
      "zh-Hans": zhHans
    };
    let i18nConfig = {
      locale: uni.getLocale(),
      // 获取已设置的语言
      messages
    };
    const i18n = createI18n(i18nConfig);
    return i18n;
  };
  const easycom = {
    autoscan: true,
    custom: {
      "^tm-(.*)": "@/tmui/components/tm-$1/tm-$1.vue",
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
    }
  };
  const pages$1 = [
    {
      path: "pages/login/index",
      style: {
        navigationBarTitleText: "登录",
        backgroundColor: "#5555ff",
        "app-plus": {
          bounce: "none"
        }
      }
    },
    {
      path: "pages/profile/index",
      style: {
        navigationBarTitleText: "我的",
        backgroundColor: "#5555ff"
      }
    },
    {
      path: "pages/tableSelect/index",
      style: {
        navigationBarTitleText: "表单选择",
        "app-plus": {
          bounce: "none"
        }
      }
    },
    {
      path: "pages/recordsManage/index",
      style: {
        navigationBarTitleText: "记录表",
        "app-plus": {
          bounce: "none"
        }
      }
    },
    {
      path: "pages/dbTest/index",
      style: {
        navigationBarTitleText: "数据库",
        "app-plus": {
          bounce: "none"
        }
      }
    },
    {
      path: "pages/commonTest/index",
      style: {
        navigationBarTitleText: "通用测试",
        "app-plus": {
          bounce: "none"
        }
      }
    }
  ];
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#55aaff",
    backgroundColor: "#5555ff",
    pageOrientation: "auto"
  };
  const condition = {
    current: 0,
    list: [
      {
        name: "",
        path: "",
        query: ""
      }
    ]
  };
  const tabBar$1 = {
    color: "#7A7E83",
    selectedColor: "#007AFF",
    borderStyle: "black",
    backgroundColor: "#FFFFFF",
    list: [
      {
        pagePath: "pages/login/index",
        iconPath: "static/tabbar/list.png",
        selectedIconPath: "static/tabbar/list_active.png",
        text: "登录"
      },
      {
        pagePath: "pages/profile/index",
        iconPath: "static/tabbar/me.png",
        selectedIconPath: "static/tabbar/me_active.png",
        text: "我的"
      }
    ]
  };
  const PageJsonInit = {
    easycom,
    pages: pages$1,
    globalStyle,
    condition,
    tabBar: tabBar$1
  };
  const useTmRouterBefore = (arg) => {
  };
  const useTmRouterAfter = (arg) => {
  };
  const tmuiconfigdefault = {
    autoDark: false,
    theme: {},
    /** 开启全局分离功能，默认关闭 */
    shareDisable: true,
    themeConfig: {
      theme: {},
      globalFontSizeRatio: 1,
      /** 是否关闭弹层背景的模糊 */
      overflowBlur: false,
      dark: {
        /**一般的卡片项目暗黑背景 */
        cardcolor: "#0A0A0B",
        /**输入框，表单等暗黑背景 */
        inputcolor: "#111112",
        /**禁用输入框，表单等暗黑背景 */
        disablecolor: "rgba(30, 30, 30, 1.0)",
        /**暗黑下的页面背景 */
        bodycolor: "rgb(5, 5, 5)",
        /**文本禁用色. */
        textDisableColor: "rgba(100, 100, 100, 1.0)"
      },
      component: {
        button: {
          round: 2,
          shadow: 2
        }
      }
    },
    router: { useTmRouterAfter, useTmRouterBefore },
    custom: {}
  };
  let pages = [];
  if (typeof (PageJsonInit == null ? void 0 : PageJsonInit.pages) == "undefined") {
    PageJsonInit.pages = [];
  }
  PageJsonInit.pages.forEach((el) => {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i, _j;
    let customType = (_b2 = (_a2 = el == null ? void 0 : el.style) == null ? void 0 : _a2.navigationStyle) != null ? _b2 : "default";
    let bg = ((_f2 = (_e2 = (_c2 = el.style) == null ? void 0 : _c2.navigationBarBackgroundColor) != null ? _e2 : (_d2 = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _d2.navigationBarBackgroundColor) != null ? _f2 : "#FFFFFF") || "#FFFFFF";
    let txtColor = ((_j = (_i = (_g2 = el.style) == null ? void 0 : _g2.navigationBarTextStyle) != null ? _i : (_h2 = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _h2.navigationBarTextStyle) != null ? _j : "black") || "black";
    pages.push({
      path: el.path,
      custom: customType,
      navigationBarBackgroundColor: bg,
      navigationBarTextStyle: txtColor
    });
  });
  if (Array.isArray((_e = PageJsonInit == null ? void 0 : PageJsonInit.subPackages) != null ? _e : null)) {
    PageJsonInit == null ? void 0 : PageJsonInit.subPackages.forEach((el) => {
      let rootPath = el.root;
      el.pages.forEach((el2) => {
        var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i, _j;
        let elany = el2;
        let bg = ((_d2 = (_c2 = (_a2 = el2.style) == null ? void 0 : _a2.navigationBarBackgroundColor) != null ? _c2 : (_b2 = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _b2.navigationBarBackgroundColor) != null ? _d2 : "#FFFFFF") || "#FFFFFF";
        let txtColor = ((_h2 = (_g2 = (_e2 = el2.style) == null ? void 0 : _e2.navigationBarTextStyle) != null ? _g2 : (_f2 = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _f2.navigationBarTextStyle) != null ? _h2 : "black") || "black";
        pages.push({
          path: rootPath + "/" + elany.path,
          custom: (_j = (_i = elany == null ? void 0 : elany.style) == null ? void 0 : _i.navigationStyle) != null ? _j : "default",
          navigationBarBackgroundColor: bg,
          navigationBarTextStyle: txtColor
        });
      });
    });
  }
  let pagers = PageJsonInit;
  let tabBar = (_f = pagers == null ? void 0 : pagers.tabBar) != null ? _f : {
    color: "",
    selectedColor: "",
    borderStyle: "",
    backgroundColor: "",
    list: []
  };
  let cusutomIconList = [];
  cusutomIconList = fontJson;
  let $tm = {
    tabBar,
    pages,
    globalNavStyle: (_g = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle.navigationStyle) != null ? _g : "",
    isOpenDarkModel: ((_h = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _h.navigationBarBackgroundColor).indexOf("@") > -1,
    isColor: (color) => {
      const reg1 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      const reg2 = /^(rgb|RGB|rgba|RGBA)/;
      return reg1.test(color) || reg2.test(color);
    },
    /**tmui3.0工具函数 */
    u: __spreadProps(__spreadValues({}, util), { preview }),
    /**tmui3.0国际化语言辅助函数 */
    language,
    fetch: fetchNet,
    tmicon: [
      {
        font: "tmicon",
        prefix: "tmicon-",
        fontJson: cusutomIconList
      }
    ],
    config: tmuiconfigdefault
  };
  const tmui = {
    /**
     * tmui3.0
     * @param app Vue
     * @param options tmui3.0配置
     */
    install: (app, options = {}) => {
      uni.addInterceptor("navigateTo", {
        invoke(result) {
          vue.nextTick(() => {
            linsInko({
              path: result.url,
              context: null,
              openType: "navigateTo"
            });
          });
        },
        success(result) {
        }
      });
      uni.addInterceptor("redirectTo", {
        success(result) {
          var _a2, _b2, _c2;
          let pages2 = getCurrentPages().pop();
          let path = (_a2 = pages2 == null ? void 0 : pages2.route) != null ? _a2 : "";
          let msg = (_b2 = result.errMsg) != null ? _b2 : "";
          let opentype = (_c2 = msg.split(":")[0]) != null ? _c2 : "";
          linsInko({
            path,
            context: null,
            openType: opentype
          });
        }
      });
      uni.addInterceptor("reLaunch", {
        success(result) {
          var _a2, _b2, _c2;
          let pages2 = getCurrentPages().pop();
          let path = (_a2 = pages2 == null ? void 0 : pages2.route) != null ? _a2 : "";
          let msg = (_b2 = result.errMsg) != null ? _b2 : "";
          let opentype = (_c2 = msg.split(":")[0]) != null ? _c2 : "";
          linsInko({
            path,
            context: null,
            openType: opentype
          });
        }
      });
      uni.addInterceptor("navigateBack", {
        invoke(result) {
          vue.nextTick(() => {
            var _a2, _b2, _c2;
            let pages2 = getCurrentPages().pop();
            let path = (_a2 = pages2 == null ? void 0 : pages2.route) != null ? _a2 : "";
            let msg = (_b2 = result.errMsg) != null ? _b2 : "";
            (_c2 = msg.split(":")[0]) != null ? _c2 : "";
            linsInko({
              path,
              context: null,
              openType: "navigateBack"
            });
          });
        },
        success(result) {
        }
      });
      function linsInko(obj) {
        var _a2, _b2;
        obj.path = obj.path[0] == "/" ? obj.path.substr(1) : obj.path;
        ((_a2 = options.router) == null ? void 0 : _a2.useTmRouterBefore) ? (_b2 = options.router) == null ? void 0 : _b2.useTmRouterBefore(obj) : useTmRouterBefore();
      }
      options = deepObjectMerge($tm.config, options);
      const pinia = app.config.globalProperties.$pinia || null;
      const tmPiniaPlugin = (context) => {
        if (context.store.$id === "tmpinia") {
          context.store.tmuiConfig = options;
          context.store.$state.tmuiConfig = options;
        }
      };
      if (pinia) {
        pinia.use(tmPiniaPlugin);
      } else {
        const pinia2 = createPinia();
        pinia2.use(tmPiniaPlugin);
        app.use(pinia2);
      }
      app.use(languageByGlobal());
      let appconfig = {};
      app.mixin(__spreadValues({}, appconfig));
      $tm = __spreadProps(__spreadValues({}, $tm), {
        config: options
      });
      uni.$tm = $tm;
      uni.setStorageSync("$tm", JSON.stringify($tm.config.theme));
      app.config.globalProperties.tm = $tm;
    }
  };
  const _sfc_main = {
    onLaunch() {
      setStartWide(uni.getSystemInfoSync().windowWidth > 768);
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return null;
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/hanaabi/Weighbridge/playground/gcsjlr/Vault/src/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(tmui, { shareDisable: false });
    return {
      app,
      Pinia
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
