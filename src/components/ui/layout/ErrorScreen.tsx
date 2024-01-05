import {ComponentType, ReactNode, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {SvgProps} from 'react-native-svg'
import AmsterdamFacadesImage from '@/assets/images/amsterdam-facades.svg'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Screen} from '@/components/ui/layout/Screen'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {Size} from '@/components/ui/layout/Size'
import {Track} from '@/components/ui/layout/Track'
import {Figure} from '@/components/ui/media/Figure'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {useTheme} from '@/themes/useTheme'

const MIN_IMAGE_HEiGHT = 350

type Props = {
  Image: ComponentType<SvgProps>
  stickyFooter?: ReactNode
  stickyHeader?: ReactNode
  text: string
  title: string
}

export const ErrorScreen = ({
  title,
  text,
  Image,
  stickyHeader,
  stickyFooter,
}: Props) => {
  const {isPortrait, fontScale} = useDeviceContext()
  const {media} = useTheme()

  const [imageHeight, setImageHeight] = useState<number | undefined>()

  const isImageVisible = isPortrait
    ? imageHeight && imageHeight > MIN_IMAGE_HEiGHT
    : true

  const isFontScaleChanged = fontScale !== 1

  const styles = useThemable(createStyles({isPortrait, isImageVisible}))

  const Wrapper = !isFontScaleChanged ? View : ScrollView

  return (
    <Screen
      scroll={false}
      stickyFooter={stickyFooter ?? undefined}
      stickyHeader={stickyHeader ?? undefined}
      withLeftInset={!!isPortrait}
      withRightInset={!!isPortrait}
      withTopInset={isPortrait}>
      <Box
        grow
        inset="no">
        <View style={styles.figure}>
          <Figure
            aspectRatio="extraWide"
            height={media.figureHeight.lg}>
            <View style={styles.facade}>
              <AmsterdamFacadesImage />
            </View>
          </Figure>
        </View>
        <Box
          grow
          inset="no"
          insetHorizontal={isPortrait ? 'no' : 'xl'}>
          <Track
            align={isPortrait ? 'start' : 'center'}
            alwaysDisplayAsRowForScreenReader
            flex={1}>
            <Size
              maxWidth={isPortrait ? '100%' : '50%'}
              minHeight={isFontScaleChanged || !isPortrait ? '100%' : '25%'}>
              <Column
                align={isPortrait ? 'start' : 'center'}
                grow>
                <Box
                  grow
                  insetHorizontal={isPortrait ? 'md' : 'no'}
                  insetTop="xl">
                  <Wrapper style={styles.textContent}>
                    <Title
                      level="h3"
                      text={title}
                      textAlign="center"
                    />
                    <Paragraph textAlign="center">{text}</Paragraph>
                  </Wrapper>
                </Box>
              </Column>
            </Size>
            <Column grow>
              <View
                onLayout={e => setImageHeight(e.nativeEvent.layout.height)}
                style={styles.imageVisibility}>
                <Image
                  height="100%"
                  width="100%"
                />
              </View>
            </Column>
          </Track>
        </Box>
      </Box>
    </Screen>
  )
}

type StyleProps = {
  isImageVisible: number | boolean | undefined
  isPortrait: boolean
}

const createStyles =
  ({isPortrait, isImageVisible}: StyleProps) =>
  ({media, size}: Theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
        position: 'relative',
      },
      figure: {
        position: 'absolute',
        top: isPortrait ? '50%' : '25%',
        width: '100%',
      },
      facade: {
        aspectRatio: media.illustrationAspectRatio.facades,
        position: 'absolute',
        height: media.figureHeight.lg * (3 / 4),
        alignSelf: 'center',
      },
      textContent: {
        height: isPortrait ? 'auto' : '100%',
        backgroundColor: 'white',
      },
      imageVisibility: {
        opacity: isImageVisible ? 1 : 0,
        paddingVertical: isPortrait ? size.spacing.lg : size.spacing.no,
      },
    })
