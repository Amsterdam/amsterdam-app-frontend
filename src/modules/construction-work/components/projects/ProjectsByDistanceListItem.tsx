import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '@/app/navigation'
import {
  ProjectCard,
  ProjectTraits,
} from '@/modules/construction-work/components/shared'
import {
  ConstructionWorkRouteName,
  ProjectsStackParams,
} from '@/modules/construction-work/routes'
import {useEnvironment} from '@/store'
import {ProjectsItem} from '@/types'
import {mapImageSources} from '@/utils'

type Props = {
  project: ProjectsItem
}

export const ProjectsByDistanceListItem = ({project}: Props) => {
  const environment = useEnvironment()
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParamList & ProjectsStackParams,
        ConstructionWorkRouteName.projects
      >
    >()

  return (
    <ProjectCard
      imageSource={mapImageSources(project.images?.[0].sources, environment)}
      kicker={<ProjectTraits projectId={project.identifier} />}
      onPress={() =>
        navigation.navigate(ConstructionWorkRouteName.project, {
          id: project.identifier,
        })
      }
      subtitle={project.subtitle ?? undefined}
      title={project.title}
    />
  )
}
