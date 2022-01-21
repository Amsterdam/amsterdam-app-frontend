import React from 'react'
import {StyleSheet, TouchableHighlight, View} from 'react-native'
import HeroImage from '../../../assets/images/warning-hero.svg'
import {image as imageTokens} from '../../../tokens'
import {Article} from '../../../types'
import {Card, CardBody, Image, Text} from '../../ui'
import {Row} from '../../ui/layout'

type Props = {
  article: Article
  onPress: () => void
}

export const ArticlePreview = ({article, onPress}: Props) => {
  const imageUrl =
    article.type === 'news' && article.image?.sources?.['220px'].url

  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.row}
      accessibilityRole="button">
      <Card>
        <CardBody>
          <Row gutter="md">
            {imageUrl && (
              <Image source={{uri: imageUrl}} style={styles.image} />
            )}
            {article.type === 'warning' && (
              <View style={styles.image}>
                <HeroImage />
              </View>
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
    alignSelf: 'center',
    aspectRatio: imageTokens.aspectRatio.vintage,
    flex: 1,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    flex: 2, // Also prevents overflow
  },
})
