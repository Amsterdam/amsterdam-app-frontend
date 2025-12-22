import {useCallback} from 'react'
import type {TestProps} from '@/components/ui/types'
import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressTopTaskButton} from '@/modules/address/components/form/AddressTopTaskButton'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {AddressModalName, AddressRouteName} from '@/modules/address/routes'
import {useAddress} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'

export const MyAddressButton = ({testID}: TestProps) => {
  const address = useAddress()
  const {navigate, goBack} = useNavigation()
  const setLocationType = useSetLocationType()

  const onPressAddressButton = useCallback(() => {
    setLocationType('address')

    if (!address) {
      navigate(AddressModalName.myAddressForm)

      return
    }

    goBack()
  }, [setLocationType, address, goBack, navigate])

  return (
    <Row align="between">
      <AddressTopTaskButton
        logName={`BottomSheetAddAddressButton${address?.addressLine1 ? 'SelectAddress' : 'AddAddress'}`}
        onPress={onPressAddressButton}
        testID={testID}
        text={address?.addressLine1 ?? 'Vul een adres in'}
      />
      {!!address && (
        <Button
          label="Wijzig"
          onPress={() => {
            navigate(ModuleSlug.address, {
              screen: AddressRouteName.address,
            })

            setLocationType('address')
          }}
          testID={`${testID}ChangeAddressButton`}
          variant="tertiary"
        />
      )}
    </Row>
  )
}
