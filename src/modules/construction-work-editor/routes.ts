export enum ConstructionWorkEditorRouteName {
  authorizedProjects = 'authorizedProjects',
  confirmMessage = 'confirmMessage',
  createMessage = 'createMessage',
  addMainImageToMessage = 'addMainImageToMessage',
}

export type ConstructionWorkEditorStackParams = {
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    id?: string
  }
  [ConstructionWorkEditorRouteName.createMessage]: {
    projectId: string
    projectTitle: string
  }
  [ConstructionWorkEditorRouteName.addMainImageToMessage]: undefined
  [ConstructionWorkEditorRouteName.confirmMessage]: undefined
}
