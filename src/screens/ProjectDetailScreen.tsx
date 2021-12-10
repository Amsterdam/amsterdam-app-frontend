import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {ArticleOverview} from '../components/features/news'
import {ProjectBodyMenu} from '../components/features/project'
import {
  Box,
  Button,
  Image,
  NonScalingHeaderTitle,
  PleaseWait,
  SingleSelectable,
  Text,
  Title,
} from '../components/ui'
import {Switch} from '../components/ui/forms'
import {Column, Gutter} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {useAsyncStorage, useDeviceRegistration, useFetch} from '../hooks'
import {image, size} from '../tokens'
import {
  NotificationSettings,
  ProjectDetail,
  ProjectManagerSettings,
} from '../types'
import {accessibleText} from '../utils'

type ProjectDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetail'
>

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ProjectDetail'>
  route: ProjectDetailScreenRouteProp
}

export const ProjectDetailScreen = ({navigation, route}: Props) => {
  const asyncStorage = useAsyncStorage()
  const deviceRegistration = useDeviceRegistration()
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >(undefined)
  const [
    projectNotificationSettingHasChanged,
    setProjectNotificationSettingHasChanged,
  ] = useState(false)
  const [projectManagerSettings, setProjectManagerSettings] = useState<
    ProjectManagerSettings | undefined
  >()

  // Retrieve project details from backend
  const {data: project, isLoading} = useFetch<ProjectDetail>({
    url: getEnvironment().apiUrl + '/project/details',
    options: {
      params: {
        id: route.params.id,
      },
    },
  })

  // Check if notifications are being subscribed to for this project.
  // It does a lookup of the project id in the list of projects in settings.
  const subscribed =
    notificationSettings?.projects?.[project?.identifier ?? ''] ?? false

  // Set header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NonScalingHeaderTitle text={project?.title ?? ''} />,
    })
  }, [project?.title, navigation])

  // Retrieve project manager settings from device and save to component state
  useEffect(() => {
    const retrieveProjectManagerSettings = async () => {
      const newProjectManagerSettings: ProjectManagerSettings | undefined =
        await asyncStorage.getData('project-manager')
      setProjectManagerSettings(newProjectManagerSettings)
    }
    retrieveProjectManagerSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Retrieve notification settings from device and save to component state
  useEffect(() => {
    const retrieveNotificationSettings = async () => {
      const newNotificationSetting: NotificationSettings | undefined =
        await asyncStorage.getData('notifications')
      setNotificationSettings(newNotificationSetting)
    }
    retrieveNotificationSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Toggle notification setting for this project
  // Also forces `projectsEnabled` to be true.
  // TODO Move to device registration hook
  const toggleProjectSubscription = (projectId: string) => {
    setNotificationSettings({
      projectsEnabled: true,
      projects: {
        ...notificationSettings?.projects,
        [projectId]: !subscribed,
      },
    })

    setProjectNotificationSettingHasChanged(true)
  }

  // Store notification changes on device and in backend
  const storeNotificationSettings = useCallback(async () => {
    if (notificationSettings === undefined) {
      return
    }

    await asyncStorage.storeData('notifications', notificationSettings)
    await deviceRegistration.store(
      notificationSettings.projectsEnabled
        ? notificationSettings.projects ?? {}
        : {},
    )
  }, [notificationSettings]) // eslint-disable-line react-hooks/exhaustive-deps

  // Watch changes in notification settings
  useEffect(() => {
    projectNotificationSettingHasChanged && storeNotificationSettings()
  }, [projectNotificationSettingHasChanged, storeNotificationSettings])

  return isLoading && !project ? (
    <PleaseWait />
  ) : project ? (
    <ScrollView>
      {project.images && project.images[0].sources.orig.url && (
        <Image
          source={{uri: project.images[0].sources.orig.url}}
          style={styles.image}
        />
      )}
      <Column gutter="md">
        <Box background="white">
          <Column gutter="md">
            {projectManagerSettings?.projects.includes(project.identifier) && (
              <Button
                onPress={() =>
                  navigation.navigate(routes.notification.name, {
                    projectDetails: {
                      articles: project.articles,
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
              value={subscribed}
            />
          </Column>
          <Gutter height={size.spacing.lg} />
          <ProjectBodyMenu project={project} />
        </Box>
        {project.articles.length ? (
          <Box>
            <ArticleOverview articles={project.articles} />
          </Box>
        ) : null}
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
