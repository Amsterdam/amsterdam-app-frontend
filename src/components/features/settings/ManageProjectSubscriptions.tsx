import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {getEnvironment} from '../../../environment'
import {useAsyncStorage, useDeviceRegistration, useFetch} from '../../../hooks'
import {color, size} from '../../../tokens'
import {NotificationSettings, ProjectOverviewItem} from '../../../types'
import {Box, Switch, Text} from '../../ui'
import {Row} from '../../ui/layout'

// TODO How do we sort the subscriptions?
// TODO Handle deleted projects correctly.

export const ManageProjectSubscriptions = () => {
  const asyncStorage = useAsyncStorage()
  const deviceRegistration = useDeviceRegistration()
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >(undefined)
  const projects = notificationSettings?.projects
  const subscribableProjectIds = Object.keys(projects ?? {})

  // Retrieve all projects from backend
  const {data: allProjects, isLoading} = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
  })

  // Retrieve notification settings from device and save to component state
  useEffect(() => {
    const retrieveNotificationSettings = async () => {
      const settings: NotificationSettings | undefined =
        await asyncStorage.getData('notifications')
      setNotificationSettings(settings)
    }

    retrieveNotificationSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Toggle notification settings for a project
  const updateNotificationSettings = (projectId: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      projects: {
        ...projects,
        [projectId]: value,
      },
    })
  }

  // Store notification changes in device and backend
  const storeNotificationSettings = useCallback(async () => {
    notificationSettings &&
      (await asyncStorage.storeData('notifications', notificationSettings))

    const hasError = await deviceRegistration.store(projects ?? {})
    console.log('Fout:', hasError)
  }, [notificationSettings]) // eslint-disable-line react-hooks/exhaustive-deps

  // Watch changes in notification settings
  useEffect(() => {
    storeNotificationSettings()
  }, [storeNotificationSettings])

  return isLoading ? (
    <Box>
      <ActivityIndicator />
    </Box>
  ) : (
    <Box background="white" borderVertical>
      {subscribableProjectIds.length ? (
        subscribableProjectIds.map((projectId, index) => {
          const project = allProjects?.find(p => p.identifier === projectId)
          const subscribed = projects?.[projectId] ?? false

          return (
            project && (
              <Fragment key={project.identifier}>
                <Row align="between" valign="center">
                  <View>
                    <Text>{project.title}</Text>
                    <Text secondary>{project.subtitle}</Text>
                  </View>
                  <Switch
                    onValueChange={() =>
                      updateNotificationSettings(
                        project.identifier,
                        !subscribed,
                      )
                    }
                    value={subscribed}
                  />
                </Row>
                {index < (subscribableProjectIds.length ?? 0) - 1 && (
                  <View style={styles.line} />
                )}
              </Fragment>
            )
          )
        })
      ) : (
        <Text>Je hebt je nog niet op projecten geabonneerd.</Text>
      )}
    </Box>
  )
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: color.border.default,
    borderBottomWidth: 1,
    marginVertical: size.spacing.sm,
  },
})
