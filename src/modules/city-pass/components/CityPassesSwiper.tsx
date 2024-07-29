import {StyleSheet, View} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {CityPass} from '@/modules/city-pass/components/CityPass'
import {CITY_PASS_HEIGHT} from '@/modules/city-pass/constants'
import {usePassOwners} from '@/modules/city-pass/hooks/usePassOwners'
import {PassOwner} from '@/modules/city-pass/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const PAGINATION_HEIGHT = 50

type CarouselItem = {
  index: number
  item: PassOwner
}

export const CityPassesSwiper = () => {
  const styles = useThemable(createStyles)
  const {passOwnersWithActivePass} = usePassOwners()

  return (
    <View style={styles.container}>
      <SwiperFlatList
        data={passOwnersWithActivePass}
        paginationStyle={styles.pagination}
        paginationStyleItem={styles.paginationItem}
        paginationStyleItemActive={styles.paginationItemActive}
        paginationStyleItemInactive={styles.paginationItemInactive}
        renderItem={({item, index}: CarouselItem) => (
          <CityPass
            index={index}
            itemCount={passOwnersWithActivePass.length}
            passOwner={item}
          />
        )}
        showPagination
      />
    </View>
  )
}

const createStyles = ({color, size}: Theme) =>
  StyleSheet.create({
    container: {
      flexBasis: CITY_PASS_HEIGHT + PAGINATION_HEIGHT,
    },
    pagination: {
      borderRadius: 25,
      backgroundColor: color.cityPass.swiperPagination,
      alignItems: 'center',
      paddingHorizontal: size.spacing.sm,
      paddingVertical: 12,
    },
    paginationItem: {
      width: size.spacing.sm,
      height: size.spacing.sm,
      marginHorizontal: size.spacing.xs,
    },
    paginationItemActive: {
      backgroundColor: color.cityPass.swiperPaginationItemActive,
    },
    paginationItemInactive: {
      backgroundColor: color.cityPass.swiperPaginationItemInactive,
    },
  })
