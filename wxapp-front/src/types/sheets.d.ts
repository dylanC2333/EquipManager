interface Sheets {
  title: string
  path: string
  subclass?: string
}


interface SheetsMap {
  name: string
  path: string
  sheets: Sheets[]
}