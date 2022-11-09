import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParams} from '@/app/navigation'
import {Pressable} from '@/components/ui/buttons'
import {Screen, Size} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph} from '@/components/ui/text'
import {useTransparentStatusBar} from '@/hooks'
import {ModuleSlug} from '@/modules/slugs'
import {useSelectImageWithQuote} from '@/modules/welcome/hooks'
import {WelcomeRouteName} from '@/modules/welcome/routes'
import {DeviceContext} from '@/providers'
import {Theme, useThemable} from '@/themes'

type Props = {
  navigation: StackNavigationProp<RootStackParams, WelcomeRouteName.welcome>
}

const quoteWidth = 288

const navigationResetParam = {index: 0, routes: [{name: ModuleSlug.home}]}

export const WelcomeScreen = ({navigation}: Props) => {
  const {isPortrait} = useContext(DeviceContext)
  const {imageLandscape, imagePortrait, quote} = useSelectImageWithQuote()
  const styles = useThemable(createStyles(isPortrait))

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
    <Screen scroll={false} withBottomInset={false} withLeftInset={false}>
      <Pressable onPress={() => navigation.reset(navigationResetParam)}>
        <View style={styles.track}>
          <View style={styles.image}>
            <Image source={isPortrait ? imagePortrait : imageLandscape} />
          </View>
          <View style={styles.quote}>
            <Size maxWidth={quoteWidth}>
              <Paragraph
                allowFontScaling={false}
                accessibilityLabel={`Quote, ${quote}`}
                variant="quote">{`“${quote}”`}</Paragraph>
            </Size>
          </View>
        </View>
      </Pressable>
    </Screen>
  )
}

const createStyles =
  (isPortrait: boolean) =>
  ({size}: Theme) =>
    StyleSheet.create({
      image: {
        [isPortrait ? 'height' : 'width']: '75%',
      },
      quote: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: size.spacing.lg,
      },
      track: {
        flexDirection: isPortrait ? 'column' : 'row',
        height: '100%',
      },
    })