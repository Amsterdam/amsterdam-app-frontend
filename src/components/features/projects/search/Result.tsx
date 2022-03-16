import Pointer from '@amsterdam/asc-assets/static/icons/Pointer.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StackParams} from '../../../../app/navigation'
import {routes} from '../../../../app/navigation/routes'
import {layoutStyles} from '../../../../styles'
import {color} from '../../../../tokens'
import {Project} from '../../../../types'
import {mapImageSources} from '../../../../utils'
import {Trait} from '../../../ui'
import {ProjectCard} from '../../project'

type Props = {
  project: Project
}

export const Result = ({project}: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Projects'>>()

  return (
    <ProjectCard
      imageSource={
        project.images?.[0] && mapImageSources(project.images[0].sources)
      }
      kicker={
        <Trait
          icon={<Pointer fill={color.touchable.primary} />}
          label={`Score: ${project.score}`}
        />
      }
      onPress={() =>
        navigation.navigate(routes.projectDetail.name, {
          id: project.identifier,
        })
      }
      style={layoutStyles.grow}
      subtitle={project.subtitle ?? undefined}
      title={project.title}
    />
  )
}
