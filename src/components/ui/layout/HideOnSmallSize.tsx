import {useMemo, useState} from 'react'
import {LayoutRectangle, StyleSheet, View, ViewProps} from 'react-native'

type Props = ViewProps & {
  minHeight?: number
  minWidth?: number
}

export const HideOnSmallSize = ({
  children,
  minHeight,
  minWidth,
  ...viewProps
}: Props) => {
  const [layout, setLayout] = useState<LayoutRectangle>()
  const isVisible = useMemo(() => {
    if (layout) {
      return (
        layout.height >= (minHeight ?? 0) && layout.width >= (minWidth ?? 0)
      )
    }

    return true
  }, [layout, minHeight, minWidth])
  const styles = createStyles(isVisible)

  return (
    <View
      collapsable={false}
      onLayout={e => setLayout(e.nativeEvent.layout)}
      {...viewProps}
      style={styles.wrapper}>
      {children}
    </View>
  )
}

const createStyles = (isVisible: boolean) =>
  StyleSheet.create({
    wrapper: {
      opacity: isVisible ? 1 : 0,
    },
  })
