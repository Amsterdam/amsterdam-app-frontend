import {useCallback} from 'react'
import {StyleSheet, View} from 'react-native'
import {PaginationProps} from 'react-native-swiper-flatlist'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
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

  const handleOnPress = useCallback(
    (index: number) => {
      scrollToIndex({index})
      onPaginationSelectedIndex?.()
    },
    [onPaginationSelectedIndex, scrollToIndex],
  )

  return (
    <View style={styles.container}>
      {Array.from({length: size}).map((_, index) => {
        const testId = `${e2eID}OnboardingPagination${index}` as const

        if (index === paginationIndex) {
          return (
            <View
              accessibilityLabel={`Huidige slide, ${index + 1}`}
              accessible={true}
              key={index}
              style={[styles.pagination, styles.paginationActivated]}
              testID={testId}
            />
          )
        }

        return (
          <PressableBase
            accessibilityLabel={`Ga naar slide, ${index + 1}`}
            disabled={paginationTapDisabled}
            key={index}
            onPress={() => handleOnPress(index)}
            style={styles.pagination}
            testID={testId}
          />
        )
      })}
    </View>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center',
      bottom: 0,
      height: 'auto',
    },
    pagination: {
      width: size.spacing.sm,
      height: size.spacing.sm,
      borderRadius: size.spacing.sm / 2,
      marginHorizontal: size.spacing.xs,
      backgroundColor: color.pagination.background,
    },
    paginationActivated: {
      width: size.spacing.md,
    },
  })
