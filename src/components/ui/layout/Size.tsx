import React, {useMemo} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

type SizeProps = {
  height?: number | string
  marginRight?: number | string
  maxHeight?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  minWidth?: number | string
  width?: number | string
}

type Props = SizeProps & Omit<ViewProps, 'style'>

export const Size = ({
  children,
  height,
  marginRight,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  width,
  ...viewProps
}: Props) => {
  const styles = useMemo(
    () =>
      createStyles({
        height,
        marginRight,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        width,
      }),
    [height, marginRight, maxHeight, maxWidth, minHeight, minWidth, width],
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
