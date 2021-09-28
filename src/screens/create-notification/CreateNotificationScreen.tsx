import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, {createContext, useEffect, useState} from 'react'
import {RootStackParamList} from '../../../App'
import {color} from '../../tokens'
import {NewNotification, NewWarning} from '../../types'
import {
  NotificationFormScreen,
  SelectNewsArticleScreen,
  WarningFormScreen,
} from '.'

export type PushNotificationStackParamList = {
  NotificationForm: undefined
  SelectNewsArticle: undefined
  WarningForm: undefined
}

type PushNotificationScreenRouteProp = RouteProp<
  RootStackParamList,
  'PushNotification'
>

type Props = {
  route: PushNotificationScreenRouteProp
}

type Context = {
  changeNewsId: (id: string) => void
  changeNotification: (newNotification: NewNotification) => void
  changeWarning: (newWarning: NewWarning) => void
  newsId?: string
  notification: NewNotification | undefined
  projectId?: string
  warning: NewWarning | undefined
}

export const PushNotificationContext = createContext<Context>({} as Context)

const screenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: color.background.lighter,
  },
  headerShown: false,
}

export const CreateNotificationScreen = ({route}: Props) => {
  const [projectId, setProjectId] = useState<string>()
  const [newsId, setNewsId] = useState<string>()
  const [notification, setNotification] = useState<NewNotification>()
  const [warning, setWarning] = useState<NewWarning>()

  const Stack = createStackNavigator()

  const changeNotification = (value: NewNotification) => setNotification(value)
  const changeNewsId = (value: string) => setNewsId(value)
  const changeWarning = (value: NewWarning) => setWarning(value)

  useEffect(() => {
    setProjectId(route.params.projectId)
  }, [route])

  return (
    <PushNotificationContext.Provider
      value={{
        changeNewsId,
        changeNotification,
        changeWarning,
        newsId,
        notification,
        projectId,
        warning,
      }}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="NotificationForm"
          component={NotificationFormScreen}
        />
        <Stack.Screen
          name="SelectNewsArticle"
          component={SelectNewsArticleScreen}
        />
        <Stack.Screen name="WarningForm" component={WarningFormScreen} />
      </Stack.Navigator>
    </PushNotificationContext.Provider>
  )
}
