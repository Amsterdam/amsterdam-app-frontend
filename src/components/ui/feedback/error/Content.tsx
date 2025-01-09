import {useMemo} from 'react'
import {FullScreenErrorHeader} from '@/components/ui/feedback/error/Header'
import {ImageWithBackground} from '@/components/ui/feedback/error/ImageWithBackground'
import {
  SharedProps,
  FullScreenErrorProps,
} from '@/components/ui/feedback/error/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'

export type ContentProps = SharedProps & {
  Image: FullScreenErrorProps['Image']
  backgroundPosition: FullScreenErrorProps['backgroundPosition']
  isImageFullSize: FullScreenErrorProps['isImageFullSize']
  withFacadesBackground: FullScreenErrorProps['withFacadesBackground']
}

export const FullScreenErrorContent = ({
  backgroundPosition,
  error,
  isImageFullSize,
  text,
  Image,
  isPortrait,
  testID,
  title,
  TopComponent,
  withFacadesBackground,
}: ContentProps) => {
  const ImageComponent = useMemo(
    () => (
      <ImageWithBackground
        backgroundPosition={backgroundPosition}
        Image={Image}
        isImageFullSize={isImageFullSize}
        isPortrait={isPortrait}
        testID={testID}
        withFacadesBackground={withFacadesBackground}
      />
    ),
    [
      Image,
      backgroundPosition,
      isImageFullSize,
      isPortrait,
      testID,
      withFacadesBackground,
    ],
  )

  return isPortrait ? (
    <Column flex={1}>{ImageComponent}</Column>
  ) : (
    <Row flex={1}>
      <Column flex={1}>
        <FullScreenErrorHeader
          error={error}
          isPortrait={isPortrait}
          testID={testID}
          text={text}
          title={title}
          TopComponent={TopComponent}
        />
      </Column>
      <Column flex={1}>{ImageComponent}</Column>
    </Row>
  )
}
