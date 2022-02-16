import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, {createContext, useContext, useEffect, useState} from 'react'
import {StackParams} from '../../app/navigation'
import {
  Box,
  KeyboardAvoidingView,
  PleaseWait,
  Stepper,
} from '../../components/ui'
import {SettingsContext} from '../../providers'
import {useGetArticlesQuery} from '../../services/articles'
import {color} from '../../tokens'
import {
  ArticleSummary,
  DraftNotification,
  NewWarning,
  ProjectManagerSettings,
  ResponseStatus,
} from '../../types'
import {
  NotificationFormScreen,
  NotificationResponseScreen,
  SelectNewsArticleScreen,
  VerifyNotificationScreen,
  WarningFormScreen,
} from './'

type Context = {
  articles?: ArticleSummary[]
  changeCurrentStep: (value: number) => void
  changeNewsDetails: (value: NewsDetails) => void
  changeNotification: (newNotification: DraftNotification) => void
  changeResponseStatus: (value: ResponseStatus) => void
  changeWarning: (newWarning: NewWarning) => void
  newsDetails?: NewsDetails
  notification?: DraftNotification
  projectDetails: ProjectDetails
  projectManagerSettings?: ProjectManagerSettings
  responseStatus?: ResponseStatus
  warning?: NewWarning
}

type NewsDetails = {
  id: string
  title: string
}

export const NotificationContext = createContext<Context>({} as Context)

type NotificationScreenRouteProp = RouteProp<StackParams, 'Notification'>

export type NotificationStackParams = {
  NotificationForm: undefined
  NotificationResponse: undefined
  SelectNewsArticle: undefined
  VerifyNotification: undefined
  WarningForm: undefined
}

export type ProjectDetails = {
  id: string
  title: string
}

type Props = {
  route: NotificationScreenRouteProp
}

export const CreateNotificationScreen = ({route}: Props) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [newsDetails, setNewsDetails] = useState<NewsDetails>()
  const [notification, setNotification] = useState<DraftNotification>()
  const [projectDetails, setProjectDetails] = useState({} as ProjectDetails)
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>()
  const [warning, setWarning] = useState<NewWarning>()
  const {settings} = useContext(SettingsContext)
  const projectManagerSettings = settings?.['project-manager']

  const changeCurrentStep = (value: number) => setCurrentStep(value)
  const changeNewsDetails = (value: NewsDetails) => setNewsDetails(value)
  const changeNotification = (value: DraftNotification) =>
    setNotification(value)
  const changeResponseStatus = (value: ResponseStatus) =>
    setResponseStatus(value)
  const changeWarning = (value: NewWarning) => setWarning(value)

  const {data: articles, isLoading} = useGetArticlesQuery({
    projectIds: [route.params.projectDetails.id],
  })

  useEffect(() => {
    const {id, title} = route.params.projectDetails
    setProjectDetails({
      id,
      title,
    })
  }, [route])

  if (isLoading) {
    return <PleaseWait />
  }

  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    cardStyle: {
      backgroundColor: color.background.white,
    },
    headerShown: false,
  }

  return (
    <NotificationContext.Provider
      value={{
        articles,
        changeCurrentStep,
        changeNewsDetails,
        changeNotification,
        changeResponseStatus,
        changeWarning,
        newsDetails,
        notification,
        projectDetails,
        projectManagerSettings,
        responseStatus,
        warning,
      }}>
      <KeyboardAvoidingView>
        {currentStep !== 0 && (
          <Box background="grey">
            <Stepper current={currentStep} length={4} />
          </Box>
        )}
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            component={NotificationFormScreen}
            name="NotificationForm"
          />
          <Stack.Screen
            component={SelectNewsArticleScreen}
            name="SelectNewsArticle"
          />
          <Stack.Screen name="WarningForm" component={WarningFormScreen} />
          <Stack.Screen
            component={VerifyNotificationScreen}
            name="VerifyNotification"
          />
          <Stack.Screen
            component={NotificationResponseScreen}
            name="NotificationResponse"
            options={{
              cardStyle: {
                backgroundColor: color.background.app,
              },
            }}
          />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NotificationContext.Provider>
  )
}
