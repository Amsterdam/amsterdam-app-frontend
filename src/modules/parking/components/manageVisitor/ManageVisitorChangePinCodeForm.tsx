import {useRef} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Platform} from 'react-native'
import type {TextInput} from 'react-native-gesture-handler'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useManageVisitorChangePinCodeMutation} from '@/modules/parking/service'

type ChangePinCodeFormValues = {
  pin_code: string
  pin_code_check: string
}

export const ParkingManageVisitorChangePinCodeForm = () => {
  const form = useForm<ChangePinCodeFormValues>()
  const {handleSubmit, watch} = form
  const {goBack} = useNavigation()
  const pinCode = watch('pin_code')
  const [changePinCode] = useManageVisitorChangePinCodeMutation()
  const currentPermit = useCurrentParkingPermit()
  const pinCodeCheckRef = useRef<TextInput>(null)

  const onSubmit = handleSubmit(({pin_code, pin_code_check}) => {
    if (!currentPermit.visitor_account) {
      return
    }

    return changePinCode({
      pin_code,
      pin_code_check,
      report_code: currentPermit.visitor_account.report_code.toString(),
      pin_current: currentPermit.visitor_account.pin,
    })
      .unwrap()
      .then(goBack)
  })

  if (!currentPermit.visitor_account) {
    return null
  }

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        <TextInputField
          autoFocus
          hasClearButton={false}
          keyboardType="number-pad"
          label="Nieuwe pincode"
          name="pin_code"
          onSubmitEditing={() => {
            pinCodeCheckRef.current?.focus()
          }}
          returnKeyType={Platform.OS === 'android' ? 'next' : 'default'} // TODO on iOS "next" only toggles the keyboard, implement when this is fixed
          rules={{
            required: 'Pincode is verplicht',
            minLength: {
              value: 4,
              message: 'Pincode moet 4 cijfers lang zijn',
            },
            maxLength: {
              value: 4,
              message: 'Pincode moet 4 cijfers lang zijn',
            },
          }}
          testID="ParkingManageVisitorChangePinCodeFormPinCodeInputField"
        />
        <TextInputField
          hasClearButton={false}
          keyboardType="number-pad"
          label="Herhaal nieuwe pincode"
          name="pin_code_check"
          onSubmitEditing={onSubmit}
          ref={pinCodeCheckRef}
          rules={{
            required: 'Herhaal de nieuwe pincode',
            validate: value =>
              value === pinCode || 'De pincodes komen niet overeen',
          }}
          testID="ParkingManageVisitorChangePinCodeFormPinCodeCheckInputField"
        />
        <Column gutter="md">
          <Button
            label="Pincode wijzigen"
            onPress={onSubmit}
            testID="ParkingManageVisitorChangePinCodeFormSubmitButton"
          />
          <Button
            label="Annuleren"
            onPress={goBack}
            testID="ParkingManageVisitorChangePinCodeFormCancelButton"
            variant="secondary"
          />
        </Column>
      </Column>
    </FormProvider>
  )
}
