import {RouteProp} from '@react-navigation/native'
import React from 'react'
import {ScrollView} from '@/components/ui/layout'
import {Project} from '@/modules/construction-work/components/project'
import {
  ConstructionWorkRouteName,
  ProjectsStackParams,
} from '@/modules/construction-work/routes'

type Props = {
  route: RouteProp<ProjectsStackParams, ConstructionWorkRouteName.project>
}

export const ProjectScreen = ({route}: Props) => (
  <ScrollView>
    <Project id={route.params.id} />
  </ScrollView>
)
