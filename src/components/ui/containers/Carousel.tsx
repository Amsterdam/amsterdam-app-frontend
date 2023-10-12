import {forwardRef} from 'react'
import {Dimensions, ImageURISource, StyleSheet, View} from 'react-native'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {Box} from '@/components/ui/containers/Box'
import {Image} from '@/components/ui/media/Image'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {baseColor} from '@/themes/tokens/base-color'
import {sizeTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'

type CarouselItemType = {
  image: string
  subText: string
  title: string
}

type Props = {
  items: CarouselItemType[]
}

export const Carousel = forwardRef<SwiperFlatList, Props>(
  ({items}: Props, ref) => {
    const {width, height} = Dimensions.get('window')
    const styles = useThemable(createStyles({width, height}))

    return (
      <Box
        grow
        insetHorizontal="no">
        <SwiperFlatList
          data={items}
          disableGesture
          paginationStyle={{
            gap: sizeTokens.spacing.md,
          }}
          paginationStyleItem={styles.paginationItem}
          paginationStyleItemActive={styles.paginationItemActive}
          ref={ref}
          renderItem={({item}: {item: CarouselItemType}) => (
            <View style={styles.slide}>
              <Box grow>
                <Title text={item.title} />
                <Phrase>{item.subText}</Phrase>
                <Image
                  source={item.image as ImageURISource}
                  // require('@/modules/welcome/assets/images/screenshot-afvalwijzer.png') as ImageURISource
                  // require(item.image) as ImageURISource
                />
              </Box>
            </View>
          )}
          showPagination
        />
      </Box>
    )
  },
)

type StyleProps = {
  height: number
  width: number
}

const createStyles =
  ({width}: StyleProps) =>
  () =>
    StyleSheet.create({
      container: {
        flex: 1,
        gap: sizeTokens.spacing.md,
        backgroundColor: 'white',
      },
      slide: {
        flex: 1,
        width,
      },
      paginationItem: {
        backgroundColor: baseColor.primary.blue,
        width: sizeTokens.spacing.sm,
        height: sizeTokens.spacing.sm,
      },
      paginationItemActive: {
        backgroundColor: baseColor.primary.blue,
        height: sizeTokens.spacing.sm,
        width: sizeTokens.spacing.md,
      },
    })
