import {LayoutAnimation} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {alerts} from '@/modules/city-pass/alerts'
import {
  selectIsAutomaticLogoutAlertDismissed,
  setIsAutomaticLogoutAlertDismissed,
} from '@/modules/city-pass/slice'
import {dayjs} from '@/utils/datetime/dayjs'

const getNextLogoutDate = () => {
  const now = dayjs()
  let year = now.year()
  const july31 = dayjs()
    .set('month', 7)
    .set('date', 1)
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)

  if (now.isAfter(july31)) {
    year += 1
  }

  return july31.set('year', year)
}

const SHOW_ALERT_DAYS_BEFORE = 21

const shouldShowAlert = () => {
  const now = dayjs()
  const logoutDate = getNextLogoutDate()
  const diff = logoutDate.diff(now, 'day')

  return diff <= SHOW_ALERT_DAYS_BEFORE && diff > 0
}

export const AutomaticLogoutAlert = () => {
  const dispatch = useDispatch()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()
  const isDismissed = useSelector(selectIsAutomaticLogoutAlertDismissed)
  const alert = alerts.automaticLogoutInfo

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
