const DB_NAME = 'jjgdb'
const DB_PATH = '_doc/jjgdb.db'

const obj2str = (obj: any, sp: string = ' ', need: boolean = false) => {
  const tmp = JSON.stringify(obj).slice(1, -1).split(',')
  const res = tmp.map((i) => {
    return i.replace(/[:]/, sp)
  })
  const str = res.join(',')
  if (need) {
    return str
  }
  return str.replace(/["]/g, '')
}

const unfoldCondition = (condition: any) => {
  const res = []
  for (const key in condition) {
    res.push(`${key} = "${condition[key]}"`)
  }
  return res.toString().replace(/,/g, ' and ')
}

const getObjKeys = (obj: any) => {
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    keys[i] = '"' + keys[i] + '"'
  }
  return keys.toString()
}

const getObjValues = (obj: any) => {
  const values: string[] = []
  for (const key in obj) {
    const v = '"' + obj[key] + '"'
    values.push(v)
  }
  return values.toString()
}

export const isOpen = async () => {
  return new Promise<Result>((resolve, reject) => {
    if (
      plus.sqlite.isOpenDatabase({
        name: DB_NAME,
        path: DB_PATH,
      })
    ) {
      resolve({ code: 200, message: '数据库已打开' })
    } else {
      resolve({ code: 404, message: '数据库未打开' })
    }
  })
}

export const dropDB = async (dbName: string, dbPath: string) => {
  return new Promise<Result>((resolve, reject) => {
    plus.sqlite.openDatabase({
      name: dbName,
      path: dbPath,
    })
  })
}

export const openDB = async () => {
  return new Promise<Result>((resolve, reject) => {
    plus.sqlite.openDatabase({
      name: DB_NAME,
      path: DB_PATH,
      success: (e) => {
        resolve({ code: 200, message: '打开数据库成功' })
      },
      fail: (e) => {
        resolve({ code: 404, message: `打开数据库失败: ${JSON.stringify(e)}` })
      },
    })
  })
}

export const closeDB = async () => {
  return new Promise<Result>((resolve, reject) => {
    plus.sqlite.closeDatabase({
      name: DB_NAME,
      success: (e) => {
        resolve({ code: 200, message: '关闭数据库成功' })
      },
      fail: (e) => {
        resolve({ code: 404, message: `关闭数据库失败: ${JSON.stringify(e)}` })
      },
    })
  })
}

export const isTableExist = async (tableName: string) => {
  return new Promise<Result<boolean>>((resolve, reject) => {
    plus.sqlite.selectSql({
      name: DB_NAME,
      sql: `select count(*) as count from sqlite_master where type = 'table' and name = '${tableName}'`,
      success: (e) => {
        resolve({ code: 200, message: '', data: e[0].count !== 0 })
      },
      fail: (e) => {
        reject({ code: 404, message: `查询数据库失败: ${JSON.stringify(e)}` })
      },
    })
  })
}

export const createTable = (dbTable: string, data: any) => {
  return new Promise<Result>((resolve, reject) => {
    // executeSql: 执行增删改等操作的SQL语句
    plus.sqlite.executeSql({
      name: DB_NAME,
      sql: [`CREATE TABLE IF NOT EXISTS ${dbTable}(${obj2str(data)})`],
      success(e) {
        resolve({ code: 200, message: '创建表成功' })
      },
      fail(e) {
        reject({ code: 404, message: `创建表失败: ${JSON.stringify(e)}` })
      },
    })
  })
}

export const dropTable = (dbTable: string) => {
  return new Promise<Result>((resolve, reject) => {
    plus.sqlite.executeSql({
      name: DB_NAME,
      sql: [`DROP TABLE ${dbTable}`],
      success(e) {
        resolve({ code: 200, message: '删除表成功' })
      },
      fail(e) {
        reject({ code: 404, message: `删除表失败: ${JSON.stringify(e)}` })
      },
    })
  })
}

export const insertTableData = <T, K extends keyof T & string>(
  dbTable: string,
  data: T,
  condition?: K[]
) => {
  // 判断有没有传参
  if (dbTable !== void 0 && data !== void 0) {
    // 判断传的参是否有值
    var bol = JSON.stringify(data) === '{}'
    if (!bol) {
      var sql = `INSERT INTO ${dbTable} (${
        condition ?? getObjKeys(data)
      }) VALUES(${getObjValues(data)})`

      return new Promise<Result>((resolve, reject) => {
        // 表格添加数据
        plus.sqlite.executeSql({
          name: DB_NAME,
          sql: [sql],
          success(e) {
            resolve({ code: 200, message: '添加数据成功' })
          },
          fail(e) {
            reject({ code: 404, message: `添加数据失败: ${JSON.stringify(e)}` })
          },
        })
      })
    } else {
      return new Promise<Result>((resolve, reject) => {
        reject('错误添加')
      })
    }
  } else {
    return new Promise<Result>((resolve, reject) => {
      reject('错误添加')
    })
  }
}

export const deleteTableData = (
  dbTable: string,
  lname?: string,
  lvalue?: string
) => {
  if (dbTable !== void 0) {
    if (lname == void 0) {
      var sql = `DELETE FROM ${dbTable}`
    } else {
      var sql = `DELETE FROM ${dbTable} WHERE ${lname} = '${lvalue}'`
    }
    return new Promise<Result>((resolve, reject) => {
      // 删除表数据
      plus.sqlite.executeSql({
        name: DB_NAME,
        sql: [sql],
        success(e) {
          resolve({ code: 200, message: '删除数据成功' })
        },
        fail(e) {
          reject({ code: 404, message: `删除数据失败: ${JSON.stringify(e)}` })
        },
      })
    })
  } else {
    return Promise.reject('错误删除')
  }
}

export const selectTableData = <T>(
  dbTable: string,
  condition?: Record<string, string>
) => {
  if (dbTable !== void 0) {
    if (condition) {
      var sql = `SELECT * FROM ${dbTable} WHERE ${unfoldCondition(condition)}`
    } else {
      var sql = `SELECT * FROM ${dbTable}`
    }
    return new Promise<Result<T>>((resolve, reject) => {
      // 表格查询数据  执行查询的SQL语句
      plus.sqlite.selectSql({
        name: DB_NAME,
        sql: sql,
        success(e) {
          resolve({ code: 200, message: '查询数据成功', data: e })
        },
        fail(e) {
          reject({ code: 404, message: `查询数据失败: ${JSON.stringify(e)}` })
        },
      })
    })
  } else {
    return new Promise<Result<T>>((resolve, reject) => {
      reject('错误查询')
    })
  }
}

export const updateTableData = (
  dbTable: string,
  data: any,
  lname?: string,
  lvalue?: string
) => {
  if (lname === void 0) {
    var sql = `UPDATE ${dbTable} SET ${obj2str(data, ' = ', true)}`
  } else {
    var sql = `UPDATE ${dbTable} SET ${obj2str(
      data,
      ' = ',
      true
    )} WHERE ${lname} = '${lvalue}'`
  }
  // WHERE 前面是要修改的列名、列值，后面是条件的列名、列值
  return new Promise<Result>((resolve, reject) => {
    // 修改表数据
    plus.sqlite.executeSql({
      name: DB_NAME,
      sql: [sql],
      success(e) {
        resolve({ code: 200, message: '修改数据成功' })
      },
      fail(e) {
        reject({ code: 404, message: `修改数据失败: ${JSON.stringify(e)}` })
      },
    })
  })
}
