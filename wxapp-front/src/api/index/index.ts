// import { http } from "@/utils/request"

import { http } from "@/utils/request"

// export const getDataForm = () => {
//   return http.get<ColumnForm>('/jjg/fbgc/lmgc/lqlmysd/getDataForm4App')
// }

export const loginToService = (data: UserReq) => {
  return http.post<TokenRes>('/admin/system/index/login', data)
}