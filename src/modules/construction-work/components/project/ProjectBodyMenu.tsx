import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {NavigationButton} from '@/components/ui/buttons'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {Project, ProjectBody} from '@/types'
import {isEmptyObject} from '@/utils'

type Props = {
  project: Project
}

enum ProjectBodyTitles {
  about = 'Over dit project',
  contact = 'Contact',
  planning = 'Planning',
  work = 'Werkzaamheden',
}

export const ProjectBodyMenu = ({project}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        ConstructionWorkStackParams,
        ConstructionWorkRouteName.project
      >
    >()

  const menuOptions: ProjectBody[] = [
    {
      sections: [
        ...(project.body.intro ?? []),
        ...(project.body.what ?? []),
        ...(project.body.where ?? []),
      ],
      title: ProjectBodyTitles.about,
    },
    {
      sections: project.body.when ?? [],
      timeline: project.body.timeline,
      title: ProjectBodyTitles.planning,
    },
    {
      sections: project.body.work,
      title: ProjectBodyTitles.work,
    },
    {
      sections: project.body.contact,
      contacts: project.contacts,
      title: ProjectBodyTitles.contact,
    },
  ]

  const hasContentToShow = (o: ProjectBody) =>
    o.contacts?.length ||
    o.sections?.length ||
    (o.timeline && !isEmptyObject(o.timeline))

  return (
    <>
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
              navigation.navigate(ConstructionWorkRouteName.projectBody, {
                body: {
                  ...option,
                },
                headerTitle: project.title,
              })
            }
          />
        )
      })}
    </>
  )
}
