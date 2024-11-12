"use strict";
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
const unfoldCondition = (condition) => {
  const res = [];
  for (const key in condition) {
    res.push(`${key} = "${condition[key]}"`);
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
const isOpen = () => __async(exports, null, function* () {
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
const openDB = () => __async(exports, null, function* () {
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
const closeDB = () => __async(exports, null, function* () {
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
const isTableExist = (tableName) => __async(exports, null, function* () {
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
const insertTableData = (dbTable, data, condition) => {
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
const selectTableData = (dbTable, condition) => {
  if (dbTable !== void 0) {
    if (condition) {
      var sql = `SELECT * FROM ${dbTable} WHERE ${unfoldCondition(condition)}`;
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
exports.closeDB = closeDB;
exports.createTable = createTable;
exports.deleteTableData = deleteTableData;
exports.dropTable = dropTable;
exports.insertTableData = insertTableData;
exports.isOpen = isOpen;
exports.isTableExist = isTableExist;
exports.openDB = openDB;
exports.selectTableData = selectTableData;
exports.updateTableData = updateTableData;
