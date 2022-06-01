import {clientModules} from '..'

export const moduleLinkings = clientModules.reduce(
  (linkings, module) => ({...linkings, ...module.linking}),
  {},
)
