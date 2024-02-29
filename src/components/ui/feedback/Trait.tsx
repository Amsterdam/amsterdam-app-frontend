import {ReactNode} from 'react'
import {TextProps} from 'react-native'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {IconName} from '@/components/ui/media/iconPaths'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'

type Props = {
  accessibilityLabel?: TextProps['accessibilityLabel']
  accessibilityLanguage?: TextProps['accessibilityLanguage']
  /**
   * Allows a custom visualization for the trait.
   * Use a small component here. Not rendered if an icon name is provided.
   */
  children?: ReactNode
  /**
   * The name of the icon to visually support the trait label.
   */
  iconName?: IconName
  /**
   * The label identifying the trait.
   * Should be one or a few words.
   */
  label: string
} & TestProps

export const Trait = ({
  accessibilityLabel,
  accessibilityLanguage = 'nl-NL',
  children,
  iconName,
  label,
  testID,
}: Props) => (
  <Row
    gutter="sm"
    valign="center">
    {iconName ? (
      <Icon
        name={iconName}
        testID={`${testID}Icon`}
      />
    ) : (
      children
    )}
    <Phrase
      accessibilityLabel={accessibilityLabel}
      accessibilityLanguage={accessibilityLanguage}
      testID={`${testID}Label`}
      variant="small">
      {label}
    </Phrase>
  </Row>
)
