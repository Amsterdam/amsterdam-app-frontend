import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Button} from '@/components/ui/buttons/Button'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {CityPassDetailsPassNumber} from '@/modules/city-pass/components/details/CityPassDetailsPassNumber'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {CityPass} from '@/modules/city-pass/types'

type Props = {
  cityPass: CityPass
}

export const CityPassDetailsInfo = ({cityPass}: Props) => {
  const {navigate} = useNavigation()
  const {dateEndFormatted, id, passNumberComplete, securityCode} = cityPass

  return (
    <Column gutter="md">
      <CityPassDetailsPassNumber passNumberComplete={passNumberComplete} />
      {!!securityCode && (
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
