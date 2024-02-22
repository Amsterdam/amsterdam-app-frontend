import {StyleSheet} from 'react-native'
import {type Metrics} from 'react-native-safe-area-context'
import {FlatGrid} from 'react-native-super-grid'
import {type NavigationProp} from '@/app/navigation/types'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {ProjectCard} from '@/modules/construction-work/components/shared/ProjectCard'
import {ProjectsItem} from '@/modules/construction-work/types/api'
import {ContactConstructionWorkSupport} from '@/modules/construction-work-editor/components/ContactConstructionWorkSupport'
import {useRegisterConstructionWorkEditor} from '@/modules/construction-work-editor/hooks/useRegisterConstructionWorkEditor'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {useTheme} from '@/themes/useTheme'
import {isApiAuthorizationError} from '@/utils/api'

type ListItemProps = {
  navigation: NavigationProp<ConstructionWorkEditorRouteName>
  project: Pick<ProjectsItem, 'id' | 'image' | 'subtitle' | 'title'>
}

const ListItem = ({navigation, project}: ListItemProps) => (
  <ProjectCard
    imageSource={project.image?.sources}
    onPress={() =>
      navigation.navigate(ConstructionWorkEditorRouteName.createMessage, {
        projectId: project.id,
        screenHeaderTitle: project.title,
      })
    }
    subtitle={project.subtitle ?? undefined}
    testID="ConstructionWorkEditorAuthorizedProjects"
    title={project.title}
  />
)

const ListEmptyMessage = () => (
  <Box insetHorizontal="md">
    <EmptyMessage
      testID="ConstructionWorkEditorAuthorizedProjectsEmptyMessage"
      text="We hebben geen projecten gevonden waarvoor je berichten mag sturen."
    />
  </Box>
)

type Props = {
  deeplinkId?: string
  initialMetrics?: Metrics | null
}

export const AuthorizedProjects = ({deeplinkId, initialMetrics}: Props) => {
  const navigation = useNavigation<ConstructionWorkEditorRouteName>()

  const {fontScale} = useDeviceContext()
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const {
    currentProjectManager,
    isGetProjectManagerFetching,
    getProjectManagerError,
  } = useRegisterConstructionWorkEditor(deeplinkId)

  const authorizedProjects = currentProjectManager?.projects

  if (isGetProjectManagerFetching) {
    return (
      <PleaseWait testID="ConstructionWorkEditorAuthorizedProjectsLoadingSpinner" />
    )
  }

  if (
    getProjectManagerError &&
    !isApiAuthorizationError(getProjectManagerError)
  ) {
    return <SomethingWentWrong />
  }

  if (!authorizedProjects) {
    return null
  }

  return (
    <FlatGrid
      data={authorizedProjects}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyboardDismissMode="on-drag"
      keyExtractor={project => project.id}
      ListEmptyComponent={ListEmptyMessage}
      ListFooterComponent={ContactConstructionWorkSupport}
      ListFooterComponentStyle={{
        paddingBottom: Math.max(
          initialMetrics?.insets.bottom ?? 0,
          size.spacing.lg,
        ),
      }}
      renderItem={({item}) => (
        <ListItem
          navigation={navigation}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          project={item}
        />
      )}
      scrollIndicatorInsets={{right: Number.MIN_VALUE}}
      spacing={size.spacing.md}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
