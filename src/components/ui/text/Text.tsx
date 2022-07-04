import React, {ReactNode, useMemo} from 'react'
import {StyleSheet, Text as TextRN, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'

type Props = {
  children: ReactNode
  variant?: 'bold' | 'demi' | 'regular'
} & Omit<TextProps, 'style'>

export const Text = ({children, variant = 'regular', ...otherProps}: Props) => {
  const createdStyles = useMemo(() => createStyles({variant}), [variant])
  const styles = useThemable(createdStyles)

  return (
    <TextRN style={styles.text} {...otherProps}>
      {children}
    </TextRN>
  )
}

const createStyles =
  ({variant}: Required<Pick<Props, 'variant'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        color: color.text.default,
        fontFamily: text.fontWeight[variant],
        fontSize: text.fontSize.body,
      },
    })
