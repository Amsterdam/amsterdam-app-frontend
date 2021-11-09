import React, {Fragment, useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {getEnvironment} from '../../../environment'
import {useAsyncStorage, useFetch} from '../../../hooks'
import {color, size} from '../../../tokens'
import {NotificationSettings, ProjectOverviewItem} from '../../../types'
import {Box, Switch, Text} from '../../ui'
import {Row} from '../../ui/layout'

export const ManageProjectSubscriptions = () => {
  const asyncStorage = useAsyncStorage()
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >(undefined)

  // Retrieve current notification settings from device and save to component state
  useEffect(() => {
    const retrieveNotificationSettings = async () => {
      const settings: NotificationSettings | undefined =
        await asyncStorage.getData('notifications')
      setNotificationSettings(settings)
    }
    retrieveNotificationSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Retrieve all projects from backend
  const {data: allProjects, isLoading: allProjectsIsLoading} = useFetch<
    ProjectOverviewItem[]
  >({
    url: getEnvironment().apiUrl + '/projects',
  })

  // Toggle notification setting for a project
  const updateNotificationSetting = (projectId: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      projects: {
        ...notificationSettings?.projects,
        [projectId]: value,
      },
    })
  }

  // Store notification changes in device whenever they change
  useEffect(() => {
    notificationSettings &&
      asyncStorage.storeData('notifications', notificationSettings)
  }, [notificationSettings]) // eslint-disable-line react-hooks/exhaustive-deps

  // Prepare an array of project ids from the projects listed in the device settings
  const subscribableProjects =
    Object.keys(notificationSettings?.projects ?? {}) ?? []

  return allProjectsIsLoading ? (
    <Box>
      <ActivityIndicator />
    </Box>
  ) : (
    <Box background="white" borderVertical>
      {subscribableProjects.length ? (
        subscribableProjects.map((projectId, index) => {
          const project = allProjects?.find(p => p.identifier === projectId)
          const subscribed =
            notificationSettings?.projects?.[projectId] ?? false

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
                      updateNotificationSetting(project.identifier, !subscribed)
                    }
                    value={subscribed}
                  />
                </Row>
                {index < (subscribableProjects.length ?? 0) - 1 && (
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
