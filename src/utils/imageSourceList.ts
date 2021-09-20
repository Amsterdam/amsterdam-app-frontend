import {ImageURISource} from 'react-native'
import {ImageSources} from '../types'

export const imageSourceList = (images: ImageSources) =>
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
