import { RequestInstance } from "@/request"

// // * --------------------------------

const service = new RequestInstance()

export const http = {
  get: <T = any>(url: string, params?: object, options?: Options) => {
    return service.request<T>({
      url,
      method: 'GET',
	  data: params,
      ...options
    })
  },
  post: <T = any>(url: string, data?: object, options?: Options) => {
    return service.request<T>({
      url,
      method: 'POST',
      data,
      ...options
    })
  },
  delete: <T = any>(url: string, data?: object, options?: Options) => {
	  return service.request<T>({
		  url,
		  method: 'DELETE',
		  data,
		  ...options
	  })
  },
  put: <T = any>(url: string, data?: object, options?: Options) => {
	  return service.request<T>({
		  url,
		  method: 'PUT',
		  data,
		  ...options
	  })
  },
}

