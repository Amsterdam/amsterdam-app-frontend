import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {Screen} from '@/components/ui/layout'
import {ProjectWarning} from '@/modules/construction-work/components/project'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'

type ProjectWarningScreenRouteProp = RouteProp<
  ConstructionWorkStackParams,
  ConstructionWorkRouteName.projectWarning
>

type Props = {
  route: ProjectWarningScreenRouteProp
}

export const ProjectWarningScreen = ({route}: Props) => (
  <Screen withLeftInset={false} withRightInset={false}>
    <ProjectWarning id={route.params.id} />
  </Screen>
)
