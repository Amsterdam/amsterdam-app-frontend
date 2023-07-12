import {ReactNode, useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {Emphasis, ParagraphVariants} from '@/themes/tokens'

type Props = {
  children: ReactNode
  /**
   * Provides an inverse text color to allow a paragraph on a dark background.
   */
  color?: 'default' | 'inverse' | 'link'
  /**
   * Allows the phrase to convey more emphasis.
   */
  emphasis?: keyof typeof Emphasis
  /**
   * Whether the phrase is underlined. Use this for a link only.
   */
  underline?: boolean
  /**
   * Which variation of a phrase to display.
   */
  variant?: ParagraphVariants
} & Omit<TextProps, 'style'>

/**
 * Displays (very) short text phrases.
 * Offers the three sizing variants, and bold text.
 * For sentences, use `Paragraph` instead.
 */
export const Phrase = ({
  children,
  color = 'default',
  emphasis = 'default',
  underline = false,
  variant = 'body',
  ...textProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({color, emphasis, underline, variant}),
    [color, emphasis, underline, variant],
  )
  const styles = useThemable(createdStyles)

  return (
    <Text
      style={styles.text}
      {...textProps}>
      {children}
    </Text>
  )
}

const createStyles =
  ({
    color: textColor,
    emphasis,
    underline,
    variant,
  }: Required<Pick<Props, 'color' | 'emphasis' | 'underline' | 'variant'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        flexShrink: 1,
        color: color.text[textColor],
        fontFamily:
          text.fontFamily[emphasis === Emphasis.strong ? 'bold' : 'regular'],
        fontSize: text.fontSize[variant],
        lineHeight: 1.4 * text.fontSize[variant], // NOTE Doesn’t adhere to design system
        textDecorationLine: underline ? 'underline' : 'none',
      },
    })
