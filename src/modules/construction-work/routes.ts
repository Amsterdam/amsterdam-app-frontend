import {type TitleParams} from '@/app/navigation/types'
import {type ProjectSegment} from '@/modules/construction-work/types/project'

export enum ConstructionWorkRouteName {
  constructionWork = 'ConstructionWork',
  project = 'Project',
  projectNews = 'ProjectNews',
  projectSegment = 'ProjectSegment',
  projectWarning = 'ProjectWarning',
  search = 'ConstructionWorkSearch',
}

export type ConstructionWorkStackParams = {
  [ConstructionWorkRouteName.constructionWork]: undefined
  [ConstructionWorkRouteName.search]: undefined
  [ConstructionWorkRouteName.project]: TitleParams & {id: number}
  [ConstructionWorkRouteName.projectSegment]: TitleParams & {
    body: ProjectSegment
  }
  [ConstructionWorkRouteName.projectNews]: TitleParams & {
    id: number
    projectId?: number
  }
  [ConstructionWorkRouteName.projectWarning]: TitleParams & {
    id: number
    projectId?: number
  }
}

export enum ConstructionWorkModalName {}

export type ConstructionWorkModalParams = Record<string, never>
