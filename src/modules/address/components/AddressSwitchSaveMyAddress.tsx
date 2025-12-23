import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {alerts} from '@/modules/address/alerts'
import {useModuleBasedSelectedAddress} from '@/modules/address/hooks/useModuleBasedSelectedAddress'
import {addAddress} from '@/modules/address/slice'
import {useAlert} from '@/store/slices/alert'
import {ReduxKey} from '@/store/types/reduxKey'

export const AddressSwitchSaveMyAddress = ({
  onClose,
  reduxKey,
}: {
  onClose: () => void
  reduxKey: ReduxKey
}) => {
  const {setAlert} = useAlert()
  const dispatch = useDispatch()
  const {address: moduleAddress} = useModuleBasedSelectedAddress(reduxKey)

  const onSaveMyAddress = useCallback(() => {
    if (!moduleAddress) {
      return
    }

    dispatch(addAddress(moduleAddress))

    setAlert(alerts.saveMyAddressSuccess)
    onClose()
  }, [moduleAddress, dispatch, setAlert, onClose])

  return (
    <Column gutter="md">
      <Title
        level="h3"
        text="Wilt u dit adres opslaan als Mijn adres?"
      />
      <Paragraph>
        Met Mijn adres ziet u in de hele app alle informatie die bij dit adres
        hoort. U kunt ook meldingen uit deze buurt krijgen. Dit stelt u in bij
        Mijn profiel.
      </Paragraph>
      <Box
        insetBottom="xl"
        insetTop="smd">
        <Row gutter="smd">
          <Button
            flex={1}
            label="Opslaan"
            onPress={onSaveMyAddress}
            testID="AddressSwitchSaveMyAddressButton"
          />
          <Button
            flex={1}
            label="Nee, later"
            onPress={onClose}
            testID="AddressSwitchDeclineMyAddressButton"
            variant="secondary"
          />
        </Row>
      </Box>
    </Column>
  )
}
