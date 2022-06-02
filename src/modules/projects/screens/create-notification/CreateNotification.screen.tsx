import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {StackParams} from '../../../../app/navigation'
import {Box, KeyboardAvoidingView, Stepper} from '../../../../components/ui'
import {Gutter} from '../../../../components/ui/layout'
import {color} from '../../../../tokens'
import {ProjectsRouteName, ProjectsStackParams} from '../../routes'
import {
  clearDraft,
  selectStep,
  selectStepperVisibility,
  selectTotalSteps,
  setProject,
} from './notificationDraftSlice'
import {createNotificationRoutes as routes} from './routes'

type NotificationScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ProjectsRouteName.createNotification
>

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
        {Object.entries(routes).map(([key, {name, options, component}]) => (
          <Stack.Screen
            key={key}
            name={name}
            options={options}
            component={component!} //TODO "!" should be removed when component is no longer optional
          />
        ))}
      </Stack.Navigator>
      <Gutter height="xl" />
    </KeyboardAvoidingView>
  )
}
