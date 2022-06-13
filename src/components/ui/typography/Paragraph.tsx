import React, {ReactNode, useMemo} from 'react'
import {StyleSheet, Text, TextProps} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {ParagraphVariants} from '../../../themes/tokens'

type Props = {
  children: ReactNode
  variant?: ParagraphVariants
} & Omit<TextProps, 'style'>

export const Paragraph = ({
  children,
  variant = 'body',
  ...otherProps
}: Props) => {
  const createdStyles = useMemo(() => createStyles({variant}), [variant])
  const styles = useThemable(createdStyles)

  return (
    <Text style={styles.text} {...otherProps}>
      {children}
    </Text>
  )
}

const createStyles =
  ({variant}: Required<Pick<Props, 'variant'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        flexShrink: 1,
        color: color.text.default,
        fontFamily: text.fontWeight.regular,
        fontSize: text.fontSize[variant],
        lineHeight: text.lineHeight[variant] * text.fontSize[variant],
      },
    })
