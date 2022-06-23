import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {ProjectNews} from '@/modules/construction-work/components/project'
import {
  ConstructionWorkRouteName,
  ProjectsStackParams,
} from '@/modules/construction-work/routes'

type ProjectNewsScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ConstructionWorkRouteName.projectNews
>

type Props = {
  route: ProjectNewsScreenRouteProp
}

export const ProjectNewsScreen = ({route}: Props) => (
  <ProjectNews id={route.params.id} />
)
