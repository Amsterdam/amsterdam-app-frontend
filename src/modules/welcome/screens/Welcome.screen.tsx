import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui/containers'
import {
  AspectRatio,
  Center,
  Column,
  Row,
  Screen,
  Size,
} from '@/components/ui/layout'
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
  const {isPortrait} = useContext(DeviceContext)
  const Track = isPortrait ? Column : Row

  const {image54, image916, quote} = useSelectImageWithQuote()

  useTransparentStatusBar()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset(navigationResetParam)
    }, 500000)

    return () => {
      clearTimeout(timer)
    }
  }, [navigation])

  return (
    <Screen scroll={false} withBottomInset={isPortrait} withLeftInset={false}>
      <Track grow>
        <AspectRatio
          aspectRatio={isPortrait ? 'wide' : 'narrow'}
          orientation={isPortrait ? 'portrait' : 'landscape'}>
          <Image source={isPortrait ? image916 : image54} />
        </AspectRatio>
        <Column flex={1}>
          <Box grow insetHorizontal="xl" insetVertical="md">
            <Center grow>
              <Size maxWidth={quoteWidth}>
                <Paragraph
                  allowFontScaling={false}
                  accessibilityLabel={`Quote, ${quote}`}
                  variant="quote">{`“${quote}”`}</Paragraph>
              </Size>
            </Center>
          </Box>
        </Column>
      </Track>
    </Screen>
  )
}
