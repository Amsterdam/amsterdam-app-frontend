import {ImageURISource} from 'react-native'
import {ProjectWarningImageSources} from '@/modules/construction-work/types'
import {mediaTokens} from '@/themes/tokens'
import {ImageSources} from '@/types'

export const mapImageSources = (
  sources: ImageSources | undefined,
): ImageURISource[] => {
  if (sources === undefined) {
    return [{} as ImageURISource]
  }

  return Object.entries(sources).map(([size, source]) => {
    const width: number = size === 'orig' ? 940 : parseInt(size, 10)

    const imageSource: ImageURISource = {
      uri: source.url,
      width,
      height: Math.floor(width / mediaTokens.aspectRatio.extraWide),
    }

    return imageSource
  })
}

export const mapWarningImageSources = (
  sources: ProjectWarningImageSources | undefined,
): ImageURISource[] => {
  if (sources === undefined) {
    return [{} as ImageURISource]
  }

  return Object.entries(sources).map(([size, source]) => {
    const width: number = size === 'orig' ? 940 : parseInt(size, 10)

    const imageSource: ImageURISource = {
      uri: source.url,
      width,
      height: Math.floor(width / mediaTokens.aspectRatio.extraWide),
    }

    return imageSource
  })
}
