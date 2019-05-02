export const extendStub = (paramlist, retvals) => (stub) => {
  paramlist.map((_, idx) => {
    const params = paramlist[idx] instanceof Array 
      ? paramlist[idx]
      : [paramlist[idx]]

    stub
      .withArgs(...params)
      .returns(retvals[idx])
  })

  return stub
}
