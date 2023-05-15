import {
  ProjectWarning,
  WarningArticleSummary,
} from '@/modules/construction-work/types'
import {mapWarningImageSources} from '@/utils'

export const getProjectWarningMainImageInfo = (
  projectWarning?: ProjectWarning | WarningArticleSummary,
) => {
  const mainImage = projectWarning?.images?.find(({main}) => main)

  if (!mainImage) {
    return
  }

  return {
    description: mainImage.description,
    sources: mapWarningImageSources(mainImage.sources),
  }
}
