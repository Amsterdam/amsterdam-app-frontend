import React, {ReactNode, useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'
import {ParagraphVariants} from '@/themes/tokens'

type Props = {
  children: ReactNode
  variant?: ParagraphVariants
  warning?: boolean
} & Omit<TextProps, 'style'>

export const Paragraph = ({
  children,
  variant = 'body',
  warning = false,
  ...otherProps
}: Props) => {
  const createdStyles = useMemo(
    () => createStyles({variant, warning}),
    [variant, warning],
  )
  const styles = useThemable(createdStyles)

  return (
    <Text
      accessibilityRole={warning ? 'alert' : 'none'}
      style={styles.text}
      {...otherProps}>
      {children}
    </Text>
  )
}

const createStyles =
  ({variant, warning}: Required<Pick<Props, 'variant' | 'warning'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        flexShrink: 1,
        color: warning ? color.text.warning : color.text.default,
        fontFamily: text.fontWeight.regular,
        fontSize: text.fontSize[variant],
        lineHeight: text.lineHeight[variant] * text.fontSize[variant],
      },
    })
