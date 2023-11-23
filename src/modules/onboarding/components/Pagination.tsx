import {useCallback} from 'react'
import {StyleSheet, Pressable, View} from 'react-native'
import {PaginationProps} from 'react-native-swiper-flatlist'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

export const Pagination = ({
  size,
  paginationIndex = 0,
  scrollToIndex,
  onPaginationSelectedIndex,
  paginationTapDisabled = false,
  e2eID = '',
}: PaginationProps) => {
  const styles = useThemable(createStyles)

  const accessibilityLabel = useCallback(
    (index: number) => {
      if (paginationTapDisabled) {
        return
      }

      return paginationIndex !== index
        ? `Ga naar slide, ${index + 1}`
        : `Huidige slide, ${index + 1}`
    },
    [paginationIndex, paginationTapDisabled],
  )

  return (
    <View style={[styles.container]}>
      {Array.from({length: size}).map((_, index) => (
        <Pressable
          accessibilityLabel={accessibilityLabel(index)}
          accessibilityRole="button"
          disabled={paginationTapDisabled}
          key={index}
          onPress={() => {
            scrollToIndex({index})
            onPaginationSelectedIndex?.()
          }}
          style={[
            styles.pagination,
            paginationIndex === index && styles.paginationActivated,
          ]}
          testID={`${e2eID}Pagination${index}`}
        />
      ))}
    </View>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      flexDirection: 'row',
      marginVertical: size.spacing.xs,
      justifyContent: 'center',
      alignSelf: 'center',
      bottom: 0,
      height: 'auto',
    },
    pagination: {
      width: size.spacing.sm,
      height: size.spacing.sm,
      borderRadius: 25,
      marginHorizontal: size.spacing.xs,
      backgroundColor: color.background.pagination,
    },
    paginationActivated: {
      width: size.spacing.md,
    },
  })
