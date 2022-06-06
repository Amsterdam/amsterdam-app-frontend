import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {View} from 'react-native'
import {ProjectDetail, ProjectDetailBody} from '../../../../types'
import {isEmptyObject} from '../../../../utils'
import {ProjectsRouteName, ProjectsStackParams} from '../../routes'
import {ProjectBodyMenuItem} from '.'

type Props = {
  project: ProjectDetail
}

enum ProjectDetailBodyTitles {
  planning = 'Planning',
  work = 'Werkzaamheden',
  contact = 'Contact',
}

export const ProjectBodyMenu = ({project}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<ProjectsStackParams, ProjectsRouteName.projectDetail>
    >()

  const menuOptions: ProjectDetailBody[] = [
    {
      sections: project.body.when ?? [],
      timeline: project.body.timeline,
      title: ProjectDetailBodyTitles.planning,
    },
    {
      sections: project.body.work,
      title: ProjectDetailBodyTitles.work,
    },
    {
      sections: project.body.contact,
      contacts: project.contacts,
      title: ProjectDetailBodyTitles.contact,
    },
  ]

  const hasContentToShow = (o: ProjectDetailBody) =>
    o.contacts?.length ||
    o.sections?.length ||
    (o.timeline && !isEmptyObject(o.timeline))

  return (
    <View>
      {menuOptions
        .filter(option => hasContentToShow(option))
        .map(options => {
          const {title} = options
          return (
            <ProjectBodyMenuItem
              key={title}
              label={title}
              onPress={() =>
                navigation.navigate(ProjectsRouteName.projectDetailBody, {
                  body: {
                    ...options,
                  },
                })
              }
            />
          )
        })}
    </View>
  )
}
