import {
  insertTableData,
  isTableExist,
  openDB,
  selectTableData,
  createTable,
  isOpen,
  updateTableData,
  deleteTableData,
} from '@/utils/db'
import {
  attachStatus,
  getTableData,
  withDelete,
  withStatus,
  withUpdate,
} from '@/utils/columnsHandler'
import { toast } from '@/utils/message'
import { getCurTableTitleByFBGC } from '@/utils/sheets'
import { useMainStore } from '@/store'
import { getTitlesByType } from '@/utils/titles'

// export const createColumnsAndTable = async (
//   columns: ColumnForm,
//   tableData: TableDataType
// ) => {
//   const data = await initColumns(getDataFormToDetail)
//   Object.assign(columns, data)
//   const t = getTableData(data)
//   withStatus(t)
//   withDelete(t)
//   withUpdate(t)
//   Object.assign(tableData, t)
//   return true
// }

export const createColumnsAndTable = (
  columns: ColumnItem[],
  tableData: TableDataType
) => {
  const data = getTitlesByType() ?? []
  Object.assign(columns, data)
  const t = getTableData(data)
  withStatus(t)
  withDelete(t)
  withUpdate(t)
  Object.assign(tableData, t)
  return true
}

export const initDB = async () => {
  const op = await isOpen()
  if (op.code === 200) return
  const res = await openDB()
  if (res.code !== 200) {
    toast('打开数据库失败')
    return
  }
}

export const initDBTable = async (columns: ColumnItem[]) => {
  const name = getCurTableTitleByFBGC() ?? ''
  const res = await isTableExist(name)
  if (res.data) {
    return 'ok'
  }
  const data: ColumnForm = {}
  attachStatus(data)
  data['proname'] = ''
  data['htd'] = ''
  data['fbgc'] = ''
  data['username'] = ''
  for (const column of columns) {
    data[column.prop] = 'TEXT'
  }
  const res2 = await createTable(name, {
    lid: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    ...data,
  })
  if (res2.code !== 200) {
    toast('创建表失败')
  }
  return 'ok'
}

export const getLocalData = async () => {
  const mainStore = useMainStore()
  const title = getCurTableTitleByFBGC() ?? ''
  const res = await selectTableData<ColumnForm[]>(title, {
    proname: mainStore.projInfo.proname,
    htd: mainStore.projInfo.htd,
    fbgc: mainStore.projInfo.fbgc,
    username: mainStore.username,
  })
  if (res.code !== 200) {
    toast('获取数据失败')
    return []
  }
  return res.data ?? []
}

export const afterUpload = async (data: ColumnForm[]) => {
  const title = getCurTableTitleByFBGC() ?? ''
  for (let i = 0; i < data.length; i++) {
    if ((data[i]['status'] ?? '未保存') !== '已保存') {
      continue
    }
    data[i]['status'] = '已提交'
    const res = await updateTableData(title, data[i], 'lid', data[i]['lid'])
    if (res.code !== 200) {
      toast('更新数据失败')
    }
  }
}

export const deleteLocalData = async (lid: string) => {
  const title = getCurTableTitleByFBGC() ?? ''
  const res = await deleteTableData(title, 'lid', lid)
  if (res.code !== 200) {
    toast('删除数据失败')
  }
}

export const deleteAllLocalData = async (data: ColumnForm[]) => {
  const title = getCurTableTitleByFBGC() ?? ''
  for (let i = 0; i < data.length; i++) {
    if (data[i]['lid'] !== void 0) {
      const res = await deleteTableData(title, 'lid', data[i]['lid'])
      if (res.code !== 200) {
        toast('删除数据失败')
      }
    }
  }
}

export const saveToLocal = async (data: ColumnForm[]) => {
  const mainStore = useMainStore()
  const title = getCurTableTitleByFBGC() ?? ''
  for (let i = 0; i < data.length; i++) {
    if ((data[i]['status'] ?? '未保存') !== '未保存') {
      continue
    }
    data[i]['status'] = '已保存'
    if (data[i]['lid'] !== void 0) {
      const res = await updateTableData(title, data[i], 'lid', data[i]['lid'])
      if (res.code !== 200) {
        return Promise.reject(res.message)
      }
      continue
    }
    data[i]['proname'] = mainStore.projInfo.proname
    data[i]['htd'] = mainStore.projInfo.htd
    data[i]['fbgc'] = mainStore.projInfo.fbgc
    data[i]['username'] = mainStore.username
    const res = await insertTableData(title, data[i])
    if (res.code !== 200) {
      toast('保存数据失败')
      return Promise.reject(res.message)
    }
  }
  return Promise.resolve('保存成功')
}

export const isAboveBits = (s: string, n: number) => {
  return s.length >= n
}

export const getPureRecords = (
  tableData: TableDataType,
  needUpload: boolean = true
) => {
  const rec: ColumnForm[] = []
  for (let i = 0; i < tableData.data.length; i++) {
    if (!needUpload) {
      if (tableData.data[i]['status'] === '已提交') {
        continue
      }
    }
    const t = { ...tableData.data[i] }
    delete t['delete']
    delete t['update']
    delete t['opts']
    rec.push(t)
  }
  return rec
}

export const getAttachmentOpts = (
  color: string
): { opts: { [key: string]: TableCellStyleType } } => {
  return {
    opts: {
      update: {
        type: 'button',
        fontColor: '#8FBF9F',
      },
      delete: {
        type: 'button',
        fontColor: '#de283b',
      },
      status: {
        fontColor: color,
      },
    },
  }
}

export const statusToColor = (status: string) => {
  switch (status) {
    case '已保存':
      return 'green'
    case '已提交':
      return 'blue'
    default:
      return 'red'
  }
}
