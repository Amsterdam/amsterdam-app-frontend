import {PathConfigMap} from '@react-navigation/core'
import {RootStackParams} from '@/app/navigation'
import {clientModules} from '@/modules'

export const moduleLinkings: PathConfigMap<RootStackParams> =
  clientModules.reduce((linkings, {linking, slug}) => {
    if (!linking) {
      return linkings
    }

    return {
      ...linkings,
      [slug]: {screens: linking},
    }
  }, {})
