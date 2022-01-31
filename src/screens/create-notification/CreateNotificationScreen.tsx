import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, {createContext, useEffect, useState} from 'react'
import {StackParams} from '../../app/navigation'
import {
  Box,
  KeyboardAvoidingView,
  PleaseWait,
  Stepper,
} from '../../components/ui'
import {getEnvironment} from '../../environment'
import {useAsync, useAsyncStorage, useFetch} from '../../hooks'
import {color} from '../../tokens'
import {
  ArticleSummary,
  DraftNotification,
  NewWarning,
  ProjectManagerSettings,
  ResponseStatus,
} from '../../types'
import {NotificationResponseScreen} from './NotificationResponseScreen'
import {VerifyNotificationScreen} from './VerifyNotificationScreen'
import {
  NotificationFormScreen,
  SelectNewsArticleScreen,
  WarningFormScreen,
} from './'

export type NotificationStackParams = {
  NotificationForm: undefined
  NotificationResponse: undefined
  SelectNewsArticle: undefined
  VerifyNotification: undefined
  WarningForm: undefined
}

type NotificationScreenRouteProp = RouteProp<StackParams, 'Notification'>

type Props = {
  route: NotificationScreenRouteProp
}

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

export type ProjectDetails = {
  id: string
  title: string
}

type NewsDetails = {
  id: string
  title: string
}

export const NotificationContext = createContext<Context>({} as Context)

const screenOptions: StackNavigationOptions = {
  cardStyle: {
    backgroundColor: color.background.white,
  },
  headerShown: false,
}

export const CreateNotificationScreen = ({route}: Props) => {
  const asyncStorage = useAsyncStorage()
  const [currentStep, setCurrentStep] = useState(1)
  const [projectDetails, setProjectDetails] = useState({} as ProjectDetails)
  const [newsDetails, setNewsDetails] = useState<NewsDetails>()
  const [notification, setNotification] = useState<DraftNotification>()
  const [responseStatus, setResponseStatus] = useState<ResponseStatus>()
  const [warning, setWarning] = useState<NewWarning>()
  const [projectManagerSettings, setProjectManagerSettings] =
    useState<ProjectManagerSettings>()
  const [articles, setArticles] = useState<ArticleSummary[]>()

  const Stack = createStackNavigator()

  const changeCurrentStep = (value: number) => setCurrentStep(value)
  const changeNotification = (value: DraftNotification) =>
    setNotification(value)
  const changeNewsDetails = (value: NewsDetails) => setNewsDetails(value)
  const changeResponseStatus = (value: ResponseStatus) =>
    setResponseStatus(value)
  const changeWarning = (value: NewWarning) => setWarning(value)
  const [articlesFetched, setArticlesFetched] = useState(false)

  const articlesApi = useFetch<ArticleSummary[]>({
    url: getEnvironment().apiUrl + '/articles',
    options: {
      params: {'project-ids': projectDetails.id},
    },
    onLoad: false,
  })

  useEffect(() => {
    const {id, title} = route.params.projectDetails
    setProjectDetails({
      id,
      title,
    })
  }, [route])

  useEffect(() => {
    projectDetails && articlesApi.fetchData()
  }, [projectDetails]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (articlesApi.data) {
      setArticles(articlesApi.data)
      setArticlesFetched(true)
    }
  }, [articlesApi.data])

  useAsync(
    () => asyncStorage.getValue('project-manager'),
    setProjectManagerSettings,
  )

  if (!articlesFetched) {
    return <PleaseWait />
  }

  return (
    <NotificationContext.Provider
      value={{
        changeCurrentStep,
        changeNewsDetails,
        changeNotification,
        changeResponseStatus,
        changeWarning,
        articles,
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
            <Stepper current={currentStep} length={3} />
          </Box>
        )}
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
          <Stack.Screen
            name="NotificationResponse"
            component={NotificationResponseScreen}
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
