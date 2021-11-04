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
  const [notifications, setNotifications] = useState<
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

  const retrieveProjectsFromAsyncStorage = useCallback(async () => {
    const notificationsFromStorage = await asyncStorage.getData('notifications')
    setNotifications(notificationsFromStorage)
  }, [asyncStorage])

  const addProjectIdToSubscriptions = async () => {
    let notificationsProjects = notifications?.projects
    if (notificationsProjects?.includes(projectId)) {
      notificationsProjects.push(projectId)
      const notificationsWithProject = {
        ...notifications,
        projects: notificationsProjects,
      }
      await asyncStorage.storeData('notifications', notificationsWithProject)
      setNotifications(notificationsWithProject)
    }
  }

  const subscribeToProject = async () => {
    if (notifications) {
      addProjectIdToSubscriptions()
    } else {
      await asyncStorage.storeData('notifications', {projects: [projectId]})
      setNotifications({projects: [projectId]})
    }
  }

  useEffect(() => {
    AsyncStorage.removeItem('notifications')
  }, [])

  useEffect(() => {
    if (FCMToken && notifications?.projects) {
      setDeviceRegistration({
        device_token: FCMToken,
        os_type: Platform.OS,
        projects: notifications.projects,
      })
    }
  }, [FCMToken, notifications?.projects])

  const getFCMTokenIfProjects = useCallback(async () => {
    if (notifications?.projects && notifications.projects.length > 0) {
      const token = await getFCMToken()
      token && setFCMToken(token)
    }
  }, [notifications])

  useEffect(() => {
    getFCMTokenIfProjects()
  }, [getFCMTokenIfProjects])

  useEffect(() => {
    retrieveProjectsFromAsyncStorage()
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
