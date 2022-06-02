import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {StyleSheet} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  selectNotificationSettings,
  toggleProjectsEnabled,
  toggleProject,
} from '../../../components/features/notifications'
import {
  NonScalingHeaderTitle,
  PleaseWait,
  Box,
  SingleSelectable,
  Title,
  Button,
  Image,
  Text,
} from '../../../components/ui'
import {Switch} from '../../../components/ui/forms'
import {Column, Gutter, ScrollView} from '../../../components/ui/layout'
import {useEnvironment} from '../../../store'
import {image} from '../../../tokens'
import {mapImageSources, accessibleText} from '../../../utils'
import {ArticleOverview} from '../components/article'
import {ProjectBodyMenu} from '../components/project'
import {useProjectManagerFetcher} from '../components/project-manager'
import {useGetProjectQuery} from '../projects.service'
import {ProjectsRouteName, ProjectsStackParams} from '../routes'

type ProjectDetailScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ProjectsRouteName.projectDetail
>

type Props = {
  navigation: StackNavigationProp<
    ProjectsStackParams,
    ProjectsRouteName.projectDetail
  >
  route: ProjectDetailScreenRouteProp
}

export const ProjectDetailScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch()
  const notificationSettings = useSelector(selectNotificationSettings)
  const {projectManager} = useProjectManagerFetcher()
  const {data: project, isLoading} = useGetProjectQuery({id: route.params.id})

  const isSubscribed = project?.identifier
    ? notificationSettings.projects[project.identifier]
    : undefined

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

  const environment = useEnvironment()

  if (isLoading) {
    return <PleaseWait />
  }

  if (!project) {
    return null
  }

  return (
    <ScrollView>
      {project.images.length && (
        <Image
          source={mapImageSources(project.images[0].sources, environment)}
          style={styles.image}
        />
      )}
      <Column gutter="md">
        <Box background="white">
          <Column gutter="md">
            {!projectManager?.projects.includes(project.identifier) && (
              <Button
                onPress={() =>
                  navigation.navigate(ProjectsRouteName.createNotification, {
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
              value={isSubscribed}
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
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.wide,
    maxWidth: '100%',
    resizeMode: 'cover',
  },
})
