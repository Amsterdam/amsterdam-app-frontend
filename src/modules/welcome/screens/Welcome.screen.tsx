import {StackNavigationProp} from '@react-navigation/stack'
import {useContext, useEffect} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Pressable} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {AspectRatio} from '@/components/ui/layout/AspectRatio'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Screen} from '@/components/ui/layout/Screen'
import {Size} from '@/components/ui/layout/Size'
import {Image} from '@/components/ui/media/Image'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useIsScreenReaderEnabled} from '@/hooks/useIsScreenReaderEnabled'
import {ModuleSlug} from '@/modules/slugs'
import {useSelectImageWithQuote} from '@/modules/welcome/hooks'
import {WelcomeRouteName} from '@/modules/welcome/routes'
import {DeviceContext} from '@/providers/device.provider'

type Props = {
  navigation: StackNavigationProp<RootStackParams, WelcomeRouteName.welcome>
}

const quoteWidth = 288

const navigationResetParam = {index: 0, routes: [{name: ModuleSlug.home}]}

export const WelcomeScreen = ({navigation}: Props) => {
  const {isPortrait, isTallPhone} = useContext(DeviceContext)
  const isScreenReaderEnabled = useIsScreenReaderEnabled()
  const Track = isPortrait || isScreenReaderEnabled ? Column : Row

  const {image4x5, image5x4, image9x16, quote} = useSelectImageWithQuote()

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
              testID="WelcomeImage"
            />
          </AspectRatio>
          <Box grow>
            <Row
              align="center"
              flex={1}
              valign="center">
              <Size maxWidth={quoteWidth}>
                <Paragraph
                  accessibilityLabel={`Citaat, ${quote}`}
                  allowFontScaling={false}
                  testID="WelcomeQuote"
                  variant="quote">{`“${quote}”`}</Paragraph>
              </Size>
            </Row>
          </Box>
        </Track>
      </Pressable>
    </Screen>
  )
}
