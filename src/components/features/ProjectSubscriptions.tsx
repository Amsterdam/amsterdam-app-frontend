import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useCallback, useEffect, useState} from 'react'
import {Platform} from 'react-native'
import {getEnvironment} from '../../environment'
import {useAsyncStorage, useFetch} from '../../hooks'
import {Notifications, RegisterDeviceForPush} from '../../types'
import {encrypter, getFCMToken} from '../../utils'
import {Button} from '../ui'

type Props = {
  projectId: string
}

export const ProjectSubscriptions = ({projectId}: Props) => {
  const [notifications, setNotifications] = useState<
    Notifications | undefined
  >()
  const [deviceRegistration, setDeviceRegistration] = useState<
    RegisterDeviceForPush | undefined
  >()
  const [FCMToken, setFCMToken] = useState<string | undefined>()
  const asyncStorage = useAsyncStorage()
  const authToken = encrypter({
    mode: 'encrypt',
    password: '6886b31dfe27e9306c3d2b553345d9e5',
    plaintext: '44755871-9ea6-4018-b1df-e4f00466c723',
  })

  const api = useFetch<RegisterDeviceForPush>({
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

  const storeProject = async () => {
    if (notifications) {
      let notificationsProjects = notifications.projects
      notificationsProjects?.indexOf(projectId) === -1 &&
        notificationsProjects.push(projectId)
      const notificationsWithProject = {
        ...notifications,
        projects: notificationsProjects,
      }
      await asyncStorage.storeData('notifications', notificationsWithProject)
      setNotifications(notificationsWithProject)
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

  const subscribeProject = async () => {
    storeProject()
  }

  const getFCMTokenIfProjects = useCallback(async () => {
    if (notifications && notifications.projects.length > 0) {
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
        onPress={() => subscribeProject()}
        text="Ontvang notificaties voor Brouwersgracht"
      />
    </>
  )
}
