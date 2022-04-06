import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {SettingsSection} from '../'
import {Text} from '../../../ui'
import {Switch} from '../../../ui/forms'
import {
  deactivateAllProjects,
  selectNotificationSettings,
  toggleProjectsEnabled,
} from '../../notifications'

export const NotificationsEnabledSettingsSection = () => {
  const dispatch = useDispatch()
  const [isToggled, setToggled] = useState(false)
  const notificationSettings = useSelector(selectNotificationSettings)

  // Disabling notifications will unsubscribe all projects
  useEffect(() => {
    if (isToggled && notificationSettings.projectsEnabled === false) {
      dispatch(deactivateAllProjects())
    }
  }, [dispatch, isToggled, notificationSettings.projectsEnabled])

  const onToggleSwitch = () => {
    dispatch(toggleProjectsEnabled())
    setToggled(true)
  }

  return (
    <SettingsSection title="Berichten">
      <Switch
        accessibilityLabel="Ontvang berichten"
        label={<Text large>Ontvang berichten</Text>}
        onValueChange={onToggleSwitch}
        value={notificationSettings.projectsEnabled}
      />
    </SettingsSection>
  )
}
