import React, {ReactNode, useContext, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {IconSize} from '@/components/ui/types'
import {DeviceContext} from '@/providers'

type Props = {
  children: ReactNode
  scaleWithText?: boolean
  size?: IconSize
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
