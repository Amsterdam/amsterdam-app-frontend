import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {RootStackParamList} from '../../../../App'
import {Attention, Box, Switch, Text, TextButton} from '../../../components/ui'
import {Column, Row, ScrollView} from '../../../components/ui/layout'
import {useAsyncStorage} from '../../../hooks'
import {NotificationSettings} from '../../../types'

export const EnableProjectNotifications = () => {
  const asyncStorage = useAsyncStorage()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectOverview'>>()

  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >(undefined)

  useEffect(() => {
    const retrieveNotificationsFromStore = async () => {
      const notificationsFromStore: NotificationSettings =
        await asyncStorage.getData('notifications')
      setNotificationSettings(notificationsFromStore)
    }

    retrieveNotificationsFromStore()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (notificationSettings?.projectsEnabled !== undefined) {
      const settings: NotificationSettings = {
        ...notificationSettings,
        projectsEnabled: notificationSettings?.projectsEnabled,
      }

      asyncStorage.storeData('notifications', settings)
    }
  }, [notificationSettings?.projectsEnabled]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView>
      <Box background="white" borderVertical>
        <Row align="between" valign="center">
          <Text>Notificaties</Text>
          <Switch
            onValueChange={() =>
              setNotificationSettings({
                ...notificationSettings,
                projectsEnabled: !notificationSettings?.projectsEnabled,
              })
            }
            value={notificationSettings?.projectsEnabled}
          />
        </Row>
      </Box>
      <Box>
        {notificationSettings?.projectsEnabled ? (
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
              {notificationSettings?.projectsEnabled === false && ' meer'}.
            </Text>
          </Attention>
        )}
      </Box>
    </ScrollView>
  )
}
