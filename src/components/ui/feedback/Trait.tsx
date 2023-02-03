import {ReactNode} from 'react'
import {Row} from '@/components/ui/layout'
import {Icon, IconName} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text'
import {TestID} from '@/components/ui/types'

type Props = {
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
  testID?: TestID
}

export const Trait = ({children, iconName, label, testID}: Props) => (
  <Row gutter="sm" valign="center">
    {iconName ? (
      <Icon name={iconName} testID={testID ? `${testID}Icon` : undefined} />
    ) : (
      children
    )}
    <Phrase testID={testID ? `${testID}Label` : undefined} variant="small">
      {label}
    </Phrase>
  </Row>
)
