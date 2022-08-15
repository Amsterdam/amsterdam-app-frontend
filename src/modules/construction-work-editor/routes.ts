export enum ConstructionWorkEditorRouteName {
  addMainImageToMessage = 'addMainImageToMessage',
  authorizedProjects = 'authorizedProjects',
  confirmMessage = 'confirmMessage',
  createMessage = 'createMessage',
  writingGuide = 'WritingGuide',
}

export type ConstructionWorkEditorStackParams = {
  [ConstructionWorkEditorRouteName.addMainImageToMessage]: undefined
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    id?: string
    showSuccesfullySendMessageAlert?: boolean
  }
  [ConstructionWorkEditorRouteName.confirmMessage]: undefined
  [ConstructionWorkEditorRouteName.createMessage]: {
    projectId: string
    projectTitle: string
  }
  [ConstructionWorkEditorRouteName.writingGuide]: {
    projectTitle: string
  }
}

export enum ConstructionWorkEditorModalName {}

// eslint-disable-next-line @typescript-eslint/ban-types
export type ConstructionWorkEditorModalParams = {}
