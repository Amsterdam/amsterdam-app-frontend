import {View, StyleSheet} from 'react-native'
import type {Theme} from '@/themes/themes'
import {calculateClusterDimensions} from '@/components/features/map/utils/calculateClusterDimensions'
import {Phrase} from '@/components/ui/text/Phrase'
import {useThemable} from '@/themes/useThemable'

const DEFAULT_OUTER_PADDING = 12

export const Cluster = ({count}: {count: number}) => {
  const styles = useThemable(theme => createStyles(theme, count))

  return (
    <View style={[styles.clusterBase, styles.clusterOuter]}>
      <View style={[styles.clusterBase, styles.clusterInner]}>
        <Phrase
          color="inverse"
          emphasis="strong">
          {count}
        </Phrase>
      </View>
    </View>
  )
}

const createStyles = (theme: Theme, count: number) =>
  StyleSheet.create({
    clusterBase: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '100%',
    },
    clusterOuter: {
      backgroundColor: `${theme.color.backgroundArea.primary}30`,
      width: calculateClusterDimensions(count, DEFAULT_OUTER_PADDING),
      height: calculateClusterDimensions(count, DEFAULT_OUTER_PADDING),
    },
    clusterInner: {
      backgroundColor: theme.color.backgroundArea.primary,
      width: calculateClusterDimensions(count),
      height: calculateClusterDimensions(count),
    },
  })
