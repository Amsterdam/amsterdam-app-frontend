import {useRef} from 'react'
import {SwiperFlatList} from 'react-native-swiper-flatlist'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Carousel} from '@/components/ui/containers/Carousel'
import {Column} from '@/components/ui/layout/Column'
import {Screen} from '@/components/ui/layout/Screen'

const carouselData = [
  {
    title: 'Amsterdam App',
    subText: 'Het startpunt voor een active relatie met de stad',
    image: '@/modules/welcome/assets/images/screenshot-amsterdam-app.png',
  },
  {
    title: 'Afvalwijzer',
    subText: 'Praktische informatie over afval altijd bij de hand',
    image: '@/modules/welcome/assets/images/screenshot-afvalwijzer.png',
  },
  {
    title: 'Werkzaamheden',
    subText: 'Weet waar er aan de weg wordt gewerkt',
    image: '@/modules/welcome/assets/images/screenshot-werkzaamheden.png',
  },
  {
    title: 'Melding doen',
    subText:
      'Meld overlast, of wanneer er iets gemaakt of opgeruimd moet worden',
    image: './modules/welcome/assets/images/screenshot-melding-doen.png',
  },
  {
    title: 'Persoonlijk',
    subText: 'Informatie op basis van locatie of adres.',
    image: '@/modules/welcome/assets/images/screenshot-persoonlijk.png',
  },
]

export const Onboarding = () => {
  const carouselRef = useRef<SwiperFlatList>(null)

  return (
    <Screen
      scroll={false}
      withBottomInset
      withLeftInset
      withRightInset
      withTopInset>
      <Box grow>
        <Column
          grow
          gutter="md">
          <Carousel
            items={carouselData}
            ref={carouselRef}
          />
          <Button
            label="Volgende"
            onPress={() => {
              carouselRef.current?.scrollToIndex({
                index: carouselRef.current.getCurrentIndex() + 1,
              })
            }}
          />
        </Column>
      </Box>
    </Screen>
  )
}
