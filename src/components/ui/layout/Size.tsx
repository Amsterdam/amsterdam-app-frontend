import {useMemo} from 'react'
import {DimensionValue, StyleSheet, View, ViewProps} from 'react-native'

export type SizeProps = {
  height?: DimensionValue
  maxHeight?: DimensionValue
  maxWidth?: DimensionValue
  minHeight?: DimensionValue
  minWidth?: DimensionValue
  width?: DimensionValue
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
    <View
      style={styles.view}
      {...viewProps}>
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
