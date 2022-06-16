import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {ProjectWarning} from '../components/project'
import {ProjectsRouteName, ProjectsStackParams} from '../routes'

type ProjectWarningScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ProjectsRouteName.projectWarning
>

type Props = {
  route: ProjectWarningScreenRouteProp
}

export const ProjectWarningScreen = ({route}: Props) => (
  <ProjectWarning id={route.params.id} />
)
