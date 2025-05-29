import {useController} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {BottomSheet} from '@/components/ui/containers/BottomSheet'
import {Box} from '@/components/ui/containers/Box'
import {RadioGroup} from '@/components/ui/forms/RadioGroup'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

type Props = {
  isNegative?: boolean
}

const addOptions = [2.5, 4, 8, 12].map(value => ({
  label: '+ ' + value + ' uur',
  value: value * 3600,
}))

const getSubtractOptions = (secondsRemaining: number) => {
  const options = [2, 4, 8, 12]
    .filter(n => n < secondsRemaining / 3600)
    .map(value => ({
      label: '- ' + value + ' uur',
      value: value * 3600,
    }))

  options.push({
    label:
      '- ' +
      formatTimeDurationToDisplay(secondsRemaining, 'seconds', {short: true}),
    value: secondsRemaining,
  })

  return options
}

export const ManageVisitorTimeAddOnBottomSheet = ({isNegative}: Props) => {
  const currentPermit = useCurrentParkingPermit()
  const {
    field: {value: time, onChange},
  } = useController<{time?: number}>({
    name: 'time',
  })
  const {close} = useBottomSheet()
  const subtractOptions = getSubtractOptions(
    currentPermit.visitor_account.seconds_remaining,
  )

  return (
    <BottomSheet testID="ManageVisitorTimeAddOnBottomSheet">
      <Box grow>
        <Column gutter="md">
          <Phrase>
            Beschikbare tijd:{' '}
            {formatTimeDurationToDisplay(
              isNegative
                ? currentPermit.visitor_account.seconds_remaining
                : currentPermit.time_balance,
              'seconds',
              {short: true},
            )}
          </Phrase>
          <RadioGroup
            onChange={onChange}
            options={isNegative ? subtractOptions : addOptions}
            testID="ParkingSessionAmountBottomSheetContentRadioGroup"
            value={time}
          />
          <Button
            label="Gereed"
            onPress={close}
            testID="ParkingSessionAmountBottomSheetContentDoneButton"
          />
        </Column>
      </Box>
    </BottomSheet>
  )
}
