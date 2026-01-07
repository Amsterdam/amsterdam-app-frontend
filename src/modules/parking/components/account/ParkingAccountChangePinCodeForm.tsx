import {useRef} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Platform} from 'react-native'
import type {TextInput} from 'react-native-gesture-handler'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {useAddSecureParkingAccount} from '@/modules/parking/hooks/useAddSecureParkingAccount'
import {useParkingAccountChangePinCodeMutation} from '@/modules/parking/service'
import {useCurrentParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {useAlert} from '@/store/slices/alert'

type ChangePinCodeFormValues = {
  pin_code: string
  pin_code_check: string
  pin_current: string
}

const textTransform = (value: string) => value.replace(/\D/g, '')

export const ParkingAccountChangePinCodeForm = () => {
  const form = useForm<ChangePinCodeFormValues>()
  const {handleSubmit, watch, formState} = form
  const {goBack} = useNavigation()
  const pinCode = watch('pin_code')
  const [changePinCode] = useParkingAccountChangePinCodeMutation()
  const pinCodeRef = useRef<TextInput | null>(null)
  const pinCodeCheckRef = useRef<TextInput | null>(null)
  const reportCode = useCurrentParkingAccount()
  const updateSecureParkingAccount = useAddSecureParkingAccount()
  const {setAlert} = useAlert()

  const onSubmit = handleSubmit(({pin_code, pin_code_check, pin_current}) => {
    if (!reportCode) {
      return
    }

    return changePinCode({
      pin_current,
      pin_code,
      pin_code_check,
      report_code: reportCode,
    })
      .unwrap()
      .then(
        () => {
          setAlert(alerts.accountPinCodeChangeSuccess)
          void updateSecureParkingAccount(
            {reportCode, pin: pin_code},
            ParkingPermitScope.permitHolder,
          ).then(goBack)
        },
        (error: {data?: {detail?: string}}) => {
          if (error.data?.detail?.includes('Invalid pin')) {
            form.setError('pin_current', {
              type: 'manual',
              message: 'Pincode klopt niet. Probeer het opnieuw.',
            })
          }
        },
      )
  })

  return (
    <FormProvider {...form}>
      <Column gutter="lg">
        <TextInputField
          autoFocus
          hasClearButton={false}
          keyboardType="number-pad"
          label="Huidige pincode"
          maxLength={4}
          name="pin_current"
          onSubmitEditing={() => {
            pinCodeRef.current?.focus()
          }}
          returnKeyType={Platform.OS === 'android' ? 'next' : 'default'} // TODO on iOS "next" only toggles the keyboard, implement when this is fixed
          rules={{
            required: 'Huidige pincode is verplicht',
          }}
          testID="ParkingAccountChangePinCodeFormCurrentPinCodeInputField"
          textTransform={textTransform}
        />
        <TextInputField
          hasClearButton={false}
          inputInstructions="Kies een pincode van 4 cijfers"
          keyboardType="number-pad"
          label="Nieuwe pincode"
          maxLength={4}
          name="pin_code"
          onSubmitEditing={() => {
            pinCodeCheckRef.current?.focus()
          }}
          ref={pinCodeRef}
          returnKeyType={Platform.OS === 'android' ? 'next' : 'default'} // TODO on iOS "next" only toggles the keyboard, implement when this is fixed
          rules={{
            required: 'Nieuwe pincode is verplicht',
            minLength: {
              value: 4,
              message: 'Uw pincode mag alleen uit 4 cijfers bestaan.',
            },
            maxLength: {
              value: 4,
              message: 'Uw pincode mag alleen uit 4 cijfers bestaan.',
            },
          }}
          testID="ParkingAccountChangePinCodeFormPinCodeInputField"
          textTransform={textTransform}
        />
        <TextInputField
          hasClearButton={false}
          keyboardType="number-pad"
          label="Herhaal nieuwe pincode"
          maxLength={4}
          name="pin_code_check"
          onSubmitEditing={onSubmit}
          ref={pinCodeCheckRef}
          rules={{
            required: 'Herhaal de nieuwe pincode',
            validate: value =>
              value === pinCode || 'De pincodes zijn niet hetzelfde.',
          }}
          testID="ParkingAccountChangePinCodeFormPinCodeCheckInputField"
          textTransform={textTransform}
        />
        <Column gutter="md">
          <Button
            disabled={formState.isSubmitting}
            label="Pincode wijzigen"
            onPress={onSubmit}
            testID="ParkingAccountChangePinCodeFormSubmitButton"
          />
          <Button
            label="Annuleren"
            onPress={goBack}
            testID="ParkingAccountChangePinCodeFormCancelButton"
            variant="secondary"
          />
        </Column>
      </Column>
    </FormProvider>
  )
}
