import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Pressable} from '@/components/ui/buttons'
import {Row, Size} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Phrase} from '@/components/ui/text/Phrase'
import {Direction, TestProps} from '@/components/ui/types'
import {Theme, useThemable, useTheme} from '@/themes'

type Props = {
  label: string
  onPress: () => void
  variant?: 'backward' | 'default' | 'external' | 'forward' | 'underline'
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
      <Icon color="link" name={iconName} />
    </Size>
  )
}

type UnderlineWrapperProps = {
  children: ReactNode
  variant: Props['variant']
}

const UnderlineWrapper = ({children, variant}: UnderlineWrapperProps) => {
  const styles = useThemable(createStyles)
  return variant === 'underline' ? (
    <View style={styles.underlineWrapper}>{children}</View>
  ) : (
    <>{children}</>
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
        <UnderlineWrapper variant={variant}>
          <Phrase color="link">{label}</Phrase>
        </UnderlineWrapper>
        {variant === 'forward' && <LinkIcon direction={Direction.right} />}
      </Row>
    </Pressable>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    underlineWrapper: {
      borderBottomColor: color.text.link,
      borderBottomWidth: 2,
    },
  })
