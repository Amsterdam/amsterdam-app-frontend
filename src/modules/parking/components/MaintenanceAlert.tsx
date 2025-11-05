import {LayoutAnimation} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {alerts} from '@/modules/parking/alerts'
import {
  selectIsMaintenanceAlertDismissed,
  setIsMaintenanceAlertDismissed,
} from '@/modules/parking/slice'
import {dayjs} from '@/utils/datetime/dayjs'

const shouldShowAlert = () => {
  const now = dayjs()
  const maintenanceDate = dayjs('2025-11-13T12:00:00+01:00')

  return maintenanceDate.isAfter(now)
}

export const MaintenanceAlert = () => {
  const dispatch = useDispatch()
  const isReduceMotionEnabled = useIsReduceMotionEnabled()
  const isDismissed = useSelector(selectIsMaintenanceAlertDismissed)
  const alert = alerts.maintenanceInfo

  const onPress = () => {
    if (!isReduceMotionEnabled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }

    if (alert.testID === 'ParkingMaintenanceAlert') {
      dispatch(setIsMaintenanceAlertDismissed(true))
    }
  }

  if (isDismissed || !shouldShowAlert()) {
    return null
  }

  return (
    <Pressable
      onPress={onPress}
      testID="ParkingMaintenanceAlertButton"
      variant="transparent">
      <AlertBase
        {...alert}
        hasCloseIcon
        inset="md"
      />
    </Pressable>
  )
}
