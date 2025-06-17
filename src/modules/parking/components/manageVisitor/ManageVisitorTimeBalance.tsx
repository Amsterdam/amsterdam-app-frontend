import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useManageVisitorTimeBalanceMutation} from '@/modules/parking/service'
import {useAlert} from '@/store/slices/alert'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

type Props = {
  isNegative?: boolean
}

type FieldValues = {
  time?: number
}

export const ManageVisitorTimeBalance = ({isNegative}: Props) => {
  const currentPermit = useCurrentParkingPermit()
  const {handleSubmit, watch} = useFormContext<FieldValues>()
  const {goBack} = useNavigation()
  const {setAlert} = useAlert()
  const operator = isNegative ? '-' : '+'

  const time = watch('time')

  const [updateTimeBalance] = useManageVisitorTimeBalanceMutation()

  const onSubmit = handleSubmit(async ({time: timeFieldValue}: FieldValues) => {
    if (!timeFieldValue) {
      return
    }

    await updateTimeBalance({
      report_code: currentPermit.report_code.toString(),
      seconds_to_transfer: isNegative ? -timeFieldValue : timeFieldValue,
    })
      .unwrap()
      .then(() => {
        goBack()
        setAlert(alerts.adjustTimeBalanceSuccess)
      })
      .catch(() => setAlert(alerts.adjustTimeBalanceFailed))
  })

  if (!currentPermit.visitor_account) {
    return null
  }

  return (
    <Column gutter="md">
      <Column gutter="xs">
        <Row align="between">
          <Title
            level="h5"
            testID="ManageVisitorTimeBalanceTitle"
            text="Huidig tijdsaldo"
          />
          <Title
            level="h5"
            testID="ManageVisitorTimeBalanceAmountTitle"
            text={formatTimeDurationToDisplay(
              currentPermit.visitor_account.seconds_remaining,
              'seconds',
              {short: true},
            )}
          />
        </Row>
        <Row align="between">
          <Title
            level="h5"
            testID="ManageVisitorTimeBalanceMutationTitle"
            text="Wijziging"
          />
          <Title
            level="h5"
            testID="ManageVisitorTimeBalanceMutationAmountTitle"
            text={
              time
                ? `${operator} ${formatTimeDurationToDisplay(time, 'seconds', {short: true})}`
                : '-'
            }
          />
        </Row>
      </Column>
      <Row align="between">
        <Title
          level="h4"
          testID="ManageVisitorTimeBalanceMutationTitle"
          text="Nieuw tijdsaldo"
        />
        <Title
          level="h4"
          testID="ManageVisitorTimeBalanceMutationAmountTitle"
          text={formatTimeDurationToDisplay(
            isNegative
              ? currentPermit.visitor_account.seconds_remaining - (time ?? 0)
              : currentPermit.visitor_account.seconds_remaining + (time ?? 0),
            'seconds',
            {short: true},
          )}
        />
      </Row>
      <Button
        label="Tijdsaldo aanpassen"
        onPress={onSubmit}
        testID="ManageVisitorTimeBalanceSubmitButton"
      />
    </Column>
  )
}
