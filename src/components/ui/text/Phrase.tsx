import React, {ReactNode, useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {ParagraphVariants} from '@/themes/tokens'

export type PhraseProps = {
  children: ReactNode
  fontWeight?: 'bold' | 'regular'
  variant?: ParagraphVariants
} & Omit<TextProps, 'style'>

/**
 * Displays (very) short text phrases.
 * Offers the three sizing variants, and bold text.
 * For sentences, use `Paragraph` instead.
 */
export const Phrase = ({
  children,
  fontWeight = 'regular',
  variant = 'body',
  ...otherProps
}: PhraseProps) => {
  const createdStyles = useMemo(
    () => createStyles({fontWeight, variant}),
    [fontWeight, variant],
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
    fontWeight,
    variant,
  }: Required<Pick<PhraseProps, 'fontWeight' | 'variant'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        color: color.text.default,
        fontFamily: text.fontWeight[fontWeight],
        fontSize: text.fontSize[variant],
        lineHeight: 1.2 * text.fontSize[variant], // NOTE Doesn’t adhere to design system
      },
    })
