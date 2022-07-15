export enum ConstructionWorkEditorRouteName {
  authorizedProjects = 'AuthorizedProjects',
}

export type ConstructionWorkEditorStackParams = {
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    projectManagerId: string
  }
}
