import {ComponentType, ReactNode, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {SvgProps} from 'react-native-svg'
import AmsterdamFacadesImage from '@/assets/images/amsterdam-facades.svg'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Screen} from '@/components/ui/layout/Screen'
import {ScrollView} from '@/components/ui/layout/ScrollView'
import {Size} from '@/components/ui/layout/Size'
import {Track} from '@/components/ui/layout/Track'
import {Figure} from '@/components/ui/media/Figure'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useScreenScrollDisable} from '@/hooks/useScreenScrollDisable'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {useTheme} from '@/themes/useTheme'

const MIN_IMAGE_HEiGHT = 350

type ContentProps = {
  Image: ComponentType<SvgProps>
  children?: ReactNode
  insetTop?: boolean
  stickyFooter?: ReactNode
  text: string
  title: string
}

const ErrorContent = ({
  Image,
  children,
  insetTop,
  text,
  title,
  stickyFooter,
}: ContentProps) => {
  const {isPortrait, fontScale} = useDeviceContext()
  const {media} = useTheme()

  const [imageHeight, setImageHeight] = useState<number | undefined>()

  const isImageVisible = isPortrait
    ? imageHeight && imageHeight > MIN_IMAGE_HEiGHT
    : true

  const isFontScaleChanged = fontScale !== 1

  const styles = useThemable(
    createStyles({isPortrait, isImageVisible, hasChildren: !!children}),
  )

  const Wrapper = !isFontScaleChanged ? View : ScrollView

  const contentInsetTop = insetTop
    ? 'xxl'
    : isPortrait && !children
      ? 'xl'
      : 'no'

  return (
    <View style={styles.screen}>
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
                  insetTop={contentInsetTop}>
                  <Wrapper style={styles.textContent}>
                    {children}
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
      {!!stickyFooter && (
        <>
          <Gutter height="sm" />
          {stickyFooter}
        </>
      )}
    </View>
  )
}

type FooterProps = {
  buttonAccessibilityLabel: string
  buttonLabel: string
  isPortrait: boolean
  onPress: () => void
  testId: string
}

const Footer = ({
  isPortrait,
  buttonAccessibilityLabel,
  buttonLabel,
  onPress,
  testId,
}: FooterProps) => (
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
)

type Props = {
  Image: ComponentType<SvgProps>
  buttonAccessibilityLabel: string
  buttonLabel: string
  children?: ReactNode
  insetTop?: boolean
  isScreen?: boolean
  onPress: () => void
  stickyHeader?: ReactNode
  testId: string
  text: string
  title: string
}

export const ErrorScreen = ({
  title,
  text,
  Image,
  stickyHeader,
  insetTop = false,
  buttonAccessibilityLabel,
  buttonLabel,
  onPress,
  testId,
  children,
  isScreen = false,
}: Props) => {
  const {isPortrait} = useDeviceContext()

  useScreenScrollDisable(true)

  return isScreen ? (
    <Screen
      scroll={false}
      stickyFooter={
        <Footer
          buttonAccessibilityLabel={buttonAccessibilityLabel}
          buttonLabel={buttonLabel}
          isPortrait={isPortrait}
          onPress={onPress}
          testId={testId}
        />
      }
      stickyHeader={stickyHeader ?? undefined}
      withLeftInset={!!isPortrait}
      withRightInset={!!isPortrait}
      withTopInset={isPortrait ? !!stickyHeader : false}>
      <ErrorContent
        Image={Image}
        insetTop={insetTop}
        text={text}
        title={title}>
        {children}
      </ErrorContent>
    </Screen>
  ) : (
    <ErrorContent
      Image={Image}
      insetTop={insetTop}
      stickyFooter={
        <Footer
          buttonAccessibilityLabel={buttonAccessibilityLabel}
          buttonLabel={buttonLabel}
          isPortrait={isPortrait}
          onPress={onPress}
          testId={testId}
        />
      }
      text={text}
      title={title}>
      {children}
    </ErrorContent>
  )
}

type StyleProps = {
  hasChildren?: boolean
  isImageVisible: number | boolean | undefined
  isPortrait: boolean
}

const createStyles =
  ({isPortrait, isImageVisible, hasChildren = false}: StyleProps) =>
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
        padding: isPortrait ? size.spacing.no : size.spacing.sm,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: hasChildren ? 'flex-start' : 'center',
      },
      imageVisibility: {
        opacity: isImageVisible ? 1 : 0,
        paddingVertical: isPortrait ? size.spacing.lg : size.spacing.no,
      },
      screen: {
        flex: 1,
        paddingBottom: 0,
        paddingTop: 0,
        height: '100%',
      },
    })
