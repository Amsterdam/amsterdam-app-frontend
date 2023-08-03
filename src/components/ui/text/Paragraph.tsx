import {ReactNode, useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme} from '@/themes/themes'
import {ColorTokens} from '@/themes/tokens/color-light'
import {ParagraphVariants} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  /**
   * Provides an inverse text color to allow a paragraph on a dark background.
   */
  color?: keyof ColorTokens['text']
  /**
   * Which variation of a paragraph to display.
   */
  variant?: ParagraphVariants
} & Omit<TextProps, 'style'>

export const Paragraph = ({
  children,
  color = 'default',
  variant = 'body',
  ...textProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({color, variant}),
    [color, variant],
  )
  const styles = useThemable(createdStyles)

  return (
    <Text
      accessibilityRole={color === 'warning' ? 'alert' : 'none'}
      style={styles.text}
      {...textProps}>
      {children}
    </Text>
  )
}

const createStyles =
  ({color: textColor, variant}: Required<Pick<Props, 'color' | 'variant'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        flexShrink: 1,
        color: color.text[textColor],
        fontFamily: text.fontFamily[variant === 'quote' ? 'bold' : 'regular'],
        fontSize: text.fontSize[variant],
        lineHeight: text.lineHeight[variant] * text.fontSize[variant],
      },
    })
