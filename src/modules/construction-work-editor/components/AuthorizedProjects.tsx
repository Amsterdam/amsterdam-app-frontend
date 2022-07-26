import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {Metrics} from 'react-native-safe-area-context'
import {FlatGrid} from 'react-native-super-grid'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui'
import {EmptyMessage} from '@/components/ui/feedback'
import {module as constructionWorkModule} from '@/modules/construction-work'
import {module as constructionWorkEditorModule} from '@/modules/construction-work-editor'
import {authorizedProjectsMock} from '@/modules/construction-work-editor/authorized-projects.mock'
import {ContactConstructionWorkSupport} from '@/modules/construction-work-editor/components'
import {ProjectCard} from '@/modules/construction-work/components/shared'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ProjectsItem} from '@/modules/construction-work/types'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {mapImageSources} from '@/utils'

type Navigation = StackNavigationProp<
  RootStackParams,
  typeof constructionWorkEditorModule.slug
>

type ListItemProps = {
  navigation: Navigation
  project: ProjectsItem
}

const ListItem = ({navigation, project}: ListItemProps) => {
  const environment = useEnvironment()

  return (
    <ProjectCard
      imageSource={mapImageSources(project.images?.[0].sources, environment)}
      onPress={() =>
        navigation.navigate(constructionWorkModule.slug, {
          screen: ConstructionWorkRouteName.project,
          params: {
            id: project.identifier,
          },
        })
      }
      subtitle={project.subtitle ?? undefined}
      title={project.title}
    />
  )
}

const ListEmptyMessage = () => (
  <Box insetHorizontal="md">
    <EmptyMessage text="We hebben geen projecten gevonden waarvoor je berichten mag sturen." />
  </Box>
)

type Props = {
  initialMetrics?: Metrics | null
}

export const AuthorizedProjects = ({initialMetrics}: Props) => {
  const navigation = useNavigation<Navigation>()

  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  const mockProjects = authorizedProjectsMock.map(p => p as ProjectsItem)

  return (
    <FlatGrid
      data={mockProjects}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyboardDismissMode="on-drag"
      keyExtractor={project => project.identifier}
      ListEmptyComponent={ListEmptyMessage}
      renderItem={({item}) => (
        <ListItem navigation={navigation} project={item} />
      )}
      scrollIndicatorInsets={{right: Number.MIN_VALUE}}
      spacing={size.spacing.md}
      ListFooterComponent={ContactConstructionWorkSupport}
      ListFooterComponentStyle={{
        paddingBottom: Math.max(
          initialMetrics?.insets.bottom ?? 0,
          size.spacing.lg,
        ),
      }}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
