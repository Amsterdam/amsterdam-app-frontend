import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {StackParams} from '../../../app/navigation'
import {ProjectNews} from '../components/project'

type ProjectNewsScreenRouteProp = RouteProp<StackParams, 'ProjectNews'>

type Props = {
  route: ProjectNewsScreenRouteProp
}

export const ProjectNewsScreen = ({route}: Props) => (
  <ProjectNews id={route.params.id} />
)
