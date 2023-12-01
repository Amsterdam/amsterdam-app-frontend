import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ProjectDetail} from '@/modules/construction-work/types/api'
import {ProjectBody} from '@/modules/construction-work/types/project'
import {isEmptyObject} from '@/utils/object'

type Props = {
  project: ProjectDetail
}

enum ProjectBodyTitle {
  about = 'Over dit project',
  contact = 'Contact',
  planning = 'Planning',
  work = 'Werkzaamheden',
}

const hasContentToShow = (o: ProjectBody) =>
  o.contacts?.length ||
  o.sections?.length ||
  (o.timeline && !isEmptyObject(o.timeline))

export const ProjectBodyMenu = ({project}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()

  const menuOptions: ProjectBody[] = [
    {
      sections: [...project.sections.what, ...project.sections.where],
      testID: 'ConstructionWorkProjectAboutButton',
      title: ProjectBodyTitle.about,
    },
    {
      sections: project.sections.when,
      timeline: project.timeline,
      testID: 'ConstructionWorkProjectPlanningButton',
      title: ProjectBodyTitle.planning,
    },
    {
      sections: project.sections.work,
      testID: 'ConstructionWorkProjectWorkButton',
      title: ProjectBodyTitle.work,
    },
    {
      sections: project.sections.contact,
      contacts: project.contacts,
      testID: 'ConstructionWorkProjectContactButton',
      title: ProjectBodyTitle.contact,
    },
  ]

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
                body: option,
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
