import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  selectNotificationSettings,
  toggleProject,
  toggleProjectsEnabled,
} from '@/components/features/notifications'
import {Box, Button, PleaseWait, SingleSelectable, Text} from '@/components/ui'
import {Switch} from '@/components/ui/forms'
import {Column, Gutter, ScrollView} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {ArticleOverview} from '@/modules/construction-work/components/article'
import {ProjectBodyMenu} from '@/modules/construction-work/components/project'
import {useProjectManagerFetcher} from '@/modules/construction-work/components/project-manager'
import {ProjectTraits} from '@/modules/construction-work/components/shared'
import {useGetProjectQuery} from '@/modules/construction-work/construction-work.service'
import {
  ConstructionWorkRouteName,
  ProjectsStackParams,
} from '@/modules/construction-work/routes'
import {useEnvironment} from '@/store'
import {accessibleText, mapImageSources} from '@/utils'

type ProjectScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ConstructionWorkRouteName.project
>

type Props = {
  navigation: StackNavigationProp<
    ProjectsStackParams,
    ConstructionWorkRouteName.project
  >
  route: ProjectScreenRouteProp
}

export const ProjectScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch()

  const notificationSettings = useSelector(selectNotificationSettings)
  const {projectManager} = useProjectManagerFetcher()
  const {data: project, isLoading} = useGetProjectQuery({id: route.params.id})

  const isSubscribed = project?.identifier
    ? notificationSettings.projects[project.identifier]
    : undefined

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: project?.title,
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
          aspectRatio="wide"
          source={mapImageSources(project.images[0].sources, environment)}
        />
      )}
      <Column gutter="md">
        <Box background="white">
          <Column gutter="md">
            {projectManager?.projects.includes(project.identifier) && (
              <Button
                onPress={() =>
                  navigation.navigate(
                    ConstructionWorkRouteName.createNotification,
                    {
                      project: {
                        id: project.identifier,
                        title: project.title,
                      },
                    },
                  )
                }
                text="Verstuur pushbericht"
                variant="inverse"
              />
            )}
            <SingleSelectable
              accessibilityRole="header"
              label={accessibleText(project.title, project.subtitle)}>
              <Column gutter="sm">
                <ProjectTraits projectId={project.identifier} />
                {project.title && <Title text={project.title} />}
                {project.subtitle && (
                  <Title level="h4" text={project.subtitle} />
                )}
              </Column>
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
