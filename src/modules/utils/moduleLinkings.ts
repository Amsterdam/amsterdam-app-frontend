import {clientModules} from '@/modules'

export const moduleLinkings = clientModules.reduce(
  (linkings, module) => ({...linkings, ...module.linking}),
  {},
)
