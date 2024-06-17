import {PathConfig, PathConfigMap} from '@react-navigation/core'
import {RootStackParams} from '@/app/navigation/types'
import {clientModules} from '@/modules/modules'

export const moduleLinkings = (() => {
  const linkings: PathConfigMap<RootStackParams> = {}

  clientModules.forEach(({linking, slug}) => {
    if (!linking) {
      return
    }

    linkings[slug] = {screens: linking} as PathConfig<RootStackParams>
  })

  return linkings
})()
