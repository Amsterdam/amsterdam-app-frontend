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

type GetOptionsParams = {
  secondsRemaining?: number
  timeBalance?: number
}

const getOptions = ({timeBalance, secondsRemaining}: GetOptionsParams) => {
  const optionsArray = [2, 4, 8, 12]
  const options = optionsArray
    .filter(n =>
      timeBalance
        ? n < timeBalance / 3600
        : secondsRemaining && n < secondsRemaining / 3600,
    )
    .map(value => ({
      label: (timeBalance ? '+ ' : '- ') + value + ' uur',
      value: value * 3600,
    }))

  if (
    secondsRemaining ||
    (timeBalance && timeBalance < optionsArray[0] * 3600)
  ) {
    options.push({
      label:
        (timeBalance ? '+ ' : '- ') +
        formatTimeDurationToDisplay(
          timeBalance ?? secondsRemaining ?? 0,
          'seconds',
          {short: true},
        ),
      value: timeBalance ?? secondsRemaining ?? 0,
    })
  }

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
            options={getOptions(
              isNegative
                ? {
                    secondsRemaining:
                      currentPermit.visitor_account.seconds_remaining,
                  }
                : {
                    timeBalance: currentPermit.time_balance,
                  },
            )}
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
