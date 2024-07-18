import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  bottom?: boolean
  children: ReactNode
  color: keyof Theme['color']['border']
  left?: boolean
  right?: boolean
  size: keyof Theme['border']['width']
  top?: boolean
}

export const Border = ({children, ...styleProps}: Props) => {
  const styles = useThemable(theme => createStyles(theme, styleProps))

  return <View style={styles.border}>{children}</View>
}

const createStyles = (
  {color: themeColor, border}: Theme,
  {bottom, color, left, right, size, top}: Omit<Props, 'children'>,
) => {
  const noDirection = !(bottom || left || right || top)

  return StyleSheet.create({
    border: {
      borderColor: themeColor.border[color],
      borderLeftWidth: left ? border.width[size] : undefined,
      borderRightWidth: right ? border.width[size] : undefined,
      borderTopWidth: top ? border.width[size] : undefined,
      borderBottomWidth: bottom ? border.width[size] : undefined,
      borderWidth: noDirection ? border.width[size] : undefined,
    },
  })
}
