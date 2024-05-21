import {type TitleParams} from '@/app/navigation/types'

export enum ConstructionWorkEditorRouteName {
  addMainImageToMessage = 'AddMainImageToMessage',
  authorizedProjects = 'AuthorizedProjects',
  confirmMessage = 'ConfirmMessage',
  createMessage = 'CreateMessage',
}

export type ConstructionWorkEditorStackParams = {
  [ConstructionWorkEditorRouteName.addMainImageToMessage]: undefined
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    id?: string
    showSuccessfullySentMessageAlert?: boolean
  }
  [ConstructionWorkEditorRouteName.confirmMessage]: TitleParams
  [ConstructionWorkEditorRouteName.createMessage]: TitleParams & {
    projectId: number
  }
}

export enum ConstructionWorkEditorModalName {
  writingGuide = 'WritingGuide',
}

export type ConstructionWorkEditorModalParams = {
  [ConstructionWorkEditorModalName.writingGuide]: TitleParams
}
