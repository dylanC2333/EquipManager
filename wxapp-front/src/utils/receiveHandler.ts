export const initProjects = (res: any) => {
  const a: ProjectCatalog[] = []
  for (let i = 0; i < res.length; i++) {
    const b = <ProjectCatalog>{}
    b.name = res[i].name
    b.contract = []
    if (!res[i].children) {
      a.push(b)
      continue
    }
    for (let j = 0; j < res[i].children.length; j++) {
      const c = <ProjectContract>{}
      c.name = res[i].children[j].name
      c.type = []
      if (!res[i].children[j].children) {
        b.contract.push(c)
        continue
      }
      for (let k = 0; k < res[i].children[j].children.length; k++) {
        const d = res[i].children[j].children[k].name
        c.type.push(d)
      }
      b.contract.push(c)
    }
    a.push(b)
  }
  return a
}