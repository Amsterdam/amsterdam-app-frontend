import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {Project, ProjectBody} from '@/modules/construction-work/types'
import {isEmptyObject} from '@/utils/object'

type Props = {
  project: Project
}

enum ProjectBodyTitle {
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
      sections: [...project.body.what, ...project.body.where],
      testID: 'ConstructionWorkProjectAboutButton',
      title: ProjectBodyTitle.about,
    },
    {
      sections: project.body.when,
      timeline: project.body.timeline,
      testID: 'ConstructionWorkProjectPlanningButton',
      title: ProjectBodyTitle.planning,
    },
    {
      sections: project.body.work,
      testID: 'ConstructionWorkProjectWorkButton',
      title: ProjectBodyTitle.work,
    },
    {
      sections: project.body.contact,
      contacts: project.contacts,
      testID: 'ConstructionWorkProjectContactButton',
      title: ProjectBodyTitle.contact,
    },
  ]

  const hasContentToShow = (o: ProjectBody) =>
    o.contacts?.length ||
    o.sections?.length ||
    (o.timeline && !isEmptyObject(o.timeline))

  return (
    <Column>
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
            testID={option.testID}
          />
        )
      })}
    </Column>
  )
}
