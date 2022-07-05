import React, {ReactNode, useMemo} from 'react'
import {StyleSheet, Text as TextRN, TextProps} from 'react-native'
import {Theme, useThemable} from '@/themes'

type Props = {
  children: ReactNode
  fontWeight?: 'bold' | 'demi' | 'regular'
} & Omit<TextProps, 'style'>

export const Text = ({
  children,
  fontWeight = 'regular',
  ...otherProps
}: Props) => {
  const createdStyles = useMemo(() => createStyles({fontWeight}), [fontWeight])
  const styles = useThemable(createdStyles)

  return (
    <TextRN style={styles.text} {...otherProps}>
      {children}
    </TextRN>
  )
}

const createStyles =
  ({fontWeight}: Required<Pick<Props, 'fontWeight'>>) =>
  ({color, text}: Theme) =>
    StyleSheet.create({
      text: {
        color: color.text.default,
        fontFamily: text.fontWeight[fontWeight],
        fontSize: text.fontSize.body,
      },
    })
