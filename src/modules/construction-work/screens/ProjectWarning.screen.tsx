import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {ProjectWarning} from '@/modules/construction-work/components/project'
import {
  ConstructionWorkRouteName,
  ProjectsStackParams,
} from '@/modules/construction-work/routes'

type ProjectWarningScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ConstructionWorkRouteName.projectWarning
>

type Props = {
  route: ProjectWarningScreenRouteProp
}

export const ProjectWarningScreen = ({route}: Props) => (
  <ProjectWarning id={route.params.id} />
)
