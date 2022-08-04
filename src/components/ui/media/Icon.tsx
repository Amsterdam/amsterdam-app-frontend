import React, {ReactNode, useContext, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {IconSize} from '@/components/ui/types'
import {DeviceContext} from '@/providers'

type Props = {
  children: ReactNode
  /**
   * Whether the icon scales with text being zoomed in or out.
   */
  scalesWithFont?: boolean
  /**
   * The size of the icon.
   * Must be one of the allowed sizes.
   */
  size?: IconSize
}

export const Icon = ({children, scalesWithFont = true, size = 16}: Props) => {
  const {fontScale} = useContext(DeviceContext)
  const styles = useMemo(
    () => createStyles(scalesWithFont ? size * fontScale : size),
    [fontScale, scalesWithFont, size],
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
