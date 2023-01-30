import {StackHeaderProps} from '@react-navigation/stack/lib/typescript/src/types'
import {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {Box} from '@/components/ui/containers'
import {HeaderContent, HeaderContentForHome} from '@/modules/home/components'
import {HomeRouteName} from '@/modules/home/routes'

type Props = Pick<StackHeaderProps, 'back' | 'navigation' | 'options' | 'route'>

export const Header = (props: Props) => {
  const {route} = props
  const isHome = route.name === HomeRouteName.home

  const {top = 0, left = 0, right = 0} = useSafeAreaInsets()
  const styles = useMemo(
    () =>
      createStyles({
        top,
        left,
        right,
      }),
    [top, left, right],
  )

  return (
    <View style={styles.header}>
      <Box>
        {isHome ? <HeaderContentForHome /> : <HeaderContent {...props} />}
      </Box>
    </View>
  )
}

const createStyles = ({top, left, right}: Omit<EdgeInsets, 'bottom'>) =>
  StyleSheet.create({
    header: {
      paddingTop: top,
      paddingLeft: left,
      paddingRight: right,
    },
  })
