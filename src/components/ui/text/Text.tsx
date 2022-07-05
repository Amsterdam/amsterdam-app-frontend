import React, {ReactNode, useMemo} from 'react'
import {StyleSheet, Text as TextRN, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {ParagraphVariants} from '@/themes/tokens'

type Props = {
  children: ReactNode
  fontWeight?: 'bold' | 'demi' | 'regular'
  variant?: ParagraphVariants
} & Omit<TextProps, 'style'>

export const Text = ({
  children,
  fontWeight = 'regular',
  variant = 'body',
  ...otherProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({fontWeight, variant}),
    [fontWeight, variant],
  )
  const styles = useThemable(createdStyles)

  return (
    <TextRN style={styles.text} {...otherProps}>
      {children}
    </TextRN>
  )
}

const createStyles =
  ({fontWeight, variant}: Required<Pick<Props, 'fontWeight' | 'variant'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        color: color.text.default,
        fontFamily: text.fontWeight[fontWeight],
        fontSize: text.fontSize[variant],
        lineHeight: 1.2 * text.fontSize[variant], // NOTE Doesn’t adhere to design system
      },
    })
