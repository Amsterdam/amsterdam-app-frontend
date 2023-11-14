import {StyleSheet} from 'react-native'
import {
  Pagination as SwiperPagination,
  PaginationProps,
} from 'react-native-swiper-flatlist'
import {Theme} from '@/themes/themes'
import {baseColor} from '@/themes/tokens/base-color'
import {useThemable} from '@/themes/useThemable'

export const Pagination = (
  props: JSX.IntrinsicAttributes & PaginationProps,
) => {
  const styles = useThemable(createStyles)

  return (
    <SwiperPagination
      {...props}
      paginationActiveColor={baseColor.primary.blue}
      paginationDefaultColor={baseColor.primary.blue}
      paginationStyle={styles.paginationStyle}
      paginationStyleItem={styles.paginationStyleItem}
      paginationStyleItemActive={styles.paginationStyleItemActive}
    />
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    paginationStyle: {
      bottom: 0,
      height: 'auto',
      maxWidth: 'auto',
    },
    paginationStyleItem: {
      width: size.spacing.sm,
      height: size.spacing.sm,
    },
    paginationStyleItemActive: {
      height: size.spacing.sm,
      width: size.spacing.md,
    },
  })
