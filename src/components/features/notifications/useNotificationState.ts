import {useContext} from 'react'
import {SettingsContext} from '../../../providers'
import {NotificationSettings} from '../../../types'

export const useNotificationState = () => {
  const {changeSettings, settings} = useContext(SettingsContext)
  const notificationSettings =
    settings?.notifications ?? ({} as NotificationSettings)

  const markAsRead = (id: string) => {
    const readIds = notificationSettings.readIds ?? []

    if (!readIds.includes(id)) {
      readIds.push(id)
      changeSettings('notifications', {...notificationSettings, readIds})
    }
  }

  return {markAsRead}
}
