import {RouteProp} from '@react-navigation/core'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {CloseModalButton} from '@/components/ui/buttons'
import {ModalHeader} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {WritingGuide} from '@/modules/construction-work-editor/components'
import {ConstructionWorkEditorModalName} from '@/modules/construction-work-editor/routes'

type Props = {
  route: RouteProp<
    RootStackParams,
    ConstructionWorkEditorModalName.writingGuide
  >
}

export const WritingGuideScreen = ({route}: Props) => (
  <Screen
    stickyHeader={<ModalHeader title={route.params.projectTitle} />}
    stickyFooter={<CloseModalButton label="Aan de slag!" />}>
    <WritingGuide />
  </Screen>
)
