import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback, useEffect, useState} from 'react'
import {RootStackParamList} from '../../../App'
import {
  Attention,
  Box,
  Button,
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
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >(undefined)

  const asyncStorage = useAsyncStorage()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectOverview'>>()

  const retrieveNotificationSettings = useCallback(async () => {
    const notificationsFromStore = await asyncStorage.getData('notifications')
    setNotificationSettings(notificationsFromStore)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    asyncStorage.storeData('notifications', notificationSettings)
  }, [asyncStorage, notificationSettings])

  useEffect(() => {
    retrieveNotificationSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView>
      <Box>
        <Column gutter="md">
          <Title text="Notificaties" />
          <Row gutter="md">
            <Button
              onPress={() => setNotificationSettings({permitted: true})}
              text="Aan"
            />
            <Button
              onPress={() => setNotificationSettings({permitted: false})}
              text="Uit"
            />
          </Row>
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
