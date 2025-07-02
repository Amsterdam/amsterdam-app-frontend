import {LayoutAnimation} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {AlertProps} from '@/components/ui/feedback/alert/Alert.types'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectIsAutomaticLogoutAlertDismissed,
  setIsAutomaticLogoutAlertDismissed,
} from '@/modules/city-pass/slice'
import {dayjs} from '@/utils/datetime/dayjs'

const alert: AlertProps = {
  title: 'Automatisch uitgelogd',
  text: 'Op 31 juli loggen we je automatisch uit. Dit is nodig om je gegevens veilig te houden.',
  testID: 'CityPassAutomaticLogoutAlert',
  hasCloseIcon: true,
  hasIcon: true,
}

const LOGOUT_DATE = dayjs('2025-07-31T00:00:00Z')
const SHOW_ALERT_DAYS_BEFORE = 21

const shouldShowAlert = () => {
  const now = dayjs()
  const diff = LOGOUT_DATE.diff(now, 'day')

  return diff <= SHOW_ALERT_DAYS_BEFORE && diff > 0
}

export const AutomaticLogoutAlert = () => {
  const dispatch = useDispatch()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()
  const isDismissed = useSelector(selectIsAutomaticLogoutAlertDismissed)

  const onPress = () => {
    if (!isReduceMotionEnabled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }

    if (alert.testID === 'CityPassAutomaticLogoutAlert') {
      dispatch(setIsAutomaticLogoutAlertDismissed(true))
    }
  }

  if (isDismissed || !shouldShowAlert()) {
    return null
  }

  return (
    <Pressable
      onPress={onPress}
      testID="CityPassAutomaticLogoutAlertButton"
      variant="transparent">
      <AlertBase
        {...alert}
        inset="md"
      />
    </Pressable>
  )
}
