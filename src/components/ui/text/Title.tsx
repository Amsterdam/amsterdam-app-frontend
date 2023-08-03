import {useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme} from '@/themes/themes'
import {TitleTokensPerLevel} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

type Props = {
  color?: keyof Theme['color']['text']
  level?: keyof TitleTokensPerLevel
  text: string
} & Omit<TextProps, 'style'>

export const Title = ({
  color = 'default',
  level = 'h1',
  text,
  ...textProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({color, level}),
    [color, level],
  )
  const styles = useThemable(createdStyles)

  return (
    <Text
      accessibilityRole="header"
      style={styles.title}
      {...textProps}>
      {text}
    </Text>
  )
}

// TODO Transition text color
const createStyles =
  ({color: textColor, level}: Required<Pick<Props, 'color' | 'level'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      title: {
        flexShrink: 1,
        color: color.text[textColor],
        fontFamily: text.fontFamily.bold,
        fontSize: text.fontSize[level],
        lineHeight: text.lineHeight[level] * text.fontSize[level],
      },
    })
