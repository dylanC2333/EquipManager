interface Result<T = any> {
  code: number
  data?: T
  message: string
}

interface ColumnForm {
  [key: string]: string
}

interface UserReq {
  username: string
  password: string
}

interface TokenRes {
  token: string
}