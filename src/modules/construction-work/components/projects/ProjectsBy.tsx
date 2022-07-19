import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {FlatGrid} from 'react-native-super-grid'
import {getAccessibleDistanceText} from './utils/getAccessibleDistanceText'
import {RootStackParams} from '@/app/navigation'
import {Box, PleaseWait, SomethingWentWrong} from '@/components/ui'
import {EmptyMessage} from '@/components/ui/feedback'
import {sortProjects} from '@/modules/construction-work/components/projects'
import {
  ProjectCard,
  ProjectTraits,
} from '@/modules/construction-work/components/shared'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {ProjectsItem} from '@/modules/construction-work/types'
import {DeviceContext} from '@/providers'
import {useEnvironment} from '@/store'
import {useTheme} from '@/themes'
import {accessibleText, mapImageSources} from '@/utils'

const DEFAULT_NO_RESULTS_MESSAGE = 'We hebben geen werkzaamheden gevonden.'

type ListItemProps = {
  navigation: StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
  project: ProjectsItem
  getProjectTraits?: (p: ProjectsItem) => Partial<ProjectsItem>
}

const ListItem = ({navigation, project, getProjectTraits}: ListItemProps) => {
  const environment = useEnvironment()

  let projectTraits
  const traits = getProjectTraits?.(project)

  if (traits) {
    const {followed, meter, strides} = traits
    projectTraits = (
      <ProjectTraits
        accessibilityLabel={accessibleText(
          followed ? 'Volgend' : undefined,
          getAccessibleDistanceText(meter, strides),
        )}
        {...traits}
      />
    )
  }

  return (
    <ProjectCard
      imageSource={mapImageSources(project.images?.[0].sources, environment)}
      kicker={projectTraits}
      onPress={() =>
        navigation.navigate(ConstructionWorkRouteName.project, {
          id: project.identifier,
        })
      }
      subtitle={project.subtitle ?? undefined}
      title={project.title}
    />
  )
}

type ListEmptyMessageProps = {
  text: string
}

const ListEmptyMessage = ({text}: ListEmptyMessageProps) => (
  <Box insetHorizontal="md">
    <EmptyMessage text={text} />
  </Box>
)

type Props = {
  isError: boolean
  isLoading: boolean
  data?: ProjectsItem[]
  listHeader?: JSX.Element
  noResultsMessage?: string
  getProjectTraits?: (p: ProjectsItem) => Partial<ProjectsItem>
}

export const ProjectsBy = ({
  isError,
  isLoading,
  data = [],
  noResultsMessage = DEFAULT_NO_RESULTS_MESSAGE,
  listHeader,
  getProjectTraits,
}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, ConstructionWorkRouteName>
    >()

  const {bottom: paddingBottom} = useSafeAreaInsets()
  const {fontScale} = useContext(DeviceContext)
  const {size} = useTheme()
  const itemDimension = 16 * size.spacing.md * Math.max(fontScale, 1)

  if (isLoading) {
    return <PleaseWait />
  }

  if (isError) {
    return <SomethingWentWrong />
  }

  return (
    <FlatGrid
      contentContainerStyle={{paddingBottom}}
      data={sortProjects(data)}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      keyboardDismissMode="on-drag"
      keyExtractor={project => project.identifier}
      ListEmptyComponent={<ListEmptyMessage text={noResultsMessage} />}
      ListHeaderComponent={listHeader}
      renderItem={({item}) => (
        <ListItem
          navigation={navigation}
          project={item}
          getProjectTraits={getProjectTraits}
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
