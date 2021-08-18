import {ImageURISource} from 'react-native'
import {ProjectImageSources} from '../types'

export const imageSourceList = (images: ProjectImageSources) =>
  Object.values(images).reduce<ImageURISource[]>(
    (acc, val) => [
      ...acc,
      {
        url: val.url,
        width: val.size === 'orig' ? 940 : parseInt(val.size, 10),
      },
    ],
    [],
  )
