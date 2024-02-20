import {Pressable} from '@/components/ui/buttons/Pressable'
import {config} from '@/components/ui/config'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Direction, TestProps} from '@/components/ui/types'
import {useTheme} from '@/themes/useTheme'

type Props = {
  label: string
  onPress: () => void
  variant?: 'backward' | 'default' | 'external' | 'forward'
} & TestProps

type LinkIconProps = {
  direction?: Direction.left | Direction.right
  external?: boolean
} & TestProps

const LinkIcon = ({direction, external, testID}: LinkIconProps) => {
  const {text} = useTheme()
  const iconName = external
    ? 'external-link'
    : direction === Direction.left
      ? 'chevron-left'
      : 'chevron-right'

  return (
    <Size height={text.lineHeight.body}>
      <Icon
        color="link"
        name={iconName}
        testID={testID}
      />
    </Size>
  )
}

export const Link = ({label, onPress, testID, variant = 'default'}: Props) => {
  const {text} = useTheme()

  return (
    <Pressable
      accessibilityLabel={
        variant === 'external' ? label + ', opent in webbrowser' : label
      }
      accessibilityRole="link"
      hitSlop={(config.minTouchSize - text.lineHeight.body) / 2}
      onPress={onPress}
      testID={testID}>
      <Row gutter="sm">
        {variant === 'external' && (
          <LinkIcon
            external
            testID={`${testID}Icon`}
          />
        )}
        {variant === 'backward' && (
          <LinkIcon
            direction={Direction.left}
            testID={`${testID}Icon`}
          />
        )}
        {variant === 'default' && (
          <LinkIcon
            direction={Direction.right}
            testID={`${testID}Icon`}
          />
        )}
        <Phrase
          color="link"
          testID={`${testID}Phrase`}>
          {label}
        </Phrase>
        {variant === 'forward' && (
          <LinkIcon
            direction={Direction.right}
            testID={`${testID}Icon`}
          />
        )}
      </Row>
    </Pressable>
  )
}
