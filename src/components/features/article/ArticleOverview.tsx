import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../../../App'
import {DeviceContext} from '../../../providers'
import {size} from '../../../tokens'
import {ProjectDetailArticlePreview} from '../../../types'
import {Title} from '../../ui'
import {Column} from '../../ui/layout'
import {ArticlePreview} from './'

type Props = {
  articles: ProjectDetailArticlePreview[]
}

export const ArticleOverview = ({articles}: Props) => {
  const deviceContext = useContext(DeviceContext)
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'ProjectNews'>>()

  if (!articles.length) {
    return null
  }

  const navigateToArticle = (article: ProjectDetailArticlePreview) => {
    if (article.type === 'news') {
      navigation.navigate(routes.projectNews.name, {
        id: article.identifier,
      })
    } else if (article.type === 'warning') {
      navigation.navigate(routes.projectWarning.name, {
        id: article.identifier,
      })
    }
  }

  return (
    <Column gutter="sm">
      <Title level={2} text="Nieuws" />
      <View style={deviceContext.isLandscape && styles.grid}>
        {articles.map((article, index) => (
          <View
            key={`article-${index}`}
            style={[
              deviceContext.isLandscape && styles.item,
              styles.verticalGutter,
            ]}>
            <ArticlePreview
              article={article}
              onPress={() => navigateToArticle(article)}
            />
          </View>
        ))}
      </View>
    </Column>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
    paddingRight: size.spacing.sm,
  },
  verticalGutter: {
    paddingBottom: size.spacing.sm,
  },
})