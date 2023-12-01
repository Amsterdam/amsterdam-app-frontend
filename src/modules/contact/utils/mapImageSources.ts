import {ImageURISource} from 'react-native'
import {ImageSources} from '@/modules/contact/types'
import {mediaTokens} from '@/themes/tokens/media'

export const mapImageSources = (sources?: ImageSources): ImageURISource[] => {
  if (!sources) {
    return []
  }

  return Object.entries(sources).map(([size, {url}]) => {
    const width: number = size === 'orig' ? 940 : parseInt(size, 10)

    return {
      uri: url,
      width,
      height: Math.floor(width / mediaTokens.aspectRatio.extraWide),
    }
  })
}
