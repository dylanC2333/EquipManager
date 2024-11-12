interface Column {
  title: string
  name: string
}

interface SelectorObj {
  value: string
  label: string
}

interface TableCellData {
  value: string | number
  opts: TableCellStyleType
  [key: string]: any
}

interface TableCellStyleType {
  type?: 'button' | 'text'
  color?: string
  fontColor?: string
  fontSize?: number
  light?: boolean
  transparent?: boolean
  /**是否头和所在列同步同的背景色和文字色,注意该参数只在header中的opts有效 */
  asyncStyleCell?: boolean
  /**该列是否显示 排序功能，注意该参数只在header中的opts有效 */
  sort?: boolean
}
/** 表头数据格式 */
interface HeaderType {
  /**字段变量名*/
  field: string
  /**字段名称 */
  name: string
  opts?: TableCellStyleType
  [key: string]: any
}
/** 数据格式 */
interface TableDataType {
  /**列字段名称 */
  fields: {
    columns: string[]
  }
  /**头数据,对应fields中columns字段 */
  header: Array<HeaderType>
  /** 表格数据 */
  data: Array<{
    opts?: {
      [key: string]: TableCellStyleType
    }
    [key: string]: any
  }>
}

type GetColumnsType<T extends Readonly<Column[]>> = {
  [P in T[number]['name']]: string
}

type WithOptions<T, U extends string> = T & {[P in U]?: string}