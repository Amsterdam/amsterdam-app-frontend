import React from 'react'
import {StyleSheet, TouchableHighlight, View} from 'react-native'
import {image, size} from '../../../tokens'
import {NewsArticle} from '../../../types'
import {Card, CardBody, Gutter, Image, Text} from '../../ui'

type Props = {
  newsArticle: NewsArticle
  onPress: () => void
}

export const NewsArticleOverviewItem = ({onPress, newsArticle}: Props) => {
  const firstImage = newsArticle.images?.find(i => i.sources['220px'].url)

  return (
    <TouchableHighlight onPress={onPress} style={styles.row}>
      <Card>
        <CardBody direction="row">
          {firstImage && (
            <Image
              source={{uri: firstImage.sources['220px'].url}}
              style={styles.image}
            />
          )}
          <Gutter width={size.spacing.md} />
          <View style={styles.text}>
            <Text>{newsArticle.title}</Text>
          </View>
        </CardBody>
      </Card>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 128,
    aspectRatio: image.aspectRatio.default,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    flex: 1, // Prevents overflow
    alignSelf: 'center',
  },
})
