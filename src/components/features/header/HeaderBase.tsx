import {ReactNode, useMemo} from 'react'
import {StyleSheet} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {HeaderProps} from '@/components/features/header/types'
import {Box} from '@/components/ui/containers/Box'
import {useScreen} from '@/store/slices/screen'

type BackgroundColorProp = {
  backgroundColor?: HeaderProps['backgroundColor']
}

type Props = {
  children: ReactNode
} & BackgroundColorProp

export const HeaderBase = ({backgroundColor, children}: Props) => {
  const {top = 0, left = 0, right = 0} = useSafeAreaInsets()
  const {isContentHiddenFromAccessibility, isHiddenFromAccessibility} =
    useScreen()
  const styles = useMemo(
    () => createStyles({backgroundColor, top, left, right}),
    [backgroundColor, top, left, right],
  )

  return (
    <HideFromAccessibility
      hide={isContentHiddenFromAccessibility || isHiddenFromAccessibility}
      style={styles.header}>
      <Box>{children}</Box>
    </HideFromAccessibility>
  )
}

const createStyles = ({
  top,
  left,
  right,
  backgroundColor,
}: Omit<EdgeInsets, 'bottom'> & BackgroundColorProp) =>
  StyleSheet.create({
    header: {
      paddingTop: top,
      paddingLeft: left,
      paddingRight: right,
      backgroundColor,
    },
  })
