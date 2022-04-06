import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {StackParams} from '../../app/navigation'
import {routes} from '../../app/navigation/routes'
import {ArticleOverview} from '../../components/features/article'
import {
  selectNotificationSettings,
  toggleProject,
  toggleProjectsEnabled,
} from '../../components/features/notifications'
import {ProjectBodyMenu} from '../../components/features/project'
import {useProjectManagerFetcher} from '../../components/features/project-manager'
import {
  Box,
  Button,
  Image,
  NonScalingHeaderTitle,
  PleaseWait,
  SingleSelectable,
  Text,
  Title,
} from '../../components/ui'
import {Switch} from '../../components/ui/forms'
import {Column, Gutter} from '../../components/ui/layout'
import {useGetProjectQuery} from '../../services'
import {image} from '../../tokens'
import {accessibleText, mapImageSources} from '../../utils'

type ProjectDetailScreenRouteProp = RouteProp<StackParams, 'ProjectDetail'>

type Props = {
  navigation: StackNavigationProp<StackParams, 'ProjectDetail'>
  route: ProjectDetailScreenRouteProp
}

export const ProjectDetailScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch()
  const notificationSettings = useSelector(selectNotificationSettings)
  const {projectManager} = useProjectManagerFetcher()
  const {data: project, isLoading} = useGetProjectQuery({id: route.params.id})

  const isSubscribed =
    project?.identifier && notificationSettings.projects[project.identifier]

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NonScalingHeaderTitle text={project?.title ?? ''} />,
    })
  }, [project?.title, navigation])

  const toggleProjectSubscription = (projectId: string) => {
    if (!notificationSettings.projectsEnabled) {
      dispatch(toggleProjectsEnabled())
    }
    dispatch(toggleProject(projectId))
  }

  return isLoading && !project ? (
    <PleaseWait />
  ) : project ? (
    <ScrollView>
      {project.images.length && (
        <Image
          source={mapImageSources(project.images[0].sources)}
          style={styles.image}
        />
      )}
      <Column gutter="md">
        <Box background="white">
          <Column gutter="md">
            {projectManager?.projects.includes(project.identifier) && (
              <Button
                onPress={() =>
                  navigation.navigate(routes.notification.name, {
                    projectDetails: {
                      id: project.identifier,
                      title: project.title,
                    },
                  })
                }
                text="Verstuur pushbericht"
                variant="inverse"
              />
            )}
            <SingleSelectable
              accessibilityRole="header"
              label={accessibleText(project.title, project.subtitle)}>
              {project.title && <Title text={project.title} />}
              {project.subtitle && <Text intro>{project.subtitle}</Text>}
            </SingleSelectable>
            <Switch
              accessibilityLabel="Ontvang berichten"
              label={<Text>Ontvang berichten</Text>}
              labelPosition="end"
              onValueChange={() =>
                toggleProjectSubscription(project.identifier)
              }
              value={!!isSubscribed}
            />
          </Column>
          <Gutter height="lg" />
          <ProjectBodyMenu project={project} />
        </Box>
        <Box>
          <ArticleOverview projectIds={[project.identifier]} title="Nieuws" />
        </Box>
      </Column>
    </ScrollView>
  ) : null
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
})
