import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

// too heavy
export const useMainStore = defineStore('main', () => {
  const projInfo: StableData = reactive({
    type: '',
    detail: '',
    proname: '',
    htd: '',
    fbgc: '',
  })
  const allProject = reactive<ProjectCatalog[]>([])
  const token = ref('')
  const username = ref('')
  const ql = reactive<string[]>([])

  const getCurType = () => {
    return projInfo.type
  }

  const getCurDetail = () => {
    return projInfo.detail
  }

  const getCurInfo = () => {
    const res = `${projInfo.proname}---${projInfo.htd}---${projInfo.fbgc}---${projInfo.type}`
    if (res !== '---------') {
      return res
    }
    return ''
  }

  const setToken = (t: string) => {
    token.value = t
  }
  const getToken = () => {
    return token.value
  }

  const assignProjInfo = (data: ProjectCatalog[]) => {
    Object.assign(allProject, data)
  }

  const getAllProjName = () => {
    return allProject.map((item) => item.name)
  }

  const assignQl = (data: string[]) => {
    Object.assign(ql, data)
  }

  const getAllQl = () => {
    return ql
  }

  const getContractsNameByProjName = (name: string) => {
    return (
      allProject
        .find((item) => item.name === name)
        ?.contract.map((item) => item.name) || []
    )
  }

  const getTypeByProjNameAndContractName = (
    name: string,
    contractName: string
  ) => {
    return (
      allProject
        .find((item) => item.name === name)
        ?.contract.find((item) => item.name === contractName)?.type || []
    )
  }

  return {
    projInfo,
    username,
    allProject,
    getCurType,
    getCurInfo,
    getCurDetail,
    getToken,
    setToken,
    assignProjInfo,
    getAllProjName,
    getContractsNameByProjName,
    getTypeByProjNameAndContractName,
    getAllQl,
    assignQl,
  }
})
