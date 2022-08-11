import {StackNavigationRoutes} from '@/app/navigation'
import {
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

export const constructionWorkEditorScreenConfig: StackNavigationRoutes<
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
  [ConstructionWorkEditorRouteName.writingGuide]: {
    component: WritingGuideScreen,
    name: ConstructionWorkEditorRouteName.writingGuide,
    options: {
      headerTitle: 'Schrijftips',
    },
  },
}

export const constructionWorkEditorModals: StackNavigationRoutes<ConstructionWorkEditorModalParams> =
  {}
