import {useCallback} from 'react'
import type {TestProps} from '@/components/ui/types'
import type {Address} from '@/modules/address/types'
import {Button} from '@/components/ui/buttons/Button'
import {Row} from '@/components/ui/layout/Row'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {AddressTopTaskButton} from '@/modules/address/components/form/AddressTopTaskButton'
import {useModuleBasedSelectedAddress} from '@/modules/address/hooks/useModuleBasedSelectedAddress'
import {AddressModalName, AddressRouteName} from '@/modules/address/routes'
import {ModuleSlug} from '@/modules/slugs'
import {ReduxKey} from '@/store/types/reduxKey'

export const MyAddressButton = ({
  testID,
  onPress,
}: {onPress: (address: Address) => void} & TestProps) => {
  const {navigate} = useNavigation()
  const {setLocationType, myAddress} = useModuleBasedSelectedAddress(
    ReduxKey.address,
  )

  const onPressAddressButton = useCallback(() => {
    if (!myAddress) {
      navigate(AddressModalName.myAddressForm)

      return
    }

    onPress(myAddress)
  }, [onPress, myAddress, navigate])

  return (
    <Row align="between">
      <AddressTopTaskButton
        logName={`BottomSheetAddAddressButton${myAddress?.addressLine1 ? 'SelectAddress' : 'AddAddress'}`}
        onPress={onPressAddressButton}
        testID={testID}
        text={myAddress?.addressLine1 ?? 'Vul een adres in'}
      />
      {!!myAddress && (
        <Button
          label="Wijzig"
          minWidth={90}
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
