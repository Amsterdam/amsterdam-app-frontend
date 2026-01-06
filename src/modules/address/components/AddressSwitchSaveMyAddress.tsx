import {useCallback} from 'react'
import type {ModuleSlug} from '@/modules/slugs'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useModules} from '@/hooks/useModules'
import {alerts} from '@/modules/address/alerts'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {useSetLocationType} from '@/modules/address/hooks/useSetLocationType'
import {
  addAddress,
  setModuleIsSaveAsMyAddressShown,
} from '@/modules/address/slice'
import {useAlert} from '@/store/slices/alert'

type Props = {
  moduleSlug: ModuleSlug
}

export const AddressSwitchSaveMyAddress = ({moduleSlug}: Props) => {
  const {setAlert} = useAlert()
  const dispatch = useDispatch()
  const {address: moduleAddress} = useSelectedAddress(moduleSlug)
  const setLocationType = useSetLocationType(moduleSlug)
  const {enabledModules} = useModules()

  const onSaveMyAddress = useCallback(() => {
    if (!moduleAddress) {
      return
    }

    dispatch(addAddress(moduleAddress))
    enabledModules?.forEach(({onMyAddressChanged}) => {
      void onMyAddressChanged?.(moduleAddress, dispatch)
    })
    setLocationType('address')

    setAlert(alerts.saveMyAddressSuccess)
  }, [moduleAddress, dispatch, enabledModules, setLocationType, setAlert])

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
            onPress={() =>
              dispatch(
                setModuleIsSaveAsMyAddressShown({
                  moduleSlug,
                  isSaveAsMyAddressShown: true,
                }),
              )
            }
            testID="AddressSwitchDeclineMyAddressButton"
            variant="secondary"
          />
        </Row>
      </Box>
    </Column>
  )
}
