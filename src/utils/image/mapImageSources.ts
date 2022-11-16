import {ImageURISource} from 'react-native'
import {EnvironmentConfig} from '@/environment'
import {ProjectWarningImageSources} from '@/modules/construction-work/types'
import {mediaTokens} from '@/themes/tokens'
import {ImageSources} from '@/types'

export const mapImageSources = (
  sources: ImageSources | undefined,
  environment: EnvironmentConfig,
): ImageURISource[] => {
  if (sources === undefined) {
    return [{} as ImageURISource]
  }

  return Object.entries(sources).map(([size, source]) => {
    const width: number = size === 'orig' ? 940 : parseInt(size, 10)

    const imageSource: ImageURISource = {
      uri: environment.apiUrl + '/image?id=' + source.image_id,
      width,
      height: Math.floor(width / mediaTokens.aspectRatio['extra-wide']),
    }

    return imageSource
  })
}

export const mapWarningImageSources = (
  sources: ProjectWarningImageSources | undefined,
  environment: EnvironmentConfig,
): ImageURISource[] => {
  if (sources === undefined) {
    return [{} as ImageURISource]
  }

  return Object.entries(sources).map(([size, source]) => {
    const width: number = size === 'orig' ? 940 : parseInt(size, 10)

    const imageSource: ImageURISource = {
      uri: environment.apiUrl + '/image?id=' + source.image_id,
      width,
      height: Math.floor(width / mediaTokens.aspectRatio['extra-wide']),
    }

    return imageSource
  })
}
