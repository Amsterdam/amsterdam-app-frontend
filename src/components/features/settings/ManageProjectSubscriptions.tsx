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
  const [settings, setSettings] = useState<NotificationSettings | undefined>(
    undefined,
  )
  const projects = settings?.projects
  const subscribableProjectIds = Object.keys(projects ?? {})

  // Retrieve all projects from backend
  // TODO Don’t fetch if notifications disabled
  const {data: allProjects, isLoading} = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
  })

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

  // Toggle notification settings for a project
  // TODO Move to device registration hook
  const toggleProjectSubscription = (
    projectId: string,
    subscribed: boolean,
  ) => {
    setSettings({
      ...settings,
      projects: {
        ...projects,
        [projectId]: subscribed,
      },
    })
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
    storeSettings()
  }, [storeSettings])

  if (isLoading) {
    return (
      <Box>
        <ActivityIndicator />
      </Box>
    )
  }

  if (!settings || settings.projectsEnabled === false) {
    return null
  }

  return subscribableProjectIds.length ? (
    <Box background="white" borderVertical>
      {subscribableProjectIds.map((projectId, index) => {
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
                    toggleProjectSubscription(project.identifier, !subscribed)
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
      })}
    </Box>
  ) : null
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: color.border.default,
    borderBottomWidth: 1,
    marginVertical: size.spacing.sm,
  },
})
