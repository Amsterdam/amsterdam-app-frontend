import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useOpenSurveyOnBlur} from '@/modules/survey/exports/useOpenSurveyOnBlur'
import {WasteCardSvg} from '@/modules/waste-container/assets/images/WasteCardSvg'
import {WasteCardDirections} from '@/modules/waste-container/components/WasteCardDirections'
import {WasteCardHelpButton} from '@/modules/waste-container/components/WasteCardHelpButton'
import {WasteCardMenu} from '@/modules/waste-container/components/WasteCardMenu'
import {WasteContainerBottomSheetVariant} from '@/modules/waste-container/components/bottomsheet/bottomsheetVariants'
import {SecureItemKey} from '@/utils/secureStorage'

export const WasteCardScreen = () => {
  const {isPortrait} = useDeviceContext()
  const {item: secureWasteCardNumber} = useGetSecureItem(
    SecureItemKey.wasteCardNumber,
  )

  useOpenSurveyOnBlur(
    'waste-container-show-card',
    WasteContainerBottomSheetVariant.survey,
  )

  if (!secureWasteCardNumber) {
    return null
  }

  return (
    <Screen testID="WasteCardScreen">
      <WasteCardMenu />
      {isPortrait ? (
        <Box grow>
          <Column
            align="between"
            grow={1}>
            <Row align="center">
              <WasteCardSvg />
            </Row>
            <WasteCardDirections />
            <WasteCardHelpButton />
          </Column>
        </Box>
      ) : (
        <Row>
          <WasteCardSvg />
          <Box shrink={1}>
            <Column
              grow={1}
              gutter="md">
              <WasteCardDirections />
              <WasteCardHelpButton />
            </Column>
          </Box>
        </Row>
      )}
    </Screen>
  )
}
