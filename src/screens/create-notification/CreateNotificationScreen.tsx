import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {StackParams} from '../../app/navigation'
import {routes} from '../../app/navigation/routes'
import {Box, KeyboardAvoidingView, Stepper} from '../../components/ui'
import {Gutter} from '../../components/ui/layout'
import {color} from '../../tokens'
import {
  selectStep,
  selectTotalSteps,
  setProject,
} from './notificationDraftSlice'
import {
  NotificationFormScreen,
  NotificationResponseScreen,
  ProjectWarningFormScreen,
  SelectMainImageScreen,
  SelectNewsArticleScreen,
  VerifyNotificationScreen,
  WritingGuideScreen,
} from './'

type NotificationScreenRouteProp = RouteProp<StackParams, 'Notification'>

export type NotificationStackParams = {
  NotificationForm: undefined
  NotificationResponse: undefined
  ProjectWarningForm: undefined
  SelectNewsArticle: undefined
  SelectMainImage: undefined
  VerifyNotification: undefined
  WritingGuide: undefined
}

type Props = {
  route: NotificationScreenRouteProp
}

export const CreateNotificationScreen = ({route}: Props) => {
  const dispatch = useDispatch()
  const step = useSelector(selectStep)
  const totalSteps = useSelector(selectTotalSteps)

  useEffect(() => {
    const {id, title} = route.params.projectDetails
    dispatch(
      setProject({
        id,
        title,
      }),
    )
  }, [dispatch, route])

  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    cardStyle: {
      backgroundColor: color.background.white,
    },
    headerShown: false,
  }

  return (
    <KeyboardAvoidingView>
      {step && (
        <Box background="grey">
          <Stepper current={step} length={totalSteps} />
        </Box>
      )}
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          component={NotificationFormScreen}
          name="NotificationForm"
        />
        <Stack.Screen
          component={SelectMainImageScreen}
          name="SelectMainImage"
        />
        <Stack.Screen
          component={SelectNewsArticleScreen}
          name="SelectNewsArticle"
        />
        <Stack.Screen
          component={ProjectWarningFormScreen}
          name="ProjectWarningForm"
        />
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
        <Stack.Screen
          component={WritingGuideScreen}
          name={routes.writingGuide.name}
          options={routes.writingGuide.options}
        />
      </Stack.Navigator>
      <Gutter height="xl" />
    </KeyboardAvoidingView>
  )
}
