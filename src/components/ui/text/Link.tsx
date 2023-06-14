import {Pressable} from '@/components/ui/buttons'
import {Row, Size} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text/Phrase'
import {Direction, TestProps} from '@/components/ui/types'
import {useTheme} from '@/themes'

type Props = {
  label: string
  onPress: () => void
  variant?: 'backward' | 'default' | 'external' | 'forward'
} & TestProps

type LinkIconProps = {
  direction?: Direction.left | Direction.right
  external?: boolean
}

const LinkIcon = ({direction, external}: LinkIconProps) => {
  const {text} = useTheme()
  const iconName = external
    ? 'external-link'
    : direction === Direction.left
    ? 'chevron-left'
    : 'chevron-right'

  return (
    <Size height={1.4 * text.fontSize.body}>
      <Icon
        color="link"
        name={iconName}
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
      hitSlop={(48 - 1.4 * text.fontSize.body) / 2}
      {...{onPress, testID}}>
      <Row gutter="sm">
        {variant === 'external' && <LinkIcon external />}
        {variant === 'backward' && <LinkIcon direction={Direction.left} />}
        {variant === 'default' && <LinkIcon direction={Direction.right} />}
        <Phrase color="link">{label}</Phrase>
        {variant === 'forward' && <LinkIcon direction={Direction.right} />}
      </Row>
    </Pressable>
  )
}
