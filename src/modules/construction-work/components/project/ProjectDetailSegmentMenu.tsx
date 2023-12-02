import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useProjectDetailSegmentOptions} from '@/modules/construction-work/hooks/useProjectDetailSegmentOptions'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ProjectDetail} from '@/modules/construction-work/types/api'

type Props = {
  project: ProjectDetail
}

export const ProjectDetailSegmentMenu = ({project}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()

  const menuOptions = useProjectDetailSegmentOptions(project)

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
            label={title}
            onPress={() =>
              navigation.navigate(
                ConstructionWorkRouteName.projectDetailSegment,
                {
                  body: option,
                  headerTitle: project.title,
                },
              )
            }
            testID={testID}
          />
        )
      })}
    </Column>
  )
}
