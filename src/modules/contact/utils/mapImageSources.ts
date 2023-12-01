import {ImageURISource} from 'react-native'
import {mediaTokens} from '@/themes/tokens/media'
import {ImageSources} from '@/types/image'

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
