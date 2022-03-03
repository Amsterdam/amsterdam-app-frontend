import {ImageURISource} from 'react-native'
import {getEnvironment} from '../../environment'
import {image} from '../../tokens'
import {ImageSources, ProjectWarningImageSources} from '../../types'

type Signature = (sources: ImageSources | undefined) => ImageURISource[]

export const mapImageSources: Signature = sources => {
  if (sources === undefined) {
    return [{} as ImageURISource]
  }

  return Object.entries(sources).map(([size, source]) => {
    const width: number = size === 'orig' ? 940 : parseInt(size, 10)

    const imageSource: ImageURISource = {
      uri: getEnvironment().apiUrl + '/image?id=' + source.image_id,
      width,
      height: Math.floor(width / image.aspectRatio.wide),
    }

    return imageSource
  })
}

type MapWarningImageSources = (
  sources: ProjectWarningImageSources | undefined,
) => ImageURISource[]

export const mapWarningImageSources: MapWarningImageSources = sources => {
  if (sources === undefined) {
    return [{} as ImageURISource]
  }

  return Object.entries(sources).map(([size, source]) => {
    const width: number = size === 'orig' ? 940 : parseInt(size, 10)

    const imageSource: ImageURISource = {
      uri: getEnvironment().apiUrl + '/image?id=' + source.image_id,
      width,
      height: Math.floor(width / image.aspectRatio.wide),
    }

    return imageSource
  })
}
