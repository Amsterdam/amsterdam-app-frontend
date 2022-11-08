import {PathConfigMap} from '@react-navigation/core'
import {RootStackParams} from '@/app/navigation'
import {clientModules} from '@/modules'

export const moduleLinkings: PathConfigMap<RootStackParams> =
  clientModules.reduce(
    (linkings, module) => ({
      ...linkings,
      [module.slug]: {screens: module.linking},
    }),
    {},
  )
