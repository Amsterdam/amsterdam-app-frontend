import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import {CustomScreenOptions} from '_app/navigation/screenOptions'
import {HeaderContent, HeaderContentForHome} from '_modules/home/components'
import {HomeRouteName} from '_modules/home/routes'
import {Theme, useThemable} from '_themes/index'
import React, {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

type Props = Pick<
  StackHeaderProps,
  'back' | 'navigation' | 'options' | 'route'
> &
  CustomScreenOptions

export const Header = (props: Props) => {
  const {route, screenType} = props
  const isHome = route.name === HomeRouteName.home

  const {top: insetTop = 0} = useSafeAreaInsets()
  const createdStyles = useMemo(
    () => createStyles({insetTop, screenType}),
    [insetTop, screenType],
  )
  const styles = useThemable(createdStyles)

  return (
    <View style={styles.header}>
      {isHome ? <HeaderContentForHome /> : <HeaderContent {...props} />}
    </View>
  )
}

const createStyles =
  ({insetTop, screenType}: CustomScreenOptions & {insetTop: number}) =>
  ({color, size}: Theme) => {
    const insetHeader = size.spacing.md

    return StyleSheet.create({
      header: {
        backgroundColor: color.screen.background[screenType],
        paddingTop: insetTop + insetHeader,
        paddingBottom: insetHeader,
        paddingHorizontal: insetHeader,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
    })
  }
