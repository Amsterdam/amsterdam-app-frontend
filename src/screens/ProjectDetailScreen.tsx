import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native'
import {RootStackParamList, routes} from '../../App'
import {NewsArticleOverview} from '../components/features/news'
import {ProjectBodyMenu} from '../components/features/project'
import {
  Box,
  Button,
  Image,
  NonScalingHeaderTitle,
  Switch,
  Text,
  Title,
} from '../components/ui'
import {Gutter, Row} from '../components/ui/layout'
import {getEnvironment} from '../environment'
import {useAsyncStorage, useDeviceRegistration, useFetch} from '../hooks'
import {image, size} from '../tokens'
import {NotificationSettings, ProjectDetail} from '../types'

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
  const [settings, setSettings] = useState<NotificationSettings | undefined>(
    undefined,
  )
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

  // Calculate subscription status for this project
  const subscribed = settings?.projects?.[project?.identifier ?? ''] ?? false

  // Set header title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NonScalingHeaderTitle text={project?.title ?? ''} />,
    })
  }, [project?.title, navigation])

  // Retrieve notification settings from device and save to component state
  useEffect(() => {
    const retrieveSettings = async () => {
      const s: NotificationSettings | undefined = await asyncStorage.getData(
        'notifications',
      )
      setSettings(s)
    }
    retrieveSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Toggle notification setting for this project
  // TODO Move to device registration hook
  const toggleProjectSubscription = (projectId: string) => {
    setSettings({
      projectsEnabled: settings?.projectsEnabled,
      projects: {
        ...settings?.projects,
        [projectId]: !subscribed,
      },
    })

    setProjectNotificationSettingHasChanged(true)
  }

  // Store notification changes on device and in backend
  const storeSettings = useCallback(async () => {
    if (settings === undefined) {
      return
    }

    await asyncStorage.storeData('notifications', settings)
    await deviceRegistration.store(
      settings.projectsEnabled ? settings.projects ?? {} : {},
    )
  }, [settings]) // eslint-disable-line react-hooks/exhaustive-deps

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
        {project.title && <Title text={project.title} />}
        {project.subtitle && <Text intro>{project.subtitle}</Text>}
        {settings?.projectsEnabled && (
          <>
            <Gutter height={size.spacing.md} />
            <Row gutter="sm" valign="center">
              <Switch
                onValueChange={() =>
                  toggleProjectSubscription(project.identifier)
                }
                value={subscribed}
              />
              <Text small>Ontvang notificaties</Text>
            </Row>
          </>
        )}
        <Gutter height={size.spacing.lg} />
        <ProjectBodyMenu project={project} />
      </Box>
      {project.articles.length ? (
        <NewsArticleOverview projectId={project.identifier} />
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
