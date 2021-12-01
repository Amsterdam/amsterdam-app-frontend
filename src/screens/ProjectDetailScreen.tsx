import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {ArticleOverview} from '../components/features/news'
import {ProjectBodyMenu} from '../components/features/project'
import {
  Box,
  Button,
  Image,
  NonScalingHeaderTitle,
  SingleSelectable,
  Text,
  Title,
} from '../components/ui'
import {Switch} from '../components/ui/forms'
import {Gutter} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {useAsyncStorage, useDeviceRegistration, useFetch} from '../hooks'
import {image, size} from '../tokens'
import {NotificationSettings, ProjectDetail} from '../types'
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

  // Retrieve notification settings from device and save to component state
  useEffect(() => {
    const retrieveSettings = async () => {
      const settings: NotificationSettings | undefined =
        await asyncStorage.getData('notifications')
      setNotificationSettings(settings)
    }
    retrieveSettings()
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
  const storeSettings = useCallback(async () => {
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
    projectNotificationSettingHasChanged && storeSettings()
  }, [projectNotificationSettingHasChanged, storeSettings])

  return isLoading && !project ? (
    <Box>
      <ActivityIndicator />
    </Box>
  ) : project ? (
    <ScrollView>
      {project.images && project.images[0].sources.orig.url && (
        <Image
          source={{uri: project.images[0].sources.orig.url}}
          style={styles.image}
        />
      )}
      <Box background="white">
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
          text="Verstuur notificatie"
          variant="inverse"
        />
        <Gutter height={size.spacing.md} />
        <SingleSelectable
          accessibilityRole="header"
          label={accessibleText(project.title, project.subtitle)}>
          {project.title && <Title text={project.title} />}
          {project.subtitle && <Text intro>{project.subtitle}</Text>}
        </SingleSelectable>
        <Gutter height={size.spacing.md} />
        <Switch
          accessibilityLabel="Ontvang notificaties"
          label={<Text>Ontvang notificaties</Text>}
          labelPosition="end"
          onValueChange={() => toggleProjectSubscription(project.identifier)}
          value={subscribed}
        />
        <Gutter height={size.spacing.lg} />
        <ProjectBodyMenu project={project} />
      </Box>
      {project.articles.length ? (
        <ArticleOverview
          articles={project.articles}
          tempProjectId={project.identifier}
        />
      ) : null}
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
