import React, {useContext} from 'react'
import {Alert} from 'react-native'
import {SettingsContext} from '../../../providers/settings.provider'
import {ClosableCard, Text, TextButton} from '../../ui'
import {Row} from '../../ui/layout'

export const ClearSettings = () => {
  const {changeSettings, settings} = useContext(SettingsContext)
  const notificationSettings = settings?.notifications ?? {}

  const clearSettings = (key: string) => {
    Alert.alert('Weet je het zeker?', 'Deze instelling wordt gewist.', [
      {
        style: 'cancel',
        text: 'Annuleren',
      },
      {
        onPress: () =>
          changeSettings('notifications', {
            ...notificationSettings,
            [key]: undefined,
          }),
        style: 'destructive',
        text: 'Wissen',
      },
    ])
  }

  return (
    <ClosableCard title="Berichtinstellingen wissen">
      {Object.keys(notificationSettings).map((setting, index) => (
        <Row gutter="md" key={`setting-${index}`}>
          <Text>{setting}</Text>
          <TextButton onPress={() => clearSettings(setting)} text="Wissen" />
        </Row>
      ))}
    </ClosableCard>
  )
}
