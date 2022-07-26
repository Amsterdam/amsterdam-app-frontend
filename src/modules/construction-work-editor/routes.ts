export enum ConstructionWorkEditorRouteName {
  authorizedProjects = 'AuthorizedProjects',
}

export type ConstructionWorkEditorStackParams = {
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    id?: string
  }
}
