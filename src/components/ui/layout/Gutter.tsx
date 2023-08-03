import {StyleSheet, View} from 'react-native'
import {Theme} from '@/themes/themes'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type Props = {
  height?: keyof SpacingTokens
  width?: keyof SpacingTokens
}

export const Gutter = ({width, height}: Props) => {
  const styles = useThemable(createStyles({width, height}))

  return <View style={styles.gutter} />
}

const createStyles =
  ({width, height}: Props) =>
  ({size}: Theme) =>
    StyleSheet.create({
      gutter: {
        width: width && size.spacing[width],
        height: height && size.spacing[height],
      },
    })
