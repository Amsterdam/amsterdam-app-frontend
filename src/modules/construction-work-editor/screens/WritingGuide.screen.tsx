import {type NavigationProps} from '@/app/navigation/types'
import {CloseModalButton} from '@/components/ui/buttons/CloseModalButton'
import {ModalHeader} from '@/components/ui/containers/ModalHeader'
import {LoginBoundaryScreen} from '@/modules/construction-work-editor/components/LoginBoundaryScreen'
import {WritingGuide} from '@/modules/construction-work-editor/components/WritingGuide'
import {ConstructionWorkEditorModalName} from '@/modules/construction-work-editor/routes'

type Props = NavigationProps<ConstructionWorkEditorModalName.writingGuide>

export const WritingGuideScreen = ({route}: Props) => (
  <LoginBoundaryScreen
    stickyFooter={
      <CloseModalButton
        label="Aan de slag!"
        testID="ConstructionWorkEditorWritingGuideModalCloseButton"
      />
    }
    stickyHeader={
      <ModalHeader
        testID="ConstructionWorkEditorWritingGuideModalHeader"
        title={route.params.screenHeaderTitle}
      />
    }
    testID="ConstructionWorkEditorWritingGuideScreen">
    <WritingGuide />
  </LoginBoundaryScreen>
)
