import {RouteProp} from '@react-navigation/core'
import {RootStackParams} from '@/app/navigation/types'
import {CloseModalButton} from '@/components/ui/buttons/CloseModalButton'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {Screen} from '@/components/ui/layout/Screen'
import {WritingGuide} from '@/modules/construction-work-editor/components/WritingGuide'
import {ConstructionWorkEditorModalName} from '@/modules/construction-work-editor/routes'

type Props = {
  route: RouteProp<
    RootStackParams,
    ConstructionWorkEditorModalName.writingGuide
  >
}

export const WritingGuideScreen = ({route}: Props) => (
  <Screen
    stickyFooter={
      <CloseModalButton
        label="Aan de slag!"
        testID="ConstructionWorkEditorWritingGuideModalCloseButton"
      />
    }
    stickyHeader={
      <ModalHeader
        testID="ConstructionWorkEditorWritingGuideModalHeader"
        title={route.params.projectTitle}
      />
    }
    testID="ConstructionWorkEditorWritingGuideScreen">
    <WritingGuide />
  </Screen>
)
