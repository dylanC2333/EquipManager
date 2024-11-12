"use strict";
const store_index = require("../store/index.js");
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
  const mainStore = store_index.useMainStore();
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
  const mainStore = store_index.useMainStore();
  const tp = mainStore.getCurType();
  const name = mainStore.projInfo.fbgc;
  const res = sheetsMaps.find((item) => item.name === name);
  const ttl = res == null ? void 0 : res.sheets.find((item) => item.title === tp);
  return ttl == null ? void 0 : ttl.path.slice(1).replace(/\//g, "_");
};
const getTrueFBGC = () => {
  var _a;
  const mainStore = store_index.useMainStore();
  const sheetName = mainStore.getCurType();
  const f = mainStore.projInfo.fbgc;
  const res = (_a = sheetsMaps.find((item) => item.name === f)) == null ? void 0 : _a.sheets.find((item) => item.title === sheetName);
  return (res == null ? void 0 : res.subclass) || f;
};
exports.getCurRecordPath = getCurRecordPath;
exports.getCurTableTitleByFBGC = getCurTableTitleByFBGC;
exports.getSheetsByFBGC = getSheetsByFBGC;
exports.getTrueFBGC = getTrueFBGC;
