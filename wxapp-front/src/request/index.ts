import config from '@/config'
import { useMainStore } from '@/store'
import { toast } from '@/utils/message'

export class RequestInstance {
  private baseURL = config.BASE_URL
  beforeRequest = (options: ProtoOptions) => {
    const mainStore = useMainStore()
    return new Promise<ProtoOptions>((resolve) => {
      options.url = this.baseURL + options.url
      options.timeout = 10000
      if (options.auth) {
        options.header = {
          token: mainStore.getToken(),
        }
      }
      resolve(options)
    })
  }
  handleResponse = <T>(response: HandleAllRes<T>) => {
    return new Promise<T>((resolve, reject) => {
      const { data } = response
      let msg = ''
      if (data.code !== 200) {
        msg = data.message || '请求失败'
        return reject(new Error(msg))
      }
      return resolve(data.data!)
    })
  }
  request = <T>(options: ProtoOptions) => {
    return new Promise<T>(async (resolve, reject) => {
      const opt = await this.beforeRequest(options)
      uni
        .request(opt)
        .then(async (res) => {
          this.handleResponse(<HandleAllRes<T>>res)
            .then((data) => {
              resolve(data)
            })
            .catch((err) => {
              toast(err.message)
              reject(err)
            })
        })
        .catch((err) => {
          toast('网络或服务器出错')
          reject(err)
        })
    })
  }
}
