import React, {useMemo} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

export type SizeProps = {
  height?: number | string
  maxHeight?: number
  maxWidth?: number | string
  minHeight?: number
  minWidth?: number
  width?: number | string
}

type Props = SizeProps & Omit<ViewProps, 'style'>

export const Size = ({
  children,
  height,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  width,
  ...viewProps
}: Props) => {
  const styles = useMemo(
    () =>
      createStyles({height, maxHeight, maxWidth, minHeight, minWidth, width}),
    [height, maxHeight, maxWidth, minHeight, minWidth, width],
  )

  return (
    <View style={styles.view} {...viewProps}>
      {children}
    </View>
  )
}

const createStyles = (sizeProps: SizeProps) =>
  StyleSheet.create({
    view: {
      justifyContent: 'center',
      ...sizeProps,
    },
  })
