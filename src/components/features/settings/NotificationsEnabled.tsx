import React, {useContext} from 'react'
import {SettingsContext} from '../../../providers'
import {Text} from '../../ui'
import {Switch} from '../../ui/forms'
import {SettingsSection} from './SettingsSection'

export const NotificationsEnabled = () => {
  const {changeSettings, settings} = useContext(SettingsContext)
  const notificationsEnabled = settings?.notifications?.projectsEnabled
  const subscribableProjects = settings?.notifications?.projects ?? {}

  // Disabling notifications will unsubscribe all projects
  const toggleNotificationsEnabled = (projectsEnabled: boolean) => {
    const projects = projectsEnabled
      ? subscribableProjects
      : Object.fromEntries(
          Object.keys(subscribableProjects).map(projectId => [
            projectId,
            false,
          ]),
        )

    changeSettings('notifications', {
      ...settings?.notifications,
      projectsEnabled,
      projects,
    })
  }

  return (
    <SettingsSection title="Berichten">
      <Switch
        accessibilityLabel="Ontvang berichten"
        label={<Text large>Ontvang berichten</Text>}
        onValueChange={() => toggleNotificationsEnabled(!notificationsEnabled)}
        value={notificationsEnabled}
      />
    </SettingsSection>
  )
}
