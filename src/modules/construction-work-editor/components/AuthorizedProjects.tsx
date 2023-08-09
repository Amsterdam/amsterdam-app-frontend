import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {StyleSheet} from 'react-native'
import {Metrics} from 'react-native-safe-area-context'
import {FlatGrid} from 'react-native-super-grid'
import {RootStackParams} from '@/app/navigation/types'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {ProjectCard} from '@/modules/construction-work/components/shared/ProjectCard'
import {ProjectsItem} from '@/modules/construction-work/types'
import {ContactConstructionWorkSupport} from '@/modules/construction-work-editor/components/ContactConstructionWorkSupport'
import {useRegisterConstructionWorkEditor} from '@/modules/construction-work-editor/hooks/useRegisterConstructionWorkEditor'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {useTheme} from '@/themes/useTheme'
import {isApiAuthorizationError} from '@/utils/api'
import {mapImageSources} from '@/utils/image/mapImageSources'

type Navigation = StackNavigationProp<
  RootStackParams,
  ConstructionWorkEditorRouteName.authorizedProjects
>

type ListItemProps = {
  navigation: Navigation
  project: Pick<ProjectsItem, 'identifier' | 'images' | 'subtitle' | 'title'>
}

const ListItem = ({navigation, project}: ListItemProps) => (
  <ProjectCard
    imageSource={mapImageSources(project.images?.[0]?.sources)}
    onPress={() =>
      navigation.navigate(ConstructionWorkEditorRouteName.createMessage, {
        projectId: project.identifier,
        projectTitle: project.title,
      })
    }
    subtitle={project.subtitle ?? undefined}
    testID="ConstructionWorkEditorAuthorizedProjects"
    title={project.title}
  />
)

const ListEmptyMessage = () => (
  <Box insetHorizontal="md">
    <EmptyMessage text="We hebben geen projecten gevonden waarvoor je berichten mag sturen." />
  </Box>
)

type Props = {
  deeplinkId?: string
  initialMetrics?: Metrics | null
}

export const AuthorizedProjects = ({deeplinkId, initialMetrics}: Props) => {
  const navigation = useNavigation<Navigation>()

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
    return <PleaseWait />
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
      keyExtractor={project => project.identifier}
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
