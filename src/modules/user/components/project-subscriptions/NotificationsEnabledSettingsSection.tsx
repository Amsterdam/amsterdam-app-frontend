import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {UserSection} from '../'
import {
  selectNotificationSettings,
  deactivateAllProjects,
  toggleProjectsEnabled,
} from '../../../../components/features/notifications'
import {Text} from '../../../../components/ui'
import {Switch} from '../../../../components/ui/forms'

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
    <UserSection title="Berichten">
      <Switch
        accessibilityLabel="Ontvang berichten"
        label={<Text large>Ontvang berichten</Text>}
        onValueChange={onToggleSwitch}
        value={notificationSettings.projectsEnabled}
      />
    </UserSection>
  )
}
