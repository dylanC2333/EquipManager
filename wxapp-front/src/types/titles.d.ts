interface ColumnItem {
  name: string
  prop: string
  echo?: boolean
  numberOnly?: boolean
  pickerValue?: string[]
  rules?: Partial<Rules>
}

interface Rules {
  notNull: boolean
}

interface Title {
  type: string
  columns: ColumnItem[]
}

type DeepReadonly<T extends Record<string | symbol, any>> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>
}
