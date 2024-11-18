import {useEffect, useMemo, useState} from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageProps,
  DimensionValue,
  Platform,
} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenTitle} from '@/components/ui/text/ScreenTitle'
import {saveFile} from '@/modules/chat/utils/saveFile'
import {devLog} from '@/processes/development'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  fileName: string
  headerTitle?: string
  imageSource: ImageProps['source']
  thumbnailSize: DimensionValue
}

export const ThumbnailViewer = ({
  fileName = 'afbeelding.jpg',
  imageSource,
  thumbnailSize,
  headerTitle,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [aspectRatio, setAspectRatio] = useState<number>()
  const insets = useSafeAreaInsets()

  const onPress = () => {
    setIsModalVisible(!isModalVisible)
  }

  const uri = useMemo((): string | undefined => {
    if (typeof imageSource === 'number') {
      return undefined
    } else if (
      imageSource &&
      typeof imageSource === 'object' &&
      'uri' in imageSource
    ) {
      return imageSource.uri
    } else {
      return undefined
    }
  }, [imageSource])

  useEffect(() => {
    Image.getSize(
      uri ?? '',
      (w, h) => setAspectRatio(w / h),
      (error: unknown) => devLog(error),
    )
  }, [uri])

  const styles = useThemable(theme =>
    createStyles(theme, thumbnailSize, insets, aspectRatio),
  )
  const isLocalFile = uri?.startsWith('file://')

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={imageSource}
          style={styles.thumbnail}
        />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        supportedOrientations={['portrait', 'landscape']}
        transparent
        visible={isModalVisible}>
        <View style={styles.overlay}>
          <Box>
            <Row align="between">
              <IconButton
                icon={
                  <Icon
                    color="link"
                    name="chevron-left"
                    size="lg"
                    testID=""
                  />
                }
                onPress={onPress}
                testID="ThumbnailViewerCloseButton"
              />
              {!!headerTitle && <ScreenTitle text={headerTitle} />}
              <IconButton
                icon={
                  <Icon
                    color="link"
                    name="download"
                    size="lg"
                    testID=""
                  />
                }
                onPress={() =>
                  saveFile({
                    localUri: isLocalFile ? uri : undefined,
                    downloadUri: isLocalFile ? undefined : uri,
                    fileName,
                  })
                }
                testID="ThumbnailViewerDownloadButton"
              />
            </Row>
          </Box>
          <Image
            resizeMode="contain"
            source={imageSource}
            style={styles.fullImage}
          />
        </View>
      </Modal>
    </View>
  )
}

const createStyles = (
  {color, size, z}: Theme,
  thumbnailSize: DimensionValue,
  insets: EdgeInsets,
  aspectRatio?: number,
) =>
  StyleSheet.create({
    thumbnail: {
      width: thumbnailSize,
      height: thumbnailSize,
    },
    overlay: {
      flex: 1,
      backgroundColor: color.box.distinct,
      justifyContent: 'center',
      zIndex: z.overlay,
      paddingTop: Platform.OS === 'android' ? 0 : insets.top,
      paddingRight: insets.right,
      paddingBottom: size.spacing.md + insets.bottom,
      paddingLeft: insets.left,
    },
    fullImage: {
      aspectRatio,
      alignSelf: 'center',
      maxWidth: '100%',
      maxHeight: '100%',
      flex: 1,
    },
  })
