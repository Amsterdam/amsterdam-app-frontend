import {useEffect, useState} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {AlertNegative} from '@/components/ui/feedback/alert/AlertNegative'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {alerts} from '@/modules/parking/alerts'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useManageVisitorAddAccountMutation} from '@/modules/parking/service'
import {useAlert} from '@/store/slices/alert'

export const ManageVisitorCreateAccount = () => {
  const currentPermit = useCurrentParkingPermit()
  const [addAccount, {isError, isLoading, isSuccess}] =
    useManageVisitorAddAccountMutation()

  const [isPressed, setIsPressed] = useState(false)
  const {setAlert} = useAlert()

  useEffect(() => {
    if (isSuccess) {
      setAlert(alerts.createVisitorAccountSuccess)
    }
  }, [isSuccess, setAlert])

  useEffect(() => {
    if (isError) {
      setIsPressed(false)
    }
  }, [isError])

  return (
    <Column gutter="md">
      {!!isError && <AlertNegative {...alerts.createVisitorAccountFailed} />}
      <Title text="Bezoekersaccount" />
      <Paragraph>
        Uw bezoekers plannen en betalen zelf hun parkeersessie. U stelt tijd
        beschikbaar en stuurt de meldcode en pincode.
      </Paragraph>
      <Button
        isError={!!isError}
        isLoading={!!isLoading || !!isPressed}
        label="Nieuw bezoekersaccount"
        onPress={() => {
          setIsPressed(true)

          return addAccount(currentPermit.report_code)
        }}
        testID="ParkingManageVisitorCreateVisitorButton"
      />
    </Column>
  )
}
