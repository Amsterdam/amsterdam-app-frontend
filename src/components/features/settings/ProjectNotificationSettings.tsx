import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {RootStackParamList} from '../../../../App'
import {getEnvironment} from '../../../environment'
import {useAsyncStorage, useDeviceRegistration, useFetch} from '../../../hooks'
import {color, size} from '../../../tokens'
import {NotificationSettings, ProjectOverviewItem} from '../../../types'
import {Attention, Box, Switch, Text, TextButton} from '../../ui'
import {Column, Row, ScrollView} from '../../ui/layout'

export const ProjectNotificationSettings = () => {
  const asyncStorage = useAsyncStorage()
  const deviceRegistration = useDeviceRegistration()
  const [settings, setSettings] = useState<NotificationSettings | undefined>(
    undefined,
  )
  const subscribableProjectIds = Object.keys(settings?.projects ?? {})
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectOverview'>>()

  // Retrieve all projects from backend
  // TODO Don’t fetch if notifications disabled
  const {data: allProjects, isLoading} = useFetch<ProjectOverviewItem[]>({
    url: getEnvironment().apiUrl + '/projects',
  })

  // Retrieve notification settings from device and save to component state
  useEffect(() => {
    const retrieveSettings = async () => {
      const s: NotificationSettings = await asyncStorage.getData(
        'notifications',
      )
      setSettings(s)
    }

    retrieveSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Toggle enabled notification settings
  const toggleEnabledInSettings = (value: boolean) =>
    setSettings({
      ...settings,
      projectsEnabled: value,
    })

  // Toggle notification settings for a project
  // TODO Move to device registration hook
  const toggleProjectSubscription = (
    projectId: string,
    subscribed: boolean,
  ) => {
    setSettings({
      ...settings,
      projects: {
        ...settings?.projects,
        [projectId]: subscribed,
      },
    })
  }

  // Store changed notification settings on device
  // Clear projects in device registration if project notifications are disabled
  const storeSettings = useCallback(async () => {
    if (settings === undefined) {
      return
    }

    await asyncStorage.storeData('notifications', {
      ...settings,
      projectsEnabled: settings?.projectsEnabled,
    })
    await deviceRegistration.store(
      settings?.projectsEnabled ? settings.projects ?? {} : {},
    )
  }, [settings]) // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <ScrollView>
      <Box background="white" borderVertical>
        <Row align="between" valign="center">
          <Text>Notificaties</Text>
          <Switch
            onValueChange={() =>
              toggleEnabledInSettings(!settings?.projectsEnabled)
            }
            value={settings?.projectsEnabled}
          />
        </Row>
      </Box>
      <Box>
        {settings?.projectsEnabled ? (
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
        ) : (
          <Attention>
            <Text>U ontvangt geen notificaties.</Text>
          </Attention>
        )}
      </Box>
      {settings?.projectsEnabled && subscribableProjectIds.length ? (
        <Column gutter="sm">
          <View style={styles.customInset}>
            <Text small>Projecten</Text>
          </View>
          <Box background="white" borderVertical>
            {subscribableProjectIds.map((projectId, index) => {
              const project = allProjects?.find(p => p.identifier === projectId)
              const subscribed = settings?.projects?.[projectId] ?? false

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
                          toggleProjectSubscription(
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
    borderBottomColor: color.border.default,
    borderBottomWidth: 1,
    marginVertical: size.spacing.sm,
  },
})
