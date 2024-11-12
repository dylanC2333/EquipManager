interface StableData {
  type: string
  detail: string
  htd: string
  proname: string
  fbgc: string
}

interface ContractType {
  name: string
  path: string
  sheets: string[]
}

interface ProjectContract {
  name: string
  type: string[]
}

interface ProjectCatalog {
  name: string
  contract: ProjectContract[]
}

type ProtoOptions = UniNamespace.RequestOptions & { auth?: boolean }

type Options = Omit<ProtoOptions, 'data'|'url'|'method'>

type HandleAllRes<T> = UniNamespace.RequestSuccessCallbackResult & {
  data: Result<T>
}