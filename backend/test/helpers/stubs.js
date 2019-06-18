export const extendStub = (paramlist, retvals) => (stub) => {
  paramlist.map((_, idx) => {
    const params = Array.isArray(paramlist[idx]) 
      ? paramlist[idx]
      : [paramlist[idx]]

    stub
      .withArgs(...params)
      .returns(retvals[idx])
  })

  return stub
}
