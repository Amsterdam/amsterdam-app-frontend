import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, {createContext, useEffect, useState} from 'react'
import {RootStackParamList} from '../../../App'
import {Box, Stepper} from '../../components/ui'
import {color} from '../../tokens'
import {
  NewNotification,
  NewWarning,
  ProjectDetailNewsArticle,
} from '../../types'
import {VerifyNotificationScreen} from './VerifyNotificationScreen'
import {
  NotificationFormScreen,
  SelectNewsArticleScreen,
  WarningFormScreen,
} from '.'

export type NotificationStackParamList = {
  NotificationForm: undefined
  SelectNewsArticle: undefined
  VerifyNotification: undefined
  WarningForm: undefined
}

type NotificationScreenRouteProp = RouteProp<RootStackParamList, 'Notification'>

type Props = {
  route: NotificationScreenRouteProp
}

type Context = {
  changeCurrentStep: (value: number) => void
  changeNewsDetails: (value: NewsDetails) => void
  changeNotification: (newNotification: NewNotification) => void
  changeWarning: (newWarning: NewWarning) => void
  newsDetails?: NewsDetails
  notification: NewNotification | undefined
  projectDetails: ProjectDetails
  warning: NewWarning | undefined
}

export type ProjectDetails = {
  id: string
  news: ProjectDetailNewsArticle[]
  title: string
}

type NewsDetails = {
  newsId: string
  newsTitle: string
}

export const NotificationContext = createContext<Context>({} as Context)

const screenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: color.background.lighter,
  },
  headerShown: false,
}

export const CreateNotificationScreen = ({route}: Props) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectDetails, setProjectDetails] = useState({} as ProjectDetails)
  const [newsDetails, setNewsDetails] = useState<NewsDetails>()
  const [notification, setNotification] = useState<NewNotification>()
  const [warning, setWarning] = useState<NewWarning>()

  const Stack = createStackNavigator()

  const changeCurrentStep = (value: number) => setCurrentStep(value)
  const changeNotification = (value: NewNotification) => setNotification(value)
  const changeNewsDetails = (value: NewsDetails) => setNewsDetails(value)
  const changeWarning = (value: NewWarning) => setWarning(value)

  useEffect(() => {
    const {id, news, title} = route.params.projectDetails
    setProjectDetails({
      id,
      news,
      title,
    })
  }, [route])

  return (
    <NotificationContext.Provider
      value={{
        changeCurrentStep,
        changeNewsDetails,
        changeNotification,
        changeWarning,
        newsDetails,
        notification,
        projectDetails,
        warning,
      }}>
      <Box background="lighter-accent">
        <Stepper current={currentStep} length={3} />
      </Box>
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
        <Stack.Screen
          name="VerifyNotification"
          component={VerifyNotificationScreen}
        />
      </Stack.Navigator>
    </NotificationContext.Provider>
  )
}
