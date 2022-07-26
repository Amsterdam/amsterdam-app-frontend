import {RouteProp} from '@react-navigation/core'
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Box, Stepper} from '@/components/ui'
import {Screen} from '@/components/ui/layout'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'
import {
  clearDraft,
  selectStep,
  selectStepperVisibility,
  selectTotalSteps,
  setProject,
} from '@/modules/construction-work/screens/create-notification/notificationDraftSlice'
import {createNotificationRoutes} from '@/modules/construction-work/screens/create-notification/routes'
import {useTheme} from '@/themes'

type NotificationScreenRouteProp = RouteProp<
  ConstructionWorkStackParams,
  ConstructionWorkRouteName.createNotification
>

type Props = {
  navigation: StackNavigationProp<
    ConstructionWorkStackParams,
    ConstructionWorkRouteName.createNotification
  >
  route: NotificationScreenRouteProp
}

export const CreateNotificationScreen = ({navigation, route}: Props) => {
  const {color} = useTheme()
  const dispatch = useDispatch()
  const isStepperVisible = useSelector(selectStepperVisibility)
  const step = useSelector(selectStep)
  const totalSteps = useSelector(selectTotalSteps)

  useEffect(() => {
    const {id, title} = route.params.project
    dispatch(
      setProject({
        id,
        title,
      }),
    )
  }, [dispatch, route])

  useEffect(() => {
    return navigation.addListener('beforeRemove', () => {
      dispatch(clearDraft())
    })
  }, [dispatch, navigation])

  const Stack = createStackNavigator()

  const screenOptions: StackNavigationOptions = {
    cardStyle: {
      backgroundColor: color.box.background.white,
    },
    headerShown: false,
  }

  return (
    <Screen keyboardAware>
      {!!isStepperVisible && (
        <Box background="grey">
          <Stepper current={step} length={totalSteps} />
        </Box>
      )}
      <Stack.Navigator screenOptions={screenOptions}>
        {Object.entries(createNotificationRoutes).map(
          ([key, createNotificationRoute]) => (
            <Stack.Screen key={key} {...createNotificationRoute} />
          ),
        )}
      </Stack.Navigator>
    </Screen>
  )
}
