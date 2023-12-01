import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useProjectDetailSubScreenOptions} from '@/modules/construction-work/hooks/useProjectDetailSubScreenOptions'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ProjectDetail} from '@/modules/construction-work/types/api'

type Props = {
  project: ProjectDetail
}

export const ProjectDetailSubScreenMenu = ({project}: Props) => {
  const navigation = useNavigation<ConstructionWorkRouteName>()

  const menuOptions = useProjectDetailSubScreenOptions(project)

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
              navigation.navigate(ConstructionWorkRouteName.projectBody, {
                body: option,
                headerTitle: project.title,
              })
            }
            testID={testID}
          />
        )
      })}
    </Column>
  )
}
