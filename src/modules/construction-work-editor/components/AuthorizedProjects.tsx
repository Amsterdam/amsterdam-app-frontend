import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import {RootStackParams} from '@/app/navigation'
import {Attention, Box, PleaseWait} from '@/components/ui'
import {EmptyMessage} from '@/components/ui/feedback'
import {Paragraph} from '@/components/ui/text'
import {module as constructionWorkModule} from '@/modules/construction-work'
import {authorizedProjectsMock} from '@/modules/construction-work-editor/authorized-projects.mock'
import {useProjectManager} from '@/modules/construction-work-editor/hooks'
import {ProjectCard} from '@/modules/construction-work/components/shared'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ProjectsItem} from '@/modules/construction-work/types'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {mapImageSources} from '@/utils'

type ListItemProps = {
  navigation: StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
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
    <EmptyMessage text="We hebben geen projecten gevonden waarvoor je pushberichten mag sturen." />
  </Box>
)

export const AuthorizedProjects = () => {
  const {authorizedProjects, isLoadingProjects, projectManager} =
    useProjectManager()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
    >()

  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  console.log(projectManager)
  // if (!projectManager) {
  if (false) {
    return (
      <Box>
        <Attention warning>
          <Paragraph>
            U bent niet gemachtigd om pushberichten te sturen.
          </Paragraph>
        </Attention>
      </Box>
    )
  }

  if (isLoadingProjects) {
    return <PleaseWait />
  }

  // if (!authorizedProjects) {
  if (false) {
    return (
      <Box>
        <Attention warning>
          <Paragraph>Geen projecten gevonden.</Paragraph>
        </Attention>
      </Box>
    )
  }

  const mockProjects = authorizedProjectsMock.map(p => p as ProjectsItem)

  return (
    <FlatGrid
      data={authorizedProjects ?? mockProjects}
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
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-start',
  },
})
