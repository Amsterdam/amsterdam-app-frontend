import React, {ReactNode, useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {ParagraphVariants} from '@/themes/tokens'

type Props = {
  children: ReactNode
  /**
   * Provides an inverse text color to allow a paragraph on a dark background.
   */
  color?: 'default' | 'inverse' | 'link'
  /**
   * Allows the phrase to convey more emphasis.
   */
  fontWeight?: 'bold' | 'regular'
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
  fontWeight = 'regular',
  variant = 'body',
  ...otherProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({color, fontWeight, variant}),
    [color, fontWeight, variant],
  )
  const styles = useThemable(createdStyles)

  return (
    <Text style={styles.text} {...otherProps}>
      {children}
    </Text>
  )
}

const createStyles =
  ({
    color: textColor,
    fontWeight,
    variant,
  }: Required<Pick<Props, 'color' | 'fontWeight' | 'variant'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        color: color.text[textColor],
        fontFamily: text.fontWeight[fontWeight],
        fontSize: text.fontSize[variant],
        lineHeight: 1.4 * text.fontSize[variant], // NOTE Doesn’t adhere to design system
      },
    })
