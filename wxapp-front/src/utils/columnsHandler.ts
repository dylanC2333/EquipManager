import { useMainStore } from "@/store"
import { readableToFormat } from "./dateFormat"
import { getTrueFBGC } from "./sheets"

export const dateTag = ['jcsj', 'jcrq', 'sysj']

export const getTableDataByColumns = (columns: Column[]) => {
  const tableData: TableDataType = {
    fields: {
      columns: [],
    },
    header: [],
    data: [],
  }
  for (const column of columns) {
    tableData.fields.columns.push(column.name)
    tableData.header.push({
      field: column.name,
      name: column.title,
      opts: {
        color: '#005461',
      },
    })
  }
  return tableData
}

export const withUpdate = (tableData: TableDataType) => {
  tableData.fields.columns.unshift('update')
  tableData.header.unshift({
    field: 'update',
    name: '修改',
    opts: {
      color: '#005461',
    },
  })
}

export const withDelete = (tableData: TableDataType) => {
  tableData.fields.columns.unshift('delete')
  tableData.header.unshift({
    field: 'delete',
    name: '删除',
    opts: {
      color: '#005461',
    },
  })
}

export const withStatus = (tableData: TableDataType) => {
  tableData.fields.columns.unshift('status')
  tableData.header.unshift({
    field: 'status',
    name: '状态',
    opts: {
      color: '#005461',
    }
  })
}

export const initColumns = async <R extends { [key: string]: any }>(
  callback: (...args: any[]) => Promise<R>
): Promise<R> => {
  const res = await callback()
  return res
}

export const getTableData = (columns:  DeepReadonly<ColumnItem[]>) => {
  const tableData: TableDataType = {
    fields: {
      columns: [],
    },
    header: [],
    data: [],
  }
  for (const column of columns) {
    tableData.fields.columns.push(column.prop)
    tableData.header.push({
      field: column.prop,
      name: column.name,
      opts: {
        color: '#005461',
      },
    })
  }
  return tableData
}


export const attachStableData = (c: ColumnForm) => {
  const mainStore = useMainStore()
  c['proname'] = mainStore.projInfo.proname
  c['htd'] = mainStore.projInfo.htd
  c['fbgc'] = getTrueFBGC()
}

export const attachStatus = (c: ColumnForm) => {
  c['status'] = ''
}

export const toFormatDate = (c: ColumnForm) => {
  for (const key in c) {
    if (dateTag.includes(key)) {
      c[key] = readableToFormat(c[key])
    }
  }
}
