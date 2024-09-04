import {useEffect, useState} from 'react'
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
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [layout, setLayout] = useState<LayoutRectangle>()
  const styles = createStyles(isVisible)

  useEffect(() => {
    if (layout) {
      setIsVisible(
        layout.height >= (minHeight ?? 0) && layout.width >= (minWidth ?? 0),
      )
    }
  }, [layout, minHeight, minWidth])

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
