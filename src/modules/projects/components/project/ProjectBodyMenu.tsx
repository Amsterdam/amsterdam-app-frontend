import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {NavigationButton} from '../../../../components/ui/button/index'
import {Column} from '../../../../components/ui/layout'
import {ProjectDetail, ProjectDetailBody} from '../../../../types'
import {isEmptyObject} from '../../../../utils'
import {ProjectsRouteName, ProjectsStackParams} from '../../routes'

type Props = {
  project: ProjectDetail
}

enum ProjectDetailBodyTitles {
  about = 'Over dit project',
  contact = 'Contact',
  planning = 'Planning',
  work = 'Werkzaamheden',
}

export const ProjectBodyMenu = ({project}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<ProjectsStackParams, ProjectsRouteName.projectDetail>
    >()

  const menuOptions: ProjectDetailBody[] = [
    {
      sections: [
        ...(project.body.intro ?? []),
        ...(project.body.what ?? []),
        ...(project.body.where ?? []),
      ],
      title: ProjectDetailBodyTitles.about,
    },
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
    <Column gutter="md">
      {menuOptions.map(option => {
        if (!hasContentToShow(option)) {
          return null
        }

        const {title} = option

        return (
          <NavigationButton
            key={title}
            label={title}
            onPress={() =>
              navigation.navigate(ProjectsRouteName.projectDetailBody, {
                body: {
                  ...option,
                },
                headerTitle: project.title,
              })
            }
          />
        )
      })}
    </Column>
  )
}
