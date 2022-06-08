import React, {ReactNode, useContext, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {DeviceContext} from '../../../providers'

type IconSizes = 16 | 24 | 32

type Props = {
  children: ReactNode
  size?: IconSizes
}

export const Icon = ({children, size = 16}: Props) => {
  const device = useContext(DeviceContext)
  const styles = useMemo(
    () => createStyles(size * device.fontScale),
    [device.fontScale, size],
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
