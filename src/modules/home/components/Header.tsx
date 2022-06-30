import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import React, {useContext, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {Box} from '@/components/ui'
import {HeaderContent, HeaderContentForHome} from '@/modules/home/components'
import {HomeRouteName} from '@/modules/home/routes'
import {DeviceContext} from '@/providers'

type Props = Pick<StackHeaderProps, 'back' | 'navigation' | 'options' | 'route'>

export const Header = (props: Props) => {
  const {route} = props
  const isHome = route.name === HomeRouteName.home
  const {isPortrait} = useContext(DeviceContext)

  const {left = 0, right = 0, top = 0} = useSafeAreaInsets()
  const styles = useMemo(
    () =>
      createStyles({
        left,
        top,
        right,
      }),
    [left, top, right],
  )

  return (
    <View style={styles.header}>
      <Box insetVertical="md" insetHorizontal={isPortrait ? 'md' : 'no'}>
        {isHome ? <HeaderContentForHome /> : <HeaderContent {...props} />}
      </Box>
    </View>
  )
}

const createStyles = ({left, right, top}: Omit<EdgeInsets, 'bottom'>) =>
  StyleSheet.create({
    header: {
      paddingTop: top,
      paddingLeft: left,
      paddingRight: right,
    },
  })
