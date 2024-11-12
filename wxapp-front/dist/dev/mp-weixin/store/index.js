"use strict";
const common_vendor = require("../common/vendor.js");
const useMainStore = common_vendor.defineStore("main", () => {
  const projInfo = common_vendor.reactive({
    type: "",
    detail: "",
    proname: "",
    htd: "",
    fbgc: ""
  });
  const allProject = common_vendor.reactive([]);
  const token = common_vendor.ref("");
  const username = common_vendor.ref("");
  const ql = common_vendor.reactive([]);
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
    var _a;
    return ((_a = allProject.find((item) => item.name === name)) == null ? void 0 : _a.contract.map((item) => item.name)) || [];
  };
  const getTypeByProjNameAndContractName = (name, contractName) => {
    var _a, _b;
    return ((_b = (_a = allProject.find((item) => item.name === name)) == null ? void 0 : _a.contract.find((item) => item.name === contractName)) == null ? void 0 : _b.type) || [];
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
exports.useMainStore = useMainStore;
