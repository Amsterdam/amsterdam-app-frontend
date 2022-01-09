import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {MenuStackParams} from '../app/navigation'
import {ProjectNews} from '../components/features/project'

type ProjectNewsScreenRouteProp = RouteProp<MenuStackParams, 'ProjectNews'>

type Props = {
  route: ProjectNewsScreenRouteProp
}

export const ProjectNewsScreen = ({route}: Props) => (
  <ProjectNews id={route.params.id} />
)
