import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useCallback, useEffect, useState} from 'react'
import {Platform} from 'react-native'
import {getEnvironment} from '../../environment'
import {useAsyncStorage, useFetch} from '../../hooks'
import {DeviceRegistration, NotificationSettings} from '../../types'
import {encryptWithAES, getFCMToken} from '../../utils'
import {Button, Text} from '../ui'

type Props = {
  projectId: string
}

export const ProjectSubscriptions = ({projectId}: Props) => {
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >()
  const [deviceRegistration, setDeviceRegistration] = useState<
    DeviceRegistration | undefined
  >()
  const [FCMToken, setFCMToken] = useState<string | undefined>()
  const asyncStorage = useAsyncStorage()
  const authToken = encryptWithAES({
    password: '6886b31dfe27e9306c3d2b553345d9e5',
    plaintext: '44755871-9ea6-4018-b1df-e4f00466c723',
  })

  const api = useFetch<DeviceRegistration>({
    url: getEnvironment().apiUrl + '/device_registration',
    options: {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        DeviceAuthorization: authToken,
      }),
      body: JSON.stringify(deviceRegistration),
    },
    onLoad: false,
  })

  const retrieveNotificationSettings = useCallback(async () => {
    const settingsFromStorage = await asyncStorage.getData('notifications')
    setNotificationSettings(settingsFromStorage)
  }, [asyncStorage])

  const storeUpdatedNotificationSettings = async () => {
    const newNotificationSettings: NotificationSettings = {
      ...notificationSettings,
      projects: {
        ...notificationSettings?.projects,
        [projectId]: true,
      },
    }

    await asyncStorage.storeData('notifications', newNotificationSettings)
    setNotificationSettings(newNotificationSettings)
  }

  const subscribeToProject = async () => {
    if (notificationSettings) {
      storeUpdatedNotificationSettings()
    } else {
      await asyncStorage.storeData('notifications', {
        projects: {[projectId]: true},
      })
      setNotificationSettings({projects: {[projectId]: true}})
    }
  }

  useEffect(() => {
    AsyncStorage.removeItem('notifications')
  }, [])

  useEffect(() => {
    if (FCMToken && notificationSettings?.projects) {
      // We only save subscribed projects into our backend
      const subscribedProjects = Object.entries(
        notificationSettings.projects,
      ).reduce((acc, val) => {
        // @ts-ignore
        val[1] && acc.push(val[0])
        return acc
      }, [])

      setDeviceRegistration({
        device_token: FCMToken,
        os_type: Platform.OS,
        projects: subscribedProjects,
      })
    }
  }, [FCMToken, notificationSettings?.projects])

  const getFCMTokenIfProjects = useCallback(async () => {
    if (
      notificationSettings?.projects &&
      Object.keys(notificationSettings.projects).length
    ) {
      const token = await getFCMToken()
      token && setFCMToken(token)
    }
  }, [notificationSettings])

  useEffect(() => {
    getFCMTokenIfProjects()
  }, [getFCMTokenIfProjects])

  useEffect(() => {
    retrieveNotificationSettings()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    deviceRegistration && api.fetchData(deviceRegistration)
  }, [deviceRegistration]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Button
        onPress={subscribeToProject}
        text="Ontvang notificaties voor Brouwersgracht"
      />
      {FCMToken && <Text>FCM-token: {FCMToken}</Text>}
    </>
  )
}
