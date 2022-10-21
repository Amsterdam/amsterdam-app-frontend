import {ProjectBody} from '@/modules/construction-work/types'

export enum ConstructionWorkRouteName {
  constructionWork = 'ConstructionWork',
  project = 'Project',
  projectBody = 'ProjectBody',
  projectNews = 'ProjectNews',
  projectWarning = 'ProjectWarning',
}

export type ConstructionWorkStackParams = {
  [ConstructionWorkRouteName.constructionWork]: undefined
  [ConstructionWorkRouteName.project]: {id: string}
  [ConstructionWorkRouteName.projectBody]: {
    body: ProjectBody
    headerTitle: string
  }
  [ConstructionWorkRouteName.projectNews]: {id: string}
  [ConstructionWorkRouteName.projectWarning]: {id: string}
}

export enum ConstructionWorkModalName {}

export type ConstructionWorkModalParams = Record<string, never>
