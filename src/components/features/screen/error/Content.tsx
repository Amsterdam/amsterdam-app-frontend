import {useMemo} from 'react'
import {Header} from '@/components/features/screen/error/Header'
import {ImageWithBackground} from '@/components/features/screen/error/ImageWithBackground'
import {createStyles} from '@/components/features/screen/error/styles'
import {
  SharedProps,
  FullScreenErrorProps,
} from '@/components/features/screen/error/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {useThemable} from '@/themes/useThemable'

export type ContentProps = SharedProps & {
  Image: FullScreenErrorProps['Image']
  withFacadesBackground: FullScreenErrorProps['withFacadesBackground']
}

export const Content = ({
  error,
  text,
  Image,
  isPortrait,
  testID,
  title,
  TopComponent,
  withFacadesBackground,
}: ContentProps) => {
  const styles = useThemable(
    createStyles({
      isPortrait,
    }),
  )

  const ImageComponent = useMemo(
    () => (
      <ImageWithBackground
        Image={Image}
        isPortrait={isPortrait}
        styles={styles}
        testID={testID}
        withFacadesBackground={withFacadesBackground}
      />
    ),
    [Image, isPortrait, styles, testID, withFacadesBackground],
  )

  return isPortrait ? (
    <Column flex={1}>{ImageComponent}</Column>
  ) : (
    <Row flex={1}>
      <Column flex={1}>
        <Header
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
