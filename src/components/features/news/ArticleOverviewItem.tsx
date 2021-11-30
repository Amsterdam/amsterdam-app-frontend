import React from 'react'
import {StyleSheet, TouchableHighlight, View} from 'react-native'
import {image, size} from '../../../tokens'
import {Image as ImageType} from '../../../types'
import {Card, CardBody, Image, Text} from '../../ui'
import {Gutter} from '../../ui/layout'

type Props = {
  articleImage: ImageType | undefined // `image` already in use for tokens
  onPress: () => void
  title: string
}

export const ArticleOverviewItem = ({articleImage, onPress, title}: Props) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.row}
      accessibilityRole="button">
      <Card>
        <CardBody direction="row">
          {articleImage && (
            <Image
              source={{uri: articleImage.sources['220px'].url}}
              style={styles.image}
            />
          )}
          <Gutter width={size.spacing.md} />
          <View style={styles.text}>
            <Text>{title}</Text>
          </View>
        </CardBody>
      </Card>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'center',
    aspectRatio: image.aspectRatio.vintage,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    flex: 2, // Also prevents overflow
    alignSelf: 'center',
  },
})
