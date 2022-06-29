import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {ProjectNews} from '@/modules/construction-work/components/project'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'

type ProjectNewsScreenRouteProp = RouteProp<
  ConstructionWorkStackParams,
  ConstructionWorkRouteName.projectNews
>

type Props = {
  route: ProjectNewsScreenRouteProp
}

export const ProjectNewsScreen = ({route}: Props) => (
  <ProjectNews id={route.params.id} />
)
