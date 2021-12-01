import React from 'react'
import {StyleSheet, TouchableHighlight, View} from 'react-native'
import {image as imageTokens} from '../../../tokens'
import {ProjectDetailArticlePreview} from '../../../types'
import {Card, CardBody, Image, Text} from '../../ui'
import {Row} from '../../ui/layout'

type Props = {
  article: ProjectDetailArticlePreview
  onPress: () => void
}

export const ArticlePreview = ({article, onPress}: Props) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.row}
      accessibilityRole="button">
      <Card>
        <CardBody>
          <Row gutter="md">
            {article.image && (
              <Image
                source={{uri: article.image.sources['220px'].url}}
                style={styles.image}
              />
            )}
            <View style={styles.text}>
              <Text>{article.title}</Text>
            </View>
          </Row>
        </CardBody>
      </Card>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'center',
    aspectRatio: imageTokens.aspectRatio.vintage,
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
