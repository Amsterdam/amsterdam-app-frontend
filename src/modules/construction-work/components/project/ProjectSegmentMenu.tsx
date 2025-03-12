import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useProjectSegmentOptions} from '@/modules/construction-work/hooks/useProjectSegmentOptions'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {Project} from '@/modules/construction-work/types/api'

type Props = {
  project: Project
}

export const ProjectSegmentMenu = ({project}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()

  const menuOptions = useProjectSegmentOptions(project)

  if (menuOptions.length === 0) {
    return null
  }

  return (
    <Column>
      {menuOptions.map(option => {
        const {testID, title} = option

        return (
          <NavigationButton
            key={title}
            onPress={() =>
              navigation.navigate(ConstructionWorkRouteName.projectSegment, {
                body: option,
                screenHeaderTitle: title,
                screenTitle: `${project.title} - ${title}`,
              })
            }
            testID={testID}
            title={title}
          />
        )
      })}
    </Column>
  )
}
