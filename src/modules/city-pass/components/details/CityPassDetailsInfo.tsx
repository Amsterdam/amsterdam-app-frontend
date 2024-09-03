import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {ProductTourTipWrapper} from '@/components/features/product-tour/ProductTourTipWrapper'
import {Tip} from '@/components/features/product-tour/types'
import {Button} from '@/components/ui/buttons/Button'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Placement} from '@/components/ui/types'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {CityPassDetailsPassNumber} from '@/modules/city-pass/components/details/CityPassDetailsPassNumber'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {CityPass} from '@/modules/city-pass/types'
import {zTokens} from '@/themes/tokens/z'

const ONBOARDING_TIP =
  'Je hebt de beveiligingscode nodig om betalingen te doen met hoge bedragen'

type Props = {
  cityPass: CityPass
}

export const CityPassDetailsInfo = ({cityPass}: Props) => {
  const {navigate} = useNavigation()
  const {dateEndFormatted, id, passNumberComplete, securityCode} = cityPass

  return (
    <Column
      gutter="md"
      zIndex={zTokens.tooltip}>
      <CityPassDetailsPassNumber passNumberComplete={passNumberComplete} />
      {!!securityCode && (
        <ProductTourTipWrapper
          extraSpace="md"
          placement={Placement.below}
          testID="CityPassDetailsSecurityCodeTooltip"
          text={ONBOARDING_TIP}
          tipSlug={Tip.cityPassSecurityCode}>
          <Row
            align="between"
            gutter="md"
            valign="center">
            <HideFromAccessibility>
              <Phrase testID="CityPassCityPassDetailsSecurityCodeLabel">
                Beveiligingscode
              </Phrase>
            </HideFromAccessibility>
            <Button
              accessibilityLabel="Toon beveiligingscode"
              label="Toon"
              onPress={() => {
                navigate(CityPassRouteName.securityCode, {id})
              }}
              testID="CityPassCityPassDetailsSecurityCodeButton"
              variant="secondary"
            />
          </Row>
        </ProductTourTipWrapper>
      )}
      <SingleSelectable testID="CityPassCityPassDetailsExpiryDate">
        <Row
          align="between"
          gutter="md">
          <Phrase testID="CityPassCityPassDetailsExpiryDateLabel">
            Geldig tot en met
          </Phrase>
          <Phrase
            emphasis="strong"
            testID="CityPassCityPassDetailsExpiryDateValue">
            {dateEndFormatted}
          </Phrase>
        </Row>
      </SingleSelectable>
    </Column>
  )
}
