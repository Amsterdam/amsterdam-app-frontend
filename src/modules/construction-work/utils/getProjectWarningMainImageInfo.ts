import {ImageURISource} from 'react-native'
import {
  ProjectWarning,
  WarningArticleSummary,
} from '@/modules/construction-work/types'
import {mapWarningImageSources} from '@/utils'

export type ProjectWarningMainImageInfo =
  | {description: string; sources: ImageURISource[]}
  | undefined

export const getProjectWarningMainImageInfo = (
  projectWarning?: ProjectWarning | WarningArticleSummary,
): ProjectWarningMainImageInfo => {
  const mainImage = projectWarning?.images?.find(({main}) => main)

  if (!mainImage) {
    return
  }

  return {
    description: mainImage.description,
    sources: mapWarningImageSources(mainImage.sources),
  }
}
