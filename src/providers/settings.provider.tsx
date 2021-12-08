import React, {createContext, useCallback, useEffect, useState} from 'react'
import {useAsyncStorage} from '../hooks'
import {NotificationSettings, ProjectManagerSettings, Settings} from '../types'

const initialState = {
  notifications: undefined,
  'project-manager': undefined,
  changeNotificationSettings: () => {},
}

type Context = {
  changeNotificationSettings: (settings: NotificationSettings) => void
} & Settings

export const SettingsContext = createContext<Context>(initialState)

export const SettingsProvider = ({children}: {children: React.ReactNode}) => {
  const asyncStorage = useAsyncStorage()
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >()
  const [projectManagerSettings, setProjectManagerSettings] = useState<
    ProjectManagerSettings | undefined
  >()

  const changeNotificationSettings = (settings: NotificationSettings) => {
    setNotificationSettings(settings)
  }

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

  const storeNotificationSettings = useCallback(async () => {
    if (notificationSettings === undefined) {
      return
    }

    await asyncStorage.storeData('notifications', notificationSettings)
  }, [notificationSettings]) // eslint-disable-line react-hooks/exhaustive-deps

  const storeProjectManagerSettings = useCallback(async () => {
    if (projectManagerSettings === undefined) {
      return
    }

    await asyncStorage.storeData('project-manager', projectManagerSettings)
  }, [projectManagerSettings]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    retrieveProjectManagerSettings()
  }, [retrieveProjectManagerSettings])

  useEffect(() => {
    retrieveNotificationSettings()
  }, [retrieveNotificationSettings])

  useEffect(() => {
    storeNotificationSettings()
  }, [storeNotificationSettings])

  useEffect(() => {
    storeProjectManagerSettings()
  }, [storeProjectManagerSettings])

  return (
    <SettingsContext.Provider
      value={{
        changeNotificationSettings,
        notifications: notificationSettings,
        'project-manager': projectManagerSettings,
      }}>
      {children}
    </SettingsContext.Provider>
  )
}
