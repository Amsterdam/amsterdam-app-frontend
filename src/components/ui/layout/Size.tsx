import {useMemo} from 'react'
import {DimensionValue, StyleSheet, View, ViewProps} from 'react-native'
import {MainAxisAlignment} from '@/components/ui/layout/types'
import {mapMainAxisAlignment} from '@/components/ui/layout/utils/mapMainAxisAlignment'

export type SizeProps = {
  height?: DimensionValue
  maxHeight?: DimensionValue
  maxWidth?: DimensionValue
  minHeight?: DimensionValue
  minWidth?: DimensionValue
  /** The vertical alignment of the items in the column. */
  valign?: MainAxisAlignment
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
  valign = 'center',
  width,
  ...viewProps
}: Props) => {
  const styles = useMemo(
    () =>
      createStyles({
        height,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        valign,
        width,
      }),
    [height, maxHeight, maxWidth, minHeight, minWidth, valign, width],
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
      justifyContent: mapMainAxisAlignment(sizeProps.valign),
      ...sizeProps,
    },
  })
