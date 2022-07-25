import {ProjectIdQueryArg} from '@/modules/construction-work/types'

export enum ConstructionWorkEditorRouteName {
  authorizedProjects = 'AuthorizedProjects',
}

export type ConstructionWorkEditorStackParams = {
  [ConstructionWorkEditorRouteName.authorizedProjects]: ProjectIdQueryArg
}
