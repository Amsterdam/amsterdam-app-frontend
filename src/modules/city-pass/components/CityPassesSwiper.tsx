import {StyleSheet, View} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {CityPass} from '@/modules/city-pass/components/CityPass'
import {CITY_PASS_HEIGHT} from '@/modules/city-pass/constants'
import {PassOwner} from '@/modules/city-pass/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

const PAGINATION_HEIGHT = 50

const pashouders = {
  initialen: 'A',
  achternaam: 'Achternaam',
  passen: [
    {
      actief: false,
      pasnummer: 444444444444,
    },
    {
      actief: true,
      pasnummer: 333333333333,
    },
  ],
  sub_pashouders: [
    {
      initialen: 'B',
      achternaam: 'Achternaam',
      passen: [
        {
          actief: true,
          pasnummer: 666666666666,
        },
        {
          actief: false,
          pasnummer: 555555555555,
        },
      ],
    },
    {
      initialen: 'C',
      achternaam: 'Achternaam',
      passen: [
        {
          actief: true,
          pasnummer: 777777777777,
        },
        {
          actief: false,
          pasnummer: 888888888888,
        },
      ],
    },
  ],
}

const {sub_pashouders, ...pashouder} = pashouders

const list = [pashouder, ...sub_pashouders]

type CarouselItem = {
  index: number
  item: PassOwner
}

export const CityPassesSwiper = () => {
  const styles = useThemable(createStyles)

  return (
    <View style={styles.container}>
      <SwiperFlatList
        data={list}
        paginationStyle={styles.pagination}
        paginationStyleItem={styles.paginationItem}
        paginationStyleItemActive={styles.paginationItemActive}
        paginationStyleItemInactive={styles.paginationItemInactive}
        renderItem={({item, index}: CarouselItem) => (
          <CityPass
            index={index}
            itemCount={list.length}
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
