import {StyleSheet, View, ViewProps} from 'react-native'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  color: keyof Theme['color']['backgroundArea']
  height: number
} & ViewProps

export const BackgroundColorArea = ({color, height, ...viewProps}: Props) => {
  const styles = useThemable(theme => createStyles(theme, color, height))

  return (
    <View
      style={styles.container}
      {...viewProps}
    />
  )
}

const createStyles = (
  {color: themeColor}: Theme,
  color: Props['color'],
  height: number,
) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: height,
      zIndex: -1,
      backgroundColor: themeColor.backgroundArea[color],
    },
  })
