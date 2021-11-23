import {useFocusEffect, useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../../../App'
import {getEnvironment} from '../../../environment'
import {useAsyncStorage, useDeviceRegistration, useFetch} from '../../../hooks'
import {color, size} from '../../../tokens'
import {
  NotificationSettings,
  ProjectOverviewItem,
  SubscribedProjects,
} from '../../../types'
import {accessibleText} from '../../../utils'
import {Attention, Box, Switch, Text, TextButton} from '../../ui'
import {Column, ScrollView} from '../../ui/layout'

export const ProjectNotificationSettings = () => {
  const asyncStorage = useAsyncStorage()
  const deviceRegistration = useDeviceRegistration()
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >(undefined)
  const [
    projectNotificationSettingHasChanged,
    setProjectNotificationSettingHasChanged,
  ] = useState(false)
  const subscribableProjectIds = Object.keys(
    notificationSettings?.projects ?? {},
  )
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectOverview'>>()

  // Retrieve all projects from backend
  // TODO Don’t fetch if notifications disabled
  const {data: allProjects, isLoading} = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
  })

  // Initially retrieve notification settings from device and save to component state
  useEffect(() => {
    const retrieveSettings = async () => {
      const settings: NotificationSettings = await asyncStorage.getData(
        'notifications',
      )
      setNotificationSettings(settings)
    }

    retrieveSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Retrieve notification settings when navigating back to this screen (from projects)
  useFocusEffect(
    useCallback(() => {
      const listener = async () => {
        const settings: NotificationSettings = await asyncStorage.getData(
          'notifications',
        )
        setNotificationSettings(settings)
      }

      listener()

      return () => setProjectNotificationSettingHasChanged(false)
    }, []), // eslint-disable-line react-hooks/exhaustive-deps
  )

  // Toggle enabled notification settings
  const toggleNotificationsEnabled = (projectsEnabled: boolean) => {
    const unsubscribeAllProjectNotifications = (confirmed: boolean) => {
      let projects: SubscribedProjects = notificationSettings?.projects ?? {}

      if (confirmed) {
        projects = Object.fromEntries(
          Object.keys(projects).map(projectId => [projectId, false]),
        )
      }

      setNotificationSettings({
        ...notificationSettings,
        projectsEnabled,
        projects,
      })

      setProjectNotificationSettingHasChanged(true)
    }

    const hasProjectNotificationSubscriptions = Object.entries(
      notificationSettings?.projects ?? {},
    ).some(value => value[1])

    if (projectsEnabled || !hasProjectNotificationSubscriptions) {
      unsubscribeAllProjectNotifications(true)
    } else {
      Alert.alert(
        'Notificaties uitzetten',
        'We zetten de notificaties uit voor al je projecten. Dit kunnen we niet ongedaan maken.',
        [
          {
            style: 'cancel',
            text: 'Annuleren',
          },
          {
            onPress: () => unsubscribeAllProjectNotifications(true),
            style: 'destructive',
            text: 'Ik begrijp het',
          },
        ],
      )
    }
  }

  // Toggle notification settings for a project
  // TODO Move to device registration hook
  const toggleProjectSubscription = (
    projectId: string,
    subscribed: boolean,
  ) => {
    setNotificationSettings({
      ...notificationSettings,
      projects: {
        ...notificationSettings?.projects,
        [projectId]: subscribed,
      },
    })

    setProjectNotificationSettingHasChanged(true)
  }

  // Store changed notification settings on device
  // Clear projects in device registration if project notifications are disabled
  const storeSettings = useCallback(async () => {
    if (notificationSettings === undefined) {
      return
    }

    await asyncStorage.storeData('notifications', {
      ...notificationSettings,
      projectsEnabled: notificationSettings?.projectsEnabled,
    })
    await deviceRegistration.store(
      notificationSettings?.projectsEnabled
        ? notificationSettings.projects ?? {}
        : {},
    )
  }, [notificationSettings]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    projectNotificationSettingHasChanged && storeSettings()
  }, [projectNotificationSettingHasChanged, storeSettings])

  if (isLoading) {
    return (
      <Box>
        <ActivityIndicator />
      </Box>
    )
  }

  return (
    <ScrollView>
      <Box background="white" borderVertical>
        <Switch
          accessibilityLabel="Notificaties"
          label={<Text>Notificaties</Text>}
          onValueChange={() =>
            toggleNotificationsEnabled(!notificationSettings?.projectsEnabled)
          }
          value={notificationSettings?.projectsEnabled}
        />
      </Box>
      <Box>
        {!notificationSettings?.projectsEnabled && (
          <Attention>
            <Text>U ontvangt geen notificaties.</Text>
          </Attention>
        )}
        {notificationSettings?.projectsEnabled &&
        !subscribableProjectIds.length ? (
          <Column gutter="md">
            <Attention>
              <Text>
                Zet notificaties aan op pagina’s van werkzaamheden waar u
                notificaties voor wilt ontvangen.
              </Text>
            </Attention>
            <TextButton
              emphasis
              onPress={() => navigation.navigate('ProjectOverview')}
              text="Naar bouwwerkzaamheden"
            />
          </Column>
        ) : null}
      </Box>
      {notificationSettings?.projectsEnabled &&
      subscribableProjectIds.length ? (
        <Column gutter="sm">
          <View style={styles.customInset}>
            <Text small accessibilityRole="header">
              Projecten
            </Text>
          </View>
          <Box background="white" borderVertical>
            {subscribableProjectIds.map((projectId, index) => {
              const project = allProjects?.find(p => p.identifier === projectId)
              const subscribed =
                notificationSettings?.projects?.[projectId] ?? false

              return (
                project && (
                  <Fragment key={project.identifier}>
                    <Switch
                      accessibilityLabel={accessibleText(
                        project.title,
                        project.subtitle,
                      )}
                      label={
                        <>
                          <Text>{project.title}</Text>
                          <Text secondary small>
                            {project.subtitle}
                          </Text>
                        </>
                      }
                      onValueChange={() =>
                        toggleProjectSubscription(
                          project.identifier,
                          !subscribed,
                        )
                      }
                      value={subscribed}
                    />
                    {index < (subscribableProjectIds.length ?? 0) - 1 && (
                      <View style={styles.line} />
                    )}
                  </Fragment>
                )
              )
            })}
          </Box>
        </Column>
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  customInset: {
    paddingHorizontal: size.spacing.md,
  },
  line: {
    borderBottomColor: color.border.divider,
    borderBottomWidth: 1,
    marginVertical: size.spacing.sm,
  },
})
