import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import {CustomScreenOptions} from '_app/navigation/screenOptions'
import {Box} from '_components/ui'
import {HeaderContent, HeaderContentForHome} from '_modules/home/components'
import {HomeRouteName} from '_modules/home/routes'
import {Theme, useThemable} from '_themes/index'
import React, {useContext, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {DeviceContext} from '@/providers'

type Props = Pick<
  StackHeaderProps,
  'back' | 'navigation' | 'options' | 'route'
> &
  CustomScreenOptions

export const Header = (props: Props) => {
  const {route, screenType} = props
  const isHome = route.name === HomeRouteName.home
  const {isPortrait} = useContext(DeviceContext)

  const {left = 0, right = 0, top = 0} = useSafeAreaInsets()
  const createdStyles = useMemo(
    () =>
      createStyles({
        left,
        top,
        right,
        screenType,
      }),
    [left, top, right, screenType],
  )
  const styles = useThemable(createdStyles)

  return (
    <View style={styles.header}>
      <Box insetVertical="md" insetHorizontal={isPortrait ? 'md' : 'no'}>
        {isHome ? <HeaderContentForHome /> : <HeaderContent {...props} />}
      </Box>
    </View>
  )
}

const createStyles =
  ({
    left,
    right,
    top,
    screenType,
  }: Omit<EdgeInsets, 'bottom'> & CustomScreenOptions) =>
  ({color}: Theme) =>
    StyleSheet.create({
      header: {
        backgroundColor: color.screen.background[screenType],
        paddingTop: top,
        paddingLeft: left,
        paddingRight: right,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
    })
