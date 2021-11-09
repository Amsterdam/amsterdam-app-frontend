import React, {useCallback, useEffect, useState} from 'react'
import {Platform} from 'react-native'
import {getEnvironment} from '../../environment'
import {useAsyncStorage, useFetch} from '../../hooks'
import {size} from '../../tokens'
import {DeviceRegistration, NotificationSettings} from '../../types'
import {encryptWithAES, getFCMToken} from '../../utils'
import {Button, Text} from '../ui'
import {Gutter} from '../ui/layout'

type Props = {
  projectId: string
}

export const ProjectSubscriptions = ({projectId}: Props) => {
  const asyncStorage = useAsyncStorage()
  const [notificationSettings, setNotificationSettings] = useState<
    NotificationSettings | undefined
  >()
  const [deviceRegistration, setDeviceRegistration] = useState<
    DeviceRegistration | undefined
  >()
  const [FCMToken, setFCMToken] = useState<string | undefined>()
  const authToken = encryptWithAES({
    password: '6886b31dfe27e9306c3d2b553345d9e5',
    plaintext: '44755871-9ea6-4018-b1df-e4f00466c723',
  })

  // Post device registration to backend
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

  // Retrieve current notification settings from device and save to component state
  const retrieveNotificationSettings = async () => {
    const settings: NotificationSettings | undefined =
      await asyncStorage.getData('notifications')
    setNotificationSettings(settings)
  }

  // Store notification changes in device and save to component state
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
      {FCMToken && (
        <>
          <Gutter height={size.spacing.md} />
          <Text>{FCMToken}</Text>
        </>
      )}
    </>
  )
}
