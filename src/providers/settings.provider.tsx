import React, {createContext, useCallback, useEffect, useState} from 'react'
import {useAsyncStorage} from '../hooks'
import {NotificationSettings, ProjectManagerSettings, Settings} from '../types'

const initialState = {
  notifications: undefined,
  'project-manager': undefined,
}

export const SettingsContext = createContext<Settings>(initialState)

export const SettingsProvider = ({children}: {children: React.ReactNode}) => {
  const asyncStorage = useAsyncStorage()
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >()
  const [projectManagerSettings, setProjectManagerSettings] = useState<
    ProjectManagerSettings | undefined
  >()

  const retrieveProjectManagerSettings = useCallback(async () => {
    if (projectManagerSettings === undefined) {
      const newProjectManagerSettings: ProjectManagerSettings | undefined =
        await asyncStorage.getData('project-manager')
      setProjectManagerSettings(newProjectManagerSettings)
    }
  }, [asyncStorage, projectManagerSettings])

  const retrieveNotificationSettings = useCallback(async () => {
    if (projectManagerSettings === undefined) {
      const newNotificationSettings: NotificationSettings | undefined =
        await asyncStorage.getData('notifications')
      setNotificationSettings(newNotificationSettings)
    }
  }, [asyncStorage, projectManagerSettings])

  useEffect(() => {
    retrieveProjectManagerSettings()
  }, [retrieveProjectManagerSettings])

  useEffect(() => {
    retrieveNotificationSettings()
  }, [retrieveNotificationSettings])

  return (
    <SettingsContext.Provider
      value={{
        notifications: notificationSettings,
        'project-manager': projectManagerSettings,
      }}>
      {children}
    </SettingsContext.Provider>
  )
}
