import {ProjectsItem} from '@/modules/construction-work/types'

export const getBaseProjectTraits: (
  project: ProjectsItem,
) => Partial<ProjectsItem> = ({followed, recent_articles}) => ({
  followed,
  recent_articles,
})

export const getProjectTraits: (
  project: ProjectsItem,
) => Partial<ProjectsItem> = ({followed, meter, recent_articles, strides}) => ({
  followed,
  meter,
  recent_articles,
  strides,
})
