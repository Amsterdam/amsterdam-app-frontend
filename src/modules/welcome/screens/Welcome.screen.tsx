import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {Pressable} from '@/components/ui/buttons'
import {Center, Screen, Size, SizeProps} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {useTransparentStatusBar} from '@/hooks'
import {ModuleSlug} from '@/modules/slugs'
import {useSelectImageWithQuote} from '@/modules/welcome/hooks'
import {WelcomeRouteName} from '@/modules/welcome/routes'
import {DeviceContext} from '@/providers'

type Props = {
  navigation: StackNavigationProp<RootStackParams, WelcomeRouteName.welcome>
}

enum CustomAspectRatio {
  landscape = 5 / 3,
  portrait = 4 / 5,
}

export const WelcomeScreen = ({navigation}: Props) => {
  useMemo(() => {
    setTimeout(() => {
      navigation.navigate(ModuleSlug.home)
    }, 5000)
  }, [navigation])
  const {isPortrait} = useContext(DeviceContext)
  const sizeProps = createSizeProps({isPortrait})
  const styles = createStyles({isPortrait})
  const imageWithQuote = useSelectImageWithQuote()
  useTransparentStatusBar()

  return (
    <Screen scroll={false} withBottomInset={false} withLeftInset={false}>
      <Pressable onPress={() => navigation.navigate(ModuleSlug.home)}>
        <View style={styles.container}>
          <Size {...sizeProps.image}>
            <Image
              customAspectRatio={
                isPortrait
                  ? CustomAspectRatio.portrait
                  : CustomAspectRatio.landscape
              }
              source={
                isPortrait
                  ? imageWithQuote.imagePortrait
                  : imageWithQuote.imageLandscape
              }
            />
          </Size>
          <Size {...sizeProps.quote}>
            <Center>
              <Size {...sizeProps.quoteInner}>
                <Paragraph
                  accessibilityLabel={`Quote, ${imageWithQuote.quote}`}
                  variant="quote">{`"${imageWithQuote.quote}"`}</Paragraph>
              </Size>
            </Center>
          </Size>
        </View>
      </Pressable>
    </Screen>
  )
}

enum ScreenPortion {
  image = '75%',
  quote = '25%',
}

const createSizeProps = ({
  isPortrait,
}: {
  isPortrait: boolean
}): Record<'image' | 'quote' | 'quoteInner', Partial<SizeProps>> => ({
  image: {
    height: isPortrait ? ScreenPortion.image : '100%',
    width: isPortrait ? '100%' : ScreenPortion.image,
  },
  quote: {
    height: isPortrait ? ScreenPortion.quote : '100%',
    width: isPortrait ? '100%' : ScreenPortion.quote,
  },
  quoteInner: {
    maxWidth: '78%', // Derived from the design
  },
})

const createStyles = ({isPortrait}: {isPortrait: boolean}) =>
  StyleSheet.create({
    container: {
      flexDirection: isPortrait ? 'column' : 'row',
      height: '100%',
      width: '100%',
    },
  })
