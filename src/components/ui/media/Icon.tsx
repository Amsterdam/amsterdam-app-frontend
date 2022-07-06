import React, {ReactNode, useContext, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {DeviceContext} from '@/providers'

export type IconSizes = 16 | 20 | 24 | 32

type Props = {
  children: ReactNode
  scaleWithText?: boolean
  size?: IconSizes
}

export const Icon = ({children, scaleWithText = true, size = 16}: Props) => {
  const {fontScale} = useContext(DeviceContext)
  const styles = useMemo(
    () => createStyles(scaleWithText ? size * fontScale : size),
    [fontScale, scaleWithText, size],
  )

  return <View style={styles.icon}>{children}</View>
}

const createStyles = (size: number) =>
  StyleSheet.create({
    icon: {
      width: size,
      aspectRatio: 1,
    },
  })
