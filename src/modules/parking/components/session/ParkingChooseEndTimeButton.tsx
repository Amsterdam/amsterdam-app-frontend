import {useContext} from 'react'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {useGetCurrentParkingPermit} from '@/modules/parking/hooks/useGetCurrentParkingPermit'
import {ParkingSessionContext} from '@/modules/parking/providers/ParkingSessionProvider'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const ParkingChooseEndTimeButton = () => {
  const {endTime, setBottomSheetVariant} = useContext(ParkingSessionContext)
  const {toggle} = useBottomSheet()
  const {currentPermit, isLoading} = useGetCurrentParkingPermit()

  const {no_endtime = false} = currentPermit || {}

  if (no_endtime) {
    return null
  }

  if (isLoading) {
    return (
      <PleaseWait testID="ParkingSessionEndTimeBottomSheetContentPleaseWait" />
    )
  }

  if (!currentPermit) {
    return (
      <SomethingWentWrong testID="ParkingSessionEndTimeBottomSheetContentSomethingWentWrong" />
    )
  }

  const timeString = endTime
    ? formatDateTimeToDisplay(endTime, false)
    : undefined

  return (
    <TopTaskButton
      border
      iconName="clock"
      iconRightName="chevron-down"
      onPress={() => {
        setBottomSheetVariant(ParkingSessionBottomSheetVariant.endTime)
        toggle()
      }}
      testID="ParkingChooseEndTimeButton"
      text={timeString}
      title={endTime ? 'Eindtijd' : 'Kies eindtijd'}
    />
  )
}
