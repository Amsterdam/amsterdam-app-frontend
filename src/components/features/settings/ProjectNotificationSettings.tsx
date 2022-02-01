import ChevronRight from '@amsterdam/asc-assets/static/icons/ChevronRight.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {TouchableOpacity, View} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {SettingsContext} from '../../../providers'
import {color} from '../../../tokens'
import {Box, Text} from '../../ui'
import {Switch} from '../../ui/forms'
import {Row, ScrollView} from '../../ui/layout'
import {
  NoNotificationsMessage,
  NoPreviousSubscriptionsMessage,
  ProjectSubscriptionsOverview,
} from './'

export const ProjectNotificationSettings = () => {
  const {changeSettings, settings} = useContext(SettingsContext)
  const notificationSettings = settings?.notifications
  const navigation =
    useNavigation<StackNavigationProp<StackParams, 'Settings'>>()

  const subscribableProjectIds = Object.keys(
    notificationSettings?.projects ?? {},
  )

  // Disabling notifications will unsubscribe all projects
  const toggleNotificationsEnabled = (projectsEnabled: boolean) => {
    const projects = projectsEnabled
      ? notificationSettings?.projects ?? {}
      : Object.fromEntries(
          Object.keys(notificationSettings?.projects ?? {}).map(projectId => [
            projectId,
            false,
          ]),
        )

    changeSettings('notifications', {
      ...notificationSettings,
      projectsEnabled,
      projects,
    })
  }

  return (
    // TODO - add PleaseWait
    <ScrollView>
      <Box insetHorizontal="md" insetVertical="sm">
        <Text small accessibilityRole="header">
          Omgevingsmanager
        </Text>
      </Box>
      <Box
        background="white"
        borderVertical
        insetHorizontal="md"
        insetVertical="sm">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.projectManagerAuthorizedProjects.name)
          }>
          <Row align="between" gutter="md" valign="center">
            <Text large>Uw bouwprojecten</Text>
            <View style={{width: 16, height: 16}}>
              <ChevronRight fill={color.font.regular} />
            </View>
          </Row>
        </TouchableOpacity>
      </Box>
      <Box insetHorizontal="md" insetVertical="sm">
        <Text small accessibilityRole="header">
          Berichten
        </Text>
      </Box>
      <Box
        background="white"
        borderVertical
        insetHorizontal="md"
        insetVertical="sm">
        <Switch
          accessibilityLabel="Ontvang berichten"
          label={<Text large>Ontvang berichten</Text>}
          onValueChange={() =>
            toggleNotificationsEnabled(!notificationSettings?.projectsEnabled)
          }
          value={notificationSettings?.projectsEnabled}
        />
      </Box>
      <Box>
        {!notificationSettings?.projectsEnabled && <NoNotificationsMessage />}
        {notificationSettings?.projectsEnabled &&
        !subscribableProjectIds.length ? (
          <NoPreviousSubscriptionsMessage />
        ) : null}
      </Box>
      {notificationSettings?.projectsEnabled &&
      subscribableProjectIds.length ? (
        <ProjectSubscriptionsOverview
          subscribableProjectIds={subscribableProjectIds}
        />
      ) : null}
    </ScrollView>
  )
}
