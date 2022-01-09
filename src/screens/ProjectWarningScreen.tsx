import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {MenuStackParams} from '../app/navigation'
import {ProjectWarning} from '../components/features/project'

type ProjectWarningScreenRouteProp = RouteProp<
  MenuStackParams,
  'ProjectWarning'
>

type Props = {
  route: ProjectWarningScreenRouteProp
}

export const ProjectWarningScreen = ({route}: Props) => (
  <ProjectWarning id={route.params.id} />
)
