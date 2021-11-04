import React, {useEffect, useState} from 'react'
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

  useEffect(() => {
    const retrieveNotificationSettings = async () => {
      const settings: NotificationSettings = await asyncStorage.getData(
        'notifications',
      )
      setNotificationSettings(settings)
    }

    retrieveNotificationSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const {data: allProjects, isLoading: allProjectsIsLoading} = useFetch<
    ProjectOverviewItem[]
  >({
    url: getEnvironment().apiUrl + '/projects',
  })

  if (allProjectsIsLoading) {
    return (
      <Box>
        <ActivityIndicator />
      </Box>
    )
  }

  const subscribedProjects = notificationSettings?.projects ?? []

  return (
    <Box background="white" borderVertical>
      {subscribedProjects.length ? (
        subscribedProjects.map((projectId, index) => {
          const project = allProjects?.find(p => p.identifier === projectId)

          return (
            project && (
              <>
                <Row align="between" valign="center" key={project.identifier}>
                  <View>
                    <Text>{project.title}</Text>
                    <Text secondary>{project.subtitle}</Text>
                  </View>
                  <Switch />
                </Row>
                {index < (subscribedProjects.length ?? 0) - 1 && (
                  <View style={styles.line} />
                )}
              </>
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
