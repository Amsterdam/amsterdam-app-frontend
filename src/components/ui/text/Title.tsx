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
} & Omit<TextProps, 'style'>

export const Title = forwardRef<Text, Props>(
  (
    {color = 'default', level = 'h1', text, textAlign = 'left', ...textProps},
    ref,
  ) => {
    const createdStyles = useMemo(
      () => createStyles({color, level, textAlign}),
      [color, level, textAlign],
    )
    const styles = useThemable(createdStyles)

    return (
      <Text
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
  }: Required<Pick<Props, 'color' | 'level' | 'textAlign'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      title: {
        flexShrink: 1,
        color: color.text[textColor],
        fontFamily: text.fontFamily.bold,
        fontSize: text.fontSize[level],
        lineHeight: text.lineHeight[level],
        textAlign,
      },
    })
