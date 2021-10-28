import React, {useCallback, useState} from 'react'
import {Box, Button, Text, Title} from '../../components/ui'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {useAsyncStorage} from '../../hooks'

type NotificationSettings = {
  active: Boolean
}

export const SettingsScreen = () => {
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >(undefined)

  const asyncStorage = useAsyncStorage()

  useCallback(async () => {
    const notificationsFromStore = await asyncStorage.getData('notifications')
    setNotificationSettings(notificationsFromStore)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView>
      <Box>
        <Column gutter="md">
          <Title text="Notificaties" />
          <Text>
            U wilt momenteel {notificationSettings?.active ? 'wel ' : 'geen '}
            notificaties ontvangen.
          </Text>
          <Row gutter="md">
            <Button
              onPress={() => setNotificationSettings({active: true})}
              text="Ontvangen"
            />
            <Button
              onPress={() => setNotificationSettings({active: false})}
              text="Niet ontvangen"
            />
          </Row>
        </Column>
      </Box>
    </ScrollView>
  )
}
