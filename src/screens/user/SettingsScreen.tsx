import React, {useCallback, useState} from 'react'
import {Box, Button, Text, Title} from '../../components/ui'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {useAsyncStorage} from '../../hooks'

type PushSettings = {
  active: Boolean
}

export const SettingsScreen = () => {
  const [pushSettings, setPushSettings] = useState<PushSettings | undefined>(
    undefined,
  )

  const asyncStorage = useAsyncStorage()

  useCallback(async () => {
    const pushNotificationsFromStore = await asyncStorage.getData(
      'pushNotifications',
    )
    setPushSettings(pushNotificationsFromStore)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView>
      <Box>
        <Column gutter="md">
          <Title text="Pushnotificaties" />
          <Text>
            U wilt momenteel {pushSettings?.active ? 'wel ' : 'geen '}
            pushnotificaties ontvangen.
          </Text>
          <Row gutter="md">
            <Button
              onPress={() => setPushSettings({active: true})}
              text="Ontvangen"
            />
            <Button
              onPress={() => setPushSettings({active: false})}
              text="Niet ontvangen"
            />
          </Row>
        </Column>
      </Box>
    </ScrollView>
  )
}
