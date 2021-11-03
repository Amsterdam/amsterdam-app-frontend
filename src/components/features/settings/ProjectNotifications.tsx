import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {RootStackParamList} from '../../../../App'
import {Attention, Box, Switch, Text, TextButton} from '../../../components/ui'
import {Column, Row, ScrollView} from '../../../components/ui/layout'
import {useAsyncStorage} from '../../../hooks'

type ProjectNotificationSettings = {
  enabledForProjects: boolean
}

export const ProjectNotifications = () => {
  const asyncStorage = useAsyncStorage()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectOverview'>>()

  const [notificationSettings, setNotificationSettings] = useState<
    ProjectNotificationSettings | undefined
  >(undefined)

  const enabledForProjects = notificationSettings?.enabledForProjects

  useEffect(() => {
    const retrieveNotificationsFromStore = async () => {
      const notificationsFromStore: ProjectNotificationSettings =
        await asyncStorage.getData('notifications')
      setNotificationSettings(notificationsFromStore)
    }

    retrieveNotificationsFromStore()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (enabledForProjects !== undefined) {
      const settings: ProjectNotificationSettings = {
        ...notificationSettings,
        enabledForProjects,
      }

      asyncStorage.storeData('notifications', settings)
    }
  }, [enabledForProjects]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView>
      <Box background="white" borderVertical>
        <Row align="between" valign="center">
          <Text>Notificaties</Text>
          <Switch
            onValueChange={() =>
              setNotificationSettings({
                enabledForProjects: !enabledForProjects,
              })
            }
            value={enabledForProjects}
          />
        </Row>
      </Box>
      <Box>
        {enabledForProjects ? (
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
              {enabledForProjects === false && ' meer'}.
            </Text>
          </Attention>
        )}
      </Box>
    </ScrollView>
  )
}
