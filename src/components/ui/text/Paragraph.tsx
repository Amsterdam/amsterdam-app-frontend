import React, {ReactNode, useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {ColorTokens, ParagraphVariants} from '@/themes/tokens'

type Props = {
  children: ReactNode
  variant?: ParagraphVariants
  color?: keyof ColorTokens['text']
} & Omit<TextProps, 'style'>

export const Paragraph = ({
  children,
  color = 'default',
  variant = 'body',
  ...otherProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({variant, color}),
    [variant, color],
  )
  const styles = useThemable(createdStyles)

  return (
    <Text
      accessibilityRole={color === 'warning' ? 'alert' : 'none'}
      style={styles.text}
      {...otherProps}>
      {children}
    </Text>
  )
}

const createStyles =
  ({variant, color: textColor}: Required<Pick<Props, 'variant' | 'color'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        flexShrink: 1,
        color: color.text[textColor],
        fontFamily: text.fontWeight.regular,
        fontSize: text.fontSize[variant],
        lineHeight: text.lineHeight[variant] * text.fontSize[variant],
      },
    })
