import React, {useMemo} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'

type FlexProps = {
  basis?: number | string
  flex?: number
  grow?: number
  shrink?: number
  direction?: 'column' | 'row'
  wrap?: boolean
}

type Props = FlexProps & Omit<ViewProps, 'style'>

export const Flex = ({
  basis,
  children,
  direction,
  flex,
  grow,
  shrink,
  wrap,
  ...viewProps
}: Props) => {
  const styles = useMemo(
    () => createStyles({basis, flex, grow, shrink, direction}),
    [basis, direction, flex, grow, shrink],
  )
  return (
    <View style={[styles.view, wrap && styles.wrap]} {...viewProps}>
      {children}
    </View>
  )
}

const createStyles = ({basis, flex, grow, shrink, direction}: FlexProps) =>
  StyleSheet.create({
    view: {
      flexBasis: basis,
      flexShrink: shrink,
      flexGrow: grow,
      flex,
      flexDirection: direction,
    },
    wrap: {
      flexWrap: 'wrap',
    },
  })
