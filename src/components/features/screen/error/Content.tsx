import {useMemo} from 'react'
import {FullScreenErrorHeader} from '@/components/features/screen/error/Header'
import {ImageWithBackground} from '@/components/features/screen/error/ImageWithBackground'
import {
  SharedProps,
  FullScreenErrorProps,
} from '@/components/features/screen/error/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'

export type ContentProps = SharedProps & {
  Image: FullScreenErrorProps['Image']
  withFacadesBackground: FullScreenErrorProps['withFacadesBackground']
}

export const FullScreenErrorContent = ({
  error,
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
        Image={Image}
        isPortrait={isPortrait}
        testID={testID}
        withFacadesBackground={withFacadesBackground}
      />
    ),
    [Image, isPortrait, testID, withFacadesBackground],
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
