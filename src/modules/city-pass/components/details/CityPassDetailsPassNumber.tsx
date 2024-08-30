import {setStringAsync} from 'expo-clipboard'
import {useEffect, useState} from 'react'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {CityPass} from '@/modules/city-pass/types'
import {stringGroupInto} from '@/utils/stringGroupInto'

type Props = {
  passNumberComplete: CityPass['passNumberComplete']
}

const COPIED_STATE_DURATION = 4000

export const CityPassDetailsPassNumber = ({passNumberComplete}: Props) => {
  const [isPassNumberCopied, setIsPassNumberCopied] = useState(false)

  const copyToClipboard = async () => {
    await setStringAsync(passNumberComplete)
    setIsPassNumberCopied(true)
  }

  useEffect(() => {
    isPassNumberCopied &&
      setTimeout(() => setIsPassNumberCopied(false), COPIED_STATE_DURATION)
  }, [isPassNumberCopied])

  return (
    <Pressable
      accessibilityHint="Druk om het pasnummer te kopiëren"
      accessibilityLabel={`Pasnummer ${isPassNumberCopied ? 'Gekopieerd' : stringGroupInto(passNumberComplete, 4)}`}
      onPress={() => copyToClipboard()}
      testID="CityPassDetailScreenCopyButton">
      <Row
        align="between"
        gutter="sm"
        valign="center"
        vgutter="sm"
        wrap>
        <HideFromAccessibility>
          <Phrase testID="CityPassCityPassDetailsPassNumberLabel">
            Pasnummer
          </Phrase>
        </HideFromAccessibility>
        <Row
          gutter="sm"
          valign="center">
          <Phrase
            color={isPassNumberCopied ? 'confirm' : undefined}
            emphasis="strong"
            selectable
            testID="CityPassCityPassDetailsPassNumberValue">
            {isPassNumberCopied
              ? 'Gekopieerd'
              : stringGroupInto(passNumberComplete, 4)}
          </Phrase>
          <Icon
            color={isPassNumberCopied ? 'confirm' : 'link'}
            name="copy"
            size="md"
            testID="CityPassDetailScreenCopyButtonIcon"
          />
        </Row>
      </Row>
    </Pressable>
  )
}
