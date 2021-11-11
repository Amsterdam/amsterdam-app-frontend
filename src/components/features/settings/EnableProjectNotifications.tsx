import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {RootStackParamList} from '../../../../App'
import {Attention, Box, Switch, Text, TextButton} from '../../../components/ui'
import {Column, Row, ScrollView} from '../../../components/ui/layout'
import {useAsyncStorage, useDeviceRegistration} from '../../../hooks'
import {NotificationSettings} from '../../../types'

export const EnableProjectNotifications = () => {
  const asyncStorage = useAsyncStorage()
  const deviceRegistration = useDeviceRegistration()
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >(undefined)
  const projectsEnabled = notificationSettings?.projectsEnabled
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectOverview'>>()

  // Retrieve notification settings from device and save to component state
  useEffect(() => {
    const retrieveNotificationsFromStore = async () => {
      const notificationsFromStore: NotificationSettings =
        await asyncStorage.getData('notifications')
      setNotificationSettings(notificationsFromStore)
    }

    retrieveNotificationsFromStore()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // TODO Extract toggle function here

  // Store notification changes in device and backend
  const storeNotificationSettings = useCallback(async () => {
    if (notificationSettings !== undefined) {
      const newSettings: NotificationSettings = {
        ...notificationSettings,
        projectsEnabled,
      }

      await asyncStorage.storeData('notifications', newSettings)

      // Clear projects in device registration if project notifications are disabled
      const hasError = await deviceRegistration.store(
        projectsEnabled ? notificationSettings.projects ?? {} : {},
      )
      console.log('Fout:', hasError)
    }
  }, [projectsEnabled]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    storeNotificationSettings()
  }, [storeNotificationSettings])

  return (
    <ScrollView>
      <Box background="white" borderVertical>
        <Row align="between" valign="center">
          <Text>Notificaties</Text>
          <Switch
            onValueChange={() =>
              setNotificationSettings({
                ...notificationSettings,
                projectsEnabled: !projectsEnabled,
              })
            }
            value={projectsEnabled}
          />
        </Row>
      </Box>
      <Box>
        {projectsEnabled ? (
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
            <Text>
              U ontvangt geen notificaties
              {projectsEnabled === false && ' meer'}.
            </Text>
          </Attention>
        )}
      </Box>
    </ScrollView>
  )
}
