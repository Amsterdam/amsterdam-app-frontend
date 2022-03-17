import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {Image} from 'react-native-image-crop-picker'
import {useDispatch, useSelector} from 'react-redux'
import {
  NotificationFormScreen,
  NotificationResponseScreen,
  ProjectWarningFormScreen,
  SelectNewsArticleScreen,
  VerifyMainImageScreen,
  VerifyNotificationScreen,
} from '.'
import {StackParams} from '../../app/navigation'
import {Box, KeyboardAvoidingView, Stepper} from '../../components/ui'
import {Gutter} from '../../components/ui/layout'
import {color} from '../../tokens'
import {
  clearDraft,
  selectStep,
  selectStepperVisibility,
  selectTotalSteps,
  setProject,
} from './notificationDraftSlice'

type NotificationScreenRouteProp = RouteProp<StackParams, 'Notification'>

export type NotificationStackParams = {
  NotificationForm: undefined
  NotificationResponse: undefined
  ProjectWarningForm: undefined
  SelectNewsArticle: undefined
  VerifyMainImage: {image: Image}
  VerifyNotification: undefined
  WritingGuide: undefined
}

type Props = {
  navigation: StackNavigationProp<StackParams, 'Notification'>
  route: NotificationScreenRouteProp
}

export const CreateNotificationScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch()
  const isStepperVisible = useSelector(selectStepperVisibility)
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

  useEffect(() => {
    const focusListener = navigation.addListener('beforeRemove', () => {
      dispatch(clearDraft())
    })
    return focusListener
  }, [dispatch, navigation])

  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    cardStyle: {
      backgroundColor: color.background.white,
    },
    headerShown: false,
  }

  return (
    <KeyboardAvoidingView>
      {isStepperVisible && (
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
          component={VerifyMainImageScreen}
          name="VerifyMainImage"
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
      </Stack.Navigator>
      <Gutter height="xl" />
    </KeyboardAvoidingView>
  )
}
