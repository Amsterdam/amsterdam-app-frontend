import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {RootStackParamList} from '../../../../App'
import {Attention, Box, Switch, Text, TextButton} from '../../../components/ui'
import {Column, Row, ScrollView} from '../../../components/ui/layout'
import {useAsyncStorage} from '../../../hooks'

type ProjectNotificationSettings = {
  projectWarnings: {
    permitted: boolean
  }
}

export const ProjectNotifications = () => {
  // We use the async storage and need to navigate to the project overview
  const asyncStorage = useAsyncStorage()
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectOverview'>>()

  // We have a notification settings object as state
  // as wel as the individual setting to permit notifications, bound to the switch
  const [notificationSettings, setNotificationSettings] = useState<
    ProjectNotificationSettings | undefined
  >(undefined)

  const projectWarningsPermitted =
    notificationSettings?.projectWarnings?.permitted

  // Retrieve notification settings from async storage
  useEffect(() => {
    const retrieveNotificationsFromStore = async () => {
      const notificationsFromStore: ProjectNotificationSettings =
        await asyncStorage.getData('notifications')
      setNotificationSettings(notificationsFromStore)
    }

    retrieveNotificationsFromStore()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Store notification settings into async storage if permission changes
  useEffect(() => {
    if (projectWarningsPermitted !== undefined) {
      const settings: ProjectNotificationSettings = {
        ...notificationSettings,
        projectWarnings: {
          permitted: projectWarningsPermitted,
        },
      }

      asyncStorage.storeData('notifications', settings)
    }
  }, [projectWarningsPermitted]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView>
      <Box background="white" borderVertical>
        <Row align="between" valign="center">
          <Text>Notificaties</Text>
          <Switch
            onValueChange={() =>
              setNotificationSettings({
                projectWarnings: {
                  permitted: !projectWarningsPermitted,
                },
              })
            }
            value={projectWarningsPermitted}
          />
        </Row>
      </Box>
      <Box>
        {projectWarningsPermitted ? (
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
              {projectWarningsPermitted === false && ' meer'}.
            </Text>
          </Attention>
        )}
      </Box>
    </ScrollView>
  )
}
