import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  children: ReactNode
  color: keyof Theme['color']['border']
  size: keyof Theme['border']['width']
}

export const Border = ({children, color, size}: Props) => {
  const styles = useThemable(theme => createStyles(theme, {color, size}))

  return <View style={styles.border}>{children}</View>
}

const createStyles = (
  {color: themeColor, border}: Theme,
  {color, size}: Pick<Props, 'color' | 'size'>,
) =>
  StyleSheet.create({
    border: {
      borderColor: themeColor.border[color],
      borderWidth: border.width[size],
    },
  })
