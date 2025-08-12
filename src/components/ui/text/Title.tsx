import {type Ref, useMemo} from 'react'
import {StyleSheet, Text, type TextProps, type TextStyle} from 'react-native'
import type {Theme} from '@/themes/themes'
import {AccessibleText} from '@/components/ui/text/AccessibleText'
import {TestProps} from '@/components/ui/types'
import {TitleTokensPerLevel} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

type Props = {
  color?: keyof Theme['color']['text']
  level?: keyof TitleTokensPerLevel
  ref?: Ref<Text | null>
  text: string
  /**
   * Defines the alignment of the text. Maps with the textAlign style prop options.
   */
  textAlign?: TextStyle['textAlign']
  underline?: boolean
} & Omit<TextProps, 'style' | 'testID'> &
  Partial<TestProps>

export const Title = ({
  ref,
  color = 'default',
  level = 'h1',
  text,
  textAlign = 'left',
  underline = false,
  ...textProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({color, level, textAlign, underline}),
    [color, level, textAlign, underline],
  )
  const styles = useThemable(createdStyles)

  return (
    <AccessibleText
      accessibilityLanguage="nl-NL"
      {...textProps}
      accessibilityRole="header"
      ref={ref}
      style={styles.title}>
      {text}
    </AccessibleText>
  )
}

// TODO Transition text color
const createStyles =
  ({
    color: textColor,
    level,
    textAlign,
    underline,
  }: Required<Pick<Props, 'color' | 'level' | 'textAlign' | 'underline'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      title: {
        flexShrink: 1,
        color: color.text[textColor],
        fontFamily: text.fontFamily.bold,
        fontSize: text.fontSize[level],
        lineHeight: text.lineHeight[level],
        textAlign,
        textDecorationLine: underline ? 'underline' : undefined,
      },
    })
