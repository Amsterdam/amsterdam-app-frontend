import {ReactNode, useMemo} from 'react'
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native'
import {Theme} from '@/themes/themes'
import {Emphasis, ParagraphVariants} from '@/themes/tokens/text'
import {useThemable} from '@/themes/useThemable'

export type PhraseProps = {
  /**
   * Defines the alignment of the phrase. Maps with the textAlign style prop options.
   */
  align?: TextStyle['textAlign']
  children: ReactNode
  /**
   * Defines the color of the phrase. Maps with the text color tokens.
   */
  color?: 'default' | 'inverse' | 'link' | 'secondary'
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
  align = 'left',
  children,
  color = 'default',
  emphasis = 'default',
  underline = false,
  variant = 'body',
  ...textProps
}: PhraseProps) => {
  const createdStyles = useMemo(
    () => createStyles({align, color, emphasis, underline, variant}),
    [align, color, emphasis, underline, variant],
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
    align,
    color: textColor,
    emphasis,
    underline,
    variant,
  }: Required<
    Pick<PhraseProps, 'align' | 'color' | 'emphasis' | 'underline' | 'variant'>
  >) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        flexShrink: 1,
        color: color.text[textColor],
        fontFamily:
          text.fontFamily[emphasis === Emphasis.strong ? 'bold' : 'regular'],
        fontSize: text.fontSize[variant],
        lineHeight: 1.4 * text.fontSize[variant], // NOTE Doesn’t adhere to design system
        textAlign: align,
        textDecorationLine: underline ? 'underline' : 'none',
      },
    })
