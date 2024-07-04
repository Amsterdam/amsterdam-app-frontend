import {forwardRef, useMemo} from 'react'
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native'
import {Theme} from '@/themes/themes'
import {TitleTokensPerLevel} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

type Props = {
  color?: keyof Theme['color']['text']
  level?: keyof TitleTokensPerLevel
  text: string
  /**
   * Defines the alignment of the text. Maps with the textAlign style prop options.
   */
  textAlign?: TextStyle['textAlign']
  underline?: boolean
} & Omit<TextProps, 'style'>

export const Title = forwardRef<Text, Props>(
  (
    {
      color = 'default',
      level = 'h1',
      text,
      textAlign = 'left',
      underline = false,
      ...textProps
    },
    ref,
  ) => {
    const createdStyles = useMemo(
      () => createStyles({color, level, textAlign, underline}),
      [color, level, textAlign, underline],
    )
    const styles = useThemable(createdStyles)

    return (
      <Text
        accessibilityLanguage="nl-NL"
        {...textProps}
        accessibilityRole="header"
        ref={ref}
        style={styles.title}>
        {text}
      </Text>
    )
  },
)

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
