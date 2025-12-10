import {type Ref, useMemo} from 'react'
import {StyleSheet, Text, type TextProps, type TextStyle} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import type {Theme} from '@/themes/themes'
import {AccessibleText} from '@/components/ui/text/AccessibleText'
import {TitleTokensPerLevel, type TextTokens} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

type Props = {
  color?: keyof Theme['color']['text']
  fontFamily?: keyof TextTokens['fontFamily']
  level?: keyof TitleTokensPerLevel
  ref?: Ref<Text | null>
  shrink?: number
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
  shrink = 1,
  text,
  textAlign = 'left',
  fontFamily = 'bold',
  underline = false,
  ...textProps
}: Props) => {
  const createdStyles = useMemo(
    () =>
      createStyles({color, level, shrink, textAlign, underline, fontFamily}),
    [color, level, shrink, textAlign, underline, fontFamily],
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
    fontFamily = 'bold',
    level,
    shrink,
    textAlign,
    underline,
  }: Required<
    Pick<
      Props,
      'color' | 'level' | 'shrink' | 'textAlign' | 'underline' | 'fontFamily'
    >
  >) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      title: {
        flexShrink: shrink,
        color: color.text[textColor],
        fontFamily: text.fontFamily[fontFamily],
        fontSize: text.fontSize[level],
        lineHeight: text.lineHeight[level],
        textAlign,
        textDecorationLine: underline ? 'underline' : undefined,
      },
    })
