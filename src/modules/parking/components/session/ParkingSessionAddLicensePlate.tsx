import {useEffect, useState} from 'react'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {Switch} from '@/components/ui/forms/Switch'
import {TextInputField} from '@/components/ui/forms/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {alerts} from '@/modules/parking/alerts'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingSessionAddLicensePlate = () => {
  const {isOpen} = useBottomSheet()
  const [isVisitorNameVisible, setIsVisitorNameVisible] = useState(false)
  const {licensePlates, isLoading} = useGetLicensePlates()

  useEffect(() => {
    if (!isOpen) {
      setIsVisitorNameVisible(false)
    }
  }, [isOpen])

  if (isLoading) {
    return <PleaseWait testID="ParkingSessionAddLicensePlatePleaseWait" />
  }

  return (
    <Column gutter="md">
      <TextInputField
        autoFocus
        inputInstructions="Voer alleen letters en cijfers in."
        label="Kenteken"
        name="vehicle_id"
        rules={{
          required: 'Vul een kenteken in',
          pattern: {
            value: /^[a-zA-Z0-9]*$/,
            message: 'Alleen cijfers en letters zijn toegestaan',
          },
        }}
        testID="ParkingAddLicensePlateFormLicensePlateInputField"
        textTransform={text => text.replace(/[^a-zA-Z0-9]/g, '')}
      />
      <Switch
        accessibilityLabel="Toevoegen aan Mijn kentekens"
        label={<Phrase>Toevoegen aan Mijn kentekens</Phrase>}
        onChange={() => setIsVisitorNameVisible(!isVisitorNameVisible)}
        testID="ParkingSessionAddLicensePlateSaveSwitch"
        value={isVisitorNameVisible}
      />
      {isVisitorNameVisible ? (
        (licensePlates?.length ?? 0) >= MAX_LICENSE_PLATES ? (
          <>
            <Gutter />
            <AlertBase
              {...alerts.maxLicensePlatesWarning}
              hasCloseIcon={false}
            />
          </>
        ) : (
          <TextInputField
            label="Naam"
            name="visitor_name"
            rules={{required: 'Vul een naam in'}}
            testID="ParkingAddLicensePlateFormNameInputField"
          />
        )
      ) : null}
    </Column>
  )
}
