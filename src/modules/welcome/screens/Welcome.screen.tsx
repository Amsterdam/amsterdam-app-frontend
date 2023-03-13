import {StackNavigationProp} from '@react-navigation/stack'
import {useContext, useEffect} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {AspectRatio, Column, Row, Screen, Size} from '@/components/ui/layout'
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

const quoteWidth = 288

const navigationResetParam = {index: 0, routes: [{name: ModuleSlug.home}]}

export const WelcomeScreen = ({navigation}: Props) => {
  const {isPortrait, isTallPhone} = useContext(DeviceContext)
  const Track = isPortrait ? Column : Row

  const {image4x5, image5x4, image9x16, quote} = useSelectImageWithQuote()

  useTransparentStatusBar()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset(navigationResetParam)
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [navigation])

  return (
    <Screen
      scroll={false}
      withBottomInset={false}
      withLeftInset={false}
      withRightInset={false}>
      <Pressable
        grow
        onPress={() => navigation.reset(navigationResetParam)}
        testID="WelcomeImageAndQuoteButton">
        <Track flex={1}>
          <AspectRatio
            aspectRatio={isPortrait && isTallPhone ? 'wide' : 'narrow'}
            orientation={isPortrait ? 'portrait' : 'landscape'}>
            <Image
              source={
                isPortrait ? (isTallPhone ? image9x16 : image4x5) : image5x4
              }
            />
          </AspectRatio>
          <Box grow>
            <Row align="center" flex={1} valign="center">
              <Size maxWidth={quoteWidth}>
                <Paragraph
                  accessibilityLabel={`Citaat, ${quote}`}
                  allowFontScaling={false}
                  variant="quote">{`“${quote}”`}</Paragraph>
              </Size>
            </Row>
          </Box>
        </Track>
      </Pressable>
    </Screen>
  )
}
