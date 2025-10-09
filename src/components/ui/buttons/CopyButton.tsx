import {useCallback, useState} from 'react'
import {StyleSheet, TextProps} from 'react-native'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {config} from '@/components/ui/config'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'
import {useCopyToClipboard} from '@/hooks/useCopyToClipboard'
import {LogProps} from '@/processes/piwik/types'
import {Theme} from '@/themes/themes'
import {SpacingTokens} from '@/themes/tokens/size'
import {ParagraphVariants} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

type Variants = 'primary' | 'secondary' | 'tertiary'

type VariantProps = {
  backgroundColors: 'tertiary' | 'transparent'
  color: keyof Theme['color']['text']
  reverse: boolean
  textSize?: ParagraphVariants
}

const variantProps: Record<Variants, VariantProps> = {
  primary: {
    backgroundColors: 'tertiary',
    color: 'link',
    reverse: false,
  },
  secondary: {backgroundColors: 'tertiary', color: 'default', reverse: true},
  tertiary: {
    backgroundColors: 'transparent',
    color: 'default',
    reverse: true,
    textSize: 'small',
  },
}

type Props = {
  insetHorizontal?: keyof SpacingTokens
  label: string
  'logging-label'?: string
  textToCopy: string
  variant?: Variants
} & LogProps &
  TestProps &
  Pick<TextProps, 'numberOfLines' | 'ellipsizeMode'>

export const CopyButton = ({
  label,
  textToCopy,
  testID,
  variant = 'primary',
  insetHorizontal = 'md',
  numberOfLines,
  ellipsizeMode,
  ...pressableProps
}: Props) => {
  const {isCopied, copyToClipboard} = useCopyToClipboard(textToCopy)
  const [isPressed, setIsPressed] = useState(false)
  const styles = useThemable(createStyles(isPressed, insetHorizontal, variant))

  const mergeOnPressIn = useCallback(() => {
    setIsPressed(true)
  }, [])

  const mergeOnPressOut = useCallback(() => {
    setIsPressed(false)
  }, [])

  return (
    <PressableBase
      accessibilityLanguage="nl-NL"
      accessibilityRole="button"
      onPress={copyToClipboard}
      onPressIn={mergeOnPressIn}
      onPressOut={mergeOnPressOut}
      style={styles.button}
      testID={testID}
      {...pressableProps}>
      <Row
        gutter="sm"
        reverse={variantProps[variant].reverse}>
        <Icon
          color={isCopied ? 'confirm' : 'link'}
          name="copy"
          size="md"
          testID={`${testID}Icon`}
        />
        <Phrase
          color={isCopied ? 'confirm' : variantProps[variant].color}
          ellipsizeMode={ellipsizeMode}
          emphasis={variant === 'primary' || isCopied ? 'strong' : 'default'}
          numberOfLines={numberOfLines}
          testID={`${testID}Label`}
          variant={variantProps[variant].textSize}>
          {isCopied ? 'Gekopieerd' : label}
        </Phrase>
      </Row>
    </PressableBase>
  )
}

const getBackgroundColor = (
  color: Theme['color'],
  isPressed: boolean,
  variant: Variants = 'primary',
) =>
  color.pressable[variantProps[variant].backgroundColors][
    isPressed ? 'pressed' : 'default'
  ].background

const createStyles =
  (
    isPressed: boolean,
    insetHorizontal: keyof SpacingTokens,
    variant: Variants,
  ) =>
  ({border, color, text, size}: Theme) => {
    const buttonHeight = config.buttonHeight
    const labelLineHeight = text.lineHeight.body

    const paddingHorizontal =
      insetHorizontal === 'no'
        ? 0
        : size.spacing[insetHorizontal] + 2 + border.width.md

    const paddingVertical = (buttonHeight - labelLineHeight) / 2

    return StyleSheet.create({
      button: {
        flexDirection: 'row',
        flexShrink: 1,
        paddingHorizontal,
        paddingVertical,
        backgroundColor: getBackgroundColor(color, isPressed, variant),
      },
    })
  }
