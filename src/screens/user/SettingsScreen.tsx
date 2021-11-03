import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {RootStackParamList} from '../../../App'
import {
  Attention,
  Box,
  Button,
  Switch,
  Text,
  TextButton,
  Title,
} from '../../components/ui'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {useAsyncStorage} from '../../hooks'

type NotificationSettings = {
  permitted: Boolean
}

export const SettingsScreen = () => {
  // We use the async storage and need to navigate to the project overview
  const asyncStorage = useAsyncStorage()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectOverview'>>()

  // We have a notification settings object as state
  // as wel as the individual setting to permit notifications, bound to the switch
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >(undefined)
  const [notificationsPermitted, setNotificationsPermitted] = useState(false)

  // Retrieve notification settings from async storage
  const retrieveNotificationSettings = useCallback(async () => {
    const notificationsFromStore = await asyncStorage.getData('notifications')
    setNotificationSettings(notificationsFromStore)
  }, [asyncStorage])

  useEffect(() => {
    retrieveNotificationSettings()
  }, [retrieveNotificationSettings])

  // Store notification settings into async storage if permission changes
  useEffect(() => {
    asyncStorage.storeData('notifications', {
      permitted: notificationsPermitted,
    })
  }, [asyncStorage, notificationsPermitted])

  return (
    <ScrollView>
      <Box>
        <Column gutter="md">
          <Title text="Notificaties" />
          <Row gutter="md">
            <Button
              disabled={notificationsPermitted}
              onPress={() => setNotificationsPermitted(true)}
              text="Aan"
            />
            <Button
              disabled={!notificationsPermitted}
              onPress={() => setNotificationsPermitted(false)}
              text="Uit"
            />
          </Row>
          <Switch
            onValueChange={() =>
              setNotificationsPermitted(!notificationsPermitted)
            }
            value={notificationsPermitted}
          />
          {notificationSettings?.permitted ? (
            <Column gutter="md">
              <Attention>
                <Text>
                  Kies projecten van bouwwerkzaamheden bij u in de buurt waarvan
                  u notificaties wilt ontvangen. Notificaties kunt u aanzetten
                  op de pagina van een project.
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
                {notificationSettings?.permitted === false && ' meer'}.
              </Text>
            </Attention>
          )}
        </Column>
      </Box>
    </ScrollView>
  )
}
