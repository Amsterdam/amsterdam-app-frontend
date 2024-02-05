import {type ComponentType, ReactNode, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {type SvgProps} from 'react-native-svg'
import AmsterdamFacadesImage from '@/assets/images/amsterdam-facades.svg'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {Size} from '@/components/ui/layout/Size'
import {Track} from '@/components/ui/layout/Track'
import {Figure} from '@/components/ui/media/Figure'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useScreenScrollDisable} from '@/hooks/useScreenScrollDisable'
import {type Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {useTheme} from '@/themes/useTheme'

const MIN_IMAGE_HEiGHT = 350

type FullScreenErrorProps = {
  Image: ComponentType<SvgProps>
  buttonAccessibilityLabel: string
  buttonLabel: string
  children?: ReactNode
  insetTop?: boolean
  noBackgroundFacade?: boolean
  onPress: () => void
  stickyFooter?: ReactNode
  testId: string
  text: string
  title: string
}

export const FullScreenError = ({
  children,
  Image,
  insetTop,
  noBackgroundFacade = false,
  text,
  title,
  buttonAccessibilityLabel,
  buttonLabel,
  onPress,
  testId,
}: FullScreenErrorProps) => {
  const {isPortrait, fontScale} = useDeviceContext()
  const {media} = useTheme()
  const [imageHeight, setImageHeight] = useState<number | undefined>()

  useScreenScrollDisable(true)

  const isImageVisible = isPortrait
    ? imageHeight && imageHeight > MIN_IMAGE_HEiGHT
    : true

  const styles = useThemable(createStyles({isPortrait, isImageVisible}))

  const Wrapper = fontScale === 1 ? View : ScrollView

  const alignCenter = isPortrait ? 'start' : 'center'

  return (
    <View style={styles.screen}>
      <Box
        grow
        inset="no">
        {!noBackgroundFacade && (
          <View style={styles.figure}>
            <Figure
              aspectRatio="extraWide"
              height={media.figureHeight.lg}>
              <View style={styles.facade}>
                <AmsterdamFacadesImage />
              </View>
            </Figure>
          </View>
        )}
        <Box
          grow
          inset="no"
          insetHorizontal={isPortrait ? 'no' : 'xl'}>
          <Track
            align={alignCenter}
            alwaysDisplayAsRowForScreenReader
            flex={1}>
            <Size
              minHeight={isPortrait ? '25%' : '100%'}
              width={isPortrait ? '100%' : '50%'}>
              <Column
                align={alignCenter}
                grow>
                <Box
                  grow
                  insetHorizontal={isPortrait ? 'md' : 'no'}
                  insetTop={contentInsetTop(isPortrait, !!children, insetTop)}>
                  <Wrapper style={styles.textContent}>
                    {children}
                    <Box
                      inset="no"
                      insetTop={children ? 'sm' : 'no'}>
                      <Title
                        level="h3"
                        text={title}
                        textAlign="center"
                      />
                    </Box>
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
      <Gutter height="sm" />
      <Box
        insetHorizontal={isPortrait ? 'md' : 'xl'}
        insetVertical="no">
        <Button
          accessibilityHint={buttonAccessibilityLabel}
          label={buttonLabel}
          onPress={onPress}
          testID={testId}
        />
      </Box>
    </View>
  )
}

// Function for reduce Complexity of contentInset
const contentInsetTop = (
  isPortrait: boolean,
  children: boolean,
  insetTop?: boolean,
) => {
  if (insetTop) {
    return 'xxl'
  }

  if (isPortrait && !children) {
    return 'xl'
  }

  return 'no'
}

type StyleProps = {
  isImageVisible: number | boolean | undefined
  isPortrait: boolean
}

const createStyles =
  ({isPortrait, isImageVisible}: StyleProps) =>
  ({media, size}: Theme) =>
    StyleSheet.create({
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
        padding: isPortrait ? size.spacing.no : size.spacing.md,
        backgroundColor: 'white',
      },
      imageVisibility: {
        opacity: isImageVisible ? 1 : 0,
        padding: isPortrait ? size.spacing.lg : size.spacing.no,
      },
      screen: {
        flex: 1,
        paddingBottom: 0,
        paddingTop: 0,
        height: '100%',
      },
    })
