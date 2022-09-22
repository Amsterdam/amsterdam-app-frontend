import {StackNavigationRoutes} from '@/app/navigation'
import {
  ConstructionWorkEditorModalName,
  ConstructionWorkEditorModalParams,
  ConstructionWorkEditorRouteName,
  ConstructionWorkEditorStackParams,
} from '@/modules/construction-work-editor/routes'
import {
  AddMainImageToMessageScreen,
  AuthorizedProjectsScreen,
  ConfirmMessageScreen,
  CreateMessageScreen,
  WritingGuideScreen,
} from '@/modules/construction-work-editor/screens'

export const screenConfig: StackNavigationRoutes<
  ConstructionWorkEditorStackParams,
  ConstructionWorkEditorRouteName
> = {
  [ConstructionWorkEditorRouteName.authorizedProjects]: {
    component: AuthorizedProjectsScreen,
    name: ConstructionWorkEditorRouteName.authorizedProjects,
    options: {
      headerTitle: 'Plaats berichten',
    },
  },
  [ConstructionWorkEditorRouteName.createMessage]: {
    component: CreateMessageScreen,
    name: ConstructionWorkEditorRouteName.createMessage,
  },
  [ConstructionWorkEditorRouteName.addMainImageToMessage]: {
    component: AddMainImageToMessageScreen,
    name: ConstructionWorkEditorRouteName.addMainImageToMessage,
  },
  [ConstructionWorkEditorRouteName.confirmMessage]: {
    component: ConfirmMessageScreen,
    name: ConstructionWorkEditorRouteName.confirmMessage,
  },
}

export const constructionWorkEditorModals: StackNavigationRoutes<
  ConstructionWorkEditorModalParams,
  ConstructionWorkEditorModalName
> = {
  [ConstructionWorkEditorModalName.writingGuide]: {
    component: WritingGuideScreen,
    name: ConstructionWorkEditorModalName.writingGuide,
  },
}
